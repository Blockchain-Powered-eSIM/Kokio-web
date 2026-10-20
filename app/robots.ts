import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "OAI-AdsBot",

  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",

  "PerplexityBot",
  "Perplexity-User",

  "Google-Extended",
  "Applebot-Extended",

  "meta-externalagent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "MistralAI-User",

  "AI2Bot",

  "CCBot",
];

const DISALLOWED = ["/moonpay-return"];

export default function robots(): MetadataRoute.Robots {
  // A crawler matching a named group ignores the wildcard group, so the disallow is repeated per agent.
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
