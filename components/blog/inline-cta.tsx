import { Button } from "@/components/ui/button";
import { withBlogUtm } from "@/lib/utils";
import { CTA_CONTENT } from "@/components/blog/cta-content";

export function InlineCTA({ slug }: { slug: string }) {
  const content = CTA_CONTENT;
  const href = withBlogUtm(content.href, slug);

  return (
    <div className="not-prose my-6 flex flex-col items-start gap-3 rounded-2xl bg-cashmere-50 px-5 py-4 text-sm text-outer-space-900 sm:flex-row sm:items-center sm:gap-4 md:text-base">
      <p>{content.inlineText}</p>
      <Button asChild variant="cta" size="cta">
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content.inlineLabel}
        </a>
      </Button>
    </div>
  );
}
