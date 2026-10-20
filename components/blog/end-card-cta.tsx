import Image from "next/image";

import ThumbsUp from "@/assets/seb/Component 11.svg";
import { withBlogUtm } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CTA_CONTENT } from "@/components/blog/cta-content";

export function EndCardCTA({ slug }: { slug: string }) {
  const content = CTA_CONTENT;
  const href = withBlogUtm(content.href, slug);

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl bg-cashmere-500 p-8 text-center text-white md:flex-row md:items-center md:justify-between md:text-left">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        <Image
          src={ThumbsUp}
          alt=""
          aria-hidden="true"
          className="h-14 w-14 md:h-16 md:w-16"
        />
        <div className="flex flex-col gap-1">
          <p className="font-heading text-xl font-bold">{content.heading}</p>
          <p className="text-cashmere-50">{content.body}</p>
        </div>
      </div>
      <Button
        asChild
        variant="ctaOnAccent"
        size="cta"
        className="w-full shrink-0 md:w-auto"
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content.ctaLabel}
        </a>
      </Button>
    </div>
  );
}
