import type { CSSProperties, ReactNode } from "react";

// ── The site's card ──
// Paper, a 2px ink border, 16px corners, 24px padding (32px from tablet up).
// A linked card lifts 2px and shows the offset shadow; it presses back on tap.

type Tone = "white" | "paper" | "ink" | "cobalt" | "gold";
type Pad = "none" | "md" | "lg";

const TONES: Record<Tone, string> = {
  white: "bg-white text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-on-dark",
  cobalt: "bg-cobalt text-white",
  gold: "bg-gold text-ink",
};

const PADS: Record<Pad, string> = { none: "", md: "p-6", lg: "p-6 md:p-8" };

const LIFT =
  "transition-[transform,box-shadow] duration-200 ease-out " +
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--card-shadow,#141414)] " +
  "active:translate-x-0 active:translate-y-0 active:shadow-none";

export function cardClass({
  tone = "white",
  pad = "lg",
  lift = false,
  className = "",
}: { tone?: Tone; pad?: Pad; lift?: boolean; className?: string } = {}) {
  return ["rounded-2xl border-2 border-ink", TONES[tone], PADS[pad], lift ? LIFT : "", className].filter(Boolean).join(" ");
}

type Props = {
  tone?: Tone;
  pad?: Pad;
  /** Colour of the offset shadow on a linked card. Ink when left out. */
  shadow?: string;
  className?: string;
  children: ReactNode;
  /** With an href the card is a link and lifts on hover. */
  href?: string;
  "aria-label"?: string;
  as?: "div" | "li" | "article";
};

export function Card({ tone, pad, shadow, className, children, href, as: Tag = "div", ...rest }: Props) {
  const style = shadow ? ({ "--card-shadow": shadow } as CSSProperties) : undefined;
  if (href) {
    return (
      <a href={href} style={style} className={cardClass({ tone, pad, lift: true, className })} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Tag style={style} className={cardClass({ tone, pad, className })} {...rest}>
      {children}
    </Tag>
  );
}
