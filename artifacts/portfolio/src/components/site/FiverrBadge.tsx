import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BadgeTheme {
  bgOuter: string;   // card background
  bgDiamond: string; // large diamond
  bgDiamondIn: string; // inner diamond
  hex: string;       // hexagon fill
  hexLine: string;   // inner hexagon outline
  gemOn: string;     // lit gems
  gemOff: string;    // unlit gems
  label: string;     // LEVEL text color
}

export const L2_THEME: BadgeTheme = {
  bgOuter: "#BFD62F", bgDiamond: "#8FBE28", bgDiamondIn: "#DDE873",
  hex: "#1D5B2E", hexLine: "#8FBE28", gemOn: "#C7E63C", gemOff: "#3E7A48", label: "#C7E63C",
};
export const L1_THEME: BadgeTheme = {
  bgOuter: "#E9A8C2", bgDiamond: "#D77FA6", bgDiamondIn: "#F3CBDC",
  hex: "#5C1F3D", hexLine: "#D77FA6", gemOn: "#F3CBDC", gemOff: "#8A4A66", label: "#F3CBDC",
};

/** Faithful vector recreation of Fiverr's level badge: diamond field, hexagon shield,
 * ribbon banner with gems (lit count = level), LEVEL wordmark. */
export function FiverrLevelBadge({ level, lit, theme, times, delay }: { level: number; lit: number; theme: BadgeTheme; times: string; delay: number }) {
  const gems = [0, 1, 2];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="group flex flex-col items-center gap-3"
      data-cursor="hover"
    >
      <div className="overflow-hidden rounded-2xl border-2 border-black transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_rgba(20,20,20,0.85)]">
        <svg width="224" height="112" viewBox="0 0 224 112" role="img" aria-label={`Fiverr Level ${level} seller badge`}>
          {/* diamond field */}
          <rect width="224" height="112" fill={theme.bgOuter} />
          <polygon points="112,-44 268,56 112,156 -44,56" fill={theme.bgDiamond} />
          <polygon points="112,-16 216,56 112,128 8,56" fill={theme.bgDiamondIn} />
          <polygon points="112,8 180,56 112,104 44,56" fill={theme.bgDiamond} />
          {/* hexagon shield — widened so the wordmark sits fully inside */}
          <polygon points="112,14 152,36 152,80 112,102 72,80 72,36" fill={theme.hex} />
          <polygon points="112,21 146,40 146,77 112,96 78,77 78,40" fill="none" stroke={theme.hexLine} strokeWidth="1.6" opacity="0.85" />
          {/* ribbon banner */}
          <polygon points="34,38 54,50 34,62" fill="#EFEDE2" />
          <polygon points="190,38 170,50 190,62" fill="#EFEDE2" />
          <rect x="44" y="34" width="136" height="32" fill="#F7F5EC" />
          <rect x="44" y="34" width="136" height="32" fill="none" stroke="rgba(20,20,20,0.08)" strokeWidth="1" />
          {/* gems: lit count = level tier */}
          {gems.map((g) => {
            const cx = 90 + g * 22;
            const on = g < lit;
            return (
              <polygon
                key={g}
                points={`${cx},42 ${cx + 7},50 ${cx},58 ${cx - 7},50`}
                fill={on ? theme.gemOn : theme.gemOff}
                opacity={on ? 1 : 0.35}
              />
            );
          })}
          {/* wordmark */}
          <text x="112" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="800" letterSpacing="2" fill={theme.label}>
            LEVEL {level}
          </text>
        </svg>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-black/45">Vetted on Fiverr · {times}</p>
    </motion.div>
  );
}
