import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/SplitWords";
import { TeamGrid, TeamName } from "@/components/site/TeamGrid";

export function TeamSection() {
  return (
    <section id="team" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 md:mb-20 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
          <div>
            <Reveal>
              <span className="font-mono text-sm font-semibold text-primary">07 — Team</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl">
                <TeamName />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-black/55">
              I lead every project and stay your one point of contact. When a build needs video, design or game
              development, these are the people I bring in.
            </p>
          </Reveal>
        </div>

        <TeamGrid />

        <a href="/team" className="mt-12 inline-flex items-center gap-1.5 text-sm font-bold text-black transition-colors hover:text-primary">
          Meet the team <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
