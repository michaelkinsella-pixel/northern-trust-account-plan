import { Redis as UpstashRedis } from "@upstash/redis";
import IoRedis from "ioredis";

declare const process: { env: Record<string, string | undefined> };

/** TCP or Upstash REST (HTTP) — used by serverless for sessions and analytics */
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

function makeIoWrapper(io: InstanceType<typeof IoRedis>): AppRedis {
  return {
    get: (key) => io.get(key),
    async set(key, value, ttlSeconds) {
      await io.set(key, value, "EX", ttlSeconds);
    },
    keys: (pattern) => io.keys(pattern),
  };
}

function normalizeGetValue(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return null;
  }
}

async function scanKeys(client: UpstashRedis, match: string): Promise<string[]> {
  const out: string[] = [];
  let cursor: string | number = 0;
  for (let i = 0; i < 5000; i++) {
    const page = await client.scan(cursor, { match });
    const nextCursor = page[0] as string | number;
    const batch = page[1] as string[];
    out.push(...batch);
    if (String(nextCursor) === "0") break;
    cursor = nextCursor;
  }
  return out;
}

function makeUpstashWrapper(client: UpstashRedis): AppRedis {
  return {
    async get(key) {
      const v = await client.get(key);
      return normalizeGetValue(v);
    },
    async set(key, value, ttlSeconds) {
      await client.set(key, value, { ex: ttlSeconds });
    },
    keys: (pattern) => scanKeys(client, pattern),
  };
}

type G = typeof globalThis & { __ntrRedisClient?: AppRedis | null };

export function getRedis(): AppRedis | null {
  const g = globalThis as G;
  if (g.__ntrRedisClient !== undefined) {
    return g.__ntrRedisClient;
  }

  const tcpUrl = resolveTcpUrl();
  if (tcpUrl) {
    try {
      const io = new IoRedis(tcpUrl, {
        maxRetriesPerRequest: 2,
        connectTimeout: 15000,
        enableOfflineQueue: false,
      });
      g.__ntrRedisClient = makeIoWrapper(io);
      return g.__ntrRedisClient;
    } catch {
      g.__ntrRedisClient = null;
      return null;
    }
  }

  const restUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (restUrl && restToken) {
    try {
      const up = new UpstashRedis({ url: restUrl, token: restToken });
      g.__ntrRedisClient = makeUpstashWrapper(up);
      return g.__ntrRedisClient;
    } catch {
      g.__ntrRedisClient = null;
      return null;
    }
  }

  g.__ntrRedisClient = null;
  return null;
}
