/** Hand-written facts for each region page. Members and plans come from the catalogue snapshot. */

import type { RegionContent } from "@/lib/esim/types";

export const regions: RegionContent[] = [
  {
    slug: "southeast-asia",
    name: "Southeast Asia",
    offering: { coverageType: "CUSTOM_REGIONAL", name: "South East Asia" },
    // Trips only use countries the plan covers. Leg lengths and data are assumptions, shown on the page.
    routes: [
      {
        label: "Bangkok → Hanoi → Singapore",
        legs: [
          { iso2: "TH", days: 9 },
          { iso2: "VN", days: 8 },
          { iso2: "SG", days: 4 },
        ],
        dataGb: 10,
      },
      {
        label: "Singapore → Bangkok",
        legs: [
          { iso2: "SG", days: 4 },
          { iso2: "TH", days: 6 },
        ],
        dataGb: 5,
      },
      {
        label: "Manila → Cebu → Ho Chi Minh City",
        legs: [
          { iso2: "PH", days: 9 },
          { iso2: "VN", days: 5 },
        ],
        dataGb: 5,
      },
    ],
    // From the catalogue snapshot. Recheck the country list when the snapshot changes.
    faqs: [
      {
        id: "countries",
        question: "Which countries does the Southeast Asia eSIM cover?",
        answer:
          "China, the Philippines, Singapore, Thailand and Vietnam. It does not cover Malaysia, Indonesia or Cambodia, so pick a local plan for those.",
      },
      {
        id: "cheaper",
        question: "Is one regional plan cheaper than separate local plans?",
        answer:
          "Not always. It depends on how long you stay in each country and how much data you use. The comparison table prices three sample trips both ways.",
      },
      {
        id: "borders",
        question: "Do I need a new SIM or a passport at each border?",
        answer:
          "No. The same eSIM works in every covered country, and Kokio asks for no passport, name or email.",
      },
      {
        id: "activation",
        question: "When does the Southeast Asia plan start?",
        answer:
          "On first data use. Install it at home on Wi-Fi, and the days start counting once you use data in a covered country.",
      },
      {
        id: "top-up",
        question: "Can I top up the Southeast Asia plan?",
        answer:
          "Yes. In checkout, switch to Top-up and pick the eSIM you already have.",
      },
    ],
    lastVerified: "2026-11-05",
    publishStatus: "published",
  },
];
