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
    // TODO: 4-6 Southeast Asia questions, checked by a person.
    faqs: [],
    lastVerified: null,
    publishStatus: "published",
  },
];
