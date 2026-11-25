import { motion, useScroll, useSpring } from "framer-motion";

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
