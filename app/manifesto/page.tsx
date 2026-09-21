import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";

import { getManifesto } from "@/lib/manifesto";
import { rehypeManifestoSections } from "@/lib/manifesto-mdx";
import { rehypeCollectH2Toc, type TocHeading } from "@/lib/mdx-toc";
import { siteConfig } from "@/config/site";
import { getManifestoMdxComponents } from "@/components/manifesto/mdx-components";
import { SectionIndex } from "@/components/manifesto/section-index";

export function generateMetadata(): Metadata {
  const manifesto = getManifesto();

  return {
    title: manifesto.title,
    description: manifesto.description,
    alternates: {
      canonical: "/manifesto",
      types: { "text/markdown": "/manifesto.md" },
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/manifesto`,
      siteName: siteConfig.name,
      title: manifesto.title,
      description: manifesto.description,
    },
  };
}

export default async function ManifestoPage() {
  const manifesto = getManifesto();

  const { content, frontmatter } = await compileMDX<{
    headings?: TocHeading[];
  }>({
    source: manifesto.content,
    components: getManifestoMdxComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [[remarkSmartypants, { dashes: "oldschool" }]],
        rehypePlugins: [rehypeSlug, rehypeCollectH2Toc, rehypeManifestoSections],
      },
    },
  });
  const headings = frontmatter.headings ?? [];

  return (
    <div className="xl:flex xl:items-start xl:justify-center xl:gap-8">
      {headings.length > 0 ? (
        <div className="hidden xl:sticky xl:top-24 xl:block xl:w-36 xl:shrink-0 xl:self-start print:hidden">
          <SectionIndex headings={headings} />
        </div>
      ) : null}

      <article className="mx-auto flex max-w-[52rem] flex-col xl:mx-0 xl:shrink-0">
        <h1 className="text-center font-heading text-3xl font-bold text-manifesto-ink md:text-4xl">
          {manifesto.title}
        </h1>
        <div
          className="prose mt-8 max-w-none text-[18px] leading-[1.75] text-manifesto-ink prose-headings:font-heading prose-headings:text-manifesto-ink prose-a:text-manifesto-teal prose-blockquote:border-l-manifesto-sand-border prose-blockquote:bg-manifesto-sand prose-blockquote:not-italic"
        >
          {content}
        </div>
      </article>
    </div>
  );
}
