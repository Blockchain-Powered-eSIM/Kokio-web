/**
 * Voice: manifesto/blog register (plain, confident, privacy-forward).
 * Every claim here has been checked against released app.
 *
 * `**word**` inside strings is bold-parsed by <RichText> — used to call out
 * exact button labels, the same way the artifact does with <strong>.
 */

// Kokio's Telegram community — same link used in Contact Support panel and the hero's "reach out" line, kept as one source so they can't drift.
const TELEGRAM_URL = "https://t.me/+Ru38DI2V69IyY2Y9";

// Page-level notice above the hero. Source of truth: the app's TESTNET_DISCLOSURE_MESSAGE
// (constants/general.constants.ts) and welcome-back.tsx. Mainnet is NOT live; remove or
// rewrite this once the cutover ships (the app keeps its own disclosure until then too).
export const MAINNET_BANNER = {
  heading: "Kokio runs on a test network today, ahead of our mainnet launch.",
  body: "It is Base Sepolia, with real eSIMs and real data bundles. When we launch on mainnet, your wallet and passkey will be reset, and after launch the app will ask you to delete your old passkey from your device's password manager. The eSIMs you have installed keep working until their data runs out.",
};

export const HERO = {
  title: "Get Kokio",
  body: "Onboard with biometrics, pick a plan that suits your travel, pay with your go-to option, install at home and activate on arrival.",
  contactLinkText: "reach out",
  contactHref: TELEGRAM_URL,
  guideHeading: "Interactive Usage Guide",
  guideLead: "Flip the theme, tap around and explore this simulation of the Kokio app.",
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
      "Using biometrics (passkeys), Kokio never asks for your name, email, or any personal information that could identify you in real life.",
    items: [
      "Open Kokio and tap **New User** to create your account and sign in with a passkey.",
      "Use **Existing User** only if you've reinstalled Kokio on the same device without deleting its `kokio.app` passkey from the device's password manager.",
      "After the first time, just tap **Log In** to continue.",
    ],
    callout: {
      strong: "Guard the passkey",
      text: "A passkey synced through your platform's password manager can restore your account on a new or reinstalled device. If the passkey is gone (you deleted it) or your manager doesn't sync, there's no way back in. Deleting your account (see Step 07) is the one action that truly has no recovery, by anyone, ever.",
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
      "Home shows your eSIMs and wallet at a glance. The Shop tab holds the whole catalogue: local, regional, global and special plans, with search and filters to narrow them down.",
    items: [
      "On Home, tap **Shop** or the cart icon in the tab bar to open the shop. Below the banner, Home lists your eSIMs and your Kokio wallet.",
      "Type in the search box, or tap **Countries**, **Regions**, **Global**, or **Special** to browse. Tap a country or region to see its plans.",
      "Inside a country, tap a network chip such as **NTT Docomo** to see only that network's plans, or **Show more plans** to load extra ones.",
      "Tap the filter icon to narrow plans by price, data and validity, then tap **Apply**.",
      "Every plan card shows its days and data (or Unlimited) next to the price, plus minutes and SMS when included. Tap **View** to open checkout, where you'll find more plan details.",
    ],
    tryHint: "Tap Shop, open a country, then try the filter.",
  },
  {
    id: "checkout",
    index: "Step 03",
    sourceTag: "Checkout",
    alt: 0,
    title: "Pay however you already pay",
    summary:
      "Expand the plan to see exactly what you're buying, then pay and install.",
    items: [
      "Tap the plan header (country name and Days/GB) to expand it.",
      "The expanded panel adds Plan Type, Top-Up availability and Coverage. Tap Coverage for the full list of countries and networks.",
      "Check the box confirming your device is eSIM-compatible and network-enabled.",
      "Pick the payment method you already reach for: your **Device Wallet** (USDC, USDT or DAI), a **Credit/Debit Card**, **Apple Pay**, or an **External Wallet** for crypto, via MoonPay.",
      "Have a coupon? Enter it and tap **Apply Coupon**.",
      "Already have an eSIM in use? Flip the **First eSIM / Top-up** toggle to **Top-up**, then tap the existing eSIM you want the new plan applied to. That selection makes it a top-up instead of a fresh purchase.",
      "Once payment confirms, tap **Install eSIM** to get the installation details (Step 05 covers it).",
    ],
    callout: {
      text: 'Top-up only appears if you already hold a compatible eSIM, confirmed vendor-side. Otherwise you\'ll see a plain "not compatible for top-up" instead of a guess.',
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
      "Open the **Orders** tab. Each order carries a status pill: Processing, Provisioning, eSIM Ready or Completed, plus a few in-between states if something needs a retry.",
      "Nothing to do while it's Processing or Provisioning. Give it a moment.",
      "Tap an order to expand it. Once it reads **eSIM Ready**, an **Install eSIM** button appears.",
      "Tap **Purchase Details** any time for a bottom sheet with ICCID, reference, payment method, invoice and plan history.",
      "For the eSIM's own status (Data Remaining, a usage bar, Ready to Install / Active / Unavailable / Deactivated, and its ICCID), check the active-eSIM card on **Home**, not the Orders tab. Different screen, same eSIM.",
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
      "The installation screen has three tabs: Direct, QR and Manual. You start on Direct, the fastest.",
    items: [
      "From an order marked eSIM Ready, tap **Install eSIM**. You'll land on the **Direct** tab.",
      "On **Direct** (iOS only for now, Android support on the way), tap **Install eSIM** to hand off to Apple's native flow.",
      "On **QR**, open your phone's own Settings (Cellular/Mobile Data → Add eSIM → Use QR Code) and scan it directly, or tap **Share QR code** to save or send the image somewhere you can scan it from.",
      "On **Manual**, tap the **Activation code (LPA)** row to copy it to your clipboard, then paste it wherever your phone's own setup flow asks.",
      "The Orders tab shows the install status too, any time you want to check.",
    ],
    callout: {
      text: 'Kokio **does not store** any personal info, so it cannot email or message you this QR. Share it to yourself through a channel you can open and scan, like messaging it to another device.',
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
      "A Kokio wallet is optional. Card payments keep working, and the passkey never leaves your phone's own hardware.",
    items: [
      "Open the **Wallet** tab. Until you have one, it explains what a Kokio wallet adds, with an **Add a Kokio wallet** card below.",
      "Tap **Create wallet** for a short page on how it works, then **Create with Face ID** (or Fingerprint on Android).",
      "Setup can take a few minutes. Meanwhile the tab reads **Setting up your wallet** and purchases are restricted, so feel free to explore plans.",
      "Once it's ready, the tab shows your total balance, a shortened address with quick links to copy it or open it in the block explorer, and **Send**, **Receive** and **Deposit** buttons.",
      "**Buy eSIMs with USDC** takes you straight to Shop. Below sit your tokens (USDC, USDT, DAI and ETH, plus **Add token**), your latest transactions and your contacts. Once you own an eSIM, each one gets its own wallet, listed there too.",
      "It's still on a test network, so the wallet shows a **TESTNET** badge. Your wallet and passkey will be reset when we launch on mainnet.",
    ],
    callout: {
      text: "You can pay from this wallet at checkout. Pick **Device Wallet**, then USDC, USDT or DAI. If you haven't set a wallet up yet, checkout offers to do it first.",
    },
    tryHint: "Tap Create wallet below to walk through it.",
  },
  {
    id: "settings",
    index: "Step 07",
    sourceTag: "Menu or settings",
    alt: 0,
    title: "Contact for support, About and more",
    summary:
      "Control the look, get support, read the real policy, and delete everything for good if you ever want to.",
    items: [
      "Open **Settings**.",
      "Tap **Privacy Policy** for kokio.app's actual policy page, loaded in place.",
      "Tap **About** for the app version, what Kokio is built on, and a link to follow along.",
      "Tap **Contact Support** to email Kokio or message it on Telegram directly.",
      "A notice near the bottom reminds you Kokio still runs on a test network; your wallet and passkey get reset once we launch on mainnet.",
      "Tap the theme row to flip Dark/Light. Try it below: it flips this whole guide too.",
      "Tap **Logout** to end the session; you'll land back on the sign-in screen from Step 01.",
      "Tap **Delete Account**, then type **DELETE** to arm the button and confirm.",
      "A final screen confirms **Your account is deleted** and walks you through removing the passkey yourself. Try it below too.",
    ],
    callout: {
      tone: "danger",
      strong: "This cannot be undone.",
      text: "Deleting your account is immediate. There's no recovery: not by you, not by Kokio. Any eSIM you've already paid for keeps working until it expires; deletion doesn't cancel or refund it. You lose in-app access to your order history, eSIM details and wallet, and on-chain records can never be deleted by anyone. You'll also need to remove your passkey yourself.",
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
  // Both are real — verified against app/(tabs)/settings.tsx AboutContent, which links
  // x.com/kokiodotapp and instagram.com/kokiodotapp side by side.
  socials: [
    { label: "Follow us: @kokiodotapp on X", href: "https://x.com/kokiodotapp" },
    { label: "Follow us: @kokiodotapp on Instagram", href: "https://instagram.com/kokiodotapp" },
  ],
};

export const SETTINGS_CONTACT = {
  email: "contact@kokio.app",
  telegram: TELEGRAM_URL,
};

// Shown on the main Settings list, and again inside About — same string both places
// in the app (constants/general.constants.ts TESTNET_DISCLOSURE_MESSAGE).
export const SETTINGS_TESTNET_NOTICE = {
  text: "Kokio is currently running on a test network with real eSIMs and data bundles. Your wallet and passkey will be reset when we launch on mainnet. The eSIMs installed will keep on working till the data is exhausted.",
};

export const DELETE_ACCOUNT = {
  title: "Delete account",
  intro:
    "This permanently deletes your account. It cannot be undone, not by you, and not by us. There is no recovery.",
  bullets: [
    "Your eSIMs keep working. Any plan you have already paid for stays active until it expires. Deleting your account does not cancel or refund it.",
    "You lose access to your order history, eSIM details, and wallet in this app.",
    "On-chain records are permanent and cannot be deleted by anyone.",
    "You will need to remove your passkey yourself. We'll show you how in the next step.",
  ],
  confirmLabel: "Type DELETE to confirm.",
};

// What actually shows right after you confirm deletion — not a return to the list.
// Source: components/PasskeyRemovalModal.tsx (fired by the BFF after DELETE /v1/account;
// the Auth Server is intentionally not told, so the passkey itself still "works" and has
// to be removed by hand). iOS copy shown here; Android's own copy only swaps which app to
// open, the shape is identical.
export const SETTINGS_DELETED = {
  title: "Your account is deleted",
  body: [
    "Your account and its credentials have been removed from our servers. To completely delete everything from your device, uninstall the Kokio app and delete the associated passkey.",
    "Until you remove it, your device will still hold a passkey for Kokio. It no longer grants access to anything, the account behind it is gone but it will keep appearing in your password manager.",
  ],
  steps: [
    "Open the Settings (or Passwords) app.",
    "Tap Passwords/Passkeys, then authenticate.",
    "Find the entry for kokio.app and delete it.",
  ],
  note: "Any eSIM you already paid for keeps working until it expires. To use Kokio again, create a new account, which generates a new passkey and a new wallet. The deleted account cannot be restored.",
  openSettingsLabel: "Open Settings",
  doneLabel: "Done",
};

export const CLOSING_TIPS = {
  heading: "Activation & troubleshooting tips",
  lead: "A few things worth knowing before and after you install that the steps above don't cover.",
  items: [
    "Most eSIMs install once. Remove one from your device and it cannot be installed again, so only remove one you are finished with.",
    "Install on a stable connection (home Wi-Fi or a private hotspot) before you travel, not on the move.",
    "Label the eSIM as you install it, something like **Japan** or **Kokio**, so your device's SIM list stays easy to read.",
    "On iPhone, activation runs through **Settings → Mobile Service**: pick the new eSIM, keep your primary line set for calls and iMessage, set the new eSIM for cellular data, then turn on data roaming.",
    "Connectivity trouble? Toggle **Airplane Mode** off and on first. That clears most issues.",
    "Still stuck? Turn off automatic network selection, pick the strongest network manually, and check the eSIM's coverage from its details in the Kokio app, since it can sometimes latch onto a weaker one.",
  ],
};
