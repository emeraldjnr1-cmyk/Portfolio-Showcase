import { motion } from "framer-motion";
import { profilePicSmall } from "@/data/portfolio";

/**
 * Rotating circular wordmark that orbits the About portrait.
 * SVG textPath on a circle, spun forever by framer-motion.
 */
export function SpinningBadge({
  size = 132,
  text = "DENVER NOCODE · AVAILABLE FOR WORK · ",
  className = "",
}: {
  size?: number;
  text?: string;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      // Solid disc so the ring stays legible over the photo or the page.
      className={`pointer-events-none rounded-full border-2 border-black bg-primary ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          {/* Offset start point so the text reads from the top of the circle. */}
          <path id="badgeCircle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" fill="none" />
        </defs>
        <text fill="currentColor" fontSize="8.4" fontWeight="800" letterSpacing="1.4">
          <textPath href="#badgeCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * Small circular headshot used wherever the page speaks in first person.
 * Fades in once.
 */
export function Avatar({
  size = 40,
  ring = "#0015D4",
  float = false,
  className = "",
}: {
  size?: number;
  ring?: string;
  float?: boolean;
  className?: string;
}) {
  const head = (
    <motion.span
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-block shrink-0 ${float ? "" : className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="block h-full w-full overflow-hidden rounded-full"
        style={{ boxShadow: `0 0 0 2px ${ring}` }}
      >
        <img
          src={profilePicSmall}
          alt="Denver Emerald Peter"
          width={size}
          height={size}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </span>
    </motion.span>
  );

  // `float` once added an endless bob. Nothing on the site loops now, so it
  // only decides which element takes the caller's class.
  if (!float) return head;
  return <span className={`inline-block ${className}`}>{head}</span>;
}
