/** Data use per activity for the "how much data do I need" calculator, and the page's shared copy. */

import type { Faq, Source } from "@/lib/esim/types";

export const DATA_PAGE = {
  path: "/esim/how-much-data",
  title: "How much data do I need for a trip?",
  description:
    "Work out how much mobile data your trip needs from the days away and how you use your phone, then see the cheapest Kokio plan that covers it.",
};

export interface Activity {
  id: string;
  label: string;
  gbPerHour: number;
  /** Where the figure comes from. Null means Kokio's own estimate, and the page says so. */
  source: Source | null;
  /** How the figure was read from the source, shown next to it. */
  basis: string;
  defaultHours: number;
}

export const ACTIVITIES: Activity[] = [
  {
    id: "browsing",
    label: "Maps, messages and browsing",
    gbPerHour: 0.1,
    source: null,
    basis:
      "Kokio's estimate. No app publishes one figure for this, and photo-heavy feeds use more.",
    defaultHours: 3,
  },
  {
    id: "music",
    label: "Music streaming",
    // 160 kbit/s for an hour is 72 MB.
    gbPerHour: 0.072,
    source: {
      label: "Spotify: Audio quality",
      url: "https://support.spotify.com/us/article/audio-quality/",
    },
    basis: "Spotify's High setting, about 160 kbit/s.",
    defaultHours: 1,
  },
  {
    id: "video",
    label: "Video streaming",
    gbPerHour: 0.25,
    source: {
      label: "Netflix: How to control how much data Netflix uses",
      url: "https://help.netflix.com/en/node/87",
    },
    basis:
      "Netflix on a phone with the Automatic setting, about 4 hours per GB.",
    defaultHours: 0.5,
  },
  {
    id: "video-calls",
    label: "Video calls",
    // 600 kbit/s each way for an hour is 270 MB each way.
    gbPerHour: 0.54,
    source: {
      label: "Zoom: bandwidth requirements",
      url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748",
    },
    basis: "A one-to-one Zoom call in high quality, 600 kbit/s up and down.",
    defaultHours: 0,
  },
];

export type DailyHours = Record<string, number>;

export function defaultHours(): DailyHours {
  return Object.fromEntries(
    ACTIVITIES.map((activity) => [activity.id, activity.defaultHours])
  );
}

/** Total GB for the trip, rounded up to the next tenth so the estimate never undershoots. */
export function estimateGb(days: number, hours: DailyHours): number {
  const perDay = ACTIVITIES.reduce(
    (sum, activity) => sum + activity.gbPerHour * (hours[activity.id] ?? 0),
    0
  );
  // toFixed drops float noise first, or 0.3 GB would round up to 0.4.
  return Math.ceil(Number((days * perDay * 10).toFixed(6))) / 10;
}

const WEEK = 7;

/** The worked example at the top of the page, from the calculator's own defaults. */
export function sampleAnswer(): string {
  return `A week of 3 hours a day on maps, messages and browsing, an hour of music and half an hour of video comes to about ${estimateGb(WEEK, defaultHours())} GB. Video calls add the most: an hour a day is about ${estimateGb(WEEK, { "video-calls": 1 })} GB a week on its own.`;
}

export const DATA_FAQS: Faq[] = [
  {
    id: "wifi",
    question: "Does time on Wi-Fi count?",
    answer:
      "No. Only time on mobile data counts. Hotel and café Wi-Fi uses none of your plan, so download maps, playlists and shows before you head out.",
  },
  {
    id: "unlimited",
    question: "Is an unlimited plan worth it?",
    answer:
      "When you stream or make video calls every day, often yes. The calculator picks an unlimited plan whenever it costs less than a plan with enough data.",
  },
  {
    id: "run-out",
    question: "What if I run out of data?",
    answer:
      "Top up the same eSIM in the app. In checkout, switch to Top-up and pick the eSIM you already have.",
  },
  {
    id: "save-data",
    question: "How can I use less data abroad?",
    answer:
      "Download offline maps and playlists on Wi-Fi, set Netflix to Save Data (about 6 hours per GB, according to Netflix), and turn off app updates and photo backup on mobile data.",
  },
];
