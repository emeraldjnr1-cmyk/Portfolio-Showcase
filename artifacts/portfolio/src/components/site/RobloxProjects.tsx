import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { robloxProjects } from "@/data/portfolio";
import { FeatureRow, CompactCard } from "@/components/site/WebProjects";

/** Groups the demos by the genre named in `kind` ("Concept demo: <genre>"), in first-seen order. */
function groups() {
  const map = new Map<string, typeof robloxProjects>();
  for (const p of robloxProjects) {
    const genre = p.kind.replace(/^Concept demo:\s*/, "");
    const list = map.get(genre) ?? [];
    list.push(p);
    map.set(genre, list);
  }
  return [...map.entries()];
}

export function RobloxProjectsSection() {
  if (robloxProjects.length === 0) return null;
  const byGenre = groups();

  return (
    <section id="roblox" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:mb-28">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">The Roblox gallery</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Five game types, each shown in motion."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg text-black/55">
              The core loop of each game type, played through four ways, so you can see the pacing before anything is
              built for you.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-black/45">
              <span className="h-2 w-2 bg-[#F32317]" aria-hidden />
              Concept demos made for this page, not published games. Client games ship in the client's own Roblox group.
            </p>
          </Reveal>
        </div>

        <div className="space-y-32 md:space-y-44">
          {byGenre.map(([genre, items], gi) => {
            const [lead, ...rest] = items;
            return (
              <div key={genre}>
                <Reveal>
                  <div className="mb-12 flex items-baseline gap-4 md:mb-16">
                    <span className="font-mono text-sm font-semibold text-primary">0{gi + 1}</span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-black md:text-3xl">{genre}</h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-black/40">{items.length} demos</span>
                  </div>
                </Reveal>
                <FeatureRow project={lead} index={gi} />
                {rest.length > 0 && (
                  <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
                    {rest.map((p, i) => (
                      <CompactCard key={p.slug} project={p} index={i} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
