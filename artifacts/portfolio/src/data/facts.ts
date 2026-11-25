// ── The numbers, in one place ──
// Confirmed by Emerald (Nov 2026). Every page, the SEO descriptions, llms.txt
// and what Ask Pax knows all read from here, so the site can never show two
// different counts again. Change a figure here and nowhere else.
export const FACTS = {
  systems: "200+",
  clients: "50+",
  years: "4+ yrs",
} as const;

/** Stat tiles: home "ways to hire" and the founder profile. */
export const FACT_STATS = [
  { value: FACTS.systems, label: "Systems delivered", short: "Systems" },
  { value: FACTS.clients, label: "Clients worldwide", short: "Clients" },
  { value: FACTS.years, label: "Building automations", short: "Building" },
] as const;

/** One-line version for meta descriptions. */
export const FACT_SHORT = `${FACTS.systems} systems for ${FACTS.clients} clients worldwide.`;

/** Long version for llms.txt and the knowledge pack. */
export const FACT_LONG = `${FACTS.systems} systems delivered for ${FACTS.clients} clients worldwide, over ${FACTS.years.replace(" yrs", "")} years of building automations.`;
