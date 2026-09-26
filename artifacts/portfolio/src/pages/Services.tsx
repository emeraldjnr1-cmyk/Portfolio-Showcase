import type { CSSProperties } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import NotFound from "@/pages/not-found";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { services, serviceBySlug } from "@/data/services";
import { filmsFor } from "@/data/films";
import { FilmGrid } from "@/components/site/Films";

const STEPS = [
  { n: "01", title: "Tell me your workflow", desc: "We map the manual process, find the bottleneck and agree what done looks like." },
  { n: "02", title: "I build your system", desc: "Built in your accounts with Claude Code and the right tool for the job, tested end to end." },
  { n: "03", title: "You own it", desc: "Handover with a walkthrough video and plain docs. You can run it, change it and scale it." },
];

// ───────────────────────────── /services ─────────────────────────────
export function ServicesIndex() {
  return (
    <PageShell cta="Not sure which one you need?">
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Services", "/services"]]} />
          <div className="mt-8">
            <AccentHeading before="What I " accent="build" after="." color="#0015D4" />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">
            Claude Code sits under everything: it is how I design, write and test each system. The tool on top changes
            with the job, from a React app to an n8n workflow to a Solidity contract.
          </p>
          <div className="mt-10">
            <StartButtons />
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-card px-6 py-20 md:px-12 md:py-28">
        <ul className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`/services/${s.slug}`}
                style={{ "--accent": s.accent } as CSSProperties}
                className="group flex h-full flex-col rounded-2xl border-2 border-black bg-white p-7 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--accent)]"
              >
                <span className="font-mono text-sm font-bold" style={{ color: s.accent }}>
                  {s.num}
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-black">{s.name}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-black/60">{s.short}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-black group-hover:text-[var(--accent)]">
                  See the service <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

// ─────────────────────────── /services/:slug ──────────────────────────
export function ServicePage({ slug }: { slug: string }) {
  const s = serviceBySlug(slug);
  if (!s) return <NotFound />;
  const others = services.filter((o) => o.slug !== s.slug);
  const serviceFilms = filmsFor(s.slug);
  const accentVar = { "--accent": s.accent } as CSSProperties;

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Services", "/services"], [s.name, `/services/${s.slug}`]]} />
          <p className="mt-8 font-mono text-sm font-semibold" style={{ color: s.accent }}>
            Service {s.num}
          </p>
          <div className="mt-4 max-w-5xl">
            <AccentHeading {...s.h1} color={s.accent} />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">{s.lead}</p>
          <div className="mt-10">
            <StartButtons />
          </div>
          <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tools">
            {s.tools.map((t) => (
              <li key={t} className="rounded-full border border-black/15 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-black/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What I build */}
      <section className="border-t border-black/10 bg-card px-6 py-24 md:px-12 md:py-32" style={accentVar}>
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl">
            What I <span className="font-editorial font-normal" style={{ color: s.accent }}>build</span>.
          </h2>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {s.builds.map((b, i) => (
              <li
                key={b.title}
                className="rounded-2xl border-2 border-black bg-white p-7 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--accent)]"
              >
                <span className="font-mono text-sm font-bold text-black/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-black">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-black/60">{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Build films for this service, when there are any */}
      {serviceFilms.length > 0 && (
        <section className="border-t border-black/10 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl">
                Watch it <span className="font-editorial font-normal" style={{ color: s.accent }}>work</span>.
              </h2>
              <a href="/films" className="inline-flex items-center gap-1.5 text-sm font-bold text-black transition-colors hover:text-primary">
                All build films <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <FilmGrid films={serviceFilms} />
          </div>
        </section>
      )}

      {/* Proof */}
      <section className="border-t border-black/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
              Proof, not <span className="font-editorial font-normal" style={{ color: s.accent }}>promises</span>.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-black/55">
              Real builds you can open and inspect. Every system ships with docs and a walkthrough video.
            </p>
          </div>
          <div>
            {s.example && (
              <div className="mb-8 rounded-2xl border-2 border-black bg-[#FFCB41] p-7 shadow-[6px_6px_0_#141414]">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">Delivered and live</p>
                <p className="mt-3 font-display text-xl font-bold leading-snug text-black">{s.example}</p>
              </div>
            )}
            <ul className="border-t border-black/15">
              {s.proof.map((p) => (
                <li key={p.href} className="border-b border-black/15">
                  <a href={p.href} className="group flex items-center gap-5 py-6">
                    <span className="flex-1">
                      <span className="block font-display text-lg font-bold text-black transition-colors group-hover:text-primary md:text-xl">
                        {p.label}
                      </span>
                      <span className="mt-1 block text-sm text-black/50">{p.note}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-black/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-black/10 bg-card px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
            Three steps. No surprises.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((st) => (
              <li key={st.n} className="border-t-2 pt-8" style={{ borderColor: s.accent }}>
                <span className="font-display text-6xl font-extrabold text-stroke">{st.n}</span>
                <h3 className="mt-6 font-display text-2xl font-bold text-black">{st.title}</h3>
                <p className="mt-3 leading-relaxed text-black/55">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ: native details, so every answer is in the HTML */}
      <section className="border-t border-black/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
            Good <span className="font-editorial font-normal" style={{ color: s.accent }}>questions</span>.
          </h2>
          <div className="border-t border-black/15">
            {s.faqs.map((f, i) => (
              <details key={f.q} className="group border-b border-black/15" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm text-black/35 group-open:text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-lg font-bold text-black group-open:text-primary md:text-xl">{f.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black/25 transition-transform duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-white">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="max-w-xl pb-7 pl-10 font-editorial text-lg leading-relaxed text-black/65 md:pl-12">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-black/10 bg-card px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Also available</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <a
                  href={`/services/${o.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
                >
                  {o.name} <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
