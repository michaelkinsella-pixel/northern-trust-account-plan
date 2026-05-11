import { cookieSecureFlag } from "../lib/cookies.js";
import { SITE_COOKIE } from "../lib/session.js";

async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const secure = cookieSecureFlag(request);
  const expired = `${SITE_COOKIE}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax${secure ? "; Secure" : ""}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": expired,
    },
  });
}

export default { fetch: handler };
