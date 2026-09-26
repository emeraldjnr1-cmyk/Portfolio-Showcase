// ── The single source for every page's <head> ──
// Read at build time by scripts/prerender.mjs, which writes one static HTML
// file per entry plus sitemap.xml and llms.txt. Add a page here and it is
// prerendered, indexed and listed automatically.
import { services } from "@/data/services";
import { work } from "@/data/work";
import { industries } from "@/data/industries";
import { team } from "@/data/team";
import { films, filmSrc, filmPoster } from "@/data/films";
import { FAQS } from "@/data/faqs";
import { FIVERR, UPWORK, WHATSAPP } from "@/data/portfolio";

export const SITE = {
  url: "https://www.denvernocode.com",
  name: "Denver NoCode",
  person: "Denver Emerald Peter",
  image: "https://www.denvernocode.com/og-image.png",
  logo: "https://www.denvernocode.com/logo.png",
  whatsapp: WHATSAPP,
  sameAs: [UPWORK, FIVERR],
};

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  /** Only the default share image has known dimensions. */
  imageSize?: { w: number; h: number };
  jsonLd: object[];
  noindex?: boolean;
  /** One line for llms.txt. */
  summary: string;
}

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE.url}${p}`);
const ORG_ID = `${SITE.url}/#org`;
const PERSON_ID = `${SITE.url}/#emerald`;

const breadcrumbs = (trail: Array<[string, string]>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

const faqPage = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Organization, not LocalBusiness: the work is remote and worldwide, and a
// LocalBusiness without a street address fails Google's rich results test.
const home: PageMeta = {
  path: "/",
  title: "Claude Code Developer & AI Automation Expert | Denver NoCode",
  description:
    "Denver Emerald Peter builds apps, websites, AI agents, MCP servers and automations with Claude Code, n8n and Make.com. 200+ systems for 50+ clients worldwide.",
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: "Home: who Denver NoCode is, the work, video testimonials, how to hire.",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { "@id": ORG_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: SITE.logo,
      image: SITE.image,
      description:
        "A Claude Code studio building web apps, websites, business automations, AI agents and MCP servers for businesses worldwide.",
      founder: { "@id": PERSON_ID },
      areaServed: "Worldwide",
      sameAs: SITE.sameAs,
      contactPoint: { "@type": "ContactPoint", contactType: "sales", url: SITE.whatsapp, availableLanguage: "English" },
      knowsAbout: ["Claude Code", "AI agents", "Model Context Protocol", "n8n", "Make.com", "Airtable", "Business automation", "Web development", "Web3"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.person,
      alternateName: ["Denver Peter", "Emerald"],
      jobTitle: "Founder and CEO",
      worksFor: { "@id": ORG_ID },
      url: `${SITE.url}/#about`,
      image: SITE.image,
      sameAs: SITE.sameAs,
      knowsAbout: ["Claude Code", "AI agents", "n8n", "Make.com", "Airtable", "React"],
    },
    faqPage(FAQS),
  ],
};

const servicesIndex: PageMeta = {
  path: "/services",
  title: "Services: Claude Code, Automation, AI Agents & MCP | Denver NoCode",
  description:
    "Six ways to hire Denver NoCode: Claude Code builds, websites and web apps, n8n and Make.com automation, AI agents, MCP servers and Web3 development.",
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: "Services overview, linking to every service page.",
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Services", "/services"]]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: abs(`/services/${s.slug}`) })),
    },
  ],
};

const servicePages: PageMeta[] = services.map((s) => ({
  path: `/services/${s.slug}`,
  title: s.title,
  description: s.description,
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: s.short,
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Services", "/services"], [s.name, `/services/${s.slug}`]]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      description: s.description,
      url: abs(`/services/${s.slug}`),
      provider: { "@id": ORG_ID },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: s.name,
        itemListElement: s.builds.map((b) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: b.title, description: b.desc },
        })),
      },
    },
    faqPage(s.faqs),
  ],
}));

const workIndex: PageMeta = {
  path: "/work",
  title: "Work: AI Agent & Automation Case Studies | Denver NoCode",
  description:
    "Flagship systems built by Denver NoCode: AI client pipelines, lead generation, RAG chatbots, knowledge bots, onboarding and CRM automation.",
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: "Index of flagship systems, each with its own page.",
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Work", "/work"]]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: work.map((w, i) => ({ "@type": "ListItem", position: i + 1, name: w.title, url: abs(`/work/${w.slug}`) })),
    },
  ],
};

// When each project film was first published (its first commit).
const FILM_DATES: Record<number, string> = { 11: "2026-07-13", 1: "2026-07-10", 2: "2026-07-10" };

const workPages: PageMeta[] = work.map((w) => ({
  path: `/work/${w.slug}`,
  title: `${w.title} | Denver NoCode`,
  description: `${w.desc} Built with ${w.tools.join(", ")}.`.slice(0, 300),
  image: abs(w.poster ?? w.img),
  summary: w.desc,
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Work", "/work"], [w.title, `/work/${w.slug}`]]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: w.title,
      description: w.desc,
      url: abs(`/work/${w.slug}`),
      image: abs(w.poster ?? w.img),
      creator: { "@id": ORG_ID },
      keywords: w.tools.join(", "),
      ...(w.video ? { video: { "@type": "VideoObject", name: w.title, description: w.desc, contentUrl: abs(w.video), thumbnailUrl: abs(w.poster ?? w.img), uploadDate: FILM_DATES[w.id] } } : {}),
    },
  ],
}));

const notFound: PageMeta = {
  path: "/404",
  title: "Page not found | Denver NoCode",
  description: "This page does not exist. Head back to Denver NoCode to see the work and services.",
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: "",
  jsonLd: [],
  noindex: true,
};

const industriesIndex: PageMeta = {
  path: "/industries",
  title: "Industries: AI Automation by Sector | Denver NoCode",
  description:
    "Claude Code builds, automation and AI agents for real estate, fitness, construction, events, e-commerce, agencies, creators, professional services and more.",
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: "The twelve industries served, each with its own page.",
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Industries", "/industries"]]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: industries.map((ind, i) => ({ "@type": "ListItem", position: i + 1, name: ind.name, url: abs(`/industries/${ind.slug}`) })),
    },
  ],
};

const industryPages: PageMeta[] = industries.map((ind) => ({
  path: `/industries/${ind.slug}`,
  title: ind.title,
  description: ind.description,
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: ind.short,
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Industries", "/industries"], [ind.name, `/industries/${ind.slug}`]]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Automation and AI for ${ind.name.toLowerCase()}`,
      description: ind.description,
      url: abs(`/industries/${ind.slug}`),
      provider: { "@id": ORG_ID },
      areaServed: "Worldwide",
      audience: { "@type": "BusinessAudience", name: ind.name },
    },
  ],
}));

const video = (f: (typeof films)[number]) => ({
  "@type": "VideoObject",
  name: f.title,
  description: f.desc,
  thumbnailUrl: abs(filmPoster(f)),
  contentUrl: abs(filmSrc(f)),
  uploadDate: f.date,
  duration: `PT${f.seconds}S`,
  creator: { "@id": ORG_ID },
});

const filmsPage: PageMeta = {
  path: "/films",
  title: "Build Films: Claude Systems in Action | Denver NoCode",
  description:
    "Short films showing how Claude systems work, from Claude Code and Claude Skills to automations, AI agents, MCP servers and full-stack apps.",
  image: abs(filmPoster(films[0])),
  summary: "Short walkthrough films of Claude systems, grouped by service.",
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Build films", "/films"]]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: films.map((f, i) => ({ "@type": "ListItem", position: i + 1, item: video(f) })),
    },
  ],
};

const teamPage: PageMeta = {
  path: "/team",
  title: "The D. Team | Denver NoCode",
  description:
    "Meet the D. Team: Emerald, founder and CEO of Denver NoCode, with Marcel, Smart and Samuel across AI video, web design, Roblox and automation.",
  image: SITE.image,
  imageSize: { w: 1200, h: 630 },
  summary: "The team: Emerald (founder and CEO), Marcel, Smart and Samuel.",
  jsonLd: [
    breadcrumbs([["Home", "/"], ["Team", "/team"]]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "The D. Team",
      itemListElement: team.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: m.founder
          ? { "@id": PERSON_ID }
          : { "@type": "Person", name: m.name, jobTitle: m.title, worksFor: { "@id": ORG_ID } },
      })),
    },
  ],
};

export const PAGES: PageMeta[] = [
  home,
  servicesIndex,
  ...servicePages,
  industriesIndex,
  ...industryPages,
  workIndex,
  ...workPages,
  teamPage,
  filmsPage,
  notFound,
];
