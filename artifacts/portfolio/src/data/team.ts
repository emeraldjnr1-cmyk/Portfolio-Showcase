// ── The D. Team ──
// First names and titles only, as each member agreed on 26 Sep 2026.
// Photos (public/team, cropped square to head and shoulders) arrived 28 Sep;
// the colour stays as the fallback monogram if a photo is ever removed.

export interface TeamMember {
  name: string;
  title: string;
  /** Square head-and-shoulders photo. The founder uses the site portrait. */
  photo?: string;
  /** Monogram colour when there is no photo. */
  color: string;
  ink: string;
  founder?: boolean;
}

export const team: TeamMember[] = [
  { name: "Emerald", title: "Founder and CEO", color: "#0015D4", ink: "#FFFFFF", founder: true },
  { name: "Marcel", title: "AI video editor and automation specialist", photo: "/team/marcel.webp", color: "#F32317", ink: "#FFFFFF" },
  { name: "Smart", title: "Web designer and business automation consultant", photo: "/team/smart.webp", color: "#FFCB41", ink: "#141414" },
  { name: "Samuel", title: "Roblox developer and AI automation expert", photo: "/team/samuel.webp", color: "#84DEF9", ink: "#141414" },
];
