import { next } from "@vercel/edge";
import { parseCookies } from "./lib/cookies.js";
import { ADMIN_COOKIE, SITE_COOKIE } from "./lib/session.js";

declare const process: { env: Record<string, string | undefined> };

function baseStyles(): string {
  return `:root{font-family:"Source Sans 3",system-ui,sans-serif;color:#0f172a;}
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#115740 0%,#0c3024 100%);}
    .card{width:100%;max-width:420px;margin:24px;padding:32px 28px 28px;background:#fff;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.35);}
    h1{margin:0 0 6px;font-size:1.35rem;color:#115740;}
    p{margin:0 0 20px;color:#57534e;font-size:.95rem;line-height:1.5;}
    label{display:block;font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#115740;margin-bottom:6px;}
    input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid #e7e5e4;font-size:1rem;}
    .field{margin-bottom:16px;}
    button{margin-top:8px;width:100%;padding:14px 16px;border:0;border-radius:999px;background:#115740;color:#fff;font-weight:700;font-size:1rem;cursor:pointer;}
    button:hover{filter:brightness(1.05);}
    .badge{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:#e3efe9;color:#115740;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;}`;
}

function siteLoginHtml(origin: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sign in · Northern Trust account plan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>${baseStyles()}</style>
</head>
<body>
  <div class="card">
    <div class="badge">Confidential</div>
    <h1>Northern Trust account plan</h1>
    <p>Enter the visitor password to open this site. Your name labels session analytics for the admin dashboard.</p>
    <form method="POST" action="${origin}/api/auth" autocomplete="on">
      <div class="field">
        <label for="visitorName">Your name</label>
        <input id="visitorName" name="visitorName" type="text" required maxlength="120" placeholder="Jane Doe" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required autocomplete="current-password" />
      </div>
      <button type="submit">Continue</button>
    </form>
  </div>
</body>
</html>`;
}

function adminLoginHtml(origin: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin sign in</title>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>${baseStyles()}</style>
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
    return new Response(siteLoginHtml(url.origin), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return next();
}

export const config = {
  matcher: ["/((?!api|assets|_next|.*\\..*).*)"],
};
