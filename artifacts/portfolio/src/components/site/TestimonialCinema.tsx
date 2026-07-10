import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { testimonials } from "@/data/portfolio";

const EASE = [0.32, 0.72, 0, 1] as const;

export function TestimonialCinema() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    v.play().catch(() => {});
  }, [current, muted]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
    exit: (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: EASE } }),
  };

  return (
    <section id="clients" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40 overflow-hidden">
      {/* giant background word */}
      <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none font-display text-[16vw] font-extrabold leading-none text-black/[0.04]">
        PROOF
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">03 — Client stories</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Don't take my word for it."
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl justify-center flex flex-wrap"
          />
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={() => go(-1)}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black/20 text-black transition-all hover:border-black hover:bg-black hover:text-white"
            aria-label="Previous testimonial"
            data-cursor="hover"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div className="flex-1">
            <div
              className={`relative mx-auto overflow-hidden rounded-3xl border-2 border-black bg-black shadow-2xl transition-all duration-500 ${
                t.aspect === "portrait" ? "max-w-sm aspect-[9/16] max-h-[70vh]" : "w-full aspect-video"
              }`}
            >
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <video
                    // Callback ref: only capture on attach. AnimatePresence unmounts the
                    // OLD slide after the new one mounts — a plain ref object would get
                    // nulled by that late unmount, silently breaking the mute toggle for
                    // every slide after the first.
                    ref={(el) => {
                      if (el) videoRef.current = el;
                    }}
                    src={t.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    aria-label={`Video testimonial from ${t.name}`}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-primary"
                aria-label={muted ? "Unmute" : "Mute"}
                data-cursor="hover"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.15 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                className="mx-auto mt-8 max-w-lg text-center"
              >
                <p className="font-editorial text-xl text-black/85 md:text-2xl">"{t.quote}"</p>
                <p className="mt-3 font-display text-sm font-bold uppercase tracking-widest text-primary">{t.name}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setMuted(true);
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "h-2 w-8 bg-primary" : "h-2 w-2 bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => go(1)}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black/20 text-black transition-all hover:border-black hover:bg-black hover:text-white"
            aria-label="Next testimonial"
            data-cursor="hover"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
