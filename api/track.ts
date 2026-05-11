import { getRedis } from "../lib/redis.js";
import { parseCookies } from "../lib/cookies.js";
import { SITE_COOKIE } from "../lib/session.js";
import type { SessionRecord } from "../lib/session.js";
import { sessionKey } from "../lib/session.js";

const TTL_SEC = 60 * 60 * 24 * 90;

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const redis = getRedis();
  if (!redis) {
    return new Response(JSON.stringify({ ok: false, error: "Redis not configured" }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const cookies = parseCookies(request.headers.get("cookie"));
  const sid = cookies[SITE_COOKIE];
  if (!sid) {
    return new Response(JSON.stringify({ ok: false, error: "No session" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  let body: { deltas?: Record<string, number>; path?: string };
  try {
    body = (await request.json()) as { deltas?: Record<string, number>; path?: string };
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const deltas = body.deltas ?? {};
  const raw = await redis.get(sessionKey(sid));
  if (!raw) {
    return new Response(JSON.stringify({ ok: false, error: "Unknown session" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const rec = JSON.parse(raw) as SessionRecord;
  if (!rec.sections) rec.sections = {};
  for (const [section, ms] of Object.entries(deltas)) {
    if (!section || typeof ms !== "number" || !Number.isFinite(ms) || ms < 0 || ms > 1000 * 60 * 60) continue;
    rec.sections[section] = (rec.sections[section] ?? 0) + ms;
  }
  rec.lastSeenAt = Date.now();
  if (body.path && typeof body.path === "string" && body.path.length < 512) {
    rec.lastPath = body.path;
  }

  await redis.set(sessionKey(sid), JSON.stringify(rec), TTL_SEC);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
