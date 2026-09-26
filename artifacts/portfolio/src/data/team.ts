// ── The D. Team ──
// First names and titles only, as each member agreed on 26 Sep 2026.
// Photos replace the monograms once each member sends one.

export interface TeamMember {
  name: string;
  title: string;
  /** Monogram colour until a photo arrives. */
  color: string;
  ink: string;
  founder?: boolean;
}

export const team: TeamMember[] = [
  { name: "Emerald", title: "Founder and CEO", color: "#0015D4", ink: "#FFFFFF", founder: true },
  { name: "Marcel", title: "AI video editor and automation specialist", color: "#F32317", ink: "#FFFFFF" },
  { name: "Smart", title: "Web designer and business automation consultant", color: "#FFCB41", ink: "#141414" },
  { name: "Samuel", title: "Roblox developer and AI automation expert", color: "#84DEF9", ink: "#141414" },
];
