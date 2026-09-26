import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLenis } from "@/hooks/use-lenis";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AskPax } from "@/components/site/pax/AskPax";
import { OnboardingModal } from "@/components/site/OnboardingModal";
import { Avatar } from "@/components/site/Portrait";
import { WHATSAPP } from "@/data/portfolio";

/** Layout for every page except home: same nav and footer, no preloader. */
export function PageShell({ children, cta = "Want a system like this?" }: { children: ReactNode; cta?: string }) {
  useLenis();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <FloatingWhatsApp />
      <AskPax />
      <main>{children}</main>
      <PageCTA heading={cta} />
      <Footer />
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: Array<[string, string]> }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map(([name, href], i) => (
          <li key={href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < trail.length - 1 ? (
              <a href={href} className="transition-colors hover:text-primary">
                {name}
              </a>
            ) : (
              <span aria-current="page" className="text-black/70">
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
    <h1 className="font-display text-[12vw] font-extrabold leading-[1.02] tracking-tight text-black sm:text-6xl lg:text-[5.4rem]">
      {before}
      <span className="font-editorial font-normal" style={{ color }}>
        {accent}
      </span>
      {after}
    </h1>
  );
}

export function StartButtons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex h-14 items-center gap-2.5 whitespace-nowrap rounded-full px-7 font-display text-[15px] font-bold transition-colors md:text-base ${
          dark ? "bg-[#E7E7E1] text-black hover:bg-primary hover:text-white" : "bg-primary text-white hover:bg-black"
        }`}
      >
        <SiWhatsapp className="h-5 w-5 shrink-0" />
        Start a project
      </a>
      <OnboardingModal
        trigger={
          <button
            className={`inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full border px-7 font-display text-[15px] font-bold transition-colors md:text-base ${
              dark
                ? "border-white/30 text-white hover:border-white hover:bg-white hover:text-black"
                : "border-black/25 text-black hover:border-black hover:bg-black hover:text-white"
            }`}
          >
            Get a fixed quote <ArrowUpRight className="h-5 w-5" />
          </button>
        }
      />
    </div>
  );
}

function PageCTA({ heading }: { heading: string }) {
  return (
    <section className="bg-black px-6 py-28 text-[#E7E7E1] md:px-12 md:py-36">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Avatar size={72} ring="#0015D4" />
        <h2 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">{heading}</h2>
        <p className="mx-auto mt-5 max-w-xl font-editorial text-xl text-[#E7E7E1]/70 md:text-2xl">
          Tell me what eats your week. You get a plan and a fixed price within 24 hours.
        </p>
        <div className="mt-10">
          <StartButtons dark />
        </div>
      </div>
    </section>
  );
}
