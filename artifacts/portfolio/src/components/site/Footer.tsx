import { useEffect, useState } from "react";
import { SiUpwork, SiWhatsapp } from "react-icons/si";
import { Logo } from "@/components/site/Logo";
import { UPWORK, WHATSAPP } from "@/data/portfolio";
import { services } from "@/data/services";
import { work } from "@/data/work";
import { industries } from "@/data/industries";
import { useUserMotionOff } from "@/lib/motion-pref";

// Every page carries these links, which is how crawlers find the service and
// work pages without relying on the sitemap alone.
export function Footer() {
  const linkCls = "tap text-sm text-on-dark-label transition-colors hover:text-white";
  const listCls = "mt-4 space-y-2.5 [@media(pointer:coarse)]:mt-2 [@media(pointer:coarse)]:space-y-0";
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-12 pt-20 text-[#E7E7E1] md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
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

        <nav aria-label="Services">
          <p className="type-label text-sky">Services</p>
          <ul className={listCls}>
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`/services/${s.slug}`} className={linkCls}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Industries">
          <p className="type-label text-green">Industries</p>
          <ul className={listCls}>
            {industries.slice(0, 6).map((ind) => (
              <li key={ind.slug}>
                <a href={`/industries/${ind.slug}`} className={linkCls}>
                  {ind.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/industries" className="tap text-sm font-semibold text-white transition-colors hover:text-green">
                All industries
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Work">
          <p className="type-label text-gold">Work</p>
          <ul className={listCls}>
            {work.slice(0, 5).map((w) => (
              <li key={w.slug}>
                <a href={`/work/${w.slug}`} className={linkCls}>
                  {w.title.split(":")[0]}
                </a>
              </li>
            ))}
            <li>
              <a href="/films" className={linkCls}>
                Build films
              </a>
            </li>
            <li>
              <a href="/game-development" className={linkCls}>
                Game development
              </a>
            </li>
            <li>
              <a href="/work" className="tap text-sm font-semibold text-white transition-colors hover:text-gold">
                All work
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Contact">
          <p className="type-label text-pink">Hire</p>
          <ul className={listCls}>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                <SiWhatsapp className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={UPWORK} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                <SiUpwork className="h-4 w-4" /> Upwork
              </a>
            </li>
            <li>
              <a href="/#hire" className={linkCls}>
                Ways to work together
              </a>
            </li>
            <li>
              <a href="/team" className={linkCls}>
                The D. Team
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
        if (Math.abs(after - before) > 1) window.scrollBy(0, after - before);
      }),
    );
  };
  return (
    <button
      onClick={toggle}
      aria-pressed={off}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold text-on-dark-body transition-colors hover:border-white hover:text-white md:min-h-9 md:text-xs"
    >
      <span className={`h-2 w-2 rounded-full ${off ? "bg-white/40" : "bg-green"}`} aria-hidden />
      Animations {off ? "off" : "on"}
    </button>
  );
}
