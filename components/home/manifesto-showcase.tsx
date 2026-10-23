import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getManifesto } from "@/lib/manifesto";

export const MANIFESTO_SIGNATURE =
  "You can't breach a database that doesn't exist.";

/**
 * One line per pillar. `heading` must match an H2 in content/manifesto.mdx;
 * a pillar whose heading has been removed or renamed there drops out of the
 * band rather than describing text that no longer exists.
 */
const PILLARS = [
  {
    heading: "Privacy is Personal, Political and Programmable",
    line: "Privacy is a right to selective presence, not total invisibility.",
  },
  {
    heading: "From Consumers to Citizens",
    line: "Your account is a wallet you control, bound to your device, not a profile we hold.",
  },
  {
    heading: "Infrastructure, Not Interference",
    line: "Telecom today is a gate, so we are building a bridge, open source and open to checking.",
  },
  {
    heading: "No Backdoors. No Middlemen.",
    line: "Protecting your own data strengthens the network for everyone, so privacy here is a commons.",
  },
] as const;

export function getManifestoShowcase() {
  const manifesto = getManifesto();
  const headings = new Set(
    manifesto.content
      .split("\n")
      .filter((line) => line.startsWith("## "))
      .map((line) => line.slice(3).trim())
  );

  return {
    title: "Why we build it this way",
    credo: manifesto.tldr[0],
    pillars: PILLARS.filter((pillar) => headings.has(pillar.heading)),
    signature: MANIFESTO_SIGNATURE,
    href: "/manifesto",
  };
}

export function ManifestoShowcase() {
  const { title, credo, pillars, signature, href } = getManifestoShowcase();

  return (
    <section
      aria-labelledby="manifesto-showcase-heading"
      className="container max-w-screen-xl px-4"
    >
      <div className="relative overflow-hidden rounded-3xl border-2 border-manifesto-sand-border shadow-sm">
        <Image
          src="/manifesto/meadow-bg.png"
          alt=""
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="relative flex flex-col items-center gap-6 bg-manifesto-card/85 px-6 py-12 text-center text-manifesto-ink backdrop-blur-sm md:px-16 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest">
            Inside Kokio
          </span>
          <h2
            id="manifesto-showcase-heading"
            className="max-w-2xl font-heading text-2xl font-bold md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-xl font-heading text-lg font-semibold md:text-xl">
            {credo}
          </p>
          <ul className="grid w-full max-w-4xl gap-4 text-left text-sm leading-relaxed md:grid-cols-2 md:text-base">
            {pillars.map((pillar) => (
              <li
                key={pillar.heading}
                className="rounded-2xl border border-manifesto-sand-border bg-manifesto-sand/70 p-4"
              >
                <h3 className="mb-1 font-heading font-bold">
                  {pillar.heading}
                </h3>
                <p>{pillar.line}</p>
              </li>
            ))}
          </ul>
          <p className="max-w-xl text-sm font-semibold md:text-base">
            {signature}
          </p>
          <Link
            href={href}
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-manifesto-coral focus-visible:ring-offset-2 md:text-base"
          >
            Read the manifesto
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
