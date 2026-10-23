import Image from "next/image";
import Link from "next/link";

import { getAllPosts, type Post } from "@/lib/blog";
import { formatPostDate } from "@/lib/utils";
import { HomeSection } from "@/components/home/section";

/** The newest published posts, shared by the page and its agent text so the two cannot disagree. */
export function getRecentPosts(): Post[] {
  return getAllPosts().slice(0, 3);
}

const linkClass =
  "inline-flex min-h-11 items-center rounded-sm font-semibold text-white underline underline-offset-4 hover:text-cashmere-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#301c3d]";

function RecentPostCard({ post }: { post: Post }) {
  return (
    <li className="flex">
      <Link
        href={`/blogs/${post.slug}`}
        className="group flex w-full flex-col overflow-hidden rounded-3xl border border-esim-black-100 bg-background shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#301c3d]"
      >
        <div className="relative h-44 w-full shrink-0 bg-cashmere-50">
          <Image
            src={post.hero}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw"
            className="object-cover object-top motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="w-fit rounded-full bg-cashmere-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cashmere-700">
            {post.tag}
          </span>
          <h3 className="font-heading text-lg font-bold text-outer-space-950 group-hover:text-cashmere-600">
            {post.title}
          </h3>
          <div className="mt-auto flex items-center gap-2 text-xs text-esim-black-500">
            <time dateTime={post.date.toISOString()}>
              {formatPostDate(post.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime.text}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function RecentPosts() {
  const posts = getRecentPosts();
  if (posts.length === 0) return null;

  return (
    <HomeSection>
      <section
        aria-labelledby="recent-posts-heading"
        className="container flex max-w-screen-xl flex-col gap-8 px-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="recent-posts-heading"
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            From the blog
          </h2>
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
            <Link href="/blogs" className={linkClass}>
              All posts
            </Link>
            {/* Plain anchor: the target is a route handler, not a page. */}
            <a href="/blogs/rss.xml" className={linkClass}>
              RSS feed
            </a>
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <RecentPostCard key={post.slug} post={post} />
          ))}
        </ul>
      </section>
    </HomeSection>
  );
}
