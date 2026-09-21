/**
 * Definitions of the terms the rest of the site uses without explaining.
 *
 * Read by the glossary page, its DefinedTermSet schema and the text versions of
 * the site, so all four say the same thing. Each definition is retrieved on its
 * own, without the page around it, so it names Kokio where Kokio is relevant
 * and never refers to the entry above it.
 */

import { PRODUCT_NAME, PRODUCT_NAME_SPELLINGS } from "@/lib/site-copy";

export interface GlossaryTerm {
  /** Stable anchor, used for deep links and as the schema `@id` fragment. */
  id: string;
  term: string;
  /** Other names for the same thing, including what people search for. */
  aliases?: string[];
  definition: string;
}

/** Bump when a definition changes. The sitemap reads it. */
export const GLOSSARY_UPDATED = new Date("2026-09-07");

export const glossaryData: GlossaryTerm[] = [
  {
    id: "kokio",
    term: PRODUCT_NAME,
    aliases: [...PRODUCT_NAME_SPELLINGS],
    definition: `${PRODUCT_NAME} is a privacy-first travel eSIM app. It sells mobile data plans in over 200 destinations, paid for by card, Apple Pay, Google Pay or stablecoins, and asks for no identity documents and no personal information. The name is also written ${PRODUCT_NAME_SPELLINGS.join(", ")}, and every one of those spellings refers to this same product, website and app.`,
  },
  {
    id: "esim",
    term: "eSIM",
    aliases: ["embedded SIM", "digital SIM"],
    definition:
      "An eSIM is a SIM that is downloaded rather than posted to you. It does the same job as the plastic card it replaces, proving to a mobile network that an account is allowed to use it, but it arrives over the internet and installs onto a chip already soldered into the phone. One phone can hold several eSIM profiles and switch between them, which is why travellers use them instead of buying a local SIM card on arrival. Kokio sells eSIM data plans this way, so a plan bought in the app is usable within a couple of minutes.",
  },
  {
    id: "euicc",
    term: "eUICC",
    aliases: ["Embedded Universal Integrated Circuit Card", "eSIM chip"],
    definition:
      "The eUICC is the chip an eSIM lives on. Where a removable SIM card is both the chip and its plastic holder, an eUICC is built into the phone during manufacture and cannot be taken out. It can store more than one profile at a time and accept new ones remotely, which is the part that makes eSIMs possible. The distinction that matters: eSIM is the profile you buy, eUICC is the hardware it is written to.",
  },
  {
    id: "sm-dp-plus",
    term: "SM-DP+",
    aliases: ["Subscription Manager Data Preparation", "SMDP+"],
    definition:
      "SM-DP+ is the server that holds an operator's eSIM profiles and hands them to phones. When a provider sells a plan, its SM-DP+ prepares a profile, encrypts it for one specific phone, and waits for that phone to collect it. The address printed inside an eSIM QR code is an SM-DP+ address. It is defined by the GSMA, the industry body that writes the SIM standards, so the same mechanism works across operators and handsets.",
  },
  {
    id: "lpa",
    term: "LPA",
    aliases: ["Local Profile Assistant"],
    definition:
      "The LPA is the software on your phone that fetches and installs eSIM profiles. It is what scans the QR code, contacts the SM-DP+ server named in it, downloads the profile and writes it to the eUICC chip. On iOS and Android the LPA is part of the operating system, which is why installing an eSIM looks like a settings screen rather than an app. An eSIM provider never touches the phone directly, it only makes a profile available for the LPA to collect.",
  },
  {
    id: "rsp",
    term: "RSP",
    aliases: ["Remote SIM Provisioning"],
    definition:
      "Remote SIM Provisioning is the GSMA architecture that lets a SIM profile be delivered over the air instead of on a card. It names the pieces and how they talk to each other: the SM-DP+ server that prepares profiles, the LPA on the phone that collects them, and the eUICC chip that stores them. Every eSIM you have ever installed went through RSP, whether it came from a mobile operator or from a travel provider like Kokio.",
  },
  {
    id: "passkey",
    term: "Passkey",
    aliases: ["WebAuthn credential", "FIDO2 credential"],
    definition:
      "A passkey is a pair of cryptographic keys that replaces a password. The private half never leaves your phone and is unlocked by your face or fingerprint, and the public half is all the service ever sees, so there is no password to reuse, guess, leak or phish. Passkeys are a public standard, WebAuthn, supported by Apple, Google and Microsoft. A Kokio account is controlled by a passkey rather than an email and password, which is one reason the app needs no personal information to sign you in.",
  },
  {
    id: "secure-enclave",
    term: "Secure enclave",
    aliases: ["secure element", "hardware-backed keystore"],
    definition:
      "A secure enclave is a separate chip inside the phone that holds private keys and refuses to give them up. Apps ask it to sign something and get a signature back, but never see the key itself, so malware on the phone and anyone who steals it still cannot extract the key. Apple calls its version the Secure Enclave, Android calls the equivalent a hardware-backed keystore or StrongBox. Kokio keeps the key controlling your account there instead of in a file or a recovery phrase.",
  },
  {
    id: "smart-wallet",
    term: "Smart wallet",
    aliases: ["smart contract wallet", "smart account"],
    definition:
      "A smart wallet is an onchain account run by a program rather than by a single private key. Because the rules are code, the account can decide what counts as a valid signature, which lets a passkey sign for it, and it can let someone else pay the network fee. That removes the two parts of a normal crypto wallet that stop ordinary people using one: the recovery phrase and the need to hold a network's token before you can do anything. Every Kokio account is a smart wallet, so the eSIM belongs to the person who bought it rather than to a provider's database.",
  },
  {
    id: "account-abstraction",
    term: "Account abstraction",
    aliases: ["ERC-4337", "AA"],
    definition:
      "Account abstraction is the idea that an account's rules should live in code instead of being fixed by the network. On Ethereum an ordinary account is defined by one key using one signature scheme, and account abstraction lifts that limit so an account can accept a passkey signature, require two approvals, set spending limits or have its fees paid by an app. The main standard for it is ERC-4337, which adds this without changing Ethereum itself. It is the technique that makes a smart wallet usable by someone who has never heard of a recovery phrase.",
  },
  {
    id: "no-kyc",
    term: "No-KYC",
    aliases: ["KYC", "Know Your Customer"],
    definition:
      "KYC, Know Your Customer, is the identity check a regulated business runs before serving you: a passport scan, a selfie, an address. No-KYC means the service works without any of it. Most eSIM providers and most mobile operators collect identity documents and keep them, along with a record of everywhere you connected. Kokio is no-KYC: it asks for no documents, no name and no email, so there is no identity file to leak, sell or hand over.",
  },
  {
    id: "roaming",
    term: "Roaming",
    definition:
      "Roaming is using your home mobile plan on someone else's network, usually in another country. Your operator pays the foreign network for the traffic and bills you, and the markup on that arrangement is why a week abroad can cost more than a month at home. A travel eSIM avoids roaming entirely by buying data directly from a network at the destination.",
  },
  {
    id: "data-bundle",
    term: "Data bundle",
    aliases: ["data plan", "travel data plan"],
    definition:
      "A data bundle is a fixed amount of mobile data for a set place and time, for example 5 GB across Europe for 30 days. It is paid for up front, so it cannot run up a bill the way roaming can, and it stops when the allowance or the period runs out. Kokio sells travel data bundles as eSIMs, priced per destination and per size.",
  },
];
