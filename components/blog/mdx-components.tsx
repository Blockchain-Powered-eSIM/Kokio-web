import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import Link from "next/link";

import { InlineCTA } from "@/components/blog/inline-cta";
import { Tip, HeadsUp, Highlight } from "@/components/blog/callouts";
import { Steps } from "@/components/blog/steps";
import { ManifestoCTA } from "@/components/blog/manifesto-cta";
import { AppDownloadCTA } from "@/components/blog/app-download-cta";

function SmartLink({
  href = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function MdxImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-2xl"
        {...props}
      />
      {alt ? (
        <figcaption className="mt-2 text-center text-sm text-esim-black-500">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const baseMdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="scroll-mt-24" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="scroll-mt-24" {...props} />
  ),
  a: SmartLink,
  img: MdxImage,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-cashmere-100 px-1.5 py-0.5 font-mono text-[0.9em] text-cashmere-800"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="overflow-x-auto rounded-2xl bg-outer-space-950 p-4 text-sm leading-relaxed text-esim-black-50 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),
};

/** InlineCTA bound per render with the current post's slug for UTM tagging. */
export function getMdxComponents(slug: string) {
  return {
    ...baseMdxComponents,
    InlineCTA: () => <InlineCTA slug={slug} />,
    Tip,
    HeadsUp,
    Highlight,
    Steps,
    ManifestoCTA,
    AppDownloadCTA,
  };
}
