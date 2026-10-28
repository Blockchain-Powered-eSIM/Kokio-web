import Twitter from "@/assets/icons/twitter-fill.svg";
import GitHub from "@/assets/icons/github-fill.svg";
import Instagram from "@/assets/icons/instagram-fill.svg";
import Docs from "@/assets/icons/docs-fill.svg";
import { CANONICAL_DESCRIPTION, PRODUCT_NAME } from "@/lib/site-copy";
import { INSTAGRAM_URL } from "@/content/gallery";

export const BLOG_TAGS = [
  "eSIM Basics",
  "Privacy & Security",
  "Inside Kokio",
  "Building in Public",
  "Destination Guides",
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export const TWITTER_URL = "https://x.com/kokiodotapp";

export const TWITTER_HANDLE = "@kokiodotapp";

export const APP_URL = "https://kokio.app/live";

export const siteConfig = {
  name: PRODUCT_NAME,
  url: "https://kokio.app",
  header:
    "Travel eSIMs for over 200 destinations, without the personal details",
  description: CANONICAL_DESCRIPTION,
  socials: [
    {
      icon: Twitter,
      title: "Twitter",
      href: "https://x.com/kokiodotapp",
    },
    {
      icon: Instagram,
      title: "Instagram",
      href: INSTAGRAM_URL,
    },
    {
      icon: GitHub,
      title: "GitHub",
      href: "https://github.com/Blockchain-Powered-eSIM",
    },
    {
      icon: Docs,
      title: "Docs",
      href: "https://docs.kokio.app/",
    },
  ],
  navLinks: [
    { title: "Usage guide", href: "/live" },
    { title: "Manifesto", href: "/manifesto" },
    { title: "Blogs", href: "/blogs" },
  ],
};
