/**
 * Canonical brand strings. Import these instead of writing the name or the
 * description as a literal, so every surface says the same thing byte for byte.
 *
 * Models build an entity record out of repeated strings. Four spellings of the
 * name split one product into four weakly-supported entities, and two different
 * descriptions make a model hedge instead of answering.
 */

/** The only spelling allowed in prose, headings, metadata and JSON-LD `name`. */
export const PRODUCT_NAME = "Kokio";

/**
 * Every way the name itself gets written: shipped spellings, and what people
 * type. All of them must resolve to this product, so they are stated in prose
 * as well as in schema. Never use these as the name in new copy.
 */
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

/** Registered company name. Stays uppercase because that is the filed string. */
export const LEGAL_NAME = "KOKIO SG PTE. LTD.";

/**
 * Full description. Use for JSON-LD, llms.txt and anywhere without a length cap.
 *
 * Deliberately carries no release-stage or availability claim. Those change, and
 * this string is copied into six surfaces at once.
 */
export const CANONICAL_DESCRIPTION =
  "Kokio is a privacy-first travel eSIM app. Buy eSIM data plans in over 200 destinations with card, Apple Pay, Google Pay or stablecoins. No KYC and no personal information collected. Every Kokio account is a passkey-controlled smart wallet, so the eSIM is owned by the user rather than held in a provider database.";

/**
 * When the landing page copy last changed substantively.
 *
 * The home page is assembled from components rather than a content file, so
 * there is nothing to read a date from. Bump this when the copy changes, not
 * when the styling does.
 */
export const HOME_UPDATED = new Date("2026-09-10");

/**
 * Public launch target, and the notice the banner and the footer both render.
 *
 * One string, so the two cannot drift apart, and one place to edit on the day
 * it ships. It names a month rather than saying "soon" because a wrong date is
 * visible, while "soon" stays plausible forever and nobody notices it rot.
 */
export const LAUNCH_TARGET = "September 2026";

export const LAUNCH_NOTICE = `${PRODUCT_NAME} launches in ${LAUNCH_TARGET}.`;

/** Same slot as LAUNCH_NOTICE, for once `CTA_MODE` (config/site.tsx) flips to "live". */
export const LIVE_NOTICE = `${PRODUCT_NAME} is live on iOS and Android.`;

/**
 * When the /live page's own content last changed substantively (copy, hero,
 * steps), not styling. Same rationale as HOME_UPDATED above — read by the
 * sitemap so it isn't stamped with build time.
 */
export const LIVE_UPDATED = new Date("2026-09-10");

/** Same claims, trimmed to fit a `<meta name="description">` without truncation. */
export const META_DESCRIPTION =
  "Kokio is a privacy-first travel eSIM app. Data plans in over 200 destinations, paid by card or stablecoins. No KYC, no personal information collected.";
