import { ArrowUpRight, ArrowRight } from "lucide-react";
import NotFound from "@/pages/not-found";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { TAG_STYLE } from "@/data/portfolio";
import { work, workBySlug } from "@/data/work";
import { serviceBySlug } from "@/data/services";

// ─────────────────────────────── /work ───────────────────────────────
export function WorkIndex() {
  return (
    <PageShell>
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Work", "/work"]]} />
          <div className="mt-8">
            <AccentHeading before="Systems that " accent="run" after=" businesses." color="#F32317" />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">
            The flagship AI agent and automation builds, each broken down step by step. Web builds and Web3 projects
            live in their own galleries.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#websites" className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white">
              Web builds gallery <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/#web3" className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white">
              Web3 gallery <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-card px-6 py-20 md:px-12 md:py-28">
        <ul className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {work.map((w, i) => (
            <li key={w.slug}>
              <a href={`/work/${w.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border-2 border-black bg-white transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#0015D4]">
                  <img
                    src={w.poster ?? w.img}
                    alt={`${w.title} workflow`}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TAG_STYLE[w.tag].chip}`}>
                      {w.tag}
                    </span>
                    <h2 className="mt-3 font-display text-xl font-bold text-black transition-colors group-hover:text-primary">{w.title}</h2>
                    <p className="mt-1.5 text-sm text-black/55">{w.stat}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-black/30 transition-colors group-hover:text-primary" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

// ──────────────────────────── /work/:slug ────────────────────────────
export function WorkPage({ slug }: { slug: string }) {
  const w = workBySlug(slug);
  if (!w) return <NotFound />;
  const service = serviceBySlug(w.service);
  const next = work[(work.indexOf(w) + 1) % work.length];
  const [name, subtitle] = w.title.split(": ");

  return (
    <PageShell>
      <section className="px-6 pb-16 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Work", "/work"], [name, `/work/${w.slug}`]]} />
          <span className={`mt-8 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_STYLE[w.tag].chip}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${TAG_STYLE[w.tag].dot}`} />
            {w.tag}
          </span>
          <div className="mt-5 max-w-5xl">
            {/* The subtitle, or failing that the last word, takes the italic accent. */}
            {subtitle ? (
              <AccentHeading before={`${name}: `} accent={subtitle} after="" color="#0015D4" />
            ) : (
              <AccentHeading
                before={w.title.slice(0, w.title.lastIndexOf(" ") + 1)}
                accent={w.title.slice(w.title.lastIndexOf(" ") + 1)}
                after="."
                color="#0015D4"
              />
            )}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">{w.desc}</p>
            <div className="rounded-2xl border-2 border-black bg-[#FFCB41] p-6 shadow-[6px_6px_0_#141414]">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">The result</p>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight text-black">{w.stat}</p>
              <p className="mt-1 text-sm text-black/70">{w.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border-2 border-black bg-black shadow-[10px_10px_0_#0015D4]">
          {w.video ? (
            <video
              src={w.video}
              poster={w.poster}
              className="aspect-video w-full"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${w.title} film`}
            />
          ) : (
            <img src={w.img} alt={`${w.title} workflow`} className="w-full bg-white" />
          )}
        </div>
      </section>

      <section className="border-t border-black/10 bg-card px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
              How it <span className="font-editorial font-normal text-primary">works</span>.
            </h2>
            <ol className="mt-10 border-t border-black/15">
              {w.steps.map((step, i) => (
                <li key={i} className="flex gap-5 border-b border-black/15 py-6">
                  <span className="font-mono text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg leading-relaxed text-black/75">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Stack</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {w.tools.map((t) => (
                  <li key={t} className="rounded-md border border-black/15 bg-white px-3 py-1.5 text-sm font-medium text-black/70">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {w.quote && (
              <figure className="rounded-2xl border-2 border-black bg-white p-7">
                <blockquote className="font-editorial text-xl leading-snug text-black">"{w.quote}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-black/60">{w.testimonial}, client</figcaption>
              </figure>
            )}
            {service && (
              <a href={`/services/${service.slug}`} className="group block rounded-2xl border-2 border-black bg-white p-7 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0015D4]">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Service</p>
                <p className="mt-2 font-display text-xl font-bold text-black group-hover:text-primary">{service.name}</p>
                <p className="mt-1.5 text-sm text-black/55">{service.short}</p>
              </a>
            )}
            <StartButtons />
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-6 py-16 md:px-12">
        <a href={`/work/${next.slug}`} className="group mx-auto flex max-w-7xl items-center justify-between gap-6">
          <span>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Next system</span>
            <span className="mt-2 block font-display text-2xl font-extrabold tracking-tight text-black transition-colors group-hover:text-primary md:text-4xl">
              {next.title}
            </span>
          </span>
          <ArrowRight className="h-8 w-8 shrink-0 text-black/30 transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </a>
      </section>
    </PageShell>
  );
}
