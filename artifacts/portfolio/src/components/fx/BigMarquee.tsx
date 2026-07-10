import { Marquee } from "@/components/fx/Marquee";

interface BigMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  accent?: string;
}

/** Full-width divider strip of giant outlined words scrolling sideways. */
export function BigMarquee({ items, direction = "left", accent = "#0015D4" }: BigMarqueeProps) {
  return (
    <div className="border-y border-black/10 py-6 md:py-8" aria-hidden>
      <Marquee direction={direction} duration={30} pauseOnHover={false}>
        {items.map((item, i) => (
          <span key={i} className="mx-6 flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-6xl font-extrabold uppercase tracking-tight text-stroke md:text-8xl">
              {item}
            </span>
            <span className="h-4 w-4 rounded-full md:h-5 md:w-5" style={{ backgroundColor: accent }} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
