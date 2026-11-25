import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { ChatLauncher } from "@/components/site/ChatLauncher";

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
      {/* Launcher UI only: the panel, prompts and API calls are untouched. */}
      {!open && <ChatLauncher onAskPax={() => setOpen(true)} onWarm={warmPanel} />}

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
