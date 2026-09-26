// Build step 3 of 3 (after the client and SSR builds): render every page in
// src/seo/pages.ts to static HTML so crawlers that never run JavaScript,
// which is most AI crawlers, still read the full page. Also writes
// sitemap.xml, robots.txt and llms.txt from the same page list.
//
// The browser then mounts the app with createRoot, which replaces this HTML
// with the live app, so nothing needs to hydrate exactly.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist/public");
const template = fs.readFileSync(path.join(out, "index.html"), "utf8");
const { render, PAGES, SITE } = await import(pathToFileURL(path.join(root, "dist/server/entry-server.js")).href);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const urlOf = (p) => (p === "/" ? `${SITE.url}/` : `${SITE.url}${p}`);

function head(page) {
  const url = urlOf(page.path);
  const t = esc(page.title);
  const d = esc(page.description);
  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    page.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(page.image)}" />`,
    ...(page.imageSize
      ? [`<meta property="og:image:width" content="${page.imageSize.w}" />`, `<meta property="og:image:height" content="${page.imageSize.h}" />`]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${esc(page.image)}" />`,
    // "<" escaped so no string inside the data can close the script tag.
    ...page.jsonLd.map((ld) => `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.join("\n    ");
}

const SEO_BLOCK = /<!--seo:start[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template) || !template.includes("<!--app-html-->")) {
  throw new Error("prerender: index.html is missing the seo or app-html markers");
}

const words = (html) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

for (const page of PAGES) {
  const app = render(page.path);
  // Fail the build rather than ship a blank page to crawlers again.
  if (!/<h1[\s>]/.test(app) || words(app) < 80) {
    throw new Error(`prerender: ${page.path} rendered without an h1 or with too little text (${words(app)} words)`);
  }
  const html = template.replace(SEO_BLOCK, head(page)).replace("<!--app-html-->", app);
  const file =
    page.path === "/" ? "index.html" : page.path === "/404" ? "404.html" : path.join(page.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true });
  fs.writeFileSync(path.join(out, file), html);
  console.log(`prerender: ${page.path.padEnd(42)} ${String(words(app)).padStart(5)} words`);
}

const indexable = PAGES.filter((p) => !p.noindex);
const today = new Date().toISOString().slice(0, 10);

fs.writeFileSync(
  path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${urlOf(p.path)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`,
);

// Search engines and AI assistants are all welcome: being found is the point.
fs.writeFileSync(
  path.join(out, "robots.txt"),
  `# Denver NoCode: search engines and AI assistants are welcome here.
User-agent: *
Allow: /

User-agent: Googlebot
User-agent: Bingbot
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`,
);

const name = (p) => p.title.replace(/ \| Denver NoCode$/, "");
const list = (prefix) =>
  indexable
    .filter((p) => p.path.startsWith(prefix) && p.path !== prefix)
    .map((p) => `- [${name(p)}](${urlOf(p.path)}): ${p.summary}`)
    .join("\n");

fs.writeFileSync(
  path.join(out, "llms.txt"),
  `# ${SITE.name}

> ${SITE.name} is the studio of ${SITE.person}, a Claude Code developer who builds web apps, websites, business automations, AI agents and MCP servers for businesses worldwide, using Claude Code, n8n, Make.com and Airtable.

- 200+ systems delivered for 50+ clients worldwide, over 4+ years of building automations.
- Level 2 seller on Fiverr, also hireable on Upwork or directly on WhatsApp.
- A fixed quote within 24 hours of the onboarding form. Most automations ship in 3 to 7 days; websites and bigger app builds in 1 to 3 weeks.
- Every system is delivered in the client's own accounts, with a walkthrough video and plain docs.

## Services

- [All services](${urlOf("/services")}): overview of the six services.
${list("/services")}

## Work

- [All work](${urlOf("/work")}): the flagship systems, each broken down step by step.
${list("/work")}

## Contact

- [WhatsApp](${SITE.whatsapp}): fastest way to start a project.
${SITE.sameAs.map((u) => `- [${u.includes("upwork") ? "Upwork" : "Fiverr"}](${u})`).join("\n")}
- [Home](${SITE.url}/): video testimonials, the full portfolio and the onboarding form.
`,
);

console.log(`prerender: ${PAGES.length} pages, sitemap (${indexable.length} urls), robots.txt, llms.txt`);
