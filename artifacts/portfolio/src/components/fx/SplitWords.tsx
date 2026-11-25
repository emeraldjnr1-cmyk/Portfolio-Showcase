import { motion } from "framer-motion";
import { ReactNode } from "react";

// ── The site's one entrance ──
// A block fades in once as it enters the screen: 8px of travel, under 300ms,
// the site's ease-out. Nothing repeats and nothing moves with the scroll.
// MotionConfig (App.tsx) turns the travel off for reduced motion.
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.28;
const TRAVEL = 8;
// Delays are capped so a long stagger never holds content back.
const cap = (delay: number) => Math.min(delay, 0.12);

interface SplitWordsProps {
  text: string;
  className?: string;
  /** delay before the heading, seconds */
  delay?: number;
  /** kept for older callers; the heading now arrives as one block */
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

/** A heading that fades in once. The text is real text, read as written. */
export function SplitWords({ text, className = "", delay = 0, as = "div" }: SplitWordsProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: TRAVEL }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: DURATION, ease: EASE, delay: cap(delay) }}
    >
      <span>{text}</span>
    </Tag>
  );
}

/** The same entrance for whole blocks (paragraphs, cards, buttons). */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: TRAVEL }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: DURATION, ease: EASE, delay: cap(delay) }}
    >
      {children}
    </motion.div>
  );
}
