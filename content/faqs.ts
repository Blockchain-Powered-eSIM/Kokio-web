/**
 * Landing page FAQ.
 *
 * Read by the rendered list and by the FAQPage schema, so the two cannot
 * disagree. Answers are retrieved one at a time, without the page around them,
 * so each one has to name Kokio and stand on its own.
 */

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
      "Kokio utilizes distributed ledger technology to offer decentralized mobile connectivity, enhancing privacy, security, and ease of use compared to traditional eSIM providers.",
  },
  {
    id: "early-access",
    question: "How do I get early access to Kokio?",
    answer:
      "Kokio runs early access through its Telegram group, linked from the buttons on kokio.app. Invitations, release dates and testing rounds are announced there first, and on X at @kokiodotapp. Kokio reaches public launch in September 2026 on the App Store and Google Play, so early access is the way to use it before then.",
  },
  {
    id: "setup",
    question: "How can I set up my Kokio eSIM?",
    answer:
      "Download the Kokio app, choose your desired plan from over 200 destinations, and activate your eSIM instantly to start enjoying mobile connectivity.",
  },
  {
    id: "payment-methods",
    question: "What payment options does Kokio accept?",
    answer:
      "Kokio supports a variety of payment methods including credit and debit cards, Apple Pay, Google Pay, PayPal and other digital wallets.",
  },
  {
    id: "security",
    question: "What security measures does Kokio employ for its services?",
    answer:
      "Kokio’s app ensures top-notch security and privacy using biometrics, secure enclave technology, and the inherent security features of distributed ledger technology.",
  },
  {
    id: "personal-information",
    question: "Is personal information required to use Kokio’s services?",
    answer:
      "No, Kokio values privacy and does not require personal information for setting up or using its services, ensuring your data remains private.",
  },
  {
    id: "roadmap",
    question: "What is the roadmap for Kokio’s service launch?",
    answer:
      "Kokio goes into public launch in September 2026, on the App Store and Google Play, with data plans in over 200 destinations. Around the launch, Kokio is testing regionally across Southeast Asia and with partner communities, and starting the road to mainnet. Later in 2026 come the device wallet, so checkout happens inside the app, referral links, partner discount codes, sponsored eSIM flows for events, and connectivity partnerships. Early 2027 adds distribution through physical hubs and coworking partnerships, privacy rails driven by what people ask for, and plans that need verified identity, built with identity partners so that Kokio never holds the identity itself. These are targets rather than promises.",
  },
  {
    id: "reinstall-esim",
    question: "Can I reinstall my Kokio eSIM if I remove it?",
    answer:
      "No. Most eSIMs, including the ones Kokio issues, can only be installed once. Removing it from your device is final, so only remove an eSIM you are finished using.",
  },
  {
    id: "activate-esim",
    question: "How do I activate my Kokio eSIM after installing it?",
    answer:
      "On iPhone, open Settings, tap Mobile Service, and select the new eSIM. Give it a label such as the destination or Kokio, keep your primary line set for calls and iMessage, and set the new eSIM as your line for cellular or mobile data. Turn on data roaming and the eSIM is ready to use.",
  },
  {
    id: "troubleshoot-connectivity",
    question: "My Kokio eSIM won’t connect, what should I try?",
    answer:
      "Turn Airplane Mode off and on first, that resolves most connectivity issues. If it persists, turn off automatic network selection, manually choose the strongest available network, and check the eSIM’s coverage from its details inside the Kokio app, since it can sometimes stay connected to a weaker network than the one available.",
  },
];
