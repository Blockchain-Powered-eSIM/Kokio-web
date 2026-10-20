import type { ReactNode } from "react";

/** Wraps the references section (h2 + list) in a smaller, muted treatment. */
export function ReferencesSection({ children }: { children?: ReactNode }) {
  return (
    <div className="mt-10 text-[15px] leading-relaxed text-manifesto-ink/70">
      {children}
    </div>
  );
}
