import { profilePic } from "@/data/portfolio";
import { team } from "@/data/team";

/** Four cards: Emerald's portrait, then monograms until the team sends photos. */
export function TeamGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-6 lg:grid-cols-4">
      {team.map((m) => (
        <li key={m.name} className="group">
          <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-black transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#141414]">
            {m.founder ? (
              <img src={profilePic} alt={`${m.name}, ${m.title}`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div
                role="img"
                aria-label={`${m.name}, ${m.title}`}
                className="flex h-full w-full items-center justify-center"
                style={{ backgroundColor: m.color, color: m.ink }}
              >
                <span className="font-display text-[4.5rem] font-black md:text-[7rem] leading-none tracking-tight" aria-hidden>
                  {m.name.charAt(0)}
                  <span style={{ color: m.ink === "#FFFFFF" ? "#141414" : "#0015D4" }}>.</span>
                </span>
              </div>
            )}
            {m.founder && (
              <span className="absolute left-2 top-2 rounded-full border-2 border-black bg-[#FFCB41] px-2 py-0.5 font-mono text-[9px] md:left-3 md:top-3 md:px-3 md:py-1 md:text-[11px] font-bold uppercase tracking-widest text-black">
                Founder
              </span>
            )}
          </div>
          <h3 className="mt-4 font-display text-lg md:mt-5 md:text-2xl font-extrabold tracking-tight text-black">{m.name}</h3>
          <p className="mt-1 text-sm leading-snug text-black/55 md:text-base">{m.title}</p>
        </li>
      ))}
    </ul>
  );
}

/** "The D. Team", with the full stop in cobalt like the logo. */
export function TeamName() {
  return (
    <>
      The D<span className="text-primary">.</span> Team
    </>
  );
}
