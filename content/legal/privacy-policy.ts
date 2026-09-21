/**
 * Published policy text. It states what Kokio does and does not collect, so it
 * has to keep matching the app, the glossary and the marketing copy.
 *
 * Anything beyond a typo needs counsel to see it first, and the record of what
 * they were asked and what they answered is kept outside this repository.
 * After a reviewed change lands, move `counselReviewedIso` in config/legal.ts
 * and update that record. The build warns until the date moves.
 */

import { legalConfig } from "@/config/legal";
import type { LegalDocument } from "@/lib/legal/types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: legalConfig.lastUpdated,
  effective: legalConfig.effective,
  sections: [
    // LEGAL REVIEW (Introduction):
    // Confirm the governing privacy regimes for launch countries.
    // If needed (e.g. Brazil LGPD, California CCPA/CPRA), add the corresponding disclosures and rights.
    {
      heading: "Introduction",
      blocks: [
        {
          type: "paragraph",
          content: `This Privacy Policy explains how ${legalConfig.companyLegalName} (UEN ${legalConfig.uen}) ("Kokio", "we", "us", or "our") handles information in connection with the Kokio mobile application and related services (the "Service"). We are committed to data minimisation: the Service is designed so that we collect and hold as little information about you as possible.`,
        },
        {
          type: "paragraph",
          content: `We operate from Singapore and process and store data in Singapore. We comply with the Singapore Personal Data Protection Act 2012 ("PDPA") and, where applicable to users in the European Economic Area ("EEA") and United Kingdom, the EU/UK General Data Protection Regulation ("GDPR").`,
        },
      ],
    },

    {
      heading: "Our Privacy-First Design",
      blocks: [
        {
          type: "paragraph",
          content: `Kokio is built to let you purchase eSIMs without providing personally identifiable information. We do not ask for your name, email address, phone number, physical address, or government identifiers to create or use an account.`,
        },
        {
          type: "paragraph",
          content: `Authentication uses a device-bound passkey (WebAuthn/FIDO2) stored by your device's operating system or password manager. Your account is identified solely by a device wallet address — a blockchain address derived deterministically from your passkey's public-key coordinates and a server-generated value. This identifier is pseudonymous: on its own, and without a live authentication from your device, it cannot be linked to you as an individual, including by us.`,
        },
        {
          type: "paragraph",
          content: `We do not integrate advertising networks, analytics SDKs, or tracking technologies that profile you.`,
        },
      ],
    },

    {
      heading: "Data Controller",
      blocks: [
        {
          type: "paragraph",
          content: `For the purposes of the GDPR and PDPA, the data controller responsible for the limited personal data processed through the Service is:`,
        },
        {
          type: "list",
          ordered: false,
          items: [
            legalConfig.companyLegalName,
            `${legalConfig.registeredAddress}`,
            [
              { type: "strong", value: "Data Protection Officer:" },
              {
                type: "text",
                value: ` ${legalConfig.dpoName}, ${legalConfig.dpoEmail}`,
              },
            ],
            [
              { type: "strong", value: "General contact:" },
              { type: "text", value: ` ${legalConfig.generalContact}` },
            ],
          ],
        },
      ],
    },

    {
      heading: "Information We Process",
      blocks: [
        {
          type: "subsection",
          heading: "Account and Credential Data",
          blocks: [
            {
              type: "paragraph",
              content: `When you register, we store a small record associated with your device wallet address, consisting of: the device wallet address, a device unique identifier, the public-key coordinates derived from your passkey, and a server-generated salt used in address derivation. We never receive or store your passkey's private key — it never leaves your device.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Transaction and eSIM Data",
          blocks: [
            {
              type: "paragraph",
              content: `When you purchase or top up an eSIM, we process order records, eSIM provisioning details, and payment status. These records are linked to your device wallet address, not to your identity.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Payment Data",
          blocks: [
            {
              type: "paragraph",
              content: `We do not collect or store your card numbers, bank details, or crypto funding details. Payments are handled by third-party payment providers (see Section 6). For card payments, a customer reference is created with our payment processor; that reference is created without your name, email, or address.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "On-Chain Data",
          blocks: [
            {
              type: "paragraph",
              content: `Certain actions (wallet creation, purchases) are recorded on a public blockchain (Base). Blockchain records are public, permanent, and immutable. They contain a wallet address and transaction data, and cannot be altered or deleted by us or by anyone.`,
            },
          ],
        },
        // LEGAL REVIEW (Technical Data):
        // If any crash-reporting or diagnostics tooling is added later (e.g. Sentry),
        // it must be disclosed here and reflected in the Google Play Data Safety form.
        // As configured at launch, none is integrated.
        {
          type: "subsection",
          heading: "Technical Data",
          blocks: [
            {
              type: "paragraph",
              content: `To operate and secure the Service we process limited technical data such as network requests, error and security logs, and a per-request correlation identifier. These are used for service operation, security, and fraud prevention, and are configured to avoid containing personal identifiers.`,
            },
          ],
        },
      ],
    },

    {
      heading: "Legal Bases for Processing (GDPR)",
      blocks: [
        {
          type: "paragraph",
          content: `Where the GDPR applies, we rely on the following legal bases:`,
        },
        {
          type: "list",
          ordered: false,
          items: [
            [
              { type: "strong", value: "Performance of a contract:" },
              {
                type: "text",
                value: ` to create your account, process purchases, and provision eSIMs.`,
              },
            ],
            [
              { type: "strong", value: "Legitimate interests:" },
              {
                type: "text",
                value: ` to secure the Service, prevent fraud and abuse, and maintain records; balanced against your rights.`,
              },
            ],
            [
              { type: "strong", value: "Legal obligation:" },
              {
                type: "text",
                value: ` to retain transaction records for financial, accounting, tax, and audit purposes.`,
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: `Under the PDPA, we process data with your consent (deemed or express) and as permitted by the Act's legitimate-interests and business-purpose exceptions.`,
        },
      ],
    },

    // LEGAL REVIEW (Third Parties and Sharing):
    // List the actual sub-processors/providers by name (Stripe, MoonPay, the eSIM aggregator,
    // Alchemy/RPC provider, cloud host) in a sub-processor annex if counsel suggestes,
    // and ensure DPAs are in place with each.
    {
      heading: "Third Parties and Sharing",
      blocks: [
        {
          type: "paragraph",
          content: `We do not sell your data. We share limited data only as needed to run the Service:`,
        },
        {
          type: "list",
          ordered: false,
          items: [
            [
              { type: "strong", value: "Payment providers" },
              {
                type: "text",
                value: ` — Stripe (FIAT payments) and MoonPay (Crypto purchases) process your payment independently as their own data controllers under their own privacy policies. MoonPay may perform its own identity verification (KYC) on you; that process and any data you provide to MoonPay are governed by MoonPay's policies, not ours.`,
              },
            ],
            [
              { type: "strong", value: "eSIM service providers / aggregators" },
              {
                type: "text",
                value: ` — provision eSIM profiles under their telecom licences and partner networks. We share only the technical details necessary to fulfil and manage your eSIM.`,
              },
            ],
            [
              { type: "strong", value: "Infrastructure providers" },
              {
                type: "text",
                value: ` — blockchain RPC and cloud infrastructure used to operate the Service, acting as our processors under appropriate agreements.`,
              },
            ],
            [
              { type: "strong", value: "Authorities" },
              {
                type: "text",
                value: ` — where required by law, valid legal process, or to protect rights and safety.`,
              },
            ],
          ],
        },
      ],
    },

    {
      heading: "International Transfers",
      blocks: [
        {
          type: "paragraph",
          content: `We store data in Singapore. Some third-party providers (Section 6) may process data outside Singapore or the EEA. Where we transfer personal data internationally, we rely on appropriate safeguards such as Standard Contractual Clauses or transfers to jurisdictions recognised as providing adequate protection, in accordance with the PDPA's Transfer Limitation Obligation and Chapter V of the GDPR.`,
        },
      ],
    },

    // LEGAL REVIEW (Data Retention):
    // Set the concrete retention period (e.g. [N] years) required under Singapore accounting/tax law
    // and any AML obligations, and state it here.
    {
      heading: "Data Retention",
      blocks: [
        {
          type: "paragraph",
          content: `We keep data only as long as necessary. Account and credential data are retained while your account exists. Order, eSIM, and payment records are retained for the period required to meet financial, accounting, tax, and audit obligations, even after account deletion, in pseudonymised form that contains no personal identifier and cannot be linked back to you.`,
        },
      ],
    },

    {
      heading: "Account Deletion",
      id: "account-deletion",
      blocks: [
        {
          type: "paragraph",
          content: `You can delete your account at any time.`,
        },
        {
          type: "subsection",
          heading: "How to delete your account",
          blocks: [
            {
              type: "paragraph",
              content: `Open the Kokio app, go to Settings, and select "Delete Account". You will be asked to confirm with your passkey. Deletion is immediate and irreversible.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "What is deleted",
          blocks: [
            {
              type: "paragraph",
              content: `Your account record and the credential material derived from your passkey (public-key coordinates, salt, and device identifier), and your payment-processor customer reference, are permanently removed from our systems.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "What is retained, and why",
          blocks: [
            {
              type: "paragraph",
              content: `Order and transaction records are retained in pseudonymised form for the period required by financial and audit obligations. These records contain no name, email, address, or other personal identifier and cannot be linked back to you once your account is deleted.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "What cannot be deleted",
          blocks: [
            {
              type: "paragraph",
              content: `Transactions published to the public blockchain are permanent and cannot be removed by anyone, including us. They contain a wallet address and no personal information. Any eSIM you have already paid for continues to work on your device until its plan expires; deleting your account does not cancel or refund an active plan.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Why there is no email or web-form deletion request",
          blocks: [
            {
              type: "paragraph",
              content: `Kokio accounts hold no personal data and are secured solely by a device-bound passkey. We therefore have no way to verify, out of band, that a person contacting us is the account holder — an email-based deletion path would be a security risk. Deletion is performed in the app, authenticated by your passkey, which is the only proof of account ownership that exists.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "If you have lost your passkey",
          blocks: [
            {
              type: "paragraph",
              content: `If your passkey is lost or deleted, the account becomes permanently unreachable. No party, including Kokio, can access, restore, delete on request, or act on it. Account recovery is not supported by design.`,
            },
          ],
        },
      ],
    },

    // LEGAL REVIEW (Your Rights):
    // Counsel to confirm how DSAR/verification works given no PII.
    {
      heading: "Your Rights",
      blocks: [
        {
          type: "paragraph",
          content: `Subject to applicable law and the limits imposed by our privacy-first design, you may have rights to access, correct, delete, restrict, or object to the processing of your personal data, to data portability, and to withdraw consent. Because we hold no data that identifies you, and cannot re-identify you from a wallet address without a live authentication from your device, our practical ability to action some requests is limited to what you can perform in-app via your passkey.`,
        },
        {
          type: "paragraph",
          content: [
            { type: "text", value: `To exercise any right, contact us at ` },
            { type: "mail", email: legalConfig.generalContact },
            {
              type: "text",
              value: `. Where the GDPR applies, we will respond within one month. Where the PDPA applies, we will respond as required by the Act.`,
            },
          ],
        },
      ],
    },

    {
      heading: "Data Security",
      blocks: [
        {
          type: "paragraph",
          content: `We implement technical and organisational measures appropriate to the risk, including encryption of sensitive values, access controls, secure credential storage on your device, and security logging. No system is perfectly secure, and you are responsible for safeguarding the device and passkey that control your account.`,
        },
      ],
    },

    {
      heading: "Data Breach Notification",
      blocks: [
        {
          type: "paragraph",
          content: `If a personal data breach is likely to result in significant harm or risk to your rights, we will notify the relevant supervisory authority and affected users within the timeframes required by applicable law (including within 72 hours under the GDPR and as required under the PDPA).`,
        },
      ],
    },

    {
      heading: "Children",
      blocks: [
        {
          type: "paragraph",
          content: `The Service is intended for adults and is not directed to, or intended for use by, anyone under 18. We do not knowingly collect data from minors. If you believe a minor has used the Service, contact us.`,
        },
      ],
    },

    {
      heading: "Changes to this Policy",
      blocks: [
        {
          type: "paragraph",
          content: `We may update this Policy from time to time. We will post the updated version and revise the "Last Updated" date, and provide additional notice for material changes where required by law.`,
        },
      ],
    },

    {
      heading: "Contact and Complaints",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", value: `Questions or concerns: ` },
            { type: "mail", email: legalConfig.generalContact },
            { type: "text", value: `.` },
          ],
        },
        {
          type: "paragraph",
          content: `If you are in the EEA/UK, you may lodge a complaint with your local data protection authority. If you are in Singapore, you may contact the Personal Data Protection Commission (PDPC). We ask that you contact us first so we can try to resolve the matter.`,
        },
      ],
    },
  ],
};
