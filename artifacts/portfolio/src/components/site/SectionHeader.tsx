import type { ReactNode } from "react";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";

// ── The site's section header ──
// A mono label ("02 · Apps and websites"), the H2, one lead line. Left
// aligned, the same on every section, on light and dark surfaces.

type Props = {
  /** Section number, shown before the label. */
  num?: string;
  label: string;
  /** A plain string animates in word by word; pass JSX for an accent word. */
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  /** Links or notes that belong under the lead. */
  children?: ReactNode;
};

export function SectionHeader({ num, label, title, lead, tone = "light", id, className = "", children }: Props) {
  const dark = tone === "dark";
  const h2 = `mt-3 max-w-4xl text-balance break-words type-h2 ${dark ? "text-white" : "text-ink"}`;
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <Reveal>
        <p className={`type-label ${dark ? "text-sky" : "text-cobalt"}`}>
          {num ? `${num} · ${label}` : label}
        </p>
      </Reveal>
      {typeof title === "string" ? (
        <SplitWords as="h2" text={title} className={`${h2} flex flex-wrap`} />
      ) : (
        <h2 id={id} className={h2}>
          {title}
        </h2>
      )}
      {lead && (
        <Reveal delay={0.2}>
          <p className={`mt-5 max-w-xl type-body ${dark ? "text-on-dark-body" : "text-ink-body"}`}>{lead}</p>
        </Reveal>
      )}
      {children && <Reveal delay={0.3}>{children}</Reveal>}
    </div>
  );
}
