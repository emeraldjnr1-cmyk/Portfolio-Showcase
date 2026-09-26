// ── Service pages: /services/:slug ──
// Every claim here is either a capability statement or points at delivered,
// already-public work. No invented clients, numbers or reviews.

export interface ServiceProof {
  /** A /work/:slug page, or a home section like "/#websites". */
  href: string;
  label: string;
  note: string;
}

export interface Service {
  slug: string;
  num: string;
  name: string;
  /** One line for cards and link lists. */
  short: string;
  /** <title> and meta description. */
  title: string;
  description: string;
  h1: { before: string; accent: string; after: string };
  lead: string;
  accent: string;
  builds: { title: string; desc: string }[];
  tools: string[];
  proof: ServiceProof[];
  /** A delivered system described without naming the client. */
  example?: string;
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "claude-code",
    num: "01",
    name: "Claude Code development",
    short: "Apps, websites, automations, AI agents and MCP servers, built and shipped with Claude Code.",
    title: "Hire a Claude Code Developer | Denver NoCode",
    description:
      "Hire a Claude Code developer to build your web app, website, automation, AI agent or MCP server. Fixed quote within 24 hours, delivered in your own accounts.",
    h1: { before: "A Claude Code developer for your ", accent: "whole", after: " stack." },
    lead:
      "I use Claude Code to design, write, test and ship real software: web apps, websites, business automations, AI agents and MCP servers. You get a working system in your own accounts, with docs and a walkthrough video, not a pile of prompts.",
    accent: "#0015D4",
    builds: [
      { title: "Web apps and websites", desc: "Dashboards, booking tools, client portals, storefronts and landing pages, built as real code you can host anywhere." },
      { title: "Business automations", desc: "Scripts and pipelines that move data between your tools, on a schedule or the moment something happens." },
      { title: "AI agents", desc: "Agents that read, decide and act inside your tools, with a human approval step wherever a mistake would cost you." },
      { title: "MCP servers and integrations", desc: "Connectors that let Claude work directly with your own systems, from your CRM to your website." },
      { title: "Claude for your team", desc: "Claude and Claude Code set up around the way your team actually works, with the guardrails in place." },
      { title: "Rescue and handover", desc: "A Claude Code project that stalled halfway? I take it over, fix what is broken and document it properly." },
    ],
    tools: ["Claude Code", "Claude API", "TypeScript", "React", "Node.js", "Python", "Supabase", "Playwright", "Vercel", "Railway"],
    proof: [
      { href: "/work/entsorger-circle", label: "Entsorger Circle: AI Client Pipeline", note: "Claude Vision and a daily pipeline, live for a paying client" },
      { href: "/#websites", label: "Web builds", note: "11 sites and apps shipped with Claude Code" },
      { href: "/work", label: "All systems", note: "The flagship automation and AI agent builds" },
    ],
    faqs: [
      {
        q: "What is Claude Code, and why build with it?",
        a: "Claude Code is Anthropic's AI coding tool. It works inside a real codebase: it reads the files, writes changes, runs the tests and fixes what fails. Used well, it lets one experienced builder ship in days what used to take a small team weeks. I stay in charge of the architecture, the reviews and the testing.",
      },
      {
        q: "Do I need a Claude subscription to use what you build?",
        a: "No. Claude Code is how I build. What you receive is ordinary software: code in your repository, running on your hosting. You only need an Anthropic API key if the system itself calls Claude while it runs, and I set that up with a spend limit.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Everything is built in, or handed over to, your own accounts: repository, hosting, database and API keys. You are never stuck waiting on me.",
      },
      {
        q: "How long does a Claude Code build take?",
        a: "Most automations ship in 3 to 7 days. Websites and bigger app builds run 1 to 3 weeks. Fill the onboarding form and you get a fixed quote within 24 hours.",
      },
    ],
  },
  {
    slug: "websites-apps",
    num: "02",
    name: "Websites and web apps",
    short: "Landing pages, SaaS dashboards, booking tools, portals and storefronts, built with React and Claude Code.",
    title: "Websites & Web Apps Built with Claude Code | Denver NoCode",
    description:
      "Fast, modern websites and web apps built with Claude Code and React: SaaS dashboards, booking tools, client portals, storefronts and landing pages.",
    h1: { before: "Websites and web apps, ", accent: "shipped", after: " with Claude Code." },
    lead:
      "From a landing page that has to convert to a dashboard your team lives in all day. I build with React and Claude Code, test on real phones, and deploy to hosting you own.",
    accent: "#F32317",
    builds: [
      { title: "Landing pages and marketing sites", desc: "Fast, responsive pages with the structure, tracking and technical SEO most sites skip." },
      { title: "SaaS dashboards", desc: "Live KPIs, charts and tables that answer the question before anyone asks it." },
      { title: "Booking and scheduling apps", desc: "Calendars, time slots and confirmation flows that sync with the tools you already use." },
      { title: "Client portals and internal tools", desc: "Logins, roles and the one screen your team needs instead of five spreadsheets." },
      { title: "E-commerce storefronts", desc: "Product grids, collections and checkout, built around how your customers actually shop." },
      { title: "AI-powered products", desc: "Chat interfaces, AI search and assistants built into the product, not bolted on." },
    ],
    tools: ["Claude Code", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Vercel"],
    proof: [
      { href: "/#websites", label: "Web builds gallery", note: "Pulseboard, Nova, Atelier, Haven, Meridian and more" },
      { href: "/", label: "This website", note: "Built with Claude Code and served as real HTML for search and AI engines" },
    ],
    faqs: [
      {
        q: "Will my site show up on Google and in AI search?",
        a: "Every page I ship is served as real HTML with its own title, description and structured data, plus a sitemap. That is what lets Google, Bing, ChatGPT and Perplexity read the site at all. Rankings then depend on your content and your competition, and I tell you honestly what to expect.",
      },
      {
        q: "Can I edit the content myself?",
        a: "Yes. If your content changes often, I connect a simple editor or a spreadsheet, so a new price or photo never needs a developer.",
      },
      {
        q: "Where is it hosted?",
        a: "On your own account, usually Vercel or a host you already use. You own the domain, the code and the hosting.",
      },
    ],
  },
  {
    slug: "automation",
    num: "03",
    name: "Business automation",
    short: "n8n, Make.com and Airtable systems for lead capture, onboarding, CRM updates, invoicing and reporting.",
    title: "n8n & Make.com Automation Expert | Denver NoCode",
    description:
      "Business automation with n8n, Make.com, Airtable and Claude: lead capture, client onboarding, CRM updates, invoicing and reporting that run themselves.",
    h1: { before: "Automations that do the work ", accent: "while you sleep", after: "." },
    lead:
      "If your team copies data between tools, chases the same follow-ups every week or rebuilds the same report every Monday, that is a system waiting to be built. I use n8n, Make.com, Airtable and Claude, whichever fits the job, and hand it over documented.",
    accent: "#BA7517",
    builds: [
      { title: "Lead capture and routing", desc: "Every form, ad and inbox enquiry lands in your CRM in seconds, enriched and assigned." },
      { title: "Client onboarding", desc: "Contract, welcome email, folders and CRM updates, all triggered by one signup." },
      { title: "CRM automation", desc: "HubSpot, Airtable and Google Sheets kept clean and current without manual entry." },
      { title: "Invoicing and payments", desc: "Invoice reminders, payment logging and overdue alerts, so nothing slips." },
      { title: "Reporting and alerts", desc: "Daily digests and instant alerts in Slack, Telegram, WhatsApp or Gmail." },
      { title: "Document processing", desc: "PDFs and attachments parsed into clean rows, with Claude reading what fixed rules cannot." },
    ],
    tools: ["n8n", "Make.com", "Airtable", "Google Sheets", "HubSpot", "Slack", "Gmail", "Claude", "OpenAI", "Apify"],
    proof: [
      { href: "/work/client-onboarding-automation", label: "Client Onboarding Automation", note: "Zero manual onboarding steps" },
      { href: "/work/lead-enrichment-hubspot-crm", label: "Lead Enrichment & HubSpot CRM", note: "Leads in the CRM within 30 seconds" },
      { href: "/work/ecommerce-inventory-sync", label: "E-commerce Inventory Sync", note: "Shopify, Airtable and Sheets in step" },
      { href: "/#work", label: "The full archive", note: "Dozens more n8n, Make.com and Airtable systems" },
    ],
    faqs: [
      {
        q: "n8n or Make.com: which should I use?",
        a: "Make.com is quicker to set up and easy for a non-technical team to follow. n8n handles heavier logic, can be self-hosted, and gets cheaper as your volume grows. I recommend one based on your volume, your budget and who will maintain it, and explain why.",
      },
      {
        q: "What if an automation breaks?",
        a: "I build in error alerts, so a failure reaches you or me instead of failing silently. Every project includes a support window for fixes, and after that you can keep me on retainer or message me when something comes up.",
      },
      {
        q: "Do you work with the tools we already use?",
        a: "Almost always. If a tool has an API, a webhook or even a reliable export, it can be connected. If something genuinely cannot be automated, I tell you before you pay for anything.",
      },
    ],
  },
  {
    slug: "ai-agents",
    num: "04",
    name: "AI agents and chatbots",
    short: "Support bots, knowledge bots, sales agents and assistants that answer from your own data and act in your tools.",
    title: "AI Agent Development & Custom Chatbots | Denver NoCode",
    description:
      "Custom AI agents and chatbots built on Claude and OpenAI: support bots that answer from your own documents, sales agents, and assistants for your team.",
    h1: { before: "AI agents that ", accent: "actually", after: " do the job." },
    lead:
      "An agent is only useful if it is reliable. I build agents that answer from your own documents, act inside your tools and hand over to a person when they should, so they save hours instead of creating new work.",
    accent: "#0015D4",
    builds: [
      { title: "Support chatbots", desc: "Answer customer questions from your own website and documents, around the clock." },
      { title: "Internal knowledge bots", desc: "Your team asks in Slack or Telegram and gets an answer with the source attached." },
      { title: "Sales and outreach agents", desc: "Research prospects and draft personalized messages, with your approval before anything is sent." },
      { title: "Operations agents", desc: "Read incoming email, documents and forms, update the right records and flag what needs a person." },
      { title: "Content agents", desc: "Scripts, voiceovers, images and posts produced to your brief and logged for review." },
      { title: "Multi-tool assistants", desc: "One assistant connected to your calendar, inbox and business tools, answering in plain language." },
    ],
    tools: ["Claude", "OpenAI", "Gemini", "n8n", "Supabase", "Qdrant", "ElevenLabs", "HeyGen", "Slack", "Telegram"],
    proof: [
      { href: "/work/entsorger-circle", label: "Entsorger Circle: AI Client Pipeline", note: "Claude Vision, live in production" },
      { href: "/work/rag-website-chatbot", label: "RAG Website Chatbot", note: "Answers from the site's own content" },
      { href: "/work/slack-rag-knowledge-bot", label: "Slack RAG Knowledge Bot", note: "Company docs, answered with citations" },
      { href: "/work/multi-tool-gemini-agent", label: "Multi-Tool Gemini Agent", note: "Six platforms, one assistant" },
    ],
    faqs: [
      {
        q: "Will the agent make things up?",
        a: "Any language model can be wrong, so I design around it. Agents answer from your own sources and cite them, say when they do not know, and send anything with real consequences, such as a refund or an outgoing email, to a person for approval first. I test with your real questions before launch.",
      },
      {
        q: "Which AI model do you use?",
        a: "Usually Claude, and OpenAI or Gemini where they fit better or are already in your stack. The choice comes down to accuracy, speed and running cost for your specific task.",
      },
      {
        q: "What does it cost to run?",
        a: "Model usage is billed to your own account, with a spend limit set from day one. I estimate the monthly running cost before you commit, so there are no surprises.",
      },
    ],
  },
  {
    slug: "mcp",
    num: "05",
    name: "MCP servers and Claude integrations",
    short: "Custom MCP servers that give Claude safe, scoped access to your CRM, database, website or internal APIs.",
    title: "MCP Server Development & Claude Integrations | Denver NoCode",
    description:
      "Custom MCP servers that connect Claude to your own tools and data: your CRM, database, website or internal APIs, with exactly the permissions you choose.",
    h1: { before: "Connect Claude to ", accent: "your", after: " business." },
    lead:
      "The Model Context Protocol (MCP) is the open standard that lets Claude use outside tools. A custom MCP server gives Claude safe, scoped access to your own systems, so your team can ask Claude to look something up, update a record or publish a post, and it happens in the real tool.",
    accent: "#8B5CF6",
    builds: [
      { title: "Custom MCP servers", desc: "Your CRM, database or internal API exposed to Claude as a set of clear, permissioned tools." },
      { title: "Remote connectors", desc: "Hosted MCP servers your whole team can add to Claude as a connector, with access control." },
      { title: "Publishing workflows", desc: "Claude drafts, and your MCP server publishes to WordPress, a tracker or Google Drive once approved." },
      { title: "Claude Code workflows", desc: "Commands, hooks and project setup so Claude Code follows your team's rules every time." },
      { title: "Safe data access", desc: "Read-only views of your data for analysis, with write access only where you explicitly allow it." },
    ],
    tools: ["Claude", "Claude Code", "MCP", "TypeScript", "Python", "Node.js", "Render", "Railway"],
    proof: [{ href: "/services/claude-code", label: "Claude Code development", note: "The full-stack builds these servers plug into" }],
    example:
      "A hosted MCP server, live for a client, that lets their Claude publish straight to their self-hosted WordPress site and keep their content tracker and Google Drive up to date.",
    faqs: [
      {
        q: "What is an MCP server, in plain words?",
        a: "It is a small service that tells Claude which actions it may take in one of your systems, and carries them out safely. Think of it as a menu of approved buttons Claude can press, such as find a customer, create an invoice or publish a draft.",
      },
      {
        q: "Is it safe to give Claude access to our systems?",
        a: "You decide exactly which actions exist. I start read-only, add write actions one at a time, and keep risky ones behind a confirmation. Your credentials stay on the server and are never shown to the model.",
      },
      {
        q: "Which Claude apps can use it?",
        a: "Remote MCP servers can be added as custom connectors in Claude on the web and desktop, and to Claude Code. Availability depends on your Claude plan, so I check yours before we start.",
      },
    ],
  },
  {
    slug: "web3",
    num: "06",
    name: "Web3 and blockchain",
    short: "dApp front ends, Solidity smart contracts, Solana bots and on-chain dashboards.",
    title: "Web3 & Smart Contract Development | Denver NoCode",
    description:
      "Web3 development: dApp front ends, Solidity smart contracts, Solana trading bots and on-chain dashboards, built and tested with Claude Code.",
    h1: { before: "Web3, built ", accent: "carefully", after: "." },
    lead:
      "On-chain mistakes are permanent, so I build Web3 projects the careful way: contracts backed by thorough tests, front ends that never hold secrets, and bots with safety checks before every trade.",
    accent: "#8B5CF6",
    builds: [
      { title: "dApp front ends", desc: "Mint pages, staking vaults, swap and bridge interfaces, connected with wagmi, viem or ethers." },
      { title: "Smart contracts", desc: "Solidity contracts for vesting, escrow, staking, presales and treasuries, tested with Foundry or Hardhat." },
      { title: "Solana bots", desc: "Sniper, copy-trading, arbitrage and wallet-tracking bots with safety checks built in." },
      { title: "Telegram trading bots", desc: "Buy, sell and alerts from a chat, with limits you control." },
      { title: "On-chain dashboards", desc: "Portfolio, signal and protection dashboards that turn chain data into decisions." },
    ],
    tools: ["Solidity", "Foundry", "Hardhat", "Next.js", "React", "wagmi", "viem", "Solana", "Helius", "Jupiter"],
    proof: [{ href: "/#web3", label: "Web3 gallery", note: "The APAX Portfolio Vault client build, plus 20 more" }],
    faqs: [
      {
        q: "Do you audit smart contracts?",
        a: "I write thorough unit and fuzz tests and review every contract line by line, but that is not a substitute for an independent audit. For any contract that will hold meaningful value, I recommend a professional audit before mainnet and help you prepare for it.",
      },
      {
        q: "Can a trading bot guarantee profit?",
        a: "No, and anyone who promises that is selling something. A bot executes your strategy faster and more consistently than a person can. I build in position limits, safety checks and a kill switch, so a bad market does not become a disaster.",
      },
      {
        q: "Which chains do you work with?",
        a: "EVM chains such as Ethereum, Base, Arbitrum and Polygon, and Solana.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
