import { ArrowUpRight } from "lucide-react";
import { PageShell, AccentHeading } from "@/components/site/PageShell";

export default function NotFound() {
  return (
    <PageShell cta="Looking for something specific?">
      <section className="px-6 pb-28 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-sm font-semibold text-primary">404</p>
          <div className="mt-4">
            <AccentHeading before="This page " accent="doesn't" after=" exist." color="#F32317" />
          </div>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/60">
            The link may be old, or mistyped. Everything that does exist is one click away.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Work", "/work"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                {label} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
