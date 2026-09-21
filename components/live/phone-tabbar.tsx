"use client";

import { Icon } from "@/components/live/icon-sprite";

type TabId = "home" | "shop" | "wallet" | "orders" | "settings";

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: "home", icon: "home", label: "Home" },
  { id: "shop", icon: "cart", label: "Shop" },
  { id: "wallet", icon: "wallet", label: "Wallet" },
  { id: "orders", icon: "receipt", label: "Orders" },
  { id: "settings", icon: "menu", label: "Settings" },
];

export function PhoneTabBar({
  active,
  onNavigate,
}: {
  active?: TabId;
  onNavigate?: (tab: TabId) => void;
}) {
  return (
    <div className="a-tabbar">
      {TABS.map((tab) => {
        const isWallet = tab.id === "wallet";
        return (
          <button
            key={tab.id}
            type="button"
            className={`a-tabbar-item${active === tab.id ? " active" : ""}${isWallet ? " disabled" : ""}`}
            disabled={isWallet}
            aria-disabled={isWallet}
            title={isWallet ? "Not available yet" : undefined}
            onClick={() => !isWallet && onNavigate?.(tab.id)}
          >
            <Icon name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
