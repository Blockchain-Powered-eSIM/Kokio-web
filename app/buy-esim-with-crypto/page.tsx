import { HubPage, hubMetadata } from "@/components/hubs/hub-page";

const SLUG = "buy-esim-with-crypto";

export const metadata = hubMetadata(SLUG);

export default function BuyEsimWithCryptoPage() {
  return <HubPage slug={SLUG} />;
}
