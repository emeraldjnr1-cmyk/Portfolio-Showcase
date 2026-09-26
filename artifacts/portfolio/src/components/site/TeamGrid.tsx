import { motion } from "framer-motion";
import { profilePic } from "@/data/portfolio";
import { team, type TeamMember } from "@/data/team";

const EASE = [0.22, 1, 0.36, 1] as const;

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <div className="group text-center">
      <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-black transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#141414]">
        {m.founder ? (
          // Zoomed to head and shoulders: the source portrait is a full half-body shot.
          <img
            src={profilePic}
            alt={`${m.name}, ${m.title}`}
            className="h-full w-full scale-[1.75] object-cover"
            style={{ transformOrigin: "50% 12%" }}
            loading="lazy"
          />
        ) : (
          <div
            role="img"
            aria-label={`${m.name}, ${m.title}`}
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: m.color, color: m.ink }}
          >
            <span className="font-display text-[2.75rem] font-black leading-none tracking-tight sm:text-[4.5rem] md:text-[6rem]" aria-hidden>
              {m.name.charAt(0)}
              <span style={{ color: m.ink === "#FFFFFF" ? "#141414" : "#0015D4" }}>.</span>
            </span>
          </div>
        )}
        {m.founder && (
          <span className="absolute bottom-2 left-2 rounded-full border-2 border-black bg-[#FFCB41] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-black md:bottom-3 md:left-3 md:px-3 md:py-1 md:text-[11px]">
            Founder
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-base font-extrabold tracking-tight text-black sm:text-lg md:mt-5 md:text-2xl">{m.name}</h3>
      <p className="mx-auto mt-1 max-w-[16rem] text-[11px] leading-snug text-black/55 sm:text-sm md:text-base">{m.title}</p>
    </div>
  );
}

/** A line that draws itself in once, from its origin. */
function Line({ className, axis, delay }: { className: string; axis: "x" | "y"; delay: number }) {
  return (
    <motion.div
      aria-hidden
      className={`bg-black ${className}`}
      initial={axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    />
  );
}

/**
 * An org chart: the founder on top, the team branching below. The three
 * columns have no gap (padding sits inside them) so their centres fall at
 * exactly 1/6, 1/2 and 5/6, which is where the connector bar starts and ends.
 */
export function TeamGrid() {
  const [founder, ...members] = team;
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto w-[42%] px-1.5 sm:w-1/3 sm:px-3">
        <MemberCard m={founder} />
      </div>

      {/* Trunk, then the bar spanning the three column centres. */}
      <Line axis="y" delay={0.1} className="mx-auto mt-5 h-10 w-0.5 origin-top md:mt-8 md:h-14" />
      <Line axis="x" delay={0.45} className="mx-[16.6667%] h-0.5 origin-center" />

      <ul className="grid grid-cols-3">
        {members.map((m) => (
          <li key={m.name} className="px-1.5 sm:px-3">
            <Line axis="y" delay={0.85} className="mx-auto h-8 w-0.5 origin-top md:h-12" />
            <MemberCard m={m} />
          </li>
        ))}
      </ul>
    </div>
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
