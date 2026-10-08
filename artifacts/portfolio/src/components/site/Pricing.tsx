import { ArrowUpRight, Check } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { OnboardingModal } from "@/components/site/OnboardingModal";
import { packages, usd } from "@/data/pricing";

const STEPS = ["Tell me what eats your week", "Fixed quote within 24 hours", "Built and tested in milestones", "Handover with video and docs"];

/** Starting prices for typical projects. Buyers leave sites that hide every
 * price, so the common cases are shown and the fixed quote does the rest. */
export function Pricing({ num = "06" }: { num?: string }) {
  return (
    <section id="pricing" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
          <div>
            <Reveal>
              <span className="font-mono text-sm font-semibold text-primary">{num} — Pricing</span>
            </Reveal>
            <SplitWords
              as="h2"
              text="Typical projects, honest starting prices."
              className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-black/55">
              Every project gets its own fixed quote within 24 hours, so you know the full price before anything starts.
              These are where typical projects begin.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                className={`group flex h-full flex-col rounded-2xl border-2 border-black p-7 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#141414] ${
                  p.featured ? "bg-black text-[#E7E7E1]" : "bg-white text-black"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className={`font-display text-xl font-extrabold tracking-tight ${p.featured ? "text-white" : "text-black"}`}>{p.name}</span>
                  {p.featured && (
                    <span className="shrink-0 rounded-full bg-[#FFCB41] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                      Most asked
                    </span>
                  )}
                </span>
                <span className="mt-5 flex items-baseline gap-2">
                  <span className={`text-sm font-semibold ${p.featured ? "text-white/55" : "text-black/50"}`}>From</span>
                  <span className={`font-display text-5xl font-extrabold tracking-tight ${p.featured ? "text-white" : "text-black"}`}>{usd(p.from)}</span>
                </span>
                <span className={`mt-1 font-mono text-xs font-semibold uppercase tracking-widest ${p.featured ? "text-[#84DEF9]" : "text-primary"}`}>
                  {p.timeline}
                </span>
                <span className={`mt-5 block leading-relaxed ${p.featured ? "text-white/70" : "text-black/60"}`}>{p.what}</span>
                <span className="mt-5 flex-1 space-y-2">
                  {p.includes.map((i) => (
                    <span key={i} className={`flex items-start gap-2 text-sm ${p.featured ? "text-white/80" : "text-black/75"}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-[#0BB07B]" : "text-[#00795A]"}`} />
                      {i}
                    </span>
                  ))}
                </span>
                <span className={`mt-7 inline-flex items-center gap-1.5 text-sm font-bold ${p.featured ? "text-white" : "text-black"} group-hover:underline`}>
                  What's included <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
          <li>
            <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-dashed border-black/30 p-7">
              <div>
                <span className="font-display text-xl font-extrabold tracking-tight text-black">Something else?</span>
                <p className="mt-3 leading-relaxed text-black/60">
                  Roblox games, Web3, MCP servers, rescues of half-built projects. Describe it and you get a plan and a
                  fixed price within 24 hours.
                </p>
              </div>
              <div className="mt-7">
                <OnboardingModal
                  trigger={
                    <button className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-display text-[15px] font-bold text-white transition-colors duration-200 hover:bg-black">
                      Get a fixed quote <ArrowUpRight className="h-4 w-4" />
                    </button>
                  }
                />
              </div>
            </div>
          </li>
        </ul>

        <ol className="mt-14 grid gap-4 border-t border-black/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-base font-bold text-black">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-black/45">Prices in US dollars. Larger builds are paid in milestones, each approved before the next begins.</p>
      </div>
    </section>
  );
}
