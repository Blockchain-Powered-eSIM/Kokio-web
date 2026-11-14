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

      // Community QR codes (docs/community-qr-tracking.md). Temporary so the
      // destination can change without reprinting the code.
      {
        source: "/r/ethchiangmai",
        destination:
          "/?utm_source=ethchiangmai&utm_medium=qr&utm_campaign=ethchiangmai-2026",
        permanent: false,
      },
      {
        source: "/r/ecm-guide",
        destination:
          "/?utm_source=ethchiangmai&utm_medium=qr&utm_campaign=ethchiangmai-2026&utm_content=guide",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
