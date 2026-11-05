/** Shapes shared by the catalogue snapshot, the hand-written destination content and the /esim pages. */

export interface SnapshotPlan {
  /** Null when the plan is unlimited. */
  dataGb: number | null;
  unlimited: boolean;
  validityDays: number;
  priceUsd: number;
  has5g: boolean;
  /** A local profile is a local SIM, so "no local SIM to register" copy is hidden for it. */
  profileType: "roaming" | "local";
}

export interface SnapshotNetwork {
  name: string;
  /** Generations the supplier lists for it, e.g. 4G, 5G. */
  types: string[];
}

export interface SnapshotCountry {
  name: string;
  flag: string | null;
  plans: SnapshotPlan[];
  /** Networks the eSIM is allowed to join. The phone picks one on arrival. */
  networks: SnapshotNetwork[];
}

/** A regional, custom regional or global plan family, with the exact countries it covers. */
export interface SnapshotOffering {
  coverageType: "REGIONAL" | "CUSTOM_REGIONAL" | "GLOBAL";
  code: string;
  name: string;
  countries: string[];
  plans: SnapshotPlan[];
}

export interface Snapshot {
  /** Day the export was taken, YYYY-MM-DD. Used as the sitemap's lastModified, never shown on a page. */
  snapshotDate: string;
  countries: Record<string, SnapshotCountry>;
  offerings: SnapshotOffering[];
}

export interface Source {
  label: string;
  url: string;
}

/** A legal or regulatory claim. It is only shown with a source behind it. */
export interface RegulatoryNote {
  text: string;
  sources: [Source, ...Source[]];
}

export interface Faq {
  /** Becomes the element id and the schema `@id` fragment, prefixed with `faq-`. */
  id: string;
  question: string;
  answer: string;
}

export type PublishStatus = "draft" | "published";

export interface CountryContent {
  slug: string;
  /** ISO 3166-1 alpha-2, the key into the snapshot. */
  iso2: string;
  name: string;
  /** Slug of the region page this country belongs to. */
  region?: string;
  intro?: string;
  /** Written by hand when the supplier gives no network list. */
  coverageNote?: string;
  rules: RegulatoryNote[];
  airports: string[];
  tips: string[];
  faqs: Faq[];
  /** Slugs of nearby countries. Only those with a built page are linked. */
  neighbours: string[];
  /** Day a person last checked this page's facts, YYYY-MM-DD. Null until someone has. Read by the quality gate only, never shown. */
  lastVerified: string | null;
  /** Draft pages are never built. */
  publishStatus: PublishStatus;
}

export interface RouteLeg {
  iso2: string;
  days: number;
}

/** A sample trip used to compare one regional plan with separate local plans. */
export interface ExampleRoute {
  label: string;
  legs: RouteLeg[];
  /** Data the traveller is assumed to use over the whole trip. */
  dataGb: number;
}

export interface RegionContent {
  slug: string;
  name: string;
  /** Picks the plan family in the snapshot that this page sells. */
  offering: { coverageType: SnapshotOffering["coverageType"]; name: string };
  intro?: string;
  routes: ExampleRoute[];
  faqs: Faq[];
  lastVerified: string | null;
  publishStatus: PublishStatus;
}
