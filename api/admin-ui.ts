import { getRedis } from "../lib/redis.js";
import { parseCookies } from "../lib/cookies.js";
import { ADMIN_COOKIE } from "../lib/session.js";
import type { SessionRecord } from "../lib/session.js";

async function loadSessions(): Promise<SessionRecord[]> {
  const redis = getRedis();
  if (!redis) return [];
  const keys = await redis.keys("ntr:session:*");
  if (!keys.length) return [];
  const sessions: SessionRecord[] = [];
  for (const k of keys) {
    const raw = await redis.get(k);
    if (!raw) continue;
    try {
      sessions.push(JSON.parse(raw) as SessionRecord);
    } catch {
      /* ignore corrupt */
    }
  }
  sessions.sort((a, b) => b.lastSeenAt - a.lastSeenAt);
  return sessions;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)} s`;
  const m = s / 60;
  if (m < 60) return `${m.toFixed(1)} min`;
  return `${(m / 60).toFixed(1)} h`;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const cookies = parseCookies(request.headers.get("cookie"));
  if (cookies[ADMIN_COOKIE] !== "1") {
    return new Response("Unauthorized", { status: 401, headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const sessions = await loadSessions();
  const sectionOrder = ["hero", "glance", "initiatives", "pillars", "roadmap", "kpis", "team", "ask"];

  const rowsHtml =
    sessions.length === 0
      ? `<tr><td colspan="${5 + sectionOrder.length}" style="text-align:center;padding:24px">No sessions yet.</td></tr>`
      : sessions
          .map((s) => {
            const cells = sectionOrder
              .map((id) => {
                const v = s.sections[id] ?? 0;
                return `<td class="num">${v ? esc(formatMs(v)) : "—"}</td>`;
              })
              .join("");
            const created = new Date(s.createdAt).toISOString();
            const last = new Date(s.lastSeenAt).toISOString();
            return `<tr>
        <td>${esc(s.visitorName)}</td>
        <td class="mono">${esc(s.id)}</td>
        <td class="mono">${esc(created)}</td>
        <td class="mono">${esc(last)}</td>
        <td class="small">${esc(s.lastPath ?? "—")}</td>
        ${cells}
      </tr>`;
          })
          .join("");

  const head = sectionOrder.map((id) => `<th>${id}</th>`).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Analytics · Northern Trust account plan</title>
  <style>
    :root { font-family: system-ui, sans-serif; background: #0c3024; color: #fff; }
    body { margin: 0; padding: 24px; }
    a { color: #d8ebe2; }
    h1 { font-size: 1.35rem; margin: 0 0 8px; }
    p { color: #c5ddd0; margin: 0 0 20px; }
    .bar { display: flex; gap: 16px; align-items: center; margin-bottom: 20px; flex-wrap: wrap; }
    table { width: 100%; border-collapse: collapse; background: #115740; border-radius: 12px; overflow: hidden; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 13px; }
    th { background: #0a3d2e; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
    tr:last-child td { border-bottom: none; }
    .mono { font-family: ui-monospace, monospace; font-size: 12px; }
    .num { text-align: right; white-space: nowrap; }
    .small { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  </style>
</head>
<body>
  <div class="bar">
    <h1>Visitor analytics</h1>
    <a href="/api/admin-logout">Sign out admin</a>
    <a href="/">View site</a>
  </div>
  <p>Cumulative time in view per section (IntersectionObserver, ~50% visibility). ${sessions.length} session(s).</p>
  <div style="overflow-x:auto">
    <table>
      <thead><tr>
        <th>Visitor</th>
        <th>Session</th>
        <th>First seen (UTC)</th>
        <th>Last seen (UTC)</th>
        <th>Last path</th>
        ${head}
      </tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
  </div>
</body>
</html>`;

  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}
