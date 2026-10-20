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
      "Kokio's wallet and eSIM logic run on this open source smart contract suite, not a closed company database. The code is public, so instead of taking our word for how your eSIM wallet works, you, or anyone else, can check it yourself.",
    href: "https://github.com/Blockchain-Powered-eSIM/Smart-Contract-Suite",
    permission:
      "Our own repository, already credited in the app's own About screen (SETTINGS_ABOUT.basedOn, components/live/content.ts), no third-party permission needed.",
    linkLabel: "View the source on GitHub",
  },
  {
    name: "Stripe",
    kind: "Built with",
    blurb:
      "Not every traveller wants to pay with crypto, so card checkout, including Apple Pay, Google Pay, PayPal and Link, runs through Stripe's payment sheet, the same way you'd pay anywhere else.",
    href: "https://docs.stripe.com/",
    permission:
      "Factual infrastructure credit; public developer docs link, no endorsement implied (WebsiteUpdate.md W7, confirmed 2026-10-19)",
  },
  {
    name: "MoonPay",
    kind: "Built with",
    blurb:
      "Some travellers would rather pay in crypto, so payments from an external wallet are handled through MoonPay. Paying this way is optional, never required.",
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
