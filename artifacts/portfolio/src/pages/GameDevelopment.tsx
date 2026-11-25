import { ArrowUpRight } from "lucide-react";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { FeaturedGameFilm, FeaturedGameText, ShortList } from "@/components/site/GameVideos";
import { RobloxProjectsSection } from "@/components/site/RobloxProjects";
import { clientShorts, featuredGame, formatShorts, storyShorts } from "@/data/games";
import { robloxProjects } from "@/data/portfolio";

const ACCENT = "#0015D4";
const TRAIL: Array<[string, string]> = [["Home", "/"], ["Services", "/services"], ["Game development", "/game-development"]];

const JUMPS = [
  { href: "#shorts", label: "Story Shorts", count: storyShorts.length + formatShorts.length },
  { href: "#client-work", label: "Client work", count: clientShorts.length },
  { href: "#roblox", label: "Game demos", count: robloxProjects.length },
];

function Intro({ withGame }: { withGame: boolean }) {
  return (
    <>
      <p className="max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">
        {withGame
          ? "An original browser game, Roblox story Shorts and Roblox concept demos, each one shown as it plays. Pick a film to watch it."
          : "Roblox story Shorts and Roblox concept demos, each one shown as it plays. Pick a film to watch it."}
      </p>
      <div className="mt-8">
        <StartButtons />
      </div>
      <ul className="mt-10 flex flex-wrap gap-3" aria-label="On this page">
        {JUMPS.map((j) => (
          <li key={j.href}>
            <a
              href={j.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              {j.label}
              <span className="rounded-full bg-black/10 px-2 py-0.5 font-mono text-xs tabular-nums">{j.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function GameDevelopmentPage() {
  // The featured game takes the top of the page once its film exists.
  const withGame = featuredGame.videoSrc !== "" || (featuredGame.poster !== "" && featuredGame.playUrl !== "");

  return (
    <PageShell cta="Want a game or a Short like these?">
      {withGame ? (
        <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
          <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Breadcrumbs trail={TRAIL} />
              <div className="mt-8">
                <AccentHeading before="Games and Shorts, in " accent="motion" after="." color={ACCENT} />
              </div>
            </div>
            <div className="lg:col-span-7 lg:row-span-2">
              <FeaturedGameFilm game={featuredGame} />
              <div className="mt-8">
                <FeaturedGameText game={featuredGame} />
              </div>
            </div>
            <div className="lg:col-span-5">
              <Intro withGame />
            </div>
          </div>
        </section>
      ) : (
        <section className="px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs trail={TRAIL} />
            <div className="mb-8 mt-8">
              <AccentHeading before="Games and Shorts, in " accent="motion" after="." color={ACCENT} />
            </div>
            <Intro withGame={false} />
          </div>
        </section>
      )}

      {/* In-house Shorts */}
      <section id="shorts" className="scroll-mt-24 border-t border-black/10 bg-card px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-x-6 gap-y-10 lg:grid-cols-4">
            <div className="lg:col-span-2 lg:pr-12">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance text-black md:text-6xl">
                Roblox stories, told in a{" "}
                <span className="font-editorial font-normal" style={{ color: ACCENT }}>
                  minute
                </span>
                .
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/55">
                Vertical Shorts written and animated in-house, with captions on screen. They start muted, and each
                one has a sound control once it is playing.
              </p>
              <h3 className="mt-12 font-display text-2xl font-extrabold tracking-tight text-black md:text-3xl lg:mt-16">
                One story, two parts
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-black/60">
                A world where hair colour gives your mood away, and the morning that rule breaks. Part one sets the
                hook in 30 seconds. Part two takes a full minute to pay it off.
              </p>
            </div>
            <ShortList shorts={storyShorts} className="lg:col-span-2" />
          </div>

          <div className="mt-16 border-t border-black/10 pt-14 lg:mt-24 lg:pt-20">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-black md:text-3xl">Four formats</h3>
            <p className="mt-3 max-w-md leading-relaxed text-black/60">
              The same build pipeline, pointed at science, history, horror and motivation.
            </p>
            <ShortList shorts={formatShorts} className="mt-10 lg:grid-cols-4" />
          </div>
        </div>
      </section>

      {/* Client work */}
      <section id="client-work" className="scroll-mt-24 border-t border-black/10 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-x-6 gap-y-10 lg:grid-cols-4">
          <div className="lg:pr-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-black md:text-5xl">
              Made for{" "}
              <span className="font-editorial font-normal" style={{ color: ACCENT }}>
                clients
              </span>
              .
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-black/60">
              One finished story Short and two style tests, made for clients' channels. Client names stay private.
            </p>
          </div>
          <ShortList shorts={clientShorts} className="lg:col-span-3 lg:grid-cols-3" />
        </div>
      </section>

      {/* The twenty concept demos, with their own "concept demo" labels. */}
      <RobloxProjectsSection />

      <section className="border-t border-black/10 bg-card px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-black md:text-3xl">
              Need a Roblox game built in your own group?
            </h2>
            <p className="mt-2 max-w-xl leading-relaxed text-black/60">
              The Roblox service page covers what gets built, how milestones work and what you own at handover.
            </p>
          </div>
          <a
            href="/services/roblox"
            className="inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full border border-black/25 px-7 font-display text-[15px] font-bold text-black transition-colors hover:border-black hover:bg-black hover:text-white md:text-base"
          >
            See the Roblox service <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
