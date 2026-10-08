import { lazy, Suspense, useCallback, useEffect, useState } from "react";

export type PaxMessage = { role: "user" | "assistant"; content: string };

// The panel is code-split, then fetched quietly once the page is idle (or on
// hover or focus), so the first tap opens it straight away even on a slow
// connection instead of waiting for the download.
// Once the module is in, it is rendered directly: going through lazy() again
// would still suspend for React's ~300ms fallback throttle on the first open.
let Ready: (typeof import("./PaxPanel"))["default"] | null = null;
const loadPanel = () =>
  import("./PaxPanel").then((m) => {
    Ready = m.default;
    return m;
  });
const PaxPanel = lazy(loadPanel);
let warmed = false;
function warmPanel() {
  if (warmed) return;
  warmed = true;
  loadPanel().catch(() => {
    warmed = false;
  });
}

const STORE = "pax-chat-v1";
export const PAX_AVATAR = "/pax/pax-96.webp";
export const PAX_AVATAR_LG = "/pax/pax-192.webp";

// Every link on the site is a full page load, so the conversation lives in
// sessionStorage to survive moving between pages. Storage can be blocked, so
// every access is guarded and the chat simply starts fresh when it is.
function load(): PaxMessage[] {
  try {
    const raw = sessionStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function AskPax() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<PaxMessage[]>([]);
  const close = useCallback(() => setOpen(false), []);
  // The "Ask Pax" label shows near the top of the page only; further down it
  // folds into the avatar so it never sits on top of buttons near the edge.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMessages(load()), []);
  useEffect(() => {
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(warmPanel, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(warmPanel, 3000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(messages));
    } catch {
      // Private mode or blocked storage: chat still works, it just won't persist.
    }
  }, [messages]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          onPointerEnter={warmPanel}
          onFocus={warmPanel}
          aria-label="Ask Pax, Emerald's AI assistant"
          className="group fixed bottom-[5.5rem] right-6 z-30 flex items-center gap-3"
          data-cursor="hover"
        >
          <span className={`pointer-events-none hidden rounded-full border-2 border-black bg-white px-4 py-2 font-display text-sm font-bold text-black shadow-[3px_3px_0_#141414] transition-all duration-200 group-hover:-translate-x-1 md:block ${compact ? "md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100" : ""}`}>
            Ask Pax
          </span>
          <span className="relative block h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-2 border-black bg-black shadow-lg transition-transform group-hover:scale-105">
            <img src={PAX_AVATAR} alt="" width={60} height={60} className="h-full w-full object-cover" />
          </span>
          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#0BB07B]" aria-hidden />
        </button>
      )}

      {open &&
        (Ready ? (
          <Ready messages={messages} setMessages={setMessages} onClose={close} />
        ) : (
          <Suspense fallback={null}>
            <PaxPanel messages={messages} setMessages={setMessages} onClose={close} />
          </Suspense>
        ))}
    </>
  );
}
