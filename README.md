# Northern Trust account plan (micro-site)

Vite + React static site with **Vercel Edge Middleware** visitor password, **separate admin password** for analytics, and **Upstash Redis** for session storage and section timing.

## Deploy on Vercel

1. Push this repo (or import the folder) to GitHub and create a **Vercel** project pointing at this directory.
2. In Vercel → **Storage** → create **Redis** (Upstash). **Connect** it to the project so `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are injected.
3. In **Project → Settings → Environment Variables** add:
   - `SITE_PASSWORD` — shared with Northern Trust visitors (sign-in form).
   - `ADMIN_PASSWORD` — only for your team; used at `/admin` for the analytics dashboard.
4. Deploy. Open the production URL: you should see the **visitor** login. After sign-in, the SPA loads; scrolling records **time in section** (IntersectionObserver, ~50% visible) to Redis.
5. Open **`/admin`**, sign in with `ADMIN_PASSWORD`, then you are redirected to **`/api/admin-ui`** (HTML table of sessions and per-section dwell time).

Optional: set `DISABLE_SITE_AUTH=1` **only** for temporary debugging (disables the visitor gate; **do not** use in production).

## Local production-like test

```bash
npm install
cp .env.example .env
# fill SITE_PASSWORD, ADMIN_PASSWORD, UPSTASH_* then:
npx vercel dev
```

`vite dev` does **not** run Vercel middleware or `/api` routes; use `vercel dev` to exercise auth and analytics locally.

## Sign out

- Visitors: **`/api/logout`** (also linked in the footer).
- Admins: **`/api/admin-logout`** (linked from the analytics page).
