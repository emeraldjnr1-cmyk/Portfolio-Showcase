import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;
const WORDS = ["Claude Code", "n8n", "Make.com", "AI Agents"];
const SEEN = "dnc-intro-seen";
// Google wants the main content visible within 2.5s, so the intro gets under
// a second, and only once per visit.
const HOLD_MS = 950;

/**
 * First visit in a session only, and never for visitors who asked for less
 * motion. An inline script in index.html decides before first paint and sets
 * <html data-intro>, which CSS covers with the same dark colour, so the page
 * never flashes underneath before this component mounts. Everyone else gets
 * the page immediately.
 *
 * The first render is always "no intro" on both the prerender and the client,
 * so hydration matches the static HTML. The real decision is read in a layout
 * effect, before the browser paints, with the CSS cover still up.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);
  const [word, setWord] = useState(0);

  useLayoutEffect(() => {
    if (document.documentElement.dataset.intro !== "1") {
      onDone();
      return;
    }
    setShow(true);
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      // Blocked storage: the intro may show again next time, which is harmless.
    }
    const cycle = setInterval(() => setWord((w) => Math.min(w + 1, WORDS.length - 1)), HOLD_MS / WORDS.length);
    const t = setTimeout(() => {
      // The React overlay sits on top of the CSS cover, so dropping the cover
      // now cannot flash; the overlay then slides away on its own.
      delete document.documentElement.dataset.intro;
      setShow(false);
      onDone();
    }, HOLD_MS);
    // Failsafe: hard-remove even if the exit animation never runs (throttled rAF, background tab).
    const kill = setTimeout(() => {
      delete document.documentElement.dataset.intro;
      setGone(true);
    }, HOLD_MS + 1200);
    return () => {
      clearInterval(cycle);
      clearTimeout(t);
      clearTimeout(kill);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141414]"
          exit={{ y: "-100%", transition: { duration: 0.6, ease: EASE } }}
        >
          <div className="flex items-baseline gap-3 overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0, transition: { duration: 0.4, ease: EASE } }}
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
                  transition={{ duration: 0.18, ease: EASE }}
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
            animate={{ scaleX: 1, transition: { duration: HOLD_MS / 1000, ease: "easeInOut" } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
