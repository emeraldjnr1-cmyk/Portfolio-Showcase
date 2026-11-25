import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { OnboardingModal } from "@/components/site/OnboardingModal";
import { WHATSAPP } from "@/data/portfolio";

// ── The site's buttons ──
// Two calls to action, everywhere, and each always does the same thing:
//   "Message me on WhatsApp"  solid, WhatsApp icon   opens WhatsApp
//   "Get a fixed quote"       outline, arrow         opens the quote form
// At least 52px tall on phone, 56px from tablet up. They press in on tap; the hover
// colour only applies where there is a real pointer (Tailwind's hover: is
// already wrapped in @media (hover: hover)).

export const CTA_WHATSAPP = "Message me on WhatsApp";
export const CTA_QUOTE = "Get a fixed quote";

/** "bare" carries the shape and press only; the caller brings the colours. */
type Variant = "solid" | "outline" | "bare";
/** The surface the button sits on. */
type Tone = "light" | "dark";
type Size = "md" | "sm";

const BASE =
  // The label stays on one line wherever it fits. In a very narrow box (a
  // card on a 320px phone) it may wrap to two lines instead of overflowing.
  "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full text-center font-display font-bold leading-tight " +
  "transition-[transform,background-color,color,border-color] duration-150 ease-out active:scale-[0.97]";

const SIZES: Record<Size, string> = {
  md: "min-h-13 px-6 py-2 text-[15px] md:min-h-14 md:px-7 md:text-base",
  sm: "min-h-11 px-5 py-1.5 text-sm",
};

const LOOKS: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: "bg-cobalt text-white hover:bg-ink",
    dark: "bg-bone text-ink hover:bg-white",
  },
  outline: {
    light: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
    dark: "border-2 border-white/45 text-white hover:border-white hover:bg-white hover:text-ink",
  },
  bare: { light: "", dark: "" },
};

export function buttonClass({
  variant = "solid",
  tone = "light",
  size = "md",
  full = false,
  className = "",
}: { variant?: Variant; tone?: Tone; size?: Size; full?: boolean; className?: string } = {}) {
  return [BASE, SIZES[size], LOOKS[variant][tone], full ? "w-full sm:w-auto" : "", className].filter(Boolean).join(" ");
}

type CtaProps = { tone?: Tone; size?: Size; full?: boolean; className?: string };

/** Always opens WhatsApp. */
export function WhatsAppButton({ tone = "light", size = "md", full = false, className = "" }: CtaProps) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      className={buttonClass({ variant: "solid", tone, size, full, className })}
    >
      <SiWhatsapp className="h-5 w-5 shrink-0" aria-hidden />
      {CTA_WHATSAPP}
    </a>
  );
}

/** Always opens the quote form. */
export function QuoteButton({ tone = "light", size = "md", full = false, className = "" }: CtaProps) {
  return (
    <OnboardingModal
      trigger={
        <button type="button" data-cursor="hover" className={buttonClass({ variant: "outline", tone, size, full, className })}>
          {CTA_QUOTE}
          <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
        </button>
      }
    />
  );
}

/**
 * The pair, WhatsApp first. Stacked and full width on a phone, side by side
 * from tablet up. `data-chat-clear` tells the floating chat button to step
 * aside while this is on screen, so it never sits on top of a page button.
 */
export function CtaPair({
  tone = "light",
  align = "start",
  stack = false,
  className = "",
  children,
}: { tone?: Tone; align?: "start" | "center"; /** One above the other at every width. */ stack?: boolean; className?: string; children?: ReactNode }) {
  const row = `sm:flex-row sm:flex-wrap sm:items-center md:gap-4 ${align === "center" ? "sm:justify-center" : ""}`;
  return (
    <div data-chat-clear className={`flex flex-col gap-3 ${stack ? "" : row} ${className}`}>
      <WhatsAppButton tone={tone} full={!stack} className={stack ? "w-full" : ""} />
      <QuoteButton tone={tone} full={!stack} className={stack ? "w-full" : ""} />
      {children}
    </div>
  );
}
