// ── Typical projects and starting prices (USD) ──
// Set by Emerald from his own past quotes, at his usual middle (target) tier,
// so a "from" figure is a real price he has quoted, never a teaser. Every
// project still gets its own fixed quote within 24 hours. Pax may quote these
// figures (and only these) as starting points.

export interface Package {
  name: string;
  from: number;
  what: string;
  includes: string[];
  timeline: string;
  /** Service page that explains it. */
  href: string;
  featured?: boolean;
}

export const packages: Package[] = [
  {
    name: "Claude setup and training",
    from: 800,
    what: "Claude and Claude Code set up around how your team works, with live training so you can run it yourselves.",
    includes: ["Workspace and project setup", "Your own prompts, skills and guardrails", "Live training sessions", "Written playbook"],
    timeline: "About 1 week",
    href: "/services/claude-code",
  },
  {
    name: "Focused automation",
    from: 950,
    what: "One workflow that eats your team's hours, built to run on its own: lead capture, onboarding, invoicing or reporting.",
    includes: ["Mapping the current process", "Build in n8n, Make.com or code", "Error alerts", "Walkthrough video and docs"],
    timeline: "3 to 7 days",
    href: "/services/automation",
  },
  {
    name: "AI agent or chatbot",
    from: 1750,
    what: "An assistant that answers from your own data and acts in your tools, with a person approving anything that matters.",
    includes: ["Trained on your documents and site", "Connected to your tools", "Human approval steps", "Testing with your real questions"],
    timeline: "1 to 2 weeks",
    href: "/services/ai-agents",
    featured: true,
  },
  {
    name: "Website or web app",
    from: 1750,
    what: "A fast, search-ready website or focused web app built with Claude Code, hosted on accounts you own.",
    includes: ["Design and build", "Mobile-first and SEO-ready", "Forms and integrations", "Hosting and handover"],
    timeline: "1 to 3 weeks",
    href: "/services/websites-apps",
  },
  {
    name: "Full platform",
    from: 2950,
    what: "A multi-user product with accounts, roles, data and an AI layer, delivered in milestones you approve one at a time.",
    includes: ["Accounts and permissions", "Database and admin screens", "AI features with Claude", "Milestone delivery"],
    timeline: "3 weeks and up",
    href: "/services/claude-code",
  },
];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
