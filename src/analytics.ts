const VISIBILITY = 0.5;
const FLUSH_MS = 20_000;

type SectionState = {
  visible: boolean;
  enteredAt: number | null;
  pendingMs: number;
};

const states = new Map<string, SectionState>();

function getSections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-analytics-section]"));
}

function flush() {
  const deltas: Record<string, number> = {};
  for (const [id, st] of states) {
    if (st.visible && st.enteredAt !== null) {
      st.pendingMs += performance.now() - st.enteredAt;
      st.enteredAt = performance.now();
    }
    if (st.pendingMs > 0) {
      deltas[id] = Math.round(st.pendingMs);
      st.pendingMs = 0;
    }
  }
  if (Object.keys(deltas).length === 0) return;

  const path = `${location.pathname}${location.search}${location.hash}`;
  const body = JSON.stringify({ deltas, path });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/track", blob);
  } else {
    void fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      credentials: "same-origin",
      keepalive: true,
    });
  }
}

export function initAnalytics() {
  const els = getSections();
  if (!els.length) return;

  for (const el of els) {
    const id = el.dataset.analyticsSection;
    if (!id) continue;
    states.set(id, { visible: false, enteredAt: null, pendingMs: 0 });
  }

  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const id = (e.target as HTMLElement).dataset.analyticsSection;
        if (!id) continue;
        const st = states.get(id);
        if (!st) continue;
        const now = performance.now();
        if (e.isIntersecting && e.intersectionRatio >= VISIBILITY) {
          if (!st.visible) {
            st.visible = true;
            st.enteredAt = now;
          }
        } else if (st.visible) {
          if (st.enteredAt !== null) {
            st.pendingMs += now - st.enteredAt;
          }
          st.visible = false;
          st.enteredAt = null;
        }
      }
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  for (const el of els) {
    obs.observe(el);
  }

  window.setInterval(flush, FLUSH_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);
}
