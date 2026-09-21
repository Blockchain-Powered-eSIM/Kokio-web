import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = (posts[0]?.date ?? new Date()).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blogs/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kokio Blog</title>
    <link>${siteConfig.url}/blogs</link>
    <atom:link href="${siteConfig.url}/blogs/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
