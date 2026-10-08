import { SplitWords, Reveal } from "@/components/fx/SplitWords";
import { web3Projects } from "@/data/portfolio";
import { FeatureRow, CompactCard } from "@/components/site/WebProjects";

export function Web3ProjectsSection() {
  const [apax, ...grid] = web3Projects;

  return (
    <section id="web3" className="relative border-t border-black/10 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:mb-28">
          <Reveal>
            <span className="font-mono text-sm font-semibold text-primary">The Web3 gallery</span>
          </Reveal>
          <SplitWords
            as="h2"
            text="dApps, bots and smart contracts that ship."
            className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg text-black/55">
              Solana trading systems, EVM contracts, DeFi interfaces and full client builds. Contract to UI, end to
              end.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-black/45">
              <span className="h-2 w-2 bg-[#FFCB41]" aria-hidden />
              APAX is a client build. The other 20 are showcase builds with sample data.
            </p>
          </Reveal>
        </div>

        <FeatureRow project={apax} index={0} />

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-32">
          {grid.map((p, i) => (
            <CompactCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
