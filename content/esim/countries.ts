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
    // From the catalogue snapshot. Recheck networks and the Southeast Asia plan when the snapshot changes.
    tips: [
      "Vietnam is on the Southeast Asia plan with Thailand, Singapore, the Philippines and China, so one eSIM can cover a Bangkok to Hanoi trip.",
      "5G on these plans comes through Viettel and VNPT. The other networks on the list are 4G, so pick Viettel or VNPT by hand if you want 5G.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so a two-week trip from Hanoi to Ho Chi Minh City fits the 15-day plan.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a Vietnam eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the Vietnam eSIM include a Vietnamese phone number?",
        answer:
          "No. Kokio's Vietnam plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "thailand",
        question: "Does the Vietnam eSIM work in Thailand or Cambodia too?",
        answer:
          "A Vietnam plan works in Vietnam. The Southeast Asia plan adds Thailand, Singapore, the Philippines and China, but not Cambodia.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Vietnam?",
        answer:
          "Yes, on Viettel and VNPT where they offer it. Every Kokio Vietnam plan can use 5G on those networks.",
      },
    ],
  }),
  starter({
    slug: "indonesia",
    iso2: "ID",
    name: "Indonesia",
    airports: ["Soekarno-Hatta, Jakarta (CGK)", "Ngurah Rai, Bali (DPS)"],
    neighbours: ["malaysia", "singapore"],
    rules: [
      {
        text: "A local Indonesian SIM in a phone bought abroad only works while the phone's IMEI is registered, which lasts 90 days for visitors. A foreign SIM on roaming needs no IMEI registration.",
        sources: [
          {
            label: "Bali Easy eSIM",
            url: "https://esim.balieasy.com/?p=18381",
          },
          {
            label: "Backpack Moments",
            url: "https://backpackmoments.com/imei-registration-in-indonesia/",
          },
        ],
      },
    ],
    // From the catalogue snapshot, the sourced IMEI rule, and the Telkomsel coverage tip, which a person still has to check.
    tips: [
      "Kokio plans connect by roaming, so you skip the IMEI registration a local SIM would need, and there's no 90-day limit to watch.",
      "Your eSIM can use Telkomsel, Indosat or Tri. Telkomsel reaches furthest across the islands, so try it first off the main tourist routes.",
      "Island-hopping on to Malaysia or Singapore? The Asia plans in the app cover Indonesia and its neighbours on one eSIM. The Southeast Asia plan does not include Indonesia.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy an Indonesia eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "imei",
        question: "Do I need to register my phone's IMEI in Indonesia?",
        answer:
          "Not for a Kokio eSIM. The IMEI rule covers local Indonesian SIMs in foreign phones, and Kokio plans connect by roaming.",
      },
      {
        id: "phone-number",
        question: "Does the Indonesia eSIM include an Indonesian phone number?",
        answer:
          "No. Kokio's Indonesia plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Indonesia?",
        answer:
          "Yes. Unlimited Indonesia plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
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
    // From the catalogue snapshot, plus the Changi Wi-Fi tip, which a person still has to check.
    tips: [
      "Your eSIM can use any of Singapore's four networks: Singtel, StarHub, M1 and SIMBA.",
      "Crossing into Malaysia by road? A Singapore plan stops at the border. The Asia plans in the app cover both countries on one eSIM.",
      "Forgot to install before you flew? Changi has free Wi-Fi, enough to download the eSIM before you leave the terminal.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a Singapore eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the Singapore eSIM include a Singapore phone number?",
        answer:
          "No. Kokio's Singapore plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "malaysia",
        question: "Does the Singapore eSIM work in Malaysia?",
        answer:
          "No. For both countries, pick one of the Asia plans in the app. The Southeast Asia plan covers Singapore but not Malaysia.",
      },
      {
        id: "southeast-asia",
        question: "Is Singapore on the Southeast Asia plan?",
        answer: "Yes, along with Thailand, Vietnam, the Philippines and China.",
      },
    ],
  }),
  starter({
    slug: "malaysia",
    iso2: "MY",
    name: "Malaysia",
    airports: ["Kuala Lumpur International (KUL)"],
    neighbours: ["singapore", "thailand", "indonesia"],
    // From the catalogue snapshot, plus the CelcomDigi merger, which a person still has to check.
    tips: [
      "Celcom and DiGi merged into CelcomDigi, so your phone may show either name. Maxis and U Mobile are the other networks your eSIM can use.",
      "Crossing to Singapore by road? A Malaysia plan stops at the border. The Asia plans in the app cover both countries on one eSIM.",
      "Malaysia isn't on Kokio's Southeast Asia plan. For a trip through several countries, pick an Asia plan instead.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a Malaysia eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the Malaysia eSIM include a Malaysian phone number?",
        answer:
          "No. Kokio's Malaysia plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "regional",
        question: "Which regional plan covers Malaysia?",
        answer:
          "The Asia plans in the app. The Southeast Asia plan does not include Malaysia.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Malaysia?",
        answer:
          "Yes. Unlimited Malaysia plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
  }),
  starter({
    slug: "philippines",
    iso2: "PH",
    name: "Philippines",
    region: "southeast-asia",
    airports: ["Ninoy Aquino, Manila (MNL)", "Mactan-Cebu (CEB)"],
    neighbours: ["taiwan", "vietnam"],
    rules: [
      {
        text: "Under the SIM Registration Act, a tourist registering a local SIM shows a passport, a Philippine address and a return ticket, and the SIM stops working after 30 days unless the visa is extended.",
        sources: [
          {
            label: "Manila Shimbun",
            url: "https://www.manila-shimbun.com/category/english/news268449.html",
          },
          {
            label: "YugaTech",
            url: "https://yugatech.com/internet-telecoms/sim-registration-act-implementing-rules-and-regulations",
          },
        ],
      },
    ],
    // From the catalogue snapshot and the sourced registration rule. A person still has to check both.
    tips: [
      "Staying longer than 30 days? A registered tourist SIM switches off after 30 days unless your visa is extended. A Kokio plan doesn't depend on your visa.",
      "Your eSIM can use Globe or Smart, the two biggest networks. If one is weak on an island, choose the other by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "The Philippines is on the Southeast Asia plan with Thailand, Vietnam, Singapore and China, so one eSIM can cover Manila and Ho Chi Minh City.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a Philippines eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question:
          "Does the Philippines eSIM include a Philippine phone number?",
        answer:
          "No. Kokio's Philippines plans are data-only, so calls and messages go through internet apps.",
      },
      {
        id: "southeast-asia",
        question: "Is the Philippines on the Southeast Asia plan?",
        answer: "Yes, along with Thailand, Vietnam, Singapore and China.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for the Philippines?",
        answer:
          "Yes. Unlimited Philippines plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
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
      "Want 5G? Pick a fixed-data plan. Every US plan with a set number of GB can use 5G, while most unlimited US plans are 4G only.",
      "Driving on into Canada or Mexico? A US plan stops at the border. The North America plans in the app cover all three countries on one eSIM.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a US eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the US eSIM include a US phone number?",
        answer:
          "No. Kokio's US plans are data-only, so calls and messages go through internet apps.",
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
        answer:
          "Every fixed-data US plan can use 5G. Most unlimited US plans are 4G only. The plan table marks each one.",
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
      "Taking the train to Paris or Amsterdam? A UK plan stops at the UK. The Europe + UK plans in the app cover the UK and the continent on one eSIM.",
      "Plans start at 1 GB for 7 days, enough for a short London stopover. Unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
    ],
    faqs: [
      {
        id: "passport",
        question: "Do I need my passport to buy a UK eSIM?",
        answer:
          "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
      },
      {
        id: "phone-number",
        question: "Does the UK eSIM include a UK phone number?",
        answer:
          "No. Kokio's UK plans are data-only, so calls and messages go through internet apps.",
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
