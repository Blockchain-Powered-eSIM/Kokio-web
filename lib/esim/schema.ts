/** schema.org graphs for the /esim pages. Organization and WebSite come from the root layout and are referenced by `@id`. */

import { siteConfig } from "@/config/site";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/schema";
import { PRODUCT_NAME } from "@/lib/site-copy";
import { priceRange } from "@/lib/esim/catalogue";
import type { Faq, SnapshotPlan } from "@/lib/esim/types";

export interface Crumb {
  name: string;
  path: string;
}

function absolute(path: string): string {
  return new URL(path, siteConfig.url).href;
}

function breadcrumbs(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumbs`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

// The question ids match the elements FaqList renders, so a citation can point at one answer.
function faqPage(path: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absolute(path)}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      "@id": `${absolute(path)}#faq-${faq.id}`,
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function product(path: string, name: string, plans: SnapshotPlan[]) {
  const { low, high } = priceRange(plans);
  return {
    "@type": "Product",
    "@id": `${absolute(path)}#product`,
    name,
    url: absolute(path),
    brand: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: low.toFixed(2),
      highPrice: high.toFixed(2),
      offerCount: plans.length,
    },
  };
}

/** Graph for a page that sells plans: where it sits, what it sells, and its FAQ when it has one. */
export function plansPageGraph({
  path,
  productName,
  crumbs,
  plans,
  faqs,
}: {
  path: string;
  productName: string;
  crumbs: Crumb[];
  plans: SnapshotPlan[];
  faqs: Faq[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs(path, crumbs),
      product(path, `${PRODUCT_NAME} ${productName}`, plans),
      ...(faqs.length ? [faqPage(path, faqs)] : []),
    ],
  };
}

/** Graph for the /esim index: breadcrumbs only, since it lists countries rather than selling one product. */
export function indexPageGraph(path: string, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbs(path, crumbs)],
  };
}
