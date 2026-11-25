import type { ReactNode } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";
import { AskPax } from "@/components/site/pax/AskPax";
import { CtaPair } from "@/components/site/Button";
import { SkipLink } from "@/components/site/SkipLink";
import { inkFor } from "@/lib/tones";
import { Avatar } from "@/components/site/Portrait";

/** Layout for every page except home: same nav and footer, no preloader. */
export function PageShell({ children, cta = "Want a system like this?" }: { children: ReactNode; cta?: string }) {
  useLenis();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteNav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <PageCTA heading={cta} />
      <Footer />
      {/* Last in the page on purpose: the keyboard reaches the page's own
          buttons before the floating one. */}
      <AskPax />
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: Array<[string, string]> }) {
  return (
    <nav aria-label="Breadcrumb" className="type-label text-ink-label">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map(([name, href], i) => (
          <li key={href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < trail.length - 1 ? (
              <a href={href} className="tap transition-colors hover:text-cobalt">
                {name}
              </a>
            ) : (
              <span aria-current="page" className="text-ink">
                {name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The h1 pattern: heavy Inter with one Libre Baskerville italic accent. */
export function AccentHeading({
  before,
  accent,
  after,
  color,
}: {
  before: string;
  accent: string;
  after: string;
  color: string;
}) {
  return (
    <h1 className="type-h1 text-ink">
      {before}
      <span className="font-editorial font-normal" style={{ color: inkFor(color) }}>
        {accent}
      </span>
      {after}
    </h1>
  );
}

/** The two calls to action, the same pair on every page. */
export function StartButtons({ dark = false }: { dark?: boolean }) {
  return <CtaPair tone={dark ? "dark" : "light"} align={dark ? "center" : "start"} />;
}

function PageCTA({ heading }: { heading: string }) {
  return (
    <section className="section-y bg-black px-6 text-on-dark md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Avatar size={72} ring="#0015D4" />
        <h2 className="mt-8 type-h2 text-balance text-white">{heading}</h2>
        <p className="mx-auto mt-5 max-w-xl type-body text-on-dark-body">
          Tell me what eats your week. You get a plan and a fixed price within 24 hours.
        </p>
        <div className="mt-10 w-full sm:w-auto">
          <StartButtons dark />
        </div>
      </div>
    </section>
  );
}
