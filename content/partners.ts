/**
 * Partners showcase data. The section and the agent text both render from this list.
 * Every entry needs an href and a `permission` recording the basis for naming them.
 */

export const PARTNER_KINDS = [
  "Funded by",
  "Audited by",
  "Built with",
  "Community and collaborations",
] as const;

export type PartnerKind = (typeof PARTNER_KINDS)[number];

export type Partner = {
  name: string;
  kind: PartnerKind;
  blurb: string;
  href: string;
  logo?: string;
  permission: string;
  /** Link text shown over `href`. No link renders on the card without one. */
  linkLabel?: string;
};

export const partners: Partner[] = [
  {
    name: "Open Source eSIM Wallet Suite",
    kind: "Built with",
    blurb:
      "Kokio's wallet and eSIM logic run on this open source smart contract suite, live on Base. Paying with it costs no fees and is the fastest way to check out, so many travellers fund it once for a trip and top up only when they need to, staying fully in control of their own money the whole time. The code is public too, so instead of taking our word for how it works, you, or anyone else, can check it yourself.",
    href: "https://github.com/Blockchain-Powered-eSIM/Smart-Contract-Suite",
    permission:
      "Our own repository, already credited in the app's own About screen (SETTINGS_ABOUT.basedOn, components/live/content.ts), no third-party permission needed.",
    linkLabel: "View the source on GitHub",
  },
  {
    name: "Stripe",
    kind: "Built with",
    blurb:
      "Card checkout, including Apple Pay, Google Pay, PayPal and Link, runs through Stripe's payment sheet: familiar, fast and secure, the same way you'd pay anywhere else online.",
    href: "https://docs.stripe.com/",
    permission:
      "Factual infrastructure credit; public developer docs link, no endorsement implied (WebsiteUpdate.md W7, confirmed 2026-10-19)",
  },
  {
    name: "MoonPay",
    kind: "Built with",
    blurb:
      "Some travellers already hold crypto they'd rather pay with directly, so the Any other wallet option routes through MoonPay: it covers Bitcoin, Ethereum, Solana, Base, Arbitrum, Optimism, Polygon and Binance network, and supports more tokens than Kokio's own wallet. Paying this way is optional, never required.",
    href: "https://dev.moonpay.com/",
    permission:
      "Factual infrastructure credit; public developer docs link, no endorsement implied (WebsiteUpdate.md W7, confirmed 2026-10-19)",
  },
];

/** Non-empty groups in the fixed display order. */
export function getPartnerGroups(
  list: readonly Partner[] = partners
): { kind: PartnerKind; items: Partner[] }[] {
  return PARTNER_KINDS.map((kind) => ({
    kind,
    items: list.filter((partner) => partner.kind === kind),
  })).filter((group) => group.items.length > 0);
}
