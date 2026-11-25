import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/SplitWords";
import { SectionHeader } from "@/components/site/SectionHeader";
import { profilePicSmall } from "@/data/portfolio";

// Section 01: Claude Code as the umbrella over everything else on the page.
// Each lane is a link to its service page, which is also how the home page
// passes search weight to those pages.
// ink is a full class name, not assembled at runtime, so Tailwind can see it.
const LANES = [
  {
    title: "Apps and websites",
    desc: "Dashboards, portals, booking tools, storefronts and landing pages, as real code you own.",
    href: "/services/websites-apps",
    color: "#F32317",
    ink: "md:group-hover:text-white",
  },
  {
    title: "Automations",
    desc: "Lead capture, onboarding, CRM updates and reporting that run themselves.",
    href: "/services/automation",
    color: "#FFCB41",
    ink: "md:group-hover:text-black",
  },
  {
    title: "AI agents",
    desc: "Support bots, knowledge bots and assistants that answer from your data and act in your tools.",
    href: "/services/ai-agents",
    color: "#0015D4",
    ink: "md:group-hover:text-white",
  },
  {
    title: "MCP servers and integrations",
    desc: "Give Claude safe, scoped access to your CRM, database or website.",
    href: "/services/mcp",
    color: "#FF8FCA",
    ink: "md:group-hover:text-black",
  },
  {
    title: "Claude for your team",
    desc: "Claude and Claude Code set up around how your team works, with the guardrails in place.",
    href: "/services/claude-code",
    color: "#84DEF9",
    ink: "md:group-hover:text-black",
  },
];

export function ClaudeFullStack() {
  return (
    <section id="claude-code" className="section-y relative border-t border-black/10 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* The longer pitch lives here, under the first screen: the problem,
            what I build about it, and who is speaking. */}
        <div className="grid gap-x-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
          <SectionHeader
            num="05"
            label="Claude Code"
            title={
              <>
                Claude Code, <span className="whitespace-nowrap font-editorial font-normal text-cobalt">full stack</span>.
              </>
            }
            lead="Claude Code is how I build everything on this page. One builder, five kinds of system, all delivered in your own accounts with docs and a walkthrough video."
            className="max-lg:!mb-8"
          />
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <p className="text-lg font-semibold leading-snug text-black md:text-xl">
              Leads going cold, hours lost to admin, tools that don't talk to each other. I fix the problems quietly
              costing your business time and revenue.
            </p>
            <p className="mt-3 type-small text-ink-body md:text-base md:leading-relaxed">
              I design and build websites, apps and AI-powered automations that capture every enquiry, follow up in
              minutes and take repetitive work off your team, built with Claude Code, n8n and Make.com. Everything is
              delivered in your own accounts, fully documented and built to keep running long after handover.
            </p>
            <p className="mt-5 flex items-center gap-3 type-label text-ink-label">
              <img
                src={profilePicSmall}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                className="h-9 w-9 shrink-0 rounded-full object-cover object-top"
              />
              <span>
                Denver <span className="text-green-text">Emerald</span> Peter · Founder, Denver NoCode
              </span>
            </p>
          </Reveal>
        </div>

        <ul className="border-b-2 border-black">
          {LANES.map((l, i) => (
            <li key={l.href + l.title} className="border-t-2 border-black">
              <Reveal delay={i * 0.03}>
                <a href={l.href} className="group relative block overflow-hidden" data-cursor="hover">
                  {/* Colour flood on hover. Desktop only: phones have no hover. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 hidden origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 md:block"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-5 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-8 md:px-4 md:py-9">
                    <span className={`font-mono text-sm font-bold text-ink-label transition-colors ${l.ink}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={`block font-display text-2xl font-extrabold tracking-tight text-black transition-colors md:text-4xl ${l.ink}`}>
                        {l.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-body md:hidden">{l.desc}</span>
                    </span>
                    <span className={`hidden leading-relaxed text-ink-body transition-colors md:block ${l.ink}`}>
                      {l.desc}
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-transform duration-300 md:group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-1 text-sm font-semibold">
            <a href="/services" className="tap inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              All services <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="/films" className="tap inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              Watch the build films <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="/industries" className="tap inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              Built for your industry <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
