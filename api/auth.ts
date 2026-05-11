import { cookieSecureFlag } from "../lib/cookies.js";
import { parseBody } from "../lib/parseBody.js";
import { getRedis } from "../lib/redis.js";
import { SITE_COOKIE } from "../lib/session.js";
import type { SessionRecord } from "../lib/session.js";
import { sessionKey } from "../lib/session.js";
import { visitorLoginPageHtml } from "../lib/visitorLoginHtml.js";

declare const process: { env: Record<string, string | undefined> };

const TTL_SEC = 60 * 60 * 24 * 90;

const JSON_HDR = { "content-type": "application/json; charset=utf-8" };
const HTML_HDR = { "content-type": "text/html; charset=utf-8" };

function wantsJsonResponse(request: Request): boolean {
  return (request.headers.get("content-type") || "").toLowerCase().includes("application/json");
}

async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const origin = new URL(request.url).origin;
  const asJson = wantsJsonResponse(request);
  const body = await parseBody(request);
  const password = body.password ?? "";
  const visitorName = (body.visitorName ?? body.name ?? "").trim() || "Anonymous";

  const jsonErr = (status: number, msg: string) =>
    new Response(JSON.stringify({ ok: false, error: msg }), { status, headers: JSON_HDR });

  const htmlErr = (status: number, userMessage: string) =>
    new Response(visitorLoginPageHtml(origin, { errorText: userMessage, visitorName }), { status, headers: HTML_HDR });

  const err = (status: number, jsonMsg: string, htmlMsg: string) => (asJson ? jsonErr(status, jsonMsg) : htmlErr(status, htmlMsg));

  const redis = getRedis();
  if (!redis) {
    return err(
      503,
      "Redis is missing or misconfigured. Either connect Upstash for Redis on Vercel (sets UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN) or set REDIS_CONNECTION_STRING / REDIS_URL to a rediss://… TCP URL from your Redis provider.",
      "This site cannot sign you in yet because the session database (Redis) is not connected. Ask your host to attach Upstash Redis in the Vercel project (or set a Redis connection string), then redeploy.",
    );
  }

  if (!process.env.SITE_PASSWORD) {
    return err(
      503,
      "SITE_PASSWORD is not set on this deployment.",
      "This site is not fully configured yet (visitor password missing on the server). Please contact your host.",
    );
  }

  if (password !== process.env.SITE_PASSWORD) {
    return err(401, "Invalid password", "That password did not match. Try again, or contact your host if you need access.");
  }

  const sid = crypto.randomUUID();
  const now = Date.now();
  const record: SessionRecord = {
    id: sid,
    visitorName,
    createdAt: now,
    lastSeenAt: now,
    sections: {},
  };

  const writeMs = 14000;
  try {
    await Promise.race([
      redis.set(sessionKey(sid), JSON.stringify(record), TTL_SEC),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("redis_write_timeout")), writeMs);
      }),
    ]);
  } catch {
    return err(
      503,
      "Could not save your session (Redis timed out). Check REDIS_URL is a rediss://… connection string with the correct password and host:port from Redis Cloud (Connect / security), then redeploy.",
      "We could not save your session—the database took too long to respond. Wait a moment and try again. If this keeps happening, your host should check the Redis connection in Vercel.",
    );
  }

  const secure = cookieSecureFlag(request);
  const cookie = `${SITE_COOKIE}=${sid}; Path=/; HttpOnly; Max-Age=${TTL_SEC}; SameSite=Lax${secure ? "; Secure" : ""}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": cookie,
    },
  });
}

export default { fetch: handler };
