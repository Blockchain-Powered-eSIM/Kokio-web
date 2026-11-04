/**
 * Decides whether a destination or region page is indexed, built but kept out
 * of search, or not built at all.
 *
 * index: listed in the sitemap and open to search engines.
 * noindex: built, so it can be read and reviewed, but out of the sitemap.
 * exclude: not built, the URL 404s.
 */

import type {
  CountryContent,
  RegionContent,
  SnapshotCountry,
  SnapshotOffering,
} from "@/lib/esim/types";

export type GateStatus = "index" | "noindex" | "exclude";

export interface Verdict {
  status: GateStatus;
  /** Why the page is not indexed. Empty when it is. */
  reasons: string[];
}

const MAX_AGE_MS = 183 * 24 * 60 * 60 * 1000;
const MIN_TIPS = 3;
const MIN_FAQS = 4;

function staleReason(lastVerified: string | null, now: Date): string | null {
  if (!lastVerified) return "never verified by a person";
  if (now.getTime() - new Date(lastVerified).getTime() > MAX_AGE_MS) {
    return `last verified ${lastVerified}, more than 6 months ago`;
  }
  return null;
}

function verdict(reasons: Array<string | null>): Verdict {
  const failed = reasons.filter((reason): reason is string => reason !== null);
  return { status: failed.length ? "noindex" : "index", reasons: failed };
}

export function gateCountry(
  content: CountryContent,
  catalogue: SnapshotCountry | null,
  now = new Date()
): Verdict {
  if (content.publishStatus === "draft") {
    return { status: "exclude", reasons: ["draft"] };
  }
  if (!catalogue || catalogue.plans.length === 0) {
    return { status: "exclude", reasons: ["no plans in the snapshot"] };
  }

  return verdict([
    catalogue.networks.length || content.coverageNote
      ? null
      : "no network list or coverage note",
    content.tips.length >= MIN_TIPS || content.faqs.length >= MIN_FAQS
      ? null
      : `needs ${MIN_TIPS}+ tips or ${MIN_FAQS}+ FAQs (has ${content.tips.length} and ${content.faqs.length})`,
    staleReason(content.lastVerified, now),
  ]);
}

export function gateRegion(
  content: RegionContent,
  offering: SnapshotOffering | null,
  now = new Date()
): Verdict {
  if (content.publishStatus === "draft") {
    return { status: "exclude", reasons: ["draft"] };
  }
  if (!offering || offering.plans.length === 0) {
    return {
      status: "exclude",
      reasons: ["no regional plans in the snapshot"],
    };
  }

  return verdict([
    content.faqs.length >= MIN_FAQS
      ? null
      : `needs ${MIN_FAQS}+ FAQs (has ${content.faqs.length})`,
    staleReason(content.lastVerified, now),
  ]);
}
