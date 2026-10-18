import { MAINNET_BANNER } from "@/components/live/content";

export function MainnetBanner() {
  return (
    <div className="testnet-banner" role="note">
      <div className="wrap">
        <p>
          <strong>{MAINNET_BANNER.heading}</strong>
          {MAINNET_BANNER.body}
        </p>
      </div>
    </div>
  );
}
