import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiClaude, SiN8N, SiMake, SiZapier, SiAirtable, SiOpenai, SiGooglegemini, SiElevenlabs,
  SiTelegram, SiReact, SiNextdotjs, SiTailwindcss, SiFigma, SiFramer, SiReplit, SiWordpress,
  SiElementor, SiVercel, SiHubspot, SiSalesforce, SiNotion, SiStripe, SiTwilio, SiSlack,
  SiSolidity, SiEthereum, SiSolana, SiWeb3Dotjs, SiSupabase, SiShopify, SiDocker, SiRailway,
  SiGooglesheets, SiWhatsapp, SiWagmi, SiGmail,
} from "react-icons/si";
import { SplitWords, Reveal } from "@/components/fx/SplitWords";

const EASE = [0.22, 1, 0.36, 1] as const;

// Site palette, reused for brands that have no icon in the set. Inventing
// a brand's real colours would be worse than a clean house style.
const POPS = ["#0015D4", "#F32317", "#FFCB41", "#FF8FCA", "#84DEF9", "#8B5CF6"];

type Tool = { name: string; Icon?: IconType; mark?: string };

type Category = { id: string; label: string; blurb: string; accent: string; tools: Tool[] };

const CLAUDE: Tool = { name: "Claude Code", Icon: SiClaude };

const CATEGORIES: Category[] = [
  {
    id: "agents",
    label: "AI Agents & Automation",
    blurb: "Systems that run the busywork while you sleep.",
    accent: "#0015D4",
    tools: [
      CLAUDE,
      { name: "n8n", Icon: SiN8N },
      { name: "Make.com", Icon: SiMake },
      { name: "Zapier", Icon: SiZapier },
      { name: "Airtable", Icon: SiAirtable },
      { name: "OpenAI", Icon: SiOpenai },
      { name: "Gemini", Icon: SiGooglegemini },
      { name: "Claude Cowork", Icon: SiClaude },
      { name: "Apify", mark: "Ap" },
      { name: "Qdrant", mark: "Qd" },
      { name: "ElevenLabs", Icon: SiElevenlabs },
      { name: "Telegram", Icon: SiTelegram },
      { name: "Slack", Icon: SiSlack },
      { name: "Sheets", Icon: SiGooglesheets },
      { name: "Gmail", Icon: SiGmail },
    ],
  },
  {
    id: "apps",
    label: "Apps & Design",
    blurb: "Interfaces shipped end to end, not templates.",
    accent: "#F32317",
    tools: [
      CLAUDE,
      { name: "Claude Design", Icon: SiClaude },
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "Figma", Icon: SiFigma },
      { name: "Framer", Icon: SiFramer },
      { name: "Replit", Icon: SiReplit },
      { name: "Lovable", mark: "Lo" },
      { name: "Base44", mark: "B44" },
      { name: "WordPress", Icon: SiWordpress },
      { name: "Elementor", Icon: SiElementor },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
  {
    id: "crm",
    label: "CRM & Client Systems",
    blurb: "Every lead tracked, every follow-up automatic.",
    accent: "#FFCB41",
    tools: [
      CLAUDE,
      { name: "HubSpot", Icon: SiHubspot },
      { name: "Salesforce", Icon: SiSalesforce },
      { name: "GoHighLevel", mark: "GHL" },
      { name: "Airtable", Icon: SiAirtable },
      { name: "Softr", mark: "So" },
      { name: "Notion", Icon: SiNotion },
      { name: "Stripe", Icon: SiStripe },
      { name: "Twilio", Icon: SiTwilio },
      { name: "WhatsApp API", Icon: SiWhatsapp },
      { name: "Chatwoot", mark: "Cw" },
      { name: "Shopify", Icon: SiShopify },
    ],
  },
  {
    id: "web3",
    label: "Web3 & Blockchain",
    blurb: "Contracts, dApps and trading bots that hold up.",
    accent: "#8B5CF6",
    tools: [
      CLAUDE,
      { name: "Solidity", Icon: SiSolidity },
      { name: "Hardhat", mark: "Hh" },
      { name: "Foundry", mark: "Fo" },
      { name: "Ethereum", Icon: SiEthereum },
      { name: "Solana", Icon: SiSolana },
      { name: "web3.js", Icon: SiWeb3Dotjs },
      { name: "wagmi", Icon: SiWagmi },
      { name: "Uniswap", mark: "Un" },
      { name: "Jito", mark: "Ji" },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Docker", Icon: SiDocker },
    ],
  },
  {
    id: "community",
    label: "Communities & Courses",
    blurb: "Membership platforms your people stay inside.",
    accent: "#FF8FCA",
    tools: [
      CLAUDE,
      { name: "Circle.so", mark: "Ci" },
      { name: "Skool", mark: "Sk" },
      { name: "Mighty Networks", mark: "MN" },
      { name: "Whop", mark: "Wh" },
      { name: "Stripe", Icon: SiStripe },
      { name: "Softr", mark: "So" },
      { name: "Railway", Icon: SiRailway },
      { name: "Playwright", mark: "Pw" },
    ],
  },
];

function ToolMark({ tool, i }: { tool: Tool; i: number }) {
  if (tool.Icon) return <tool.Icon className="h-7 w-7" />;
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-extrabold leading-none"
      style={{ background: POPS[i % POPS.length], color: "#0B0B0B" }}
    >
      {tool.mark}
    </span>
  );
}

export function ToolStack() {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];

  return (
    <section id="stack" className="relative overflow-hidden border-y border-black bg-black px-6 py-24 text-[#E7E7E1] md:px-12 md:py-32">
      {/* ghost word behind, same trick as the proof section */}
      <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[15vw] font-extrabold leading-none text-white/[0.035]">
        STACK
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-[#84DEF9]">The toolkit</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="Pick a job. See what I build it with."
            className="mt-4 flex flex-wrap justify-center font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          />
        </div>

        {/* category pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                data-cursor="hover"
                aria-pressed={on}
                className="relative rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors md:text-base"
                style={{ color: on ? "#0B0B0B" : "rgba(231,231,225,0.6)" }}
              >
                {on && (
                  <motion.span
                    layoutId="stack-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: c.accent }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* tools */}
        <AnimatePresence mode="wait">
          {/* min-height holds the box open during the swap, otherwise the
              page below jumps while one set exits and the next enters. */}
          <motion.div
            key={cat.id}
            initial="hide"
            animate="show"
            exit="out"
            className="mt-12 min-h-[520px] sm:min-h-[420px] lg:min-h-[360px]"
          >
            <motion.p
              variants={{
                hide: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                out: { opacity: 0, y: -8, transition: { duration: 0.2 } },
              }}
              className="text-center font-editorial text-xl text-[#E7E7E1]/55 md:text-2xl"
            >
              {cat.blurb}
            </motion.p>

            <motion.div
              variants={{
                hide: {},
                show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
                out: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
              }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
            >
              {cat.tools.map((t, i) => (
                <motion.div
                  key={`${cat.id}-${t.name}`}
                  variants={{
                    hide: { opacity: 0, y: 26, scale: 0.75, rotate: -8 },
                    show: {
                      opacity: 1, y: 0, scale: 1, rotate: 0,
                      transition: { type: "spring", stiffness: 320, damping: 20 },
                    },
                    out: { opacity: 0, scale: 0.9, y: -12, transition: { duration: 0.18 } },
                  }}
                  whileHover={{ y: -6, scale: 1.06 }}
                  data-cursor="hover"
                  className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3.5 backdrop-blur-sm transition-colors hover:border-white/35"
                  style={{ willChange: "transform" }}
                >
                  <span className="block text-[#E7E7E1]/75 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                    <ToolMark tool={t} i={i} />
                  </span>
                  <span className="font-display text-sm font-bold tracking-tight whitespace-nowrap md:text-[15px]">
                    {t.name}
                  </span>
                  {t.name === "Claude Code" && (
                    <span
                      className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: cat.accent }}
                      aria-hidden
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={{
                hide: { opacity: 0 },
                show: { opacity: 1, transition: { delay: 0.5 } },
                out: { opacity: 0, transition: { duration: 0.15 } },
              }}
              className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-[#E7E7E1]/35"
            >
              {cat.tools.length} tools · Claude Code runs through all of it
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
