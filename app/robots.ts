import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * AI crawlers named individually.
 *
 * The wildcard group below already allows every crawler, named or not, so this
 * list grants no access that would otherwise be missing. It exists so the
 * stance is auditable, and so blocking any single agent later is a one-line
 * edit rather than a research task.
 *
 * One rule for adding an entry: the operator publishes a crawler page naming
 * the token. That keeps the list checkable and finite.
 *
 * It is not meant to be exhaustive and cannot be. Most labs publish nothing:
 * xAI documents no user agent and Grok's fetches arrive as ordinary browser
 * traffic from rotating addresses, DeepSeek crawls with no user agent at all,
 * and the tokens circulating for Qwen, GLM and Bytespider come from
 * third-party trackers rather than their operators. Chasing those names would
 * mean maintaining a list that is unverifiable, permanently incomplete, and
 * worth nothing while the answer is yes to everyone. The wildcard covers them.
 */
const AI_CRAWLERS = [
  // OpenAI, developers.openai.com/api/docs/bots
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "OAI-AdsBot",

  // Anthropic, support.claude.com/en/articles/8896518
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",

  // Perplexity, docs.perplexity.ai/docs/resources/perplexity-crawlers
  // Perplexity-User is listed for completeness. Perplexity says it generally
  // ignores robots.txt for that agent because the fetch is user-initiated.
  "PerplexityBot",
  "Perplexity-User",

  // Google and Apple. These two are control tokens for AI training rather than
  // crawlers, and they have no user agent of their own. Allowing them is a
  // no-op because permitted is already the default; the lines record the
  // opt-in decision where someone auditing the file will look for it.
  "Google-Extended",
  "Applebot-Extended",

  // Meta, Amazon, Mistral.
  "meta-externalagent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "MistralAI-User",

  // Allen Institute, allenai.org/crawler. Feeds the Dolma corpus and the OLMo
  // open models.
  "AI2Bot",

  // Common Crawl. The most consequential entry in this file for open-weight
  // models: most open training sets, C4, RefinedWeb, FineWeb and Dolma among
  // them, are built from Common Crawl rather than from their own crawls.
  // Allowing it is close to irreversible, because a page that lands in the
  // archive is copied into derived datasets that have no recall mechanism.
  "CCBot",
];

/** Payment callback. Meaningless without the transaction that led to it. */
const DISALLOWED = ["/moonpay-return"];

export default function robots(): MetadataRoute.Robots {
  // The wildcard group is what actually grants access, including to every
  // crawler not named above. The named groups only make the stance explicit.
  //
  // Groups in robots.txt are independent: a crawler that matches a named group
  // reads only that group and never sees the wildcard rules. So the disallow
  // has to be repeated per agent rather than stated once.
  const rules = [{ userAgent: "*", allow: "/", disallow: DISALLOWED }].concat(
    AI_CRAWLERS.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: DISALLOWED,
    }))
  );

  return {
    rules,
    sitemap: new URL("/sitemap.xml", siteConfig.url).href,
    host: siteConfig.url,
  };
}
