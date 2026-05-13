import { useEffect, useMemo, useState, type ReactNode } from "react";
import { initAnalytics } from "./analytics";
import {
  atAGlanceNarratives,
  cursorPillars,
  heroStats,
  initiatives,
  kpiRows,
  ntAiInvestments,
  roadmap,
  stakeholders,
  sources,
  theAskAccountTeamLabel,
  theAskAccountTeamRows,
  theAskChecklist,
  theAskCta,
  theAskHeading,
  theAskIntro,
  theAskNextStep,
  type NtAiIconKey,
} from "./data";

const navItems = [
  { href: "#glance", label: "Snapshot" },
  { href: "#initiatives", label: "Initiatives" },
  { href: "#pillars", label: "Cursor capabilities" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#kpis", label: "Success metrics" },
  { href: "#team", label: "Working team" },
];

function NtInvestmentIcon({ name }: { name: NtAiIconKey }) {
  const c = "h-6 w-6 text-ntr-green";
  switch (name) {
    case "platform":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
        </svg>
      );
    case "strategy":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "agents":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 8V4H8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="4" y="8" width="16" height="12" rx="2" />
          <path d="M2 14h2M20 14h2M12 14v4" strokeLinecap="round" />
        </svg>
      );
    case "wealth":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "copilot":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "models":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "modernization":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
        </svg>
      );
    case "ecosystem":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="2" />
          <path d="M4.93 4.93l2.12 2.12M17.95 17.95l2.12 2.12M4.93 19.07l2.12-2.12M17.95 6.05l2.12-2.12M2 12h3M19 12h3M12 2v3M12 19v3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function AskCheckIcon() {
  return (
    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-300/25 ring-1 ring-amber-200/50" aria-hidden>
      <svg className="h-4 w-4 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function PhoneHandsetIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.44 12.44 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function initials(name: string) {
  const parts = name.replace(/'/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  const first = parts[0]![0];
  const last = parts[parts.length - 1]![0];
  return `${first}${last}`.toUpperCase();
}

function ConfidentialBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-white/35 bg-ntr-green-dark/35 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm md:text-xs ${className}`}
    >
      <svg className="h-4 w-4 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
      Confidential — prepared for Northern Trust
    </div>
  );
}

function HeroWatermark() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.055]" aria-hidden>
      <defs>
        <pattern id="ntr-hero-mark" width="72" height="72" patternUnits="userSpaceOnUse">
          <circle cx="36" cy="36" r="28" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ntr-hero-mark)" />
    </svg>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  dark = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <header id={id} className="mb-6 scroll-mt-28 md:mb-8">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${dark ? "text-white/85" : "text-ntr-green"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2 border-l-4 pl-4 text-2xl font-semibold leading-[1.15] tracking-tight md:text-3xl ${
          dark ? "border-white text-white" : "border-ntr-green text-ntr-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 max-w-3xl text-base leading-relaxed md:text-lg ${dark ? "text-white/85" : "text-ntr-muted"}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}

function DataTable({
  headers,
  rows,
  dense,
}: {
  headers: string[];
  rows: ReactNode[][];
  dense?: boolean;
}) {
  const cell = dense ? "px-4 py-3 text-base" : "px-5 py-4 text-base md:text-lg";
  return (
    <div className="overflow-x-auto rounded-xl border border-ntr-line bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-ntr-green-soft">
            {headers.map((h) => (
              <th
                key={h}
                className={`${cell} text-left text-xs font-semibold uppercase tracking-wide text-ntr-green md:text-sm`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-stone-50/90" : "bg-white"}>
              {row.map((cellNode, j) => (
                <td key={j} className={`${cell} border-t border-ntr-line align-top text-stone-800`}>
                  {cellNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(initiatives[0]!.id);
  const active = useMemo(
    () => initiatives.find((x) => x.id === activeId) ?? initiatives[0]!,
    [activeId],
  );

  useEffect(() => {
    return initAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-ntr-canvas text-ntr-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ntr-green focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ntr-green"
      >
        Skip to content
      </a>

      {/* Top bar — Northern Trust green + white, single thin row */}
      <header className="sticky top-0 z-40 border-b border-white/15 bg-ntr-green text-white shadow-md shadow-ntr-green-dark/40">
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-4 md:h-14 md:gap-5 md:px-6">
          <a href="#hero" className="flex shrink-0 items-center gap-2 text-sm font-semibold text-white hover:text-white/90 md:text-base">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 md:text-xs">NT</span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="whitespace-nowrap">Account Plan</span>
          </a>
          <nav
            aria-label="Page sections"
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex"
          >
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white md:text-sm"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center md:ml-0">
            <a
              href="#ask"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ntr-green shadow-md transition hover:bg-ntr-green-soft md:px-4 md:py-2 md:text-sm"
            >
              Start the trial conversation <span aria-hidden>→</span>
            </a>
          </div>
        </div>
        {/* Below-md: thin nav row */}
        <nav
          aria-label="Page sections (mobile)"
          className="flex gap-0.5 overflow-x-auto border-t border-white/10 bg-ntr-green-dark/30 px-3 py-1.5 md:hidden"
        >
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <section
        id="hero"
        data-analytics-section="hero"
        className="relative bg-linear-to-b from-ntr-green from-65% to-ntr-hero-deep text-white"
      >
        <HeroWatermark />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ntr-hero-deep/90 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <ConfidentialBadge className="mb-4" />

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Account plan</p>

          <h1 className="mt-3 max-w-5xl text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <span className="block">Northern Trust</span>
            <span className="mt-1 flex flex-wrap items-baseline gap-3 md:gap-4">
              <span className="text-ntr-on-green-muted">×</span>
              <span>Cursor</span>
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/92 md:text-lg">
            A focused account plan for what an enterprise Cursor deployment looks like at Northern Trust: where it fits alongside
            NT Byron and Microsoft-stack tooling, what we trial in 30–45 days, and the operating model for scaling Cursor across
            engineering without weakening the controls a global custodian bank requires.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#initiatives"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-ntr-green shadow-lg shadow-ntr-green-dark/30 transition hover:bg-ntr-green-soft"
            >
              See the initiatives <span aria-hidden>→</span>
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center rounded-full border-2 border-white/50 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              12-month roadmap
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className={`rounded-xl border px-5 py-4 shadow-md ${
                  s.emphasis
                    ? "border-amber-200/60 bg-amber-200/[0.08] ring-1 ring-amber-200/40"
                    : "border-white/20 bg-white/[0.06]"
                }`}
              >
                <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{s.value}</p>
                <p className="mt-1.5 text-xs font-semibold uppercase leading-snug tracking-wide text-white/75 md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 max-w-3xl text-xs text-white/55 md:text-sm">
            Benchmark tiles are directional—your pilot defines baselines, targets, and guardrails with engineering and risk.
          </p>
        </div>
      </section>

      <main id="main" className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* Snapshot — high-contrast cards */}
        <section id="glance" data-analytics-section="glance" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Snapshot"
            title="Northern Trust at a glance"
            description="Strategic context for where AI meets software delivery—grounded in public disclosures and hiring signals."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {atAGlanceNarratives.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-ntr-green-dark/20 bg-linear-to-br from-ntr-green from-10% to-ntr-green-dark p-6 text-white shadow-lg shadow-ntr-green-dark/20 md:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ntr-on-green-muted">{card.overline}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug md:text-2xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/88 md:text-base">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200/80">
              <span aria-hidden>✨</span> Where Cursor adds value
            </p>
            <h3 className="mb-5 text-xl font-semibold tracking-tight text-ntr-ink md:text-2xl">
              Northern Trust AI investments — how Cursor helps
            </h3>
            <div className="space-y-4">
              {ntAiInvestments.map((row, i) => (
                <article
                  key={row.label}
                  className="overflow-hidden rounded-2xl border border-ntr-line bg-white shadow-sm ring-1 ring-black/[0.03]"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-1 gap-4 p-5 md:p-6 lg:flex-[1.15]">
                      <div className="flex shrink-0 gap-2.5">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ntr-green text-xs font-bold text-white md:h-12 md:w-12 md:text-sm"
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ntr-green-soft ring-1 ring-ntr-green-muted/60 md:h-12 md:w-12">
                          <NtInvestmentIcon name={row.icon} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg font-semibold text-ntr-ink md:text-xl">
                          {i + 1}. {row.label}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-ntr-muted md:text-base">{row.detail}</p>
                      </div>
                    </div>
                    <div className="border-t border-ntr-line bg-ntr-callout-bg p-5 md:p-6 lg:w-[min(100%,24rem)] lg:shrink-0 lg:border-l lg:border-t-0 lg:border-ntr-callout-border">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-ntr-callout-heading">
                        Why Cursor lands at Northern Trust
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ntr-callout-text md:text-base">{row.cursorHelps}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="initiatives" data-analytics-section="initiatives" className="mt-14 scroll-mt-28 md:mt-16">
          <SectionHeading
            eyebrow="Initiatives"
            title="Where Cursor maps to your technology agenda"
            description="Hypothesis-led themes from public signals—use them to steer the conversation, then replace with your confirmed priorities."
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="lg:w-[20rem] lg:shrink-0">
              <nav aria-label="Initiatives" className="space-y-2 lg:sticky lg:top-28">
                {initiatives.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setActiveId(b.id)}
                    className={`w-full rounded-lg border-l-4 py-3 pl-4 pr-3 text-left transition-colors ${
                      activeId === b.id
                        ? "border-ntr-green bg-white shadow-md ring-1 ring-ntr-line"
                        : "border-transparent bg-white/70 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ntr-ink md:text-base">{b.title}</span>
                    <span className="mt-1 block text-xs leading-snug text-ntr-muted md:text-sm">{b.subtitle}</span>
                  </button>
                ))}
              </nav>
            </div>
            <article className="min-w-0 flex-1 rounded-2xl border border-ntr-line bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-xl font-semibold text-ntr-ink md:text-2xl">{active.title}</h3>
              <p className="mt-1 text-sm text-ntr-muted md:text-base">{active.subtitle}</p>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">Hypothesis</h4>
                  <p className="mt-2 text-sm leading-relaxed text-stone-800 md:text-base">{active.hypothesis}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">Business drivers</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-ntr-muted md:text-base">
                    {active.observedSignals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-ntr-line pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">How Cursor helps</h4>
                  <p className="mt-2 text-sm font-semibold text-ntr-ink md:text-base">{active.cursorHeadline}</p>
                  <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-ntr-muted md:text-base">
                    {active.cursorBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">Discovery questions</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-ntr-muted md:text-base">
                    {active.discoveryQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
                <p className="border-t border-ntr-line pt-5 text-xs leading-relaxed text-stone-500 md:text-sm">{active.proof}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="pillars" data-analytics-section="pillars" className="mt-14 scroll-mt-28 md:mt-16">
          <SectionHeading
            eyebrow="Product"
            title="Cursor capabilities on day one"
            description="One platform—distinct surfaces for completion, agentic execution, review automation, and enterprise controls."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {cursorPillars.map((p) => (
              <article
                key={p.name}
                className="group relative rounded-xl border border-ntr-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-7"
              >
                <span className="absolute left-0 top-6 h-8 w-1 rounded-r bg-ntr-green md:top-7" aria-hidden />
                <h3 className="pl-3 text-lg font-semibold text-ntr-green md:text-xl">{p.name}</h3>
                <p className="mt-1.5 pl-3 text-sm font-semibold text-ntr-ink md:text-base">{p.tagline}</p>
                <p className="mt-2.5 pl-3 text-sm leading-relaxed text-ntr-muted md:text-base">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" data-analytics-section="roadmap" className="mt-14 scroll-mt-28 md:mt-16">
          <SectionHeading
            eyebrow="Motion"
            title="Discover → Pilot → Scale → Operate"
            description="From first workshop to Cursor as a sanctioned default for eligible engineering populations—structured around Cursor's enterprise playbook, tailored to Northern Trust."
          />
          <div className="space-y-5">
            {roadmap.map((p) => (
              <article key={p.phase} className="overflow-hidden rounded-2xl border border-ntr-line bg-white shadow-sm">
                <div className="border-b border-ntr-line bg-ntr-green-soft px-5 py-3.5 md:px-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-ntr-green md:text-xl">{p.phase}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ntr-muted md:text-sm">{p.timing}</p>
                  </div>
                </div>
                <div className="space-y-5 px-5 py-5 md:px-7 md:py-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">Goals</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-ntr-muted md:text-base">
                      {p.goals.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-5 border-t border-ntr-line pt-5 md:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">Northern Trust</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-ntr-muted md:text-base">
                        {p.northernTrust.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ntr-green md:text-sm">Cursor</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-ntr-muted md:text-base">
                        {p.cursor.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="kpis" data-analytics-section="kpis" className="mt-14 scroll-mt-28 md:mt-16">
          <SectionHeading
            eyebrow="Measurement"
            title="Success metrics — measured in the pilot"
            description="Replace placeholders with Northern Trust baselines once discovery locks cohort scope and definitions."
          />
          <DataTable
            dense
            headers={["Metric", "Baseline", "Target", "Note"]}
            rows={kpiRows.map((k) => [k.label, k.baseline, k.target, k.note])}
          />
        </section>

        <section id="team" data-analytics-section="team" className="mt-14 scroll-mt-28 md:mt-16">
          <SectionHeading
            eyebrow="People"
            title="Working team across the trial"
            description="Northern Trust names reflect public leadership listings—confirm owners and delegates in your organization."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {(["Northern Trust", "Cursor"] as const).map((org) => (
              <div key={org} className="overflow-hidden rounded-2xl border border-ntr-line bg-white shadow-sm">
                <div className="border-b border-ntr-line bg-ntr-green px-5 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white md:text-sm">{org}</h3>
                </div>
                <ul className="divide-y divide-ntr-line">
                  {stakeholders
                    .filter((s) => s.org === org)
                    .map((s) => (
                      <li key={s.name} className="flex gap-4 px-5 py-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ntr-green-soft text-xs font-bold text-ntr-green md:text-sm"
                          aria-hidden
                        >
                          {initials(s.name)}
                        </span>
                        <div>
                          <p className="text-base font-semibold text-ntr-ink">{s.name}</p>
                          <p className="mt-0.5 text-sm text-ntr-muted">{s.role}</p>
                          <p className="mt-1 text-xs text-stone-500 md:text-sm">{s.focus}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="ask" data-analytics-section="ask" className="mt-14 scroll-mt-28 md:mt-16">
          <div className="overflow-hidden rounded-3xl bg-linear-to-br from-ntr-green from-40% to-ntr-hero-deep p-6 text-white shadow-2xl shadow-ntr-green-dark/30 md:p-9 lg:p-11">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/95">Next step</p>
                <h2 className="mt-2 text-2xl font-semibold leading-[1.15] tracking-tight md:text-3xl lg:text-4xl">
                  {theAskHeading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">{theAskIntro}</p>
                <ul className="mt-6 space-y-3">
                  {theAskChecklist.map((line) => (
                    <li key={line} className="flex gap-3">
                      <AskCheckIcon />
                      <span className="text-sm leading-relaxed text-white/92 md:text-base">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-ntr-green-dark/55 p-5 shadow-inner backdrop-blur-sm md:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/95">Next step</p>
                  <p className="mt-2 text-lg font-semibold leading-snug md:text-xl">{theAskNextStep.headline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/82 md:text-base">{theAskNextStep.description}</p>

                  <div className="mt-5 rounded-xl border border-white/15 bg-black/15 p-4 md:p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/95">{theAskAccountTeamLabel}</p>
                    <ul className="mt-3 space-y-3">
                      {theAskAccountTeamRows.map((row) => (
                        <li key={`${row.name}-${row.title}`} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                          <p className="text-base font-semibold text-white md:text-lg">{row.name}</p>
                          <p className="mt-0.5 text-xs text-white/75 md:text-sm">{row.title}</p>
                          {row.note ? <p className="mt-0.5 text-xs text-white/55">{row.note}</p> : null}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    {theAskCta.tel ? (
                      <a
                        href={theAskCta.tel}
                        aria-label={
                          theAskCta.telDisplay
                            ? `${theAskCta.label} — ${theAskCta.telDisplay}`
                            : theAskCta.label
                        }
                        className="inline-flex w-full flex-col items-center justify-center gap-1.5 rounded-full bg-amber-300 px-5 py-3 text-center text-base font-bold text-ntr-green shadow-lg transition hover:bg-amber-200"
                      >
                        <span className="inline-flex items-center gap-2">
                          <PhoneHandsetIcon className="h-5 w-5" />
                          {theAskCta.label}
                        </span>
                        {theAskCta.telDisplay ? (
                          <span className="text-[13px] font-semibold tracking-wide text-ntr-green/80">
                            {theAskCta.telDisplay}
                          </span>
                        ) : null}
                      </a>
                    ) : (
                      <div>
                        <p className="inline-flex w-full flex-col items-center justify-center gap-1.5 rounded-full border border-amber-200/40 bg-amber-300 px-5 py-3 text-center text-base font-bold text-ntr-green shadow-lg">
                          <span className="inline-flex items-center gap-2">
                            <PhoneHandsetIcon className="h-5 w-5" />
                            {theAskCta.label}
                          </span>
                          <span className="max-w-xs text-[11px] font-normal leading-snug text-ntr-green/80">
                            Direct dial shared on your meeting invite or through your Cursor coordinator.
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ntr-line bg-ntr-green py-8 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-sm leading-relaxed text-white/85 md:text-base">
            Confidential — prepared for Northern Trust. Hypotheses reflect public sources as of the research date; confirm internally
            before external use. Cursor enterprise features should be validated against current documentation and procurement needs.
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ntr-green-soft md:text-sm">Sources</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm md:text-base">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white" target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-white/70 md:text-sm">
            <a href="/api/logout" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Sign out (visitor)
            </a>
            {" · "}
            <a href="/admin" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Analytics admin
            </a>
          </p>
          <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-white/55">Cursor</p>
        </div>
      </footer>
    </div>
  );
}
