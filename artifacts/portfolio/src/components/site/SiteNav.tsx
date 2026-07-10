import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Magnetic } from "@/components/fx/Magnetic";
import { WHATSAPP } from "@/data/portfolio";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Websites", href: "#websites" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "About", href: "#about" },
];

export function SiteNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
    setScrolled(y > 40);
  });

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mx-auto flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled ? "py-3 bg-[#E7E7E1]/80 backdrop-blur-xl border-b border-black/10" : "py-6 bg-transparent"
        }`}
      >
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-black">
          Denver<span className="text-primary">®</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-black/60 transition-colors hover:text-black"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Magnetic>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
          >
            Let's talk
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#84DEF9] animate-pulse" />
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}
