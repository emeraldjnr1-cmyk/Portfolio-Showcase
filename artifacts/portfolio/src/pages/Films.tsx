import { ArrowUpRight } from "lucide-react";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { FilmGrid } from "@/components/site/Films";
import { films, FILM_GROUPS, filmsFor } from "@/data/films";

export function FilmsPage() {
  return (
    <PageShell cta="Want one of these for your business?">
      <section className="px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Build films", "/films"]]} />
          <div className="mt-8">
            <AccentHeading before="Watch the " accent="builds" after="." color="#0015D4" />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">
            {films.length} short films showing how the systems work, from the problem to the run to the result. Each
            one is under a minute.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-black/45">
            The films use sample data, so the figures on screen illustrate how a system behaves. They are not client
            results.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {FILM_GROUPS.map((g) => (
              <li key={g.service}>
                <a
                  href={`#${g.service}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
                >
                  {g.label}
                  <span className="rounded-full bg-black/10 px-2 py-0.5 font-mono text-xs">{filmsFor(g.service).length}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {FILM_GROUPS.map((g, i) => (
        <section
          key={g.service}
          id={g.service}
          className={`scroll-mt-24 border-t border-black/10 px-6 py-20 md:px-12 md:py-28 ${i % 2 === 0 ? "bg-card" : ""}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-black md:text-5xl">{g.label}</h2>
              <a href={`/services/${g.service}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-black transition-colors hover:text-primary">
                See the service <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <FilmGrid films={filmsFor(g.service)} />
          </div>
        </section>
      ))}

      <section className="border-t border-black/10 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <StartButtons />
        </div>
      </section>
    </PageShell>
  );
}
