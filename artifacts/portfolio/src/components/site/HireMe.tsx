import { ArrowUpRight } from "lucide-react";
import type { IconType } from "react-icons";
import { SiUpwork, SiWise, SiPaypal } from "react-icons/si";
import { Reveal } from "@/components/fx/SplitWords";
import { buttonClass, CtaPair } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FACT_STATS } from "@/data/facts";
import { UPWORK } from "@/data/portfolio";

// Methods only, never account details. Payment instructions belong on an
// invoice sent to a named client, not on a public page where anyone could
// screenshot them and impersonate the payee.
const PAY_METHODS: { name: string; Icon?: IconType; mark?: string }[] = [
  { name: "Wise", Icon: SiWise },
  { name: "Remitly", mark: "Re" },
  { name: "PayPal", Icon: SiPaypal },
  { name: "Bank transfer", mark: "Bk" },
];

export function HireMe() {
  return (
    <section id="hire" className="section-y relative overflow-hidden border-t border-black/10 bg-card px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Ways to hire"
          title="Two ways to start working together."
          lead="Through a platform with buyer protection and escrow, or straight to me. Same work either way."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upwork */}
          <Reveal className="h-full">
            <Card tone="ink" className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <SiUpwork className="h-9 w-9 text-[#14A800]" aria-hidden />
                <span className="rounded-full bg-[#14A800]/25 px-3 py-1 type-label text-white">Open to contracts</span>
              </div>
              <h3 className="mt-6 type-h3 text-white">Upwork</h3>
              <p className="mt-2 type-small text-on-dark-body">
                Hourly or milestone contracts with time tracking. Best for longer builds and ongoing retainers where
                scope evolves.
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-2 rounded-xl border border-white/15 p-4 sm:gap-4 md:p-5">
                {FACT_STATS.map((s) => (
                  <div key={s.short} className="flex flex-col-reverse">
                    <dt className="mt-0.5 text-xs text-on-dark-label">{s.short}</dt>
                    <dd className="whitespace-nowrap font-display text-lg font-extrabold text-white sm:text-xl md:text-2xl">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-8" data-chat-clear>
                <a
                  href={UPWORK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className={buttonClass({ variant: "bare", full: true, className: "bg-[#0E7A00] text-white hover:bg-white hover:text-[#0E7A00]" })}
                >
                  Hire me on Upwork
                  <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
                </a>
              </div>
            </Card>
          </Reveal>

          {/* Direct: the route that keeps the platform fee out of the price */}
          <Reveal delay={0.05} className="h-full">
            <Card tone="cobalt" pad="none" className="flex h-full flex-col overflow-hidden">
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <span className="self-start rounded-full bg-white/15 px-3 py-1 type-label text-white">No platform fee</span>
                <h3 className="mt-6 type-h3 text-white">Work with me directly</h3>
                <p className="mt-2 type-small text-on-dark-body">
                  Skip the middle layer and the commission that comes with it. We agree the scope, I invoice you, and
                  the work starts. Same delivery, same support, lower price.
                </p>
                <div className="mt-auto pt-8">
                  <CtaPair tone="dark" />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/20 bg-black/15 px-6 py-5 md:px-8">
                <span className="type-label text-on-dark-body">Pay however suits you</span>
                <ul className="flex flex-wrap items-center gap-2.5">
                  {PAY_METHODS.map((m) => (
                    <li
                      key={m.name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold"
                    >
                      {m.Icon ? (
                        <m.Icon className="h-4 w-4" aria-hidden />
                      ) : (
                        <span aria-hidden className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-white text-[8px] font-extrabold leading-none text-cobalt">
                          {m.mark}
                        </span>
                      )}
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
