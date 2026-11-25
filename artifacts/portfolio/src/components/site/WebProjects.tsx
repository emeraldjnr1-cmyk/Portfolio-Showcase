import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/fx/SplitWords";
import { SectionHeader } from "@/components/site/SectionHeader";
import { inkFor } from "@/lib/tones";
import { MaskReveal } from "@/components/fx/ScrollFX";
import { webProjects, WebProject } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;
const POPS = ["#0015D4", "#F32317", "#FFCB41", "#FF8FCA", "#84DEF9", "#0015D4"];

/** Big editorial row for the first four projects — image drifts with scroll (parallax). */
export function FeatureRow({ project, index }: { project: WebProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [muted, setMuted] = useState(true);
  const inView = useInView(ref, { margin: "-15% 0px", amount: 0.4 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const flip = index % 2 === 1;
  const pop = POPS[index % POPS.length];

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !project.video) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, project.video]);

  return (
    <div ref={ref} className="grid items-center gap-8 md:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`group relative md:col-span-8 ${flip ? "md:order-2" : ""}`}
        data-cursor="hover"
      >
        <div
          style={{ "--pop": pop } as CSSProperties}
          className="relative overflow-hidden rounded-2xl border-2 border-black/10 transition-[border-color,box-shadow] duration-200 group-hover:border-black group-hover:shadow-[10px_10px_0_var(--pop)]"
        >
          <MaskReveal>
            {project.video && videoOk ? (
              <video
                ref={videoRef}
                src={project.video}
                poster={project.poster}
                muted
                loop
                playsInline
                preload="none"
                onError={() => setVideoOk(false)}
                className="w-full transform-gpu"
                style={{ backfaceVisibility: "hidden" }}
              />
            ) : (
              <motion.img
                src={project.img}
                alt={`${project.name}, ${project.kind}`}
                loading="lazy"
                style={{ y: imgY, scale: 1.12 }}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.16]"
              />
            )}
          </MaskReveal>
          {project.video && videoOk && (
            <button
              type="button"
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = !v.muted;
                setMuted(v.muted);
              }}
              data-sound
              className="absolute bottom-3 right-3 inline-flex h-11 items-center gap-2 rounded-full bg-black/80 px-4 text-sm font-bold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-cobalt active:scale-[0.97]"
            >
              {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
              {muted ? "Unmute" : "Mute"}
            </button>
          )}
        </div>
        <div className="pointer-events-none absolute -bottom-5 left-6 font-display text-[5rem] font-extrabold leading-none text-stroke md:text-[7rem]">
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      <div className={`md:col-span-4 ${flip ? "md:order-1 md:text-right" : ""}`}>
        <Reveal delay={0.15}>
          <p className="type-label" style={{ color: inkFor(pop) }}>
            {project.kind}
          </p>
          <h3 className="mt-3 font-display text-3xl font-extrabold text-black md:text-4xl">{project.name}</h3>
          <p className="mt-4 leading-relaxed text-ink-body">{project.desc}</p>
          <div className={`mt-5 flex flex-wrap gap-2 ${flip ? "md:justify-end" : ""}`}>
            {project.stack.map((s) => (
              <span key={s} className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-xs font-medium text-ink-body">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/** Compact card for the remaining projects. */
export function CompactCard({ project, index }: { project: WebProject; index: number }) {
  const pop = POPS[(index + 4) % POPS.length];
  // Cards with a film play it muted while on screen, like the FeatureRow, so a
  // gallery of demos moves instead of sitting as stills.
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const inView = useInView(ref, { margin: "-10% 0px", amount: 0.3 });
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !project.video) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, project.video]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
      style={{ "--pop": pop } as CSSProperties}
      className="group overflow-hidden rounded-2xl border-2 border-black/10 bg-white transition-[border-color,box-shadow] duration-200 hover:border-black hover:shadow-[6px_6px_0_var(--pop)]"
      data-cursor="hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#DDDBD2]">
        {project.video && videoOk ? (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.poster ?? project.img}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setVideoOk(false)}
            aria-label={`${project.name}, ${project.kind}`}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={project.img}
            alt={`${project.name}, ${project.kind}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-label">{project.kind}</p>
        <h3 className="mt-1 font-display text-xl font-extrabold text-black">{project.name}</h3>
        <p className="mt-1.5 text-sm text-ink-body line-clamp-1">{project.desc}</p>
      </div>
    </motion.div>
  );
}

export function WebProjectsSection() {
  const heroProjects = webProjects.slice(0, 4);
  const gridProjects = webProjects.slice(4);

  return (
    <section id="websites" className="section-y relative border-t border-black/10 bg-card px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          num="02"
          label="Apps and websites"
          title="Products designed and shipped with Claude Code."
          lead="Dashboards, storefronts, booking flows and AI products. Full builds, not templates."
          className="md:!mb-20"
        >
          <a href="/services/websites-apps" className="tap mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-cobalt">
            Websites and web apps service <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </SectionHeader>

        <div className="space-y-24 md:space-y-32">
          {heroProjects.map((p, i) => (
            <FeatureRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-32">
          {gridProjects.map((p, i) => (
            <CompactCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
