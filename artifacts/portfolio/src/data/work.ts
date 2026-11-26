// ── Work pages: /work/:slug ──
// One page per featured system. The steps only unpack the description the
// project already carries on the home page; nothing here adds new claims.
import { featured, testimonials, writtenReviews, type FeaturedProject } from "@/data/portfolio";

interface WorkExtra {
  slug: string;
  service: string;
  steps: string[];
  /** Name of a real video testimonial from the same client, if any. */
  testimonial?: string;
}

const EXTRA: Record<number, WorkExtra> = {
  11: {
    slug: "entsorger-circle",
    service: "ai-agents",
    testimonial: "Moritz Domm",
    steps: [
      "Claude Vision finds and checks each company's logo and writes it into the live Google Sheet.",
      "A daily pipeline picks up every new event signup.",
      "Playwright renders a personalized visual for each signup, with their own logo on it.",
      "A ready-to-send Gmail draft is prepared, so outreach needs one click instead of an afternoon.",
    ],
  },
  1: {
    slug: "ai-video-resume-generator",
    service: "ai-agents",
    steps: [
      "A candidate submits a resume and a photo.",
      "OpenAI extracts the key details and writes the script.",
      "Gender detection picks the matching avatar and voice.",
      "HeyGen renders the avatar video, which is uploaded and logged automatically.",
    ],
  },
  2: {
    slug: "ai-lead-generation-system",
    service: "ai-agents",
    steps: [
      "Apify scrapes prospects that match your target profile.",
      "AI writes a personalized first message for each one.",
      "You approve or edit every message before anything goes out.",
      "Gmail sends the approved messages.",
    ],
  },
  3: {
    slug: "rag-website-chatbot",
    service: "ai-agents",
    steps: [
      "The workflow crawls the website's content.",
      "The content is split up and stored as embeddings in Supabase.",
      "Each visitor question pulls back the most relevant passages.",
      "The chat agent answers from the site's own content.",
    ],
  },
  4: {
    slug: "slack-rag-knowledge-bot",
    service: "ai-agents",
    steps: [
      "Company documents are ingested into a Qdrant vector store.",
      "Someone asks a question in Slack.",
      "The bot retrieves the passages that answer it.",
      "It replies in the thread, with citations to the source documents.",
    ],
  },
  5: {
    slug: "ai-video-content-factory",
    service: "ai-agents",
    steps: [
      "Deepseek writes scripts from your topics.",
      "ElevenLabs turns each script into a voiceover.",
      "AI generates matching images for every scene.",
      "Every asset is logged in Google Sheets, ready for editing.",
    ],
  },
  6: {
    slug: "multi-tool-gemini-agent",
    service: "ai-agents",
    steps: [
      "One Gemini agent is connected to YouTube, GitHub, Hacker News, Gmail, Strava and Calendar.",
      "You ask for what you need in plain language.",
      "The agent picks the right tool, or chains several together.",
      "You get one answer instead of six open tabs.",
    ],
  },
  7: {
    slug: "client-onboarding-automation",
    service: "automation",
    steps: [
      "A new client signs up.",
      "The contract is generated automatically.",
      "A welcome email goes out.",
      "Drive folders are created and the CRM is updated.",
    ],
  },
  8: {
    slug: "multi-platform-social-media",
    service: "automation",
    steps: [
      "AI drafts the post from your source content.",
      "The post is reformatted for each platform.",
      "It publishes to LinkedIn, Twitter and Instagram automatically.",
    ],
  },
  9: {
    slug: "lead-enrichment-hubspot-crm",
    service: "automation",
    steps: [
      "A webhook captures the lead the moment the form is submitted.",
      "Apollo enriches it with company and contact data.",
      "The contact is created or updated in HubSpot.",
      "Sales gets an instant Slack alert.",
    ],
  },
  10: {
    slug: "ecommerce-inventory-sync",
    service: "automation",
    steps: [
      "Shopify orders and stock changes sync in real time.",
      "Airtable and Google Sheets stay in step with Shopify.",
      "Low stock triggers an alert before anything sells out.",
    ],
  },
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Cover for the work grid and the top of each case study: `${cover}-480.webp`, `-960.webp`, `-1600.webp`. */
export const coverBase = (slug: string) => `${BASE}/work/${slug}`;

export type WorkItem = FeaturedProject &
  WorkExtra & {
    quote?: string;
    /** Who said the quote and in what role, when it is a written review. */
    quoteBy?: string;
    /** Base path of the 16:9 cover. */
    cover: string;
    /** Short muted screen recording that plays in place of the cover. */
    loop?: string;
    /** False where the stored canvas screenshot shows a different workflow, so the page leaves it out. */
    showCanvas: boolean;
  };

// The canvas screenshots stored for these two show other workflows (a pickup
// reminder and a bill import), so their pages show the cover only.
const CANVAS_MISMATCH = new Set([7, 10]);

const fromFeatured: WorkItem[] = featured.map((p) => {
  const extra = EXTRA[p.id];
  const t = extra.testimonial ? testimonials.find((x) => x.name === extra.testimonial) : undefined;
  return { ...p, ...extra, quote: t?.quote, cover: coverBase(extra.slug), showCanvas: p.id !== 11 && !CANVAS_MISMATCH.has(p.id) };
});

// ── Cashout Singapore ──
// Client and platform are public through Maverick Tsao's written review. The
// steps describe what the product does; no figures are claimed.
const review = writtenReviews.find((r) => r.name === "Maverick Tsao");
const cashout: WorkItem = {
  id: 12,
  slug: "cashout-ai-property-platform",
  service: "ai-agents",
  title: "Cashout Singapore: AI Property Platform",
  desc: "A property platform for Singapore where owners and agents list a home by talking, and buyers and tenants find one by describing it in their own words.",
  tag: "AI Agents",
  tools: ["Claude", "Next.js", "Supabase", "Railway"],
  stat: "Search by conversation, answers from the listing",
  result: "The chat finds listings and answers from what owners and agents have told it",
  img: `${coverBase("cashout-ai-property-platform")}-1600.webp`,
  cover: coverBase("cashout-ai-property-platform"),
  loop: `${BASE}/videos/work/cashout-ai-property-platform.mp4`,
  showCanvas: false,
  quote: review?.quote,
  quoteBy: review ? `${review.name}, ${review.role}` : undefined,
  steps: [
    "An owner or agent describes the property by voice or text, and Claude turns the answers into a structured listing they confirm before it is saved.",
    "The nearest MRT station and the district are measured from the map, so they are never taken on trust.",
    "A buyer or tenant says what they need in plain words, and the chat searches the approved listings by filters and by meaning.",
    "Answers come from the listing record and from what the owner or agent said, so the AI never holds the facts itself.",
    "A question the listing cannot answer goes to the lister, and the reply is kept on the listing for the next person.",
  ],
};

// Appended last on purpose: the footer links the first five.
export const work: WorkItem[] = [...fromFeatured, cashout];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);
