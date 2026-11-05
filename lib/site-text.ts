import { featuresData, type Feature } from "@/components/features";
import { HERO, STEPS } from "@/components/live/content";
import { roadMapData } from "@/components/road-map";
import { setupData } from "@/components/setup";
import { faqsData } from "@/content/faqs";
import { glossaryData } from "@/content/glossary";
import { privacyPolicy } from "@/content/legal/privacy-policy";
import { termsOfService } from "@/content/legal/terms-of-service";
import { getAllPosts, type Post } from "@/lib/blog";
import { legalDocumentToText } from "@/lib/legal/to-text";
import { PRICING } from "@/components/home/pricing";
import { getManifestoShowcase } from "@/components/home/manifesto-showcase";
import { getPartnerGroups, partners } from "@/content/partners";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, gallery } from "@/content/gallery";
import { GALLERY_COPY } from "@/components/home/gallery";
import { PARTNERS_COPY } from "@/components/home/partners";
import { getRecentPosts } from "@/components/home/recent-posts";
import { getManifesto } from "@/lib/manifesto";
import {
  CANONICAL_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_NAME_SPELLINGS,
} from "@/lib/site-copy";
import {
  compareRoute,
  formatData,
  formatDays,
  formatUsd,
} from "@/lib/esim/catalogue";
import {
  allRoaming,
  countryAnswer,
  countryNetworkLine,
  esimIndex,
  memberNames,
  NO_ID_LINE,
  NO_KYC_LINK_LABEL,
  NO_KYC_PATH,
  PAYMENTS_LINE,
  LATEST_PLANS_NOTE,
  PRICE_TABLE_NOTE,
  regionAlternative,
  regionAnswer,
  ROAMING_LINE,
  routeLine,
  setupSteps,
  whyKokioTitle,
} from "@/lib/esim/copy";
import {
  builtCountryPages,
  builtRegionPages,
  isIndexed,
  type CountryPage,
  type RegionPage,
} from "@/lib/esim/pages";
import type { Faq, RegulatoryNote, SnapshotPlan } from "@/lib/esim/types";
import { getAllHubs, type Hub } from "@/lib/hubs";

/**
 * Every page of the site as markdown, keyed by the path it renders.
 *
 * Read by /llms-full.txt, which concatenates all of it, and by the .md routes,
 * which serve one entry at a time.
 */

/**
 * Strips MDX components from blog text. Wrapper tags are removed and their
 * children kept; self-closing ones (images, call-to-action buttons) are removed.
 */
export function mdxToText(content: string): string {
  return content
    .replace(/<(?:[A-Z]\w*|img)\b[^>]*?\/>/g, "")
    .replace(/^[ \t]*<\/?[A-Za-z]\w*[^>\n]*>[ \t]*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Agent text carries no fragment links, so the on-page #pricing anchor is described in words.
function featureAgentLink(feature: Feature): string {
  if (!feature.link) return "";
  if (feature.link.href.startsWith("#")) {
    return ` ${feature.link.label}, in the pricing section of the home page (https://kokio.app/).`;
  }
  return ` [${feature.link.label}](${feature.link.href}).`;
}

function manifestoShowcaseText(): string[] {
  const band = getManifestoShowcase();
  return [
    `## ${band.title}`,
    band.credo,
    band.pillars
      .map(
        (pillar) => `- **${pillar.heading.replace(/\.$/, "")}.** ${pillar.line}`
      )
      .join("\n"),
    band.signature,
    `[Read the manifesto](https://kokio.app${band.href})`,
  ];
}

function pricingText(): string[] {
  return [
    `## ${PRICING.title}`,
    PRICING.lead,
    PRICING.shapesIntro,
    PRICING.shapes
      .map((shape) => `- **${shape.name}.** ${shape.line}`)
      .join("\n"),
    `[${PRICING.guideLabel}](${PRICING.guideHref}). ${PRICING.guideNote}`,
  ];
}

function recentPostsText(): string[] {
  const posts = getRecentPosts();
  if (posts.length === 0) return [];
  return [
    "## From the blog",
    posts
      .map(
        (post) =>
          `- [${post.title}](https://kokio.app/blogs/${post.slug}) (${isoDay(post.date)}): ${post.description}`
      )
      .join("\n"),
  ];
}

function partnersText(): string[] {
  const groups = getPartnerGroups(partners);
  if (groups.length === 0) return [];
  return [
    `## ${PARTNERS_COPY.title}`,
    PARTNERS_COPY.lead,
    groups
      .map(
        (group) =>
          `### ${group.kind}\n\n${group.items
            .map((partner) => {
              const points = partner.points?.length
                ? "\n" +
                  partner.points
                    .map((p) => `  - **${p.label}:** ${p.detail}`)
                    .join("\n")
                : "";
              return `- [${partner.name}](${partner.href}): ${partner.blurb}${points}`;
            })
            .join("\n")}`
      )
      .join("\n\n"),
  ];
}

function instagramText(): string[] {
  if (gallery.length === 0) return [];
  return [
    `## ${GALLERY_COPY.title}`,
    GALLERY_COPY.description,
    `Follow @${INSTAGRAM_HANDLE} on Instagram: [${INSTAGRAM_URL}](${INSTAGRAM_URL}).`,
  ];
}

function homeSection(): string {
  return [
    `## What ${PRODUCT_NAME} is`,
    CANONICAL_DESCRIPTION,
    `${PRODUCT_NAME} is also written ${PRODUCT_NAME_SPELLINGS.join(", ")}. Every one of those spellings refers to this product, this website and this app.`,
    "## Friendly eSIM store for your safe trips",
    `${PRODUCT_NAME} is a travel eSIM app. Buy data in over 200 destinations with a card, Apple Pay, Google Pay or crypto. Install it at home before you fly, then activate on arrival. You sign in with a biometric that lives securely on your device, and we never ask for your name, email or ID, or collect any personal information.`,
    "New to eSIMs or never heard of it? Your phone might have one, [check it here](https://kokio.app/blogs/esim-guide-for-travellers-2026) and learn more about it!",
    "## How setup works",
    setupData
      .map(
        (step, index) => `${index + 1}. **${step.title}** ${step.description}`
      )
      .join("\n"),
    "## Features",
    featuresData
      .map(
        (feature) =>
          `- **${feature.title}.** ${feature.description}${featureAgentLink(feature)}`
      )
      .join("\n"),
    ...pricingText(),
    ...manifestoShowcaseText(),
    ...recentPostsText(),
    ...partnersText(),
    ...instagramText(),
    "## Frequently asked questions",
    faqsData.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n"),
    "## Milestones",
    "Targets, not promises.",
    roadMapData
      .map(
        (phase) =>
          `### ${phase.title}: ${phase.focus}\n${phase.milestones.map((item) => `- ${item}`).join("\n")}`
      )
      .join("\n\n"),
  ].join("\n\n");
}

function blogIndexSection(posts: Post[]): string {
  return [
    `Every post published on ${PRODUCT_NAME}, newest first.`,
    posts
      .map(
        (post) =>
          `- **${post.title}** (/blogs/${post.slug}, ${isoDay(post.date)}): ${post.description}`
      )
      .join("\n"),
  ].join("\n\n");
}

function postSection(post: Post): string {
  return [
    `## ${post.title}`,
    `By ${post.author.name}. Published ${isoDay(post.date)}, last updated ${isoDay(post.updated)}.`,
    post.description,
    `**In short:**\n${post.tldr.map((point) => `- ${point}`).join("\n")}`,
    mdxToText(post.content),
  ].join("\n\n");
}

function liveSection(): string {
  return [
    `## ${HERO.title}`,
    HERO.body,
    STEPS.map((step) =>
      [
        `### ${step.index}: ${step.title}`,
        step.summary,
        step.items.map((item) => `- ${item}`).join("\n"),
        step.callout
          ? `> ${step.callout.strong ? `**${step.callout.strong}** ` : ""}${step.callout.text}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n")
    ).join("\n\n"),
  ].join("\n\n");
}

function glossarySection(): string {
  return [
    `Definitions of the eSIM, mobile network and wallet terms used across ${PRODUCT_NAME}.`,
    glossaryData
      .map((entry) => {
        const also = entry.aliases
          ? `\n\nAlso called: ${entry.aliases.join(", ")}.`
          : "";
        return `### ${entry.term}${also}\n\n${entry.definition}`;
      })
      .join("\n\n"),
  ].join("\n\n");
}

function manifestoSection(): string {
  const manifesto = getManifesto();

  return [
    `## ${manifesto.title}`,
    `Last updated ${isoDay(manifesto.updated)}.`,
    manifesto.description,
    `**In short:**\n${manifesto.tldr.map((point) => `- ${point}`).join("\n")}`,
    mdxToText(manifesto.content),
  ].join("\n\n");
}

function planLines(plans: SnapshotPlan[]): string {
  return plans
    .map(
      (plan) =>
        `- ${formatData(plan)}${plan.callsAndSms ? " + calls and SMS" : ""}, ${formatDays(plan.validityDays)}: ${formatUsd(plan.priceUsd)}${plan.has5g ? " (5G)" : ""}`
    )
    .join("\n");
}

function ruleLine(rule: RegulatoryNote): string {
  return `${rule.text} Sources: ${rule.sources.map((source) => `[${source.label}](${source.url})`).join(", ")}.`;
}

function faqText(faqs: Faq[]): string[] {
  if (faqs.length === 0) return [];
  return [
    "## FAQ",
    faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n"),
  ];
}

function esimIndexSection(): string {
  const { countries, regions, description } = esimIndex();
  return [
    description,
    ...(regions.length
      ? [
          "## Regional plans",
          regions
            .map(
              (region) =>
                `- [${region.name} eSIM](https://kokio.app${region.path}) from ${formatUsd(region.fromUsd)}`
            )
            .join("\n"),
        ]
      : []),
    "## All destinations",
    countries
      .map((country) => {
        const name = country.path
          ? `[${country.name}](https://kokio.app${country.path})`
          : country.name;
        return `- ${name} from ${formatUsd(country.fromUsd)}`;
      })
      .join("\n"),
    LATEST_PLANS_NOTE,
  ].join("\n\n");
}

function countrySection(page: CountryPage): string {
  const { content, catalogue } = page;
  const network = countryNetworkLine(page);
  const alternative = regionAlternative(page);
  return [
    `## eSIM for ${content.name}`,
    countryAnswer(page),
    ...(content.intro ? [content.intro] : []),
    `## ${content.name} plans`,
    `(${PRICE_TABLE_NOTE})`,
    planLines(catalogue.plans),
    ...(network || content.coverageNote
      ? [
          "## Network and coverage",
          ...[network, content.coverageNote].filter(Boolean),
        ]
      : []),
    `## ${whyKokioTitle(page)}`,
    ...content.rules.map(ruleLine),
    NO_ID_LINE,
    ...(allRoaming(page) ? [ROAMING_LINE] : []),
    PAYMENTS_LINE,
    `[${NO_KYC_LINK_LABEL}](https://kokio.app${NO_KYC_PATH})`,
    ...(content.tips.length
      ? [
          `## Tips for ${content.name}`,
          content.tips.map((tip) => `- ${tip}`).join("\n"),
        ]
      : []),
    "## Setup",
    setupSteps(content.airports)
      .map((step, index) => `${index + 1}. ${step}`)
      .join("\n"),
    ...(alternative
      ? [
          "## Going further?",
          ...(alternative.comparison
            ? [routeLine(alternative.comparison)]
            : []),
          `[${alternative.region.content.name} eSIM](https://kokio.app${alternative.region.path})`,
        ]
      : []),
    ...faqText(content.faqs),
    LATEST_PLANS_NOTE,
  ].join("\n\n");
}

function hubSection(hub: Hub): string {
  return [
    `## ${hub.title}`,
    hub.description,
    mdxToText(hub.content),
    ...faqText(hub.faqs),
    LATEST_PLANS_NOTE,
  ].join("\n\n");
}

function regionSection(page: RegionPage): string {
  const comparisons = page.content.routes
    .map((route) => compareRoute(route, page.offering))
    .filter((comparison) => comparison !== null);
  return [
    `## ${page.content.name} eSIM`,
    regionAnswer(page),
    ...(page.content.intro ? [page.content.intro] : []),
    "## Countries covered",
    memberNames(page).join(", "),
    "## Regional plans",
    `(${PRICE_TABLE_NOTE})`,
    planLines(page.offering.plans),
    ...(comparisons.length
      ? [
          "## Regional or separate local plans?",
          comparisons
            .map((comparison) => `- ${routeLine(comparison)}`)
            .join("\n"),
        ]
      : []),
    ...faqText(page.content.faqs),
    LATEST_PLANS_NOTE,
  ].join("\n\n");
}

export function pageSections(): Record<string, () => string> {
  const posts = getAllPosts();
  const esimPages = [
    ...builtCountryPages()
      .filter(isIndexed)
      .map((page) => [page.path, () => countrySection(page)] as const),
    ...builtRegionPages()
      .filter(isIndexed)
      .map((page) => [page.path, () => regionSection(page)] as const),
  ];

  return {
    "/": homeSection,
    "/live": liveSection,
    "/blogs": () => blogIndexSection(posts),
    "/manifesto": manifestoSection,
    "/glossary": glossarySection,
    "/esim": esimIndexSection,
    ...Object.fromEntries(
      getAllHubs().map((hub) => [hub.path, () => hubSection(hub)])
    ),
    ...Object.fromEntries(esimPages),
    "/terms-of-service": () => legalDocumentToText(termsOfService),
    "/privacy-policy": () => legalDocumentToText(privacyPolicy),
    ...Object.fromEntries(
      posts.map((post) => [`/blogs/${post.slug}`, () => postSection(post)])
    ),
  };
}
