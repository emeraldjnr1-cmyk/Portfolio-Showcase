import { useEffect, useRef, useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import { ArrowUp, X, ArrowLeft } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { WHATSAPP } from "@/data/portfolio";
import { PAX_AVATAR, PAX_AVATAR_LG, type PaxMessage } from "./AskPax";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/denvernocode@gmail.com";

const GREETING =
  "Hi, I'm Pax, Emerald's AI assistant. Ask me what Denver NoCode can build for your business, how a project works, or how pricing works.";

const STARTERS = [
  "What can you build for my business?",
  "How does pricing work?",
  "How fast can you deliver?",
  "Show me work in my industry",
];

// ── Rendering Pax's plain-text replies: paragraphs, "- " lists, links ──
const URL_RE = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"])/g;

function linkify(text: string, keyBase: string): ReactNode[] {
  const clean = text.replace(/\*\*(.+?)\*\*/g, "$1");
  return clean.split(URL_RE).map((part, i) => {
    if (!/^https?:\/\//.test(part)) return part;
    const label = part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    return (
      <a
        key={`${keyBase}-${i}`}
        href={part}
        target={part.includes("denvernocode.com") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="font-semibold text-primary underline underline-offset-2"
      >
        {/* Allow line breaks after slashes, never mid-word. */}
        {label.split("/").map((seg, j) => (
          <span key={j}>
            {j > 0 && (
              <>
                /<wbr />
              </>
            )}
            {seg}
          </span>
        ))}
      </a>
    );
  });
}

function Rich({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-•]\s/.test(l))) {
          return (
            <ul key={b} className="my-1.5 list-disc space-y-1 pl-4">
              {lines.map((l, i) => (
                <li key={i}>{linkify(l.replace(/^\s*[-•]\s/, ""), `${b}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={b} className="my-1.5 first:mt-0 last:mb-0">
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {linkify(l, `${b}-${i}`)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

function PaxBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <img src={PAX_AVATAR} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full border border-black/20 object-cover" />
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-black/10 bg-white px-4 py-2.5 text-[15px] leading-relaxed text-black">
        {children}
      </div>
    </div>
  );
}

export default function PaxPanel({
  messages,
  setMessages,
  onClose,
}: {
  messages: PaxMessage[];
  setMessages: Dispatch<SetStateAction<PaxMessage[]>>;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState<"chat" | "handoff">("chat");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Cancel an in-flight reply only when the panel really closes. Tying this
  // to onClose aborted every reply: the parent re-renders on each message,
  // which hands this component a new onClose and re-runs that effect.
  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, view]);

  const replaceLast = (content: string) =>
    setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

  async function send(textIn: string) {
    const text = textIn.trim();
    if (!text || busy) return;
    setInput("");
    const history: PaxMessage[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    const abort = new AbortController();
    abortRef.current = abort;
    try {
      const res = await fetch("/api/pax", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abort.signal,
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        replaceLast(msg && msg.length < 300 ? msg : "Pax hit a snag. Try again in a moment, or tap Talk to Emerald.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        replaceLast(acc);
      }
      if (!acc.trim()) replaceLast("Pax hit a snag. Try again in a moment, or tap Talk to Emerald.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") replaceLast("Pax could not connect. Check your connection, or tap Talk to Emerald.");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const waiting = busy && messages[messages.length - 1]?.content === "";

  return (
    <div
      role="dialog"
      aria-label="Ask Pax, Emerald's AI assistant"
      className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#E7E7E1] md:inset-auto md:bottom-6 md:right-6 md:h-[min(660px,calc(100dvh-3rem))] md:w-[400px] md:rounded-2xl md:border-2 md:border-black md:shadow-[8px_8px_0_#0015D4]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-black px-4 py-3 text-[#E7E7E1]">
        <img src={PAX_AVATAR_LG} alt="Pax" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full border-2 border-[#E7E7E1]/80 object-cover" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-extrabold leading-tight text-white">Pax</p>
          <p className="flex items-center gap-1.5 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0BB07B]" aria-hidden />
            Emerald's AI assistant
          </p>
        </div>
        {view === "chat" && (
          <button
            onClick={() => setView("handoff")}
            className="shrink-0 rounded-full bg-[#E7E7E1] px-3.5 py-2 text-xs font-bold text-black transition-colors hover:bg-primary hover:text-white"
          >
            Talk to Emerald
          </button>
        )}
        <button onClick={onClose} aria-label="Close chat" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      {view === "chat" ? (
        <>
          {/* Messages. data-lenis-prevent lets this scroll natively under Lenis. */}
          <div ref={listRef} data-lenis-prevent aria-live="polite" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
            <PaxBubble>{GREETING}</PaxBubble>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pl-9">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border-2 border-black bg-white px-3.5 py-1.5 text-left text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[15px] leading-relaxed text-white">
                    {m.content}
                  </div>
                </div>
              ) : m.content ? (
                <PaxBubble key={i}>
                  <Rich text={m.content} />
                </PaxBubble>
              ) : null,
            )}
            {waiting && (
              <PaxBubble>
                <span className="flex gap-1 py-1.5" aria-label="Pax is typing">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-black/40" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              </PaxBubble>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-black/10 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <div className="flex items-end gap-2 rounded-2xl border-2 border-black bg-white px-3 py-2 focus-within:border-primary">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 1500))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                data-lenis-prevent
                placeholder="Ask Pax anything about your project"
                aria-label="Message Pax"
                className="max-h-32 min-h-[1.75rem] flex-1 resize-none bg-transparent py-1 text-base leading-snug text-black outline-none placeholder:text-black/40 [field-sizing:content]"
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity disabled:opacity-30"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-black/45">Pax is an AI and can make mistakes. Emerald confirms every quote.</p>
          </form>
        </>
      ) : (
        <Handoff messages={messages} onBack={() => setView("chat")} onSent={(note) => {
          setMessages((prev) => [...prev, { role: "assistant", content: note }]);
          setView("chat");
        }} />
      )}
    </div>
  );
}

// ── "Talk to Emerald": sends the conversation to Emerald's inbox ──
function Handoff({
  messages,
  onBack,
  onSent,
}: {
  messages: PaxMessage[];
  onBack: () => void;
  onSent: (note: string) => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const transcript = messages.map((m) => `${m.role === "user" ? "Visitor" : "Pax"}: ${m.content}`).join("\n\n");
  const firstAsk = messages.find((m) => m.role === "user")?.content ?? "";
  const waText = encodeURIComponent(
    `Hi Emerald, I'm ${name || "a visitor"}. I was chatting with Pax on your site${firstAsk ? ` about: ${firstAsk.slice(0, 200)}` : "."}`,
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: name,
          "WhatsApp or email": contact,
          Note: note || "(none)",
          Page: typeof location !== "undefined" ? location.href : "",
          Conversation: transcript || "(no chat yet)",
          _subject: `Ask Pax lead: ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      // FormSubmit reports failures as {"success":"false"} with HTTP 200.
      const body = await res.json().catch(() => null);
      if (!res.ok || !(body?.success === true || body?.success === "true")) throw new Error("not delivered");
      onSent(`Sent. Emerald has this conversation and your details, and will get back to you within 24 hours.`);
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-xl border-2 border-black bg-white px-3.5 py-2.5 text-base text-black outline-none placeholder:text-black/40 focus:border-primary";

  return (
    <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-5">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-black/60 hover:text-black">
        <ArrowLeft className="h-4 w-4" /> Back to chat
      </button>
      <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-black">Talk to Emerald</h3>
      <p className="mt-2 text-sm leading-relaxed text-black/60">
        Emerald gets this conversation and your details, and replies within 24 hours with next steps.
      </p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Your name" />
        <input className={field} placeholder="WhatsApp number or email" value={contact} onChange={(e) => setContact(e.target.value)} required aria-label="WhatsApp number or email" />
        <textarea className={`${field} min-h-[88px] resize-none`} placeholder="Anything to add? (optional)" value={note} onChange={(e) => setNote(e.target.value)} aria-label="Anything to add" />
        {state === "error" && (
          <p className="text-sm font-semibold text-[#F32317]">That did not go through. Try again, or use WhatsApp below.</p>
        )}
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-12 w-full rounded-full bg-primary font-display text-base font-bold text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {state === "sending" ? "Sending..." : "Send to Emerald"}
        </button>
      </form>
      <a
        href={`${WHATSAPP}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-white font-display text-base font-bold text-black transition-colors hover:bg-black hover:text-white"
      >
        <SiWhatsapp className="h-5 w-5 text-[#25D366]" /> Or message on WhatsApp
      </a>
    </div>
  );
}
