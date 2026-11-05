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
    // From the catalogue snapshot and the sourced rule above. Recheck the day lengths when the snapshot changes.
    tips: [
      "A local SIM now means a passport check at the counter, so installing the eSIM at home lets you walk past the SIM desks at arrivals.",
      "Unlimited plans come in 3, 5, 7, 10, 15 and 30-day lengths. Pick the one that matches your trip rather than guessing how many GB you'll use.",
      "If the signal is weak where you are, choose another network by hand: on iPhone, Settings → Mobile Service → your Kokio line → Network Selection.",
    ],
    // TODO: island coverage and hotspot answers, once the supplier confirms them.
    faqs: [
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Thailand?",
        answer:
          "Yes. Unlimited Thailand plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Thailand?",
        answer:
          "Yes, where the network offers it. Every Kokio Thailand plan can use 5G.",
      },
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
    lastVerified: "2026-11-05",
    publishStatus: "published",
  },
  // TODO: tips, FAQs and sourced rules for each country below, checked by a person.
  starter({
    slug: "japan",
    iso2: "JP",
    name: "Japan",
    airports: ["Narita (NRT)", "Haneda (HND)", "Kansai (KIX)"],
    neighbours: ["south-korea", "taiwan"],
    // From the catalogue snapshot, plus the airport Wi-Fi tip, which a person still has to check.
    tips: [
      "Your eSIM can use any of Japan's four mobile networks: NTT Docomo, KDDI, SoftBank and Rakuten. If the signal is weak, choose another by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Plans start small, at 0.5 GB for 7 days, which covers maps and messages on a short stopover. Unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
      "Forgot to install before you flew? Narita, Haneda and Kansai have free airport Wi-Fi, enough to download the eSIM before you leave the terminal.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a Japan eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the Japan eSIM include a Japanese phone number?",
        answer:
          "No. Kokio's Japan plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Japan?",
        answer:
          "Yes. Unlimited Japan plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Japan?",
        answer:
          "Yes, where the network offers it. Every Kokio Japan plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
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
    // From the catalogue snapshot. Recheck the network when the snapshot changes.
    tips: [
      "Kokio's South Korea plans run on SK Telecom, the country's largest network, so there is no network to pick by hand.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days. A week in Seoul fits the 7-day plan.",
      "Going on to Japan or Taiwan? Each has its own Kokio plans, and your phone can hold more than one eSIM, so you can install the next one before you fly.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a South Korea eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the South Korea eSIM include a Korean phone number?",
        answer:
          "No. Kokio's South Korea plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "network",
        question: "Which network does the South Korea eSIM use?",
        answer: "SK Telecom, with 5G where the network offers it.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for South Korea?",
        answer:
          "Yes. Unlimited South Korea plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
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
    // From the catalogue snapshot. Recheck plan shapes when the snapshot changes.
    tips: [
      "Your eSIM can use AT&T, T-Mobile or Verizon, the three national networks. Coverage differs a lot outside cities, so if one network is weak, choose another by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Need to call a hotel or get a text code? Many US plans include calls and SMS as well as data. The app shows the minutes and messages on each plan card.",
      "Staying a long time or coming back often? There is a 10 GB plan that lasts 365 days, so one eSIM can cover several trips.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a US eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "calls",
        question: "Can I make calls with a Kokio US eSIM?",
        answer:
          "Yes, on plans that include calls and SMS. Data-only plans need an internet app for calls. Each plan in the app says which kind it is.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for the US?",
        answer:
          "Yes. Unlimited US plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
      {
        id: "5g",
        question: "Do US plans include 5G?",
        answer: "Some do. The plan table marks which plans can use 5G.",
      },
    ],
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
    // From the catalogue snapshot. Recheck plan shapes when the snapshot changes.
    tips: [
      "Your eSIM can use EE, O2, Three or Vodafone, all four UK networks. If the signal drops in the countryside, choose another by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Many UK plans also come with calls and SMS, handy for ringing a B&B or getting a text code. The app shows the minutes and messages on each plan card.",
      "Plans start at 1 GB for 3 days, enough for a quick London stopover. Unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a UK eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "calls",
        question: "Can I make calls with a Kokio UK eSIM?",
        answer:
          "Yes, on plans that include calls and SMS. Data-only plans need an internet app for calls. Each plan in the app says which kind it is.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for the UK?",
        answer:
          "Yes. Unlimited UK plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
      {
        id: "5g",
        question: "Can I use 5G in the UK?",
        answer:
          "Yes, where the network offers it. Every Kokio UK plan can use 5G.",
      },
    ],
  }),
  starter({
    slug: "france",
    iso2: "FR",
    name: "France",
    airports: ["Paris Charles de Gaulle (CDG)", "Paris Orly (ORY)"],
    neighbours: ["spain", "italy", "germany", "switzerland"],
    // From the catalogue snapshot. Recheck when the snapshot changes.
    tips: [
      "Your eSIM can use Orange, SFR, Bouygues Telecom or Free Mobile, all four French networks. If the signal is weak, choose another by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Carrying on to Spain, Italy or beyond? The app also sells Europe-wide plans, which can beat buying a local plan in each country.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so a long weekend in Paris doesn't need a 30-day plan.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a France eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the France eSIM include a French phone number?",
        answer:
          "No. Kokio's France plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "europe",
        question: "Does the France eSIM work in other European countries?",
        answer:
          "A France plan works in France. For a trip across several countries, pick one of the Europe plans in the app instead.",
      },
      {
        id: "5g",
        question: "Can I use 5G in France?",
        answer:
          "Yes, where the network offers it. Every Kokio France plan can use 5G.",
      },
    ],
  }),
  starter({
    slug: "italy",
    iso2: "IT",
    name: "Italy",
    airports: ["Rome Fiumicino (FCO)", "Milan Malpensa (MXP)"],
    neighbours: ["france", "switzerland"],
    // From the catalogue snapshot. Recheck when the snapshot changes.
    tips: [
      "Your eSIM can use Vodafone, WindTre or Iliad. If the signal is weak in a hill town or on the coast, choose another by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Visiting Italy as part of a longer trip? The app also sells Europe-wide plans that cover Italy and its neighbours on one eSIM.",
      "Plans start at 1 GB for 7 days, and unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy an Italy eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the Italy eSIM include an Italian phone number?",
        answer:
          "No. Kokio's Italy plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "europe",
        question: "Does the Italy eSIM work in other European countries?",
        answer:
          "An Italy plan works in Italy. For a trip across several countries, pick one of the Europe plans in the app instead.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Italy?",
        answer:
          "Yes. Unlimited Italy plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
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
