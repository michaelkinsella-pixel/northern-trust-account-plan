/** Northern Trust AI / automation bets with explicit Cursor value (public signals). */
export type NtAiIconKey =
  | "platform"
  | "strategy"
  | "agents"
  | "wealth"
  | "copilot"
  | "models"
  | "modernization"
  | "ecosystem";

export type NtAiInvestmentRow = {
  /** Short name for the numbered list (e.g. "NT Byron"). */
  label: string;
  /** Supporting context on the investment / signal. */
  detail: string;
  cursorHelps: string;
  icon: NtAiIconKey;
};

export const ntAiInvestments: NtAiInvestmentRow[] = [
  {
    label: "NT Byron",
    detail:
      "Internal AI platform for automation at scale (earnings narrative; broader AI deployment roadmap).",
    cursorHelps:
      "Meet engineers in the IDE: Rules + MCP can surface approved internal context and patterns while changes stay repo-grounded, reviewable, and aligned to centralized guardrails—not shadow AI off the side of the platform.",
    icon: "platform",
  },
  {
    label: "Boardroom AI mandate",
    detail:
      "Executive outcomes on AI—hyper-personalization, AI-generated alpha, infinite scalability—with governance and resilience.",
    cursorHelps:
      "Turn strategy into shippable increments faster: Agent mode for multi-file implementation with citations back to code, preserving PR-based accountability and artifacts auditors expect.",
    icon: "strategy",
  },
  {
    label: "Digitize work through agents",
    detail: "Scalability without linear staffing growth; agentic operations across high-volume workflows.",
    cursorHelps:
      "Mirror that mandate in software delivery: Cursor Agent and Background Agents for long-running refactors, tests, and migrations with human checkpoints—production-grade agentic workflows, not one-line completions.",
    icon: "agents",
  },
  {
    label: "One Wealth & advisor AI",
    detail:
      "Advisor-facing experiences and Northern Trust Institute insights—client-visible velocity and controls.",
    cursorHelps:
      "Accelerate full-stack delivery (services, APIs, UI, tests) while reviewers stay in control of disclosures and client copy; reduces cycle time from model or policy change to production-safe code.",
    icon: "wealth",
  },
  {
    label: "GitHub / Microsoft Copilot baseline",
    detail: "Copilot-class tooling normalized across engineering job families—AI coding literacy as table stakes.",
    cursorHelps:
      "Cursor unlocks the next horizon—whole-repository comprehension, dependency-aware edits, and agentic change lists across modules and configs without throwing away existing Microsoft/GitHub investment.",
    icon: "copilot",
  },
  {
    label: "Multi-model & agent engineering",
    detail:
      "Hiring signals for Claude, multi-agent intelligence, and specialist AI engineering roles.",
    cursorHelps:
      "Align the desktop experience with a multi-model roadmap: swap approved models without retraining the org on a new editor each cycle; orchestrate multi-step coding tasks where your risk posture allows.",
    icon: "models",
  },
  {
    label: "Cloud & platform modernization",
    detail: "Cloud, data platforms, microservices, and legacy modernization waves across the estate.",
    cursorHelps:
      "Shrink time-to-comprehension on large mixed stacks: semantic codebase navigation, migration scaffolding, and repeatable refactor patterns across old and new code.",
    icon: "modernization",
  },
  {
    label: "Saphyre & ecosystem integrations",
    detail:
      "Partnership-driven AI/ML for investment operations lifecycle—integration-heavy, data-rich delivery.",
    cursorHelps:
      "Ship integration and pipeline code faster with fewer defects—Agent-assisted implementation plus early automated review signals so teams scale throughput without sacrificing controls.",
    icon: "ecosystem",
  },
];

export type InitiativeBlock = {
  id: string;
  presentation: "card" | "callout";
  title: string;
  /** Short line for the initiative rail (account-plan pattern). */
  subtitle: string;
  hypothesis: string;
  observedSignals: string[];
  cursorHeadline: string;
  cursorBullets: string[];
  discoveryQuestions: string[];
  proof: string;
};

export const initiatives: InitiativeBlock[] = [
  {
    id: "mandate",
    presentation: "card",
    title: "Boardroom mandate → engineering cadence",
    subtitle: "CEO outcomes, investor narrative, and controlled delivery",
    hypothesis:
      "Northern Trust is aligning revenue growth and margins with AI that is visible in client and investor channels—not only back-office experiments.",
    observedSignals: [
      "CEO framing: AI embedded across operations with resilience, governance, and client confidence as non-negotiables.",
      "Explicit outcomes: hyper-personalization, AI-generated alpha, infinite scalability.",
    ],
    cursorHeadline: "Make executive intent traceable in code",
    cursorBullets: [
      "Use Agent mode for multi-file changes tied to architecture docs or ADRs so work stays reviewable.",
      "Ground changes in repo context to reduce “AI slop” risk in regulated environments.",
      "Shorten cycle time from idea → PR without bypassing tests or ownership boundaries.",
    ],
    discoveryQuestions: [
      "Where do AI-led initiatives stall today: design, implementation, or review?",
      "How do teams prove lineage from business requirement to shipped code for auditors?",
    ],
    proof:
      "Financial institutions with large Python/Java estates report outsized gains when AI assists full change sets—not only line completions (industry reporting).",
  },
  {
    id: "agents",
    presentation: "callout",
    title: "Agentic operations and infinite scalability",
    subtitle: "Digitizing work through agents at enterprise scale",
    hypothesis:
      "The firm’s language on digitizing work through agents implies growing demand for autonomous-but-governed execution in internal tooling—including software delivery.",
    observedSignals: [
      "“Digitize work through agents” tied to scalability and controls.",
      "COO organization span and layer changes while scaling high-volume workflows.",
    ],
    cursorHeadline: "Agents that respect the repo and the reviewer",
    cursorBullets: [
      "Cursor Agent for end-to-end tasks with human checkpoints.",
      "Background Agents for long-running refactors or test harness generation.",
      "MCP connects internal docs, ticketing, or internal LLM gateways where permitted.",
    ],
    discoveryQuestions: [
      "Which SDLC steps are still manual despite Copilot access (e.g., migrations, config, release notes)?",
      "What guardrails must an AI agent honor before a PR can be opened?",
    ],
    proof:
      "Tier-one banks are publishing agent platforms and coding mandates; the gap is narrowing between “has AI” and “ships with AI” (third-party reporting).",
  },
  {
    id: "nt-byron",
    presentation: "card",
    title: "NT Byron and internal AI services",
    subtitle: "Central AI platform + engineering touchpoints",
    hypothesis:
      "Central AI services will need trustworthy clients in engineering workflows—IDEs, CI, and internal portals—to avoid shadow AI.",
    observedSignals: [
      "NT Byron referenced as the firm’s AI platform for broad automation.",
      "Productivity savings tied to digitizing documents and automating manual work.",
    ],
    cursorHeadline: "Meet developers where they work",
    cursorBullets: [
      "Keep sensitive code on managed machines; use enterprise deployment patterns you already evaluate.",
      "Optional MCP wiring to internal knowledge bases without exfiltrating proprietary data.",
      "Consistent prompts and patterns across teams reduce one-off scripts.",
    ],
    discoveryQuestions: [
      "Is there an approved pattern for IDE assistants to call internal model endpoints?",
      "How do teams today sync NT Byron capabilities with day-to-day coding?",
    ],
    proof:
      "Organizations standardizing on Cursor often pair it with existing internal LLM and ticketing systems via MCP (customer-reported patterns).",
  },
  {
    id: "copilot-layer",
    presentation: "callout",
    title: "GitHub Copilot + Microsoft Copilot as the baseline",
    subtitle: "Inline AI normalized; repo-scale work is the next unlock",
    hypothesis:
      "Northern Trust has normalized inline assistance; the next unlock is repository-scale work, reviews, and measurable delivery metrics.",
    observedSignals: [
      "Multiple engineering roles list GitHub Copilot as a required tool.",
      "Dozens of postings reference Microsoft Copilot outside core engineering.",
    ],
    cursorHeadline: "Complement the baseline with codebase intelligence",
    cursorBullets: [
      "Whole-repo awareness for refactors spanning modules, services, and configs.",
      "Agentic change lists with citations back to files for faster human review.",
      "Bugbot and review workflows to catch issues before merge (where enabled).",
    ],
    discoveryQuestions: [
      "Where does Copilot save time—and where do engineers still context-switch for hours?",
      "What KPIs matter: lead time, change failure rate, or modernization throughput?",
    ],
    proof:
      "Public references cite large banks moving thousands of developers to AI-native IDEs for measurable velocity gains (e.g., NAB scale-up narratives, Stripe engineering scale).",
  },
  {
    id: "modernization",
    presentation: "card",
    title: "Hybrid stack, microservices, and data environment upgrades",
    subtitle: "Cloud, data platforms, and integration-heavy change",
    hypothesis:
      "Modernization waves concentrate risk in integration layers; AI value scales when it understands legacy and new code together.",
    observedSignals: [
      "Earnings commentary on expanded cloud adoption, upgraded data environment, and modernized platforms.",
      "Industry profiles describing containerization and microservices direction.",
    ],
    cursorHeadline: "Accelerate safe refactors across boundaries",
    cursorBullets: [
      "Map dependencies before large moves; generate migration checklists and tests.",
      "Reuse consistent patterns across services instead of one-off prompts.",
      "Reduce mean time to comprehend unfamiliar modules during incidents.",
    ],
    discoveryQuestions: [
      "Which domains still block cloud or API-first patterns because of knowledge bottlenecks?",
      "How are cross-repo changes coordinated today between app teams and infra?",
    ],
    proof:
      "Legacy modernization programs are a common place agentic coding tools show step-change ROI (industry case studies).",
  },
  {
    id: "wealth-ai",
    presentation: "callout",
    title: "Wealth and advisor-facing AI experiences",
    subtitle: "One Wealth assistant, advisor tooling, full-stack delivery",
    hypothesis:
      "Advisor assistants and internal chat experiences increase the surface area for regulated, high-quality full-stack delivery.",
    observedSignals: [
      "One Wealth assistant narrative integrating research insights into workflows.",
      "Careers content referencing AI chatbot work for financial advisors.",
    ],
    cursorHeadline: "Ship features faster with fewer handoffs",
    cursorBullets: [
      "Prototype UI + service layers with consistent typing and tests.",
      "Use MCP to pull requirements or design tokens from approved systems.",
      "Keep humans in the loop for client-facing copy and disclosures.",
    ],
    discoveryQuestions: [
      "What is the lead time from model update to production UI today?",
      "Which compliance checks are manual per release?",
    ],
    proof:
      "Leading wealth and retail banks report large productivity gains when AI assists end-to-end software tasks under governance (third-party reporting).",
  },
  {
    id: "governance",
    presentation: "card",
    title: "Governance, controls, and model choice",
    subtitle: "Zero-trust reality + model flexibility over time",
    hypothesis:
      "Northern Trust will favor tools that fit zero-trust realities and allow model flexibility as the frontier shifts.",
    observedSignals: [
      "CEO stress on resilience, governance, and client confidence.",
      "Mixed vendor signals: Microsoft stack plus Anthropic in specialist roles.",
    ],
    cursorHeadline: "Architecture that survives vendor and model churn",
    cursorBullets: [
      "Model switching without rewriting developer habits (where policy allows).",
      "Enterprise controls: SSO/SCIM patterns, audit expectations aligned to financial services procurement.",
      "Encourage reproducible prompts and review artifacts for audits.",
    ],
    discoveryQuestions: [
      "What is the current policy on third-party LLMs for code vs. internal models?",
      "Which teams need zero-data-retention or air-gapped deployment paths?",
    ],
    proof:
      "Macro trend: institutions are explicitly asking for model-neutral AI platforms to avoid single-vendor lock-in (industry analysis).",
  },
];

export type RoadmapPhase = {
  phase: string;
  timing: string;
  goals: string[];
  northernTrust: string[];
  cursor: string[];
};

export const roadmap: RoadmapPhase[] = [
  {
    phase: "Discover",
    timing: "Pre-trial · ~2 weeks",
    goals: [
      "Align on 1–2 engineering populations and one modernization or wealth track as the proof initiative.",
      "Lock success metrics and the audit / security evidence needed to expand.",
      "Confirm Cursor deployment model against Northern Trust data-handling policies.",
    ],
    northernTrust: [
      "Name executive sponsor, cohort lead, and metric owner.",
      "Share baseline SDLC metrics: lead time, review latency, incident fix time.",
      "Identify repos or services where Copilot helps today—and where it does not.",
    ],
    cursor: [
      "Workshop Cursor Agent, Background Agents, MCP, and enterprise controls.",
      "Walk through SSO/SCIM, audit logging, privacy mode, and model options.",
      "Draft a bounded pilot plan with cohort size, duration, and exit criteria.",
    ],
  },
  {
    phase: "Pilot",
    timing: "30–45 days",
    goals: [
      "Active daily usage in the chosen cohort with measurable throughput lift.",
      "One tangible win on the selected modernization or wealth initiative—not a toy demo.",
      "No regression in quality signals you already track (defects, change failure rate).",
    ],
    northernTrust: [
      "Stand up cohort with InfoSec-approved models and logging.",
      "Run weekly engineering + risk check-ins on findings and exceptions.",
      "Capture qualitative friction (where engineers abandon AI-assisted flows).",
    ],
    cursor: [
      "Weekly enablement by role: platform, wealth engineering, data, core Java/Python as needed.",
      "Hands-on co-build on the proof initiative with Cursor field engineers.",
      "Adoption and usage views for cohort leadership.",
    ],
  },
  {
    phase: "Scale",
    timing: "Months 2–6",
    goals: [
      "Expand to additional business units with repeatable playbooks.",
      "Codify Northern Trust–specific rules and MCP connectors as a standard.",
      "Tie adoption to productivity targets already communicated externally.",
    ],
    northernTrust: [
      "Embed internal champions per business unit.",
      "Standardize golden paths for migrations, testing, and review with AI assistance.",
      "Feed learnings into NT Byron and internal training curricula.",
    ],
    cursor: [
      "Rollout support for new cohorts; train-the-trainer with champions.",
      "Quarterly roadmap review with technology leadership.",
      "Share anonymized benchmarks from comparable financial services rollouts where available.",
    ],
  },
  {
    phase: "Operate",
    timing: "Months 6–12+",
    goals: [
      "Cursor is a sanctioned default for eligible engineering populations.",
      "Governance dashboards for AI usage in SDLC are part of the operating model.",
      "Capacity unlocked by productivity is reinvested in the strategic technology agenda.",
    ],
    northernTrust: [
      "Continuous improvement on rules, MCP integrations, and metrics.",
      "Engineering leadership uses adoption and outcome metrics in operating reviews.",
    ],
    cursor: [
      "Ongoing success management and early access to agentic platform capabilities.",
      "Joint retrospective on modernization velocity and developer experience outcomes.",
    ],
  },
];

export type Stakeholder = {
  org: "Northern Trust" | "Cursor";
  name: string;
  role: string;
  focus: string;
};

export const stakeholders: Stakeholder[] = [
  {
    org: "Northern Trust",
    name: "Michael G. O'Grady",
    role: "Chairman, President & CEO",
    focus: "Enterprise AI outcomes, productivity, and client trust framing.",
  },
  {
    org: "Northern Trust",
    name: "Mary Ekmalian",
    role: "Global Chief Technology Officer",
    focus: "Technology strategy, platform modernization, engineering scale.",
  },
  {
    org: "Northern Trust",
    name: "Kelley Conway",
    role: "Chief Data & Analytics Officer",
    focus: "Data, analytics, and AI enablement across businesses.",
  },
  {
    org: "Northern Trust",
    name: "Vijay Luthra",
    role: "Chief Information Officer, Wealth Management",
    focus: "Wealth management technology delivery and digital transformation.",
  },
  {
    org: "Cursor",
    name: "Mike Kinsella",
    role: "Account Executive",
    focus: "Commercial alignment, trial design, and day-to-day partnership through pilot and expansion.",
  },
  {
    org: "Cursor",
    name: "TBD",
    role: "Field Engineering",
    focus: "Hands-on co-build on the proof initiative, stack-specific enablement, and Rules/MCP wiring aligned to your controls.",
  },
  {
    org: "Cursor",
    name: "TBD",
    role: "Cursor executives",
    focus: "Executive sponsorship, roadmap alignment, and escalation path for security and procurement milestones.",
  },
];

export const sources: { title: string; href: string; note: string }[] = [
  {
    title: "Northern Trust Q1 2026 earnings transcript",
    href: "https://www.fool.com/earnings/call-transcripts/2026/04/21/northern-trust-ntrs-q1-2026-earnings-transcript/",
    note: "Motley Fool",
  },
  {
    title: "Northern Trust Q4 2025 earnings transcript",
    href: "https://www.fool.com/earnings/call-transcripts/2026/01/22/northern-trust-ntrs-q4-2025-earnings-transcript/",
    note: "Motley Fool",
  },
  {
    title: "Northern Trust details its AI strategy",
    href: "https://www.waterstechnology.com/emerging-technologies/7953053/northern-trust-details-its-ai-strategy",
    note: "WatersTechnology",
  },
  {
    title: "Michael G. O'Grady: Northern Trust tech strategy profile",
    href: "https://techyice.com/michael-g-ogrady-northern-trust-tech-strategy/",
    note: "TechyIce",
  },
  {
    title: "2026 Global AI in Financial Services Report",
    href: "https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/",
    note: "Cambridge CCAF / FII",
  },
];

/** Benefit-oriented hero tiles (benchmarks vary by team — validate in pilot). */
export const heroStats: { value: string; label: string; emphasis?: boolean }[] = [
  { value: "30–55%", label: "Target velocity gain range cited for AI-native engineering cohorts (benchmark framing)", emphasis: true },
  { value: "~1.6k", label: "Software engineers in scope (third-party workforce estimate)" },
  { value: "<8 wks", label: "Typical time-to-pilot value with enterprise onboarding path" },
  {
    value: "Repo-wide",
    label: "Multi-file Agent tasks with PR-based review — governance preserved",
  },
];

/** Hero-adjacent narrative cards. */
export const atAGlanceNarratives: { overline: string; title: string; body: string }[] = [
  {
    overline: "Strategy",
    title: "AI is a top-of-house mandate—not a side experiment",
    body: "CEO Michael O'Grady has publicly anchored Northern Trust's AI strategy on three pillars: hyper-personalization of the client experience, AI-generated alpha in investment management, and infinite scalability of operations — paired with explicit emphasis on governance, resilience, and client confidence. Engineering is where those pillars become shipped software, and Cursor is how that engineering ships safely and faster.",
  },
  {
    overline: "Platform",
    title: "NT Byron anchors internal automation",
    body: "The internal AI platform supports broad automation across high-volume workflows. The next step is wiring trusted AI assistants into SDLC paths so teams scale without shadow tools or inconsistent review evidence.",
  },
  {
    overline: "Program",
    title: "One Horizon embeds AI as an enterprise capability—not a pilot",
    body: "Northern Trust's One Horizon AI Program embeds responsible, enterprise-scale AI to drive growth, resiliency, and productivity. With a start-up posture, NT is fundamentally transforming how the business operates and serves clients—building agentic AI systems, agent workspaces, and production ML pipelines in the cloud, along with the teams and responsible-AI governance to support development and deployment. Cursor plugs directly into that operating model on the engineering side.",
  },
  {
    overline: "Delivery",
    title: "Throughput targets elevate engineering as the compound lever",
    body: "When the enterprise commits to AI-led productivity, the durable unlock is measured engineering throughput—faster modernization, shorter PR cycles, and safer releases—not slide decks. Cursor is aimed at that operational outcome.",
  },
];

export type CursorPillar = {
  name: string;
  tagline: string;
  description: string;
};

/** Cursor capability pillars available on day one. */
export const cursorPillars: CursorPillar[] = [
  {
    name: "Tab",
    tagline: "The fastest line you will ever write",
    description:
      "Multi-line, project-aware autocomplete that reduces keystrokes and context switches—the highest-frequency surface for day-to-day coding.",
  },
  {
    name: "Agent",
    tagline: "Implements features end-to-end in the editor",
    description:
      "A coding agent that reads, edits, and verifies across files—implementation, tests, and docs in one supervised pass.",
  },
  {
    name: "Background Agents",
    tagline: "Parallelism for the long tail",
    description:
      "Run parallel agents on branches for refactors, dependency upgrades, and migration scaffolding; review when ready.",
  },
  {
    name: "Cursor Reviews & Bugbot",
    tagline: "Automated review before humans read the diff",
    description:
      "Surface bugs, security issues, missing tests, and drift early—so human reviewers focus on architecture and business logic.",
  },
  {
    name: "MCP & Rules",
    tagline: "Your standards and systems in the model",
    description:
      "Model Context Protocol integrations and Rules wire internal docs, ticketing, and conventions so output matches Northern Trust patterns.",
  },
  {
    name: "Enterprise platform",
    tagline: "Controls, analytics, and audit",
    description:
      "SAML SSO, SCIM, privacy controls, admin-managed rules, usage analytics, and audit trails designed for regulated environments.",
  },
];

/** KPI framing—baselines are placeholders for discovery. */
export const kpiRows: { label: string; baseline: string; target: string; note: string }[] = [
  {
    label: "PR cycle time (median)",
    baseline: "TBD in discovery",
    target: "10–20% reduction in pilot window",
    note: "Requires agreed definition (open → merge) and cohort scope.",
  },
  {
    label: "Time-to-first-meaningful PR (new hire / mobility)",
    baseline: "TBD",
    target: "Meaningful week-over-week improvement in pilot surveys",
    note: "Especially valuable for large, unfamiliar codebases.",
  },
  {
    label: "Throughput (PRs per engineer per week)",
    baseline: "TBD",
    target: "Lift without quality regression",
    note: "Pair with defect and change-failure-rate guardrails.",
  },
  {
    label: "Modernization milestone velocity",
    baseline: "Current roadmap dates",
    target: "Pull forward on the chosen proof initiative",
    note: "One initiative should anchor the pilot narrative.",
  },
  {
    label: "Adoption (daily active in cohort)",
    baseline: "0%",
    target: "Majority of pilot seats active weekly",
    note: "Usage analytics from enterprise admin views.",
  },
  {
    label: "Security exceptions opened",
    baseline: "Current process",
    target: "Zero net-new exceptions for sanctioned configuration",
    note: "Privacy mode + approved models + logging as agreed with risk.",
  },
];

export const theAskHeading =
  "The ask: a 30–45 day Cursor trial inside one Northern Trust engineering cohort.";

export const theAskIntro =
  "One modernization or wealth-platform proof initiative, one cohort, one scorecard. Cursor brings security materials, field engineering, and a delivery plan; Northern Trust brings the seats, the baselines, and executive air cover for the pilot window.";

/** Left-column checklist (checkmark list in UI). */
export const theAskChecklist: string[] = [
  "Cohort sized for measurable signal (often tens to low hundreds of engineers—calibrate in workshop).",
  "Graded on PR cycle time, throughput, and a real milestone—not slideware.",
  "Enterprise controls on day one for the configuration you approve: SSO/SCIM, Privacy Mode where required, audit logging, and model allowlist.",
];

export const theAskNextStep = {
  headline: "Lock in a follow-up working session within two weeks.",
  description:
    "90 minutes with engineering and security leadership. Align on pilot scope, controls evidence, and success metrics—leave with a signed-off trial plan.",
};

export const theAskAccountTeamLabel = "Your Cursor account team";

export const theAskAccountTeamRows: { name: string; title: string; note?: string }[] = [
  { name: "Mike Kinsella", title: "Account Executive · Cursor" },
  { name: "TBD", title: "Field Engineering · Cursor", note: "Named at kickoff" },
  { name: "TBD", title: "Cursor executives" },
];

/** Primary CTA — set `tel` when publishing a direct line is appropriate. */
export const theAskCta = {
  label: "Call Mike to schedule",
  tel: "" as string,
  telDisplay: "" as string,
};
