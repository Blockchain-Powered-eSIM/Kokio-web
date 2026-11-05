"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import {
  ACTIVITIES,
  defaultHours,
  estimateGb,
  type DailyHours,
} from "@/lib/esim/data-usage";
import {
  cheapestCovering,
  formatData,
  formatDays,
  formatUsd,
} from "@/lib/esim/plans";
import type { SnapshotPlan } from "@/lib/esim/types";

export interface CalculatorCountry {
  slug: string;
  name: string;
  path: string;
  plans: SnapshotPlan[];
}

const MAX_DAYS = 180;
const MAX_HOURS = 16;

const fieldClass =
  "min-h-11 rounded-xl border border-esim-black-200 bg-background px-3 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// The native arrow ignores padding and sits on the border, so it is hidden and a chevron drawn in its place.
const selectClass = `${fieldClass} w-full appearance-none pr-11`;

// Out-of-range or empty input counts as the nearest allowed value.
function clamp(value: number, min: number, max: number): number {
  return Number.isFinite(value) ? Math.min(Math.max(value, min), max) : min;
}

/** Trip length and daily use in, estimated GB and the cheapest fitting plan out. */
export function DataCalculator({
  countries,
  initialSlug,
}: {
  countries: CalculatorCountry[];
  initialSlug: string;
}) {
  const id = useId();
  const [slug, setSlug] = useState(initialSlug);
  const [days, setDays] = useState(7);
  const [hours, setHours] = useState<DailyHours>(defaultHours);

  const country = countries.find((c) => c.slug === slug) ?? countries[0];
  const tripDays = clamp(days, 1, MAX_DAYS);
  const gb = estimateGb(tripDays, hours);
  const plan = cheapestCovering(country.plans, tripDays, gb);

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-ship-cove-50 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label
          className="flex flex-col gap-2 text-base"
          htmlFor={`${id}-country`}
        >
          Destination
          <span className="relative flex">
            <select
              id={`${id}-country`}
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className={selectClass}
            >
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-esim-black-700"
            />
          </span>
        </label>
        <label className="flex flex-col gap-2 text-base" htmlFor={`${id}-days`}>
          Trip length in days
          <input
            id={`${id}-days`}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_DAYS}
            value={Number.isNaN(days) ? "" : days}
            onChange={(event) => setDays(event.target.valueAsNumber)}
            className={fieldClass}
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-base font-medium">
          Hours a day on mobile data (not Wi-Fi)
        </legend>
        {ACTIVITIES.map((activity) => (
          <label
            key={activity.id}
            htmlFor={`${id}-${activity.id}`}
            className="grid grid-cols-[1fr_6rem] items-center gap-4 text-base"
          >
            {activity.label}
            <input
              id={`${id}-${activity.id}`}
              type="number"
              inputMode="decimal"
              min={0}
              max={MAX_HOURS}
              step={0.5}
              value={hours[activity.id]}
              onChange={(event) =>
                setHours({
                  ...hours,
                  [activity.id]: clamp(
                    event.target.valueAsNumber,
                    0,
                    MAX_HOURS
                  ),
                })
              }
              className={fieldClass}
            />
          </label>
        ))}
      </fieldset>

      <div
        aria-live="polite"
        className="flex flex-col gap-2 border-t border-esim-black-100 pt-6 text-lg"
      >
        <p className="font-heading text-2xl font-bold text-foreground">
          About {gb} GB for {formatDays(tripDays)}
        </p>
        {plan ? (
          <p>
            Cheapest {country.name} plan that covers it: {formatData(plan)} for{" "}
            {formatDays(plan.validityDays)}, {formatUsd(plan.priceUsd)}.{" "}
            <Link href={country.path} className="underline">
              All {country.name} plans
            </Link>
          </p>
        ) : (
          <p>
            No single {country.name} plan covers that.{" "}
            <Link href={country.path} className="underline">
              See the {country.name} plans
            </Link>{" "}
            and combine two, or add a top-up later.
          </p>
        )}
      </div>
    </div>
  );
}
