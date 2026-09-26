// ── Work pages: /work/:slug ──
// One page per featured system. The steps only unpack the description the
// project already carries on the home page; nothing here adds new claims.
import { featured, testimonials, type FeaturedProject } from "@/data/portfolio";

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

export type WorkItem = FeaturedProject & WorkExtra & { quote?: string };

export const work: WorkItem[] = featured.map((p) => {
  const extra = EXTRA[p.id];
  const t = extra.testimonial ? testimonials.find((x) => x.name === extra.testimonial) : undefined;
  return { ...p, ...extra, quote: t?.quote };
});

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);
