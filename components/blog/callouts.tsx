import type { ReactNode } from "react";
import { Flashlight, Sun, TriangleAlert } from "lucide-react";

export function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl bg-[#FAF3DD] p-5 md:p-6">
      <p className="flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-[#E28355]">
        <Sun aria-hidden="true" className="h-4 w-4" />
        Tip
      </p>
      <div className="mt-2 text-sm leading-relaxed text-outer-space-900 md:text-base [&>p+p]:mt-3 [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl bg-[#FAF3DD] p-5 md:p-6">
      <Flashlight aria-hidden="true" className="h-4 w-4 text-[#E28355]" />
      <div className="mt-2 text-sm leading-relaxed text-outer-space-900 md:text-base [&>p+p]:mt-3 [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

export function HeadsUp({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl bg-[#FFE8E6] p-5 md:p-6">
      <p className="flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-[#FF4756]">
        <TriangleAlert aria-hidden="true" className="h-4 w-4" />
        Heads up
      </p>
      <div className="mt-2 text-sm leading-relaxed text-outer-space-900 md:text-base [&>p+p]:mt-3 [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}
