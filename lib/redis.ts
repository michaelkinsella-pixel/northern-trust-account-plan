import Redis from "ioredis";

declare const process: { env: Record<string, string | undefined> };

/** TCP Redis used by serverless (Redis Cloud, Vercel Redis, Upstash TCP URL, etc.) */
export type AppRedis = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  keys(pattern: string): Promise<string[]>;
};

/** host:port only (no scheme) — combine with REDIS_PASSWORD or REDIS_TOKEN */
function urlFromHostPort(hostPort: string): string | null {
  const password =
    process.env.REDIS_PASSWORD?.trim() ||
    process.env.REDIS_TOKEN?.trim() ||
    process.env.REDIS_DEFAULT_USER_PASSWORD?.trim();
  if (!password) return null;
  const username = (process.env.REDIS_USERNAME ?? process.env.REDIS_USER ?? "default").trim() || "default";
  const useTls = process.env.REDIS_TLS !== "0" && process.env.REDIS_TLS !== "false";
  const scheme = useTls ? "rediss" : "redis";
  return `${scheme}://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${hostPort}`;
}

function resolveTcpUrl(): string | null {
  /** Use when Vercel locks `REDIS_URL` (Storage integration). */
  const manual = process.env.REDIS_CONNECTION_STRING?.trim();
  const raw = (manual || process.env.REDIS_URL?.trim()) ?? "";

  if (raw) {
    if (raw.startsWith("https://")) {
      return null;
    }
    if (/^(redis|rediss):\/\//i.test(raw)) {
      return raw;
    }
    if (/^[a-zA-Z0-9.-]+:\d+$/.test(raw)) {
      return urlFromHostPort(raw);
    }
    return raw;
  }

  const host = process.env.REDIS_HOST?.trim();
  const password =
    process.env.REDIS_PASSWORD?.trim() ||
    process.env.REDIS_TOKEN?.trim() ||
    process.env.REDIS_DEFAULT_USER_PASSWORD?.trim();
  const port = process.env.REDIS_PORT?.trim() || "6379";
  const username = (process.env.REDIS_USERNAME ?? process.env.REDIS_USER ?? "default").trim() || "default";
  if (!host || !password) return null;

  const useTls = process.env.REDIS_TLS !== "0" && process.env.REDIS_TLS !== "false";
  const scheme = useTls ? "rediss" : "redis";
  return `${scheme}://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}`;
}

function makeWrapper(io: Redis): AppRedis {
  return {
    get: (key) => io.get(key),
    async set(key, value, ttlSeconds) {
      await io.set(key, value, "EX", ttlSeconds);
    },
    keys: (pattern) => io.keys(pattern),
  };
}

type G = typeof globalThis & { __ntrRedisClient?: AppRedis | null };

export function getRedis(): AppRedis | null {
  const g = globalThis as G;
  if (g.__ntrRedisClient !== undefined) {
    return g.__ntrRedisClient;
  }

  const url = resolveTcpUrl();
  if (!url) {
    g.__ntrRedisClient = null;
    return null;
  }

  try {
    const io = new Redis(url, {
      maxRetriesPerRequest: 2,
      connectTimeout: 15000,
      enableOfflineQueue: false,
    });
    const wrapped = makeWrapper(io);
    g.__ntrRedisClient = wrapped;
    return wrapped;
  } catch {
    g.__ntrRedisClient = null;
    return null;
  }
}
