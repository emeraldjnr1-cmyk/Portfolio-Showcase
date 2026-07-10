import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { SiAirtable, SiZapier, SiMake, SiN8N, SiTelegram, SiWhatsapp, SiOpenai, SiClaude } from "react-icons/si";

import { Preloader } from "@/components/fx/Preloader";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { Magnetic } from "@/components/fx/Magnetic";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { Marquee } from "@/components/fx/Marquee";
import { CountUp } from "@/components/fx/CountUp";
import { useLenis } from "@/hooks/use-lenis";

import { SiteNav } from "@/components/site/SiteNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { WebProjectsSection } from "@/components/site/WebProjects";
import { TestimonialCinema } from "@/components/site/TestimonialCinema";

import { reviews, profilePic, WHATSAPP, TELEGRAM } from "@/data/portfolio";

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
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-4 py-1.5 text-sm font-medium text-black/70 backdrop-blur-md"
        >
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

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="max-w-md text-lg leading-relaxed text-black/60"
          >
            I'm <strong className="font-semibold text-black">Denver Peter</strong> — apps and websites shipped with{" "}
            <strong className="font-semibold text-black">Claude Code</strong>, and automation systems built on{" "}
            <strong className="font-semibold text-black">n8n, Make.com & Airtable</strong> that capture leads and run
            your operations on autopilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="flex items-center gap-4"
          >
            <Magnetic strength={0.45}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-primary px-8 font-display text-base font-bold text-white"
                data-cursor="hover"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-400 ease-out group-hover:scale-x-100" />
                <SiWhatsapp className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Start a project</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.45}>
              <a
                href="#work"
                className="inline-flex h-14 items-center rounded-full border border-black/25 px-8 font-display text-base font-bold text-black transition-all hover:border-black hover:bg-black hover:text-white"
                data-cursor="hover"
              >
                See the work
              </a>
            </Magnetic>
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

// ─────────────────────────── TOOL MARQUEE ───────────────────────────
function ToolStrip() {
  const tools = [
    { icon: <SiClaude className="h-6 w-6" />, name: "Claude Code" },
    { icon: <SiClaude className="h-6 w-6" />, name: "Claude Design" },
    { icon: <SiClaude className="h-6 w-6" />, name: "Claude Cowork" },
    { icon: <SiN8N className="h-6 w-6" />, name: "n8n" },
    { icon: <SiMake className="h-6 w-6" />, name: "Make.com" },
    { icon: <SiAirtable className="h-6 w-6" />, name: "Airtable" },
    { icon: <SiZapier className="h-6 w-6" />, name: "Zapier" },
    { icon: <SiOpenai className="h-6 w-6" />, name: "OpenAI" },
  ];
  return (
    <div className="border-y border-black bg-black py-6">
      <Marquee duration={30}>
        {tools.map((t, i) => (
          <div key={`${t.name}-${i}`} className="mx-10 flex items-center gap-3 text-[#E7E7E1]/70 transition-colors hover:text-white">
            {t.icon}
            <span className="font-display text-sm font-bold uppercase tracking-widest whitespace-nowrap">{t.name}</span>
            <span className="ml-6 h-1.5 w-1.5 rounded-full bg-[#FFCB41]" />
          </div>
        ))}
      </Marquee>
    </div>
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

// ───────────────────────────── SERVICES ─────────────────────────────
function Services() {
  const services = [
    { icon: <SiClaude className="h-7 w-7" />, title: "Claude Code — Websites & Apps", desc: "Full products designed, built, and shipped with Claude Code. Dashboards, storefronts, SaaS." , pop: "#0015D4" },
    { icon: <SiClaude className="h-7 w-7" />, title: "Claude Design & Cowork", desc: "Brand-quality UI design and AI-assisted operations, powered by the Claude toolkit.", pop: "#F32317" },
    { icon: <SiOpenai className="h-7 w-7" />, title: "AI Agent Development", desc: "RAG chatbots, support agents, and multi-tool AI systems that actually resolve tickets.", pop: "#84DEF9" },
    { icon: <SiN8N className="h-7 w-7" />, title: "n8n Automation", desc: "Flexible, powerful automation for advanced use cases and AI agent orchestration.", pop: "#F32317" },
    { icon: <SiMake className="h-7 w-7" />, title: "Make.com Automation", desc: "Advanced workflow automation connecting your whole stack, end to end.", pop: "#FF8FCA" },
    { icon: <SiAirtable className="h-7 w-7" />, title: "Airtable CRM Systems", desc: "Custom CRMs to track, manage, and scale your pipeline without the SaaS bloat.", pop: "#FFCB41" },
  ];

  return (
    <section id="services" className="border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">04 — Services</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="One person. Full stack. No hand-offs."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-black/15 bg-black/15 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
              className="group relative bg-card p-8 transition-colors duration-500 hover:bg-white"
              data-cursor="hover"
            >
              <div
                className="mb-6 inline-flex rounded-2xl p-3.5 text-black transition-all duration-400 group-hover:scale-110 group-hover:text-white"
                style={{ backgroundColor: `${s.pop}22` }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = s.pop)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${s.pop}22`)}
              >
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-black">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/55">{s.desc}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: s.pop }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────── PROCESS ──────────────────────────────
function Process() {
  const steps = [
    { n: "01", title: "Tell me your workflow", desc: "We map your manual processes, find the bottlenecks, and design the ideal flow." },
    { n: "02", title: "I build your system", desc: "Custom, reliable logic with Claude Code and the best automation tool for the job — tested end to end." },
    { n: "03", title: "You scale on autopilot", desc: "The system runs in the background. We refine, you grow." },
  ];

  return (
    <section className="border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">05 — Process</span>
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
        <Reveal>
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-1.5 text-sm text-black/70">
            <span className="font-bold text-black">Level 2 Seller</span> on Fiverr
          </div>
        </Reveal>
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

  return (
    <section id="about" ref={ref} className="border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <motion.div style={{ y: imgY }} className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-[2rem] border-2 border-black rotate-2 transition-transform duration-700 hover:rotate-0">
            <img src={profilePic} alt="Denver Peter" className="w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border-2 border-black bg-[#FFCB41] px-5 py-4">
            <p className="font-display text-2xl font-extrabold text-black">
              <CountUp to={200} suffix="+" />
            </p>
            <p className="text-xs font-medium text-black/70">systems shipped</p>
          </div>
        </motion.div>

        <div>
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">06 — About</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Hi, I'm Denver Peter."
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-black/60">
              An AI & automation specialist with <strong className="font-semibold text-black">4+ years</strong> helping
              businesses streamline operations. <strong className="font-semibold text-black">50+ clients globally</strong>,{" "}
              <strong className="font-semibold text-black">200+ systems delivered</strong>, Level 2 Seller on Fiverr.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-black/60">
              I'm calm, easy to work with, and strictly focused on systems that actually work — day in, day out.
            </p>
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
          <p className="mx-auto mt-6 max-w-xl font-editorial text-2xl text-[#E7E7E1]/70">
            Let's build a system that works while you sleep.
          </p>
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
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 items-center gap-3 rounded-full border border-white/30 px-10 font-display text-lg font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              data-cursor="hover"
            >
              <SiTelegram className="h-6 w-6" /> Telegram
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-10 text-sm text-white/40">Limited availability for new projects this month.</p>
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
        <div className="font-display text-xl font-extrabold">
          Denver<span className="text-[#84DEF9]">®</span>
        </div>
        <p className="text-sm text-white/50">Built with Claude Code. Systems that save time and grow businesses.</p>
        <p className="text-sm text-white/30">© {new Date().getFullYear()} Denver Peter</p>
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
      <CustomCursor />
      <SiteNav />
      <FloatingWhatsApp />

      <main>
        <Hero ready={ready} />
        <ToolStrip />
        <Stats />
        <FeaturedWork />
        <WebProjectsSection />
        <TestimonialCinema />
        <Services />
        <Process />
        <ReviewsMarquee />
        <About />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
