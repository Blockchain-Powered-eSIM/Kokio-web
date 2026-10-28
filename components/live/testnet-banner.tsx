import { RichText } from "@/components/live/rich-text";
import { TESTNET_NOTICE } from "@/components/live/content";

/** Sits above the /live hero, before the "Get Kokio" heading — a standing
 * notice that this is a testnet build, not the eventual mainnet one. */
export function TestnetBanner() {
  return (
    <div className="testnet-banner">
      <div className="wrap">
        <p>
          <RichText text={TESTNET_NOTICE} />
        </p>
      </div>
    </div>
  );
}
