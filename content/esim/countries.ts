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
  // TODO: tips, FAQs and sourced rules for each country below, checked by a person.
  starter({
    slug: "japan",
    iso2: "JP",
    name: "Japan",
    airports: ["Narita (NRT)", "Haneda (HND)", "Kansai (KIX)"],
    neighbours: ["south-korea", "taiwan"],
  }),
  starter({
    slug: "vietnam",
    iso2: "VN",
    name: "Vietnam",
    region: "southeast-asia",
    airports: ["Noi Bai, Hanoi (HAN)", "Tan Son Nhat, Ho Chi Minh City (SGN)"],
    neighbours: ["thailand", "cambodia"],
  }),
  starter({
    slug: "indonesia",
    iso2: "ID",
    name: "Indonesia",
    airports: ["Soekarno-Hatta, Jakarta (CGK)", "Ngurah Rai, Bali (DPS)"],
    neighbours: ["malaysia", "singapore"],
  }),
  starter({
    slug: "south-korea",
    iso2: "KR",
    name: "South Korea",
    airports: ["Incheon (ICN)", "Gimpo (GMP)"],
    neighbours: ["japan", "taiwan"],
  }),
  starter({
    slug: "singapore",
    iso2: "SG",
    name: "Singapore",
    region: "southeast-asia",
    airports: ["Changi (SIN)"],
    neighbours: ["malaysia", "indonesia"],
  }),
  starter({
    slug: "malaysia",
    iso2: "MY",
    name: "Malaysia",
    airports: ["Kuala Lumpur International (KUL)"],
    neighbours: ["singapore", "thailand", "indonesia"],
  }),
  starter({
    slug: "philippines",
    iso2: "PH",
    name: "Philippines",
    region: "southeast-asia",
    airports: ["Ninoy Aquino, Manila (MNL)", "Mactan-Cebu (CEB)"],
    neighbours: ["taiwan", "vietnam"],
  }),
  starter({
    slug: "taiwan",
    iso2: "TW",
    name: "Taiwan",
    airports: ["Taoyuan (TPE)"],
    neighbours: ["japan", "hong-kong", "philippines"],
  }),
  starter({
    slug: "hong-kong",
    iso2: "HK",
    name: "Hong Kong",
    airports: ["Hong Kong International (HKG)"],
    neighbours: ["taiwan"],
  }),
  starter({
    slug: "cambodia",
    iso2: "KH",
    name: "Cambodia",
    neighbours: ["thailand", "vietnam"],
  }),
  starter({
    slug: "india",
    iso2: "IN",
    name: "India",
    airports: ["Delhi (DEL)", "Mumbai (BOM)"],
    neighbours: ["united-arab-emirates"],
  }),
  starter({
    slug: "united-arab-emirates",
    iso2: "AE",
    name: "United Arab Emirates",
    airports: ["Dubai (DXB)", "Zayed International, Abu Dhabi (AUH)"],
    neighbours: ["india"],
  }),
  starter({
    slug: "turkey",
    iso2: "TR",
    name: "Turkey",
    airports: ["Istanbul (IST)", "Sabiha Gökçen (SAW)"],
    neighbours: ["greece"],
  }),
  starter({
    slug: "united-states",
    iso2: "US",
    name: "United States",
    neighbours: ["canada", "mexico"],
  }),
  starter({
    slug: "canada",
    iso2: "CA",
    name: "Canada",
    neighbours: ["united-states"],
  }),
  starter({
    slug: "mexico",
    iso2: "MX",
    name: "Mexico",
    airports: ["Mexico City (MEX)", "Cancún (CUN)"],
    neighbours: ["united-states"],
  }),
  starter({
    slug: "united-kingdom",
    iso2: "GB",
    name: "United Kingdom",
    airports: ["Heathrow (LHR)", "Gatwick (LGW)"],
    neighbours: ["france", "netherlands"],
  }),
  starter({
    slug: "france",
    iso2: "FR",
    name: "France",
    airports: ["Paris Charles de Gaulle (CDG)", "Paris Orly (ORY)"],
    neighbours: ["spain", "italy", "germany", "switzerland"],
  }),
  starter({
    slug: "italy",
    iso2: "IT",
    name: "Italy",
    airports: ["Rome Fiumicino (FCO)", "Milan Malpensa (MXP)"],
    neighbours: ["france", "switzerland"],
  }),
  starter({
    slug: "spain",
    iso2: "ES",
    name: "Spain",
    airports: ["Madrid-Barajas (MAD)", "Barcelona-El Prat (BCN)"],
    neighbours: ["portugal", "france", "morocco"],
  }),
  starter({
    slug: "germany",
    iso2: "DE",
    name: "Germany",
    airports: ["Frankfurt (FRA)", "Munich (MUC)"],
    neighbours: ["netherlands", "switzerland", "france"],
  }),
  starter({
    slug: "portugal",
    iso2: "PT",
    name: "Portugal",
    airports: ["Lisbon (LIS)", "Porto (OPO)"],
    neighbours: ["spain"],
  }),
  starter({
    slug: "greece",
    iso2: "GR",
    name: "Greece",
    airports: ["Athens (ATH)"],
    neighbours: ["turkey", "italy"],
  }),
  starter({
    slug: "netherlands",
    iso2: "NL",
    name: "Netherlands",
    airports: ["Amsterdam Schiphol (AMS)"],
    neighbours: ["germany"],
  }),
  starter({
    slug: "switzerland",
    iso2: "CH",
    name: "Switzerland",
    airports: ["Zurich (ZRH)", "Geneva (GVA)"],
    neighbours: ["germany", "france", "italy"],
  }),
  starter({
    slug: "australia",
    iso2: "AU",
    name: "Australia",
    airports: ["Sydney (SYD)", "Melbourne (MEL)"],
    neighbours: ["indonesia"],
  }),
  starter({
    slug: "brazil",
    iso2: "BR",
    name: "Brazil",
    airports: ["São Paulo Guarulhos (GRU)", "Rio de Janeiro Galeão (GIG)"],
    neighbours: [],
  }),
  starter({
    slug: "egypt",
    iso2: "EG",
    name: "Egypt",
    airports: ["Cairo (CAI)"],
    neighbours: [],
  }),
  starter({
    slug: "morocco",
    iso2: "MA",
    name: "Morocco",
    airports: ["Casablanca Mohammed V (CMN)", "Marrakesh Menara (RAK)"],
    neighbours: ["spain"],
  }),
];

// A new country with only the facts that need no research. Pass any other field to fill it in.
function starter(
  entry: Pick<CountryContent, "slug" | "iso2" | "name" | "neighbours"> &
    Partial<CountryContent>
): CountryContent {
  return {
    rules: [],
    airports: [],
    tips: [],
    faqs: [],
    lastVerified: null,
    publishStatus: "published",
    ...entry,
  };
}
