import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useMotionOff } from "@/lib/motion-pref";

/**
 * The system pointer always stays visible: replacing it can make it vanish
 * for low-vision visitors who enlarge their cursor. This adds a small label
 * beside the pointer, only over elements marked data-cursor-label ("Play",
 * "View"), and only on mouse-driven devices with motion allowed.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const off = useMotionOff();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches || off) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-label]");
      setLabel(t ? t.dataset.cursorLabel ?? null : null);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, off]);

  if (!enabled) return null;

  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-[99]" style={{ x: sx, y: sy }} aria-hidden>
      <AnimatePresence>
        {label && (
          <motion.span
            key="label"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="ml-4 mt-4 block whitespace-nowrap rounded-full border-2 border-black bg-white px-3 py-1 font-display text-xs font-bold text-black shadow-[3px_3px_0_#141414]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
