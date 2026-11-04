import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { PRODUCT_NAME } from "@/lib/site-copy";
import { esimIndex, PRICES_AS_OF } from "@/lib/esim/copy";
import { formatUsd } from "@/lib/esim/catalogue";
import { pageMetadata } from "@/lib/esim/pages";
import { indexPageGraph, type Crumb } from "@/lib/esim/schema";
import { JsonLd } from "@/components/json-ld";
import { PageSection, PageShell } from "@/components/esim/page-shell";

const PATH = "/esim";

const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "eSIM", path: PATH },
];

const { countries, regions, title, description } = esimIndex();

export const metadata: Metadata = {
  title,
  description,
  ...pageMetadata(PATH, true),
  openGraph: {
    type: "website",
    url: `${siteConfig.url}${PATH}`,
    siteName: PRODUCT_NAME,
    title,
    description,
  },
};

export default function EsimIndexPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <JsonLd data={indexPageGraph(PATH, CRUMBS)} />

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          Travel eSIMs by destination
        </h1>
        <p className="text-lg text-esim-black-700">{description}</p>
      </header>

      {regions.length ? (
        <PageSection id="regions" title="Regional plans">
          <ul className="flex flex-col gap-2">
            {regions.map((region) => (
              <li key={region.path}>
                <Link href={region.path} className="underline">
                  {region.name} eSIM
                </Link>{" "}
                from {formatUsd(region.fromUsd)}
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}

      <PageSection id="destinations" title="All destinations">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <li key={country.iso2} className="flex justify-between gap-4">
              {country.path ? (
                <Link href={country.path} className="underline">
                  {country.name}
                </Link>
              ) : (
                <span>{country.name}</span>
              )}
              <span className="text-esim-black-700">
                from {formatUsd(country.fromUsd)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-base text-esim-black-700">{PRICES_AS_OF}</p>
      </PageSection>
    </PageShell>
  );
}
