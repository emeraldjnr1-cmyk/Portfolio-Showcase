import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { webProjects, WebProject } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;
const POPS = ["#0015D4", "#F32317", "#FFCB41", "#FF8FCA", "#84DEF9", "#0015D4"];

/** Big editorial row for the first four projects — image drifts with scroll (parallax). */
function FeatureRow({ project, index }: { project: WebProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const flip = index % 2 === 1;
  const pop = POPS[index % POPS.length];

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
          className="relative overflow-hidden rounded-2xl border-2 border-black/10 transition-all duration-500 group-hover:border-black"
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `10px 10px 0 ${pop}`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <motion.img
            src={project.img}
            alt={`${project.name} — ${project.kind}`}
            loading="lazy"
            style={{ y: imgY, scale: 1.12 }}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.16]"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-5 left-6 font-display text-[5rem] font-extrabold leading-none text-stroke md:text-[7rem]">
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      <div className={`md:col-span-4 ${flip ? "md:order-1 md:text-right" : ""}`}>
        <Reveal delay={0.15}>
          <p className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: pop === "#FFCB41" ? "#B8860B" : pop }}>
            {project.kind}
          </p>
          <h3 className="mt-3 font-display text-3xl font-extrabold text-black md:text-4xl">{project.name}</h3>
          <p className="mt-4 leading-relaxed text-black/55">{project.desc}</p>
          <div className={`mt-5 flex flex-wrap gap-2 ${flip ? "md:justify-end" : ""}`}>
            {project.stack.map((s) => (
              <span key={s} className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-xs font-medium text-black/70">
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
function CompactCard({ project, index }: { project: WebProject; index: number }) {
  const pop = POPS[(index + 4) % POPS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
      className="group overflow-hidden rounded-2xl border-2 border-black/10 bg-white transition-all duration-400 hover:border-black"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `6px 6px 0 ${pop}`)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      data-cursor="hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#DDDBD2]">
        <img
          src={project.img}
          alt={`${project.name} — ${project.kind}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-black/40">{project.kind}</p>
        <h3 className="mt-1 font-display text-xl font-extrabold text-black">{project.name}</h3>
        <p className="mt-1.5 text-sm text-black/55 line-clamp-1">{project.desc}</p>
      </div>
    </motion.div>
  );
}

export function WebProjectsSection() {
  const heroProjects = webProjects.slice(0, 4);
  const gridProjects = webProjects.slice(4);

  return (
    <section id="websites" className="relative border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:mb-28">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">02 — Websites & apps</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Products designed and shipped with Claude Code."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg text-black/55">
              Dashboards, storefronts, booking flows, AI products — full builds, not templates.
            </p>
          </Reveal>
        </div>

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
