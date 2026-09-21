import type { Metadata } from "next";

// Reached only after a payment. It says nothing useful on its own, and a search
// result pointing here would look like a transaction that never happened.
export const metadata: Metadata = {
  title: "Payment complete",
  robots: { index: false, follow: false },
};

export default function MoonpayReturnPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="text-xl font-light leading-relaxed text-foreground md:text-2xl">
          Your payment was successful. You can close this window and return to
          the Kokio app. Kindly wait for your order to process.
        </p>
      </div>
    </main>
  );
}
