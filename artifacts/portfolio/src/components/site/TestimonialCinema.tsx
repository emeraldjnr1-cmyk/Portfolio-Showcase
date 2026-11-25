import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { testimonials } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TestimonialCinema() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Nothing downloads or plays until the player is near the screen.
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { margin: "200px 0px" });

  const t = testimonials[current];

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setMuted(true);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [current, muted, inView]);

  const arrow =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black/25 text-black transition-[background-color,border-color,color,transform] duration-150 ease-out hover:border-black hover:bg-black hover:text-white active:scale-[0.97]";

  return (
    <section id="clients" className="section-y border-t border-black/10 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader num="06" label="Client stories" title="Don't take my word for it." />

        <div className="flex items-center gap-4 md:gap-8">
          <button type="button" onClick={() => go(-1)} className={`${arrow} max-md:hidden`} aria-label="Previous testimonial" data-cursor="hover">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="min-w-0 flex-1">
            <div
              ref={frameRef}
              className={`relative mx-auto overflow-hidden rounded-3xl border-2 border-black bg-black ${
                t.aspect === "portrait" ? "aspect-[9/16] max-h-[70vh] max-w-sm" : "aspect-video w-full"
              }`}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: direction * 8 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="absolute inset-0"
                >
                  <video
                    // Callback ref: only capture on attach. AnimatePresence unmounts the
                    // OLD slide after the new one mounts; a plain ref object would get
                    // nulled by that late unmount, silently breaking the mute toggle for
                    // every slide after the first.
                    ref={(el) => {
                      if (el) videoRef.current = el;
                    }}
                    src={t.src}
                    poster={t.poster}
                    muted
                    loop
                    playsInline
                    preload={inView ? "auto" : "none"}
                    className="h-full w-full object-cover"
                    aria-label={`Video testimonial from ${t.name}`}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-primary"
                aria-label={muted ? "Unmute" : "Mute"}
                data-cursor="hover"
              >
                {muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
              </button>
            </div>

            {/* The quote box keeps a steady height, so the controls under it
                do not jump from one client to the next. */}
            <div key={current} className="mx-auto mt-6 flex min-h-[7.5rem] max-w-lg flex-col justify-center text-center md:mt-8 md:min-h-[6.5rem]">
              <p className="font-editorial text-xl text-ink-body md:text-2xl">"{t.quote}"</p>
              <p className="mt-3 font-display text-sm font-bold uppercase tracking-widest text-primary">{t.name}</p>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              <button type="button" onClick={() => go(-1)} className={`${arrow} md:hidden`} aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <div className="flex items-center justify-center gap-1" role="tablist" aria-label="Testimonials">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setMuted(true);
                      setCurrent(i);
                    }}
                    className="group flex h-11 min-w-6 items-center justify-center px-1"
                  >
                    <span
                      className={`block h-2 rounded-full transition-[width,background-color] duration-200 ${
                        i === current ? "w-8 bg-cobalt" : "w-2 bg-black/35 group-hover:bg-black/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => go(1)} className={`${arrow} md:hidden`} aria-label="Next testimonial">
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <button type="button" onClick={() => go(1)} className={`${arrow} max-md:hidden`} aria-label="Next testimonial" data-cursor="hover">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
