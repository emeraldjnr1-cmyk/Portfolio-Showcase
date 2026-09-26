import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Magnetic } from "@/components/fx/Magnetic";
import { Logo } from "@/components/site/Logo";
import { WHATSAPP } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Claude Code", href: "#websites" },
  { label: "Toolkit", href: "#stack" },
  { label: "Clients", href: "#clients" },
  { label: "Hire me", href: "#hire" },
  { label: "About", href: "#about" },
];

export function SiteNav() {
  // Section anchors only exist on the home page; elsewhere they go via "/".
  const [location] = useLocation();
  const onHome = location === "/";
  const links = onHome ? LINKS : LINKS.map((l) => (l.href.startsWith("#") ? { ...l, href: `/${l.href}` } : l));
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    // Never retract the header while the menu is open, or the close button
    // slides off screen with it.
    setHidden(!menuOpen && y > prev && y > 300);
    setScrolled(y > 40);
  });

  // Escape to close, and hold the page still behind the panel.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 z-50 w-full"
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          className={`mx-auto flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
            scrolled && !menuOpen
              ? "py-3 bg-[#E7E7E1]/95 md:bg-[#E7E7E1]/80 md:backdrop-blur-xl border-b border-black/10"
              : "py-6 bg-transparent"
          }`}
        >
          <a href={onHome ? "#top" : "/"} className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-black">
            <Logo size={24} />
            Denver<span className="text-primary">®</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => {
              const current = l.href.startsWith("/") && !l.href.includes("#") && location.startsWith(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={`group relative text-sm font-medium transition-colors hover:text-black ${current ? "text-black" : "text-black/60"}`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 group-hover:w-full ${current ? "w-full" : "w-0"}`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary sm:inline-flex"
              >
                Let's talk
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#84DEF9] animate-pulse" />
              </a>
            </Magnetic>

            {/* Burger: the six section links had no mobile equivalent at all */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/20 bg-white/90 lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  className="absolute left-0 block h-[2px] w-5 rounded-full bg-black"
                  animate={menuOpen ? { top: 7, rotate: 45 } : { top: 2, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] block h-[2px] w-5 rounded-full bg-black"
                  animate={menuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 block h-[2px] w-5 rounded-full bg-black"
                  animate={menuOpen ? { top: 7, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-[#E7E7E1] px-8 pb-8 pt-24 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.055, duration: 0.5, ease: EASE }}
                  className="group flex items-center justify-between border-b border-black/10 py-3 font-display text-[28px] leading-tight font-extrabold tracking-tight text-black"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-black/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-black/25 transition-transform group-active:translate-x-1" />
                </motion.a>
              ))}
            </nav>

            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + LINKS.length * 0.055, duration: 0.5, ease: EASE }}
              className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary font-display text-base font-bold text-white"
            >
              <SiWhatsapp className="h-5 w-5" />
              Message me on WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
