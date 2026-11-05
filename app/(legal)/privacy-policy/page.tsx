import type { Metadata } from "next";

import { privacyPolicy } from "@/content/legal/privacy-policy";
import { LegalDocumentView } from "@/components/legal/legal-document";
import { shareMetadata } from "@/lib/esim/pages";

export const metadata: Metadata = {
  ...shareMetadata({
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Kokio handles information. A privacy-first, data-minimising eSIM app that collects as little about you as possible.",
  }),
  alternates: {
    canonical: "/privacy-policy",
    types: { "text/markdown": "/privacy-policy.md" },
  },
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentView doc={privacyPolicy} />;
}
