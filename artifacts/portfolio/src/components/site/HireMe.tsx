import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { Magnetic } from "@/components/fx/Magnetic";
import { OnboardingModal } from "@/components/site/OnboardingModal";
import { FiverrLevelBadge, L1_THEME, L2_THEME } from "@/components/site/FiverrBadge";
import { FIVERR, UPWORK } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Card that leans toward the pointer and carries a spotlight under it.
 * Everything runs on motion values, so tracking the cursor never triggers a
 * React render. Tilt is disabled for reduced-motion and for coarse pointers,
 * where there is no cursor to follow and the transform only costs battery.
 */
function TiltCard({ accent, children }: { accent: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, ${accent}26, transparent 72%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-3xl border-2 border-black bg-[#101014] p-8 text-[#E7E7E1] md:p-10"
      >
        <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
        />
        <div className="relative" style={reduced ? undefined : { transform: "translateZ(40px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-[#E7E7E1]/45">{label}</p>
    </div>
  );
}

export function HireMe() {
  return (
    <section id="hire" className="relative overflow-hidden border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">05 — Hire me</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Three ways to start working together."
            className="mt-4 flex flex-wrap justify-center font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl"
          />
          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-black/55">
              Through a platform with buyer protection and escrow, or straight to me. Same work either way.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Fiverr */}
          <TiltCard accent="#1DBF73">
            <div className="flex items-center justify-between">
              <SiFiverr className="h-9 w-9 text-[#1DBF73]" />
              <span className="rounded-full bg-[#1DBF73]/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1DBF73]">
                Level 2 seller
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-extrabold">Fiverr</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#E7E7E1]/55">
              Fixed scope, fixed price, escrow held until you approve. Best if you want the platform holding the
              paperwork.
            </p>

            <div className="mt-7 flex flex-wrap items-start gap-4">
              <FiverrLevelBadge level={2} lit={2} theme={L2_THEME} times="attained once" delay={0.1} />
              <FiverrLevelBadge level={1} lit={1} theme={L1_THEME} times="attained 3×" delay={0.22} />
            </div>

            <div className="mt-8">
              <Magnetic strength={0.4}>
                <a
                  href={FIVERR}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/btn relative inline-flex h-13 items-center gap-2.5 overflow-hidden rounded-full bg-[#1DBF73] px-7 py-3.5 font-display text-[15px] font-bold text-white"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-400 ease-out group-hover/btn:scale-x-100" />
                  <span className="relative z-10 transition-colors group-hover/btn:text-[#0B7A45]">Hire me on Fiverr</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-[#0B7A45]" />
                </a>
              </Magnetic>
            </div>
          </TiltCard>

          {/* Upwork */}
          <TiltCard accent="#14A800">
            <div className="flex items-center justify-between">
              <SiUpwork className="h-9 w-9 text-[#14A800]" />
              <span className="rounded-full bg-[#14A800]/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-[#14A800]">
                Open to contracts
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-extrabold">Upwork</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#E7E7E1]/55">
              Hourly or milestone contracts with time tracking. Best for longer builds and ongoing retainers where
              scope evolves.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Stat value="50+" label="Clients" />
              <Stat value="200+" label="Systems" />
              <Stat value="4+ yrs" label="Building" />
            </div>

            <div className="mt-8">
              <Magnetic strength={0.4}>
                <a
                  href={UPWORK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/btn relative inline-flex h-13 items-center gap-2.5 overflow-hidden rounded-full bg-[#14A800] px-7 py-3.5 font-display text-[15px] font-bold text-white"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-400 ease-out group-hover/btn:scale-x-100" />
                  <span className="relative z-10 transition-colors group-hover/btn:text-[#0E7A00]">Hire me on Upwork</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-[#0E7A00]" />
                </a>
              </Magnetic>
            </div>
          </TiltCard>
        </div>

        {/* direct */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-3xl border-2 border-black bg-primary px-8 py-7 text-white md:flex-row md:px-10">
            <div>
              <h3 className="font-display text-xl font-extrabold md:text-2xl">Or work with me directly</h3>
              <p className="mt-1 text-[15px] text-white/70">
                No platform fees, no middle layer. Tell me what is eating your time and I send a fixed quote within 24
                hours.
              </p>
            </div>
            <Magnetic strength={0.4}>
              <OnboardingModal
                trigger={
                  <button
                    data-cursor="hover"
                    className="group/btn inline-flex h-14 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-8 font-display text-[15px] font-bold text-primary transition-transform hover:scale-[1.04]"
                  >
                    Start your project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </button>
                }
              />
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
