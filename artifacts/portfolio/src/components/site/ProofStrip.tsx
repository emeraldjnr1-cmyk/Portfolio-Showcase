import { ArrowUpRight, Play } from "lucide-react";
import { SiUpwork } from "react-icons/si";
import { testimonials, UPWORK } from "@/data/portfolio";

/**
 * Proof in the first screen, not halfway down: the real clients who recorded
 * video testimonials, plus a link to the reviews a visitor can check for
 * themselves on Upwork. Outside reviews are trusted over praise a company
 * hosts itself, so the link matters as much as the faces.
 */
export function ProofStrip() {
  const firstNames = testimonials.map((t) => t.name.split(" ")[0]);
  const named = `${firstNames.slice(0, 3).join(", ")} and ${testimonials.length - 3} more`;
  return (
    <section aria-label="Client proof" className="border-y border-black/10 bg-card px-6 py-6 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <a href="#clients" className="group flex items-center gap-4" data-cursor-label="Watch">
          <span className="flex shrink-0 -space-x-2.5 md:-space-x-3">
            {testimonials.map((t) => (
              <img
                key={t.name}
                src={t.poster}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                className="h-9 w-9 rounded-full border-2 border-[#F6F5F1] object-cover md:h-11 md:w-11"
              />
            ))}
          </span>
          <span>
            <span className="block font-display text-base font-extrabold leading-tight text-black md:text-lg">
              Real clients, on camera.
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-ink-body transition-colors group-hover:text-primary">
              <Play className="h-3.5 w-3.5 shrink-0 fill-current" />
              <span className="md:hidden">Watch their stories</span>
              <span className="hidden md:inline">Watch {named}</span>
            </span>
          </span>
        </a>

        <div className="flex flex-wrap items-center gap-3" data-chat-clear>
          <span className="w-full text-sm text-ink-label sm:w-auto">Check the reviews yourself:</span>
          <a
            href={UPWORK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-black bg-white px-4 text-sm font-bold text-black transition-colors duration-150 hover:bg-black hover:text-white"
          >
            <SiUpwork className="h-4 w-4 text-[#0E7A00]" aria-hidden /> Upwork <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
