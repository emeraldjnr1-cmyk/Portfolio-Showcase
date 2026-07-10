import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SplitWordsProps {
  text: string;
  className?: string;
  /** delay before the first word, seconds */
  delay?: number;
  /** per-word stagger, seconds */
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

/** Scroll-triggered word-by-word reveal: each word slides up from a masked line. */
export function SplitWords({ text, className = "", delay = 0, stagger = 0.045, once = true, as = "div" }: SplitWordsProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              visible: { y: 0, rotate: 0, transition: { duration: 0.75, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}

/** A masked line reveal for whole blocks (paragraphs, buttons). */
export function Reveal({ children, className = "", delay = 0, y = 40 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
