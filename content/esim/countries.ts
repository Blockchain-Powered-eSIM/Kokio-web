/**
 * Hand-written facts for each destination page. Plans and networks come from the
 * catalogue snapshot; everything here has to be checked by a person.
 *
 * Leave a field empty rather than guess. An empty field hides its section, and
 * the quality gate keeps the page out of the index until it is filled.
 */

import type { CountryContent, Faq } from "@/lib/esim/types";

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
  starter({
    slug: "japan",
    iso2: "JP",
    name: "Japan",
    region: "asia",
    airports: ["Narita (NRT)", "Haneda (HND)", "Kansai (KIX)"],
    neighbours: ["south-korea", "taiwan"],
    // From the catalogue snapshot, plus the airport Wi-Fi tip. Recheck when the snapshot changes.
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
    lastVerified: "2026-11-05",
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
    region: "asia",
    airports: ["Soekarno-Hatta, Jakarta (CGK)", "Ngurah Rai, Bali (DPS)"],
    neighbours: ["malaysia", "singapore"],
    lastVerified: "2026-11-05",
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
    // From the catalogue snapshot, the sourced IMEI rule and the Telkomsel coverage tip.
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
    region: "asia",
    airports: ["Incheon (ICN)", "Gimpo (GMP)"],
    neighbours: ["japan", "taiwan"],
    lastVerified: "2026-11-05",
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
    lastVerified: "2026-11-05",
    // From the catalogue snapshot, plus the Changi Wi-Fi tip.
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
    region: "asia",
    airports: ["Kuala Lumpur International (KUL)"],
    neighbours: ["singapore", "thailand", "indonesia"],
    lastVerified: "2026-11-05",
    // From the catalogue snapshot, plus the CelcomDigi merger.
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
    lastVerified: "2026-11-05",
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
    // From the catalogue snapshot and the sourced registration rule. Recheck the rule against DICT or NTC.
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
    region: "asia",
    airports: ["Taoyuan (TPE)"],
    neighbours: ["japan", "hong-kong", "philippines"],
    tips: [
      "Your eSIM can use Chunghwa Telecom or Taiwan Mobile. If the signal is weak in the mountains, choose the other by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Taipei, then Tokyo or Seoul? The Asia plans in the app cover Taiwan, Japan and South Korea on one eSIM.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, and every Taiwan plan can use 5G.",
    ],
    faqs: [
      ...commonFaqs("Taiwan", "Taiwanese"),
      {
        id: "asia",
        question: "Does the Taiwan eSIM work in Japan or Hong Kong?",
        answer:
          "A Taiwan plan works in Taiwan. For several countries, pick one of the Asia plans in the app.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Taiwan?",
        answer:
          "Yes, where the network offers it. Every Kokio Taiwan plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "hong-kong",
    iso2: "HK",
    name: "Hong Kong",
    region: "asia",
    airports: ["Hong Kong International (HKG)"],
    neighbours: ["taiwan"],
    tips: [
      "Day trip to Macau or Shenzhen? A Hong Kong plan stops at the border. The Asia plans in the app cover Hong Kong, Macau and mainland China on one eSIM.",
      "Your eSIM can use 3 Hong Kong, China Mobile Hong Kong, HKT or SmarTone. SmarTone is 4G on these plans, so pick one of the others by hand if you want 5G.",
      "Plans start at 1 GB for 7 days, which covers a short stopover. Unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
    ],
    faqs: [
      ...commonFaqs("Hong Kong", "Hong Kong"),
      {
        id: "macau-china",
        question: "Does the Hong Kong eSIM work in Macau or mainland China?",
        answer:
          "No. A Hong Kong plan works in Hong Kong. The Asia plans in the app cover all three.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Hong Kong?",
        answer:
          "Yes. Unlimited Hong Kong plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "cambodia",
    iso2: "KH",
    name: "Cambodia",
    region: "asia",
    neighbours: ["thailand", "vietnam"],
    tips: [
      "Every Cambodia plan runs on Smart over 4G. There is no 5G on these plans, and no other network to switch to.",
      "Going on to Thailand or Vietnam? Cambodia isn't on the Southeast Asia plan, but the Asia plans in the app cover all three countries.",
      "The largest fixed plan is 20 GB for 30 days. Streaming a lot? Unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
    ],
    faqs: [
      ...commonFaqs("Cambodia", "Cambodian"),
      {
        id: "network",
        question: "Which network does the Cambodia eSIM use?",
        answer: "Smart, over 4G.",
      },
      {
        id: "regional",
        question: "Which regional plan covers Cambodia?",
        answer:
          "The Asia plans in the app. The Southeast Asia plan does not include Cambodia.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "india",
    iso2: "IN",
    name: "India",
    region: "asia",
    airports: ["Delhi (DEL)", "Mumbai (BOM)"],
    neighbours: ["united-arab-emirates"],
    tips: [
      "Want 5G? Only the 50 GB and 100 GB India plans can use it, through Airtel. The other plans run on 4G.",
      "Your eSIM can use Airtel, Jio or Vi. If the signal is weak, choose another by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so a month-long trip fits one 30-day plan.",
    ],
    faqs: [
      ...commonFaqs("India", "Indian"),
      {
        id: "5g",
        question: "Can I use 5G in India?",
        answer:
          "On the 50 GB and 100 GB plans, through Airtel. The other India plans are 4G.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for India?",
        answer:
          "Yes. Unlimited India plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "united-arab-emirates",
    iso2: "AE",
    name: "United Arab Emirates",
    airports: ["Dubai (DXB)", "Zayed International, Abu Dhabi (AUH)"],
    neighbours: ["india"],
    tips: [
      "Unlimited UAE plans top out at 15 days. Staying a month? Pick a 30-day fixed-data plan instead.",
      "Your eSIM can use du or Etisalat, and every UAE plan can use 5G.",
      "Going on to Oman or Jordan? The Middle East plans in the app cover the UAE and its neighbours on one eSIM.",
    ],
    faqs: [
      ...commonFaqs("UAE", "Emirati"),
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for the UAE?",
        answer:
          "Yes, for 3, 5, 7, 10 or 15 days. For longer stays, pick a 30-day fixed-data plan.",
      },
      {
        id: "middle-east",
        question: "Does the UAE eSIM work in Oman or other Gulf countries?",
        answer:
          "A UAE plan works in the UAE. For several countries, pick one of the Middle East plans in the app.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "turkey",
    iso2: "TR",
    name: "Turkey",
    region: "europe",
    airports: ["Istanbul (IST)", "Sabiha Gökçen (SAW)"],
    neighbours: ["greece"],
    tips: [
      "Turkey is in both the Europe plans and the Middle East plans in the app, so it fits either kind of trip on one eSIM.",
      "Your eSIM can use Türk Telekom or Turkcell, and every Turkey plan can use 5G.",
      "Besides the usual 30-day plans, Turkey has 10 GB and 20 GB plans that last 15 days, a good fit for a two-week trip.",
    ],
    faqs: [
      ...commonFaqs("Turkey", "Turkish"),
      {
        id: "europe",
        question: "Is Turkey in Kokio's Europe plans?",
        answer:
          "Yes, in several of them, and in the Middle East plans too. A Turkey plan on its own works only in Turkey.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Turkey?",
        answer:
          "Yes, where the network offers it. Every Kokio Turkey plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "united-states",
    iso2: "US",
    name: "United States",
    neighbours: ["canada", "mexico"],
    lastVerified: "2026-11-05",
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
    tips: [
      "Short stay? Canada has 3-day plans with 1 GB or 3 GB, smaller than most countries offer.",
      "Your eSIM can use Bell, Rogers, Telus or Videotron. Only some Canada plans can use 5G, and the plan table marks which.",
      "Crossing into the US? A Canada plan stops at the border. The North America plans in the app cover Canada, the US and Mexico.",
    ],
    faqs: [
      ...commonFaqs("Canada", "Canadian"),
      {
        id: "us",
        question: "Does the Canada eSIM work in the US?",
        answer:
          "No. For both countries, pick one of the North America plans in the app.",
      },
      {
        id: "5g",
        question: "Do Canada plans include 5G?",
        answer:
          "Some do, mostly the longer fixed-data plans. Unlimited Canada plans are 4G. The plan table marks each one.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "mexico",
    iso2: "MX",
    name: "Mexico",
    airports: ["Mexico City (MEX)", "Cancún (CUN)"],
    neighbours: ["united-states"],
    tips: [
      "Your eSIM can use Telcel, Movistar or AT&T. 5G comes only through AT&T, so pick it by hand if you want 5G.",
      "Heading on to Guatemala or Costa Rica? The Central America plans in the app cover Mexico and its southern neighbours.",
      "Flying on to the US or Canada? The North America plans cover all three countries on one eSIM.",
    ],
    faqs: [
      ...commonFaqs("Mexico", "Mexican"),
      {
        id: "regional",
        question: "Which regional plans cover Mexico?",
        answer:
          "The North America, Central America, South America and Americas plans in the app all include Mexico.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Mexico?",
        answer:
          "Yes. Unlimited Mexico plans run for 3, 5, 7, 10, 15 or 30 days, on 4G. The plan table shows the current prices.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "united-kingdom",
    iso2: "GB",
    name: "United Kingdom",
    region: "europe",
    airports: ["Heathrow (LHR)", "Gatwick (LGW)"],
    neighbours: ["france", "netherlands"],
    lastVerified: "2026-11-05",
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
    region: "europe",
    airports: ["Paris Charles de Gaulle (CDG)", "Paris Orly (ORY)"],
    neighbours: ["spain", "italy", "germany", "switzerland"],
    lastVerified: "2026-11-05",
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
    region: "europe",
    airports: ["Rome Fiumicino (FCO)", "Milan Malpensa (MXP)"],
    neighbours: ["france", "switzerland"],
    lastVerified: "2026-11-05",
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
    region: "europe",
    airports: ["Madrid-Barajas (MAD)", "Barcelona-El Prat (BCN)"],
    neighbours: ["portugal", "france", "morocco"],
    tips: [
      "Your eSIM can use Movistar, Orange, Vodafone or Yoigo. Yoigo is 4G on these plans, so pick one of the others by hand if you want 5G.",
      "Carrying on to Portugal or France? The Europe plans in the app cover Spain and its neighbours on one eSIM.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so a week in Barcelona fits the 7-day plan.",
    ],
    faqs: [
      ...commonFaqs("Spain", "Spanish"),
      {
        id: "europe",
        question: "Does the Spain eSIM work in Portugal or France?",
        answer:
          "A Spain plan works in Spain. For several countries, pick one of the Europe plans in the app.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Spain?",
        answer:
          "Yes, on Movistar, Orange and Vodafone where they offer it. Every Kokio Spain plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "germany",
    iso2: "DE",
    name: "Germany",
    region: "europe",
    airports: ["Frankfurt (FRA)", "Munich (MUC)"],
    neighbours: ["netherlands", "switzerland", "france"],
    tips: [
      "Your eSIM can use O2 or Vodafone. E-Plus is now part of O2, so your phone may show either name.",
      "Crossing borders by train? The Europe plans in the app cover Germany and its neighbours on one eSIM. Note that Switzerland is left out of the Europe + UK plans.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, and every Germany plan can use 5G.",
    ],
    faqs: [
      ...commonFaqs("Germany", "German"),
      {
        id: "europe",
        question: "Does the Germany eSIM work in other European countries?",
        answer:
          "A Germany plan works in Germany. For several countries, pick one of the Europe plans in the app.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Germany?",
        answer:
          "Yes. Unlimited Germany plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "portugal",
    iso2: "PT",
    name: "Portugal",
    region: "europe",
    airports: ["Lisbon (LIS)", "Porto (OPO)"],
    neighbours: ["spain"],
    tips: [
      "Your eSIM can use MEO, NOS or Vodafone, and every Portugal plan can use 5G.",
      "Driving on into Spain? A Portugal plan stops at the border. The Europe plans in the app cover both countries on one eSIM.",
      "Plans start at 1 GB for 7 days, enough for a Lisbon weekend of maps and messages. Unlimited plans run for 3, 5, 7, 10, 15 or 30 days.",
    ],
    faqs: [
      ...commonFaqs("Portugal", "Portuguese"),
      {
        id: "spain",
        question: "Does the Portugal eSIM work in Spain?",
        answer:
          "No. For both countries, pick one of the Europe plans in the app.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Portugal?",
        answer:
          "Yes, where the network offers it. Every Kokio Portugal plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "greece",
    iso2: "GR",
    name: "Greece",
    region: "europe",
    airports: ["Athens (ATH)"],
    neighbours: ["turkey", "italy"],
    tips: [
      "Your eSIM can use Cosmote, Vodafone or Nova. Wind Greece became Nova, so your phone may show either name.",
      "Going on to Albania, North Macedonia or Croatia? The Balkans plans in the app cover Greece and its northern neighbours on one eSIM.",
      "Island-hopping for two weeks? Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so the 15-day plan fits.",
    ],
    faqs: [
      ...commonFaqs("Greece", "Greek"),
      {
        id: "regional",
        question: "Which regional plans cover Greece?",
        answer:
          "The Europe plans and the Balkans plans in the app. A Greece plan on its own works only in Greece.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Greece?",
        answer:
          "Yes, where the network offers it. Every Kokio Greece plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "netherlands",
    iso2: "NL",
    name: "Netherlands",
    region: "europe",
    airports: ["Amsterdam Schiphol (AMS)"],
    neighbours: ["germany"],
    tips: [
      "Your eSIM can use KPN or Vodafone. If the signal is weak, choose the other by hand in Settings → Mobile Service → your Kokio line → Network Selection.",
      "Want 5G on an unlimited plan? The 5, 10 and 15-day unlimited plans have it. The 3, 7 and 30-day ones are 4G, while every fixed-data plan can use 5G.",
      "Taking the train to Brussels or Berlin? The Europe plans in the app cover the Netherlands and its neighbours on one eSIM.",
    ],
    faqs: [
      ...commonFaqs("Netherlands", "Dutch"),
      {
        id: "europe",
        question: "Does the Netherlands eSIM work in Belgium or Germany?",
        answer:
          "A Netherlands plan works in the Netherlands. For several countries, pick one of the Europe plans in the app.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for the Netherlands?",
        answer:
          "Yes. Unlimited Netherlands plans run for 3, 5, 7, 10, 15 or 30 days. The plan table shows the current prices.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "switzerland",
    iso2: "CH",
    name: "Switzerland",
    region: "europe",
    airports: ["Zurich (ZRH)", "Geneva (GVA)"],
    neighbours: ["germany", "france", "italy"],
    tips: [
      "Switzerland isn't in the EU, and some Europe plans leave it out. The Europe and Europe Lite plans in the app include it; the Europe + UK plans do not.",
      "Your eSIM can use Swisscom, Sunrise or Salt, and every Switzerland plan can use 5G.",
      "Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so a week of Alpine rail passes fits the 7-day plan.",
    ],
    faqs: [
      ...commonFaqs("Switzerland", "Swiss"),
      {
        id: "europe",
        question: "Do Kokio's Europe plans cover Switzerland?",
        answer:
          "Some do. The Europe and Europe Lite plans include Switzerland. The Europe + UK plans do not, so check the country list before you buy.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Switzerland?",
        answer:
          "Yes, where the network offers it. Every Kokio Switzerland plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "australia",
    iso2: "AU",
    name: "Australia",
    airports: ["Sydney (SYD)", "Melbourne (MEL)"],
    neighbours: ["indonesia"],
    tips: [
      "Your eSIM can use Optus or Telstra. 5G comes through Optus; Telstra is 3G and 4G on these plans.",
      "Going on to New Zealand? The Oceania plans in the app cover Australia and New Zealand on one eSIM.",
      "Long drives between cities? Unlimited plans run for 3, 5, 7, 10, 15 or 30 days, so maps and music won't eat a fixed allowance.",
    ],
    faqs: [
      ...commonFaqs("Australia", "Australian"),
      {
        id: "new-zealand",
        question: "Does the Australia eSIM work in New Zealand?",
        answer:
          "No. For both countries, pick one of the Oceania plans in the app.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Australia?",
        answer:
          "Yes, on Optus where it offers 5G. Every Kokio Australia plan can use it.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "brazil",
    iso2: "BR",
    name: "Brazil",
    airports: ["São Paulo Guarulhos (GRU)", "Rio de Janeiro Galeão (GIG)"],
    neighbours: [],
    tips: [
      "Your eSIM can use Claro, TIM or Vivo, and every Brazil plan can use 5G.",
      "Going on to Argentina, Chile or Peru? The South America plans in the app cover Brazil and its neighbours on one eSIM.",
      "Plans start at 1 GB for 7 days. For a month across the country, unlimited plans run up to 30 days.",
    ],
    faqs: [
      ...commonFaqs("Brazil", "Brazilian"),
      {
        id: "south-america",
        question:
          "Does the Brazil eSIM work in other South American countries?",
        answer:
          "A Brazil plan works in Brazil. For several countries, pick one of the South America or Americas plans in the app.",
      },
      {
        id: "5g",
        question: "Can I use 5G in Brazil?",
        answer:
          "Yes, where the network offers it. Every Kokio Brazil plan can use 5G.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "egypt",
    iso2: "EG",
    name: "Egypt",
    airports: ["Cairo (CAI)"],
    neighbours: [],
    tips: [
      "Unlimited Egypt plans come in 3, 5 and 10-day lengths, on 4G. For longer trips or 5G, pick a fixed-data plan.",
      "Your eSIM can use Orange or Vodafone. 5G comes through Orange; Vodafone is 4G on these plans.",
      "Combining Egypt with Jordan or the UAE? The Middle East plans in the app cover all three on one eSIM.",
    ],
    faqs: [
      ...commonFaqs("Egypt", "Egyptian"),
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Egypt?",
        answer:
          "Yes, for 3, 5 or 10 days, on 4G. For longer stays, pick a 15 or 30-day fixed-data plan.",
      },
      {
        id: "regional",
        question: "Which regional plans cover Egypt?",
        answer:
          "The Middle East plans and the Africa plans in the app. An Egypt plan on its own works only in Egypt.",
      },
    ],
    lastVerified: "2026-11-05",
  }),
  starter({
    slug: "morocco",
    iso2: "MA",
    name: "Morocco",
    airports: ["Casablanca Mohammed V (CMN)", "Marrakesh Menara (RAK)"],
    neighbours: ["spain"],
    tips: [
      "Kokio's Morocco plans run on 4G through Maroc Telecom or Orange. There is no 5G on these plans.",
      "Unlimited Morocco plans come in 3, 5 and 7-day lengths. Staying longer? Pick a 15 or 30-day fixed-data plan.",
      "Crossing from Spain by ferry? A Spain plan stops at Spain. The Middle East & North Africa plans in the app include Morocco.",
    ],
    faqs: [
      ...commonFaqs("Morocco", "Moroccan"),
      {
        id: "5g",
        question: "Can I use 5G in Morocco?",
        answer: "No. Kokio's Morocco plans are 4G.",
      },
      {
        id: "unlimited",
        question: "Is there an unlimited data plan for Morocco?",
        answer:
          "Yes, for 3, 5 or 7 days. For longer stays, pick a 15 or 30-day fixed-data plan.",
      },
    ],
    lastVerified: "2026-11-05",
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

// The two questions every destination gets. `local` is the adjective in "a Spanish phone number".
function commonFaqs(name: string, local: string): Faq[] {
  return [
    {
      id: "passport",
      question: `Do I need my passport to buy Kokio's ${name} eSIM?`,
      answer:
        "No. Kokio asks for no passport, name or email. You sign in with a passkey on your phone.",
    },
    {
      id: "phone-number",
      question: `Does the ${name} eSIM include ${articleFor(local)} ${local} phone number?`,
      answer: `No. Kokio's ${name} plans are data-only, so calls and messages go through internet apps.`,
    },
  ];
}

function articleFor(word: string): string {
  return /^[AEIOU]/.test(word) ? "an" : "a";
}
