import { getRedis } from "../lib/redis.js";

declare const process: { env: Record<string, string | undefined> };

function describeUrl(raw: string | undefined): {
  present: boolean;
  scheme?: string;
  host?: string;
  port?: string;
} {
  if (!raw || !raw.trim()) return { present: false };
  const v = raw.trim();
  try {
    const u = new URL(v);
    return { present: true, scheme: u.protocol.replace(":", ""), host: u.hostname, port: u.port || "(default)" };
  } catch {
    return { present: true, scheme: "(unparseable)" };
  }
}

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (url.searchParams.get("token") !== process.env.ADMIN_PASSWORD) {
    return new Response("Forbidden", { status: 403 });
  }

  const info = {
    REDIS_CONNECTION_STRING: describeUrl(process.env.REDIS_CONNECTION_STRING),
    REDIS_URL: describeUrl(process.env.REDIS_URL),
    UPSTASH_REDIS_REST_URL_present: Boolean(process.env.UPSTASH_REDIS_REST_URL?.trim()),
    UPSTASH_REDIS_REST_TOKEN_present: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN?.trim()),
    REDIS_HOST_present: Boolean(process.env.REDIS_HOST?.trim()),
  };

  const redis = getRedis();
  let ping: { ok: boolean; ms?: number; error?: string } = { ok: false, error: "no client" };
  if (redis) {
    const t0 = Date.now();
    try {
      const probeKey = `ntr:health:${crypto.randomUUID()}`;
      await Promise.race([
        (async () => {
          await redis.set(probeKey, "ok", 30);
          await redis.get(probeKey);
        })(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("redis probe timeout 10s")), 10000),
        ),
      ]);
      ping = { ok: true, ms: Date.now() - t0 };
    } catch (e) {
      ping = { ok: false, ms: Date.now() - t0, error: e instanceof Error ? e.message : String(e) };
    }
  }

  return new Response(JSON.stringify({ env: info, ping }, null, 2), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export default { fetch: handler };
