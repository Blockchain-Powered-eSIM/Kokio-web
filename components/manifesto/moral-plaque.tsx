import type { ReactNode } from "react";

/** Wraps the Moral section (h2 + body) in the sand plaque treatment, without a numeral. */
export function MoralPlaque({ children }: { children?: ReactNode }) {
  return (
    <div className="my-10 rounded-3xl border-2 border-manifesto-sand-border bg-manifesto-sand p-6 md:p-10">
      {children}
    </div>
  );
}
