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
  /** Short, scannable benefit points shown under the blurb. Optional — most cards don't need them. */
  points?: { label: string; detail: string }[];
};

export const partners: Partner[] = [
  {
    name: "Open Source eSIM Wallet Suite",
    kind: "Built with",
    blurb:
      "Kokio's wallet and eSIM logic run on this open source smart contract suite, live on Base. It's public code, so instead of taking our word for how it works, you, or anyone else, can check it yourself.",
    points: [
      {
        label: "No fees",
        detail: "Paying with it costs nothing extra at checkout.",
      },
      {
        label: "Fastest checkout",
        detail: "The quickest of Kokio's payment options.",
      },
      {
        label: "Fund once, top up anytime",
        detail: "Load it once for a trip, top up only when you need to.",
      },
      {
        label: "Stay sovereign",
        detail: "Your money stays fully in your own control, start to finish.",
      },
    ],
    href: "https://github.com/Blockchain-Powered-eSIM/Smart-Contract-Suite",
    permission:
      "Our own repository, already credited in the app's own About screen (SETTINGS_ABOUT.basedOn, components/live/content.ts), no third-party permission needed.",
    linkLabel: "View the source on GitHub",
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
