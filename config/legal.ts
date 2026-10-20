/** General fields shared by the Terms of Service and Privacy Policy content modules. */

export interface LegalConfig {
  companyLegalName: string;
  uen: string;
  registeredAddress: string;
  dpoName: string;
  dpoEmail: string;
  generalContact: string;

  /** "Last Updated" date shown in each document header. */
  lastUpdated: string;
  /** Same date as lastUpdated, as ISO 8601, for the sitemap. */
  lastUpdatedIso: string;
  /** "Effective" date shown in each document header. */
  effective: string;

  /**
   * Date counsel last reviewed the Terms and the Privacy Policy, ISO 8601.
   * The build warns when either document has been edited more recently.
   */
  counselReviewedIso: string;

  /** Liability-cap look-back window in months (ToS §13). */
  liabilityCapMonths: string;
  /** Data-retention period (Privacy §8). Not currently read by any document. */
  retentionYears: string;

  /** Governing law (ToS §17). */
  governingLaw: string;
  /** Dispute-resolution mechanism (ToS §17). */
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
