import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { Magnetic } from "@/components/fx/Magnetic";
import { OnboardingModal } from "@/components/site/OnboardingModal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "What exactly do you build?",
    a: "Two things: websites and web apps shipped with Claude Code, and automation systems built on n8n, Make.com and Airtable. If a task eats your team's hours every week, I can probably turn it into a system that runs itself.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope. A focused automation usually starts around the price of one week of the manual work it replaces. Once you fill the onboarding form I send a fixed quote within 24 hours, so there are never surprises.",
  },
  {
    q: "How long does a build take?",
    a: "Most automations ship in 3 to 7 days. Websites and bigger app builds run 1 to 3 weeks. You get progress updates as we go, not silence until delivery.",
  },
  {
    q: "Do I need to be technical to use what you build?",
    a: "No. Everything is delivered with a walkthrough video and simple docs. If you can use a spreadsheet, you can run your system. And you own everything, including all accounts and credentials.",
  },
  {
    q: "What happens after delivery?",
    a: "Every project includes a support window for fixes and tweaks at no cost. After that you can keep me on retainer or just message me when something new comes up. Most clients come back for a second system.",
  },
  {
    q: "How do we get started?",
    a: "Fill the short onboarding form or message me on WhatsApp. I review what you need, ask a couple of questions, and send you a plan with a fixed price. No calls required unless you want one.",
  },
];

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
            <p className="mt-6 max-w-sm font-editorial text-xl text-black/60">
              Something else on your mind? Ask me directly.
            </p>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
