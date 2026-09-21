/**
 * schema.org entities for the site.
 *
 * The Organization and WebSite nodes are emitted once from the root layout and
 * referenced everywhere else by `@id`, so the facts about the company live in
 * exactly one place and a crawler reading any page can resolve them.
 */

import Logo from "@/assets/logo.svg";

import { siteConfig, TWITTER_URL } from "@/config/site";
import { legalConfig } from "@/config/legal";
import { faqsData } from "@/content/faqs";
import { glossaryData } from "@/content/glossary";
import {
  CANONICAL_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_NAME_VARIANTS,
} from "@/lib/site-copy";

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const GITHUB_ORG_URL = "https://github.com/Blockchain-Powered-eSIM";
const DOCS_URL = "https://docs.kokio.app";

/** Address parsed out of the single string kept in legalConfig for the legal pages. */
const REGISTERED_STREET = "165B Telok Ayer Street";
const REGISTERED_POSTAL_CODE = "068617";

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: PRODUCT_NAME,
  // Every spelling that has shipped. This is the only machine-readable place
  // that says they are one entity rather than several.
  alternateName: [...PRODUCT_NAME_VARIANTS],
  legalName: legalConfig.companyLegalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}${Logo.src}`,
  description: CANONICAL_DESCRIPTION,
  email: legalConfig.generalContact,
  foundingLocation: { "@type": "Place", name: "Singapore" },
  address: {
    "@type": "PostalAddress",
    streetAddress: REGISTERED_STREET,
    addressLocality: "Singapore",
    addressCountry: "SG",
    postalCode: REGISTERED_POSTAL_CODE,
  },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "UEN",
    value: legalConfig.uen,
  },
  sameAs: [TWITTER_URL, GITHUB_ORG_URL, DOCS_URL],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: PRODUCT_NAME,
  alternateName: [...PRODUCT_NAME_VARIANTS],
  description: CANONICAL_DESCRIPTION,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
};

/** Sitewide graph. Emitted once, from the root layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

const app = {
  "@type": "MobileApplication",
  "@id": `${siteConfig.url}/#app`,
  name: PRODUCT_NAME,
  alternateName: [...PRODUCT_NAME_VARIANTS],
  description: CANONICAL_DESCRIPTION,
  applicationCategory: "TravelApplication",
  operatingSystem: "iOS, Android",
  url: siteConfig.url,
  publisher: { "@id": ORGANIZATION_ID },
  featureList: [
    "eSIM data plans in over 200 destinations",
    "No KYC and no personal information collected",
    "Passkey authentication using the device secure enclave",
    "Card, Apple Pay, Google Pay and PayPal payments",
    "Optional self-custodial smart wallet, owned by the user",
  ],
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: faqsData.map((faq) => ({
    "@type": "Question",
    "@id": `${siteConfig.url}/#faq-${faq.id}`,
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/** Home page graph. The app itself, plus the FAQ as answerable pairs. */
export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [app, faqPage],
};

const GLOSSARY_ID = `${siteConfig.url}/glossary#glossary`;

const glossary = {
  "@type": "DefinedTermSet",
  "@id": GLOSSARY_ID,
  name: `${PRODUCT_NAME} glossary`,
  description: `Definitions of the eSIM, mobile network and wallet terms used across ${PRODUCT_NAME}.`,
  url: `${siteConfig.url}/glossary`,
  publisher: { "@id": ORGANIZATION_ID },
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "en",
  hasDefinedTerm: glossaryData.map((entry) => ({
    "@type": "DefinedTerm",
    // Points at the entry on the page, so a citation lands on the definition
    // rather than the top of the glossary.
    "@id": `${siteConfig.url}/glossary#${entry.id}`,
    name: entry.term,
    ...(entry.aliases ? { alternateName: entry.aliases } : {}),
    description: entry.definition,
    inDefinedTermSet: { "@id": GLOSSARY_ID },
  })),
};

/** Glossary page graph. One set, one term per entry. */
export const glossaryGraph = {
  "@context": "https://schema.org",
  "@graph": [glossary],
};
