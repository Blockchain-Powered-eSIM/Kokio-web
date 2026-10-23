import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Logomark from "@/assets/logomark.svg";
import { getPartnerGroups, partners } from "@/content/partners";
import { HomeSection } from "@/components/home/section";

const linkClass =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-manifesto-ink underline underline-offset-4 hover:text-manifesto-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-manifesto-coral focus-visible:ring-offset-2 focus-visible:ring-offset-manifesto-card";

/**
 * Partner mark. Kokio's own logomark for our own repo; everyone else gets a
 * neutral monogram badge rather than a hand-drawn imitation of their brand.
 */
function PartnerMark({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-manifesto-sand-border bg-manifesto-sand"
    >
      {name.startsWith("Open Source") ? (
        <Image src={Logomark} alt="" className="h-7 w-7" />
      ) : (
        <span className="font-heading text-2xl font-bold text-manifesto-ink">
          {name.charAt(0)}
        </span>
      )}
    </span>
  );
}

/** Copy shared by the page and its agent text so the two cannot disagree. */
export const PARTNERS_COPY = {
  title: "What Kokio is built with",
  lead: "Built so anyone travelling can use it, whichever way they'd rather pay, and open enough that anyone can check how it works.",
} as const;

export function Partners() {
  const groups = getPartnerGroups(partners);
  if (!partners.length || groups.length === 0) return null;

  return (
    <HomeSection>
      <section
        aria-labelledby="partners-heading"
        className="container flex max-w-screen-xl flex-col items-center gap-8 px-4 text-center text-white"
      >
        <div className="flex max-w-3xl flex-col items-center gap-3">
          <h2
            id="partners-heading"
            className="font-heading text-3xl font-bold md:text-4xl"
          >
            {PARTNERS_COPY.title}
          </h2>
          <p className="text-lg">{PARTNERS_COPY.lead}</p>
        </div>
        {groups.map((group) => (
          <div
            key={group.kind}
            className={`flex w-full flex-col items-center gap-4 ${group.items.length >= 3 ? "max-w-5xl" : "max-w-3xl"}`}
          >
            <h3 className="rounded-full bg-cashmere-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cashmere-700">
              {group.kind}
            </h3>
            <ul
              className={`grid w-full gap-4 text-left sm:grid-cols-2 ${group.items.length >= 3 ? "lg:grid-cols-3" : ""}`}
            >
              {group.items.map((partner) => (
                <li
                  key={partner.name}
                  className="flex flex-col gap-3 rounded-3xl border border-manifesto-sand-border bg-manifesto-card p-5 text-manifesto-ink shadow-sm hover:shadow-md motion-safe:transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <PartnerMark name={partner.name} />
                    <h4 className="font-heading text-lg font-bold">
                      {partner.name}
                    </h4>
                  </div>
                  <p className="text-sm">{partner.blurb}</p>
                  {partner.linkLabel ? (
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} mt-auto`}
                    >
                      {partner.linkLabel}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-1"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </HomeSection>
  );
}
