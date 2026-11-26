// ── /work: everything on one page ──
// One tile per piece of work, grouped by category. Every tile points at
// something that exists in the repo: a case study, a gallery, the game or a
// film. Concept demos keep that label. The order inside each list is curated,
// strongest first.
import { webProjects, web3Projects, robloxProjects } from "@/data/portfolio";
import { work, coverBase } from "@/data/work";
import { films } from "@/data/films";
import { allShorts, featuredGame } from "@/data/games";

export type CategoryId = "websites" | "ai" | "games" | "automations" | "web3" | "films";

export interface Tile {
  id: string;
  /** Small chip over the name: what kind of thing this is. */
  label: string;
  name: string;
  /** One full sentence on what it is or does. */
  line: string;
  stack: string[];
  /** Base path of the cover: `${cover}-480.webp` and `${cover}-960.webp`. */
  cover: string;
  href: string;
  /** Opens outside the React app (the game). */
  external?: boolean;
  /** Short muted clip that plays over the cover. */
  video?: string;
  /** Seconds to loop between, for clips that open or close on a title card. */
  clip?: [number, number];
  /** The cover is an illustration with sample data: it shows an "Example output" label. */
  example?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  lead: string;
  /** How much of this kind of work exists, including what the page links out to. */
  total: number;
  tiles: Tile[];
  more?: { label: string; href: string };
}

const sentence = (s: string) => (/[.?]$/.test(s) ? s : `${s}.`);
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// Websites and apps: the two with the most on screen lead.
const WEB_ORDER = ["01-pulseboard", "05-haven-realty", "02-nova-bank", "07-slotly-booking", "08-lumen-ai", "06-forge-fitness", "11-meridian-sponsorship", "10-wander-travel", "03-atelier-store", "04-ember-restaurant", "09-studio-north"];
const websites: Tile[] = WEB_ORDER.map((slug) => {
  const p = webProjects.find((x) => x.slug === slug)!;
  return {
    id: `web-${slug.slice(3)}`,
    label: titleCase(p.kind),
    name: p.name,
    line: sentence(p.desc),
    stack: p.stack,
    cover: coverBase(`web-${slug.slice(3)}`),
    href: "/services/websites-apps",
  };
});

const caseStudy = (slug: string, label: string): Tile => {
  const w = work.find((x) => x.slug === slug)!;
  return {
    id: slug,
    label,
    name: w.title.replace("&", "and"),
    line: sentence(w.desc),
    stack: w.tools,
    cover: w.cover,
    href: `/work/${w.slug}`,
    video: w.loop,
    example: w.example,
  };
};

const ai: Tile[] = [
  caseStudy("cashout-ai-property-platform", "AI platform"),
  caseStudy("entsorger-circle", "AI agent"),
  caseStudy("rag-website-chatbot", "AI agent"),
  caseStudy("slack-rag-knowledge-bot", "AI agent"),
  caseStudy("multi-tool-gemini-agent", "AI agent"),
  caseStudy("ai-video-resume-generator", "AI agent"),
];

const automations: Tile[] = [
  caseStudy("lead-enrichment-hubspot-crm", "Automation"),
  caseStudy("ai-lead-generation-system", "Automation"),
  caseStudy("ecommerce-inventory-sync", "Automation"),
  caseStudy("client-onboarding-automation", "Automation"),
  caseStudy("multi-platform-social-media", "Automation"),
  caseStudy("ai-video-content-factory", "Automation"),
];

const short = (slug: string, label: string, anchor: string): Tile => {
  const s = allShorts.find((x) => x.slug === slug)!;
  return {
    id: `short-${slug}`,
    label,
    name: s.title,
    line: s.desc,
    stack: [label === s.tag ? "Story Short" : s.tag, `${s.seconds} seconds`],
    cover: coverBase(`short-${slug}`),
    href: `/game-development#${anchor}`,
  };
};

const demo = (slug: string): Tile => {
  const p = robloxProjects.find((x) => x.slug === slug)!;
  const n = slug.slice(0, 2);
  return {
    id: `roblox-${slug.slice(3)}`,
    label: "Concept demo",
    name: p.name,
    line: p.desc,
    stack: p.stack,
    cover: coverBase(`roblox-${slug.slice(3)}`),
    href: "/game-development#roblox",
    video: p.video ?? `/videos/roblox-${n}.mp4`,
    // Each demo film opens and closes on a title card; the loop stays inside the gameplay.
    clip: [3, 17],
  };
};

const games: Tile[] = [
  {
    id: "mac-vs-the-rex",
    label: featuredGame.kind,
    name: featuredGame.name,
    line: featuredGame.desc,
    stack: featuredGame.stack,
    cover: coverBase("mac-vs-the-rex"),
    href: featuredGame.playUrl,
    external: true,
  },
  short("hair-colour-story", "Roblox story Short", "shorts"),
  short("hug-swap-story", "Client work", "client-work"),
  demo("01-canyon-rush"),
  demo("17-arena-brawl"),
  demo("14-lagos-drive-rp"),
  short("body-secret-army", "Roblox story Short", "shorts"),
  short("three-am-knock", "Roblox story Short", "shorts"),
  short("molasses-flood", "Roblox story Short", "shorts"),
  demo("09-ore-tycoon"),
  demo("05-ward-9"),
  demo("04-neon-city-run"),
];

// Web3: the lines say what each screen is and leave the sample figures out.
const WEB3: Array<[slug: string, label: string, line: string]> = [
  ["21-apax", "Client build", "A portfolio vault dApp where the frontend never touches the chain: a Next.js interface, an Express API layer and a Solidity vault as the single source of truth."],
  ["17-perpdeck", "Concept demo", "A perpetuals trading terminal with candles, an order ticket, a leverage slider and live positions."],
  ["01-mintforge", "Concept demo", "An NFT mint page with phased allowlists, live supply tracking and instant reveal."],
  ["03-bridgeport", "Concept demo", "A cross-chain bridge interface with live fee quotes, a route preview and arrival estimates."],
  ["09-pumpwatch", "Concept demo", "A Telegram trading bot to buy, sell and snipe from chat, with rug checks and take-profit rules."],
  ["04-quorum", "Concept demo", "A DAO governance portal with the proposal lifecycle, live vote bars and quorum tracking."],
];
const web3: Tile[] = WEB3.map(([slug, label, line]) => {
  const p = web3Projects.find((x) => x.slug === slug)!;
  return { id: `web3-${slug.slice(3)}`, label, name: p.name, line, stack: p.stack, cover: coverBase(`web3-${slug.slice(3)}`), href: "/services/web3#web3" };
});

const film = (slug: string): Tile => {
  const f = films.find((x) => x.slug === slug)!;
  return {
    id: `film-${slug}`,
    label: "Build film",
    name: f.title,
    line: f.desc,
    stack: [f.tag, `${f.seconds} seconds`],
    cover: coverBase(`film-${slug}`),
    href: `/films#${f.service}`,
  };
};
const filmTiles: Tile[] = [film("accessibility-audit"), film("cross-platform-agent"), film("proposal-generator")];

export const categories: Category[] = [
  {
    id: "websites",
    name: "Websites and apps",
    lead: "Landing pages, dashboards and booking apps, designed and built end to end with Claude Code.",
    total: websites.length,
    tiles: websites,
    more: { label: "See the websites and apps service", href: "/services/websites-apps" },
  },
  {
    id: "ai",
    name: "AI agents and platforms",
    lead: "Agents that read, decide and act inside a real product, with the facts kept in a database you can check.",
    total: ai.length,
    tiles: ai,
    more: { label: "See the AI agents service", href: "/services/ai-agents" },
  },
  {
    id: "games",
    name: "Games",
    lead: "A browser game you can play now, Roblox story Shorts, and concept demos that prove a core loop before a full build.",
    total: 1 + allShorts.length + robloxProjects.length,
    tiles: games,
    more: { label: `See all ${allShorts.length} Shorts and ${robloxProjects.length} concept demos`, href: "/game-development" },
  },
  {
    id: "automations",
    name: "Automations",
    lead: "The repeat work between your tools, done the same way every time: leads, stock, onboarding and posting.",
    total: automations.length,
    tiles: automations,
    more: { label: "See the automation service", href: "/services/automation" },
  },
  {
    id: "web3",
    name: "Web3",
    lead: "One client vault dApp, and concept demos of the screens Web3 products need most.",
    total: web3Projects.length,
    tiles: web3,
    more: { label: `See all ${web3Projects.length} Web3 builds`, href: "/services/web3#web3" },
  },
  {
    id: "films",
    name: "Films",
    lead: "Short films that walk through how a Claude system works, made with sample data.",
    total: films.length,
    tiles: filmTiles,
    more: { label: `Watch all ${films.length} build films`, href: "/films" },
  },
];

export const totalWork = categories.reduce((n, c) => n + c.total, 0);
