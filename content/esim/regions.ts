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
  {
    slug: "europe",
    name: "Europe",
    offering: { coverageType: "REGIONAL", name: "Europe" },
    routes: [
      {
        label: "Paris → Rome → Barcelona",
        legs: [
          { iso2: "FR", days: 5 },
          { iso2: "IT", days: 5 },
          { iso2: "ES", days: 4 },
        ],
        dataGb: 10,
      },
      {
        label: "London → Paris → Amsterdam",
        legs: [
          { iso2: "GB", days: 4 },
          { iso2: "FR", days: 3 },
          { iso2: "NL", days: 3 },
        ],
        dataGb: 5,
      },
      {
        label: "Lisbon → Madrid",
        legs: [
          { iso2: "PT", days: 5 },
          { iso2: "ES", days: 7 },
        ],
        dataGb: 5,
      },
    ],
    // From the catalogue snapshot. Recheck the country list when the snapshot changes.
    faqs: [
      {
        id: "uk-switzerland",
        question: "Does the Europe eSIM work in the UK and Switzerland?",
        answer:
          "Yes. Both are on the plan, along with Norway, Iceland, Turkey and the Balkan countries, even though they are outside the EU.",
      },
      {
        id: "not-covered",
        question: "Which European countries are not covered?",
        answer:
          "Monaco and Andorra are not on the plan, so check before a day trip from Nice or Barcelona. Russia, Belarus and Moldova are not covered either.",
      },
      {
        id: "cheaper",
        question: "Is one Europe plan cheaper than separate local plans?",
        answer:
          "Often not, for a short trip through two or three countries. What one plan saves is buying and installing a new eSIM at each border. The comparison table prices three sample trips both ways.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited Europe plan?",
        answer:
          "Yes. Unlimited Europe plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
      {
        id: "long-stay",
        question: "Is there a Europe plan for a long stay?",
        answer:
          "Yes. There is a 50 GB plan that lasts 90 days and a 100 GB plan that lasts 180 days.",
      },
      {
        id: "borders",
        question: "Do I need a new SIM or a passport at each border?",
        answer:
          "No. The same eSIM works in every covered country, and Kokio asks for no passport, name or email.",
      },
      {
        id: "top-up",
        question: "Can I top up the Europe plan?",
        answer:
          "Yes. In checkout, switch to Top-up and pick the eSIM you already have.",
      },
    ],
    lastVerified: "2026-11-05",
    publishStatus: "published",
  },
  {
    slug: "asia",
    name: "Asia",
    offering: { coverageType: "REGIONAL", name: "Asia" },
    routes: [
      {
        label: "Tokyo → Seoul",
        legs: [
          { iso2: "JP", days: 7 },
          { iso2: "KR", days: 5 },
        ],
        dataGb: 10,
      },
      {
        label: "Hong Kong → Taipei",
        legs: [
          { iso2: "HK", days: 3 },
          { iso2: "TW", days: 5 },
        ],
        dataGb: 5,
      },
      {
        label: "Kuala Lumpur → Bali → Singapore",
        legs: [
          { iso2: "MY", days: 4 },
          { iso2: "ID", days: 7 },
          { iso2: "SG", days: 3 },
        ],
        dataGb: 10,
      },
    ],
    // From the catalogue snapshot. Recheck the country list when the snapshot changes.
    faqs: [
      {
        id: "southeast-asia",
        question:
          "How is the Asia plan different from the Southeast Asia plan?",
        answer:
          "The Asia plan covers 18 countries, including Japan, South Korea, Malaysia, Indonesia and Cambodia. The Southeast Asia plan covers only China, the Philippines, Singapore, Thailand and Vietnam.",
      },
      {
        id: "not-covered",
        question: "Which Asian countries are not covered?",
        answer:
          "Nepal, the Maldives, Mongolia and Brunei are not on the plan, and neither is the Middle East. Pick a local plan for those.",
      },
      {
        id: "cheaper",
        question: "Is one Asia plan cheaper than separate local plans?",
        answer:
          "Not always. It depends on how long you stay in each country and how much data you use. The comparison table prices three sample trips both ways.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited Asia plan?",
        answer:
          "Yes. Unlimited Asia plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
      {
        id: "long-stay",
        question: "Is there an Asia plan for a long stay?",
        answer:
          "Yes. There is a 50 GB plan that lasts 90 days and a 100 GB plan that lasts 180 days.",
      },
      {
        id: "borders",
        question: "Do I need a new SIM or a passport at each border?",
        answer:
          "No. The same eSIM works in every covered country, and Kokio asks for no passport, name or email.",
      },
      {
        id: "top-up",
        question: "Can I top up the Asia plan?",
        answer:
          "Yes. In checkout, switch to Top-up and pick the eSIM you already have.",
      },
    ],
    lastVerified: "2026-11-05",
    publishStatus: "published",
  },
];
