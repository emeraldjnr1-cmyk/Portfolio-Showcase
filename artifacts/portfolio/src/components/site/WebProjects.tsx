import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/fx/SplitWords";
import { SectionHeader } from "@/components/site/SectionHeader";
import { inkFor } from "@/lib/tones";
import { webProjects, WebProject } from "@/data/portfolio";

const POPS = ["#0015D4", "#F32317", "#FFCB41", "#FF8FCA", "#84DEF9", "#0015D4"];

/** Plays a muted film while it is on screen, pauses it when it leaves. */
function usePlayInView(has: boolean, margin: "-15% 0px" | "-10% 0px", amount: number) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin, amount });
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !has) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, has]);
  return { ref, videoRef };
}

/** Big editorial row for a lead project: the film or cover beside its story. */
export function FeatureRow({ project, index }: { project: WebProject; index: number }) {
  const [videoOk, setVideoOk] = useState(true);
  const [muted, setMuted] = useState(true);
  const { ref, videoRef } = usePlayInView(Boolean(project.video), "-15% 0px", 0.4);
  const flip = index % 2 === 1;
  const pop = POPS[index % POPS.length];

  return (
    <div ref={ref} className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
      <Reveal className={`group relative md:col-span-8 ${flip ? "md:order-2" : ""}`}>
        <div
          style={{ "--pop": pop } as CSSProperties}
          className="relative aspect-video overflow-hidden rounded-2xl border-2 border-black/10 bg-[#DDDBD2] transition-[border-color,box-shadow] duration-200 group-hover:border-black group-hover:shadow-[10px_10px_0_var(--pop)]"
          data-cursor="hover"
        >
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
              aria-label={`${project.name}, ${project.kind}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={project.img}
              alt={`${project.name}, ${project.kind}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          )}
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
      </Reveal>

      <div className={`md:col-span-4 ${flip ? "md:order-1 md:text-right" : ""}`}>
        <Reveal delay={0.06}>
          <p className="type-label" style={{ color: inkFor(pop) }}>
            {project.kind}
          </p>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-black md:mt-3 md:text-4xl">{project.name}</h3>
          <p className="mt-3 leading-relaxed text-ink-body md:mt-4">{project.desc}</p>
          <div className={`mt-4 flex flex-wrap gap-2 md:mt-5 ${flip ? "md:justify-end" : ""}`}>
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

/**
 * Compact card for the remaining projects. `dense` is the home grid: two
 * across on a phone, so the card keeps its cover, name and kind and leaves
 * the description to wider screens.
 */
export function CompactCard({
  project,
  index,
  dense = false,
  className = "",
}: {
  project: WebProject;
  index: number;
  dense?: boolean;
  className?: string;
}) {
  const pop = POPS[(index + 4) % POPS.length];
  const [videoOk, setVideoOk] = useState(true);
  const { ref, videoRef } = usePlayInView(Boolean(project.video), "-10% 0px", 0.3);
  return (
    <div ref={ref} className={`h-full ${className}`}>
      <Reveal className="h-full">
        <div
          style={{ "--pop": pop } as CSSProperties}
          className="group h-full overflow-hidden rounded-2xl border-2 border-black/10 bg-white transition-[border-color,box-shadow] duration-200 hover:border-black hover:shadow-[6px_6px_0_var(--pop)]"
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
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <img
                src={project.img}
                alt={`${project.name}, ${project.kind}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            )}
          </div>
          <div className={dense ? "p-3.5 sm:p-5" : "p-5"}>
            <p className={`font-mono font-bold uppercase text-ink-label ${dense ? "text-[10px] tracking-wider sm:text-[11px] sm:tracking-widest" : "text-[11px] tracking-widest"}`}>
              {project.kind}
            </p>
            <h3 className={`mt-1 font-display font-extrabold text-black ${dense ? "text-lg sm:text-xl" : "text-xl"}`}>{project.name}</h3>
            <p className={`mt-1.5 text-sm text-ink-body ${dense ? "hidden leading-relaxed sm:block" : "line-clamp-1"}`}>{project.desc}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// Home: the two builds with films lead, the rest sit in an even grid.
const LEADS = 2;

export function WebProjectsSection() {
  const leads = webProjects.slice(0, LEADS);
  const rest = webProjects.slice(LEADS);
  // Two across below the desktop grid: an odd last card takes the full row
  // instead of sitting alone beside a hole.
  const oddTwo = rest.length % 2 === 1;
  const lastSpan = rest.length % 3 === 0 ? "max-lg:col-span-2" : "col-span-2 lg:col-span-1";

  return (
    <section id="websites" className="section-y relative border-t border-black/10 bg-card px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          num="01"
          label="Apps and websites"
          title="Products designed and shipped with Claude Code."
          lead="Dashboards, storefronts, booking flows and AI products. Full builds, not templates."
        >
          <a href="/services/websites-apps" className="tap mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-cobalt">
            Websites and web apps service <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </SectionHeader>

        <div className="space-y-12 md:space-y-20">
          {leads.map((p, i) => (
            <FeatureRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:mt-20 lg:grid-cols-3">
          {rest.map((p, i) => (
            <CompactCard
              key={p.slug}
              project={p}
              index={i}
              dense
              className={oddTwo && i === rest.length - 1 ? lastSpan : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
