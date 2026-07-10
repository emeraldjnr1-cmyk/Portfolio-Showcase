import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}

/** Infinite marquee: children are rendered twice and scrolled 50%. */
export function Marquee({ children, direction = "left", duration = 40, className = "", pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}>
      <div
        className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
