import { ArrowUpRight } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { IndustryCard, SizeStrip } from "@/pages/Industries";
import { industries } from "@/data/industries";

export function IndustriesSection() {
  return (
    <section id="industries" className="relative border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-20">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">04 — Industries</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Built for your industry."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg text-black/55">
              The tools are the same everywhere. The bottlenecks are not. Pick yours to see what I build for it and the
              work behind it.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <li key={ind.slug}>
              <IndustryCard slug={ind.slug} index={i} />
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <p className="mb-8 font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Any size of business</p>
          <SizeStrip />
        </div>

        <a href="/industries" className="mt-12 inline-flex items-center gap-1.5 text-sm font-bold text-black transition-colors hover:text-primary">
          All industries <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
