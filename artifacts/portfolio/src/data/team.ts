// ── The D. Team ──
// First names and titles only, as each member agreed on 26 Sep 2026.
// Photos (public/team, cropped square to head and shoulders) arrived 28 Sep;
// the colour stays as the fallback monogram if a photo is ever removed.
//
// Profile copy: Emerald's comes from real facts (site stats, delivered work,
// how Emerald actually works); the "how I started" story is a draft for
// Emerald to correct. Marcel, Smart and Samuel's profiles are role-only DRAFTS (no
// invented years, clients or projects) until each of them sends their own
// answers and approves the page. Keep `draft: true` until then.

export interface TeamMember {
  slug: string;
  name: string;
  fullName?: string;
  title: string;
  /** Square head-and-shoulders photo. The founder uses the site portrait. */
  photo?: string;
  /** Monogram colour when there is no photo. */
  color: string;
  ink: string;
  founder?: boolean;
  /** One-line hook under the name on their page. */
  lead: string;
  /** Profile paragraphs. */
  bio: string[];
  /** What they handle on Denver NoCode projects. */
  handles: string[];
  skills: string[];
  /** Not yet written or approved by the person themselves. */
  draft?: boolean;
}

export const team: TeamMember[] = [
  {
    slug: "emerald",
    name: "Emerald",
    fullName: "Denver Emerald Peter",
    title: "Founder and CEO",
    color: "#0015D4",
    ink: "#FFFFFF",
    founder: true,
    lead: "I build the systems that take the busywork off your plate, so you can run the business instead of the spreadsheets.",
    bio: [
      "I didn't start out writing code. I started out watching business owners lose their evenings to copy and paste: leads moved by hand from one tool to another, invoices chased one email at a time, the same five questions answered every single day. The fix was rarely a bigger team. It was a system nobody had built yet.",
      "So I learned to build them. First with n8n, Make.com and Airtable, then with Claude Code, which changed what one builder can ship in a week. More than 200 systems later, every project still starts the same way: understand the business, find the part that quietly costs the most, and build the thing that makes it go away.",
      "I run Denver NoCode from Lagos, Nigeria, and work with clients across Europe, the United States and Asia. Most of the work happens over WhatsApp and short walkthrough videos, so the time difference rarely gets in the way. When a project needs video, design or game development, the rest of the D. Team joins in, and you still deal with me from the first message to handover.",
    ],
    handles: [
      "Scoping every project and sending the fixed quote",
      "Architecture and every Claude Code build",
      "Automations, AI agents and MCP servers",
      "Handover: walkthrough video, docs and support",
    ],
    skills: ["Claude Code", "Claude API", "MCP", "n8n", "Make.com", "Airtable", "React", "TypeScript", "Python", "Supabase"],
  },
  {
    slug: "marcel",
    name: "Marcel",
    title: "AI video editor and automation specialist",
    photo: "/team/marcel.webp",
    color: "#F32317",
    ink: "#FFFFFF",
    lead: "Video that looks considered, not generated.",
    bio: [
      "Marcel leads the video side of Denver NoCode. When a client needs a product film, an explainer, ad creative or avatar-led content, Marcel shapes the story, edits it and makes sure it feels made by a person with taste.",
      "Marcel also builds the automations behind video at scale, so a client who needs ten versions of a video, or a new one every week, gets a pipeline instead of a production bottleneck.",
    ],
    handles: ["Product films and explainers", "Ad creative and social video", "AI avatar and voice content", "Automated video pipelines"],
    skills: ["Video editing", "Storyboarding", "AI video generation", "Motion graphics", "Voiceover", "Workflow automation"],
    draft: true,
  },
  {
    slug: "smart",
    name: "Smart",
    title: "Web designer and business automation consultant",
    photo: "/team/smart.webp",
    color: "#FFCB41",
    ink: "#141414",
    lead: "Websites designed around what happens after the click.",
    bio: [
      "Smart designs the websites clients see first: the layout, the typography and the path from a first visit to a real enquiry.",
      "Because Smart also consults on business automation, a Denver NoCode site is designed around what happens after someone clicks the button: where the enquiry goes, who gets told, and how fast they reply. Good design gets the lead. The system behind it keeps it.",
    ],
    handles: ["Website and landing page design", "Conversion paths and enquiry flows", "Design systems and brand consistency", "Automation consulting for small teams"],
    skills: ["Web design", "UX", "Responsive layouts", "Design systems", "Conversion design", "Process mapping"],
    draft: true,
  },
  {
    slug: "samuel",
    name: "Samuel",
    title: "Roblox developer and AI automation expert",
    photo: "/team/samuel.webp",
    color: "#84DEF9",
    ink: "#141414",
    lead: "Games on Roblox, with AI doing the heavy lifting behind them.",
    bio: [
      "Samuel leads Roblox development at Denver NoCode, from core game systems and progression to the economy that keeps players coming back.",
      "Samuel also brings AI automation into how games are built and run: faster content pipelines, smarter testing and the operational work behind a live game, so a small studio can ship like a bigger one.",
    ],
    handles: ["Roblox game development", "Game systems, progression and economies", "AI-assisted content pipelines", "Automation for live game operations"],
    skills: ["Roblox Studio", "Luau", "Game design", "Monetisation", "AI automation", "Live operations"],
    draft: true,
  },
];

export const memberBySlug = (slug: string) => team.find((m) => m.slug === slug);

export const LOCATION = {
  label: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  zone: "WAT, GMT+1",
  maps: "https://www.google.com/maps/place/Lagos,+Nigeria",
};
