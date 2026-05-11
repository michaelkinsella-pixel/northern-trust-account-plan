import { parseBody } from "../lib/parseBody.js";
import { ADMIN_COOKIE } from "../lib/session.js";
import { cookieSecureFlag } from "../lib/cookies.js";

declare const process: { env: Record<string, string | undefined> };

const TTL_SEC = 60 * 60 * 24 * 14;

async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await parseBody(request);
  const password = body.password ?? "";

  if (!process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: "ADMIN_PASSWORD is not set." }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid password" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const secure = cookieSecureFlag(request);
  const cookie = `${ADMIN_COOKIE}=1; Path=/; HttpOnly; Max-Age=${TTL_SEC}; SameSite=Strict${secure ? "; Secure" : ""}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/api/admin-ui",
      "Set-Cookie": cookie,
    },
  });
}

export default { fetch: handler };
