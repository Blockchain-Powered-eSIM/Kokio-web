import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Home page section wrapper. Owns the section's vertical spacing; colours come
 * from the surface the section sits on.
 */
export function HomeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full py-12 md:py-20", className)}>{children}</div>
  );
}
