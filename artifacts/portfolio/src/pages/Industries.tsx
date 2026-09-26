import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import NotFound from "@/pages/not-found";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { industries, industryBySlug, PROOF_LABEL, SIZES } from "@/data/industries";
import { serviceBySlug } from "@/data/services";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white";

export function SizeStrip() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {SIZES.map((s, i) => (
        <li key={s.title} className="border-t-2 border-black pt-6">
          <span className="font-mono text-sm font-bold text-black/30">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-xl font-bold text-black">{s.title}</h3>
          <p className="mt-2 leading-relaxed text-black/55">{s.desc}</p>
        </li>
      ))}
    </ul>
  );
}

// ──────────────────────────── /industries ────────────────────────────
export function IndustriesIndex() {
  return (
    <PageShell cta="Your industry not listed?">
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Industries", "/industries"]]} />
          <div className="mt-8">
            <AccentHeading before="Built for your " accent="industry" after="." color="#F32317" />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">
            The tools are the same everywhere. The bottlenecks are not. Each page covers what slows that industry down,
            what I build for it, and the work behind it.
          </p>
          <div className="mt-10">
            <StartButtons />
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-card px-6 py-20 md:px-12 md:py-28">
        <ul className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <li key={ind.slug}>
              <IndustryCard slug={ind.slug} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-black/10 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-black md:text-5xl">
            Any <span className="font-editorial font-normal text-primary">size</span>.
          </h2>
          <div className="mt-10">
            <SizeStrip />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function IndustryCard({ slug, index }: { slug: string; index: number }) {
  const ind = industryBySlug(slug)!;
  return (
    <a
      href={`/industries/${ind.slug}`}
      style={{ "--accent": ind.accent } as CSSProperties}
      className="group flex h-full flex-col rounded-2xl border-2 border-black bg-white p-6 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--accent)]"
      data-cursor="hover"
    >
      <span className="flex items-center justify-between">
        <span className="font-mono text-sm font-bold" style={{ color: ind.accent }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight className="h-5 w-5 text-black/30 transition-colors group-hover:text-[var(--accent)]" />
      </span>
      <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-black">{ind.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-black/55">{ind.short}</p>
    </a>
  );
}

// ───────────────────────── /industries/:slug ─────────────────────────
export function IndustryPage({ slug }: { slug: string }) {
  const ind = industryBySlug(slug);
  if (!ind) return <NotFound />;
  const accentVar = { "--accent": ind.accent } as CSSProperties;
  const fits = ind.services.map(serviceBySlug).filter((s): s is NonNullable<typeof s> => s !== undefined);
  const others = industries.filter((o) => o.slug !== ind.slug);

  return (
    <PageShell>
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Industries", "/industries"], [ind.name, `/industries/${ind.slug}`]]} />
          <p className="mt-8 font-mono text-sm font-semibold" style={{ color: ind.accent }}>
            For {ind.name.toLowerCase()}
          </p>
          <div className="mt-4 max-w-5xl">
            <AccentHeading {...ind.h1} color={ind.accent} />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">{ind.lead}</p>
          <div className="mt-10">
            <StartButtons />
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="bg-black px-6 py-24 text-[#E7E7E1] md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Sound <span className="font-editorial font-normal" style={{ color: ind.accent === "#0015D4" ? "#84DEF9" : ind.accent }}>familiar</span>?
          </h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {ind.pains.map((p, i) => (
              <li key={p} className="border-t border-white/20 pt-6">
                <span className="font-mono text-sm font-bold text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-editorial text-xl leading-snug text-white md:text-2xl">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What I build */}
      <section className="bg-card px-6 py-24 md:px-12 md:py-32" style={accentVar}>
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl">
            What I <span className="font-editorial font-normal" style={{ color: ind.accent }}>build</span>.
          </h2>
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {ind.builds.map((b, i) => (
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

      {/* Proof */}
      <section className="border-t border-black/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
              The <span className="font-editorial font-normal" style={{ color: ind.accent }}>work</span>.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-black/55">
              Client builds are described without names. Example systems are labelled as examples.
            </p>
          </div>
          <ul className="space-y-6">
            {ind.proof.map((p) => {
              const body = (
                <>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/55">{PROOF_LABEL[p.kind]}</p>
                  <p className="mt-3 font-display text-lg font-bold leading-snug text-black md:text-xl">{p.text}</p>
                  {p.href && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-black group-hover:text-primary">
                      See it <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </>
              );
              const cls = `block rounded-2xl border-2 border-black p-7 ${
                p.kind === "client" ? "bg-[#FFCB41] shadow-[6px_6px_0_#141414]" : p.kind === "example" ? "border-dashed bg-white" : "bg-white"
              }`;
              return (
                <li key={p.text}>
                  {p.href ? (
                    <a href={p.href} className={`group ${cls} transition-transform hover:-translate-y-0.5`}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Services that fit, and other industries */}
      <section className="border-t border-black/10 bg-card px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Services that fit</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {fits.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`} className={pill}>
                    {s.name} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">Other industries</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={`/industries/${o.slug}`} className="text-sm font-semibold text-black/60 underline-offset-4 transition-colors hover:text-primary hover:underline">
                    {o.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
