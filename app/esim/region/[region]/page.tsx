import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { PRODUCT_NAME } from "@/lib/site-copy";
import {
  cheapestPlan,
  compareRoute,
  formatDays,
  formatUsd,
  snapshotCountry,
} from "@/lib/esim/catalogue";
import {
  memberNames,
  NO_ID_LINE,
  PRICES_AS_OF,
  regionAnswer,
} from "@/lib/esim/copy";
import {
  builtRegionPages,
  countryPagesByIso,
  isIndexed,
  pageMetadata,
  regionPage,
  type RegionPage,
} from "@/lib/esim/pages";
import type { RouteComparison } from "@/lib/esim/catalogue";
import { plansPageGraph, type Crumb } from "@/lib/esim/schema";
import { JsonLd } from "@/components/json-ld";
import { StoreBadges } from "@/components/store-badges";
import { FaqList } from "@/components/esim/faq-list";
import { PageSection, PageShell } from "@/components/esim/page-shell";
import { PlanTable } from "@/components/esim/plan-table";
import { RegulatoryNote } from "@/components/esim/regulatory-note";

type Params = Promise<{ region: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return builtRegionPages().map((page) => ({ region: page.content.slug }));
}

function crumbsFor(page: RegionPage): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "eSIM", path: "/esim" },
    { name: page.content.name, path: page.path },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const page = regionPage((await params).region);
  if (!page) return {};

  const count = page.offering.countries.length;
  const from = formatUsd(cheapestPlan(page.offering.plans).priceUsd);
  const title = `${page.content.name} eSIM: ${count} countries, one plan from ${from}`;
  const description = `One ${PRODUCT_NAME} eSIM for ${memberNames(page).join(", ")}. Plans from ${from}. No passport, name or email.`;

  return {
    title,
    description,
    ...pageMetadata(page.path, isIndexed(page)),
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${page.path}`,
      siteName: PRODUCT_NAME,
      title,
      description,
    },
  };
}

export default async function RegionEsimPage({ params }: { params: Params }) {
  const page = regionPage((await params).region);
  if (!page) notFound();

  const { content, offering } = page;
  const crumbs = crumbsFor(page);
  const countryPages = countryPagesByIso();
  const members = offering.countries
    .map((iso2) => ({
      iso2,
      name: snapshotCountry(iso2)?.name ?? iso2,
      page: countryPages.get(iso2),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const comparisons = content.routes
    .map((route) => compareRoute(route, offering))
    .filter((comparison): comparison is RouteComparison => comparison !== null);
  const rules = members.flatMap((member) =>
    (member.page?.content.rules ?? []).map((rule) => ({
      country: member.name,
      rule,
    }))
  );

  return (
    <PageShell crumbs={crumbs}>
      <JsonLd
        data={plansPageGraph({
          path: page.path,
          productName: `${content.name} eSIM`,
          crumbs,
          plans: offering.plans,
          faqs: content.faqs,
        })}
      />

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          {content.name} eSIM
        </h1>
        <p className="text-lg text-esim-black-700">{regionAnswer(page)}</p>
        {content.intro ? (
          <p className="text-lg text-esim-black-700">{content.intro}</p>
        ) : null}
      </header>

      <PageSection id="countries" title="Countries covered">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {members.map((member) => (
            <li key={member.iso2}>
              {member.page ? (
                <Link href={member.page.path} className="underline">
                  {member.name}
                </Link>
              ) : (
                member.name
              )}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="plans" title="Regional plans">
        <PlanTable
          plans={offering.plans}
          caption={`${PRODUCT_NAME} ${content.name} eSIM plans`}
        />
        <p className="text-base text-esim-black-700">{PRICES_AS_OF}</p>
      </PageSection>

      {comparisons.length ? (
        <PageSection
          id="regional-or-local"
          title="Regional or separate local plans?"
        >
          <p>
            The cheapest regional plan that lasts the whole trip, against the
            cheapest local plan in each country with data split by days spent
            there.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-base">
              <thead>
                <tr className="border-b border-esim-black-100 text-esim-black-700">
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Route
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Trip
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Regional
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Separate local
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map(({ route, days, regional, localTotal }) => (
                  <tr
                    key={route.label}
                    className="border-b border-esim-black-100"
                  >
                    <td className="py-3 pr-4">{route.label}</td>
                    <td className="py-3 pr-4">
                      {formatDays(days)}, {route.dataGb} GB
                    </td>
                    <td className="py-3 pr-4">
                      {regional ? formatUsd(regional.priceUsd) : "–"}
                    </td>
                    <td className="py-3">
                      {localTotal === null ? "–" : formatUsd(localTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>
      ) : null}

      {rules.length ? (
        <PageSection id="local-rules" title="Local SIM rules differ by country">
          {rules.map(({ country, rule }) => (
            <RegulatoryNote key={rule.text} note={rule} label={country} />
          ))}
          <p>{NO_ID_LINE}</p>
        </PageSection>
      ) : null}

      {content.faqs.length ? (
        <PageSection id="faq" title="FAQ">
          <FaqList faqs={content.faqs} />
        </PageSection>
      ) : null}

      <footer className="flex flex-col items-center gap-4 border-t border-esim-black-100 pt-8">
        <StoreBadges />
        <p className="text-base text-esim-black-700">
          <Link href="/esim" className="underline">
            All destinations
          </Link>
        </p>
      </footer>
    </PageShell>
  );
}
