/**
 * Single source of truth for the general fieldss that appear
 * throughout the Terms of Service and Privacy Policy content modules.
 */

export interface LegalConfig {
  companyLegalName: string;
  uen: string;
  registeredAddress: string;
  dpoName: string;
  dpoEmail: string;
  generalContact: string;

  /** "Last Updated" date shown in each document header. Source: "[DATE]". */
  lastUpdated: string;
  /**
   * Same date as lastUpdated, as ISO 8601, for the sitemap. Kept separate
   * because lastUpdated is written for readers ("15th July 2026") and does not
   * parse. Change both together.
   */
  lastUpdatedIso: string;
  /** "Effective" date shown in each document header. Source: "[DATE]". */
  effective: string;

  /**
   * Date counsel last reviewed the Terms and the Privacy Policy, ISO 8601.
   *
   * The build warns when either document has been edited more recently than
   * this. Move it only after counsel has actually seen the change, never to
   * silence the warning.
   */
  counselReviewedIso: string;

  /** Liability-cap look-back window in months (ToS §13). Confirmed by counsel. */
  liabilityCapMonths: string;
  /**
   * Data-retention period (Privacy §8). No document reads this yet: counsel
   * asked for the retention wording to stay general until the Terms review
   * finishes, and will give a period then. Keep the field.
   */
  retentionYears: string;

  /** Governing law (ToS §17). Fixed to Singapore per the drafts. */
  governingLaw: string;
  /** Dispute-resolution mechanism (ToS §17). Counsel chose SIAC arbitration. */
  disputeResolution: string;
}

export const legalConfig: LegalConfig = {
  companyLegalName: "KOKIO SG PTE. LTD.",
  uen: "202523545K",
  registeredAddress: "165B Telok Ayer Street, Singapore - 068617",

  dpoName: "Arpit Kumar",
  dpoEmail: "legal-office@kokio.app",
  generalContact: "contact@kokio.app",

  lastUpdated: "15th July 2026",
  lastUpdatedIso: "2026-07-15",
  effective: "15th July 2026",

  counselReviewedIso: "2026-09-07",

  liabilityCapMonths: "3",
  retentionYears: "[3]",

  governingLaw: "Singapore",
  disputeResolution:
    "by arbitration administered by the Singapore International Arbitration Centre (SIAC) in Singapore",
};
