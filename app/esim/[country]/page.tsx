import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PRODUCT_NAME } from "@/lib/site-copy";
import { cheapestPlan, formatDay, formatUsd } from "@/lib/esim/catalogue";
import {
  allRoaming,
  countryAnswer,
  countryNetworkLine,
  GUIDE_PATH,
  networkGenerations,
  NO_ID_LINE,
  NO_KYC_LINK_LABEL,
  NO_KYC_PATH,
  PAYMENTS_LINE,
  PRICE_TABLE_NOTE,
  regionAlternative,
  ROAMING_LINE,
  routeLine,
  setupSteps,
  whyKokioTitle,
} from "@/lib/esim/copy";
import {
  builtCountryPages,
  countryPage,
  isIndexed,
  pageMetadata,
  shareMetadata,
  type CountryPage,
} from "@/lib/esim/pages";
import { plansPageGraph, type Crumb } from "@/lib/esim/schema";
import { JsonLd } from "@/components/json-ld";
import { FaqList } from "@/components/esim/faq-list";
import {
  PageFooter,
  PageSection,
  PageShell,
} from "@/components/esim/page-shell";
import { PlanTable } from "@/components/esim/plan-table";
import { RegulatoryNote } from "@/components/esim/regulatory-note";

type Params = Promise<{ country: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return builtCountryPages().map((page) => ({ country: page.content.slug }));
}

function crumbsFor(page: CountryPage): Crumb[] {
  const region = regionAlternative(page)?.region;
  return [
    { name: "Home", path: "/" },
    { name: "eSIM", path: "/esim" },
    ...(region ? [{ name: region.content.name, path: region.path }] : []),
    { name: page.content.name, path: page.path },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const page = countryPage((await params).country);
  if (!page) return {};

  const name = page.content.name;
  const from = formatUsd(cheapestPlan(page.catalogue.plans).priceUsd);
  const title = `eSIM for ${name}: data from ${from} · No ID needed`;
  const description = `${name} eSIM plans from ${from} on local ${networkGenerations(page)} networks. Pay by card, Apple Pay, Google Pay or crypto. No passport, name or email.`;

  return {
    ...shareMetadata({ path: page.path, title, description }),
    ...pageMetadata(page.path, isIndexed(page)),
  };
}

export default async function CountryEsimPage({ params }: { params: Params }) {
  const page = countryPage((await params).country);
  if (!page) notFound();

  const { content, catalogue } = page;
  const crumbs = crumbsFor(page);
  const networkLine = countryNetworkLine(page);
  const alternative = regionAlternative(page);
  const builtBySlug = new Map(
    builtCountryPages().map((built) => [built.content.slug, built])
  );
  const neighbours = content.neighbours
    .map((slug) => builtBySlug.get(slug))
    .filter((built): built is CountryPage => built !== undefined);

  return (
    <PageShell crumbs={crumbs}>
      <JsonLd
        data={plansPageGraph({
          path: page.path,
          productName: `eSIM for ${content.name}`,
          crumbs,
          plans: catalogue.plans,
          faqs: content.faqs,
        })}
      />

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          eSIM for {content.name}
        </h1>
        <p className="text-lg text-esim-black-700">{countryAnswer(page)}</p>
        {content.intro ? (
          <p className="text-lg text-esim-black-700">{content.intro}</p>
        ) : null}
      </header>

      <PageSection id="plans" title={`${content.name} plans`}>
        <p className="text-base text-esim-black-700">({PRICE_TABLE_NOTE})</p>
        <PlanTable
          plans={catalogue.plans}
          caption={`${PRODUCT_NAME} eSIM plans for ${content.name}`}
        />
      </PageSection>

      {networkLine || content.coverageNote ? (
        <PageSection id="coverage" title="Network and coverage">
          {networkLine ? <p>{networkLine}</p> : null}
          {content.coverageNote ? <p>{content.coverageNote}</p> : null}
        </PageSection>
      ) : null}

      <PageSection id="why-kokio" title={whyKokioTitle(page)}>
        {content.rules.map((rule) => (
          <RegulatoryNote key={rule.text} note={rule} />
        ))}
        <p>{NO_ID_LINE}</p>
        {allRoaming(page) ? <p>{ROAMING_LINE}</p> : null}
        <p>{PAYMENTS_LINE}</p>
        <p>
          <Link href={NO_KYC_PATH} className="underline">
            {NO_KYC_LINK_LABEL}
          </Link>
        </p>
      </PageSection>

      {content.tips.length ? (
        <PageSection id="tips" title={`Tips for ${content.name}`}>
          <ul className="list-disc space-y-2 pl-6">
            {content.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </PageSection>
      ) : null}

      <PageSection id="setup" title="Setup">
        <ol className="list-decimal space-y-2 pl-6">
          {setupSteps(content.airports).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p>
          New to eSIMs?{" "}
          <Link href={GUIDE_PATH} className="underline">
            Read the eSIM guide for travellers
          </Link>
          .
        </p>
      </PageSection>

      {alternative ? (
        <PageSection id="going-further" title="Going further?">
          {alternative.comparison ? (
            <p>{routeLine(alternative.comparison)}</p>
          ) : null}
          <p>
            <Link href={alternative.region.path} className="underline">
              See the {alternative.region.content.name} eSIM
            </Link>
          </p>
        </PageSection>
      ) : null}

      {content.faqs.length ? (
        <PageSection id="faq" title="FAQ">
          <FaqList faqs={content.faqs} />
        </PageSection>
      ) : null}

      {neighbours.length ? (
        <PageSection id="nearby" title="Nearby destinations">
          <ul className="flex flex-wrap gap-4">
            {neighbours.map((neighbour) => (
              <li key={neighbour.path}>
                <Link href={neighbour.path} className="underline">
                  eSIM for {neighbour.content.name}
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}

      <PageFooter>
        <p className="text-base text-esim-black-700">
          {content.lastVerified
            ? `Last checked ${formatDay(new Date(content.lastVerified))}. `
            : null}
          <Link href="/esim" className="underline">
            All destinations
          </Link>
        </p>
      </PageFooter>
    </PageShell>
  );
}
