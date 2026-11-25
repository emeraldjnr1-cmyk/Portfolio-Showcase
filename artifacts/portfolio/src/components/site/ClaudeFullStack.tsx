import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/SplitWords";
import { SectionHeader } from "@/components/site/SectionHeader";
import { industries } from "@/data/industries";

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
        <SectionHeader
          num="01"
          label="Claude Code"
          title={
            <>
              Claude Code, <span className="whitespace-nowrap font-editorial font-normal text-cobalt">full stack</span>.
            </>
          }
          lead="Claude Code is how I build everything on this page. One builder, five kinds of system, all delivered in your own accounts with docs and a walkthrough video."
        />

        <ul className="border-b-2 border-black">
          {LANES.map((l, i) => (
            <li key={l.href + l.title} className="border-t-2 border-black">
              <Reveal delay={i * 0.06} y={24}>
                <a href={l.href} className="group relative block overflow-hidden" data-cursor="hover">
                  {/* Colour flood on hover. Desktop only: phones have no hover. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 hidden origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 md:block"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 py-7 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-8 md:px-4 md:py-9">
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold">
            <a href="/services" className="tap inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              All services <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/films" className="tap inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              Watch the build films <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#websites" className="tap inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              See the builds below
            </a>
          </div>
        </Reveal>

        {/* The industries grid lives on /industries now; this row keeps every
            industry page one click from home. */}
        <Reveal delay={0.25}>
          <div className="mt-14 border-t border-black/10 pt-8">
            <p className="type-label text-ink-label">Built for your industry</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <a
                    href={`/industries/${ind.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-black/20 bg-white/70 px-4 text-sm font-medium text-ink transition-colors duration-150 hover:border-black hover:bg-black hover:text-white md:min-h-9"
                  >
                    {ind.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
