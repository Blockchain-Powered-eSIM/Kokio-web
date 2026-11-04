import { HubPage, hubMetadata } from "@/components/hubs/hub-page";

const SLUG = "private-travel-esim";

export const metadata = hubMetadata(SLUG);

export default function PrivateTravelEsimPage() {
  return <HubPage slug={SLUG} />;
}
