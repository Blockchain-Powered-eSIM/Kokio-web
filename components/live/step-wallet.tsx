"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/live/device-frame";
import { Icon } from "@/components/live/icon-sprite";
import { WALLET_ADDRESS_FULL, WALLET_ADDRESS_SHORT } from "@/components/live/mock-data";

/**
 * Step 06 — Wallet, scoped to the Home "Device Wallet" card only (the app's Wallet tab is feature-flagged off and
 * unreachable, so no Send/Receive/Deposit dashboard is shown here).
 */
export function StepWalletVisual() {
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [copied, setCopied] = useState(false);

  function deploy() {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
    }, 900);
  }

  function copyAddress() {
    try {
      navigator.clipboard?.writeText(WALLET_ADDRESS_FULL);
    } catch {
      // clipboard access can be blocked — the visual "copied" state still runs
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <DeviceFrame sourceTag="Your on-chain wallet">
      <div style={{ fontSize: 15, paddingLeft: 4, marginBottom: 8, color: "var(--app-text)" }}>Device Wallet</div>
      <div
        style={{
          borderRadius: 21,
          padding: 22,
          background: "linear-gradient(135deg, var(--app-gradient-dark), var(--app-bg))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 19, fontWeight: 500, color: "var(--app-text)" }}>Device Wallet</span>
          <Icon name="wallet" style={{ width: 26, height: 26, color: "var(--app-text)" }} />
        </div>

        {!deployed ? (
          <button type="button" onClick={deploy} disabled={deploying} style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}>
            <div style={{ color: "var(--app-text)", fontSize: 14, padding: "24px 0 60px" }}>
              {deploying ? "Deploying your wallet…" : "Tap to create your device wallet"}
            </div>
          </button>
        ) : (
          <div>
            <div style={{ color: "var(--app-wallet-balance-fg)", fontSize: 13, marginBottom: 2 }}>Total balance</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 16 }}>
              <span style={{ color: "var(--app-wallet-balance-fg)", fontSize: 38, fontWeight: 700, lineHeight: 1 }}>0</span>
              <span style={{ color: "var(--app-wallet-balance-fg)", fontSize: 13, marginBottom: 4 }}>USD</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
              <span style={{ color: "var(--app-wallet-balance-fg)", fontSize: 12 }}>{WALLET_ADDRESS_SHORT}</span>
              <Icon name="external" style={{ width: 15, height: 15, color: "var(--app-foreground2)" }} />
              <button type="button" onClick={copyAddress} style={{ all: "unset", cursor: "pointer", display: "flex" }}>
                <Icon name={copied ? "check" : "copy"} style={{ width: 15, height: 15, color: copied ? "var(--app-success)" : "var(--app-foreground2)" }} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {[
          { icon: "arrow-up", label: "Send", bg: "var(--app-warning)" },
          { icon: "arrow-down", label: "Receive", bg: "var(--app-success)" },
          { icon: "deposit", label: "Deposit", bg: "var(--app-info)" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              background: "var(--app-item-bg)",
              borderRadius: 20,
              padding: "16px 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 0.5,
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={item.icon} style={{ width: 18, height: 18, color: "#fff" }} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--app-text)" }}>{item.label}</span>
            <span className="soon-pill" style={{ fontSize: 9, padding: "2px 7px" }}>
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </DeviceFrame>
  );
}
