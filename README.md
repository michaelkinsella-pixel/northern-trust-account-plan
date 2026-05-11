# Northern Trust account plan (micro-site)

Vite + React static site with **Vercel Edge Middleware** visitor password, **separate admin password** for analytics, and **Redis** for session storage and section timing.

Redis is resolved in this order (see [`lib/redis.ts`](lib/redis.ts)):

1. **TCP** — `REDIS_CONNECTION_STRING` or `REDIS_URL` as `rediss://…` or `redis://…`, or `REDIS_HOST` + `REDIS_PASSWORD` (and optional port / user) as in [`.env.example`](.env.example).
2. **Upstash REST** — `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (what the [Vercel Upstash for Redis](https://vercel.com/integrations/upstash) integration injects).

## Deploy on Vercel

1. **Repository** — Push this repo to GitHub (or GitLab/Bitbucket) and import it in Vercel, **project root** = repo root (contains [`vercel.json`](vercel.json), [`middleware.ts`](middleware.ts), [`api/`](api/)). Build is already set in `vercel.json` (`npm run build` → `dist`).

2. **Redis (pick one)**  
   - **Recommended (Vercel + Upstash):** In the Vercel project → **Storage** (or **Integrations**) → add **Upstash for Redis**, finish any browser steps to provision the database, and **connect** it to this project so `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` appear under **Settings → Environment Variables**. Redeploy after variables exist.  
   - **TCP instead:** From Redis Cloud, Vercel Redis, etc., copy a **`rediss://`** connection string into `REDIS_CONNECTION_STRING` (or `REDIS_URL`). Do **not** paste only the Upstash **HTTPS** REST URL as `REDIS_URL`; use the TCP URL for ioredis, or rely on the REST variables above.

3. **Secrets** — In **Project → Settings → Environment Variables** (Production, and Preview if you want the same behavior on preview URLs):

   - `SITE_PASSWORD` — shared with Northern Trust visitors (sign-in form).
   - `ADMIN_PASSWORD` — only for your team; used at `/admin` for the analytics dashboard.

4. **Deploy** — Trigger a production deploy. Open the production URL: you should see the **visitor** login. After sign-in, the SPA loads; scrolling records **time in section** (IntersectionObserver, ~50% visible) to Redis.

5. **Admin** — Open **`/admin`**, sign in with `ADMIN_PASSWORD`, then you are redirected to **`/api/admin-ui`** (HTML table of sessions and per-section dwell time).

Optional: set `DISABLE_SITE_AUTH=1` **only** for temporary debugging (disables the visitor gate; **do not** use in production).

### Linking from your machine (optional)

```bash
npm install
vercel link --project northern-trust-account-plan --scope <your-team-slug> -y
```

Use `vercel teams ls` / the CLI hint if `--scope` is required. To add env vars non-interactively: `vercel env add SITE_PASSWORD production --value "…" --yes`.

## Local production-like test

```bash
npm install
cp .env.example .env
# Fill SITE_PASSWORD, ADMIN_PASSWORD, and either TCP Redis vars OR UPSTASH_REDIS_REST_*
npx vercel dev
```

`vite dev` does **not** run Vercel middleware or `/api` routes; use `vercel dev` to exercise auth and analytics locally.

## Sign out

- Visitors: **`/api/logout`** (also linked in the footer).
- Admins: **`/api/admin-logout`** (linked from the analytics page).
