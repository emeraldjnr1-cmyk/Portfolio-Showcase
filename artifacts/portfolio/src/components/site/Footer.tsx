import { useEffect, useState } from "react";
import { SiUpwork, SiWhatsapp } from "react-icons/si";
import { Logo } from "@/components/site/Logo";
import { UPWORK, WHATSAPP } from "@/data/portfolio";
import { useUserMotionOff } from "@/lib/motion-pref";

// The same five places as the header, then the two ways to reach Emerald.
// Service, work and industry pages are linked from their own index pages.
const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Games", href: "/game-development" },
  { label: "Prices", href: "/#pricing" },
  { label: "About", href: "/team/emerald" },
];

export function Footer() {
  const linkCls = "tap text-sm text-on-dark-label transition-colors hover:text-white";
  const listCls = "mt-4 space-y-2.5 [@media(pointer:coarse)]:mt-2 [@media(pointer:coarse)]:space-y-0";
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-12 pt-16 text-[#E7E7E1] md:px-12 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:pb-14">
        <div className="max-w-xs">
          <a href="/" className="tap flex items-center gap-2.5 font-display text-xl font-extrabold">
            <Logo size={26} color="#E7E7E1" />
            Denver<span className="text-sky">®</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-on-dark-label">
            Denver NoCode builds apps, websites, automations, AI agents and MCP servers with Claude Code, n8n and
            Make.com, for businesses worldwide.
          </p>
        </div>

        <nav aria-label="Site">
          <p className="type-label text-sky">Menu</p>
          <ul className={listCls}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Contact">
          <p className="type-label text-pink">Contact</p>
          <ul className={listCls}>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                <SiWhatsapp className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={UPWORK} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                <SiUpwork className="h-4 w-4" aria-hidden /> Upwork
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 pt-8 md:flex-row">
        <p className="text-sm text-on-dark-label">Built with Claude Code. Systems that save time and grow businesses.</p>
        <MotionToggle />
        <p className="text-sm text-on-dark-label">
          © <Year /> Denver <span className="text-green">Emerald</span> Peter
        </p>
      </div>
    </footer>
  );
}

/** The build year first, so hydration matches the prerender; the live year after. */
function Year() {
  const [year, setYear] = useState(__BUILD_YEAR__);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

/** Lets any visitor stop the marquees, rotating words, smooth scroll and the
 * animated hero, on every page, remembered in this browser. */
function MotionToggle() {
  const [off, setOff] = useUserMotionOff();
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const before = btn.getBoundingClientRect().top;
    setOff(!off);
    // Sections above (the scroll story) change height when motion flips, so
    // hold the switch where it was instead of throwing the page around.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = btn.getBoundingClientRect().top;
        if (Math.abs(after - before) > 1) window.scrollBy({ top: after - before, behavior: "instant" });
      }),
    );
  };
  return (
    <button
      onClick={toggle}
      aria-pressed={off}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold text-on-dark-body transition-colors hover:border-white hover:text-white lg:min-h-9 lg:text-xs"
    >
      <span className={`h-2 w-2 rounded-full ${off ? "bg-white/40" : "bg-green"}`} aria-hidden />
      Animations {off ? "off" : "on"}
    </button>
  );
}
