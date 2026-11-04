#!/usr/bin/env node

// Turns a raw catalogue export into the public snapshot the /esim pages read.
//
// The export (data/raw/catalogue.json) stays out of git. Only what a page shows
// is copied: data, validity, price, plan type and networks. Vendor plan ids and
// catalogue ids are dropped.
//
// Run from the project root: node scripts/import-catalogue.mjs [raw file]

import { readFileSync, writeFileSync } from "node:fs";

const RAW = process.argv[2] ?? "data/raw/catalogue.json";
const OUT = "data/catalogue.snapshot.json";

const raw = JSON.parse(readFileSync(RAW, "utf8"));
if (!raw.fetchedAt || !Array.isArray(raw.plans)) {
  throw new Error(
    `${RAW} has no fetchedAt or plans. Is it a catalogue export?`
  );
}

function toPlan(plan) {
  const networks = plan.countryWiseNetworkCoverages.flatMap((c) => c.networks);
  return {
    dataGb: plan.isUnlimited ? null : plan.data,
    unlimited: plan.isUnlimited,
    validityDays: plan.validity,
    priceUsd: plan.actualSellingPrice,
    has5g: networks.some((n) => n.types.includes("5G")),
    callsAndSms: plan.planType === "DATA_CALLS_SMS",
    // The export does not say. Every plan is taken to roam until a supplier marks one local.
    profileType: "roaming",
  };
}

function byValue(a, b) {
  return (
    Number(a.unlimited) - Number(b.unlimited) ||
    (a.dataGb ?? 0) - (b.dataGb ?? 0) ||
    a.validityDays - b.validityDays ||
    a.priceUsd - b.priceUsd
  );
}

// Unknown validity or price would print as a blank or a lie in the plan table.
const usable = raw.plans.filter(
  (plan) =>
    plan.planStatus === "ACTIVE" &&
    plan.purchaseType !== "TOPUP" &&
    Number.isInteger(plan.validity) &&
    plan.actualSellingPrice > 0
);

const countries = {};
for (const entry of raw.serviceRegions.countries) {
  countries[entry.code] = {
    name: entry.name,
    flag: entry.flag ?? null,
    plans: [],
    networks: {},
  };
}

const offerings = new Map();

for (const plan of usable) {
  if (plan.coverageType === "LOCAL") {
    const country = countries[plan.serviceRegionCode];
    if (!country) continue;
    country.plans.push(toPlan(plan));
    for (const coverage of plan.countryWiseNetworkCoverages) {
      for (const network of coverage.networks) {
        const types = new Set(country.networks[network.name] ?? []);
        network.types.forEach((type) => types.add(type));
        country.networks[network.name] = [...types].sort();
      }
    }
    continue;
  }

  const members = plan.coverageCountries.map((c) => c.countryCode).sort();
  if (members.length === 0) continue;

  // Plans under one name can cover different countries, so the list is part of the key.
  const key = `${plan.coverageType}|${plan.serviceRegionName}|${members.join(",")}`;
  if (!offerings.has(key)) {
    offerings.set(key, {
      coverageType: plan.coverageType,
      code: plan.serviceRegionCode,
      name: plan.serviceRegionName,
      countries: members,
      plans: [],
    });
  }
  offerings.get(key).plans.push(toPlan(plan));
}

for (const [code, country] of Object.entries(countries)) {
  if (country.plans.length === 0) {
    delete countries[code];
    continue;
  }
  country.plans.sort(byValue);
  country.networks = Object.entries(country.networks)
    .map(([name, types]) => ({ name, types }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const snapshot = {
  snapshotDate: raw.fetchedAt.slice(0, 10),
  countries,
  offerings: [...offerings.values()]
    .map((offering) => ({ ...offering, plans: offering.plans.sort(byValue) }))
    .sort((a, b) => a.name.localeCompare(b.name)),
};

writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
  `${OUT}: ${Object.keys(countries).length} countries, ${snapshot.offerings.length} multi-country offerings, snapshot ${snapshot.snapshotDate}.`
);
