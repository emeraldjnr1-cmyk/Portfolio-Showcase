import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { CTA_WHATSAPP } from "@/components/site/Button";
import { WHATSAPP } from "@/data/portfolio";

const PAX_AVATAR = "/pax/pax-96.webp";

/**
 * The floating way to start a chat.
 *
 * Phone: ONE button. Tapping it offers the two routes, WhatsApp (Emerald) or
 * Ask Pax (the AI assistant), so nothing is stacked over the page. It steps
 * aside while a page button (`data-chat-clear`) or the footer is on screen,
 * and keeps clear of the home indicator.
 *
 * Desktop: Ask Pax with its label always showing, so the face is never taken
 * for Emerald, and a WhatsApp button under it. Both step aside over the footer.
 *
 * Everything starts visible and closed, the same on the server and the first
 * client render; the observers only run after hydration.
 */
export function ChatLauncher({ onAskPax, onWarm }: { onAskPax: () => void; onWarm: () => void }) {
  const [menu, setMenu] = useState(false);
  const [overCta, setOverCta] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return;
    const footer = document.querySelector("footer");
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setOverFooter(footer ? seen.has(footer) : false);
      setOverCta([...seen].some((el) => el !== footer));
    });
    document.querySelectorAll("[data-chat-clear]").forEach((el) => io.observe(el));
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  // The choice closes on Escape, on a tap outside, and when the button steps aside.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onDown = (e: PointerEvent) => {
      if (!phoneRef.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);
  useEffect(() => {
    if (overCta || overFooter) setMenu(false);
  }, [overCta, overFooter]);

  // Reduced motion: the button fades, it does not travel. Stepping aside never
  // takes it out of the Tab order: a keyboard user who reaches it (after the
  // footer) brings it back into view.
  const aside =
    "pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0 " +
    "focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100";
  const here = "translate-y-0 opacity-100";
  const move = "transition-[opacity,transform,visibility] duration-200 ease-out";
  const row = "flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors duration-150 active:bg-black/5";

  return (
    <>
      {/* Phone: one button, two choices */}
      <div
        ref={phoneRef}
        className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-30 flex flex-col items-end gap-3 md:hidden ${move} ${overCta || overFooter ? aside : here}`}
      >
        <div
          id="chat-choices"
          role="group"
          aria-label="Ways to chat"
          className={`w-[min(17.5rem,calc(100vw-2rem))] origin-bottom-right rounded-2xl border-2 border-ink bg-white p-1.5 shadow-[4px_4px_0_#141414] transition-[opacity,transform,visibility] duration-150 ease-out ${
            menu ? "visible scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0 motion-reduce:scale-100"
          }`}
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)} className={row}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cobalt text-white">
              <SiWhatsapp className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-[15px] font-bold leading-tight text-ink">{CTA_WHATSAPP}</span>
              <span className="mt-0.5 block text-[13px] leading-tight text-ink-label">Emerald, directly</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              setMenu(false);
              onAskPax();
            }}
            className={row}
          >
            <span className="relative block h-10 w-10 shrink-0">
              <img src={PAX_AVATAR} alt="" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-ink bg-ink object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-[15px] font-bold leading-tight text-ink">Ask Pax</span>
              <span className="mt-0.5 block text-[13px] leading-tight text-ink-label">Emerald's AI assistant</span>
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          onPointerEnter={onWarm}
          onFocus={onWarm}
          aria-expanded={menu}
          aria-controls="chat-choices"
          className="inline-flex h-13 items-center gap-2 rounded-full border-2 border-ink bg-white pl-4 pr-5 font-display text-[15px] font-bold text-ink shadow-[3px_3px_0_#141414] transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          {menu ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
          {menu ? "Close" : "Chat"}
        </button>
      </div>

      {/* Desktop: Ask Pax, labelled, with WhatsApp under it */}
      <div
        className={`fixed bottom-6 right-6 z-30 hidden flex-col items-end gap-3 md:flex ${move} ${overFooter ? aside : here}`}
      >
        <button
          type="button"
          onClick={onAskPax}
          onPointerEnter={onWarm}
          onFocus={onWarm}
          aria-label="Ask Pax, Emerald's AI assistant"
          className="group relative flex items-center gap-3 rounded-full transition-transform duration-150 ease-out active:scale-[0.97]"
          data-cursor="hover"
        >
          <span className="rounded-full border-2 border-ink bg-white px-4 py-2 font-display text-sm font-bold text-ink shadow-[3px_3px_0_#141414]">
            Ask Pax
          </span>
          <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-ink bg-ink transition-transform duration-150 ease-out group-hover:scale-105">
            <img src={PAX_AVATAR} alt="" width={56} height={56} className="h-full w-full object-cover" />
          </span>
          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green" aria-hidden />
        </button>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={CTA_WHATSAPP}
          data-cursor="hover"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-cobalt text-white transition-[transform,background-color] duration-150 ease-out hover:scale-105 hover:bg-ink active:scale-[0.97]"
        >
          <SiWhatsapp className="h-6 w-6" aria-hidden />
        </a>
      </div>
    </>
  );
}
