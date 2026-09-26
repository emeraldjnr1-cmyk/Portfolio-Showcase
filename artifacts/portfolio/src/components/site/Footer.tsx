import { SiFiverr, SiUpwork, SiWhatsapp } from "react-icons/si";
import { Logo } from "@/components/site/Logo";
import { FIVERR, UPWORK, WHATSAPP } from "@/data/portfolio";
import { services } from "@/data/services";
import { work } from "@/data/work";
import { industries } from "@/data/industries";

// Every page carries these links, which is how crawlers find the service and
// work pages without relying on the sitemap alone.
export function Footer() {
  const linkCls = "text-sm text-white/55 transition-colors hover:text-white";
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-12 pt-20 text-[#E7E7E1] md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
        <div className="max-w-xs">
          <a href="/" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
            <Logo size={26} color="#E7E7E1" />
            Denver<span className="text-[#84DEF9]">®</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Denver NoCode builds apps, websites, automations, AI agents and MCP servers with Claude Code, n8n and
            Make.com, for businesses worldwide.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#84DEF9]">Services</p>
          <ul className="mt-4 space-y-2.5">
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
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#0BB07B]">Industries</p>
          <ul className="mt-4 space-y-2.5">
            {industries.slice(0, 6).map((ind) => (
              <li key={ind.slug}>
                <a href={`/industries/${ind.slug}`} className={linkCls}>
                  {ind.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/industries" className="text-sm font-semibold text-white transition-colors hover:text-[#0BB07B]">
                All industries
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Work">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FFCB41]">Work</p>
          <ul className="mt-4 space-y-2.5">
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
              <a href="/work" className="text-sm font-semibold text-white transition-colors hover:text-[#FFCB41]">
                All work
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Contact">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF8FCA]">Hire</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                <SiWhatsapp className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={FIVERR} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                <SiFiverr className="h-4 w-4" /> Fiverr
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
        <p className="text-sm text-white/40">Built with Claude Code. Systems that save time and grow businesses.</p>
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Denver <span className="text-[#10B981]">Emerald</span> Peter
        </p>
      </div>
    </footer>
  );
}
