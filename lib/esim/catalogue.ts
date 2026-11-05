/** Reads the catalogue snapshot and works out prices from it. Never edit the snapshot by hand; rerun scripts/import-catalogue.mjs. */

import raw from "@/data/catalogue.snapshot.json";
import type {
  ExampleRoute,
  RegionContent,
  Snapshot,
  SnapshotCountry,
  SnapshotOffering,
  SnapshotPlan,
} from "@/lib/esim/types";
import { cheapestCovering } from "@/lib/esim/plans";

export {
  cheapestCovering,
  cheapestPlan,
  formatData,
  formatDays,
  formatUsd,
} from "@/lib/esim/plans";

const snapshot = raw as unknown as Snapshot;

/** Day the snapshot was taken. Only the sitemap reads it; pages never show it. */
export const SNAPSHOT_DATE = new Date(snapshot.snapshotDate);

export function snapshotCountry(iso2: string): SnapshotCountry | null {
  return snapshot.countries[iso2] ?? null;
}

/** Every country with at least one plan, A to Z. */
export function snapshotCountries(): Array<{ iso2: string } & SnapshotCountry> {
  return Object.entries(snapshot.countries)
    .map(([iso2, country]) => ({ iso2, ...country }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** The plan family a region page sells. When a name covers several country lists, the widest wins. */
export function findOffering(
  match: RegionContent["offering"]
): SnapshotOffering | null {
  const candidates = snapshot.offerings.filter(
    (offering) =>
      offering.coverageType === match.coverageType &&
      offering.name === match.name
  );
  if (candidates.length === 0) return null;
  return candidates.reduce((a, b) =>
    b.countries.length > a.countries.length ? b : a
  );
}

export function priceRange(plans: SnapshotPlan[]): {
  low: number;
  high: number;
} {
  const prices = plans.map((plan) => plan.priceUsd);
  return { low: Math.min(...prices), high: Math.max(...prices) };
}

export function pricePerGb(plan: SnapshotPlan): number | null {
  return plan.dataGb ? plan.priceUsd / plan.dataGb : null;
}

export interface RouteComparison {
  route: ExampleRoute;
  days: number;
  regional: SnapshotPlan | null;
  /** Sum of one local plan per country, or null if any country has no plan that fits. */
  localTotal: number | null;
}

/** Prices one regional plan against separate local plans, with data split by days spent in each country. */
export function compareRoute(
  route: ExampleRoute,
  offering: SnapshotOffering
): RouteComparison | null {
  if (!route.legs.every((leg) => offering.countries.includes(leg.iso2))) {
    return null;
  }

  const days = route.legs.reduce((sum, leg) => sum + leg.days, 0);
  const daysByCountry = new Map<string, number>();
  for (const leg of route.legs) {
    daysByCountry.set(leg.iso2, (daysByCountry.get(leg.iso2) ?? 0) + leg.days);
  }

  let localTotal: number | null = 0;
  for (const [iso2, countryDays] of daysByCountry) {
    const plans = snapshotCountry(iso2)?.plans ?? [];
    const share = (route.dataGb * countryDays) / days;
    const plan = cheapestCovering(plans, countryDays, share);
    if (!plan) {
      localTotal = null;
      break;
    }
    localTotal += plan.priceUsd;
  }

  return {
    route,
    days,
    regional: cheapestCovering(offering.plans, days, route.dataGb),
    localTotal,
  };
}
