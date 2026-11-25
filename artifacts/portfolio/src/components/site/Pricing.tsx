import { ArrowUpRight, Check } from "lucide-react";
import { CtaPair } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { SectionHeader } from "@/components/site/SectionHeader";
import { packages, usd } from "@/data/pricing";

const STEPS = ["Tell me what eats your week", "Fixed quote within 24 hours", "Built and tested in milestones", "Handover with video and docs"];

/** Starting prices for typical projects. Buyers leave sites that hide every
 * price, so the common cases are shown and the fixed quote does the rest. */
export function Pricing({ num = "06" }: { num?: string }) {
  return (
    <section id="pricing" className="section-y relative border-t border-black/10 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          num={num}
          label="Hire me"
          title="Typical projects, honest starting prices."
          lead="Every project gets its own fixed quote within 24 hours, so you know the full price before anything starts. These are where typical projects begin."
        />

        {/* Phone: one swipe row. Each card snaps into place with the next one
            peeking in from the right, and the row ends with "Something else?".
            From tablet up it is a grid: six packages in even rows, then
            "Something else?" across the full width. The row scrolls natively
            (scroll snap), so the browser's own momentum does the work. */}
        <ul
          data-chat-clear
          aria-label="Typical projects"
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-6 px-6 pb-1 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {packages.map((p) => (
            <li key={p.name} className="w-[82%] max-w-[21rem] shrink-0 snap-start md:w-auto md:max-w-none">
              <Card
                href={p.href}
                aria-label={`${p.name}, from ${usd(p.from)}. See the service`}
                tone={p.featured ? "ink" : "white"}
                shadow={p.featured ? "#0015D4" : undefined}
                className="group flex h-full flex-col"
              >
                <span className="flex items-start justify-between gap-3">
                  <h3 className={`type-h3 ${p.featured ? "text-white" : "text-ink"}`}>{p.name}</h3>
                  {p.featured && (
                    <span className="shrink-0 rounded-full bg-gold px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                      Most asked
                    </span>
                  )}
                </span>
                <span className="mt-5 flex items-baseline gap-2">
                  <span className={`text-sm font-semibold ${p.featured ? "text-on-dark-label" : "text-ink-label"}`}>From</span>
                  <span className={`font-display text-5xl font-extrabold tracking-tight ${p.featured ? "text-white" : "text-black"}`}>{usd(p.from)}</span>
                </span>
                <span className={`mt-1 type-label ${p.featured ? "text-sky" : "text-cobalt"}`}>
                  {p.timeline}
                </span>
                <span className={`mt-5 block leading-relaxed ${p.featured ? "text-on-dark-body" : "text-ink-body"}`}>{p.what}</span>
                <span className="mt-5 flex-1 space-y-2">
                  {p.includes.map((i) => (
                    <span key={i} className={`flex items-start gap-2 text-sm ${p.featured ? "text-on-dark-body" : "text-ink-body"}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-green" : "text-green-text"}`} aria-hidden />
                      {i}
                    </span>
                  ))}
                </span>
                <span className={`mt-7 inline-flex items-center gap-1.5 text-sm font-bold ${p.featured ? "text-white" : "text-black"} group-hover:underline`}>
                  See the service <ArrowUpRight className="h-4 w-4" />
                </span>
              </Card>
            </li>
          ))}
          <li className="w-[82%] max-w-[21rem] shrink-0 snap-start md:col-span-2 md:w-auto md:max-w-none lg:col-span-3">
            <div className="flex h-full flex-col justify-between gap-7 rounded-2xl border-2 border-dashed border-ink/40 p-6 md:flex-row md:items-center md:gap-12 md:p-8">
              <div className="md:max-w-xl">
                <h3 className="type-h3 text-ink">Something else?</h3>
                <p className="mt-3 leading-relaxed text-ink-body">
                  Web3, MCP servers, rescues of half-built projects. Describe it and you get a plan and a fixed price
                  within 24 hours.
                </p>
              </div>
              <CtaPair stack className="md:w-80 md:shrink-0" />
            </div>
          </li>
        </ul>
        <p className="mt-4 type-small text-ink-label md:hidden" aria-hidden>
          Swipe to see all seven
        </p>

        <ol className="mt-10 grid gap-4 border-t border-black/15 pt-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-base font-bold text-black">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink-label">Prices in US dollars. Larger builds are paid in milestones, each approved before the next begins.</p>
      </div>
    </section>
  );
}
