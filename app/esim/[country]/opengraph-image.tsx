import { cheapestPlan, formatUsd } from "@/lib/esim/catalogue";
import { countryPage } from "@/lib/esim/pages";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = "Kokio eSIM plans for one destination";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const page = countryPage((await params).country);
  if (!page) return renderOgImage({ eyebrow: "Kokio", title: "Travel eSIMs" });

  const from = formatUsd(cheapestPlan(page.catalogue.plans).priceUsd);
  return renderOgImage({
    eyebrow: `eSIM for ${page.content.name}`,
    title: `Data from ${from}. No passport, name or email.`,
  });
}
