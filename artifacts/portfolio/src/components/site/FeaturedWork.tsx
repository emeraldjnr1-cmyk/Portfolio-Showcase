import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Check, Play, Plus, X } from "lucide-react";
import { Reveal } from "@/components/fx/SplitWords";
import { buttonClass } from "@/components/site/Button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { featured, archive, TAG_STYLE, ArchiveItem, FeaturedProject, WorkflowTag } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

// Home shows six flagship systems; the rest open with "See all systems".
const SHOWN = 6;

/**
 * A featured card: plays its film, muted, while it is on screen.
 * On a phone the first card is full size and the others become compact rows
 * (cover on the left, name and result on the right), so six systems take a
 * couple of screens instead of six.
 */
function VideoCard({ project, index, onOpen }: { project: FeaturedProject; index: number; onOpen: (p: FeaturedProject) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px", amount: 0.4 });
  const [videoOk, setVideoOk] = useState(true);
  const style = TAG_STYLE[project.tag];
  const hasFilm = Boolean(project.video);
  const row = index > 0;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasFilm) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, hasFilm]);

  return (
    <div ref={ref} className="h-full">
      <Reveal className="h-full">
        <div
          className="group relative h-full cursor-pointer rounded-2xl"
          onClick={() => onOpen(project)}
          data-cursor-label="Play"
          // A div with onClick is invisible to keyboards and screen readers, so
          // the lightbox could only ever be opened with a mouse.
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.title} preview`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(project);
            }
          }}
          data-cursor="hover"
        >
          <div
            style={{ "--pop": style.glow } as CSSProperties}
            className={`relative h-full overflow-hidden rounded-2xl border-2 border-black/10 bg-white transition-[border-color,box-shadow,transform] duration-200 group-hover:border-black group-hover:shadow-[8px_8px_0_var(--pop)] group-active:scale-[0.99] ${row ? "flex sm:flex-col" : "flex flex-col"}`}
          >
            <div className={`relative aspect-video shrink-0 overflow-hidden bg-[#DDDBD2] ${row ? "max-sm:aspect-auto max-sm:w-[7.25rem]" : ""}`}>
              {hasFilm && videoOk ? (
                <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onError={() => setVideoOk(false)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  src={project.img}
                  alt=""
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              )}

              {hasFilm && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-[background-color,opacity] duration-200 group-hover:bg-black/25 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                    <Play className="h-6 w-6 fill-black text-black" aria-hidden />
                  </div>
                </div>
              )}
            </div>

            <div className={`flex flex-col items-start p-5 flex-1 md:p-6 ${row ? "max-sm:min-w-0 max-sm:flex-1 max-sm:p-3.5" : ""}`}>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${style.chip} ${row ? "max-sm:px-2 max-sm:py-0.5 max-sm:text-[11px]" : ""}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                {project.tag}
              </div>
              <h3 className={`mt-3 font-display text-xl font-bold text-black transition-colors group-hover:text-primary ${row ? "max-sm:mt-2 max-sm:text-base max-sm:leading-snug" : ""}`}>
                {project.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed text-ink-body ${row ? "max-sm:hidden" : ""}`}>{project.desc}</p>
              {/* The result, as the client would say it. */}
              <p className={`mt-auto flex items-start gap-1.5 pt-3 text-sm font-bold text-ink ${row ? "max-sm:pt-1.5 max-sm:text-[13px] max-sm:leading-snug" : ""}`}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-text" aria-hidden />
                {project.stat}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/** Full-screen player overlay. Falls back to the workflow screenshot while the film is unavailable. */
function Lightbox({ project, onClose }: { project: FeaturedProject | null; onClose: () => void }) {
  const [videoFailed, setVideoFailed] = useState(false);
  useEffect(() => setVideoFailed(false), [project]);

  // The prerender has no document to portal into, so it renders nothing here.
  // The first client render must match that exactly for hydration, so the
  // portal only appears after mount. Nothing is visible until a card is
  // clicked anyway.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Escape to close, and hold the page still underneath while it is open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  // Portalled to <body> on purpose, so no transformed ancestor can ever
  // become the containing block for this position: fixed overlay.
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} preview`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 md:p-12 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 4 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-white/20 bg-[#F6F5F1]"
            onClick={(e) => e.stopPropagation()}
          >
            {!project.video ? (
              <img src={project.img} alt={project.title} className="aspect-video w-full object-cover object-top" />
            ) : videoFailed ? (
              <div className="relative">
                <img src={project.img} alt={project.title} className="aspect-video w-full object-cover object-top" />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  Full film coming soon · system preview
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
                <p className="text-sm text-ink-body">{project.result}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span key={t} className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-xs font-medium text-ink-body">
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
    </AnimatePresence>,
    document.body,
  );
}

const FILTERS: Array<WorkflowTag | "All"> = ["All", "AI Agents", "n8n", "Make.com", "Airtable"];

// Everything not on a card above: the remaining flagship systems first, then
// the wider archive.
const MORE: ArchiveItem[] = [
  ...featured.slice(SHOWN).map((f) => ({ img: f.img, title: f.title, desc: f.desc, tag: f.tag })),
  ...archive,
];

/** The archive grid, opened by "See all systems". */
function ViewAllArchive() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<WorkflowTag | "All">("All");

  const items = filter === "All" ? MORE : MORE.filter((a) => a.tag === filter);

  return (
    <div className="mt-10 md:mt-12">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="all-systems"
          className={buttonClass({ variant: "outline", full: true })}
          data-cursor="hover"
        >
          {open ? "Close the list" : "See all systems"}
          <Plus className={`h-5 w-5 shrink-0 transition-transform duration-200 ease-out ${open ? "rotate-45" : ""}`} aria-hidden />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="all-systems"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {FILTERS.map((f) => {
                const active = filter === f;
                const count = f === "All" ? MORE.length : MORE.filter((a) => a.tag === f).length;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`relative min-h-11 rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors duration-200 ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-ink-label hover:border-black/50 hover:text-black"
                    }`}
                  >
                    {f} <span className={`ml-1 text-xs ${active ? "text-on-dark-label" : "text-ink-label"}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {items.map((item) => {
                const style = TAG_STYLE[item.tag];
                return (
                  <div
                    key={item.img}
                    className="group overflow-hidden rounded-xl border-2 border-black/10 bg-white transition-[border-color,box-shadow] duration-200 hover:border-black hover:shadow-[6px_6px_0_rgba(0,21,212,0.15)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#DDDBD2]">
                      <img
                        src={item.img}
                        alt=""
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                      <span className={`absolute left-2 top-2 rounded-full border px-2.5 py-0.5 text-[11px] font-bold sm:left-3 sm:top-3 ${style.chip}`}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-3.5 sm:p-5">
                      <h4 className="font-display text-[15px] font-bold leading-snug text-black sm:text-base">{item.title}</h4>
                      <p className="mt-1.5 hidden text-sm text-ink-body sm:block">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FeaturedWork() {
  const [openProject, setOpenProject] = useState<FeaturedProject | null>(null);

  return (
    <section id="work" className="section-y relative border-t border-black/10 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          num="03"
          label="Automations and AI agents"
          title="Featured systems. Real businesses. Zero manual work."
          lead="The flagship builds get the film treatment. Every card opens the real system, tools and outcome included."
        >
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold">
            <a href="/services/automation" className="tap inline-flex items-center gap-1.5 text-ink transition-colors hover:text-cobalt">
              Automation service <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="/services/ai-agents" className="tap inline-flex items-center gap-1.5 text-ink transition-colors hover:text-cobalt">
              AI agents service <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="/work" className="tap inline-flex items-center gap-1.5 text-ink transition-colors hover:text-cobalt">
              Every system, step by step <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </SectionHeader>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featured.slice(0, SHOWN).map((p, i) => (
            <VideoCard key={p.id} project={p} index={i} onOpen={setOpenProject} />
          ))}
        </div>

        <ViewAllArchive />
      </div>

      <Lightbox project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
