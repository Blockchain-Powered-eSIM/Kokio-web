import type { Metadata } from "next";
import Image from "next/image";

import { getAllPosts } from "@/lib/blog";
import { getManifesto } from "@/lib/manifesto";
import { PostCard } from "@/components/blog/post-card";
import { ManifestoCard } from "@/components/blog/manifesto-card";
import BeachFun from "@/assets/seb/Beach Fun.svg";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Everything about eSIMs, travel connectivity, and what we're building behind the scenes.",
  alternates: {
    canonical: "/blogs",
    types: {
      "application/rss+xml": [{ url: "/blogs/rss.xml", title: "Kokio Blog" }],
      "text/markdown": "/blogs.md",
    },
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const manifesto = getManifesto();

  return (
    <main className="px-4 py-12 md:px-8 md:py-16">
      <div className="container mx-auto flex max-w-4xl flex-col">
        <header className="flex flex-col items-center gap-4 pb-12 text-center">
          <Image
            src={BeachFun}
            alt=""
            aria-hidden="true"
            className="h-20 w-auto md:h-24"
          />
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-cashmere-700">
            Kokio Blogs
          </p>
          <h1 className="font-heading text-4xl font-bold text-outer-space-950 md:text-5xl">
            Guides, updates, and stories from Kokio
          </h1>
          <p className="max-w-xl text-base font-light text-esim-black-700 md:text-lg">
            Everything about eSIMs, travel connectivity, and what we&apos;re
            building behind the scenes.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <ManifestoCard manifesto={manifesto} />
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
