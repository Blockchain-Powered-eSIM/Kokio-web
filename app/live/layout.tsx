import type { Metadata } from "next";
import { Anybody, Lexend, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./live.css";

const anybody = Anybody({
  subsets: ["latin"],
  display: "swap",
  variable: "--live-font-anybody",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--live-font-lexend",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--live-font-mono",
});

export const metadata: Metadata = {
  title: "Get Kokio & Usage Guide",
  description:
    "Download Kokio for iOS and Android, and see exactly how it works: sign in with a passkey, buy an eSIM, install it, and manage everything from a wallet only you control.",
  alternates: {
    canonical: "/live",
    types: { "text/markdown": "/live.md" },
  },
};

export default function LiveLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${anybody.variable} ${lexend.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
