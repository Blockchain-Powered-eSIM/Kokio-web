import type { Metadata } from "next";

import { glossaryData } from "@/content/glossary";
import { siteConfig } from "@/config/site";
import { glossaryGraph } from "@/lib/schema";
import { PRODUCT_NAME } from "@/lib/site-copy";
import { JsonLd } from "@/components/json-ld";

const DESCRIPTION = `Plain definitions of the terms ${PRODUCT_NAME} uses: eSIM, eUICC, SM-DP+, LPA, passkey, smart wallet, no-KYC and more.`;

export const metadata: Metadata = {
  title: "Glossary",
  description: DESCRIPTION,
  alternates: {
    canonical: "/glossary",
    types: { "text/markdown": "/glossary.md" },
  },
  openGraph: {
    type: "article",
    url: `${siteConfig.url}/glossary`,
    siteName: PRODUCT_NAME,
    title: `${PRODUCT_NAME} glossary`,
    description: DESCRIPTION,
  },
};

export default function GlossaryPage() {
  return (
    <main className="px-4 py-12 md:px-8 md:py-16">
      <JsonLd data={glossaryGraph} />

      <article className="mx-auto flex max-w-5xl flex-col rounded-4xl border border-esim-black-100 bg-background p-6 shadow-sm md:p-12 lg:p-16">
        <header className="flex flex-col gap-3 border-b border-esim-black-100 pb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Glossary
          </h1>
          <p className="text-lg text-esim-black-700">{DESCRIPTION}</p>
        </header>

        {/* Each id is the target of the matching DefinedTerm @id, so a citation
            can link to the one definition it used. */}
        <dl className="mt-10 flex flex-col gap-10">
          {glossaryData.map((entry) => (
            <div
              key={entry.id}
              id={entry.id}
              className="flex scroll-mt-24 flex-col gap-2"
            >
              <dt className="font-heading text-2xl font-bold text-foreground">
                {entry.term}
                {entry.aliases ? (
                  <span className="ml-3 font-sans text-base font-normal text-esim-black-700">
                    also {entry.aliases.join(", ")}
                  </span>
                ) : null}
              </dt>
              <dd className="text-lg font-light leading-8 text-esim-black-900">
                {entry.definition}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </main>
  );
}
