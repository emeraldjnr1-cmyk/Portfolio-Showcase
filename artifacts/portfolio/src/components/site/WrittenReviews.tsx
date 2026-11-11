import { Reveal } from "@/components/fx/SplitWords";
import { writtenReviews } from "@/data/portfolio";

/**
 * Reviews a client sent in writing. Sits right under the video stories so the
 * proof section reads as one block: faces on camera first, then the words of
 * a client who put it in writing. Each review is quoted exactly as the client
 * wrote it; the only edit is the full stop at the end.
 */
export function WrittenReviews() {
  return (
    <section aria-label="Written client reviews" className="px-6 pb-28 md:px-12 md:pb-40">
      <div className="mx-auto max-w-6xl space-y-8">
        {writtenReviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <figure className="relative overflow-hidden rounded-3xl border-2 border-black bg-black text-white shadow-2xl">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/30 blur-3xl md:h-72 md:w-72"
              />
              <div className="grid gap-8 p-7 md:grid-cols-[260px_1fr] md:gap-12 md:p-12">
                <div className="mx-auto w-44 md:mx-0 md:w-full">
                  <img
                    src={r.photo}
                    alt={`${r.name}, ${r.role}`}
                    width={440}
                    height={558}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-2xl object-cover object-top ring-4 ring-primary"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <span className="font-mono text-sm font-semibold text-primary-foreground/70">
                    In writing · {r.project}
                  </span>
                  <blockquote className="mt-6">
                    <span
                      aria-hidden
                      className="block h-8 select-none font-editorial text-7xl leading-[0.55] text-primary md:h-10 md:text-8xl"
                    >
                      “
                    </span>
                    <p className="mt-3 font-editorial text-xl leading-relaxed text-white/90 md:text-2xl md:leading-relaxed">
                      {r.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-7 border-t border-white/15 pt-5">
                    <span className="block font-display text-base font-extrabold uppercase tracking-widest text-white">
                      {r.name}
                    </span>
                    <span className="mt-1 block text-sm text-white/60">
                      {r.role} · {r.when}
                    </span>
                  </figcaption>
                </div>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
