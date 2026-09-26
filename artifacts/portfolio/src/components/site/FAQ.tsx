import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { Magnetic } from "@/components/fx/Magnetic";
import { OnboardingModal } from "@/components/site/OnboardingModal";
import { Avatar } from "@/components/site/Portrait";
import { FAQS } from "@/data/faqs";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Sticky intro column */}
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">08 — Questions</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Asked all the time."
            className="mt-4 flex flex-wrap font-display text-4xl font-extrabold tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.2}>
            <div className="mt-6 flex max-w-sm items-center gap-3.5">
              <Avatar size={52} ring="#0015D4" />
              <p className="font-editorial text-xl text-black/60">
                Something else on your mind? Ask me directly.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8">
              <Magnetic strength={0.4}>
                <OnboardingModal
                  trigger={
                    <button
                      className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 font-display text-base font-bold text-white transition-transform hover:scale-[1.03]"
                      data-cursor="hover"
                    >
                      Start your project
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  }
                />
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Accordion */}
        <div className="border-t border-black/15">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-black/15">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-6 text-left"
                  data-cursor="hover"
                >
                  <span className={`font-mono text-sm transition-colors ${isOpen ? "text-primary" : "text-black/35"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-lg font-bold transition-colors md:text-xl ${
                      isOpen ? "text-primary" : "text-black"
                    }`}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isOpen ? "border-primary bg-primary text-white" : "border-black/25 text-black"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-10 font-editorial text-lg leading-relaxed text-black/65 md:pl-12">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Closed answers stay in the HTML so crawlers read all six. */}
                {!isOpen && <p hidden>{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
