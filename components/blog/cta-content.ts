import { APP_URL, TWITTER_URL } from "@/config/site";

export const CTA_CONTENT = {
  prelaunch: {
    heading: "Follow along on X",
    body: "Stay updated about Kokio and learn about digital well-being and wellness :)",
    ctaLabel: "Follow on X",
    href: TWITTER_URL,
    inlineText: "Want to learn more?",
    inlineLabel: "Follow us on X",
  },
  live: {
    heading: "Try Kokio",
    body: "Tap. Authenticate. Connect.",
    ctaLabel: "Try out the App today!",
    href: APP_URL,
    inlineText: "Ready to travel smarter?",
    inlineLabel: "Try Kokio",
  },
} as const;
