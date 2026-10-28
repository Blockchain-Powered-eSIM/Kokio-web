/** Canonical brand strings shared by every surface. */

/** The only spelling allowed in prose, headings, metadata and JSON-LD `name`. */
export const PRODUCT_NAME = "Kokio";

/** Alternate spellings of the name, including what people type. */
export const PRODUCT_NAME_SPELLINGS = [
  "Koki'o",
  "KOKI'O",
  "KOKIO",
  "kokio",
] as const;

/** Names for the product that are not spellings of the word. */
export const PRODUCT_NAME_ALIASES = ["Kokio eSIM", "Kokio App"] as const;

/** Everything that is not the canonical name. Goes in schema `alternateName`. */
export const PRODUCT_NAME_VARIANTS = [
  ...PRODUCT_NAME_SPELLINGS,
  ...PRODUCT_NAME_ALIASES,
] as const;

/** Registered company name, as filed. */
export const LEGAL_NAME = "KOKIO SG PTE. LTD.";

/** Full description, for JSON-LD, llms.txt and anywhere without a length cap. */
export const CANONICAL_DESCRIPTION =
  "Kokio is a privacy-first travel eSIM app. Buy eSIM data plans in over 200 destinations with card, Apple Pay, Google Pay or stablecoins. No KYC and no personal information collected. Every Kokio account is a passkey-controlled smart wallet, so the eSIM is owned by the user rather than held in a provider database.";

/** Date the landing page copy last changed. Read by the sitemap. */
export const HOME_UPDATED = new Date("2026-10-28");

/** The notice rendered by both the announcement banner and the footer. */
export const LIVE_NOTICE = `${PRODUCT_NAME} is live on iOS and Android.`;

/** Call-to-action label used by the banner, hero and blog CTAs. */
export const CTA_LABEL = "Try out the App today!";

/** Date the /live page content last changed. Read by the sitemap. */
export const LIVE_UPDATED = new Date("2026-10-20");

/** Same claims, trimmed to fit a `<meta name="description">` without truncation. */
export const META_DESCRIPTION =
  "Kokio is a privacy-first travel eSIM app. Data plans in over 200 destinations, paid by card or stablecoins. No KYC, no personal information collected.";

/** Payment description shared by the Features card, the payment FAQ and the JSON-LD featureList. */
export const PAYMENT_METHODS =
  "Kokio checkout has four ways to pay: Kokio Wallet (USDC, USDT or DAI) on Base network, Credit/Debit Card via Stripe (the same Stripe sheet also covers Apple Pay, Google Pay, PayPal and Link), Apple Pay as its own option on iPhone, and Any other wallet for crypto on Bitcoin, Ethereum, Solana, Base, Arbitrum, Optimism, Polygon and Binance network via Moonpay, which supports more tokens.";
