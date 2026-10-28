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
    // Counsel to also confirm whether an EU/UK representative (GDPR Art. 27) is required.
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
          content: `Authentication uses a device-bound passkey (WebAuthn/FIDO2) stored by your device's operating system or password manager. Your account is identified solely by a device wallet address — a blockchain address derived deterministically from your passkey's public-key coordinates and a server-generated value. This identifier is pseudonymous: on its own, and without a live authentication from your device, it cannot be linked to you as an individual, including by us. The exceptions are the card details described under Payment Data and anything you choose to send us when you contact support.`,
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
              content: `When you register, we store a small record associated with your device wallet address, consisting of: the device wallet address, a device unique identifier, the public-key coordinates derived from your passkey, and a server-generated salt used in address derivation. Our authentication service also stores your passkey's credential identifier, public key, signature counter, and related technical metadata, and, while you are signed in, a hashed record of your session token bound to a key held on your device; session records expire automatically. We never receive or store your passkey's private key — it never leaves your device.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Transaction and eSIM Data",
          blocks: [
            {
              type: "paragraph",
              content: `When you purchase or top up an eSIM, we process order records, eSIM provisioning details (including the identifiers and activation details of the eSIM), the plan, the price and any code or credit applied, usage figures, and payment status. If you give an eSIM a label, we store it with that eSIM; labels are free text, so we suggest keeping personal details out of them. These records are linked to your device wallet address, not to your identity.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Referral, Coupon, and Store Credit Data",
          blocks: [
            {
              type: "paragraph",
              content: `Every account has a referral code. We record the codes you use, the referrals made with your code, and a ledger of store-credit movements (rewards, adjustments, and credit spent on orders). Referral records let us pay rewards and are linked to wallet addresses, not identities; the person who referred you is not told who you are, and you are not told who your referrals are.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Wallet Activity",
          blocks: [
            {
              type: "paragraph",
              content: `Once your device wallet is deployed, we track its on-chain activity on Base (ETH and token transfers sent or received, and changes to the spending cap of your eSIM wallets) through a blockchain notification provider, so the app can show your history. It is built from public blockchain data, begins at deployment, and may have gaps if the service was unavailable.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Data Kept on Your Device",
          blocks: [
            {
              type: "paragraph",
              content: `Some data stays on your device and is not sent to us: contacts you save in the app (an alias and a wallet address), tokens you add, and your session tokens, which sit in your device's secure storage. This data is removed from your device when you delete your account in the app.`,
            },
          ],
        },
        // LEGAL REVIEW (Payment Data):
        {
          type: "subsection",
          heading: "Payment Data",
          blocks: [
            {
              type: "paragraph",
              content: `We do not collect or store your card numbers, bank details, or crypto funding details. Payments are handled by third-party payment providers (see Section 6).`,
            },
            {
              type: "paragraph",
              content: `Every order is invoiced through Stripe. When you create an account, we create a Stripe customer record whose only reference to you is your device wallet address; it contains no name, email, or address. Stripe receives the plan, price, discounts, and payment status of each order, whichever payment method you use.`,
            },
            {
              type: "paragraph",
              content: `If you pay by card or Apple Pay, Stripe collects your card details, and the card's brand, last four digits, expiry date, and country are visible to us alongside your wallet address. If you use Apple Pay or Stripe Link, Stripe may also receive your name, email address, or phone number under its own terms; we do not request them.`,
            },
            {
              type: "paragraph",
              content: `If you pay through MoonPay's checkout, MoonPay receives your device wallet address and the order amount, and we receive the transaction hash of your payment, which links the wallet you paid from to your order. Payments made from your Kokio wallet are on-chain transactions (see On-Chain Data).`,
            },
          ],
        },
        // LEGAL REVIEW (On-Chain Data, device and eSIM identifiers):
        {
          type: "subsection",
          heading: "On-Chain Data",
          blocks: [
            {
              type: "paragraph",
              content: `Certain actions (wallet creation, purchases, payments and transfers from your wallet) are recorded on a public blockchain (Base). Blockchain records are public, permanent, and immutable. They contain a wallet address, transaction data, and identifiers derived from your device and your eSIMs, and cannot be altered or deleted by us or by anyone. Anyone who can link your wallet address to you, for example through an exchange or another service, can see its full public history.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Support Communications",
          blocks: [
            {
              type: "paragraph",
              content: `You do not need to give us contact details to use the Service. If you contact support by email or Telegram, we receive your email address or Telegram account details and in addition to the details you send us. We use them only to respond to you and keep them for up to ${legalConfig.supportRetention} after your last message. To help us find an order without identifying yourself, include the order Reference shown in Purchase details.`,
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
              content: `To operate and secure the Service we process limited technical data such as network requests, error and security logs, and a per-request correlation identifier. Your IP address is used to apply rate limits and is recorded in our security logs only when a rate limit is exceeded. Logs refer to your device wallet address but contain no name or contact details, are used for service operation, security, and fraud prevention, and are kept for ${legalConfig.logRetention}.`,
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
                value: ` to secure the Service, prevent fraud and abuse, respond to support requests, maintain records, and establish or defend legal claims; balanced against your rights.`,
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
    // Alchemy, Pimlico and Expo are named below.
    // The eSIM vendors and the cloud host are still named by category only.
    // List them by name in a sub-processor annex if counsel suggests, and ensure DPAs are in place with each.
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
                value: ` — Stripe (invoicing for every order, and card and Apple Pay payments) and MoonPay (crypto payments through MoonPay's checkout) process payments under their own terms and privacy policies. MoonPay may perform its own identity verification (KYC) on you; that process and any data you provide to MoonPay are governed by MoonPay's policies, not ours.`,
              },
            ],
            [
              { type: "strong", value: "eSIM service providers / aggregators" },
              {
                type: "text",
                value: ` — provision eSIM profiles under their telecom licences and partner networks. We share only the technical details necessary to fulfil and manage your eSIM. When you use an eSIM, the mobile networks that carry your traffic process connection and location data under their own policies; we do not receive it.`,
              },
            ],
            [
              { type: "strong", value: "Blockchain infrastructure providers" },
              {
                type: "text",
                value: ` — Alchemy (blockchain RPC, transaction fee sponsorship, and wallet activity notifications) and Pimlico (transaction bundling) receive wallet addresses and the blockchain transactions your wallet submits, acting as our processors under appropriate agreements. The app connects to them directly from your device, so they also receive your IP address.`,
              },
            ],
            [
              { type: "strong", value: "App infrastructure" },
              {
                type: "text",
                value: ` — Expo, our app update service, receives your IP address, device platform, app version, and a random installation identifier when the app checks for updates. Images such as country flags are loaded from content delivery networks, which receive your IP address.`,
              },
            ],
            [
              { type: "strong", value: "Cloud infrastructure providers" },
              {
                type: "text",
                value: ` — host and operate the Service, acting as our processors under appropriate agreements.`,
              },
            ],
            [
              { type: "strong", value: "WalletConnect" },
              {
                type: "text",
                value: ` — if you connect your Kokio wallet to another app or website using WalletConnect, the connection runs over WalletConnect's relay network under WalletConnect's own privacy policy, not ours.`,
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
    // Counsel, 2026-10: the wording without a figure is sufficient; where a period is stated it is
    // legalConfig.retentionYears, covering Singapore limitation periods for corporate and civil matters.
    {
      heading: "Data Retention",
      blocks: [
        {
          type: "paragraph",
          content: `We keep data only as long as necessary. Account and credential data are retained while your account exists, and afterwards in closed form as described under Account Deletion. Order, eSIM, payment, referral, and store-credit records are retained for up to ${legalConfig.retentionYears} years to meet financial, accounting, tax, and audit obligations and to deal with legal claims, even after account deletion, in pseudonymised form that contains no personal identifier and cannot be linked back to you from our own records. Server logs are kept for ${legalConfig.logRetention}, and support communications for up to ${legalConfig.supportRetention} after your last message.`,
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
              content: `Open the Kokio app, go to Settings, and select "Delete Account". You will be asked to type DELETE and, if you have not signed in recently, to confirm with your passkey. Deletion is immediate and irreversible.`,
            },
          ],
        },
        // LEGAL REVIEW (Account Deletion, what is deleted and retained):
        // Engineering, 2026-10-23: confirmed. Deletion flags the account closed, excludes its eSIMs from
        // status sync and removes the wallet from activity tracking; nothing is erased. The authentication
        // service is not told about deletions, so its credential records are retained too.
        // Counsel to check against GDPR erasure and the PDPA retention exceptions, since closed records
        // may still be personal data.
        {
          type: "subsection",
          heading: "What is deleted",
          blocks: [
            {
              type: "paragraph",
              content: `Your account is closed immediately and cannot be reopened. Every request made from it is refused, you lose access to your order history, eSIM details, store credit, referral code, and wallet in the app (move any funds out of your wallet first, because we cannot recover or move them for you afterwards), and we stop tracking your wallet's on-chain activity. The app also removes the data it holds on your device, including your saved contacts.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "What is retained, and why",
          blocks: [
            {
              type: "paragraph",
              content: `Your closed account record, including the credential material derived from your passkey (public-key coordinates, salt, and device identifier), the passkey credential records held by our authentication service, and your payment-processor customer reference, stays on our systems, along with your order, eSIM, payment, referral, and store-credit records and your wallet activity history (which is no longer updated). The account record is the link those records depend on to meet financial and audit obligations for the required period. None of it contains a name, email, address, or other personal identifier, and without your passkey it cannot be linked back to you from our own records.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "Remove your passkey yourself",
          blocks: [
            {
              type: "paragraph",
              content: `Deleting your account does not remove your passkey from your device or password manager, and we cannot remove it for you. Signing in with it again will succeed, but every request will be refused. Registering a new passkey creates a new account with a new wallet address. The app shows you how to remove the old passkey.`,
            },
          ],
        },
        {
          type: "subsection",
          heading: "What cannot be deleted",
          blocks: [
            {
              type: "paragraph",
              content: `Transactions published to the public blockchain are permanent and cannot be removed by anyone, including us. They contain a wallet address and no personal information. Any eSIM you have already paid for continues to work on your device until its plan expires; deleting your account does not cancel or refund an active plan, and any store credit left on the account can no longer be used.`,
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
          content: `Subject to applicable law and the limits imposed by our privacy-first design, you may have rights to access, correct, delete, restrict, or object to the processing of your personal data, to data portability, and to withdraw consent. Because we hold no data that directly identifies you, and cannot re-identify you from a wallet address without a live authentication from your device, our practical ability to action some requests is limited to what you can perform in-app via your passkey.`,
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
          content: `We implement technical and organisational measures appropriate to the risk, including encryption of sensitive values, access controls, secure credential storage on your device, access tokens bound to your device, and security logging. No system is perfectly secure, and you are responsible for safeguarding the device and passkey that control your account.`,
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
