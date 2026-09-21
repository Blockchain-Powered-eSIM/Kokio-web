"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/live/device-frame";
import { Icon } from "@/components/live/icon-sprite";
import { MANUAL_LPA, QR_PATTERN } from "@/components/live/mock-data";
import { useFlow } from "@/components/live/flow-context";

type Tab = "QR" | "Direct" | "Manual";

/**
 * Step 05 — Install (screens/esimInstallation/EsimInstallation.tsx).
 * Tab strip order and default active tab are both **Direct** first, per
 * explicit instruction — overrides the earlier QR-default accuracy note
 * in AppLiveTasks.md's source-accuracy table.
 * Install eSIM is always tappable and just hands off to Orders.
 */
export function StepInstallVisual() {
  const flow = useFlow();
  const [tab, setTab] = useState<Tab>("Direct");
  const [copied, setCopied] = useState(false);

  function copyLpa() {
    try {
      navigator.clipboard?.writeText(MANUAL_LPA);
    } catch {
      // clipboard access can be blocked — the visual "copied" state still runs
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <>
      <DeviceFrame sourceTag="Install your eSIM">
        <div className="a-card-wrap" style={{ marginBottom: 14 }}>
          <span className="a-flag" style={{ fontSize: 26, top: -6, right: 16 }}>
            🇯🇵
          </span>
          <div className="esim-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="chev-back" style={{ width: 16, height: 16 }} />
              <div className="a-country" style={{ fontSize: 17, paddingRight: 56 }}>
                Install eSIM
              </div>
            </div>
            <div className="a-statrow">
              <span className="a-stat">
                <Icon name="calendar" />
                <b>7</b>&nbsp;Days
              </span>
              <span className="a-stat">
                <Icon name="cellular" />
                <b>5</b>&nbsp;GB
              </span>
            </div>
          </div>
        </div>

        <div className="a-card">
          <div className="segmented" style={{ background: "var(--app-muted)", width: "100%" }}>
            <button
              type="button"
              className={tab === "Direct" ? "active" : ""}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
              onClick={() => setTab("Direct")}
            >
              <Icon name="flash" style={{ width: 10, height: 10, fill: "#ffc107" }} />
              <Icon name="flash" style={{ width: 10, height: 10, fill: "#ffc107" }} />
              <span style={{ marginLeft: 3 }}>Direct</span>
            </button>
            <button
              type="button"
              className={tab === "QR" ? "active" : ""}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
              onClick={() => setTab("QR")}
            >
              <Icon name="flash" style={{ width: 10, height: 10, fill: "#ffc107" }} />
              <span style={{ marginLeft: 3 }}>QR</span>
            </button>
            <button type="button" className={tab === "Manual" ? "active" : ""} style={{ flex: 1 }} onClick={() => setTab("Manual")}>
              Manual
            </button>
          </div>

          {tab === "QR" && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  background: "#fff",
                  borderRadius: 12,
                  padding: 10,
                  margin: "0 auto 12px",
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gridTemplateRows: "repeat(7,1fr)",
                  gap: 4,
                }}
              >
                {QR_PATTERN.map((v, i) => (
                  <div key={i} style={{ background: v ? "#23262e" : "transparent", borderRadius: 1 }} />
                ))}
              </div>
              <p className="a-muted" style={{ marginBottom: 14 }}>
                Add it from Settings &gt; Cellular/Mobile Data &gt; Add eSIM &gt; Use QR Code
              </p>
              <button type="button" className="a-btn a-btn-primary">
                Share QR code
              </button>
            </div>
          )}

          {tab === "Direct" && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <p className="a-muted" style={{ marginBottom: 16 }}>
                Hands off to Apple&apos;s native &quot;Install eSIM&quot; flow on this iPhone.
              </p>
              <button
                type="button"
                className="a-btn a-btn-outline"
                style={{ maxWidth: 220, margin: "0 auto" }}
                onClick={() => flow.goTo("orders")}
              >
                Install eSIM
              </button>
            </div>
          )}

          {tab === "Manual" && (
            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                className={`a-copy-row${copied ? " copied" : ""}`}
                onClick={copyLpa}
                style={{ all: "unset", boxSizing: "border-box", width: "100%", display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <div className="body">
                  <div className="copy-label">Activation code (LPA)</div>
                  <div className="copy-value">{MANUAL_LPA}</div>
                </div>
                <Icon name={copied ? "check" : "copy"} />
              </button>
            </div>
          )}
        </div>
      </DeviceFrame>
    </>
  );
}
