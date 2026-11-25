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

/** Shown instead of the full WhatsApp label where the pair's box is too narrow for it. */
const CTA_WHATSAPP_SHORT = "Message me";

/** Always opens WhatsApp. */
export function WhatsAppButton({ tone = "light", size = "md", full = false, className = "" }: CtaProps) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      aria-label={CTA_WHATSAPP}
      className={buttonClass({ variant: "solid", tone, size, full, className })}
    >
      <SiWhatsapp className="h-5 w-5 shrink-0" aria-hidden />
      {/* Inside a CtaPair narrower than 17rem (a card on a 320px phone) the
          words shorten so the button stays one line. The name read out stays
          the full label. Outside a CtaPair the full label always shows. */}
      <span className="@max-[17rem]:hidden">{CTA_WHATSAPP}</span>
      <span aria-hidden className="hidden @max-[17rem]:inline">
        {CTA_WHATSAPP_SHORT}
      </span>
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
 * The pair, WhatsApp first. The layout follows the box the pair sits in, not
 * the screen: side by side where both fit on one line (34rem and up), one
 * above the other at full width everywhere else, so a narrow card never gets
 * two ragged buttons. `data-chat-clear` tells the floating chat button to step
 * aside while this is on screen, so it never sits on top of a page button.
 * Give the pair a box with a real width (a block, or w-full in a flex column).
 */
export function CtaPair({
  tone = "light",
  align = "start",
  stack = false,
  className = "",
  children,
}: { tone?: Tone; align?: "start" | "center"; /** One above the other at every width. */ stack?: boolean; className?: string; children?: ReactNode }) {
  const row = `@[34rem]:flex-row @[34rem]:flex-wrap @[34rem]:items-center @[34rem]:gap-4 ${align === "center" ? "@[34rem]:justify-center" : ""}`;
  const each = stack ? "w-full" : "w-full @[34rem]:w-auto";
  return (
    <div data-chat-clear className={`@container ${className}`}>
      <div className={`flex flex-col gap-3 ${stack ? "" : row}`}>
        <WhatsAppButton tone={tone} className={each} />
        <QuoteButton tone={tone} className={each} />
        {children}
      </div>
    </div>
  );
}
