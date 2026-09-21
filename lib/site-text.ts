import { featuresData } from "@/components/features";
import { HERO, STEPS } from "@/components/live/content";
import { roadMapData } from "@/components/road-map";
import { setupData } from "@/components/setup";
import { faqsData } from "@/content/faqs";
import { glossaryData } from "@/content/glossary";
import { privacyPolicy } from "@/content/legal/privacy-policy";
import { termsOfService } from "@/content/legal/terms-of-service";
import { getAllPosts, type Post } from "@/lib/blog";
import { legalDocumentToText } from "@/lib/legal/to-text";
import { getManifesto } from "@/lib/manifesto";
import {
  CANONICAL_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_NAME_SPELLINGS,
} from "@/lib/site-copy";

/**
 * Every page of the site as markdown, keyed by the path it renders.
 *
 * Read by /llms-full.txt, which concatenates all of it, and by the .md routes,
 * which serve one entry at a time. Both come from the same text so the two
 * cannot disagree about what a page says.
 */

/**
 * MDX authored for the blog carries components the plain-text version has no
 * use for. Wrapper tags go and their children stay; self-closing ones are
 * images and call-to-action buttons, which carry no text worth keeping.
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

function homeSection(): string {
  return [
    `## What ${PRODUCT_NAME} is`,
    CANONICAL_DESCRIPTION,
    `${PRODUCT_NAME} is also written ${PRODUCT_NAME_SPELLINGS.join(", ")}. Every one of those spellings refers to this product, this website and this app.`,
    "## How setup works",
    setupData
      .map((step, index) => `${index + 1}. **${step.title}** ${step.description}`)
      .join("\n"),
    "## Features",
    featuresData
      .map((feature) => `- **${feature.title}** ${feature.description}`)
      .join("\n"),
    "## Milestones",
    "Targets, not promises.",
    roadMapData
      .map(
        (phase) =>
          `### ${phase.title}: ${phase.focus}\n${phase.milestones.map((item) => `- ${item}`).join("\n")}`
      )
      .join("\n\n"),
    "## Frequently asked questions",
    faqsData.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n"),
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
        step.callout ? `> ${step.callout.strong ? `**${step.callout.strong}** ` : ""}${step.callout.text}` : "",
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

export function pageSections(): Record<string, () => string> {
  const posts = getAllPosts();

  return {
    "/": homeSection,
    "/live": liveSection,
    "/blogs": () => blogIndexSection(posts),
    "/manifesto": manifestoSection,
    "/glossary": glossarySection,
    "/terms-of-service": () => legalDocumentToText(termsOfService),
    "/privacy-policy": () => legalDocumentToText(privacyPolicy),
    ...Object.fromEntries(
      posts.map((post) => [`/blogs/${post.slug}`, () => postSection(post)])
    ),
  };
}
