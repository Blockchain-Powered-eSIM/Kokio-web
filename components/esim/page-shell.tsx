import Link from "next/link";

import { LATEST_PLANS_NOTE } from "@/lib/esim/copy";
import type { Crumb } from "@/lib/esim/schema";
import { StoreBadges } from "@/components/store-badges";

/** The card layout the glossary uses, with a visible breadcrumb trail that matches the BreadcrumbList schema. */
export function PageShell({
  crumbs,
  children,
}: {
  crumbs: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 py-12 md:px-8 md:py-16">
      <article className="mx-auto flex max-w-5xl flex-col gap-12 rounded-4xl border border-esim-black-100 bg-background p-6 shadow-sm md:p-12 lg:p-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm text-esim-black-700">
            {crumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {index === crumbs.length - 1 ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path} className="underline">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </article>
    </main>
  );
}

/** The end of every /esim and hub page: a nudge to check the app for current plans, then the store badges. */
export function PageFooter({ children }: { children?: React.ReactNode }) {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-esim-black-100 pt-8">
      <p className="text-center text-base text-esim-black-700">
        {LATEST_PLANS_NOTE}
      </p>
      <StoreBadges />
      {children}
    </footer>
  );
}

/** One titled block of a destination or region page. */
export function PageSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="flex flex-col gap-4 text-lg font-light leading-8 text-esim-black-900"
    >
      <h2
        id={`${id}-heading`}
        className="font-heading text-2xl font-bold text-foreground md:text-3xl"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
