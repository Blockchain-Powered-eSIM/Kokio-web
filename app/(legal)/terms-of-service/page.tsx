import type { Metadata } from "next";

import { termsOfService } from "@/content/legal/terms-of-service";
import { LegalDocumentView } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Kokio app and services.",
  alternates: {
    canonical: "/terms-of-service",
    types: { "text/markdown": "/terms-of-service.md" },
  },
};

export default function TermsOfServicePage() {
  return <LegalDocumentView doc={termsOfService} />;
}
