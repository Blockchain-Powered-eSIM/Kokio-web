/** Joins hand-written content with the snapshot and the quality gate. Every /esim surface reads pages from here. */

import type { Metadata } from "next";

import { countries } from "@/content/esim/countries";
import { regions } from "@/content/esim/regions";
import { DEFAULT_LOCALE, LOCALES } from "@/content/esim/locales";
import { siteConfig } from "@/config/site";
import { findOffering, snapshotCountry } from "@/lib/esim/catalogue";
import { gateCountry, gateRegion, type Verdict } from "@/lib/esim/quality-gate";
import type {
  CountryContent,
  RegionContent,
  SnapshotCountry,
  SnapshotOffering,
} from "@/lib/esim/types";

export interface CountryPage {
  path: string;
  content: CountryContent;
  catalogue: SnapshotCountry;
  verdict: Verdict;
}

export interface RegionPage {
  path: string;
  content: RegionContent;
  offering: SnapshotOffering;
  verdict: Verdict;
}

function toCountryPage(content: CountryContent): CountryPage | null {
  const catalogue = snapshotCountry(content.iso2);
  const verdict = gateCountry(content, catalogue);
  if (verdict.status === "exclude" || !catalogue) return null;
  return { path: `/esim/${content.slug}`, content, catalogue, verdict };
}

function toRegionPage(content: RegionContent): RegionPage | null {
  const offering = findOffering(content.offering);
  const verdict = gateRegion(content, offering);
  if (verdict.status === "exclude" || !offering) return null;
  return { path: `/esim/region/${content.slug}`, content, offering, verdict };
}

/** Pages that get built, indexed or not. */
export function builtCountryPages(): CountryPage[] {
  return countries
    .map(toCountryPage)
    .filter((page): page is CountryPage => page !== null);
}

export function builtRegionPages(): RegionPage[] {
  return regions
    .map(toRegionPage)
    .filter((page): page is RegionPage => page !== null);
}

export function countryPage(slug: string): CountryPage | null {
  return builtCountryPages().find((page) => page.content.slug === slug) ?? null;
}

export function regionPage(slug: string): RegionPage | null {
  return builtRegionPages().find((page) => page.content.slug === slug) ?? null;
}

/** Built country pages keyed by ISO code, for linking from lists of countries. */
export function countryPagesByIso(): Map<string, CountryPage> {
  return new Map(builtCountryPages().map((page) => [page.content.iso2, page]));
}

export function isIndexed(page: { verdict: Verdict }): boolean {
  return page.verdict.status === "index";
}

function localeUrl(locale: string, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return new URL(`${prefix}${path}`, siteConfig.url).href;
}

/**
 * Canonical, hreflang and robots for one page. Only approved locales are
 * listed, and the markdown copy is only offered for indexed pages, since that
 * is all /llms-full.txt and the .md routes carry.
 */
export function pageMetadata(path: string, indexed: boolean): Metadata {
  return {
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((locale) => [locale.code, localeUrl(locale.code, path)])
        ),
        "x-default": localeUrl(DEFAULT_LOCALE, path),
      },
      ...(indexed ? { types: { "text/markdown": `${path}.md` } } : {}),
    },
    ...(indexed ? {} : { robots: { index: false, follow: true } }),
  };
}
