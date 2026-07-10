import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;
const WORDS = ["Claude Code", "n8n", "Make.com", "Airtable", "AI Agents"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => setWord((w) => Math.min(w + 1, WORDS.length - 1)), 320);
    const t = setTimeout(() => setShow(false), 2100);
    return () => {
      clearInterval(cycle);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141414]"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: EASE } }}
        >
          <div className="flex items-baseline gap-3 overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.1 } }}
              className="font-display text-2xl font-bold tracking-tight text-[#E7E7E1] md:text-4xl"
            >
              Denver builds with
            </motion.span>
            <span className="relative inline-block h-[1.3em] min-w-[8ch] overflow-hidden align-baseline">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={word}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.24, ease: EASE }}
                  className="absolute left-0 font-editorial text-2xl text-[#84DEF9] md:text-4xl whitespace-nowrap"
                >
                  {WORDS[word]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <motion.div
            className="absolute bottom-10 left-0 right-0 mx-auto h-px w-40 origin-left bg-[#E7E7E1]/25"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 1.7, ease: "easeInOut", delay: 0.15 } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
