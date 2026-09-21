import "./globals.css";
import type { Metadata } from "next";
import { Anybody, Lexend } from "next/font/google";

import { cn } from "@/lib/utils";
import { siteConfig, TWITTER_HANDLE } from "@/config/site";
import { META_DESCRIPTION, PRODUCT_NAME } from "@/lib/site-copy";
import { siteGraph } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { NavBar } from "@/components/global/nav-bar";
import { Footer } from "@/components/global/footer";
import { Toaster } from "@/components/ui/toaster";
import { AnnouncementBanner } from "@/components/global/announcement-banner";
import Script from "next/script";

const anybody = Anybody({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anybody",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: PRODUCT_NAME,
    template: `%s | ${PRODUCT_NAME}`,
  },
  description: META_DESCRIPTION,
  applicationName: PRODUCT_NAME,
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: PRODUCT_NAME,
    title: PRODUCT_NAME,
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: PRODUCT_NAME,
    description: META_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(anybody.variable, lexend.variable)}
    >
      <body
        className={cn(
          "flex min-h-screen flex-col bg-beach-sky font-sans antialiased"
        )}
      >
        <JsonLd data={siteGraph} />
        <AnnouncementBanner />
        <NavBar />
        <div className="m-0 flex-1 p-0">{children}</div>
        <Footer />
        <Toaster />
        <Script
          id="matomo-tracking"
          strategy="afterInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `
							  var _paq = window._paq = window._paq || [];
								/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
								_paq.push(['trackPageView']);
								_paq.push(['enableLinkTracking']);
								(function() {
									var u="https://psedev.matomo.cloud/";
									_paq.push(['setTrackerUrl', u+'matomo.php']);
									_paq.push(['setSiteId', '17']);
									var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
									g.async=true; g.src='https://cdn.matomo.cloud/psedev.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
								})();
						`,
          }}
        />
      </body>
    </html>
  );
}
