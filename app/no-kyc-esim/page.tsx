import { HubPage, hubMetadata } from "@/components/hubs/hub-page";

const SLUG = "no-kyc-esim";

export const metadata = hubMetadata(SLUG);

export default function NoKycEsimPage() {
  return <HubPage slug={SLUG} />;
}
