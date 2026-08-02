import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { SiWhatsapp, SiFiverr, SiUpwork } from "react-icons/si";

import { Preloader } from "@/components/fx/Preloader";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { Magnetic } from "@/components/fx/Magnetic";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { Marquee } from "@/components/fx/Marquee";
import { CountUp } from "@/components/fx/CountUp";
import { ScrollProgress, VelocitySkew } from "@/components/fx/ScrollFX";
import { BigMarquee } from "@/components/fx/BigMarquee";
import { useLenis } from "@/hooks/use-lenis";

import { SiteNav } from "@/components/site/SiteNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { WebProjectsSection } from "@/components/site/WebProjects";
import { Web3ProjectsSection } from "@/components/site/Web3Projects";
import { TestimonialCinema } from "@/components/site/TestimonialCinema";
import { OnboardingModal } from "@/components/site/OnboardingModal";
import { Logo } from "@/components/site/Logo";
import { Avatar, SpinningBadge } from "@/components/site/Portrait";
import { FiverrLevelBadge, L1_THEME, L2_THEME } from "@/components/site/FiverrBadge";
import { ToolStack } from "@/components/site/ToolStack";
import { HireMe } from "@/components/site/HireMe";
import { FAQSection } from "@/components/site/FAQ";

import { reviews, profilePic, WHATSAPP, FIVERR, UPWORK } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

// Claude first, then the automation stack — the order is the positioning.
const ROTATING = [
  { word: "Claude Code", color: "#0015D4" },
  { word: "Claude Design", color: "#F32317" },
  { word: "Claude Cowork", color: "#0015D4" },
  { word: "n8n", color: "#F32317" },
  { word: "Make.com", color: "#FF8FCA" },
  { word: "AI agents", color: "#0015D4" },
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);
  const longest = ROTATING.reduce((a, b) => (b.word.length > a.length ? b.word : a), "");
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* invisible sizer keeps layout stable */}
      <span className="invisible col-start-1 row-start-1 font-editorial">{longest}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={i}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap font-editorial"
          style={{ color: ROTATING[i].color }}
        >
          {ROTATING[i].word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// The watchword: quality, value, speed — rolls forever under the headline.
const WATCHWORDS = [
  { word: "quality.", color: "#0015D4" },
  { word: "value.", color: "#F32317" },
  { word: "speed.", color: "#BA7517" },
];

function WatchwordRoller() {
  const [i, setI] = useState(0);
  useEffect(() => {
    // 2600ms vs the headline's 2200ms so the two rollers interleave
    // instead of ticking in unison.
    const t = setInterval(() => setI((v) => (v + 1) % WATCHWORDS.length), 2600);
    return () => clearInterval(t);
  }, []);
  const longest = WATCHWORDS.reduce((a, b) => (b.word.length > a.length ? b.word : a), "");
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <span className="invisible col-start-1 row-start-1 font-editorial italic">{longest}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={i}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap font-editorial italic"
          style={{ color: WATCHWORDS[i].color }}
        >
          {WATCHWORDS[i].word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─────────────────────────────── HERO ───────────────────────────────
function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = (delay: number) => ({
    initial: { y: "110%" },
    animate: ready ? { y: 0 } : {},
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 md:px-12">
      {/* dani-style color pops floating in the field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute right-[12%] top-[18%] h-6 w-6 rounded-full bg-[#FFCB41]"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[8%] top-[30%] hidden h-4 w-4 rounded-full bg-[#F32317] md:block"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.div
          className="absolute bottom-[28%] right-[22%] h-5 w-5 rounded-full bg-[#84DEF9]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[16%] hidden h-3.5 w-3.5 rounded-full bg-[#FF8FCA] md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-black/15 bg-white/80 py-1.5 pl-1.5 pr-4 text-sm font-medium text-black/70 md:bg-white/60 md:backdrop-blur-md"
        >
          <Avatar size={30} ring="#0BB07B" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#0BB07B]" />
          Available for new projects
        </motion.div>

        <h1 className="font-display font-extrabold leading-[1.02] tracking-tight text-black text-[11.5vw] sm:text-[9vw] lg:text-[6.6rem]">
          <span className="block overflow-hidden pb-2 -mb-2">
            <motion.span className="block" {...line(0.15)}>
              I build with
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3 -mb-3">
            <motion.span className="block" {...line(0.28)}>
              <RotatingWord />
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2 -mb-2">
            <motion.span className="block" {...line(0.41)}>
              so you don't have to<span className="text-primary">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.54 }}
          className="mt-7 font-display text-xl font-bold tracking-tight text-black md:text-2xl"
        >
          Delivered with <WatchwordRoller />
        </motion.p>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="max-w-md text-lg leading-relaxed text-black/60"
          >
            I'm <strong className="font-semibold text-black">Denver <span className="text-[#10B981]">Emerald</span> Peter</strong>. Apps and websites shipped with{" "}
            <strong className="font-semibold text-black">Claude Code</strong>, and automation systems built on{" "}
            <strong className="font-semibold text-black">n8n, Make.com & Airtable</strong> that capture leads and run
            your operations on autopilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="flex flex-col items-start gap-6 md:items-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block"
            >
              <Logo size={120} />
            </motion.div>
            {/* wraps on narrow screens; labels never break mid-phrase */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Magnetic strength={0.45}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full bg-primary px-6 font-display text-[15px] font-bold text-white md:gap-3 md:px-8 md:text-base"
                data-cursor="hover"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-400 ease-out group-hover:scale-x-100" />
                <SiWhatsapp className="relative z-10 h-5 w-5 shrink-0" />
                <span className="relative z-10">Start a project</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.45}>
              <a
                href="#websites"
                className="inline-flex h-14 items-center whitespace-nowrap rounded-full border border-black/25 px-6 font-display text-[15px] font-bold text-black transition-all hover:border-black hover:bg-black hover:text-white md:px-8 md:text-base"
                data-cursor="hover"
              >
                See the work
              </a>
            </Magnetic>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/40"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────── STATS ──────────────────────────────
function Stats() {
  const stats = [
    { to: 50, suffix: "+", label: "Clients worldwide" },
    { to: 200, suffix: "+", label: "Systems delivered" },
    { to: 4, suffix: " yrs", label: "Building automations" },
    { to: 15, suffix: "+", label: "Hours saved weekly, per client" },
  ];
  return (
    <section className="px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center md:text-left">
            <div className="font-display text-5xl font-extrabold text-black md:text-6xl">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-black/50">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────── PROCESS ──────────────────────────────
function Process() {
  const steps = [
    { n: "01", title: "Tell me your workflow", desc: "We map your manual processes, find the bottlenecks, and design the ideal flow." },
    { n: "02", title: "I build your system", desc: "Custom, reliable logic with Claude Code and the best automation tool for the job, tested end to end." },
    { n: "03", title: "You scale on autopilot", desc: "The system runs in the background. We refine, you grow." },
  ];

  return (
    <section className="border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">06 — Process</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Three steps. No surprises."
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.15 }}
              className="relative border-t-2 border-black/10 pt-8"
            >
              <motion.div
                className="absolute -top-0.5 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.2 }}
              />
              <span className="font-display text-6xl font-extrabold text-stroke">{s.n}</span>
              <h3 className="mt-6 font-display text-2xl font-bold text-black">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-black/55">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────── REVIEWS ───────────────────────────────
function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="mx-3 w-[340px] shrink-0 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-1 text-[#FFCB41]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-black/80">"{r.text}"</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white">
          {r.name.charAt(0)}
        </div>
        <p className="text-sm font-semibold text-black">
          {r.name} <span className="font-normal text-black/45">— {r.country}</span>
        </p>
      </div>
    </div>
  );
}


function ReviewsMarquee() {
  return (
    <section className="border-t border-black/10 py-28 md:py-36 overflow-hidden">
      <div className="mb-14 px-6 text-center md:px-12">
        <SplitWords
          as="h2"
          text="Trusted by 50+ clients worldwide."
          className="flex flex-wrap justify-center font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl"
        />
      </div>
      <Marquee duration={45} className="mb-6">
        {reviews.slice(0, 3).map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </Marquee>
      <Marquee duration={45} direction="right">
        {reviews.slice(3).map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </Marquee>
    </section>
  );
}

// ───────────────────────────── ABOUT ────────────────────────────────
function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 100, damping: 30 });

  // Colour resolves as the portrait reaches the middle of the viewport and
  // drains again on the way out. Scroll-driven rather than hover, because
  // hover does not exist on a phone and left the photo permanently grey.
  const grayAmount = useSpring(
    useTransform(scrollYProgress, [0.12, 0.4, 0.6, 0.88], [1, 0, 0, 1]),
    { stiffness: 80, damping: 24 },
  );
  const portraitFilter = useMotionTemplate`grayscale(${grayAmount})`;

  return (
    <section id="about" ref={ref} className="border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <motion.div style={{ y: imgY }} className="group relative mx-auto w-full max-w-sm">
          {/* color pops that drift behind the portrait */}
          <motion.span
            aria-hidden
            className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#84DEF9]"
            animate={{ y: [0, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute -left-8 top-1/3 h-10 w-10 rounded-full bg-[#FF8FCA]"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-black rotate-2 transition-all duration-700 group-hover:rotate-0 group-hover:shadow-[12px_12px_0_#0015D4]"
          >
            <motion.img
              src={profilePic}
              alt="Denver Emerald Peter"
              style={{ filter: portraitFilter }}
              className="w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-100"
            />
            {/* sheen that sweeps across on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
          </motion.div>

          <div className="absolute -bottom-6 -left-6 rounded-2xl border-2 border-black bg-[#FFCB41] px-5 py-4">
            <p className="font-display text-2xl font-extrabold text-black">
              <CountUp to={200} suffix="+" />
            </p>
            <p className="text-xs font-medium text-black/70">systems shipped</p>
          </div>

          {/* tucked inside the frame on phones, overhangs from md up */}
          <SpinningBadge className="absolute -bottom-8 right-0 text-[#E7E7E1] md:-bottom-10 md:-right-12" size={124} />
        </motion.div>

        <div>
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">07 — About</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
              Hi, I'm Denver <span className="text-[#10B981]">Emerald</span> Peter.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-editorial text-2xl leading-snug text-black md:text-[28px]">
              I build the parts of your business you should never have to think about again.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-lg leading-relaxed text-black/60">
              Four years in, that has meant lead pipelines that fill themselves, client onboarding that runs
              overnight, and dashboards that answer the question before you think to ask it.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-black/60">
              Building it is only half the job. The other half is handing it over properly. Every system ships with a
              walkthrough video and plain docs, inside your own accounts, so you own it, you can change it, and you
              are never stuck waiting on me.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-black/60">
              Calm, direct, allergic to jargon. If something will not work, I tell you before you pay for it.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-6 font-mono text-xs font-semibold uppercase tracking-widest text-black/45">
              <span>4+ years</span>
              <span>50+ clients</span>
              <span>200+ systems</span>
              <span>Level 2 seller on Fiverr</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────── CTA ─────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 text-[#E7E7E1] md:px-12 md:py-48">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute left-[10%] top-[20%] h-5 w-5 rounded-full bg-[#FFCB41]"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[14%] top-[30%] h-4 w-4 rounded-full bg-[#FF8FCA]"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        />
        <motion.div
          className="absolute bottom-[24%] left-[20%] h-4 w-4 rounded-full bg-[#84DEF9]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <SplitWords
          as="h2"
          text="Ready to automate your business?"
          className="flex flex-wrap justify-center font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl"
        />
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Avatar size={72} ring="#0015D4" float />
            <p className="mx-auto max-w-xl font-editorial text-2xl text-[#E7E7E1]/70">
              Let's build a system that works while you sleep.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.45} className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Magnetic strength={0.4}>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-16 items-center gap-3 overflow-hidden rounded-full bg-[#E7E7E1] px-10 font-display text-lg font-bold text-black"
              data-cursor="hover"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-400 ease-out group-hover:scale-y-100" />
              <SiWhatsapp className="relative z-10 h-6 w-6 transition-colors group-hover:text-white" />
              <span className="relative z-10 transition-colors group-hover:text-white">Message me on WhatsApp</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <OnboardingModal
              trigger={
                <button
                  className="inline-flex h-16 items-center gap-3 rounded-full border border-white/30 px-10 font-display text-lg font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                  data-cursor="hover"
                >
                  Start your project <ArrowUpRight className="h-6 w-6" />
                </button>
              }
            />
          </Magnetic>
        </Reveal>

        <Reveal delay={0.65}>
          <p className="mt-4 text-sm text-white/40">Limited availability for new projects this month.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ───────────────────────────── FOOTER ───────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12 text-[#E7E7E1] md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5 font-display text-xl font-extrabold">
          <Logo size={26} color="#E7E7E1" />
          Denver<span className="text-[#84DEF9]">®</span>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-white/50">Built with Claude Code. Systems that save time and grow businesses.</p>
          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href={FIVERR}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Denver on Fiverr"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1DBF73] text-white transition-transform hover:scale-110"
              data-cursor="hover"
            >
              <SiFiverr className="h-5 w-5" />
            </a>
            <a
              href={UPWORK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Denver on Upwork"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14A800] text-white transition-transform hover:scale-110"
              data-cursor="hover"
            >
              <SiUpwork className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Denver <span className="text-[#10B981]">Emerald</span> Peter
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────── PAGE ───────────────────────────────
export default function Home() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <div className="cursor-none-desktop min-h-screen bg-background text-foreground">
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <CustomCursor />
      <SiteNav />
      <FloatingWhatsApp />

      <VelocitySkew>
        <main>
          <Hero ready={ready} />
          <ToolStack />
          <Stats />
          <BigMarquee items={["Claude Code", "Websites", "Apps", "AI Products"]} accent="#0015D4" />
          <WebProjectsSection />
          <BigMarquee items={["dApps", "Solana Bots", "Smart Contracts", "Web3 Trading", "DeFi"]} direction="right" accent="#8B5CF6" />
          <Web3ProjectsSection />
          <BigMarquee items={["Automation", "AI Agents", "n8n", "Make.com", "Airtable"]} accent="#F32317" />
          <FeaturedWork />
          <TestimonialCinema />
          <HireMe />
          <Process />
          <ReviewsMarquee />
          <About />
          <FAQSection />
          <BigMarquee items={["Let's build", "Your system", "Starts here"]} accent="#FFCB41" />
          <FinalCTA />
        </main>

        <Footer />
      </VelocitySkew>
    </div>
  );
}
