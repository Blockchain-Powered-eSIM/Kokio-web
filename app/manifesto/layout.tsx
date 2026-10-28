import type { ReactNode } from "react";

import { ManifestoShell } from "@/components/manifesto/manifesto-shell";

/** Route-level shell for /manifesto: watercolor background and frosted card. */
export default function ManifestoLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <ManifestoShell>{children}</ManifestoShell>
    </main>
  );
}
