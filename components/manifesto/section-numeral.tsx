import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { PILLAR_NUMERALS } from "@/lib/manifesto-mdx";

type Props = HTMLAttributes<HTMLHeadingElement> & { id?: string };

/** h2 override for /manifesto: adds a Roman-numeral coral badge on the four
 * pillar headings only, looked up by id. */
export function ManifestoHeading({ id, children, className, ...props }: Props) {
  const numeral = id ? PILLAR_NUMERALS[id] : undefined;

  return (
    <h2
      id={id}
      className={cn("scroll-mt-24 flex items-center gap-3", className)}
      {...props}
    >
      {numeral ? (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-manifesto-coral text-base font-semibold text-manifesto-ink"
        >
          {numeral}
        </span>
      ) : null}
      <span>{children}</span>
    </h2>
  );
}
