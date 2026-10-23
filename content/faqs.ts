/** Landing page FAQ. Read by the rendered list and by the FAQPage schema. */

import { PAYMENT_METHODS } from "@/lib/site-copy";

export interface Faq {
  /** Stable anchor, used for deep links and as the schema `@id` fragment. */
  id: string;
  question: string;
  answer: string;
}

export const faqsData: Faq[] = [
  {
    id: "what-is-kokio",
    question:
      "What is Kokio and how does it differ from traditional eSIM providers?",
    answer:
      "Kokio is a travel eSIM app with data plans in over 200 destinations. Pick a plan, pay and install before you fly. Unlike most providers, we don’t ask for your name, email or ID: you sign in with a passkey instead. It’s built on an open source wallet suite, and an optional Kokio Wallet lets you pay in crypto.",
  },
  {
    id: "get-kokio",
    question: "How do I get Kokio?",
    answer:
      "Kokio is live on the App Store and Google Play. Download links and a step-by-step guide are at kokio.app/live. There’s no signup form: you create an account with a passkey, and we never ask for your name, email or ID. Updates go out on X at @kokiodotapp.",
  },
  {
    id: "setup",
    question: "How can I set up my Kokio eSIM?",
    answer:
      "Download the Kokio app, choose a plan from over 200 destinations, pay, and install the eSIM in a few taps, at home before you travel, then switch it on when you land.",
  },
  {
    id: "payment-methods",
    question: "What payment options does Kokio accept?",
    answer:
      PAYMENT_METHODS,
  },
  {
    id: "security",
    question: "What security measures does Kokio employ for its services?",
    answer:
      "Kokio signs you in with a passkey, confirmed by your device’s biometrics and stored in its secure hardware, so there’s no password to steal or phish. And since Kokio collects no personal information, there’s no profile of you to leak.",
  },
  {
    id: "personal-information",
    question: "Is personal information required to use Kokio’s services?",
    answer:
      "No. Kokio never asks for personal information to set up or use the app.",
  },
  {
    id: "roadmap",
    question: "What is on Kokio’s roadmap?",
    answer:
      "Kokio is live on the App Store and Google Play, with data plans in over 200 destinations, and is now on mainnet, with regional testing across Southeast Asia and partner communities ongoing. Later in 2026: the Kokio Wallet fully rolls out for in-app checkout, plus referral links, partner discount codes, sponsored eSIM flows for events, and connectivity partnerships. Early 2027: distribution through physical hubs and coworking partnerships, privacy rails based on demand, and identity-verified plans built with identity partners, so Kokio itself never holds the identity. These are targets, not promises.",
  },
  {
    id: "reinstall-esim",
    question: "Can I reinstall my Kokio eSIM if I remove it?",
    answer:
      "No. Most eSIMs, including Kokio’s, install once only. Removing it from your device is final, so only remove one you’re finished using.",
  },
  {
    id: "activate-esim",
    question: "How do I activate my Kokio eSIM after installing it?",
    answer:
      "On iPhone: Settings → Mobile Service → select the new eSIM. Label it (e.g. the destination or Kokio), keep your primary line for calls and iMessage, and set the new eSIM as your line for cellular or mobile data. Turn on data roaming and it’s ready to use.",
  },
  {
    id: "troubleshoot-connectivity",
    question: "My Kokio eSIM won’t connect, what should I try?",
    answer:
      "Toggle Airplane Mode off and on first to fix most connectivity issues. If it persists, turn off automatic network selection, manually pick the strongest available network, and check the eSIM’s coverage in the Kokio app, since it can sometimes stay locked to a weaker network than the one available.",
  },
];
