import type { LegalDocument } from "@/lib/legal/types";
import { PRODUCT_NAME } from "@/lib/site-copy";
import { anchorId } from "@/lib/legal/slug";
import { LegalSection } from "@/components/legal/legal-section";
import { LegalToc } from "@/components/legal/legal-toc";

// Shared renderer for a legal document.
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <article className="flex flex-col">
      <header className="flex flex-col gap-3 border-b border-esim-black-100 pb-8">
        {/* Styled uppercase, so the text stays the canonical spelling. */}
        <p className="font-heading text-sm font-semibold uppercase tracking-wide text-cashmere-700">
          {PRODUCT_NAME}
        </p>
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          {doc.title}
        </h1>
        <p className="text-sm text-esim-black-700">
          Last Updated: {doc.lastUpdated} · Effective: {doc.effective}
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div>
          <LegalToc sections={doc.sections} />
        </div>
        <div className="flex flex-col gap-12">
          {doc.sections.map((section, i) => (
            <LegalSection
              key={anchorId(section.heading, section.id)}
              section={section}
              sectionNumber={i + 1}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
