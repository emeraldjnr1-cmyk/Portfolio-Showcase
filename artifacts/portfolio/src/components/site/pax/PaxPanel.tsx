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

// Pax ends a message with [[HANDOFF]] when a visitor is ready for a quote.
// It becomes a button, so strip it (and any half-streamed tail of it).
const HANDOFF = "[[HANDOFF]]";
const stripMarker = (t: string) => t.replace(/\[\[HANDOFF\]\]/g, "").replace(/\[\[[A-Z]*\]?$/, "").trim();

function Rich({ text }: { text: string }) {
  const blocks = stripMarker(text).split(/\n{2,}/);
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
                <div key={i} className="space-y-2">
                  <PaxBubble>
                    <Rich text={m.content} />
                  </PaxBubble>
                  {m.content.includes(HANDOFF) && (
                    <div className="pl-9">
                      <button
                        onClick={() => setView("handoff")}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_#141414] transition-colors hover:bg-black"
                      >
                        Send my brief to Emerald <ArrowUp className="h-4 w-4 rotate-45" />
                      </button>
                    </div>
                  )}
                </div>
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

// ── "Talk to Emerald": Pax writes a brief, the visitor checks it, it goes out ──
type Brief = {
  summary: string;
  business: string;
  goal: string;
  problem: string;
  tools: string;
  scale: string;
  timeline: string;
  budget: string;
  service: string;
  questions: string[];
};

/** The visitor-facing brief. Emerald's follow-up questions stay out of it. */
function formatBrief(b: Brief) {
  return [
    `Summary: ${b.summary}`,
    `Business: ${b.business}`,
    `What I want built: ${b.goal}`,
    `The problem today: ${b.problem}`,
    `Tools I use: ${b.tools}`,
    `Scale: ${b.scale}`,
    `Timeline: ${b.timeline}`,
    `Budget: ${b.budget}`,
    `Best-fit service: ${b.service}`,
  ].join("\n");
}

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
  const [brief, setBrief] = useState<Brief | null>(null);
  const [briefText, setBriefText] = useState("");
  const [briefState, setBriefState] = useState<"none" | "writing" | "ready" | "failed">("none");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const hasChat = messages.some((m) => m.role === "user");
  const transcript = messages.map((m) => `${m.role === "user" ? "Visitor" : "Pax"}: ${stripMarker(m.content)}`).join("\n\n");

  // Ask Pax for the brief as soon as the screen opens, while the visitor
  // types their name.
  useEffect(() => {
    if (!hasChat) return;
    const abort = new AbortController();
    setBriefState("writing");
    fetch("/api/pax", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode: "brief", messages }),
      signal: abort.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { brief: Brief }) => {
        setBrief(d.brief);
        setBriefText(formatBrief(d.brief));
        setBriefState("ready");
      })
      .catch((e) => e.name !== "AbortError" && setBriefState("failed"));
    return () => abort.abort();
    // The chat is frozen while this screen is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const who = name.trim() || "a visitor";
  const waBody = briefText
    ? `Hi Emerald, I'm ${who}. I chatted with Pax on your site and here is my project brief:\n\n${briefText}`
    : `Hi Emerald, I'm ${who}. I was chatting with Pax on your site about a project.`;
  const waHref = `${WHATSAPP}?text=${encodeURIComponent(waBody.slice(0, 1800))}`;

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
          "Project brief": briefText || "(no brief: see the conversation below)",
          "Questions to ask them": brief?.questions?.length ? brief.questions.map((q) => `- ${q}`).join("\n") : "(none)",
          Page: typeof location !== "undefined" ? location.href : "",
          Conversation: transcript || "(no chat yet)",
          _subject: `Pax lead: ${name}${brief?.summary && brief.summary !== "Not discussed" ? `, ${brief.summary}` : ""}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      // FormSubmit reports failures as {"success":"false"} with HTTP 200.
      const body = await res.json().catch(() => null);
      if (!res.ok || !(body?.success === true || body?.success === "true")) throw new Error("not delivered");
      onSent("Sent. Emerald has your brief and this conversation, and will get back to you within 24 hours.");
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
        {hasChat
          ? "Pax turns this chat into a short brief, so Emerald can quote without making you repeat yourself. Check it, then send."
          : "Leave your details and Emerald replies within 24 hours with next steps."}
      </p>

      <form onSubmit={submit} className="mt-5 space-y-3">
        {hasChat && (
          <div>
            <p className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-black/50">Your project brief</p>
            {briefState === "writing" && (
              <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-black/30 bg-white px-3.5 py-4 text-sm text-black/60">
                <img src={PAX_AVATAR} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-full object-cover" />
                Pax is writing your brief...
              </div>
            )}
            {briefState === "ready" && (
              <textarea
                className={`${field} min-h-[220px] resize-y font-mono text-[13px] leading-relaxed`}
                value={briefText}
                onChange={(e) => setBriefText(e.target.value)}
                aria-label="Your project brief"
              />
            )}
            {briefState === "failed" && (
              <p className="rounded-xl border-2 border-dashed border-black/30 bg-white px-3.5 py-3 text-sm text-black/60">
                Pax could not write the brief this time. Emerald still gets the full conversation.
              </p>
            )}
          </div>
        )}
        <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Your name" />
        <input className={field} placeholder="WhatsApp number or email" value={contact} onChange={(e) => setContact(e.target.value)} required aria-label="WhatsApp number or email" />
        {state === "error" && (
          <p className="text-sm font-semibold text-[#F32317]">That did not go through. Try again, or use WhatsApp below.</p>
        )}
        <button
          type="submit"
          disabled={state === "sending" || briefState === "writing"}
          className="h-12 w-full rounded-full bg-primary font-display text-base font-bold text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {state === "sending" ? "Sending..." : briefState === "writing" ? "Writing your brief..." : "Email my brief to Emerald"}
        </button>
      </form>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={briefState === "writing"}
        className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-white font-display text-base font-bold text-black transition-colors hover:bg-black hover:text-white ${
          briefState === "writing" ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <SiWhatsapp className="h-5 w-5 text-[#25D366]" /> Send it on WhatsApp instead
      </a>
    </div>
  );
}
