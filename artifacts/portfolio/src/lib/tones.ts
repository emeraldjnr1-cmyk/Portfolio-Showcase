// The pop colours are for chips, marks and shadows. As TEXT on the light
// surfaces (bone, paper, white) most of them are too pale to read, so each has
// a darker partner that passes WCAG AA there. Mirrors the "-text" tokens in
// index.css; use inkFor() wherever an accent arrives as data.
const TEXT_ON_LIGHT: Record<string, string> = {
  "#0015D4": "#0015D4", // cobalt already passes
  "#F32317": "#B3140A", // red
  "#FFCB41": "#7D5200", // gold
  "#BA7517": "#7D5200", // amber
  "#B8860B": "#7D5200",
  "#FF8FCA": "#A8196B", // pink
  "#84DEF9": "#005F80", // sky
  "#0BB07B": "#006B4F", // green
  "#00795A": "#006B4F",
  "#8B5CF6": "#5B2BD6", // violet
};

/** The readable-on-light version of an accent colour. Unknown colours pass through. */
export function inkFor(accent: string): string {
  return TEXT_ON_LIGHT[accent.toUpperCase()] ?? accent;
}
