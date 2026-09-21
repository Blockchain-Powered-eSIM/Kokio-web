import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";

import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { rehypeCollectH2Toc, type TocHeading } from "@/lib/mdx-toc";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { siteConfig, TWITTER_HANDLE } from "@/config/site";
import { AuthorCard } from "@/components/blog/author-card";
import { TLDRBox } from "@/components/blog/tldr-box";
import { PostCard } from "@/components/blog/post-card";
import { EndCardCTA } from "@/components/blog/end-card-cta";
import { WaveDivider } from "@/components/blog/wave-divider";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { BackToTopButton } from "@/components/blog/back-to-top-button";
import { getMdxComponents } from "@/components/blog/mdx-components";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blogs/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
      types: { "text/markdown": `/blogs/${post.slug}.md` },
    },
    openGraph: {
      type: "article",
      url,
      siteName: siteConfig.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date.toISOString(),
      modifiedTime: post.updated.toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  const { content, frontmatter } = await compileMDX<{
    headings?: TocHeading[];
  }>({
    source: post.content,
    components: getMdxComponents(post.slug),
    options: {
      mdxOptions: {
        remarkPlugins: [[remarkSmartypants, { dashes: "oldschool" }]],
        rehypePlugins: [rehypeSlug, rehypeCollectH2Toc],
      },
    },
  });
  const headings = frontmatter.headings ?? [];
  const showToc = headings.length >= 5;

  const url = `${siteConfig.url}/blogs/${post.slug}`;
  const heroUrl = `${siteConfig.url}${post.ogImage ?? post.hero}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    image: [heroUrl],
    datePublished: post.date.toISOString(),
    dateModified: post.updated.toISOString(),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.twitter ? { sameAs: [post.author.twitter] } : {}),
    },
    // Point at the Organization the layout already emits instead of describing
    // it again here, so a post and the site cannot disagree about the publisher.
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <main className="px-4 py-12 md:px-8 md:py-16">
      <ReadingProgressBar targetId="post-article" />
      <BackToTopButton hideBeforeId="post-end-marker" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article
        id="post-article"
        className="container mx-auto flex max-w-[52rem] flex-col"
      >
        <div className="mx-auto flex w-full max-w-[42rem] flex-col">
          <span className="w-fit rounded-full bg-cashmere-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cashmere-700">
            {post.tag}
          </span>

          <h1 className="mt-6 font-heading text-3xl font-bold text-outer-space-950 md:text-4xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg font-light text-esim-black-700">
            {post.description}
          </p>

          <div className="mt-6">
            <AuthorCard
              author={post.author}
              date={post.date}
              readingTime={post.readingTime}
            />
          </div>
        </div>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-cashmere-50">
          <Image
            src={post.hero}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(min-width: 832px) 832px, 100vw"
            priority
          />
        </div>

        <div className="mt-8">
          <TLDRBox items={post.tldr} />
        </div>

        <div className="mt-10 lg:flex lg:items-start lg:justify-center lg:gap-4">
          {showToc ? (
            <div className="hidden lg:sticky lg:top-24 lg:block lg:w-32 lg:shrink-0 lg:self-start">
              <TableOfContents headings={headings} />
            </div>
          ) : null}

          <div className="prose mx-auto prose-headings:font-heading lg:mx-0 lg:w-[42rem] lg:shrink-0">
            {content}
          </div>
        </div>

        <div id="post-end-marker" className="mt-16">
          <WaveDivider />
        </div>

        <div className="mt-8">
          <EndCardCTA slug={post.slug} />
        </div>
      </article>

      {related.length >= 2 ? (
        <section className="container mx-auto mt-16 flex max-w-[52rem] flex-col gap-6">
          <h2 className="font-heading text-2xl font-bold text-outer-space-950">
            Keep reading
          </h2>
          <div className="flex flex-col gap-6">
            {related.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
