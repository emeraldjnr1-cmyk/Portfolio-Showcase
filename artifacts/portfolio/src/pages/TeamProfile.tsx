import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { SiUpwork, SiWhatsapp } from "react-icons/si";
import NotFound from "@/pages/not-found";
import { PageShell, Breadcrumbs, AccentHeading, StartButtons } from "@/components/site/PageShell";
import { cardClass } from "@/components/site/Card";
import { team, memberBySlug, LOCATION, type TeamMember } from "@/data/team";
import { profilePic, testimonials, UPWORK, WHATSAPP } from "@/data/portfolio";
import { FACT_STATS } from "@/data/facts";

// Emerald's page takes emerald as its accent. Buttons and the menu stay brand
// cobalt, so actions look the same on every page. Text uses a deep jewel
// emerald (about 4.5:1 on the bone background); Pantone Emerald #009B77 is
// only 2.8:1 there, so it is kept for the portrait's shadow.
export const EMERALD = "#006B4F"; // the AA-on-bone green (--green-text)
const EMERALD_GLOW = "#009B77";
const COBALT = "#0015D4";

// ── Shared pieces ──

/** Opens Lagos in Google Maps. */
function LocationButton() {
  return (
    <a
      href={LOCATION.maps}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
    >
      <MapPin className="h-4 w-4" /> {LOCATION.label}
    </a>
  );
}

/** Emerald's local time, so a client abroad knows when a reply is likely. */
function LocalTime() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: LOCATION.timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-4 py-2 text-sm font-medium tabular-nums text-ink-body">
      <Clock className="h-4 w-4" aria-hidden />
      {/* Fixed-width slot: the time arrives after hydration and must not push the row. */}
      <span className="inline-block min-w-[6.25rem]">{now ? `${now} in Lagos` : "Lagos time"}</span> <span className="text-ink-label">· {LOCATION.zone}</span>
    </span>
  );
}

function Portrait({ m, className = "", accent = COBALT }: { m: TeamMember; className?: string; accent?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] border-2 border-black bg-black ${className}`} style={{ boxShadow: `10px 10px 0 ${accent}` }}>
      {m.founder ? (
        // A dedicated studio portrait for this page, pre-cropped to 4:5.
        <img src="/team/emerald-portrait.webp" alt={m.fullName ?? m.name} width={960} height={1200} className="aspect-[4/5] w-full object-cover" />
      ) : (
        <img src={m.photo} alt={`${m.name}, ${m.title}`} className="aspect-square w-full object-cover" />
      )}
    </div>
  );
}

function Section({ children, tint = false }: { children: ReactNode; tint?: boolean }) {
  return (
    <section className={`border-t border-black/10 px-6 section-y md:px-12 ${tint ? "bg-card" : ""}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function H2({ before, accent, after = ".", color = COBALT }: { before: string; accent: string; after?: string; color?: string }) {
  return (
    <h2 className="type-h2 text-balance text-ink">
      {before}
      <span className="font-editorial font-normal" style={{ color }}>
        {accent}
      </span>
      {after}
    </h2>
  );
}

function HandlesAndSkills({ m, who, color = COBALT }: { m: TeamMember; who: string; color?: string }) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">{who} handles</p>
        <ul className="mt-5 border-t border-black/15">
          {m.handles.map((h, i) => (
            <li key={h} className="flex gap-4 border-b border-black/15 py-4">
              <span className="font-mono text-sm font-bold" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-ink-body">{h}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">Skills and tools</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {m.skills.map((s) => (
            <li key={s} className="rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-body">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TeamStrip({ exclude }: { exclude: string }) {
  const others = team.filter((m) => m.slug !== exclude);
  return (
    <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
      {others.map((m) => (
        <li key={m.slug}>
          <a href={`/team/${m.slug}`} className={cardClass({ pad: "none", lift: true, className: "group flex items-center gap-3 p-3 md:gap-4" })}>
            {m.founder ? (
              <img src={profilePic} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover object-top" />
            ) : (
              <img src={m.photo} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
            )}
            <span className="min-w-0">
              <span className="block font-display text-base font-extrabold text-black group-hover:text-primary">{m.name}</span>
              <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-body">{m.title}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// ── /team/:slug ──
export function TeamProfilePage({ slug }: { slug: string }) {
  const m = memberBySlug(slug);
  if (!m) return <NotFound />;
  return m.founder ? <FounderProfile m={m} /> : <MemberProfile m={m} />;
}

function FounderProfile({ m }: { m: TeamMember }) {
  const PRINCIPLES = [
    { t: "If it won't work, you hear it first.", d: "Before you pay for anything, I tell you what will work, what won't, and why." },
    { t: "You own everything.", d: "Every system is built in, or handed over to, your own accounts: code, hosting, data and keys." },
    { t: "Handover is half the job.", d: "Each build ships with a walkthrough video and plain docs, so you are never stuck waiting on me." },
    { t: "One point of contact.", d: "You deal with me from the first message to handover, even when the team joins in." },
  ];
  const STATS = FACT_STATS.map((s) => ({ v: s.value, l: s.label }));

  return (
    <PageShell cta="Want to work with Emerald?">
      {/* Hero */}
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div>
            <Breadcrumbs trail={[["Home", "/"], ["Team", "/team"], [m.name, `/team/${m.slug}`]]} />
            <p className="mt-8 font-mono text-sm font-semibold" style={{ color: EMERALD }}>
              Founder and CEO, Denver NoCode
            </p>
            <div className="mt-4">
              <AccentHeading before="Meet " accent={m.name} after="." color={EMERALD} />
            </div>
            <p className="mt-3 font-mono text-sm font-semibold uppercase tracking-widest text-ink-label">
              Denver <span style={{ color: EMERALD }}>Emerald</span> Peter
            </p>
            <p className="mt-7 max-w-xl text-xl font-semibold leading-snug text-black md:text-2xl">{m.lead}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <LocationButton />
              <LocalTime />
              <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-4 py-2 text-sm font-medium text-ink-body">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#0BB07B]" /> Available for new projects
              </span>
            </div>
            <div className="mt-9">
              <StartButtons />
            </div>
          </div>
          <Portrait m={m} className="mx-auto w-full max-w-sm rotate-2" accent={EMERALD_GLOW} />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black px-6 py-16 text-[#E7E7E1] md:px-12">
        <ul className="mx-auto grid max-w-7xl grid-cols-3 gap-3 md:gap-10">
          {STATS.map((s) => (
            <li key={s.l}>
              <p className="whitespace-nowrap font-display text-2xl font-extrabold text-white sm:text-3xl md:text-5xl">{s.v}</p>
              <p className="mt-1.5 text-xs text-on-dark-label sm:text-sm">{s.l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Story */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <H2 before="My " accent="story" color={EMERALD} />
          <div className="space-y-5 text-lg leading-relaxed text-ink-body">
            {m.bio.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* How I work */}
      <Section tint>
        <H2 before="How I " accent="work" color={EMERALD} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.t} className="rounded-2xl border-2 border-black bg-white p-7">
              <span className="font-mono text-sm font-bold text-ink-label">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-black">{p.t}</h3>
              <p className="mt-2 leading-relaxed text-ink-body">{p.d}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* What I handle */}
      <Section>
        <H2 before="On every " accent="project" color={EMERALD} />
        <div className="mt-12">
          <HandlesAndSkills m={m} who="Emerald" color={EMERALD} />
        </div>
      </Section>

      {/* Clients */}
      <Section tint>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 before="In clients' " accent="words" color={EMERALD} />
          <a href="/#clients" className="inline-flex items-center gap-1.5 text-sm font-bold text-black hover:text-primary">
            Watch the video testimonials <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="h-full rounded-2xl border-2 border-black bg-white p-7">
                <blockquote className="font-editorial text-lg leading-snug text-black">"{t.quote.replace(/\s*—\s*/g, ", ")}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink-body">{t.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {/* Team */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 before="The team I " accent="lead" color={EMERALD} />
          <a href="/team" className="inline-flex items-center gap-1.5 text-sm font-bold text-black hover:text-primary">
            The D. Team <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12">
          <TeamStrip exclude={m.slug} />
        </div>
      </Section>

      {/* Find me */}
      <Section tint>
        <H2 before="Find me " accent="here" color={EMERALD} />
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            { href: WHATSAPP, label: "WhatsApp", Icon: SiWhatsapp },
            { href: UPWORK, label: "Upwork", Icon: SiUpwork },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
          <LocationButton />
        </div>
      </Section>
    </PageShell>
  );
}

function MemberProfile({ m }: { m: TeamMember }) {
  return (
    <PageShell cta={`Want ${m.name} on your project?`}>
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div>
            <Breadcrumbs trail={[["Home", "/"], ["Team", "/team"], [m.name, `/team/${m.slug}`]]} />
            <p className="mt-8 font-mono text-sm font-semibold text-primary">{m.title}</p>
            <div className="mt-4">
              <AccentHeading before="Meet " accent={m.name} after="." color="#0015D4" />
            </div>
            <p className="mt-7 max-w-xl text-xl font-semibold leading-snug text-black md:text-2xl">{m.lead}</p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-body">
              {m.bio.map((p) => (
                <p key={p.slice(0, 20)} className="max-w-xl">
                  {p}
                </p>
              ))}
            </div>
            <a href="/team/emerald" className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-black hover:text-primary">
              Part of the D. Team, led by Emerald <ArrowUpRight className="h-4 w-4" />
            </a>
            {m.draft && (
              <p className="mt-6 max-w-xl rounded-xl border-2 border-dashed border-black/25 px-4 py-3 text-sm text-ink-label">
                Draft profile: {m.name}'s own words are on the way.
              </p>
            )}
          </div>
          <Portrait m={m} className="mx-auto w-full max-w-sm -rotate-2" />
        </div>
      </section>

      <Section tint>
        <HandlesAndSkills m={m} who={m.name} />
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
          <div>
            <H2 before={`Working with ${m.name}`} accent="" after="" />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-body">
              Every project starts with Emerald, who scopes the work, sends a fixed quote within 24 hours and brings{" "}
              {m.name} in. You keep one point of contact from the first message to handover.
            </p>
          </div>
          <StartButtons />
        </div>
      </Section>

      <Section tint>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-label">The rest of the team</p>
        <div className="mt-6">
          <TeamStrip exclude={m.slug} />
        </div>
      </Section>
    </PageShell>
  );
}
