// ── Industry pages: /industries/:slug ──
// Proof rules: "client" items are real delivered work described without the
// client's name (Emerald approved anonymous descriptions on 26 Sep 2026);
// only work already public on the site is named. "portfolio" items point at
// systems shown elsewhere on the site. "example" marks an illustrative system,
// never presented as a client.

export type ProofKind = "client" | "portfolio" | "example";

export interface IndustryProof {
  kind: ProofKind;
  text: string;
  href?: string;
}

export interface Industry {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: { before: string; accent: string; after: string };
  lead: string;
  accent: string;
  pains: string[];
  builds: { title: string; desc: string }[];
  proof: IndustryProof[];
  /** Service slugs, most relevant first. */
  services: string[];
}

export const PROOF_LABEL: Record<ProofKind, string> = {
  client: "Client build",
  portfolio: "From the portfolio",
  example: "Example system",
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate and property",
    short: "Lead follow-up, AI listings and property search for agents, brokerages and developers.",
    title: "AI Automation & Apps for Real Estate | Denver NoCode",
    description:
      "AI lead follow-up, listing tools and property platforms for agents, brokerages and developers, built with Claude Code, n8n and Make.com.",
    h1: { before: "Real estate that follows up ", accent: "on its own", after: "." },
    lead:
      "Enquiries arrive from portals, ads and your website at all hours, and the agent who replies first usually wins. I build the systems that capture, qualify and follow up every lead, and the platforms that turn a listing into something buyers can actually search.",
    accent: "#0015D4",
    pains: [
      "Portal enquiries sit unanswered overnight and go cold.",
      "CRM fields are half empty, so nobody knows which leads deserve a call.",
      "Every listing is typed out by hand, again, for every portal.",
    ],
    builds: [
      { title: "Instant lead follow-up", desc: "Every enquiry captured, enriched and answered within minutes, day or night." },
      { title: "Lead scoring and CRM clean-up", desc: "Your CRM filled in automatically, with the leads worth calling at the top." },
      { title: "AI listing creation", desc: "Owners or agents describe a property by text or voice, and Claude drafts the structured listing for approval." },
      { title: "Search by meaning", desc: "Buyers search the way they talk, like quiet and near a good school, not just by filters." },
    ],
    proof: [
      {
        kind: "client",
        text: "An AI-first property platform in Singapore: owners describe their property by text or voice, Claude turns it into a structured listing, confirms it before saving, and measures MRT and district from official map data instead of taking the seller's word.",
      },
      { kind: "portfolio", text: "Haven, a property search platform with listings, filters and a map panel.", href: "/#websites" },
    ],
    services: ["ai-agents", "websites-apps", "automation"],
  },
  {
    slug: "fitness",
    name: "Fitness and wellness studios",
    short: "Live numbers dashboards, trial follow-up and booking system integrations for studios and gyms.",
    title: "Automation for Gyms & Fitness Studios | Denver NoCode",
    description:
      "Reporting dashboards, trial follow-up and member automations for gyms, boutique fitness studios and wellness businesses, built on the tools you already use.",
    h1: { before: "Studios that know their ", accent: "numbers", after: "." },
    lead:
      "Most studios can tell you how many leads came in. Far fewer can tell you how many trials became members, and why the rest did not. I connect your booking system to live dashboards and to follow-up that runs on its own.",
    accent: "#F32317",
    pains: [
      "Monthly numbers are rebuilt by hand from booking system exports.",
      "Trial members drift away before anyone follows up.",
      "Every studio in the group reports differently, so nothing compares.",
    ],
    builds: [
      { title: "Live numbers dashboard", desc: "Leads, trials, first visits and new members per studio, updated automatically." },
      { title: "Trial follow-up", desc: "The right message at each stage of the trial, so nobody slips through." },
      { title: "Booking system integration", desc: "Mindbody and similar platforms connected to your sheets, CRM and inbox." },
      { title: "Multi-site reporting", desc: "Every location measured the same way, side by side." },
    ],
    proof: [
      {
        kind: "client",
        text: "A reporting automation plan and build guide for a five-studio boutique fitness group, taking Mindbody data into a monthly numbers dashboard in Google Sheets.",
      },
    ],
    services: ["automation", "ai-agents"],
  },
  {
    slug: "construction",
    name: "Construction and property development",
    short: "AI invoice reading, bank reconciliation and supplier price alerts for builders and developers.",
    title: "AI Invoice & Accounting Automation for Construction | Denver NoCode",
    description:
      "Invoice reading, cost tracking and supplier price alerts for construction companies and property developers, built with Claude and Google Sheets.",
    h1: { before: "Paperwork that ", accent: "files itself", after: "." },
    lead:
      "Construction runs on invoices, delivery notes and supplier quotes, most of them photographed on site or buried in email. I build systems that read them, file them and warn you when costs creep up.",
    accent: "#BA7517",
    pains: [
      "Invoices arrive as phone photos and PDFs in different inboxes.",
      "Supplier prices rise quietly, and nobody notices until the margin is gone.",
      "Matching payments to invoices eats hours every month.",
    ],
    builds: [
      { title: "AI invoice reading", desc: "Photos and PDFs read by Claude into clean rows: supplier, tax ID, amounts, VAT and category." },
      { title: "Bank reconciliation", desc: "Bank exports matched to invoices, so every one is marked paid or pending automatically." },
      { title: "Supplier price alerts", desc: "Line-item price history per supplier, with an alert when a unit price jumps." },
      { title: "Project cost tracking", desc: "Costs grouped by project and category, ready for your accountant." },
    ],
    proof: [
      {
        kind: "client",
        text: "AI invoice accounting for a Spanish construction and property development group: invoice photos and emailed PDFs are read by Claude into Google Sheets, sorted into 38 categories, checked for duplicates and reconciled against the bank, with an alert when a supplier's unit price rises more than 5%.",
      },
    ],
    services: ["automation", "ai-agents"],
  },
  {
    slug: "events",
    name: "Events and business networks",
    short: "Signup pipelines and personalized outreach for event organisers, associations and networks.",
    title: "Event & Community Automation | Denver NoCode",
    description:
      "Signup pipelines, personalized outreach and member data tools for event organisers, associations and business networks.",
    h1: { before: "Every signup, ", accent: "personally", after: " welcomed." },
    lead:
      "When an event fills up, personal follow-up is the first thing to go. I build pipelines that turn each signup into personalized outreach, ready for you to send.",
    accent: "#0015D4",
    pains: [
      "Signups land in a spreadsheet and wait for someone to act on them.",
      "Personal outreach does not scale past the first fifty attendees.",
      "Member and attendee data is scattered across forms and inboxes.",
    ],
    builds: [
      { title: "Signup pipelines", desc: "Every registration picked up daily and moved to the next step automatically." },
      { title: "Personalized visuals and messages", desc: "Each attendee gets their own graphic and a drafted email, ready to send." },
      { title: "Member data enrichment", desc: "Logos, company details and missing fields filled in with Claude Vision." },
      { title: "Attendee communication", desc: "Confirmations, reminders and follow-ups on a schedule, not on memory." },
    ],
    proof: [
      {
        kind: "client",
        text: "Entsorger Circle: Claude Vision enriches a live Google Sheet with company logos, then a daily pipeline turns event signups into personalized visuals and ready-to-send Gmail drafts.",
        href: "/work/entsorger-circle",
      },
    ],
    services: ["ai-agents", "automation"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce and retail",
    short: "Inventory sync, order updates, AI support and storefronts for online stores and retailers.",
    title: "E-commerce Automation & Shopify Integrations | Denver NoCode",
    description:
      "Inventory sync, order automation, storefronts and AI customer support for e-commerce brands and retailers.",
    h1: { before: "A store that ", accent: "runs itself", after: "." },
    lead:
      "Orders, stock, support tickets and reviews all need handling every day. I automate the repetitive parts and build storefronts around how your customers actually shop.",
    accent: "#FF8FCA",
    pains: [
      "Stock levels drift between Shopify, spreadsheets and suppliers.",
      "The same order and returns questions fill the inbox every day.",
      "Order updates depend on someone remembering to send them.",
    ],
    builds: [
      { title: "Inventory sync", desc: "Shopify, Airtable and Google Sheets kept in step, with low-stock alerts." },
      { title: "Order notifications", desc: "Status updates by WhatsApp or email the moment an order moves." },
      { title: "AI customer support", desc: "An agent that answers order, stock and returns questions from your real data." },
      { title: "Custom storefronts", desc: "Fast product pages and collections built around your brand." },
    ],
    proof: [
      { kind: "portfolio", text: "E-commerce inventory sync between Shopify, Airtable and Google Sheets, with low-stock alerts.", href: "/work/ecommerce-inventory-sync" },
      { kind: "portfolio", text: "Atelier, an editorial furniture storefront.", href: "/#websites" },
    ],
    services: ["automation", "websites-apps", "ai-agents"],
  },
  {
    slug: "agencies",
    name: "Marketing and creative agencies",
    short: "Lead generation, social publishing with approval, and client reporting for agencies.",
    title: "Automation for Marketing Agencies | Denver NoCode",
    description:
      "Lead generation, content pipelines, client reporting and social publishing automation for marketing and creative agencies.",
    h1: { before: "More clients, ", accent: "less admin", after: "." },
    lead:
      "Agencies sell creative work and lose hours to reporting, posting and prospecting. I automate the delivery side, so your team spends its time on the work clients pay for.",
    accent: "#F32317",
    pains: [
      "Client reports are assembled by hand every month.",
      "Posting schedules depend on someone being online at the right time.",
      "Prospecting stops whenever the team gets busy.",
    ],
    builds: [
      { title: "Lead generation pipelines", desc: "Prospects found, researched and messaged, with your approval before anything sends." },
      { title: "Social publishing with approval", desc: "A week of posts drafted in one go, approved in a sheet, then published on schedule." },
      { title: "Client reporting", desc: "Monthly reports pulled together from the platforms automatically." },
      { title: "Client onboarding", desc: "Contracts, folders and welcome emails triggered by one signup." },
    ],
    proof: [
      {
        kind: "client",
        text: "A review-gated social posting agent for a supplement brand and a health creator: a week of captions and AI images generated every Sunday, approved in a Google Sheet, then published to Facebook, Instagram and TikTok.",
      },
      { kind: "portfolio", text: "AI lead generation system with a human approval gate before Gmail sends.", href: "/work/ai-lead-generation-system" },
    ],
    services: ["automation", "ai-agents"],
  },
  {
    slug: "creators",
    name: "Content creators and publishers",
    short: "Claude-powered publishing pipelines, WordPress auto-publishing and video content production.",
    title: "AI Content Automation for Creators & Publishers | Denver NoCode",
    description:
      "Claude-powered content pipelines, auto-publishing to WordPress and social, and video content production for creators, bloggers and publishers.",
    h1: { before: "Publish more, ", accent: "type less", after: "." },
    lead:
      "Writing is the part you love. Formatting, uploading, tagging and tracking are not. I build pipelines where Claude handles the repetitive publishing work and you stay in control of what goes out.",
    accent: "#8B5CF6",
    pains: [
      "Every post is formatted and uploaded by hand to several platforms.",
      "The content tracker is always a week out of date.",
      "Video and audio production eats the time meant for ideas.",
    ],
    builds: [
      { title: "Auto-publishing to WordPress", desc: "Claude drafts, you approve, and the post publishes with categories and links in place." },
      { title: "Claude workflows for your team", desc: "Claude set up with your voice, your formats and your publishing steps." },
      { title: "Video content pipelines", desc: "Scripts, voiceovers and images produced to your brief and logged for editing." },
      { title: "Content repurposing", desc: "One video or article turned into threads, posts and newsletters." },
    ],
    proof: [
      {
        kind: "client",
        text: "Claude Cowork connected to a home decor affiliate blog through a hosted MCP server, so drafts publish straight to WordPress while the content tracker and Google Drive stay up to date.",
      },
      { kind: "portfolio", text: "AI video content factory: scripts, voiceovers and images in one pipeline.", href: "/work/ai-video-content-factory" },
    ],
    services: ["mcp", "ai-agents", "automation"],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    short: "Onboarding, contracts, document processing and reminders for law, accounting and consulting firms.",
    title: "Automation for Law, Accounting & Consulting Firms | Denver NoCode",
    description:
      "Client onboarding, document processing, contract generation and reminder automation for law firms, accountants and consultancies.",
    h1: { before: "Billable hours, ", accent: "not busywork", after: "." },
    lead:
      "Onboarding, engagement letters, document requests and reminders take hours nobody can bill. I automate the admin around your expertise, and keep sensitive documents in systems you control.",
    accent: "#0015D4",
    pains: [
      "New clients wait days for contracts and welcome packs.",
      "Documents arrive by email and get filed by hand.",
      "Follow-ups and invoice reminders depend on memory.",
    ],
    builds: [
      { title: "Client onboarding", desc: "Engagement letter, welcome email, folders and CRM entry from one signup." },
      { title: "Contract generation", desc: "Contracts filled from your templates and sent for signature automatically." },
      { title: "Document processing", desc: "Attachments parsed and filed to the right client folder, with Claude reading what rules cannot." },
      { title: "Invoice reminders", desc: "Overdue invoices chased politely on a schedule, with alerts to you." },
    ],
    proof: [
      { kind: "portfolio", text: "Client onboarding automation: contract, welcome email, Drive folders and CRM update from one signup.", href: "/work/client-onboarding-automation" },
    ],
    services: ["automation", "ai-agents"],
  },
  {
    slug: "recruiting",
    name: "Recruiting and HR",
    short: "Resume parsing, candidate videos, interview scheduling and new starter onboarding.",
    title: "AI Automation for Recruiting & HR | Denver NoCode",
    description:
      "Resume parsing, candidate videos, interview scheduling and employee onboarding automation for recruiters and HR teams.",
    h1: { before: "Hire faster, ", accent: "screen smarter", after: "." },
    lead:
      "Recruiting is full of repeated steps: reading resumes, scheduling interviews, sending updates, setting up new starters. I automate them so your team spends its time with people. A person still makes every hiring decision.",
    accent: "#BA7517",
    pains: [
      "Every resume is read and retyped into the system by hand.",
      "Scheduling one interview takes more emails than the interview itself.",
      "New starters wait for their accounts on day one.",
    ],
    builds: [
      { title: "Resume parsing", desc: "PDF resumes turned into structured candidate records." },
      { title: "Candidate videos", desc: "A resume and photo turned into an AI avatar video introduction." },
      { title: "Interview scheduling", desc: "Calendar invites and reminders triggered by a status change." },
      { title: "New starter onboarding", desc: "Workspace, Slack and project tool accounts created by role, before day one." },
    ],
    proof: [
      { kind: "portfolio", text: "AI video resume generator: resume and photo in, avatar video out.", href: "/work/ai-video-resume-generator" },
      { kind: "portfolio", text: "Resume parser, interview scheduler and employee onboarding systems in the archive.", href: "/#work" },
    ],
    services: ["automation", "ai-agents"],
  },
  {
    slug: "saas",
    name: "SaaS and startups",
    short: "MVPs, dashboards, AI features and landing pages, shipped fast with Claude Code.",
    title: "Claude Code Development for SaaS & Startups | Denver NoCode",
    description:
      "MVPs, dashboards, landing pages, AI features and internal tools for SaaS companies and startups, built fast with Claude Code.",
    h1: { before: "From idea to ", accent: "shipped", after: "." },
    lead:
      "Early on, speed matters more than anything, but so does not building on sand. I use Claude Code to ship real, tested products quickly, in a codebase your future team can take over.",
    accent: "#0015D4",
    pains: [
      "The MVP is stuck behind a developer hire you have not made yet.",
      "A no-code prototype has hit its limits.",
      "Internal operations run on spreadsheets that break as you grow.",
    ],
    builds: [
      { title: "MVPs", desc: "A working first version with real accounts and data, not a clickable mockup." },
      { title: "Dashboards and admin tools", desc: "The internal screens your team needs to run the product." },
      { title: "AI features", desc: "Chat, search and assistants built into the product with Claude." },
      { title: "Landing pages", desc: "Fast, search-ready pages that explain the product and convert." },
    ],
    proof: [
      { kind: "portfolio", text: "Pulseboard analytics dashboard, Nova fintech landing page and Meridian sponsorship dashboard.", href: "/#websites" },
    ],
    services: ["claude-code", "websites-apps", "mcp"],
  },
  {
    slug: "web3",
    name: "Web3 and crypto",
    short: "dApps, contracts, trading bots and dashboards for crypto founders, DAOs and trading teams.",
    title: "Web3 & Crypto Product Development | Denver NoCode",
    description:
      "dApps, token and vesting contracts, trading bots and on-chain dashboards for crypto founders, DAOs and trading teams, with testing and safety built in.",
    h1: { before: "Crypto products, ", accent: "built to last", after: "." },
    lead:
      "Crypto moves fast and punishes mistakes permanently. I build for founders, DAOs and trading teams with the testing and safety checks the stakes demand.",
    accent: "#8B5CF6",
    pains: [
      "A contract bug cannot be patched after launch.",
      "A bot that trades without limits can empty a wallet in minutes.",
      "Front ends that hold keys or secrets are an attack waiting to happen.",
    ],
    builds: [
      { title: "dApps", desc: "Mint, staking, swap and vault interfaces that never hold secrets." },
      { title: "Token and vesting contracts", desc: "Solidity contracts backed by unit and fuzz tests." },
      { title: "Trading bots", desc: "Solana and Telegram bots with position limits and a kill switch." },
      { title: "On-chain dashboards", desc: "Portfolio, signal and treasury views built from chain data." },
    ],
    proof: [
      {
        kind: "client",
        text: "APAX Portfolio Vault: a vault dApp where the front end never touches the chain, with a Next.js UI, an Express API layer and a Solidity vault as the single source of truth.",
        href: "/#web3",
      },
    ],
    services: ["web3", "claude-code"],
  },
  {
    slug: "healthcare",
    name: "Healthcare and clinics",
    short: "Practice websites, online booking, digital intake and reminders for clinics and practices.",
    title: "Websites & Automation for Clinics & Practices | Denver NoCode",
    description:
      "Patient-friendly websites, appointment booking, digital intake forms and reminder automation for clinics and medical practices.",
    h1: { before: "Care for patients, ", accent: "not paperwork", after: "." },
    lead:
      "Clinics lose hours to scheduling, intake forms and follow-up reminders. I build patient-facing websites and the admin automation behind them. Patient data stays in systems your practice controls, and I work within your compliance requirements.",
    accent: "#0BB07B",
    pains: [
      "Appointment requests arrive by phone, email and web form.",
      "Patients fill in the same intake details again at every visit.",
      "Reminders and follow-ups depend on front-desk time.",
    ],
    builds: [
      { title: "Practice websites", desc: "Clear, fast sites that explain your services and make booking easy." },
      { title: "Online booking", desc: "Appointment requests routed to your calendar, not your inbox." },
      { title: "Digital intake forms", desc: "Patients complete intake once, online, before they arrive." },
      { title: "Reminders and follow-up", desc: "Reminders before the visit and follow-up after it, sent automatically." },
    ],
    proof: [
      {
        kind: "example",
        text: "An online intake form that books the appointment, sends a reminder the day before and files the form in the practice's own system, with no copying between tools.",
      },
    ],
    services: ["websites-apps", "automation"],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);

export const SIZES = [
  { title: "Solo founders", desc: "One system that gives you your evenings back. Usually a single automation or a focused app." },
  { title: "Small and medium businesses", desc: "Connected systems across sales, operations and finance, built on the tools you already pay for." },
  { title: "Larger teams", desc: "Claude and MCP rolled out across departments, with access control, documentation and training." },
];
