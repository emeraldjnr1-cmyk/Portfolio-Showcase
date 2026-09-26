import { lazy, Suspense, useCallback, useEffect, useState } from "react";

export type PaxMessage = { role: "user" | "assistant"; content: string };

// The panel is code-split: visitors who never open the chat never download it.
const PaxPanel = lazy(() => import("./PaxPanel"));

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

  useEffect(() => setMessages(load()), []);
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
          aria-label="Ask Pax, Emerald's AI assistant"
          className="group fixed bottom-[5.5rem] right-6 z-30 flex items-center gap-3"
          data-cursor="hover"
        >
          <span className="pointer-events-none hidden rounded-full border-2 border-black bg-white px-4 py-2 font-display text-sm font-bold text-black shadow-[3px_3px_0_#141414] transition-transform group-hover:-translate-x-1 md:block">
            Ask Pax
          </span>
          <span className="relative block h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-2 border-black bg-black shadow-lg transition-transform group-hover:scale-105">
            <img src={PAX_AVATAR} alt="" width={60} height={60} className="h-full w-full object-cover" />
          </span>
          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#0BB07B]" aria-hidden />
        </button>
      )}

      {open && (
        <Suspense fallback={null}>
          <PaxPanel messages={messages} setMessages={setMessages} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
