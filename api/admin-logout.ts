import { cookieSecureFlag } from "../lib/cookies.js";
import { ADMIN_COOKIE } from "../lib/session.js";

export default async function handler(request: Request): Promise<Response> {
  const secure = cookieSecureFlag(request);
  const expired = `${ADMIN_COOKIE}=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict${secure ? "; Secure" : ""}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/admin",
      "Set-Cookie": expired,
    },
  });
}
