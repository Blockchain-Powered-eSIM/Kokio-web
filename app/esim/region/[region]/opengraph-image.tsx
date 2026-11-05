import { cheapestPlan, formatUsd } from "@/lib/esim/catalogue";
import { regionPage } from "@/lib/esim/pages";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = "Kokio regional eSIM plans";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const page = regionPage((await params).region);
  if (!page) return renderOgImage({ eyebrow: "Kokio", title: "Travel eSIMs" });

  const from = formatUsd(cheapestPlan(page.offering.plans).priceUsd);
  return renderOgImage({
    eyebrow: `${page.content.name} eSIM`,
    title: `${page.offering.countries.length} countries, one plan from ${from}.`,
  });
}
