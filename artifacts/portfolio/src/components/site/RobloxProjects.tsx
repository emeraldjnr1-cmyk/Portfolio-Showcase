import { ArrowUpRight } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { robloxProjects, type WebProject } from "@/data/portfolio";
import { FeatureRow, CompactCard } from "@/components/site/WebProjects";

function PlayLink({ project, className = "" }: { project: WebProject; className?: string }) {
  if (!project.href) return null;
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm font-bold text-black transition-colors hover:text-primary ${className}`}
    >
      Play {project.name} on Roblox <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export function RobloxProjectsSection() {
  if (robloxProjects.length === 0) return null;
  const stacked = robloxProjects.length < 4;
  const [lead, ...grid] = robloxProjects;

  return (
    <section id="roblox" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:mb-28">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">The Roblox gallery</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Published games you can open and play."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg text-black/55">
              Obbies, horror, simulators and roleplay, built in Roblox Studio and Luau and live on Roblox.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-black/45">
              <span className="h-2 w-2 bg-[#F32317]" aria-hidden />
              Every game here is published on Roblox. Open it, play it, judge it yourself.
            </p>
          </Reveal>
        </div>

        {stacked ? (
          <div className="space-y-24 md:space-y-32">
            {robloxProjects.map((p, i) => (
              <div key={p.slug}>
                <FeatureRow project={p} index={i} />
                <PlayLink project={p} className="mt-10" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div>
              <FeatureRow project={lead} index={0} />
              <PlayLink project={lead} className="mt-10" />
            </div>
            <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-32">
              {grid.map((p, i) => (
                <div key={p.slug}>
                  <CompactCard project={p} index={i} />
                  <PlayLink project={p} className="mt-3" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
