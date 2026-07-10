import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { featured, archive, TAG_STYLE, FeaturedProject, WorkflowTag } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A featured card: autoplays its 60s cinematic video when scrolled into view. */
function VideoCard({ project, index, onOpen }: { project: FeaturedProject; index: number; onOpen: (p: FeaturedProject) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px", amount: 0.4 });
  const [videoOk, setVideoOk] = useState(true);
  const style = TAG_STYLE[project.tag];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.12 }}
      className="group relative cursor-pointer"
      onClick={() => onOpen(project)}
      data-cursor="hover"
    >
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-black/10 bg-white transition-all duration-500 group-hover:border-black"
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `8px 8px 0 ${style.glow}`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div className="relative aspect-video overflow-hidden bg-[#DDDBD2]">
          {videoOk ? (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.poster}
              muted
              loop
              playsInline
              preload="none"
              onError={() => setVideoOk(false)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <img
              src={project.img}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-400 group-hover:bg-black/25 group-hover:opacity-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white scale-75 transition-transform duration-400 group-hover:scale-100 shadow-lg">
              <Play className="h-6 w-6 text-black fill-black" />
            </div>
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-black px-2.5 py-1 font-display text-xs font-bold text-white">
            {String(project.id).padStart(2, "0")}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${style.chip}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {project.tag}
            </div>
            <h3 className="font-display text-xl font-bold text-black transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-black/55 line-clamp-2">{project.desc}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-black/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
}

/** Full-screen player overlay. Falls back to the workflow screenshot while the film is unavailable. */
function Lightbox({ project, onClose }: { project: FeaturedProject | null; onClose: () => void }) {
  const [videoFailed, setVideoFailed] = useState(false);
  useEffect(() => setVideoFailed(false), [project]);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 md:p-12 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-white/20 bg-[#F6F5F1]"
            onClick={(e) => e.stopPropagation()}
          >
            {videoFailed ? (
              <div className="relative">
                <img src={project.img} alt={project.title} className="aspect-video w-full object-cover object-top" />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  Full film coming soon — system preview
                </span>
              </div>
            ) : (
              <video
                src={project.video}
                poster={project.poster}
                autoPlay
                controls
                playsInline
                onError={() => setVideoFailed(true)}
                className="aspect-video w-full bg-black"
              />
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <h3 className="font-display text-lg font-bold text-black">{project.title}</h3>
                <p className="text-sm text-black/55">{project.result}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span key={t} className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-xs font-medium text-black/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md transition-colors hover:bg-primary hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FILTERS: Array<WorkflowTag | "All"> = ["All", "AI Agents", "n8n", "Make.com", "Airtable"];

/** The expandable archive grid, revealed by "View all systems". */
function ViewAllArchive() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<WorkflowTag | "All">("All");

  const items = filter === "All" ? archive : archive.filter((a) => a.tag === filter);

  return (
    <div className="mt-16">
      <div className="flex justify-center">
        <motion.button
          onClick={() => setOpen((v) => !v)}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-black px-8 py-4 font-display text-sm font-bold text-black transition-colors"
          whileTap={{ scale: 0.97 }}
          data-cursor="hover"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-400 ease-out group-hover:scale-y-100" />
          <span className="relative z-10 transition-colors group-hover:text-white">
            {open ? "Close archive" : `View all ${archive.length} systems`}
          </span>
          <motion.span
            className="relative z-10 transition-colors group-hover:text-white"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {FILTERS.map((f) => {
                const active = filter === f;
                const count = f === "All" ? archive.length : archive.filter((a) => a.tag === f).length;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-300 ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-black/50 hover:border-black/50 hover:text-black"
                    }`}
                  >
                    {f} <span className="ml-1 text-xs opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>

            <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  const style = TAG_STYLE[item.tag];
                  return (
                    <motion.div
                      key={item.img}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="group overflow-hidden rounded-xl border-2 border-black/10 bg-white transition-all hover:border-black hover:shadow-[6px_6px_0_rgba(0,21,212,0.15)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#DDDBD2]">
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-all duration-600 group-hover:scale-105"
                        />
                        <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${style.chip}`}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="p-5">
                        <h4 className="font-display text-base font-bold text-black group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-sm text-black/55 line-clamp-2">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FeaturedWork() {
  const [openProject, setOpenProject] = useState<FeaturedProject | null>(null);

  return (
    <section id="work" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">02 — Featured automation systems</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Ten systems. Real businesses. Zero manual work."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg text-black/55">
              Each flagship build gets the film treatment — press play, watch the system work.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {featured.map((p, i) => (
            <VideoCard key={p.id} project={p} index={i} onOpen={setOpenProject} />
          ))}
        </div>

        <ViewAllArchive />
      </div>

      <Lightbox project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
