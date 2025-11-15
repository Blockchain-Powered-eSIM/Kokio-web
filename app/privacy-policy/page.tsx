// TODO: This page is only temporary meant for alpha version of Kokio mobile application
// This should be modified or deprecated as and when the alpha testing is complete
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="background min-h-screen">
      {/* Content wrapper under global header */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Title + Description */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>

          <p className="mt-4 leading-relaxed text-gray-600">
            Below you can find our full privacy policy for Koki&apos;o Mobile
            Application. This document explains how we collect, use, and protect
            your personal information during alpha testing of the application.
            <br />
            If the embedded PDF doesn’t load properly, use the link below to
            open it in a new tab.
          </p>

          <a
            href="https://drive.google.com/file/d/1XROiv_rS2Qe8nJWUPIcNFUFDiXZm2GS6/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-sky-700 underline transition hover:text-sky-900"
          >
            Open Privacy Policy in a new tab →
          </a>
        </header>

        {/* PDF Viewer Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <iframe
            src="https://drive.google.com/file/d/1XROiv_rS2Qe8nJWUPIcNFUFDiXZm2GS6/preview"
            className="h-[80vh] w-full"
            style={{ border: "none" }}
            allow="autoplay"
          />
        </div>
      </section>
    </main>
  );
}
