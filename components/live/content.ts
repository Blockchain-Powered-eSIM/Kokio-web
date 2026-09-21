/**
 * Voice: manifesto/blog register (plain, confident, privacy-forward).
 * Every claim here has been checked against released app.
 *
 * `**word**` inside strings is bold-parsed by <RichText> — used to call out
 * exact button labels, the same way the artifact does with <strong>.
 */

// Kokio's Telegram community — same link used in Contact Support panel and the hero's "reach out" line, kept as one source so they can't drift.
const TELEGRAM_URL = "https://t.me/+Ru38DI2V69IyY2Y9";

export const HERO = {
  title: "Get Kokio",
  body: "Onboard via biometrics, pick a plan that suits your travel, pay with your go-to option, install at home and activate once you arrive at your destination.",
  contactLinkText: "reach out",
  contactHref: TELEGRAM_URL,
  guideHeading: "Interactive Usage Guide",
  guideLead: "Flip the theme, tap and explore, a simulation of Kokio app.",
};

export type StepContent = {
  id: string;
  index: string;
  sourceTag: string;
  alt: 0 | 1;
  title: string;
  summary: string;
  items: string[];
  callout?: { tone?: "default" | "danger"; strong?: string; text: string };
  tryHint?: string;
};

export const STEPS: StepContent[] = [
  {
    id: "auth",
    index: "Step 01",
    sourceTag: "Sign in",
    alt: 0,
    title: "Onboarding",
    summary:
      "Using biometrics (passkeys), Kokio never asks for your name, email, or any such personal information that can be used to indetify you irl.",
    items: [
      "Open Kokio, Tap **New User** create and sign-in using passkeys.",
      "Only use **Existing User** if you've reinstalled Kokio on the same device without deleting that `kokio.app` passkey from device password manager?",
      "After the first time, You'll just have to **Log In** continue",
    ],
    callout: {
      strong: "Guard the passkey",
      text: "A passkey synced through your platform's password manager can restore your account on a new or reinstalled device, but if the passkey itself is gone (if you delete it), or your manager doesn't sync, there's no way back in. Deleting your account (see in Step 07) is the one action that truly has no recovery, by anyone, ever.",
    },
    tryHint: 'Switch to "Sign in" below, then tap a button.',
  },
  {
    id: "shop",
    index: "Step 02",
    sourceTag: "Explore",
    alt: 1,
    title: "Explore plans",
    summary:
      "Jump straight to the Shop tab. Pick a plan that suits your trip with well curated eSIM catalgoue with Local, Unlimited, Regional, Global and Special Plans",
    items: [
      'On Home, tap **Shop** or the cart icon in the tab bar, to open the shop.',
      "Tap **Countries**, **Regions**, **Global**, or **Special** to browse plans in that category.",
      "Every plan card shows its Days, GB, Minutes and SMS up front, next to the price. Tap **View** to open checkout and find more details about the plan there as well.",
    ],
    tryHint: "Tap Shop, then switch category tabs.",
  },
  {
    id: "checkout",
    index: "Step 03",
    sourceTag: "Checkout",
    alt: 0,
    title: "Pay however you already pay",
    summary:
      "Expand the plan to see exactly what you're buying, pay and install",
    items: [
      "Tap the plan header, the country name and Days/GB, to expand it.",
      "The expanded panel adds Plan Type, Top-Up availability, and Coverage; tap Coverage for the full list of countries and networks.",
      "Check the box confirming your device is eSIM-compatible and network-enabled.",
      "Pick whichever payment method you already reach for: **Credit Card**, **Apple Pay**, or **External Wallet** for crypto, via MoonPay. **Device Wallet** is coming soon.",
      "Have a coupon? Fill and tap **Apply Coupon** to use it.",
      "Already have an eSIM in use? Flip the **First eSIM / Top-up** toggle to **Top-up**, then tap the specific existing eSIM you want the new plan applied to, that selection is what makes it a top-up instead of a fresh purchase.",
      "Once payment confirms, tap **Install eSIM** there to get the installation details (Step 05 covers it).",
    ],
    callout: {
      text: 'Top-up only appears if you already hold a compatible eSIM, confirmed vendor-side, otherwise you\'ll see a plain "not compatible for top-up" instead of a guess.',
    },
    tryHint: 'Switch to "Top-up" above to see the option.',
  },
  {
    id: "orders",
    index: "Step 04",
    sourceTag: "Orders, Payments and eSIM details",
    alt: 1,
    title: "Track your eSIM usage, order history, invoices and more details",
    summary:
      "The Orders tab follows the purchase. A separate eSIM view, reached from Home, follows the data.",
    items: [
      "Open the **Orders** tab. Each order carries a status pill: Processing, Provisioning, eSIM Ready, Completed, plus a few in-between states if something needs a retry.",
      "Nothing to do while it's Processing or Provisioning, give it a moment.",
      "Tap an order to expand it. Once it reads **eSIM Ready**, an **Install eSIM** button appears.",
      "Tap **Purchase Details** any time for a bottom sheet with ICCID, reference, payment method, invoice, and plan history.",
      "For the eSIM's own status: Data Remaining, a usage bar, Ready to Install / Active / Unavailable / Deactivated, and its ICCID, check the active-eSIM card on **Home**, not the Orders tab. Different screen, same eSIM.",
    ],
    tryHint: "Tap any order below to expand it.",
  },
  {
    id: "install",
    index: "Step 05",
    sourceTag: "Install your eSIM",
    alt: 0,
    title: "Installation",
    summary:
      "Three tabs on the installation screen: Direct, QR, or Manual. You'll get on the fastest Direct Install first.",
    items: [
      "From an order marked eSIM Ready, tap **Install eSIM**. You'll land on the **Direct** tab.",
      "On **Direct**, iOS only for now, with Android support on the way, tap **Install eSIM** to hand off to Apple's native flow.",
      "On **QR**, open your phone's own Settings (Cellular/Mobile Data → Add eSIM → Use QR Code) and scan it directly, or tap **Share QR code** to save or send the image somewhere you can scan it from.",
      "On **Manual**, tap the **Activation code (LPA)** row to copy it to your clipboard, then paste it wherever your phone's own setup flow asks.",
      "The Orders tab shows the install status too, any time you want to check.",
    ],
    callout: {
      text: 'Kokio **does not store** any personal info, so it cannot share this QR via email or messages to you. Share it to yourself through a channel you can open and scan, like messaging it to another device.',
    },
    tryHint: "Switch tabs, or tap Copy.",
  },
  {
    id: "wallet",
    index: "Step 06",
    sourceTag: "Self custodial keyless wallet",
    alt: 1,
    title: "A wallet you own",
    summary:
      "A Device Wallet lives on your Home screen, the passkey never leaves your phone's own hardware.",
    items: [
      "Before you deploy one, Home shows a **Device Wallet** card with a simple prompt: tap to create it.",
      "Once deployed, that same card shows your balance and a shortened wallet address, with quick links to copy it or open it in the block explorer.",
      "It's live on Base Sepolia testnet today, ahead of mainnet.",
    ],
    callout: {
      text: "Wallet will be enabled soon for purchases and more.",
    },
    tryHint: "Tap the card below to deploy your wallet.",
  },
  {
    id: "settings",
    index: "Step 07",
    sourceTag: "Menu or settings",
    alt: 0,
    title: "Contact for support, About and more",
    summary:
      "Control the look, get support, read the real policy, and (if you ever want to) delete everything for good.",
    items: [
      "Open **Settings**.",
      "Tap **Privacy Policy** for kokio.app's actual policy page, loaded in place.",
      "Tap **About** for the app version, what Kokio is built on, and a link to follow along.",
      "Tap **Contact Support** to email or message on telegram to Kokio directly.",
      "Tap the theme row to flip Dark/Light, try it below, it flips this whole guide too.",
      "Tap **Logout** to end the session; you'll land back on the sign-in screen from Step 01.",
      "Tap **Delete Account**, then type **DELETE** to arm the button and confirm.",
    ],
    callout: {
      tone: "danger",
      strong: "This cannot be undone.",
      text: "Deleting your account is immediate. There's no recovery: not by you, not by Kokio. Any eSIM you've already paid for keeps working until it expires; deletion doesn't cancel or refund it. You lose in-app access to your order history, eSIM details, and wallet, and on-chain records can never be deleted by anyone. You'll also need to remove your passkey yourself.",
    },
  },
];

export const SETTINGS_ABOUT = {
  lines: [
    "You are using official Kokio mobile app.",
    "A mobile app to purchase eSIM data plans and subscriptions using crypto or fiat in over 200 countries.",
  ],
  basedOn: {
    text: "Based on ",
    linkLabel: "Open Source eSIM Wallet Suite",
    href: "https://github.com/Blockchain-Powered-eSIM/Smart-Contract-Suite",
  },
  privacyLine:
    "Built with privacy first, friendly and practical design for the digital well-being and connectivity freedom of mobile users worldwide.",
  website: { text: "Our website ", linkLabel: "kokio.app", href: "https://kokio.app" },
  // Only X is real (verified against source) — no Instagram link in the app.
  socials: [{ label: "Follow us: @kokiodotapp", href: "https://x.com/kokiodotapp" }],
};

export const SETTINGS_CONTACT = {
  email: "contact@kokio.app",
  telegram: TELEGRAM_URL,
};

export const DELETE_ACCOUNT = {
  title: "Delete account",
  intro:
    "This permanently deletes your account. It cannot be undone, not by you, and not by us. There is no recovery.",
  bullets: [
    "Your eSIMs keep working. Any plan you have already paid for stays active until it expires. Deleting your account does not cancel or refund it.",
    "You lose access to your order history, eSIM details, and wallet in this app.",
    "On-chain records are permanent and cannot be deleted by anyone.",
    "You will need to remove your passkey yourself.",
  ],
  confirmLabel: "Type DELETE to confirm.",
};

export const CLOSING_TIPS = {
  heading: "Activation & troubleshooting tips",
  lead: "A few things worth knowing before and after you install, not covered in the steps above.",
  items: [
    "Most eSIMs install once. Remove it from your device and it cannot be installed again, so only remove one you are finished with.",
    "Install on a stable connection, at home on Wi-Fi or a private hotspot, before you travel rather than on the move.",
    "Label the eSIM as you install it, something like **Japan** or **Kokio**, so your device's SIM list stays easy to read.",
    "On iPhone, activation runs through **Settings → Mobile Service**: pick the new eSIM, keep your primary line set for calls and iMessage, set the new eSIM for cellular data, then turn on data roaming.",
    "Connectivity trouble? Toggle **Airplane Mode** off and on first, that clears most issues.",
    "Still stuck? Turn off automatic network selection, pick the strongest network manually, and check the eSIM's coverage from its details in the Kokio app, since it can sometimes latch onto a weaker one.",
  ],
};
