const VISIBILITY = 0.5;
const FLUSH_MS = 10_000;

type SectionState = {
  visible: boolean;
  enteredAt: number | null;
  pendingMs: number;
};

let started = false;
const states = new Map<string, SectionState>();

function getSections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-analytics-section]"));
}

function flush(): void {
  const deltas: Record<string, number> = {};
  const now = performance.now();
  for (const [id, st] of states) {
    if (st.visible && st.enteredAt !== null) {
      st.pendingMs += now - st.enteredAt;
      st.enteredAt = now;
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
    const ok = navigator.sendBeacon("/api/track", blob);
    if (ok) return;
  }
  void fetch("/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => {});
}

function setup(): () => void {
  const els = getSections();
  for (const el of els) {
    const id = el.dataset.analyticsSection;
    if (!id) continue;
    if (!states.has(id)) {
      states.set(id, { visible: false, enteredAt: null, pendingMs: 0 });
    }
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

  for (const el of els) obs.observe(el);

  const interval = window.setInterval(flush, FLUSH_MS);
  const onVisibility = () => {
    if (document.visibilityState === "hidden") flush();
  };
  const onPageHide = () => flush();
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);

  return () => {
    obs.disconnect();
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
    flush();
  };
}

export function initAnalytics(): () => void {
  // Guard against React StrictMode double-mount calling this twice.
  if (started) return () => {};
  started = true;

  let teardown: (() => void) | null = null;

  if (getSections().length > 0) {
    teardown = setup();
  } else {
    // Sections not yet in the DOM (React hasn't committed). Wait and retry.
    const mo = new MutationObserver(() => {
      if (getSections().length > 0) {
        mo.disconnect();
        teardown = setup();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    teardown = () => mo.disconnect();
  }

  return () => {
    started = false;
    if (teardown) teardown();
    teardown = null;
  };
}
