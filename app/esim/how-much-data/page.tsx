import type { Metadata } from "next";
import Link from "next/link";

import {
  ACTIVITIES,
  DATA_FAQS,
  DATA_PAGE,
  sampleAnswer,
} from "@/lib/esim/data-usage";
import {
  builtCountryPages,
  pageMetadata,
  shareMetadata,
} from "@/lib/esim/pages";
import { topicPageGraph, type Crumb } from "@/lib/esim/schema";
import { JsonLd } from "@/components/json-ld";
import {
  DataCalculator,
  type CalculatorCountry,
} from "@/components/esim/data-calculator";
import { FaqList } from "@/components/esim/faq-list";
import {
  PageFooter,
  PageSection,
  PageShell,
} from "@/components/esim/page-shell";

const CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "eSIM", path: "/esim" },
  { name: "How much data", path: DATA_PAGE.path },
];

export const metadata: Metadata = {
  ...shareMetadata({
    path: DATA_PAGE.path,
    title: DATA_PAGE.title,
    description: DATA_PAGE.description,
  }),
  ...pageMetadata(DATA_PAGE.path, true),
};

export default function HowMuchDataPage() {
  const countries: CalculatorCountry[] = builtCountryPages()
    .map((page) => ({
      slug: page.content.slug,
      name: page.content.name,
      path: page.path,
      plans: page.catalogue.plans,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PageShell crumbs={CRUMBS}>
      <JsonLd data={topicPageGraph(DATA_PAGE.path, CRUMBS, DATA_FAQS)} />

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          {DATA_PAGE.title}
        </h1>
        <p className="text-lg text-esim-black-700">{sampleAnswer()}</p>
      </header>

      <DataCalculator countries={countries} initialSlug="japan" />

      <PageSection id="method" title="Where the numbers come from">
        <ul className="flex flex-col gap-3">
          {ACTIVITIES.map((activity) => (
            <li key={activity.id}>
              <strong className="font-medium">{activity.label}:</strong> about{" "}
              {activity.gbPerHour} GB an hour. {activity.basis}
              {activity.source ? (
                <>
                  {" "}
                  <a
                    href={activity.source.url}
                    className="text-base underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {activity.source.label}
                  </a>
                </>
              ) : null}
            </li>
          ))}
        </ul>
        <p>
          Real use varies with the app, its quality settings and the network.
          The estimate is rounded up, so it errs on the side of too much.
        </p>
      </PageSection>

      <PageSection id="faq" title="FAQ">
        <FaqList faqs={DATA_FAQS} />
      </PageSection>

      <PageFooter>
        <p className="text-base text-esim-black-700">
          <Link href="/esim" className="underline">
            All destinations
          </Link>
        </p>
      </PageFooter>
    </PageShell>
  );
}
