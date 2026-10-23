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
          content: `You must be at least 18 years old and legally capable of entering into a binding contract. You must not be located in, or a resident of, any jurisdiction where use of the Service or its features (including payments in crypto-assets and the use of self-custodial wallets) is prohibited, and you must not be subject to any applicable sanctions.`,
        },
      ],
    },

    {
      heading: "The Service",
      blocks: [
        {
          type: "paragraph",
          content: `Kokio is a marketplace that lets you purchase and manage eSIM mobile-data plans. The Service includes a device-bound authentication mechanism and a self-custodial blockchain wallet on the Base network, used to hold funds, pay for plans, and record purchases and wallet activity. eSIM connectivity is provided by third-party eSIM service providers and their partner networks, not by Kokio.`,
        },
        {
          type: "paragraph",
          content: `Plans, regions, prices, and payment methods may change or be withdrawn at any time. Funds in your wallet are real, and the Base network is a public blockchain operated by third parties.`,
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
    //
    // LEGAL REVIEW (Wallet and Blockchain Transactions, second paragraph, added for mainnet):
    // Engineering, 2026-10-23: the registry gives each new eSIM wallet an admin allowance of
    // legalConfig.adminAllowanceUsd (kokio-sdk docs/mobile/registry.md).
    // The owner can change it only by calling the contract, the app has no control for it.
    // The BFF does not use admin purchases. device-wallet payments are calls the user signs.
    {
      heading: "Wallet and Blockchain Transactions",
      blocks: [
        {
          type: "paragraph",
          content: `The Service provides a self-custodial wallet. You alone control it through your passkey; we do not hold, custody, or control your keys or assets. Blockchain transactions are irreversible and permanent. You are responsible for verifying transaction details before confirming. We are not liable for losses arising from irreversible on-chain transactions, network fees, blockchain congestion, protocol failures, or errors you make.`,
        },
        // {
        //   type: "paragraph",
        //   content: `Two limits apply to that control. Each eSIM wallet created for your account lets Kokio's service key buy plans for that eSIM, paid from your wallet balance without a fresh signature from you, up to a total of US$${legalConfig.adminAllowanceUsd} per eSIM wallet; each such purchase reduces the remaining amount. This limit is recorded on-chain. The app does not currently use this ability or offer a way to change the limit. The protocol's smart contracts can also be paused by us in an emergency, which may temporarily stop purchases, and they can be upgraded by their administrators after a public delay of at least one day.`,
        // },
        {
          type: "paragraph",
          content: `Only send assets on the Base network to your wallet address. Assets sent from another network, or sent by you to a wrong address, are generally lost and cannot be recovered by us. Tokens you add yourself are not reviewed or endorsed by Kokio. Balances and US dollar values shown in the app are estimates for information only. Contacts you save are stored only on your device and are not backed up by us.`,
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
          content: `Prices are shown in the app and may change. You may pay by supported methods, including card and Apple Pay payments processed by Stripe, crypto payments through MoonPay's checkout, and payments made directly from your Kokio wallet in supported stablecoins such as USDC, USDT, and DAI. Stripe and MoonPay are independent third parties, use of corresponding payment methods is subject to their respective terms and privacy policies, and they may perform their own identity verification. Kokio does not receive or store your full payment credentials.`,
        },
        {
          type: "paragraph",
          content: `Stablecoins carry their own risks. Their value can move away from its peg, and their issuers or bridges can fail, freeze, or restrict them. Some stablecoins on Base, including USDT and DAI, are bridged from another network and depend on that bridge. You accept these risks when you hold or pay with them.`,
        },
        {
          type: "paragraph",
          content: `You are responsible for any taxes applicable to your purchases except those we are legally required to collect. Blockchain network (gas) fees are your responsibility, except for the wallet actions where we choose to sponsor them. Sponsorship is at our discretion and may change or stop at any time.`,
        },
        {
          type: "paragraph",
          content: `You may apply one coupon or referral code to an order, and may choose to apply store credit on top of it. Codes and credit are valid only on the terms shown in the app, and may expire, have usage limits, or apply to a first purchase only. If a code and credit do not cover the full price, the rest is paid by your chosen method, and a card payment must be either nothing or at least US$1.00, so credit may be reduced to meet that, or the order refused. A code or credit applied to an order that ends unpaid is returned.`,
        },
        {
          type: "paragraph",
          content: `Referral rewards are paid as store credit, only after the order of the person you referred is completed. Store credit is not money: it can only be applied to purchases in the Service, and it cannot be withdrawn, transferred, or exchanged. We may change, revoke, or withdraw codes, rewards, and credit, and may reverse any obtained through abuse, error, or fraud.`,
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
              { type: "strong", value: "Activation details:" },
              {
                type: "text",
                value: ` the QR code and activation details of an eSIM allow anyone who holds them to install it. Keep them private, Kokio cannot recover an eSIM if it installed by someone else from the QR code or manual instructions.`,
              },
            ],
            [
              { type: "strong", value: "Installation:" },
              {
                type: "text",
                value: ` most eSIMs can be installed only once. Removing an installed eSIM from your device may make it permanently unusable, and it will not be replaced or refunded.`,
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
                value: ` a top-up applies to an existing eSIM and does not create a new one. It is available only where the plan is compatible with the one already on that eSIM, which the app checks before purchase.`,
              },
            ],
            [
              { type: "strong", value: "Usage figures:" },
              {
                type: "text",
                value: ` remaining-data figures shown in the app come from the eSIM providers on a best-effort basis and may lag or be unavailable.`,
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
        {
          type: "paragraph",
          content: `You can cancel an order that has not been paid from within the app. Cancelling cannot be undone. If a payment for the order completes after you cancel, it is not matched to that order, no eSIM is assigned, and it is not refunded. Do not cancel an order while a payment is in progress. You are responsible for any funds lost by cancelling an order.`,
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              value: `To raise a problem with an order, contact us at `,
            },
            { type: "mail", email: legalConfig.generalContact },
            {
              type: "text",
              value: ` with the order Reference shown in Purchase details. Whether a remedy is given, and its form (for example a refund to the original payment method, a transfer to the wallet you paid from, or store credit), is decided case by case, subject to applicable law.`,
            },
          ],
        },
      ],
    },

    {
      heading: "Acceptable Use",
      blocks: [
        {
          type: "paragraph",
          content: `You agree not to: use the Service for unlawful purposes, money laundering, sanctions evasion, or fraud; circumvent security, authentication, or geographic restrictions; interfere with or attack the Service or its infrastructure; abuse codes, referrals, or store credit, including by referring yourself or creating multiple accounts to earn rewards; reverse engineer except as permitted by law; or resell or commercially exploit the Service without our written consent.`,
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
          content: `The Service relies on and links to third-party services (payment providers, eSIM providers, blockchain networks, wallet and transaction infrastructure, and any app or website you connect your wallet to). We are not responsible for third-party services, their availability, or their acts and omissions, and your use of them is at your own risk and subject to their terms.`,
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
              value: ` for the deletion mechanism and its consequences). Deleting your account cannot be undone, and any store credit left on it can no longer be used. We may suspend or terminate access if you breach these Terms or where required by law or to protect the Service or other users. Provisions that by their nature should survive termination will survive.`,
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
