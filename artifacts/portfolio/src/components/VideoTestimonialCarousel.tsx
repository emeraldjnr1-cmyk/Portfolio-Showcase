import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    src: "https://res.cloudinary.com/dtyrmuton/video/upload/v1776458122/Jenny_vt_3_ujgrda.mp4",
    name: "Jenny Malafrina",
    quote: "Working with Denver completely changed how our business handles client onboarding.",
  },
  {
    src: "https://res.cloudinary.com/dtyrmuton/video/upload/v1776458153/shiehk_video_testimonial_1_2_xhgkoy.mp4",
    name: "Shiekh Shadi Shuvo",
    quote: "The automation system Denver built saves us hours every single day.",
  },
  {
    src: "https://res.cloudinary.com/dtyrmuton/video/upload/v1776458159/mike_schimdht_video_testimonial_3_vrmmgi.mp4",
    name: "Mike Schmidt",
    quote: "Professional, reliable, and genuinely invested in delivering results.",
  },
];

interface VideoCardProps {
  src: string;
  name: string;
  active: boolean;
}

function VideoCard({ src, name, active }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      setShowControls(false);
    }
  }, [active]);

  const handleClick = useCallback(() => {
    setShowControls((prev) => !prev);
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="w-full h-full cursor-pointer select-none"
      onClick={handleClick}
      data-testid={`video-testimonial-${name.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        controls={showControls}
        preload="metadata"
        className="w-full h-full object-cover rounded-3xl"
        style={{ display: "block" }}
        aria-label={`Video testimonial from ${name}`}
      />
    </div>
  );
}

export function VideoTestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + videos.length) % videos.length);
    },
    []
  );

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (d: number) => ({
      x: d > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.94,
      transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
    }),
  };

  return (
    <div className="w-full max-w-sm mx-auto sm:max-w-none">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Prev Button */}
        <button
          onClick={() => go(-1)}
          className="shrink-0 w-11 h-11 rounded-full border-2 border-border bg-white hover:bg-primary hover:border-primary hover:text-white text-foreground transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
          aria-label="Previous testimonial"
          data-testid="btn-video-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Video + info */}
        <div className="flex-1 flex flex-col items-center gap-6">
          {/* Aspect ratio wrapper */}
          <div className="relative w-full overflow-hidden rounded-3xl shadow-xl border border-border/60"
            style={{ aspectRatio: "9/16", maxHeight: "72vh" }}>
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <VideoCard
                  src={videos[current].src}
                  name={videos[current].name}
                  active={true}
                />
              </motion.div>
            </AnimatePresence>

            {/* Tap to toggle controls hint */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
              <span className="text-xs text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                Tap to toggle controls
              </span>
            </div>
          </div>

          {/* Name + quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.15 } }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="text-center px-2"
            >
              <p className="font-bold text-lg text-foreground mb-1">{videos[current].name}</p>
              <p className="text-muted-foreground italic text-sm leading-relaxed">
                "{videos[current].quote}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {videos.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                data-testid={`dot-video-${i}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => go(1)}
          className="shrink-0 w-11 h-11 rounded-full border-2 border-border bg-white hover:bg-primary hover:border-primary hover:text-white text-foreground transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
          aria-label="Next testimonial"
          data-testid="btn-video-next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
