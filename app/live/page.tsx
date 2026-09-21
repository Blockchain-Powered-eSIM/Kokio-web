import { IconSprite } from "@/components/live/icon-sprite";
import { LiveThemeProvider, ThemeToggle } from "@/components/live/theme-context";
import { FlowProvider } from "@/components/live/flow-context";
import { LiveHero, IOS_URL, ANDROID_URL } from "@/components/live/hero";
import { StepSection } from "@/components/live/step-section";
import { STEPS, SETTINGS_ABOUT, SETTINGS_CONTACT, CLOSING_TIPS } from "@/components/live/content";
import { RichText } from "@/components/live/rich-text";
import { ManifestoCTA } from "@/components/blog/manifesto-cta";
import { StepAuthVisual } from "@/components/live/step-auth";
import { StepShopVisual } from "@/components/live/step-shop";
import { StepCheckoutVisual } from "@/components/live/step-checkout";
import { StepOrdersVisual } from "@/components/live/step-orders";
import { StepInstallVisual } from "@/components/live/step-install";
import { StepWalletVisual } from "@/components/live/step-wallet";
import { StepSettingsVisual } from "@/components/live/step-settings";

const STEP_VISUALS: Record<string, React.ComponentType> = {
  auth: StepAuthVisual,
  shop: StepShopVisual,
  checkout: StepCheckoutVisual,
  orders: StepOrdersVisual,
  install: StepInstallVisual,
  wallet: StepWalletVisual,
  settings: StepSettingsVisual,
};

const STEP_TRY_HINT_ICONS: Partial<Record<string, string>> = {
  auth: "fingerprint",
  shop: "cart",
  checkout: "check",
  orders: "chev-down",
  install: "copy",
};

const RAIL_LABELS = [
  ["auth", "01 · Start"],
  ["shop", "02 · Browse"],
  ["checkout", "03 · Checkout"],
  ["orders", "04 · Orders"],
  ["install", "05 · Install"],
  ["wallet", "06 · Wallet"],
  ["settings", "07 · Settings"],
] as const;

export default function LivePage() {
  return (
    <LiveThemeProvider>
      <FlowProvider>
        <IconSprite />
        <LiveHero />

        <div className="controls-outer">
          <div className="controls">
            <ThemeToggle />
            <nav className="rail">
              {RAIL_LABELS.map(([id, label]) => (
                <a key={id} href={`#step-${id}`}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <main className="wrap steps">
          {STEPS.map((step) => {
            const Visual = STEP_VISUALS[step.id];
            return (
              <StepSection key={step.id} step={step} tryHintIcon={STEP_TRY_HINT_ICONS[step.id]}>
                <Visual />
              </StepSection>
            );
          })}
        </main>

        <section className="wrap closing-tips">
          <h2>{CLOSING_TIPS.heading}</h2>
          <p>{CLOSING_TIPS.lead}</p>
          <ul>
            {CLOSING_TIPS.items.map((item, i) => (
              <li key={i}>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="wrap">
          <ManifestoCTA />
        </div>

        <footer className="page-footer">
          Try it out, let us know your feedback over comments in the{" "}
          <a href={IOS_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
            App Store
          </a>{" "}
          or{" "}
          <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
            Play Store
          </a>
          , or tag us on X using{" "}
          <a href={SETTINGS_ABOUT.socials[0].href} target="_blank" rel="noopener noreferrer" className="footer-link">
            @kokiodotapp
          </a>
          , or directly in the{" "}
          <a href={SETTINGS_CONTACT.telegram} target="_blank" rel="noopener noreferrer" className="footer-link">
            Telegram group
          </a>
          .
        </footer>
      </FlowProvider>
    </LiveThemeProvider>
  );
}
