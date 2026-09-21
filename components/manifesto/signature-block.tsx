import Image from "next/image";

import Trademark from "@/assets/Kokio - Trademark.svg";

/** Renders after Acknowledgment (see lib/manifesto-mdx.ts insertAfterSection). */
export function SignatureBlock() {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 text-center">
      <Image src={Trademark} alt="" aria-hidden="true" className="h-8 w-auto" />
      <p className="text-manifesto-ink/70">
        The Kokio team · Arpit, Manul, Tanmay · 2026
      </p>
    </div>
  );
}
