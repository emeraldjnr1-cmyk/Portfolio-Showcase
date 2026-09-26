import { ArrowUpRight } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";

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
    <section id="claude-code" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
          <div>
            <Reveal>
              <span className="font-mono text-sm font-semibold text-primary">01 — Claude Code</span>
            </Reveal>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-black md:text-7xl">
              Claude Code, <span className="whitespace-nowrap font-editorial font-normal text-primary">full stack</span>.
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-black/55">
              Claude Code is how I build everything on this page. One builder, five kinds of system, all delivered in
              your own accounts with docs and a walkthrough video.
            </p>
          </Reveal>
        </div>

        <ul className="border-b-2 border-black">
          {LANES.map((l, i) => (
            <li key={l.href + l.title} className="border-t-2 border-black">
              <Reveal delay={i * 0.06} y={24}>
                <a href={l.href} className="group relative block overflow-hidden" data-cursor="hover">
                  {/* Colour flood on hover. Desktop only: phones have no hover. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 hidden origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 md:block"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 py-7 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-8 md:px-4 md:py-9">
                    <span className={`font-mono text-sm font-bold text-black/35 transition-colors ${l.ink}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={`block font-display text-2xl font-extrabold tracking-tight text-black transition-colors md:text-4xl ${l.ink}`}>
                        {l.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-black/55 md:hidden">{l.desc}</span>
                    </span>
                    <span className={`hidden leading-relaxed text-black/55 transition-colors md:block ${l.ink}`}>
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
            <a href="/services" className="inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              All services <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/films" className="inline-flex items-center gap-1.5 text-black transition-colors hover:text-primary">
              Watch the build films <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#websites" className="inline-flex items-center gap-1.5 text-black/55 transition-colors hover:text-primary">
              See the builds below
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
