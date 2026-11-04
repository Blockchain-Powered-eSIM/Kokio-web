/** Sentences built from page data. Shared by the HTML pages and their markdown copies so the two never disagree. */

import {
  cheapestPlan,
  compareRoute,
  formatData,
  formatDays,
  formatUsd,
  formatDay,
  SNAPSHOT_DATE,
  snapshotCountries,
  snapshotCountry,
  type RouteComparison,
} from "@/lib/esim/catalogue";
import {
  builtRegionPages,
  countryPagesByIso,
  regionPage,
  type CountryPage,
  type RegionPage,
} from "@/lib/esim/pages";
import { PRODUCT_NAME } from "@/lib/site-copy";

export const PAYMENTS_LINE =
  "Pay by card, Apple Pay, Google Pay, PayPal, or crypto (USDC, USDT or DAI from a Kokio Wallet on Base, or other coins via MoonPay). The plan price is the same whichever way you pay.";

export const NO_ID_LINE =
  "Kokio asks for no ID at all: you sign in with a passkey, and we never collect your name or email.";

export const ROAMING_LINE =
  "Kokio plans connect by roaming, so there is no local SIM to register.";

export const PRICES_AS_OF = `Prices as of ${formatDay(SNAPSHOT_DATE)}. The app always shows the current price.`;

/** Shown under the /esim list, which carries one starting price per country. */
export const INDEX_PRICE_NOTE =
  "Prices can change. Install the app to see today's price and every plan for your trip.";

export const GUIDE_PATH = "/blogs/esim-guide-for-travellers-2026";

export function networkGenerations(page: CountryPage): string {
  return page.catalogue.plans.some((plan) => plan.has5g) ? "4G/5G" : "4G";
}

export function countryAnswer(page: CountryPage): string {
  const plan = cheapestPlan(page.catalogue.plans);
  return `Kokio's ${page.content.name} plans start at ${formatUsd(plan.priceUsd)} for ${formatData(plan)} over ${formatDays(plan.validityDays)} on the best available local network. You buy without a passport, name or email, and install before you fly.`;
}

export function countryNetworkLine(page: CountryPage): string | null {
  const names = page.catalogue.networks.map((network) => network.name);
  if (names.length === 0) return null;
  const has5g = page.catalogue.networks.some((network) =>
    network.types.includes("5G")
  );
  return `Your eSIM roams on whichever eligible local network gives the best signal: ${names.join(", ")}.${has5g ? " Some plans include 5G where the network offers it." : ""}`;
}

export function whyKokioTitle(page: CountryPage): string {
  return page.content.rules.length
    ? `Why travellers skip the local SIM in ${page.content.name}`
    : `Why ${PRODUCT_NAME} for ${page.content.name}`;
}

/** True when no plan for the country is a local profile, so "nothing to register" holds. */
export function allRoaming(page: CountryPage): boolean {
  return page.catalogue.plans.every((plan) => plan.profileType === "roaming");
}

export function setupSteps(airports: string[]): string[] {
  return [
    "Install the eSIM at home on Wi-Fi. It installs once only.",
    airports.length
      ? `Land at ${airports.join(" or ")}.`
      : "Land at your destination.",
    "iPhone: Settings → Mobile Service → choose the Kokio line for mobile data, with data roaming on.",
    "Not connecting? Toggle Airplane Mode, then pick a network manually.",
  ];
}

export function routeLine(comparison: RouteComparison): string {
  const { route, days, regional, localTotal } = comparison;
  const trip = `${route.label}, ${formatDays(days)} and ${route.dataGb} GB`;
  if (!regional) return `${trip}: no regional plan lasts that long.`;
  const local =
    localTotal === null
      ? "separate local plans do not cover every stop"
      : `separate local plans cost ${formatUsd(localTotal)}`;
  return `${trip}: one regional plan costs ${formatUsd(regional.priceUsd)}, ${local}.`;
}

/** The region page this country links to, with the first sample trip that passes through it. */
export function regionAlternative(page: CountryPage): {
  region: RegionPage;
  comparison: RouteComparison | null;
} | null {
  const region = page.content.region ? regionPage(page.content.region) : null;
  if (!region) return null;
  const route = region.content.routes.find((candidate) =>
    candidate.legs.some((leg) => leg.iso2 === page.content.iso2)
  );
  return {
    region,
    comparison: route ? compareRoute(route, region.offering) : null,
  };
}

/**
 * What the /esim index lists: every country with plans, linked only where a
 * page is built, and every built region page.
 */
export function esimIndex() {
  const pagesByIso = countryPagesByIso();
  const countries = snapshotCountries().map((country) => ({
    iso2: country.iso2,
    name: country.name,
    fromUsd: cheapestPlan(country.plans).priceUsd,
    path: pagesByIso.get(country.iso2)?.path ?? null,
  }));
  const regions = builtRegionPages().map((page) => ({
    name: page.content.name,
    path: page.path,
    fromUsd: cheapestPlan(page.offering.plans).priceUsd,
  }));

  return {
    countries,
    regions,
    title: `Travel eSIM plans for ${countries.length} destinations`,
    description: `${PRODUCT_NAME} sells eSIM data plans in ${countries.length} destinations, from ${formatUsd(Math.min(...countries.map((c) => c.fromUsd)))}. No passport, name or email. Pay by card, Apple Pay, Google Pay or crypto.`,
  };
}

/** Member country names from the snapshot, A to Z. */
export function memberNames(page: RegionPage): string[] {
  return page.offering.countries
    .map((iso2) => snapshotCountry(iso2)?.name ?? iso2)
    .sort((a, b) => a.localeCompare(b));
}

export function regionAnswer(page: RegionPage): string {
  const plan = cheapestPlan(page.offering.plans);
  return `One Kokio plan covers ${memberNames(page).join(", ")} from ${formatUsd(plan.priceUsd)}, so you don't need a new SIM, and a new ID check, at every border.`;
}
