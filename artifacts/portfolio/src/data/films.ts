// ── Build films: short walkthroughs of Claude systems, by service ──
// Generated with Claude by Emerald. They show how each system works, with
// sample data, so the copy describes the mechanism and never claims the
// on-screen figures as client results.

export interface Film {
  slug: string;
  title: string;
  desc: string;
  /** Service slug the film belongs under. */
  service: "claude-code" | "websites-apps" | "automation" | "ai-agents" | "mcp";
  tag: string;
  seconds: number;
  /** First published, for video structured data. */
  date: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const filmSrc = (f: Film) => `${BASE}/videos/films/${f.slug}.mp4`;
export const filmPoster = (f: Film) => `${BASE}/videos/posters/films/${f.slug}.jpg`;

export const films: Film[] = [
  // Claude Code
  {
    slug: "accessibility-audit",
    title: "Accessibility, fixed at the source",
    desc: "Claude Code crawls every route with Playwright, traces hundreds of accessibility violations back to the few shared components causing them, and opens one pull request that fixes the source code rather than patching pages.",
    service: "claude-code",
    tag: "Developer tooling",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "api-docs-sync",
    title: "API docs that fail the build",
    desc: "When a route handler changes, the spec, docs, changelog and SDKs update together, and every documented example runs as a contract test. Wrong docs become a red build, not a support ticket.",
    service: "claude-code",
    tag: "Developer tooling",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "query-performance",
    title: "Database queries, ranked by cost",
    desc: "Queries are ranked by total cost rather than how slow they feel, traced back to the exact line of code, and every proposed fix is benchmarked on a restored snapshot before it reaches production.",
    service: "claude-code",
    tag: "Database performance",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "localization-pipeline",
    title: "Six languages, shipped on time",
    desc: "A Claude Skill translates each release's changed strings into six languages, enforces the glossary and placeholders, and holds back anything that breaks a rule for a human to check.",
    service: "claude-code",
    tag: "Claude Skills",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "cowork-onboarding",
    title: "Onboarding, ready before Monday",
    desc: "Claude Cowork drafts the first-week plan, IT checklist and manager brief from your own templates, then checks HR and IT tickets daily so every open item has an owner. Drafts wait for review; nothing is sent automatically.",
    service: "claude-code",
    tag: "Claude Cowork",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "claude-skill-workflows",
    title: "A reusable Claude Skill for business workflows",
    desc: "A repeatable business process packaged as a Claude Skill: structured instructions plus an execution system, so Claude runs it the same way every time and the Skill improves from each result.",
    service: "claude-code",
    tag: "Claude Skills",
    seconds: 41,
    date: "2026-09-06",
  },
  // Websites and apps
  {
    slug: "fullstack-claude-app",
    title: "A full-stack app with Claude inside",
    desc: "One web application with interface, backend logic and stored data, where Claude makes the judgement calls inside the product and the app owns the state, rules and records.",
    service: "websites-apps",
    tag: "Web app",
    seconds: 40,
    date: "2026-09-09",
  },
  {
    slug: "customer-portal",
    title: "A customer portal that already knows them",
    desc: "Clients sign in and ask questions in plain language, and Claude answers from their own account data, keeping context for follow-up questions. Built with Claude, Claude Code, APIs and authentication.",
    service: "websites-apps",
    tag: "Client portal",
    seconds: 45,
    date: "2026-09-06",
  },
  // Automation
  {
    slug: "invoice-three-way-match",
    title: "Three-way invoice matching, done in code",
    desc: "Invoices from the accounts inbox are read to a strict schema, matched against purchase orders and goods receipts, and every total is recomputed in code. Clean matches queue for approval and only the exceptions reach a reviewer.",
    service: "automation",
    tag: "Finance operations",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "price-monitor",
    title: "A competitor price monitor that fails loudly",
    desc: "Playwright collects competitor prices and validates each one against history. When a scraper silently breaks, it raises an alert instead of storing bad data, so decisions never rest on stale prices.",
    service: "automation",
    tag: "Competitive intelligence",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "restock-planning",
    title: "Restock planning: arithmetic first, judgement after",
    desc: "Reorder points and quantities are computed in code from sales history, seasonality and supplier lead times. Claude then adds buyer notes and supplier context to a weekly brief grouped by supplier.",
    service: "automation",
    tag: "Purchasing",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "compliance-evidence",
    title: "Compliance evidence, collected as it happens",
    desc: "Read-only collectors gather audit evidence across identity, cloud, code and ticketing as it happens, check it against each control's wording, and flag gaps inside the quarter instead of at audit time.",
    service: "automation",
    tag: "Compliance",
    seconds: 36,
    date: "2026-09-13",
  },
  {
    slug: "proposal-generator",
    title: "An AI proposal generator",
    desc: "A project brief goes in and a structured proposal draft comes out in your wording and order: understanding, scope of work, approach, timeline and price from your own rate card, and next steps.",
    service: "automation",
    tag: "Sales operations",
    seconds: 35,
    date: "2026-09-08",
  },
  // AI agents
  {
    slug: "inbox-triage",
    title: "Every inbox thread gets an owner",
    desc: "An AI agent reads whole threads, classifies them, pulls out order numbers and dates, and routes each to the right team. Low-confidence threads go to a review lane, and every decision is logged with its reasoning.",
    service: "ai-agents",
    tag: "Operations",
    seconds: 36,
    date: "2026-09-09",
  },
  {
    slug: "ai-agent-web-app",
    title: "An AI agent that plans, reasons and executes",
    desc: "A web app where users hand over complex tasks and a Claude agent plans the steps, calls tools and reports back, with approval gates, full step visibility and the ability to stop and redirect a run.",
    service: "ai-agents",
    tag: "AI agent",
    seconds: 41,
    date: "2026-09-06",
  },
  {
    slug: "cross-platform-agent",
    title: "One request, many systems",
    desc: "An agent turns a plain-language request into a plan and works across the tools you have approved. Claude decides what should happen, a separate layer carries it out, and it can only reach the scopes you grant.",
    service: "ai-agents",
    tag: "AI agent",
    seconds: 40,
    date: "2026-09-09",
  },
  {
    slug: "ai-qa-suite",
    title: "Quality assurance for AI features",
    desc: "A test suite for AI features that judges answers against rules instead of exact wording, sorts every failure into a named type, and re-runs fixed cases on every build so the same issue cannot come back unseen.",
    service: "ai-agents",
    tag: "AI quality",
    seconds: 40,
    date: "2026-09-09",
  },
  // MCP
  {
    slug: "mcp-erp-server",
    title: "A 2009 ERP, spoken to plainly",
    desc: "A typed MCP server gives Claude live access to a legacy ERP: products, stock levels, customer pricing and open orders, with the one write action, drafting a quote, held behind a confirmation and an audit log.",
    service: "mcp",
    tag: "MCP server",
    seconds: 36,
    date: "2026-09-09",
  },
];

export const FILM_GROUPS: Array<{ service: Film["service"]; label: string }> = [
  { service: "claude-code", label: "Claude Code" },
  { service: "websites-apps", label: "Websites and apps" },
  { service: "automation", label: "Automation" },
  { service: "ai-agents", label: "AI agents" },
  { service: "mcp", label: "MCP servers" },
];

export const filmsFor = (service: string) => films.filter((f) => f.service === service);
