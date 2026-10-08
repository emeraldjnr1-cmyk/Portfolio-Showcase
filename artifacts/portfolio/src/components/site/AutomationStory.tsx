import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type Variants } from "framer-motion";
import { ArrowUpRight, Bell, Check, Globe, Sparkles, Table2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Reveal } from "@/components/fx/SplitWords";
import { useMotionOff } from "@/lib/motion-pref";
import { STORY, STORY_STEPS } from "@/data/story";

// Section "How it runs": a real-looking automation runs step by step as the
// visitor scrolls. Two layouts share the same data and the same cards:
//
//   flow  Every step in a plain vertical list, each revealing as it enters the
//         viewport. Phones, tablets, reduced motion, the footer "Animations
//         off" switch, and the server render all use this one.
//   pin   Desktop with a mouse: a tall wrapper with a position: sticky stage.
//         Scroll progress through the wrapper picks the active step. Native
//         sticky only, the page scrolls at its normal speed.
//
// The server and the first client render always produce the flow layout; the
// mode is decided in an effect, so hydration stays exact and the upgrade
// happens below the fold. Only transform and opacity are animated.

const EASE = [0.22, 1, 0.36, 1] as const;
const N = STORY_STEPS.length;
// One idle beat (office closed) and two beats per step: the step lands, then
// its second state (approved, read, briefed).
const BEATS = 1 + N * 2;
const SCROLL_VH_PER_BEAT = 32; // 15 beats = 480vh of wrapper
const WHATSAPP = "https://wa.me/2348143046516";
const EMERALD = "#0BB07B";

type Mode = "flow" | "pin";

/** Pin only on a wide screen with a real mouse, enough height, motion allowed. */
function useStoryMode(): Mode {
  const off = useMotionOff();
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 640px) and (pointer: fine)");
    const apply = () => setDesk(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return desk && !off ? "pin" : "flow";
}

// ── Variants ────────────────────────────────────────────────────────────────
// Three states for everything inside a step: "hidden" before it runs, "landed"
// when it first happens, "shown" once its second state has happened too. In
// flow mode the list item goes straight from hidden to shown via whileInView
// and the labels propagate down; in pin mode each card's inner wrapper sets
// them from the scroll beat.
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  landed: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const riseLate: Variants = {
  hidden: { opacity: 0, y: 18 },
  landed: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.15 } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.15 } },
};
const pop: Variants = {
  hidden: { scale: 0 },
  shown: { scale: 1, transition: { duration: 0.4, ease: EASE } },
};
const grow: Variants = {
  hidden: { scaleY: 0 },
  shown: { scaleY: 1, transition: { duration: 0.7, ease: "easeInOut", delay: 0.3 } },
};
// Second-state bits inside a card: appear...
const later: Variants = {
  hidden: { opacity: 0, y: 8 },
  landed: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: 0.1 } },
};
// ...or give way.
const earlier: Variants = {
  hidden: { opacity: 1 },
  landed: { opacity: 1 },
  shown: { opacity: 0, transition: { duration: 0.25 } },
};
// Card position in the pinned stage relative to the active step.
const slot: Variants = {
  before: { opacity: 0, y: -28, scale: 0.98, transition: { duration: 0.4, ease: EASE } },
  active: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
  after: { opacity: 0, y: 36, scale: 0.98, transition: { duration: 0.4, ease: EASE } },
};

// ── Small parts ─────────────────────────────────────────────────────────────

/** A node on the pipeline. Pending: white with its number. Lit: cobalt (the
 * last one emerald, the "done" colour) with the number in white. In flow mode
 * the fill follows the parent's variants; in pin mode it follows `lit`. */
function Node({ n, lit, pulse }: { n: number; lit?: boolean; pulse?: boolean }) {
  const byVariant = lit === undefined;
  const color = n === N ? "bg-[#0BB07B]" : "bg-primary";
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white font-mono text-[11px] font-bold text-black">
      {pulse ? <span aria-hidden className="absolute -inset-2 animate-ping rounded-full border-2 border-primary/50" /> : null}
      {n}
      <motion.span
        aria-hidden
        className={`absolute -inset-0.5 flex items-center justify-center rounded-full font-mono text-[11px] font-bold text-white ${color}`}
        {...(byVariant
          ? { variants: pop }
          : { initial: false, animate: { scale: lit ? 1 : 0 }, transition: { duration: 0.35, ease: EASE } })}
      >
        {n}
      </motion.span>
    </span>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative w-full max-w-[520px] rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#141414] ${className}`}>
      {children}
    </div>
  );
}

function CardHead({ dot, children, right }: { dot?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b-2 border-black px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-black/60">
      {dot ? <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dot }} aria-hidden /> : null}
      <span className="min-w-0 truncate">{children}</span>
      {right ? <span className="ml-auto shrink-0 normal-case tracking-normal text-black">{right}</span> : null}
    </div>
  );
}

function Chip({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "live" | "warn" }) {
  const cls =
    tone === "live" ? "border-[#0BB07B] bg-[#0BB07B] text-white" : tone === "warn" ? "border-black bg-[#FFCB41] text-black" : "border-black bg-white text-black";
  return <span className={`inline-flex items-center gap-1 rounded-full border-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${cls}`}>{children}</span>;
}

function Initials({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#FFCB41] font-display text-xs font-extrabold text-black ${className}`}>
      {STORY.lead.initials}
    </span>
  );
}

function Ticks({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block h-3 w-4 ${className}`} aria-hidden>
      <Check className="absolute left-0 top-0 h-3 w-3" strokeWidth={3} />
      <Check className="absolute left-1.5 top-0 h-3 w-3" strokeWidth={3} />
    </span>
  );
}

// ── The cards, one per step ─────────────────────────────────────────────────

function IdleCard() {
  return (
    <Card className="bg-card">
      <CardHead>
        {STORY.agency} <span className="text-black/35">·</span> 23:46
      </CardHead>
      <div className="px-5 py-7">
        <p className="font-display text-3xl font-extrabold tracking-tight text-black">Office closed.</p>
        <p className="mt-2 text-sm leading-relaxed text-black/55">Everyone has gone home. The system has not.</p>
        <div className="mt-5 flex items-center gap-2" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-black/20" />
              {i < 4 ? <span className="h-px w-6 bg-black/15" /> : null}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function EnquiryCard() {
  return (
    <Card>
      <CardHead dot="#F32317" right={<span className="font-mono text-[11px] font-bold">23:47</span>}>
        New enquiry <span className="text-black/35">·</span> Website form
      </CardHead>
      <div className="px-5 py-5">
        <div className="flex items-center gap-3">
          <Initials />
          <div className="min-w-0">
            <p className="font-display text-base font-extrabold tracking-tight text-black">{STORY.lead.name}</p>
            <p className="font-mono text-xs text-black/50">{STORY.lead.phone}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-black/50">
            <Globe className="h-3.5 w-3.5" /> Schools page
          </span>
        </div>
        <p className="mt-4 rounded-xl border-l-4 border-primary bg-card px-4 py-3 text-[15px] leading-relaxed text-black">"{STORY.enquiry}"</p>
        <motion.p variants={later} className="mt-4 flex items-center gap-2 text-xs font-semibold text-black/55">
          <span className="h-2 w-2 rounded-full bg-[#0BB07B]" aria-hidden />
          Picked up automatically. Nobody is at a desk.
        </motion.p>
      </div>
    </Card>
  );
}

const SHEET_COLS = ["Name", "Source", "Budget", "Area", "Status"];

function CapturedCard() {
  return (
    <Card>
      <CardHead dot="#0015D4" right={<Chip tone="live">Row 148 added</Chip>}>
        <span className="inline-flex items-center gap-1.5">
          <Table2 className="h-3.5 w-3.5" /> CRM <span className="text-black/35">·</span> Leads
        </span>
      </CardHead>
      <div className="overflow-hidden px-4 py-4">
        {/* The Source column only appears from sm up: five columns do not fit a phone. */}
        <div className="overflow-hidden rounded-lg border border-black/15 text-[11px] sm:text-xs">
          <div className="grid grid-cols-[1.5fr_0.8fr_1fr_0.8fr] border-b border-black/15 bg-card font-mono text-[10px] font-bold uppercase tracking-wider text-black/50 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_0.8fr]">
            {SHEET_COLS.map((c) => (
              <span key={c} className={`truncate px-2 py-2 sm:px-2.5 ${c === "Source" ? "hidden sm:block" : ""}`}>
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-[1.5fr_0.8fr_1fr_0.8fr] text-black/35 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_0.8fr]">
            {["T. Mensah", "Website", "320k", "Eastgate", "Viewed"].map((c, i) => (
              <span key={i} className={`truncate border-b border-black/10 px-2 py-2 sm:px-2.5 ${i === 1 ? "hidden sm:block" : ""}`}>
                {c}
              </span>
            ))}
          </div>
          <motion.div variants={rise} className="grid grid-cols-[1.5fr_0.8fr_1fr_0.8fr] bg-[#FFCB41]/35 font-semibold text-black sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_0.8fr]">
            <span className="truncate px-2 py-2 sm:px-2.5">{STORY.lead.name}</span>
            <span className="hidden truncate px-2 py-2 sm:block sm:px-2.5">Website</span>
            <span className="truncate px-2 py-2 sm:px-2.5">450k</span>
            <span className="flex items-center px-2 py-2 sm:px-2.5">
              <span role="img" aria-label="empty cell" className="inline-block h-3 w-10 rounded border border-dashed border-black/30" />
            </span>
            <span className="truncate px-2 py-2 text-primary sm:px-2.5">New</span>
          </motion.div>
        </div>
        <motion.p variants={later} className="mt-3 flex items-center gap-2 text-xs font-semibold text-black/55">
          <Check className="h-3.5 w-3.5 text-[#0BB07B]" strokeWidth={3} />
          Phone, message and page saved against the lead.
        </motion.p>
      </div>
    </Card>
  );
}

const FIELDS: { k: string; v: string; late?: boolean }[] = [
  { k: "Source", v: "Website, schools page" },
  { k: "Area", v: "Northfield, Westbrook" },
  { k: "Budget band", v: "400k to 500k", late: true },
  { k: "Timeframe", v: "This week", late: true },
];

function EnrichedCard() {
  return (
    <Card>
      <CardHead dot="#FFCB41" right={<motion.span variants={later}><Chip tone="warn">4 blanks filled</Chip></motion.span>}>
        Enrichment <span className="text-black/35">·</span> Lead 148
      </CardHead>
      <div className="px-5 py-5">
        <div className="grid grid-cols-2 gap-3">
          {FIELDS.map((f) => (
            <motion.div key={f.k} variants={f.late ? later : rise} className="rounded-xl border-2 border-black/10 px-3.5 py-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-black/45">{f.k}</p>
              <p className="mt-1 inline-block bg-[#FFCB41]/60 px-1 font-semibold leading-snug text-black">{f.v}</p>
            </motion.div>
          ))}
        </div>
        <motion.p variants={later} className="mt-4 flex items-center gap-2 text-xs font-semibold text-black/55">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Lead scored Hot: real budget, real timeframe.
        </motion.p>
      </div>
    </Card>
  );
}

function DraftCard() {
  return (
    <Card>
      <CardHead dot="#0015D4" right={<span className="font-mono text-[11px] font-bold">23:48</span>}>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Claude <span className="text-black/35">·</span> drafting in the agency's voice
        </span>
      </CardHead>
      <div className="px-5 py-5">
        <div className="relative">
          {/* Thinking bars give way to the finished draft. */}
          <motion.div variants={earlier} aria-hidden className="absolute inset-0 space-y-2.5 pt-1">
            <span className="block h-3 w-11/12 rounded bg-black/10" />
            <span className="block h-3 w-full rounded bg-black/10" />
            <span className="block h-3 w-4/5 rounded bg-black/10" />
            <span className="block h-3 w-1/3 rounded bg-black/10" />
          </motion.div>
          <motion.div variants={later} className="relative text-[15px] leading-relaxed text-black">
            <p>{STORY.reply}</p>
            <p className="mt-2 text-black/60">{STORY.signoff}</p>
          </motion.div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>Voice: {STORY.agency}</Chip>
          <Chip>Facts from the CRM only</Chip>
          <Chip>No price promises</Chip>
        </div>
      </div>
    </Card>
  );
}

function ApprovalCard() {
  return (
    <Card>
      <CardHead dot="#FFCB41" right={<span className="font-mono text-[11px] font-bold">23:48</span>}>
        Needs a human <span className="text-black/35">·</span> push sent to {STORY.agent}
      </CardHead>
      <div className="px-5 py-5">
        <p className="text-sm leading-relaxed text-black/60">{STORY.agent} reads the draft on her phone. The reply waits until she says so.</p>
        <p className="mt-3 line-clamp-2 rounded-xl bg-card px-4 py-3 text-sm leading-relaxed text-black/80">{STORY.reply}</p>
        <div className="relative mt-4 h-11">
          {/* Styled as controls on purpose, not real buttons: this is a picture of a decision, not one the visitor makes. */}
          <motion.div variants={earlier} className="absolute inset-0 flex items-center gap-3">
            <span className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-display text-sm font-bold text-white shadow-[3px_3px_0_#141414]">
              <Check className="h-4 w-4" strokeWidth={3} /> Approve
            </span>
            <span className="inline-flex h-11 items-center rounded-full border-2 border-black px-5 font-display text-sm font-bold text-black">Edit first</span>
          </motion.div>
          <motion.div variants={later} className="absolute inset-0 flex items-center gap-3">
            <span className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0BB07B] px-5 font-display text-sm font-bold text-white shadow-[3px_3px_0_#141414]">
              <Check className="h-4 w-4" strokeWidth={3} /> Approved
            </span>
            <span className="text-xs font-semibold text-black/55">
              by {STORY.agent} <span className="text-black/35">·</span> one tap <span className="text-black/35">·</span> 23:48
            </span>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

function WhatsAppCard() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b-2 border-black bg-black px-4 py-3 text-[#E7E7E1]">
        <Initials />
        <div className="min-w-0 leading-tight">
          <p className="truncate font-display text-sm font-bold">{STORY.lead.name}</p>
          <p className="text-[11px] text-white/55">online</p>
        </div>
        <SiWhatsapp className="ml-auto h-5 w-5 text-[#0BB07B]" aria-hidden />
      </div>
      <div className="space-y-3 bg-[#E7E7E1] px-4 py-4">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-black/10 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-black">
          <p>{STORY.enquiry}</p>
          <p className="mt-1 text-right font-mono text-[10px] text-black/45">23:47</p>
        </div>
        <motion.div variants={rise} className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3.5 py-2.5 text-sm leading-relaxed text-black">
          <p>{STORY.reply}</p>
          <p className="mt-1">{STORY.signoff}</p>
          <p className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] text-black/45">
            23:49
            <span className="relative inline-block h-3 w-4">
              <motion.span variants={earlier} className="absolute inset-0 text-black/45">
                <Ticks />
              </motion.span>
              <motion.span variants={later} className="absolute inset-0 text-[#1FA2D8]">
                <Ticks />
              </motion.span>
            </span>
          </p>
        </motion.div>
        <motion.p variants={later} className="text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-black/45">
          Read 23:50
        </motion.p>
      </div>
    </Card>
  );
}

const LOG_ROWS = ["Reply logged against lead 148", "Follow-up call booked, Thursday 09:00", `Marked Hot, assigned to ${STORY.agent}`];

function LoggedCard() {
  return (
    <Card>
      <CardHead dot={EMERALD} right={<Chip tone="live">Done</Chip>}>
        CRM updated <span className="text-black/35">·</span> 23:49
      </CardHead>
      <div className="px-5 py-5">
        <ul className="space-y-2.5">
          {LOG_ROWS.map((r) => (
            <motion.li key={r} variants={rise} className="flex items-center gap-2.5 text-sm font-medium text-black">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0BB07B] text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {r}
            </motion.li>
          ))}
        </ul>
        <motion.div variants={later} className="mt-5 rounded-xl border-2 border-black bg-black px-4 py-3.5 text-[#E7E7E1]">
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFCB41]">
            <Bell className="h-3.5 w-3.5" /> 07:30 <span className="text-white/40">·</span> Morning brief for {STORY.agent}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">{STORY.brief}</p>
        </motion.div>
      </div>
    </Card>
  );
}

const CARDS = [EnquiryCard, CapturedCard, EnrichedCard, DraftCard, ApprovalCard, WhatsAppCard, LoggedCard];

// ── Section pieces shared by both layouts ───────────────────────────────────

function Header({ num }: { num: string }) {
  return (
    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
      <div>
        <Reveal>
          <span className="font-mono text-sm font-semibold text-primary">{num} — How it runs</span>
        </Reveal>
        <h2 id="how-it-runs-title" className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-black md:text-7xl">
          Watch an automation <span className="whitespace-nowrap font-editorial font-normal text-primary">run</span>.
        </h2>
      </div>
      <Reveal delay={0.2}>
        <p className="max-w-md text-lg leading-relaxed text-black/55">
          A small estate agency. An enquiry at 23:47, nobody at a desk. Scroll, and the system handles it step by step. A
          person still approves the reply before it goes out.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-black/45">
          <span className="h-2 w-2 bg-[#FFCB41]" aria-hidden />
          Example system, sample data
        </p>
      </Reveal>
    </div>
  );
}

function Closing() {
  return (
    <div className="mx-auto mt-20 grid max-w-7xl gap-10 border-t-2 border-black pt-12 md:mt-28 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end md:pt-16">
      <Reveal>
        <p className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-black md:text-6xl">
          Two minutes. One tap. <span className="font-editorial font-normal text-primary">While you slept.</span>
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-base leading-relaxed text-black/55">
          That was one enquiry. Yours arrive all week, and every one gets the same two minutes. Built in your own accounts,
          with a person in the loop where it matters.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full bg-primary px-7 font-display text-[15px] font-bold text-white md:text-base"
            data-cursor="hover"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-250 ease-out group-hover:scale-x-100" aria-hidden />
            <SiWhatsapp className="relative z-10 h-5 w-5 shrink-0" />
            <span className="relative z-10">Build mine</span>
          </a>
          <a href="/services/automation" className="inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors hover:text-primary">
            See the automation service <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-black/40">
          Example system, sample data. The names and numbers are made up.
        </p>
      </Reveal>
    </div>
  );
}

// ── Flow layout: phones, tablets, motion off, and the server render ─────────

function FlowStory({ motionOff }: { motionOff: boolean }) {
  return (
    <ol className="mx-auto max-w-2xl">
      {STORY_STEPS.map((s, i) => {
        const Art = CARDS[i];
        return (
          <motion.li
            key={s.id}
            initial="hidden"
            whileInView="shown"
            // With motion off everything is simply shown, in view or not.
            animate={motionOff ? "shown" : undefined}
            viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
            className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-4 pb-12 last:pb-0 sm:gap-x-6"
          >
            {i < N - 1 ? (
              <span aria-hidden className="absolute bottom-0 left-[13px] top-8 w-0.5 bg-black/10">
                <motion.span variants={grow} className="block h-full w-full origin-top bg-primary" />
              </span>
            ) : null}
            <Node n={i + 1} />
            <div className="min-w-0">
              <motion.div variants={rise}>
                <p className="font-mono text-xs font-bold text-black/45">{s.time}</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-black">{s.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-black/55">{s.desc}</p>
              </motion.div>
              <motion.div variants={riseLate} className="mt-5 pr-2">
                <Art />
              </motion.div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

// ── Pin layout: desktop with a mouse ────────────────────────────────────────

function PinnedStory() {
  const wrap = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  // The beat changes 14 times over the whole scroll; everything else is a
  // motion value, so React re-renders only at those moments.
  const [beat, setBeat] = useState(0);
  const toBeat = (v: number) => Math.max(0, Math.min(BEATS - 1, Math.floor(v * BEATS)));
  useMotionValueEvent(scrollYProgress, "change", (v) => setBeat(toBeat(v)));
  useEffect(() => setBeat(toBeat(scrollYProgress.get())), [scrollYProgress]);
  const active = beat === 0 ? -1 : Math.floor((beat - 1) / 2);
  const phase = beat === 0 ? 0 : (beat - 1) % 2;

  // Where the nodes sit, so the line and its tip run from the first node to the last.
  const [geo, setGeo] = useState<{ top: number; height: number } | null>(null);
  useLayoutEffect(() => {
    const el = rail.current;
    if (!el) return;
    const measure = () => {
      const c = nodes.current.map((li) => (li ? li.offsetTop + 14 + 10 : 0)); // 10px row padding + half the 28px node
      setGeo({ top: c[0], height: c[N - 1] - c[0] });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The line reaches node i exactly when step i lands (beat 1 + 2i).
  const fill = useTransform(scrollYProgress, (v) => Math.max(0, Math.min(1, (v * BEATS - 1) / 2 / (N - 1))));
  const tipY = useTransform(fill, (f) => f * (geo?.height ?? 0));

  const clock = active < 0 ? "23:46" : STORY_STEPS[active].time;
  const status = active < 0 ? "Office closed" : active === N - 1 && phase === 1 ? "Done" : "Running";

  return (
    <div ref={wrap} className="relative" style={{ height: `${BEATS * SCROLL_VH_PER_BEAT}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center pb-8 pt-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* Stage header: who, the caption, and the clock. */}
          <div className="mb-6 flex items-center justify-between gap-6 border-b-2 border-black pb-3 font-mono text-xs font-semibold uppercase tracking-widest text-black/50">
            <span className="flex items-center gap-3">
              <span className="text-black">{STORY.agency}</span>
              <span className="text-black/30">·</span>
              <span>Example system, sample data</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-2" style={{ color: status === "Done" ? EMERALD : status === "Running" ? "#0015D4" : undefined }}>
                <span
                  className={`h-2 w-2 rounded-full ${status === "Running" ? "animate-pulse bg-primary" : status === "Done" ? "bg-[#0BB07B]" : "bg-black/30"}`}
                  aria-hidden
                />
                {status}
              </span>
              <span className="w-[5ch] text-right text-base font-bold tabular-nums text-black">{clock}</span>
            </span>
          </div>

          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 xl:gap-16">
            {/* The pipeline */}
            <ol ref={rail} className="relative">
              {geo ? (
                <>
                  <span aria-hidden className="absolute left-[13px] w-0.5 bg-black/10" style={{ top: geo.top, height: geo.height }} />
                  <motion.span
                    aria-hidden
                    className="absolute left-[13px] w-0.5 origin-top bg-primary"
                    style={{ top: geo.top, height: geo.height, scaleY: fill }}
                  />
                  <motion.span
                    aria-hidden
                    className="absolute left-[9px] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_#F6F5F1]"
                    style={{ top: geo.top - 5, y: tipY, opacity: active < 0 ? 0 : 1 }}
                  />
                </>
              ) : null}
              {STORY_STEPS.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "pending";
                return (
                  <li
                    key={s.id}
                    ref={(el) => {
                      nodes.current[i] = el;
                    }}
                    className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-5 py-2.5 xl:py-3"
                  >
                    <Node n={i + 1} lit={state !== "pending"} pulse={state === "active"} />
                    <div className={`min-w-0 transition-opacity duration-300 ${state === "pending" ? "opacity-40" : "opacity-100"}`}>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight text-black xl:text-xl">{s.title}</h3>
                        <span className="font-mono text-[11px] font-bold text-black/40">{s.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-snug text-black/55">{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* The stage: every card is mounted, only the active one is visible. */}
            <div className="relative min-h-[520px]">
              {[IdleCard, ...CARDS].map((Art, k) => {
                const i = k - 1; // -1 is the idle card
                const pos = i < active ? "before" : i === active ? "active" : "after";
                return (
                  <motion.div
                    key={k}
                    initial={false}
                    animate={pos}
                    variants={slot}
                    className={`absolute inset-0 flex items-center ${pos === "active" ? "" : "pointer-events-none"}`}
                  >
                    <motion.div initial="hidden" animate={pos !== "active" ? "hidden" : phase === 1 ? "shown" : "landed"} className="w-full">
                      <Art />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────

export function AutomationStory({ num = "03" }: { num?: string }) {
  const mode = useStoryMode();
  const motionOff = useMotionOff();
  return (
    <section id="how-it-runs" aria-labelledby="how-it-runs-title" className="relative border-t border-black/10 bg-card px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Header num={num} />
      </div>
      {mode === "pin" ? <PinnedStory /> : <FlowStory motionOff={motionOff} />}
      <Closing />
    </section>
  );
}
