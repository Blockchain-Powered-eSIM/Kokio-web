"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logomark from "@/assets/logomark.svg";
import { DeviceFrame } from "@/components/live/device-frame";
import { useFlow } from "@/components/live/flow-context";

type Mode = "new" | "returning";

/**
 * Step 01 — Sign in (components/AuthenticationModal.tsx in the mobile app).
 * Confirming a button walks through a fake "Verifying… / Passkey confirmed" sequence, then resets.
 */
export function StepAuthVisual() {
  const flow = useFlow();
  const [mode, setMode] = useState<Mode>("new");
  const [subtext, setSubtext] = useState("Choose how to get started");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function baseSubtext(m: Mode) {
    return m === "returning" ? "Log in to continue" : "Choose how to get started";
  }

  function handleSwitchMode(m: Mode) {
    setMode(m);
    setSubtext(baseSubtext(m));
  }

  function confirm() {
    timers.current.forEach(clearTimeout);
    setSubtext("Verifying your identity…");
    timers.current.push(
      setTimeout(() => setSubtext("Passkey confirmed"), 850),
      // Land on Home's shop card, same as the artifact — the visitor taps
      // "Shop" themselves from there to open the browsing screen.
      setTimeout(() => {
        flow.setShopScreen("home");
        flow.goTo("shop");
      }, 1500),
      setTimeout(() => setSubtext(baseSubtext(mode)), 2600)
    );
  }

  return (
    <DeviceFrame sourceTag="Sign in">
      <div style={{ position: "relative", minHeight: 280 }}>
        <div className="control-group" style={{ justifyContent: "center", margin: "0 0 18px" }}>
          <div className="segmented" style={{ background: "var(--app-muted)" }}>
            <button type="button" className={mode === "new" ? "active" : ""} onClick={() => handleSwitchMode("new")}>
              Sign up
            </button>
            <button type="button" className={mode === "returning" ? "active" : ""} onClick={() => handleSwitchMode("returning")}>
              Sign in
            </button>
          </div>
        </div>
        <div
          style={{
            background: "var(--app-modal-bg)",
            borderRadius: "22px 22px 10px 10px",
            padding: 16,
            boxShadow: "0 12px 32px rgba(0,0,0,.35)",
          }}
        >
          <Image
            src={Logomark}
            alt="Kokio"
            style={{ height: 52, width: "auto", display: "block", margin: "6px auto 14px" }}
          />
          <div style={{ textAlign: "center", fontSize: 19, fontWeight: 300, marginBottom: 4, color: "var(--app-text)" }}>
            Authentication Required
          </div>
          <div style={{ textAlign: "center", marginBottom: 16, fontSize: 13, color: "var(--app-foreground2)" }}>
            {subtext}
          </div>

          {mode !== "returning" ? (
            <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
              <button type="button" className="a-btn a-btn-highlight" onClick={confirm}>
                New User
              </button>
              <button type="button" className="a-btn a-btn-fgborder" onClick={confirm}>
                Existing User
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="a-btn a-btn-highlight"
              onClick={confirm}
              style={{ width: "50%", margin: "0 auto" }}
            >
              Log In
            </button>
          )}

          <div style={{ textAlign: "left", marginTop: 14 }}>
            <button
              type="button"
              onClick={() => setSubtext(baseSubtext(mode))}
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--app-link)",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 11.5, lineHeight: 1.6, color: "var(--app-foreground2)" }}>
          <strong style={{ color: "var(--app-text)", opacity: 0.8 }}>No account recovery without a synced passkey.</strong>
          <br />
          Losing the passkey itself means losing access.
        </div>
      </div>
    </DeviceFrame>
  );
}
