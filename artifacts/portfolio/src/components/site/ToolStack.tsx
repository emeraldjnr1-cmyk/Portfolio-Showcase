import { useState } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiClaude, SiN8N, SiMake, SiZapier, SiAirtable, SiOpenai, SiGooglegemini, SiElevenlabs,
  SiTelegram, SiReact, SiNextdotjs, SiTailwindcss, SiFigma, SiFramer, SiReplit, SiWordpress,
  SiElementor, SiVercel, SiHubspot, SiSalesforce, SiNotion, SiStripe, SiTwilio, SiSlack,
  SiSolidity, SiEthereum, SiSolana, SiWeb3Dotjs, SiSupabase, SiShopify, SiDocker, SiRailway,
  SiGooglesheets, SiWhatsapp, SiWagmi, SiGmail, SiRobloxstudio, SiLuau, SiBlender,
} from "react-icons/si";
import { SectionHeader } from "@/components/site/SectionHeader";


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
    blurb: "Systems that take the busywork off your team.",
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
    id: "roblox",
    label: "Roblox & Games",
    blurb: "Games published in your group, hardened against exploits.",
    accent: "#F32317",
    tools: [
      CLAUDE,
      { name: "Roblox Studio", Icon: SiRobloxstudio },
      { name: "Luau", Icon: SiLuau },
      { name: "DataStore", mark: "DS" },
      { name: "Blender", Icon: SiBlender },
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

// Accents dark enough that the active tab needs white text to stay readable.
const LIGHT_ON = new Set(["#0015D4", "#8B5CF6"]);

function ToolMark({ tool, i }: { tool: Tool; i: number }) {
  if (tool.Icon) return <tool.Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden />;
  return (
    <span
      aria-hidden
      className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] md:h-7 md:w-7 md:text-[11px] font-extrabold leading-none"
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
    <section id="stack" className="section-y-sm border-y border-black bg-black px-6 text-on-dark md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader tone="dark" label="The toolkit" title="Pick a job. See what I build it with." className="!mb-0" />

        {/* category pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 md:gap-3">
          {CATEGORIES.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(i)}
                data-cursor="hover"
                aria-pressed={on}
                className={`min-h-11 rounded-full border px-4 font-display text-sm font-bold transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] md:px-5 md:text-base ${
                  on ? "border-transparent" : "border-white/20 hover:border-white/50"
                }`}
                style={
                  on
                    ? { background: c.accent, color: LIGHT_ON.has(c.accent) ? "#FFFFFF" : "#0B0B0B" }
                    : { color: "rgba(255,255,255,0.78)" }
                }
              >
                <span className="whitespace-nowrap">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* tools: the box keeps the height of the fullest set, so the page
            below never jumps when a shorter set is picked. */}
        <div className="mt-8 min-h-[500px] sm:min-h-[300px] lg:min-h-[230px]">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-editorial text-xl text-on-dark-body md:text-2xl">{cat.blurb}</p>

            <ul className="mt-6 flex flex-wrap items-center gap-2.5 md:gap-3">
              {cat.tools.map((t, i) => (
                <li
                  key={`${cat.id}-${t.name}`}
                  className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 md:gap-3 md:px-5 md:py-3.5"
                >
                  <span className="block text-on-dark-body">
                    <ToolMark tool={t} i={i} />
                  </span>
                  <span className="whitespace-nowrap font-display text-sm font-bold tracking-tight md:text-[15px]">{t.name}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 type-label text-on-dark-label">
              {cat.tools.length} tools · Claude Code runs through all of it
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
