import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, ArrowRight, Pause, Play } from "lucide-react";
import NotFound from "@/pages/not-found";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { cardClass } from "@/components/site/Card";
import { TAG_STYLE } from "@/data/portfolio";
import { work, workBySlug } from "@/data/work";
import { serviceBySlug } from "@/data/services";
import { categories, totalWork, type Category, type CategoryId, type Tile } from "@/data/showcase";

// ─────────────────────────────── /work ───────────────────────────────
// Everything on one page, grouped by kind. The filter chips are plain anchor
// links, so without JavaScript they jump to a section and every section stays
// visible. With JavaScript they show one section at a time.

type Filter = "all" | CategoryId;
const isCategory = (v: string): v is CategoryId => categories.some((c) => c.id === v);

/** Only one tile preview plays at a time: starting one stops the last. */
let stopPlaying: (() => void) | null = null;

const EXAMPLE_CHIP = "pointer-events-none absolute bottom-3 left-3 rounded-md bg-ink/85 px-2 py-1 font-mono text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-white";

function Cover({ tile, lead, eager }: { tile: Tile; lead: boolean; eager: boolean }) {
  return (
    <img
      src={`${tile.cover}-960.webp`}
      srcSet={`${tile.cover}-480.webp 480w, ${tile.cover}-960.webp 960w`}
      sizes={lead ? "(min-width: 1024px) 580px, (min-width: 640px) 46vw, 92vw" : "(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"}
      width={960}
      height={540}
      alt=""
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager && lead ? "high" : undefined}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
  );
}

function WorkTile({ tile, lead, eager }: { tile: Tile; lead: boolean; eager: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const stop = () => {
    setPlaying(false);
    setReady(false);
  };
  const start = () => {
    if (!tile.video || playing) return;
    stopPlaying?.();
    stopPlaying = stop;
    setPlaying(true);
  };
  // Hover plays the preview only where there is a real pointer and motion is welcome.
  const onEnter = () => {
    if (!tile.video) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    start();
  };
  const onLeave = () => {
    if (playing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) stop();
  };
  useEffect(
    () => () => {
      if (stopPlaying === stop) stopPlaying = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <li className={`relative ${lead ? "lg:col-span-3" : "lg:col-span-2"}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <a href={tile.href} className="group block rounded-2xl" data-cursor-label={tile.external ? "Play" : "View"}>
        <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-ink bg-ink transition-[transform,box-shadow] duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_#0015D4] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none motion-reduce:transition-none">
          <Cover tile={tile} lead={lead} eager={eager} />
          {tile.example && <span className={EXAMPLE_CHIP}>Example output</span>}
          {playing && tile.video && (
            <video
              ref={video}
              src={tile.video}
              muted
              playsInline
              autoPlay
              loop={!tile.clip}
              preload="auto"
              aria-hidden
              tabIndex={-1}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                if (tile.clip) v.currentTime = tile.clip[0];
                void v.play().catch(() => {});
              }}
              onPlaying={() => setReady(true)}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (tile.clip && v.currentTime >= tile.clip[1]) v.currentTime = tile.clip[0];
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${ready ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="type-label text-cobalt">{tile.label}</p>
            <h3 className={`mt-1.5 font-display font-bold leading-snug text-ink transition-colors group-hover:text-cobalt ${lead ? "text-xl md:text-2xl" : "text-xl"}`}>
              {tile.name}
            </h3>
          </div>
          <ArrowUpRight className="mt-5 h-5 w-5 shrink-0 text-ink-label transition-colors group-hover:text-cobalt" aria-hidden />
        </div>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-body">{tile.line}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Built with">
          {tile.stack.map((t) => (
            <li key={t} className="rounded-md border border-black/15 bg-white px-2 py-0.5 text-xs font-medium text-ink-body">
              {t}
            </li>
          ))}
        </ul>
      </a>
      {tile.video && (
        // On a touch screen there is no hover, so the preview gets its own button.
        <button
          type="button"
          onClick={() => (playing ? stop() : start())}
          aria-pressed={playing}
          aria-label={`${playing ? "Stop" : "Play"} the preview of ${tile.name}`}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink/85 text-white transition-transform active:scale-95 [@media(hover:hover)_and_(pointer:fine)]:hidden"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4 translate-x-px" aria-hidden />}
        </button>
      )}
    </li>
  );
}

function CategorySection({ c, index, hidden }: { c: Category; index: number; hidden: boolean }) {
  // The first two websites run two to a row; everything else three.
  const leads = c.id === "websites" ? 2 : 0;
  return (
    <section
      id={c.id}
      hidden={hidden}
      aria-labelledby={`${c.id}-title`}
      className="scroll-mt-24 border-t border-black/10 px-6 py-10 md:px-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 md:mb-8">
          <div>
            <p className="type-label text-ink-label">
              {String(index + 1).padStart(2, "0")} · {c.tiles.length === c.total ? `${c.total} shown` : `${c.tiles.length} of ${c.total} shown`}
            </p>
            <h2 id={`${c.id}-title`} className="mt-2 font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem]">
              {c.name}
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-body md:text-base">{c.lead}</p>
        </div>
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-12">
          {c.tiles.map((t, i) => (
            <WorkTile key={t.id} tile={t} lead={i < leads} eager={index === 0 && i < 2} />
          ))}
        </ul>
        {c.more && (
          <a
            href={c.more.href}
            className="group mt-10 inline-flex min-h-11 items-center gap-2 font-display text-base font-bold text-ink transition-colors hover:text-cobalt"
          >
            <span className="underline decoration-2 underline-offset-4">{c.more.label}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
          </a>
        )}
      </div>
    </section>
  );
}

export function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("all");

  // A link such as /work#games opens with that filter on.
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      setFilter(isCategory(h) ? h : "all");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const pick = (e: MouseEvent, next: Filter) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    stopPlaying?.();
    setFilter(next);
    window.history.replaceState(null, "", next === "all" ? window.location.pathname : `#${next}`);
  };

  const chip = (active: boolean) =>
    `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 px-4 font-display text-sm font-bold transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.97] ${
      active ? "border-ink bg-ink text-white" : "border-ink/20 bg-white text-ink hover:border-ink"
    }`;
  const count = (active: boolean) => `font-mono text-xs font-medium ${active ? "text-white/70" : "text-ink-label"}`;
  const current = categories.find((c) => c.id === filter);

  return (
    <PageShell cta="Want something like this built?">
      <section className="px-6 pb-6 pt-28 md:px-12 md:pb-8 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Work", "/work"]]} />
          <div className="mt-5 grid gap-x-12 gap-y-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end">
            <AccentHeading before="The " accent="work" after="." color="#0015D4" />
            <p className="max-w-xl text-base leading-relaxed text-ink-body md:pb-2 md:text-xl lg:justify-self-end">
              Websites, apps, AI agents, automations and games, all built with Claude Code. Every piece here is one you can open.
            </p>
          </div>
          <nav id="filter" aria-label="Filter the work by kind" className="-mx-6 mt-6 scroll-mt-28 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:mt-10 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
              <li>
                <a href="#filter" onClick={(e) => pick(e, "all")} aria-current={filter === "all" ? "true" : undefined} className={chip(filter === "all")}>
                  All <span className={count(filter === "all")}>{totalWork}</span>
                </a>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} onClick={(e) => pick(e, c.id)} aria-current={filter === c.id ? "true" : undefined} className={chip(filter === c.id)}>
                    {c.name} <span className={count(filter === c.id)}>{c.total}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="sr-only" aria-live="polite">
            {current ? `Showing ${current.name}` : "Showing all work"}
          </p>
        </div>
      </section>

      {categories.map((c, i) => (
        <CategorySection key={c.id} c={c} index={i} hidden={filter !== "all" && filter !== c.id} />
      ))}
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
            <p className="max-w-2xl text-lg leading-relaxed text-ink-body md:text-xl">{w.desc}</p>
            <div className="rounded-2xl border-2 border-black bg-[#FFCB41] p-6 shadow-[6px_6px_0_#141414]">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink-body">The result</p>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight text-black">{w.stat}</p>
              <p className="mt-1 text-sm text-ink-body">{w.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border-2 border-black bg-black shadow-[10px_10px_0_#0015D4]">
          {w.loop ? (
            <video
              src={w.loop}
              poster={`${w.cover}-1600.webp`}
              className="aspect-video w-full"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${name} screen recording`}
            />
          ) : (
            <img
              src={`${w.cover}-1600.webp`}
              srcSet={`${w.cover}-960.webp 960w, ${w.cover}-1600.webp 1600w`}
              sizes="(min-width: 1280px) 1280px, 92vw"
              width={1600}
              height={900}
              alt={`${name}: what it delivers`}
              fetchPriority="high"
              className="aspect-video w-full object-cover"
            />
          )}
          {w.example && !w.loop && <span className={EXAMPLE_CHIP}>Example output</span>}
        </div>
      </section>

      <section className="border-t border-black/10 bg-card px-6 section-y md:px-12">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="type-h2 text-balance text-ink">
              How it <span className="font-editorial font-normal text-primary">works</span>.
            </h2>
            <ol className="mt-10 border-t border-black/15">
              {w.steps.map((step, i) => (
                <li key={i} className="flex gap-5 border-b border-black/15 py-6">
                  <span className="font-mono text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg leading-relaxed text-ink-body">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">Stack</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {w.tools.map((t) => (
                  <li key={t} className="rounded-md border border-black/15 bg-white px-3 py-1.5 text-sm font-medium text-ink-body">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {w.quote && (
              <figure className="rounded-2xl border-2 border-black bg-white p-7">
                <blockquote className="font-editorial text-xl leading-snug text-black">"{w.quote}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink-body">{w.quoteBy ?? `${w.testimonial}, client`}</figcaption>
              </figure>
            )}
            {service && (
              <a href={`/services/${service.slug}`} className={cardClass({ lift: true, className: "group block [--card-shadow:#0015D4]" })}>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">Service</p>
                <p className="mt-2 font-display text-xl font-bold text-black group-hover:text-primary">{service.name}</p>
                <p className="mt-1.5 text-sm text-ink-body">{service.short}</p>
              </a>
            )}
            <StartButtons />
          </div>
        </div>
        {(w.video || w.showCanvas) && (
          <figure className="mx-auto mt-16 max-w-7xl">
            <figcaption className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">
              {w.video ? "The build film" : "The workflow behind it"}
            </figcaption>
            <div className="mt-4 overflow-hidden rounded-2xl border-2 border-ink bg-white">
              {w.video ? (
                <video src={w.video} poster={w.poster} className="aspect-video w-full" controls muted playsInline preload="none" aria-label={`${name} build film`} />
              ) : (
                <img src={w.img} alt={`${name} workflow canvas`} loading="lazy" decoding="async" className="w-full" />
              )}
            </div>
          </figure>
        )}
      </section>

      <section className="border-t border-black/10 px-6 py-16 md:px-12">
        <a href={`/work/${next.slug}`} className="group mx-auto flex max-w-7xl items-center justify-between gap-6">
          <span>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">Next project</span>
            <span className="mt-2 block font-display text-2xl font-extrabold tracking-tight text-black transition-colors group-hover:text-primary md:text-4xl">
              {next.title}
            </span>
          </span>
          <ArrowRight className="h-8 w-8 shrink-0 text-ink-label transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </a>
      </section>
    </PageShell>
  );
}
