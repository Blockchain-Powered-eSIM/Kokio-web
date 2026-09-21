import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Any page is also readable as markdown by adding .md to its URL. The handler
  // lives at /raw/* because a catch-all inside each page folder collides with
  // the page's own routes.
  async rewrites() {
    return [{ source: "/:path*.md", destination: "/raw/:path*" }];
  },

  // /blog moved to /blogs. Keep old links, RSS subscribers, and indexed
  // search/AI-crawler results resolving instead of 404ing.
  async redirects() {
    return [
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:slug*", destination: "/blogs/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
