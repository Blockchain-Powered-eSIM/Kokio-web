/** Plan helpers that don't read the snapshot, so browser code can use them without loading it. */

import type { SnapshotPlan } from "@/lib/esim/types";

export function cheapestPlan(plans: SnapshotPlan[]): SnapshotPlan {
  return plans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a));
}

/** Cheapest plan that lasts `days` and holds `dataGb`, or null if none does. */
export function cheapestCovering(
  plans: SnapshotPlan[],
  days: number,
  dataGb: number
): SnapshotPlan | null {
  const fits = plans.filter(
    (plan) =>
      plan.validityDays >= days &&
      (plan.unlimited || (plan.dataGb ?? 0) >= dataGb)
  );
  return fits.length ? cheapestPlan(fits) : null;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatUsd(amount: number): string {
  return usd.format(amount);
}

export function formatData(plan: SnapshotPlan): string {
  return plan.unlimited ? "Unlimited" : `${plan.dataGb} GB`;
}

export function formatDays(days: number): string {
  return days === 1 ? "1 day" : `${days} days`;
}
