import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";

import { getHub } from "@/lib/hubs";
import { pageMetadata, shareMetadata } from "@/lib/esim/pages";
import { topicPageGraph, type Crumb } from "@/lib/esim/schema";
import { JsonLd } from "@/components/json-ld";
import { StoreBadges } from "@/components/store-badges";
import { baseMdxComponents } from "@/components/blog/mdx-components";
import { Highlight, HeadsUp, Tip } from "@/components/blog/callouts";
import { FaqList } from "@/components/esim/faq-list";
import { PageSection, PageShell } from "@/components/esim/page-shell";

/** Metadata for a hub page. Hubs are always indexed. */
export function hubMetadata(slug: string): Metadata {
  const hub = getHub(slug);
  return {
    ...shareMetadata({
      path: hub.path,
      title: hub.seoTitle,
      description: hub.description,
      type: "article",
    }),
    ...pageMetadata(hub.path, true),
  };
}

/** A hand-written topic page: MDX body, FAQ, then the store badges. */
export async function HubPage({ slug }: { slug: string }) {
  const hub = getHub(slug);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: hub.title, path: hub.path },
  ];

  const { content } = await compileMDX({
    source: hub.content,
    components: { ...baseMdxComponents, Highlight, HeadsUp, Tip },
    options: {
      mdxOptions: {
        remarkPlugins: [[remarkSmartypants, { dashes: "oldschool" }]],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <PageShell crumbs={crumbs}>
      <JsonLd data={topicPageGraph(hub.path, crumbs, hub.faqs)} />

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          {hub.title}
        </h1>
        <p className="text-lg text-esim-black-700">{hub.description}</p>
      </header>

      <div className="prose max-w-none prose-headings:font-heading">
        {content}
      </div>

      {hub.faqs.length ? (
        <PageSection id="faq" title="FAQ">
          <FaqList faqs={hub.faqs} />
        </PageSection>
      ) : null}

      <footer className="flex flex-col items-center gap-4 border-t border-esim-black-100 pt-8">
        <StoreBadges />
      </footer>
    </PageShell>
  );
}
