import { useMemo, useState, type ReactNode } from "react";
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
    <header id={id} className="mb-10 scroll-mt-32">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] md:text-sm ${dark ? "text-white/80" : "text-ntr-green"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 border-l-4 pl-5 text-3xl font-semibold tracking-tight md:text-4xl ${
          dark ? "border-white text-white" : "border-ntr-green text-ntr-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-3xl text-lg leading-relaxed md:text-xl ${dark ? "text-white/88" : "text-ntr-muted"}`}>
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

  return (
    <div className="min-h-screen bg-ntr-canvas text-ntr-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ntr-green focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ntr-green"
      >
        Skip to content
      </a>

      {/* Top bar — Northern Trust green + white */}
      <header className="sticky top-0 z-40 border-b border-white/15 bg-ntr-green text-white shadow-md shadow-ntr-green-dark/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 md:text-sm">Northern Trust</span>
            <span className="text-base font-semibold text-white md:text-lg">Account Plan · Northern Trust</span>
            <span className="text-sm text-white/65 md:text-base">Confidential — prepared for Northern Trust</span>
          </div>
          <nav
            aria-label="Page sections"
            className="order-last flex w-full gap-1 overflow-x-auto pb-1 lg:order-none lg:w-auto lg:max-w-none lg:flex-1 lg:justify-center lg:overflow-visible lg:pb-0"
          >
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white md:text-base"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center">
            <a
              href="#ask"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ntr-green shadow-md transition hover:bg-ntr-green-soft md:text-base"
            >
              Start the trial conversation <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </header>

      <section
        id="hero"
        data-analytics-section="hero"
        className="relative bg-linear-to-b from-ntr-green from-65% to-ntr-hero-deep text-white"
      >
        <HeroWatermark />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-ntr-hero-deep/90 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <ConfidentialBadge className="mb-8" />

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75 md:text-sm">Account plan</p>

          <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <span className="block">Northern Trust</span>
            <span className="mt-1 flex flex-wrap items-center gap-3 md:gap-4">
              <span className="text-ntr-on-green-muted">×</span>
              <span>Cursor</span>
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/92 md:text-xl md:leading-relaxed">
            A focused account plan for what an enterprise Cursor deployment looks like at Northern Trust: where it fits alongside
            NT Byron and Microsoft-stack tooling, what we trial in 30–45 days, and the operating model for scaling Cursor across
            engineering without weakening the controls a global custodian bank requires.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#initiatives"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-ntr-green shadow-lg hover:bg-ntr-green-soft md:text-lg"
            >
              See the initiatives <span aria-hidden>→</span>
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center rounded-full border-2 border-white/50 bg-transparent px-7 py-4 text-base font-semibold text-white hover:bg-white/10 md:text-lg"
            >
              12-month roadmap
            </a>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border px-6 py-7 shadow-lg ${
                  s.emphasis
                    ? "border-white/55 bg-white/12 ring-2 ring-white/35"
                    : "border-white/20 bg-white/[0.07]"
                }`}
              >
                <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{s.value}</p>
                <p className="mt-3 text-sm font-medium uppercase leading-snug tracking-wide text-white/75 md:text-base">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-white/55 md:text-base">
            Benchmark tiles are directional—your pilot defines baselines, targets, and guardrails with engineering and risk.
          </p>
        </div>
      </section>

      <main id="main" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        {/* Snapshot — high-contrast cards */}
        <section id="glance" data-analytics-section="glance" className="scroll-mt-32">
          <SectionHeading
            eyebrow="Snapshot"
            title="Northern Trust at a glance"
            description="Strategic context for where AI meets software delivery—grounded in public disclosures and hiring signals, not internally confirmed facts."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {atAGlanceNarratives.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-ntr-green-dark/20 bg-linear-to-br from-ntr-green from-10% to-ntr-green-dark p-8 text-white shadow-xl md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ntr-on-green-muted md:text-sm">{card.overline}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">{card.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-white/88 md:text-lg">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200/80 md:text-sm">
              <span aria-hidden>✨</span> Where Cursor adds value
            </p>
            <h3 className="mb-8 text-2xl font-semibold tracking-tight text-ntr-ink md:text-3xl">
              Northern Trust AI investments — how Cursor helps
            </h3>
            <div className="space-y-6">
              {ntAiInvestments.map((row, i) => (
                <article
                  key={row.label}
                  className="overflow-hidden rounded-2xl border border-ntr-line bg-white shadow-sm ring-1 ring-black/[0.03]"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-1 gap-5 p-6 md:gap-6 md:p-8 lg:flex-[1.15]">
                      <div className="flex shrink-0 gap-3 md:gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ntr-green text-sm font-bold text-white md:h-14 md:w-14 md:text-base"
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ntr-green-soft ring-1 ring-ntr-green-muted/60 md:h-14 md:w-14">
                          <NtInvestmentIcon name={row.icon} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xl font-semibold text-ntr-ink md:text-2xl">
                          {i + 1}. {row.label}
                        </h4>
                        <p className="mt-3 text-base leading-relaxed text-ntr-muted md:text-lg">{row.detail}</p>
                      </div>
                    </div>
                    <div className="border-t border-ntr-line bg-ntr-callout-bg p-6 md:p-8 lg:w-[min(100%,26rem)] lg:shrink-0 lg:border-l lg:border-t-0 lg:border-ntr-callout-border">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-ntr-callout-heading md:text-sm">
                        Why Cursor lands at Northern Trust
                      </p>
                      <p className="mt-4 text-base leading-relaxed text-ntr-callout-text md:text-lg">{row.cursorHelps}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="initiatives" data-analytics-section="initiatives" className="mt-24 scroll-mt-32 md:mt-28">
          <SectionHeading
            eyebrow="Initiatives"
            title="Where Cursor maps to your technology agenda"
            description="Hypothesis-led themes from public signals—use them to steer the conversation, then replace with your confirmed priorities."
          />
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="lg:w-[22rem] lg:shrink-0">
              <nav aria-label="Initiatives" className="space-y-3 lg:sticky lg:top-36">
                {initiatives.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setActiveId(b.id)}
                    className={`w-full rounded-xl border-l-4 py-4 pl-5 pr-4 text-left transition-colors ${
                      activeId === b.id
                        ? "border-ntr-green bg-white shadow-md ring-1 ring-ntr-line"
                        : "border-transparent bg-white/80 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className="block text-base font-semibold text-ntr-ink md:text-lg">{b.title}</span>
                    <span className="mt-2 block text-sm leading-snug text-ntr-muted md:text-base">{b.subtitle}</span>
                  </button>
                ))}
              </nav>
            </div>
            <article className="min-w-0 flex-1 rounded-2xl border border-ntr-line bg-white p-8 shadow-sm md:p-10">
              <h3 className="text-2xl font-semibold text-ntr-ink md:text-3xl">{active.title}</h3>
              <p className="mt-2 text-base text-ntr-muted md:text-lg">{active.subtitle}</p>

              <div className="mt-10 space-y-10">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">Hypothesis</h4>
                  <p className="mt-3 text-base leading-relaxed text-stone-800 md:text-lg">{active.hypothesis}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">Business drivers</h4>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-base text-ntr-muted md:text-lg">
                    {active.observedSignals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-ntr-line pt-10">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">How Cursor helps</h4>
                  <p className="mt-3 text-base font-semibold text-ntr-ink md:text-lg">{active.cursorHeadline}</p>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-base text-ntr-muted md:text-lg">
                    {active.cursorBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">Discovery questions</h4>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-base text-ntr-muted md:text-lg">
                    {active.discoveryQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
                <p className="border-t border-ntr-line pt-8 text-sm leading-relaxed text-stone-500 md:text-base">{active.proof}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="pillars" data-analytics-section="pillars" className="mt-24 scroll-mt-32 md:mt-28">
          <SectionHeading
            eyebrow="Product"
            title="Cursor capabilities on day one"
            description="One platform—distinct surfaces for completion, agentic execution, review automation, and enterprise controls."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {cursorPillars.map((p) => (
              <article key={p.name} className="rounded-xl border border-ntr-line bg-white p-8 shadow-sm md:p-9">
                <h3 className="text-xl font-semibold text-ntr-green md:text-2xl">{p.name}</h3>
                <p className="mt-2 text-base font-semibold text-ntr-ink md:text-lg">{p.tagline}</p>
                <p className="mt-4 text-base leading-relaxed text-ntr-muted md:text-lg">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" data-analytics-section="roadmap" className="mt-24 scroll-mt-32 md:mt-28">
          <SectionHeading
            eyebrow="Motion"
            title="Discover → Pilot → Scale → Operate"
            description="From first workshop to Cursor as a sanctioned default for eligible engineering populations—structured around Cursor's enterprise playbook, tailored to Northern Trust."
          />
          <div className="space-y-10">
            {roadmap.map((p) => (
              <article key={p.phase} className="overflow-hidden rounded-2xl border border-ntr-line bg-white shadow-sm">
                <div className="border-b border-ntr-line bg-ntr-green-soft px-6 py-5 md:px-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-xl font-semibold text-ntr-green md:text-2xl">{p.phase}</h3>
                    <p className="text-sm font-semibold uppercase tracking-wide text-ntr-muted md:text-base">{p.timing}</p>
                  </div>
                </div>
                <div className="space-y-8 px-6 py-8 md:px-8">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">Goals</h4>
                    <ul className="mt-3 list-inside list-disc space-y-2 text-base text-ntr-muted md:text-lg">
                      {p.goals.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-8 border-t border-ntr-line pt-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">Northern Trust</h4>
                      <ul className="mt-3 list-inside list-disc space-y-2 text-base text-ntr-muted md:text-lg">
                        {p.northernTrust.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-ntr-green md:text-base">Cursor</h4>
                      <ul className="mt-3 list-inside list-disc space-y-2 text-base text-ntr-muted md:text-lg">
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

        <section id="kpis" data-analytics-section="kpis" className="mt-24 scroll-mt-32 md:mt-28">
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

        <section id="team" data-analytics-section="team" className="mt-24 scroll-mt-32 md:mt-28">
          <SectionHeading
            eyebrow="People"
            title="Working team across the trial"
            description="Northern Trust names reflect public leadership listings—confirm owners and delegates in your organization."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {(["Northern Trust", "Cursor"] as const).map((org) => (
              <div key={org} className="overflow-hidden rounded-2xl border border-ntr-line bg-white shadow-sm">
                <div className="border-b border-ntr-line bg-ntr-green px-6 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white md:text-base">{org}</h3>
                </div>
                <ul className="divide-y divide-ntr-line">
                  {stakeholders
                    .filter((s) => s.org === org)
                    .map((s) => (
                      <li key={s.name} className="flex gap-5 px-6 py-5">
                        <span
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ntr-green-soft text-sm font-bold text-ntr-green md:text-base"
                          aria-hidden
                        >
                          {initials(s.name)}
                        </span>
                        <div>
                          <p className="text-lg font-semibold text-ntr-ink">{s.name}</p>
                          <p className="mt-1 text-base text-ntr-muted">{s.role}</p>
                          <p className="mt-2 text-sm text-stone-500 md:text-base">{s.focus}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="ask" data-analytics-section="ask" className="mt-24 scroll-mt-32 md:mt-28">
          <div className="overflow-hidden rounded-3xl bg-linear-to-br from-ntr-green from-40% to-ntr-hero-deep p-8 text-white shadow-2xl shadow-ntr-green-dark/30 md:p-12 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/95 md:text-sm">Next step</p>
                <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.65rem]">
                  {theAskHeading}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">{theAskIntro}</p>
                <ul className="mt-10 space-y-5">
                  {theAskChecklist.map((line) => (
                    <li key={line} className="flex gap-4">
                      <AskCheckIcon />
                      <span className="text-base leading-relaxed text-white/92 md:text-lg">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-ntr-green-dark/50 p-6 shadow-inner backdrop-blur-sm md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/95 md:text-sm">Next step</p>
                  <p className="mt-4 text-xl font-semibold leading-snug md:text-2xl">{theAskNextStep.headline}</p>
                  <p className="mt-4 text-base leading-relaxed text-white/82 md:text-lg">{theAskNextStep.description}</p>

                  <div className="mt-8 rounded-xl border border-white/15 bg-black/15 p-5 md:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200/95 md:text-sm">{theAskAccountTeamLabel}</p>
                    <ul className="mt-5 space-y-5">
                      {theAskAccountTeamRows.map((row) => (
                        <li key={`${row.name}-${row.title}`} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                          <p className="text-lg font-semibold text-white md:text-xl">{row.name}</p>
                          <p className="mt-1 text-sm text-white/75 md:text-base">{row.title}</p>
                          {row.note ? <p className="mt-1 text-sm text-white/55">{row.note}</p> : null}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    {theAskCta.tel ? (
                      <a
                        href={theAskCta.tel}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-300 px-6 py-4 text-base font-bold text-ntr-green shadow-lg transition hover:bg-amber-200 md:text-lg"
                      >
                        <PhoneHandsetIcon className="h-5 w-5" />
                        {theAskCta.label}
                        {theAskCta.telDisplay ? (
                          <span className="sr-only">
                            {theAskCta.telDisplay}
                          </span>
                        ) : null}
                      </a>
                    ) : (
                      <div>
                        <p className="inline-flex w-full flex-col items-center justify-center gap-2 rounded-full border border-amber-200/40 bg-amber-300 px-6 py-4 text-center text-base font-bold text-ntr-green shadow-lg md:text-lg">
                          <span className="inline-flex items-center gap-2">
                            <PhoneHandsetIcon className="h-5 w-5" />
                            {theAskCta.label}
                          </span>
                          <span className="max-w-xs text-xs font-normal leading-snug text-ntr-green/80">
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

      <footer className="border-t border-ntr-line bg-ntr-green py-12 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-base leading-relaxed text-white/85 md:text-lg">
            Confidential — prepared for Northern Trust. Hypotheses reflect public sources as of the research date; confirm internally
            before external use. Cursor enterprise features should be validated against current documentation and procurement needs.
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-ntr-green-soft md:text-base">Sources</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-base md:text-lg">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white" target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-white/70 md:text-base">
            <a href="/api/logout" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Sign out (visitor)
            </a>
            {" · "}
            <a href="/admin" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Analytics admin
            </a>
          </p>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.25em] text-white/55 md:text-sm">Cursor</p>
        </div>
      </footer>
    </div>
  );
}
