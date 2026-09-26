// ── The public knowledge pack ──
// Written to /llms-full.txt at build time. It is both the long-form file AI
// search engines read and the ONLY thing Ask Pax knows. Everything here is
// already public on the site, so nothing private can leak through Pax.
import { services } from "@/data/services";
import { industries, PROOF_LABEL, SIZES } from "@/data/industries";
import { work } from "@/data/work";
import { team } from "@/data/team";
import { films, FILM_GROUPS } from "@/data/films";
import { FAQS } from "@/data/faqs";
import { webProjects, web3Projects, testimonials, WHATSAPP, FIVERR, UPWORK } from "@/data/portfolio";

const SITE = "https://www.denvernocode.com";

export function buildKnowledge(): string {
  const out: string[] = [];
  const h = (t: string) => out.push("", `## ${t}`, "");

  out.push(
    "# Denver NoCode: full public knowledge",
    "",
    "Denver NoCode is the studio of Denver Emerald Peter (Emerald), a Claude Code developer who builds web apps, websites, business automations, AI agents and MCP servers for businesses worldwide, with Claude Code, n8n, Make.com and Airtable.",
    "",
    "- 200+ systems delivered for 50+ clients worldwide, over 4+ years of building automations.",
    "- Level 2 seller on Fiverr.",
    "- Built for businesses doing $10k+ a month.",
    "- Every system is delivered in the client's own accounts, with a walkthrough video and plain docs. The client owns everything.",
    "- Calm, direct, allergic to jargon. If something will not work, Emerald says so before the client pays for it.",
  );

  h("How to hire Emerald");
  out.push(
    `- Fiverr (${FIVERR}): Level 2 seller. Fixed scope, fixed price, escrow held until the client approves. Best if you want the platform holding the paperwork.`,
    `- Upwork (${UPWORK}): hourly or milestone contracts with time tracking. Best for longer builds and ongoing retainers where scope evolves.`,
    "- Direct: no platform fee. Scope is agreed, Emerald invoices, and the work starts. Same delivery, same support, lower price. Payment by Wise, Remitly, PayPal or bank transfer.",
    `- Fastest start: WhatsApp (${WHATSAPP}) or the onboarding form on the home page (the Start your project button). Emerald sends a plan and a fixed quote within 24 hours.`,
  );

  h("Process");
  out.push(
    "1. Tell me your workflow: the manual process is mapped, the bottleneck found, and done is agreed.",
    "2. I build your system: in the client's accounts with Claude Code and the right tool for the job, tested end to end.",
    "3. You own it: handover with a walkthrough video and plain docs.",
  );

  h("Frequently asked questions");
  for (const f of FAQS) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");

  h("Services");
  for (const s of services) {
    out.push(`### ${s.name} (${SITE}/services/${s.slug})`, "", s.lead, "", "What gets built:");
    for (const b of s.builds) out.push(`- ${b.title}: ${b.desc}`);
    out.push(`Tools: ${s.tools.join(", ")}.`);
    if (s.example) out.push(`Delivered and live: ${s.example}`);
    for (const p of s.proof) out.push(`Proof: ${p.label} (${p.note}): ${p.href.startsWith("/") ? SITE + p.href : p.href}`);
    for (const f of s.faqs) out.push(`Q: ${f.q}`, `A: ${f.a}`);
    out.push("");
  }

  h("Industries");
  for (const ind of industries) {
    out.push(`### ${ind.name} (${SITE}/industries/${ind.slug})`, "", ind.lead, "", "Common problems:");
    for (const p of ind.pains) out.push(`- ${p}`);
    out.push("What gets built:");
    for (const b of ind.builds) out.push(`- ${b.title}: ${b.desc}`);
    for (const p of ind.proof) out.push(`${PROOF_LABEL[p.kind]}: ${p.text}${p.href ? ` (${p.href.startsWith("/") ? SITE + p.href : p.href})` : ""}`);
    out.push("");
  }
  out.push("Business sizes:");
  for (const s of SIZES) out.push(`- ${s.title}: ${s.desc}`);

  h("Flagship systems (case studies)");
  for (const w of work) {
    out.push(`### ${w.title} (${SITE}/work/${w.slug})`, "", w.desc, `Result: ${w.stat}. ${w.result}.`, "How it works:");
    w.steps.forEach((st, i) => out.push(`${i + 1}. ${st}`));
    out.push(`Stack: ${w.tools.join(", ")}.`, "");
  }

  h(`Build films (${SITE}/films): short walkthroughs with sample data, not client results`);
  for (const g of FILM_GROUPS) {
    out.push(`${g.label}:`);
    for (const f of films.filter((x) => x.service === g.service)) out.push(`- ${f.title} (${f.tag}): ${f.desc}`);
  }

  h("Web builds gallery (showcase builds, see the home page)");
  for (const p of webProjects) out.push(`- ${p.name}, ${p.kind}: ${p.desc}`);

  h("Web3 gallery (APAX is a client build; the rest are showcase builds)");
  for (const p of web3Projects) out.push(`- ${p.name}, ${p.kind.replace(" — ", ": ")}: ${p.desc}`);

  h("Video testimonials from real clients (first names as shown on the site)");
  for (const t of testimonials) out.push(`- ${t.name}: "${t.quote}"`);

  h("The D. Team");
  for (const m of team) out.push(`- ${m.name}: ${m.title}`);
  out.push("Emerald leads every project and stays the client's one point of contact. The team joins when a build needs AI video, web design or Roblox development.");

  return out.join("\n").replace(/—/g, ",") + "\n";
}
