import { PageShell, Breadcrumbs, StartButtons } from "@/components/site/PageShell";
import { TeamGrid, TeamName } from "@/components/site/TeamGrid";

export function TeamPage() {
  return (
    <PageShell cta="Want the team on your project?">
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs trail={[["Home", "/"], ["Team", "/team"]]} />
          <h1 className="mt-8 font-display text-[12vw] font-extrabold leading-[1.02] tracking-tight text-black sm:text-6xl lg:text-[5.4rem]">
            <TeamName />
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/60 md:text-xl">
            Denver NoCode is led by Emerald, who runs every project from the first message to handover. When a build
            needs AI video, web design or Roblox development, the D. Team joins in, and you still deal with one person.
          </p>
          <div className="mt-10">
            <StartButtons />
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-card px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <TeamGrid />
        </div>
      </section>
    </PageShell>
  );
}
