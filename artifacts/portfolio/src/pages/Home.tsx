import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CustomCursor } from "@/components/fx/CustomCursor";
import { Reveal } from "@/components/fx/SplitWords";
import { ScrollProgress } from "@/components/fx/ScrollFX";
import { useMotionOff } from "@/lib/motion-pref";
import { HeroBackground } from "@/components/fx/HeroBackground";

import { SiteNav } from "@/components/site/SiteNav";
import { SkipLink } from "@/components/site/SkipLink";
import { CtaPair } from "@/components/site/Button";
import { AskPax } from "@/components/site/pax/AskPax";
import { ProofStrip } from "@/components/site/ProofStrip";
import { Pricing } from "@/components/site/Pricing";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { WebProjectsSection } from "@/components/site/WebProjects";
import { TestimonialCinema } from "@/components/site/TestimonialCinema";
import { WrittenReviews } from "@/components/site/WrittenReviews";
import { ToolStack } from "@/components/site/ToolStack";
import { HireMe } from "@/components/site/HireMe";
import { FAQSection } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { ClaudeFullStack } from "@/components/site/ClaudeFullStack";
import { AutomationStory } from "@/components/site/AutomationStory";
import { FACT_STATS } from "@/data/facts";
import { profilePicSmall } from "@/data/portfolio";
import { featuredGame } from "@/data/games";
import { ArrowUpRight, Play } from "lucide-react";
import { buttonClass } from "@/components/site/Button";
import { SectionHeader } from "@/components/site/SectionHeader";

const EASE = [0.22, 1, 0.36, 1] as const;

// Claude first, then the automation stack. The headline runs through the list
// once and comes to rest on "Claude Code", which is also what the prerendered
// page and anyone with reduced motion sees from the start.
const ROTATING = ["Claude Code", "Claude Design", "Claude Cowork", "n8n", "Make.com", "AI agents"];
const FIRST_HOLD_MS = 1800;
const STEP_MS = 1500;

function RotatingWord() {
  const [i, setI] = useState(0);
  const off = useMotionOff();
  useEffect(() => {
    if (off) return setI(0);
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      step += 1;
      // One pass: after the last word it returns to the first and stops.
      setI(step % ROTATING.length);
      if (step < ROTATING.length) timer = setTimeout(next, STEP_MS);
    };
    timer = setTimeout(next, FIRST_HOLD_MS);
    return () => clearTimeout(timer);
  }, [off]);
  const longest = ROTATING.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className="relative -my-[0.14em] inline-grid overflow-hidden py-[0.14em] align-bottom">
      {/* Invisible sizer keeps layout stable. The word lives in CSS content,
          not the DOM, so crawlers read the headline without a stray word. */}
      <span aria-hidden data-w={longest} className="invisible col-start-1 row-start-1 font-editorial before:content-[attr(data-w)]" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap font-editorial text-cobalt"
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Who the site is for. Emerald picks the wording; swap it here.
const HERO_QUALIFIER = "Built for businesses doing $10k+ a month";

// ─────────────────────────────── HERO ───────────────────────────────
// Everything a buyer needs sits on the first phone screen: the headline, one
// outcome line, who it is for, and both buttons. The text is in the page's
// HTML and visible at first paint; the lines settle a few pixels once (CSS,
// transform only) and nothing fades with the scroll.
function Hero() {
  return (
    <section
      id="top"
      // The floating chat button stays out of the way for the whole hero.
      data-chat-clear
      className="relative overflow-hidden px-6 pb-10 pt-[6.5rem] md:px-12 md:pb-14 md:pt-36 lg:flex lg:min-h-[calc(100svh-5.5rem)] lg:flex-col lg:justify-center"
    >
      <HeroBackground variant="nodes" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-black/15 bg-white/80 py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink-body md:mb-7">
          <img
            src={profilePicSmall}
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full object-cover object-top ring-2 ring-green"
          />
          <span className="h-2 w-2 rounded-full bg-green" aria-hidden />
          Available for new projects
        </p>

        <h1 className="font-display font-extrabold leading-[1.02] tracking-tight text-black text-[11.5vw] sm:text-[9vw] lg:text-[min(6.6rem,10.5vh)]">
          <span className="hero-rise block">I build with </span>
          <span className="hero-rise block [--i:1]">
            <RotatingWord />{" "}
          </span>
          <span className="hero-rise block [--i:2]">
            so you don't have to<span className="text-primary">.</span>
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-[17px] font-medium leading-normal text-black md:mt-7 md:text-xl md:leading-relaxed">
          Websites, apps and AI automations that capture every enquiry, follow up in minutes and take repetitive work
          off your team.
        </p>

        {/* The qualifier: tells buyers who this is for before they scroll. */}
        <p className="mt-3 inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] max-[359px]:text-[10px] font-semibold uppercase tracking-wide text-ink-body sm:gap-2.5 sm:text-xs sm:tracking-widest md:mt-4 md:text-sm">
          <span className="h-2 w-2 shrink-0 bg-primary" aria-hidden />
          {HERO_QUALIFIER}
        </p>

        <CtaPair className="mt-6 md:mt-9" />

        <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-4 border-t border-black/15 pt-6 md:mt-12 md:gap-10 md:pt-7">
          {FACT_STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[13px] leading-snug text-ink-label md:text-sm">{s.label}</dt>
              <dd className="whitespace-nowrap font-display text-2xl font-extrabold text-black md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ────────────────────────────── GAMES ───────────────────────────────
// One game a visitor can play straight away, and the way to the rest.
function Games() {
  return (
    <section id="games" className="section-y border-t border-black/10 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader num="03" label="Games" title="Games you can play in your browser." />
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border-2 border-ink bg-ink text-on-dark lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <a href={featuredGame.playUrl} aria-label={`Play ${featuredGame.name}`} className="group relative block aspect-[1200/630] overflow-hidden bg-black">
              <img
                src={featuredGame.poster}
                alt={`${featuredGame.name}: a T-rex chases Mac through a jungle`}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink transition-transform duration-150 ease-out group-hover:scale-105 group-active:scale-95" aria-hidden>
                <Play className="h-5 w-5 fill-current" />
              </span>
            </a>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="type-label text-sky">{featuredGame.kind}</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">{featuredGame.name}</h3>
              <p className="mt-4 type-body text-on-dark-body">
                An original 3D runner built for the browser. A T-rex chases Mac through a prehistoric jungle.
              </p>
              <div className="mt-7 flex flex-col items-start gap-4" data-chat-clear>
                <a href={featuredGame.playUrl} className={buttonClass({ tone: "dark", full: true })}>
                  <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden />
                  Play {featuredGame.name}
                </a>
                <a href="/game-development" className="tap inline-flex items-center gap-1.5 text-[15px] font-bold text-white underline-offset-4 hover:underline">
                  See all games and Shorts <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ────────────────────────────── CTA ─────────────────────────────────
function FinalCTA() {
  return (
    <section className="section-y bg-black px-6 text-on-dark md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="type-h2 text-balance text-white">
            Ready to <span className="font-editorial font-normal text-sky">automate</span> your business?
          </h2>
          <p className="mx-auto mt-6 max-w-xl type-body text-on-dark-body">
            Tell me what eats your week. You get a plan and a fixed price within 24 hours.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-9">
          <CtaPair tone="dark" align="center" />
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────── PAGE ───────────────────────────────
// Order: the work, games, how it runs, what I build and with what, what
// clients say, prices, how to start. The page scrolls natively; nothing
// shears, loops or drifts.
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />
      <SkipLink />
      <SiteNav />

      <main id="main" tabIndex={-1}>
        <Hero />
        <ProofStrip />
        <WebProjectsSection />
        <FeaturedWork />
        <Games />
        <AutomationStory num="04" />
        <ClaudeFullStack />
        <ToolStack />
        <TestimonialCinema />
        <WrittenReviews />
        <Pricing num="07" />
        <HireMe />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
      {/* Last in the page on purpose: the keyboard reaches the page's own
          buttons before the floating one. */}
      <AskPax />
    </div>
  );
}
