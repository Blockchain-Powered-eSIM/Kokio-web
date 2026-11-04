/**
 * Hand-written facts for each destination page. Plans and networks come from the
 * catalogue snapshot; everything here has to be checked by a person.
 *
 * Leave a field empty rather than guess. An empty field hides its section, and
 * the quality gate keeps the page out of the index until it is filled.
 */

import type { CountryContent } from "@/lib/esim/types";

export const countries: CountryContent[] = [
  {
    slug: "thailand",
    iso2: "TH",
    name: "Thailand",
    region: "southeast-asia",
    rules: [
      {
        text: "Since 16 May 2026, Thai operators must check a passport for every SIM sold to a foreign visitor, and visitors can register at most three SIMs per operator.",
        sources: [
          {
            label: "Yozzo",
            url: "https://www.yozzo.com/mvno-news/thailand-nbtc-sim-card-registration-kyc-measures/",
          },
          {
            label: "Tilleke & Gibbins",
            url: "https://www.tilleke.com/insights/thailand-tightens-telecom-registration-data-and-ip-address-rules-to-combat-tech-crime/",
          },
        ],
      },
    ],
    airports: ["Suvarnabhumi (BKK)", "Don Mueang (DMK)"],
    // TODO: 3-5 Thailand tips, checked by a person.
    tips: [],
    // TODO: island coverage and hotspot answers, once the supplier confirms them.
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a Thailand eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the Thailand eSIM include a Thai phone number?",
        answer:
          "No. Kokio's Thailand plans are data-only, so calls and messages go through internet apps.",
      },
    ],
    neighbours: ["vietnam", "malaysia", "cambodia", "laos"],
    lastVerified: null,
    publishStatus: "published",
  },
];
