import { next } from "@vercel/edge";
import { parseCookies } from "./lib/cookies.js";
import { loginCardBaseStyles, visitorLoginPageHtml } from "./lib/visitorLoginHtml.js";
import { ADMIN_COOKIE, SITE_COOKIE } from "./lib/session.js";

declare const process: { env: Record<string, string | undefined> };

function adminLoginHtml(origin: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin sign in</title>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>${loginCardBaseStyles()}</style>
</head>
<body>
  <div class="card">
    <div class="badge">Analytics</div>
    <h1>Admin access</h1>
    <p>Sign in to view visitor sessions and time-on-section analytics.</p>
    <form method="POST" action="${origin}/api/admin-auth" autocomplete="off">
      <div class="field">
        <label for="password">Admin password</label>
        <input id="password" name="password" type="password" required autocomplete="off" />
      </div>
      <button type="submit">View dashboard</button>
    </form>
  </div>
</body>
</html>`;
}

export default function middleware(request: Request): Response {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith("/api/")) {
    return next();
  }

  const cookies = parseCookies(request.headers.get("cookie"));

  if (path === "/admin" || path.startsWith("/admin/")) {
    if (cookies[ADMIN_COOKIE] === "1") {
      if (path === "/admin") {
        return Response.redirect(new URL("/api/admin-ui", url), 302);
      }
      return new Response("Not found", { status: 404 });
    }
    if (path === "/admin") {
      return new Response(adminLoginHtml(url.origin), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
    return new Response("Not found", { status: 404 });
  }

  const siteAuthOff = process.env.DISABLE_SITE_AUTH === "1";
  if (!siteAuthOff && !cookies[SITE_COOKIE]) {
    return new Response(visitorLoginPageHtml(url.origin), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return next();
}

export const config = {
  matcher: ["/((?!api|assets|_next|.*\\..*).*)"],
};
