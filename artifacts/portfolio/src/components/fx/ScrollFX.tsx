import { ReactNode, useState } from "react";
import { motion, useScroll, useSpring, useVelocity, useTransform } from "framer-motion";

/** Thin cobalt progress line pinned to the very top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-primary"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

/** Velocity skew: the page shears slightly with scroll speed and springs back at rest.
 * The spring output snaps to exactly 0 below a small threshold — without this the
 * transform keeps micro-changing after scrolling stops, forcing the browser to
 * re-rasterize the whole subtree (playing <video> elements visibly glitch). */
export function VelocitySkew({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const raw = useTransform(velocity, [-2500, 0, 2500], [-1.6, 0, 1.6]);
  const sprung = useSpring(raw, { stiffness: 250, damping: 40, mass: 0.6 });
  const skewY = useTransform(sprung, (v) => (Math.abs(v) < 0.04 ? 0 : v));
  return <motion.div style={{ skewY }}>{children}</motion.div>;
}

/** Curtain-wipe image reveal: unmasks upward while settling from a slight zoom.
 * Once the entrance finishes, both animated wrappers drop their live styles entirely —
 * a lingering clip-path/transform on a <video> ancestor blocks clean GPU compositing. */
export function MaskReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [done, setDone] = useState(false);

  if (done) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.div
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay }}
        onAnimationComplete={() => setDone(true)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
