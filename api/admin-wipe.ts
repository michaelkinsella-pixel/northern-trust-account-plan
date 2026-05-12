import { getRedis } from "../lib/redis.js";
import type { SessionRecord } from "../lib/session.js";

async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const adminPw = process.env.ADMIN_PASSWORD ?? "";
  const headerPw = request.headers.get("x-admin-password") ?? "";
  if (!adminPw || headerPw !== adminPw) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
  const redis = getRedis();
  if (!redis) {
    return new Response(JSON.stringify({ ok: false, error: "redis not configured" }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") ?? "keep-newest"; // keep-newest | all

  const keys = await redis.keys("ntr:session:*");
  const rows: Array<{ k: string; rec: SessionRecord }> = [];
  for (const k of keys) {
    const raw = await redis.get(k);
    if (!raw) continue;
    try {
      rows.push({ k, rec: JSON.parse(raw) as SessionRecord });
    } catch {
      await redis.del(k);
    }
  }
  rows.sort((a, b) => b.rec.lastSeenAt - a.rec.lastSeenAt);

  let kept: SessionRecord | null = null;
  let toDelete: typeof rows = [];
  if (mode === "all") {
    toDelete = rows;
  } else {
    if (rows.length > 0) {
      kept = rows[0]!.rec;
      toDelete = rows.slice(1);
    }
  }
  for (const { k } of toDelete) await redis.del(k);

  return new Response(
    JSON.stringify({
      ok: true,
      mode,
      kept: kept
        ? { id: kept.id, visitorName: kept.visitorName, lastSeenAt: kept.lastSeenAt }
        : null,
      deletedCount: toDelete.length,
    }),
    { status: 200, headers: { "content-type": "application/json; charset=utf-8" } },
  );
}

export default { fetch: handler };
