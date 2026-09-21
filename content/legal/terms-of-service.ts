/**
 * Published contract text. Changing a word here changes what users agreed to.
 *
 * Anything beyond a typo needs counsel to see it first, and the record of what
 * they were asked and what they answered is kept outside this repository.
 * After a reviewed change lands, move `counselReviewedIso` in config/legal.ts
 * and update that record. The build warns until the date moves.
 */

import { legalConfig } from "@/config/legal";
import type { LegalDocument } from "@/lib/legal/types";

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  lastUpdated: legalConfig.lastUpdated,
  effective: legalConfig.effective,
  sections: [
    {
      heading: "Agreement to Terms",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              value: `These Terms of Service ("Terms") form a binding agreement between you and ${legalConfig.companyLegalName} (UEN ${legalConfig.uen}), a company incorporated in Singapore with its registered office at ${legalConfig.registeredAddress} ("Kokio", "we", "us"). By downloading, accessing, or using the Kokio mobile application and related services (the "Service"), you agree to these Terms and to our `,
            },
            {
              type: "internal",
              text: "Privacy Policy",
              href: "/privacy-policy",
            },
            {
              type: "text",
              value: `. If you do not agree, please do not use the Service.`,
            },
          ],
        },
      ],
    },

    // LEGAL REVIEW (Eligibility):
    // Define excluded/sanctioned jurisdictions and align them with the countries excluded in the
    // Google Play Financial Features Declaration.
    {
      heading: "Eligibility",
      blocks: [
        {
          type: "paragraph",
          content: `You must be at least 18 years old and legally capable of entering into a binding contract. You must not be located in, or a resident of, any jurisdiction where use of the Service or its features (including crypto-asset purchases) is prohibited, and you must not be subject to any applicable sanctions.`,
        },
      ],
    },

    {
      heading: "The Service",
      blocks: [
        {
          type: "paragraph",
          content: `Kokio is a marketplace that lets you purchase and manage eSIM mobile-data plans. The Service includes a device-bound authentication mechanism and a self-custodial blockchain wallet used to record purchases and wallet activity. eSIM connectivity is provided by third-party eSIM service providers and their partner networks, not by Kokio.`,
        },
      ],
    },

    {
      heading: "Accounts, Passkeys, and No Recovery",
      blocks: [
        {
          type: "paragraph",
          content: `Your account is created and secured by a device-bound passkey. THERE IS NO ACCOUNT RECOVERY. If you lose, delete, or cannot access your passkey, you will permanently and irreversibly lose access to your account, your wallet, your purchase history, and any funds or assets associated with the wallet. No party, including Kokio, can restore access.`,
        },
        {
          type: "paragraph",
          content: `You are solely responsible for maintaining the security of your device, your passkey, and any backups your device's operating system or password manager provides. You accept all risk arising from loss of access.`,
        },
      ],
    },

    // LEGAL REVIEW (Wallet and Blockchain Transactions):
    // The non-custodial / not-a-MSB characterisation is basis of the regulatory position
    // (Google Play declaration, MAS Payment Services Act exposure in Singapore).
    // Counsel must confirm it and add any MAS-required disclosures.
    {
      heading: "Wallet and Blockchain Transactions",
      blocks: [
        {
          type: "paragraph",
          content: `The Service provides a self-custodial wallet. You alone control it through your passkey; we do not hold, custody, or control your keys or assets. Blockchain transactions are irreversible and permanent. You are responsible for verifying transaction details before confirming. We are not liable for losses arising from irreversible on-chain transactions, network fees, blockchain congestion, protocol failures, or errors you make.`,
        },
        {
          type: "paragraph",
          content: `Kokio is a non-custodial software interface. We are not a bank, money-services business, exchange, custodian, or financial advisor, and we do not provide financial, investment, tax, or legal advice.`,
        },
      ],
    },

    {
      heading: "Payments, Pricing, and Third-Party Providers",
      blocks: [
        {
          type: "paragraph",
          content: `Prices are shown in the app and may change. You may pay by supported methods, including card payments processed by Stripe and crypto purchases processed by MoonPay. These providers are independent third parties; your use of their services is subject to their terms and privacy policies, and they may perform their own identity verification. Kokio does not receive or store your full payment credentials.`,
        },
        {
          type: "paragraph",
          content: `You are responsible for any taxes applicable to your purchases except those we are legally required to collect. Blockchain network (gas) fees, where applicable, are your responsibility.`,
        },
      ],
    },

    {
      heading: "eSIM Terms",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            [
              { type: "strong", value: "Device compatibility:" },
              {
                type: "text",
                value: ` eSIMs require a compatible, carrier-unlocked device. You are responsible for confirming compatibility before purchase.`,
              },
            ],
            [
              { type: "strong", value: "Provisioning:" },
              {
                type: "text",
                value: ` eSIM profiles are provisioned by third-party providers. Availability, coverage, speeds, and "unlimited" or fair-use conditions are set by those providers and their partner networks and are not guaranteed by Kokio.`,
              },
            ],
            [
              { type: "strong", value: "Activation and validity:" },
              {
                type: "text",
                value: ` plans have activation rules and validity/expiry periods described at purchase. Data plans expire regardless of use, and unused data is not carried over unless stated.`,
              },
            ],
            [
              { type: "strong", value: "Top-ups:" },
              {
                type: "text",
                value: ` a top-up applies to an existing eSIM and does not create a new one.`,
              },
            ],
          ],
        },
      ],
    },

    // LEGAL REVIEW (Refunds and Cancellations):
    // Set the refund policy against EU/UK consumer law
    // (right of withdrawal for digital content and the pre-provisioning consent/waiver) and
    // Singapore consumer protection (CPFTA).
    // Likely needs jurisdiction-specific clauses.
    {
      heading: "Refunds and Cancellations",
      blocks: [
        {
          type: "paragraph",
          content: `Given the nature of digitally provisioned eSIMs and irreversible on-chain and crypto transactions, sales are final except where required by law or expressly stated. An eSIM that has been installed, activated, or provisioned is generally non-refundable. Where a purchase fails or an eSIM cannot be provisioned, we will work to resolve it, which may include reprovisioning or a refund at our discretion or as required by law.`,
        },
      ],
    },

    {
      heading: "Acceptable Use",
      blocks: [
        {
          type: "paragraph",
          content: `You agree not to: use the Service for unlawful purposes, money laundering, sanctions evasion, or fraud; circumvent security, authentication, or geographic restrictions; interfere with or attack the Service or its infrastructure; reverse engineer except as permitted by law; or resell or commercially exploit the Service without our written consent.`,
        },
      ],
    },

    {
      heading: "Intellectual Property",
      blocks: [
        {
          type: "paragraph",
          content: `The Service, including its software, design, and trademarks, is owned by Kokio or its licensors and is protected by law. We grant you a limited, non-exclusive, non-transferable, revocable licence to use the app for its intended personal purpose. Open-source components remain governed by their respective licences.`,
        },
      ],
    },

    {
      heading: "Third-Party Services and Links",
      blocks: [
        {
          type: "paragraph",
          content: `The Service relies on and links to third-party services (payment providers, eSIM providers, blockchain networks and infrastructure). We are not responsible for third-party services, their availability, or their acts and omissions, and your use of them is at your own risk and subject to their terms.`,
        },
      ],
    },

    {
      heading: "Disclaimers",
      blocks: [
        {
          type: "paragraph",
          content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. We do not warrant that the Service will be uninterrupted, error-free, secure, or that eSIM connectivity, coverage, or blockchain networks will be available or reliable.`,
        },
      ],
    },

    // LEGAL REVIEW (Limitation of Liability):
    // Liability caps and consumer-law vary by jurisdiction
    // (some limitations are unenforceable against consumers in the EU/UK/SG).
    // Counsel to adjust and add the mandatory "nothing in these Terms limits liability for X".
    {
      heading: "Limitation of Liability",
      blocks: [
        {
          type: "paragraph",
          content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, KOKIO AND ITS OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, DATA, GOODWILL, OR CRYPTO-ASSETS, OR FOR LOSSES ARISING FROM LOSS OF YOUR PASSKEY, IRREVERSIBLE TRANSACTIONS, OR THIRD-PARTY SERVICES. OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE TRANSACTION GIVING RISE TO THE CLAIM IN THE ${legalConfig.liabilityCapMonths} MONTHS BEFORE THE EVENT.`,
        },
      ],
    },

    {
      heading: "Indemnification",
      blocks: [
        {
          type: "paragraph",
          content: `You agree to indemnify and hold Kokio harmless from claims, losses, and expenses (including reasonable legal fees) arising from your misuse of the Service, your violation of these Terms, or your violation of any law or third-party right.`,
        },
      ],
    },

    {
      heading: "Termination",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              value: `You may stop using the Service and delete your account at any time (see the `,
            },
            {
              type: "internal",
              text: "Privacy Policy",
              href: "/privacy-policy#account-deletion",
            },
            {
              type: "text",
              value: ` for the deletion mechanism and its consequences). We may suspend or terminate access if you breach these Terms or where required by law or to protect the Service or other users. Provisions that by their nature should survive termination will survive.`,
            },
          ],
        },
      ],
    },

    {
      heading: "Changes to the Service and Terms",
      blocks: [
        {
          type: "paragraph",
          content: `We may modify the Service or these Terms. For material changes to the Terms, we will provide notice as required by law. Continued use after changes take effect constitutes acceptance.`,
        },
      ],
    },

    // LEGAL REVIEW (Governing Law and Dispute Resolution):
    // Choose litigation vs SIAC arbitration, seat, and language, and confirm mandatory
    // EU/UK consumer jurisdiction rights are preserved for consumer users.
    {
      heading: "Governing Law and Dispute Resolution",
      blocks: [
        {
          type: "paragraph",
          content: `These Terms are governed by the laws of ${legalConfig.governingLaw}, without regard to conflict-of-laws rules. Subject to any mandatory consumer-protection rights in your country of residence, disputes will be resolved ${legalConfig.disputeResolution}.`,
        },
      ],
    },

    {
      heading: "General",
      blocks: [
        {
          type: "paragraph",
          content: `If any provision is unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver. You may not assign these Terms; we may assign them to an affiliate or successor. These Terms and the Privacy Policy are the entire agreement between you and us regarding the Service. We are not liable for delays or failures caused by events beyond our reasonable control (force majeure).`,
        },
      ],
    },

    {
      heading: "Contact",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", value: `Questions about these Terms: ` },
            { type: "mail", email: legalConfig.generalContact },
            { type: "text", value: `.` },
          ],
        },
      ],
    },
  ],
};
