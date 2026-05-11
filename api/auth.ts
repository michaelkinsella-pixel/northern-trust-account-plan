import { getRedis } from "../lib/redis.js";
import { parseBody } from "../lib/parseBody.js";
import { SITE_COOKIE } from "../lib/session.js";
import type { SessionRecord } from "../lib/session.js";
import { sessionKey } from "../lib/session.js";
import { cookieSecureFlag } from "../lib/cookies.js";

declare const process: { env: Record<string, string | undefined> };

const TTL_SEC = 60 * 60 * 24 * 90;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const redis = getRedis();
  if (!redis) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          "Redis is missing or misconfigured. Either connect Upstash for Redis on Vercel (sets UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN) or set REDIS_CONNECTION_STRING / REDIS_URL to a rediss://… TCP URL from your Redis provider.",
      }),
      { status: 503, headers: { "content-type": "application/json; charset=utf-8" } },
    );
  }

  const body = await parseBody(request);
  const password = body.password ?? "";
  const visitorName = (body.visitorName ?? body.name ?? "").trim() || "Anonymous";

  if (!process.env.SITE_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: "SITE_PASSWORD is not set on this deployment." }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  if (password !== process.env.SITE_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid password" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
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

  const writeMs = 8000;
  try {
    await Promise.race([
      redis.set(sessionKey(sid), JSON.stringify(record), TTL_SEC),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("redis_write_timeout")), writeMs);
      }),
    ]);
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          "Could not save your session (Redis timed out). Check REDIS_URL is a rediss://… connection string with the correct password and host:port from Redis Cloud (Connect / security), then redeploy.",
      }),
      { status: 503, headers: { "content-type": "application/json; charset=utf-8" } },
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
