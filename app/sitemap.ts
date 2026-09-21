import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { legalConfig } from "@/config/legal";
import { GLOSSARY_UPDATED } from "@/content/glossary";
import { getAllPosts } from "@/lib/blog";
import { getManifesto } from "@/lib/manifesto";
import { HOME_UPDATED, LIVE_UPDATED } from "@/lib/site-copy";

/**
 * Every lastModified here comes from the content itself, never from build time.
 *
 * A date that moves on every deploy tells a crawler the whole site changed when
 * nothing did, and once it learns the signal is noise it stops re-fetching on it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const manifesto = getManifesto();
  const legalUpdated = new Date(legalConfig.lastUpdatedIso);

  // The blog index changes when its newest post does.
  const blogUpdated = posts.length
    ? new Date(Math.max(...posts.map((post) => post.updated.getTime())))
    : HOME_UPDATED;

  return [
    {
      url: new URL("/", siteConfig.url).href,
      lastModified: HOME_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/live", siteConfig.url).href,
      lastModified: LIVE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // Posts are aimed at roughly every two weeks. The sitemap spec has no
      // value for that, and weekly is the closer of the two neighbours, so a
      // crawler checks a little too often rather than missing a post. Revisit
      // once the real cadence is known: monthly if it slips, daily never.
      url: new URL("/blogs", siteConfig.url).href,
      lastModified: blogUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: new URL("/manifesto", siteConfig.url).href,
      lastModified: manifesto.updated,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: new URL("/glossary", siteConfig.url).href,
      lastModified: GLOSSARY_UPDATED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: new URL(`/blogs/${post.slug}`, siteConfig.url).href,
      lastModified: post.updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: new URL("/terms-of-service", siteConfig.url).href,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: new URL("/privacy-policy", siteConfig.url).href,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
