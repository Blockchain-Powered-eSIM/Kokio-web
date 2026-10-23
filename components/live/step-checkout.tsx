"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DeviceFrame } from "@/components/live/device-frame";
import { Icon } from "@/components/live/icon-sprite";
import { CHECKOUT_RADIOS, PLANS, TOPUP_CANDIDATES } from "@/components/live/mock-data";
import { useFlow } from "@/components/live/flow-context";

type CouponState = "idle" | "validating" | "valid" | "applied";

const DEFAULT_PLAN = PLANS.Countries[0];

// Kokio Wallet payment assets (DEVICE_WALLET_PAYMENT_ASSETS in the app); USDC is the default.
const WALLET_ASSETS = [
  { symbol: "USDC", icon: "/live/tokens/usdc.png" },
  { symbol: "USDT", icon: "/live/tokens/usdt.png" },
  { symbol: "DAI", icon: "/live/tokens/dai.png" },
];

// "Other crypto wallet" label icons (OTHER_WALLET_ICONS in the app's radioLabels.tsx).
const OTHER_WALLET_ICONS = [
  "/live/wallets/bitcoin.png",
  "/live/wallets/ethereum.png",
  "/live/wallets/solana.png",
];

/**
 * Step 03 — Checkout & payment. Reflects the plan picked in Step 02; coupon
 * validation, top-up compatibility check, and the Pay confirmation are fake timers.
 */
export function StepCheckoutVisual() {
  const flow = useFlow();
  const plan = flow.selectedPlan ?? DEFAULT_PLAN;
  const [headerOpen, setHeaderOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [assetIndex, setAssetIndex] = useState(0);
  const walletAsset = WALLET_ASSETS[assetIndex];
  const [coupon, setCoupon] = useState("");
  const [couponState, setCouponState] = useState<CouponState>("idle");
  const [priorMode, setPriorMode] = useState<"first" | "existing">("first");
  const [topupChecking, setTopupChecking] = useState(false);
  const [topupSelected, setTopupSelected] = useState<string | null>(null);
  const [esimOk, setEsimOk] = useState(false);
  const [payStatus, setPayStatus] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const discountApplied = couponState === "applied";
  const basePrice = Number(plan.price);
  const total = (discountApplied ? basePrice - 10 : basePrice).toFixed(2);
  const canPay = esimOk && !!selectedMethod;

  function handleCouponChange(value: string) {
    const upper = value.toUpperCase();
    setCoupon(upper);
    setCouponState("idle");
    timers.current.forEach(clearTimeout);
    if (upper.length === 8) {
      setCouponState("validating");
      timers.current.push(
        setTimeout(() => setCouponState("valid"), 700)
      );
    }
  }

  function handlePriorMode(mode: "first" | "existing") {
    setPriorMode(mode);
    if (mode === "first") {
      setTopupSelected(null);
      return;
    }
    setTopupChecking(true);
    timers.current.push(setTimeout(() => setTopupChecking(false), 700));
  }

  function handlePay() {
    if (!canPay) return;
    const target = TOPUP_CANDIDATES.find((r) => r.esimId === topupSelected);
    setPayStatus("Preparing your payment…");
    
    const confirmLabel =
      selectedMethod === "wallet"
        ? "Confirm the payment…"
        : selectedMethod === "crypto"
          ? "Checking payment status…"
          : "Confirming payment…";
    timers.current.push(
      setTimeout(() => setPayStatus(confirmLabel), 700),
      setTimeout(() => {
        setPayStatus(
          target
            ? `Top-up of ${plan.country} · ${plan.days} Days · ${plan.gb}GB is applied to ${target.label}.`
            : "Order placed — check the Orders tab."
        );
      }, 1500),
      setTimeout(() => flow.completeOrder(plan), 2300),
      setTimeout(() => setPayStatus(""), 4500)
    );
  }

  return (
    <DeviceFrame sourceTag="Checkout & payment">
      <div className="a-card-wrap" style={{ marginBottom: 14 }}>
        <span className="a-flag" style={{ fontSize: 26, top: -6, right: 16 }}>
          {plan.flag}
        </span>
        <div className="esim-card">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="chev-back" style={{ width: 18, height: 18 }} />
            <div className="a-country" style={{ fontSize: 17, paddingRight: 56 }}>
              {plan.country}
            </div>
          </div>
          <div className="a-statrow">
            <span className="a-stat">
              <Icon name="calendar" />
              <b>{plan.days}</b>&nbsp;Days
            </span>
            <span className="a-stat">
              <Icon name="cellular" />
              <b>{plan.gb}</b>&nbsp;GB
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setHeaderOpen((o) => !o)}
          style={{ all: "unset", display: "flex", justifyContent: "center", padding: "10px 0", width: "100%", cursor: "pointer" }}
        >
          <span
            style={{
              width: 34,
              height: 20,
              borderRadius: 10,
              background: "var(--app-handle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={headerOpen ? "chev-up" : "chev-down"} style={{ width: 12, height: 12, color: "var(--app-handle-arrow)" }} />
          </span>
        </button>
        {headerOpen && (
          <div className="a-detail" style={{ marginTop: 0 }}>
            <div className="a-summary-row">
              <span className="lbl">Plan Type</span>
              <span className="val">Data</span>
            </div>
            <div className="a-summary-row">
              <span className="lbl">Top-Up Options</span>
              <span className="val">Available</span>
            </div>
            <div className="a-summary-row">
              <span className="lbl">Coverage</span>
              <span className="val" style={{ display: "flex", alignItems: "center", gap: 3 }}>
                1 country <Icon name="chev-fwd" style={{ width: 12, height: 12 }} />
              </span>
            </div>
            <div className="a-summary-row">
              <span className="lbl">IP Routing</span>
              <span className="val">N/A</span>
            </div>
          </div>
        )}
      </div>

      <div className="control-group" style={{ justifyContent: "center", margin: "0 0 14px" }}>
        <div className="segmented" style={{ background: "var(--app-muted)" }}>
          <button type="button" className={priorMode === "first" ? "active" : ""} onClick={() => handlePriorMode("first")}>
            First eSIM
          </button>
          <button type="button" className={priorMode === "existing" ? "active" : ""} onClick={() => handlePriorMode("existing")}>
            Top-up
          </button>
        </div>
      </div>

      <div className="a-card" style={{ background: "var(--app-surface)", color: "var(--app-text)" }}>
        <div className="a-sublabel" style={{ marginTop: 0 }}>
          Payment Method
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CHECKOUT_RADIOS.map((r) => {
            const selected = selectedMethod === r.id;
            return (
              <button
                key={r.id}
                type="button"
                disabled={r.disabled}
                onClick={() => setSelectedMethod(r.id)}
                style={{
                  all: "unset",
                  cursor: r.disabled ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: selected ? "var(--app-input-bg)" : "transparent",
                  border: "1px solid var(--app-muted)",
                  borderRadius: 12,
                  padding: "11px 14px",
                  opacity: r.disabled ? 0.45 : 1,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "1.5px solid var(--app-muted-fg)",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selected && (
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--app-secondary)" }} />
                  )}
                </span>
                <span style={{ flex: 1, textAlign: "left", fontWeight: 700, fontSize: 13 }}>{r.label}</span>
                {r.id === "crypto" && (
                  <span style={{ display: "flex", alignItems: "center", flex: "none" }}>
                    {OTHER_WALLET_ICONS.map((src, index) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        width={22}
                        height={22}
                        style={{
                          boxSizing: "border-box",
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          objectFit: "contain",
                          background: "var(--app-surface)",
                          border: "1.5px solid var(--app-surface)",
                          marginLeft: index > 0 ? -8 : 0,
                        }}
                      />
                    ))}
                    <span style={{ marginLeft: 5, fontSize: 15, fontWeight: 700, color: "var(--app-muted-fg)" }}>...</span>
                  </span>
                )}
                {r.id === "wallet" && (
                  <span
                    role="button"
                    aria-label={`Change payment token, currently ${walletAsset.symbol}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAssetIndex((i) => (i + 1) % WALLET_ASSETS.length);
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    {walletAsset.symbol}
                    <Image src={walletAsset.icon} alt="" width={18} height={18} />
                    <Icon name="chev-down" style={{ width: 12, height: 12, color: "var(--app-muted-fg)" }} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {selectedMethod === "crypto" && (
          <div className="a-muted" style={{ marginTop: 8, fontSize: 12 }}>
            Select a network, pay by any wallet and keep a little extra for network fees, payable in the same token
          </div>
        )}

        <div className="a-sublabel">Promo code</div>
        <input
          value={coupon}
          maxLength={8}
          placeholder="Coupon or referral code"
          onChange={(e) => handleCouponChange(e.target.value)}
          style={{
            width: "100%",
            background: "var(--app-input-bg)",
            border: "1px solid transparent",
            borderRadius: 12,
            padding: "10px 14px",
            fontSize: 14,
            color: "var(--app-text)",
            fontFamily: "inherit",
          }}
        />
        <div style={{ marginTop: 8 }}>
          {couponState === "validating" && <span className="a-spinner" style={{ color: "var(--app-foreground2)" }} />}
          {(couponState === "valid" || couponState === "applied") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(34,197,94,.14)",
                borderRadius: 8,
                padding: "8px 10px",
              }}
            >
              {couponState === "valid" ? (
                <>
                  <span style={{ color: "var(--app-success)", fontSize: 12.5, fontWeight: 700 }}>
                    $10.00 off
                  </span>
                  <button
                    type="button"
                    onClick={() => setCouponState("applied")}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--app-secondary-fg)",
                      background: "var(--app-secondary)",
                      padding: "5px 10px",
                      borderRadius: 8,
                    }}
                  >
                    Apply
                  </button>
                </>
              ) : (
                <>
                  <span style={{ color: "var(--app-success)", fontSize: 12.5 }}>-$10.00 off</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCouponState("idle");
                      setCoupon("");
                    }}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      background: "rgba(239,68,68,.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="close" style={{ width: 11, height: 11, color: "var(--app-destructive)" }} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {priorMode === "existing" && (
          <div style={{ marginTop: 16 }}>
            {topupChecking ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="a-spinner" style={{ color: "var(--app-foreground2)" }} />
                <span style={{ fontSize: 13, color: "var(--app-foreground2)" }}>Checking top-up compatibility…</span>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 14, color: "var(--app-text)", fontWeight: 600, marginBottom: 2 }}>
                  Top Up
                </div>
                <div style={{ fontSize: 12.5, color: "var(--app-foreground2)", marginBottom: 10 }}>
                  Apply this plan as top up, else disable to buy a new one
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {TOPUP_CANDIDATES.map((r) => {
                    const selected = topupSelected === r.esimId;
                    return (
                      <button
                        key={r.esimId}
                        type="button"
                        onClick={() => setTopupSelected(selected ? null : r.esimId)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          padding: "11px 14px",
                          borderRadius: 12,
                          border: selected ? "2px solid var(--app-success)" : "1px solid var(--app-foreground2)",
                        }}
                      >
                        <span style={{ fontSize: 13, color: "var(--app-text)" }}>{r.label}</span>
                        {selected && <Icon name="check" style={{ width: 18, height: 18, color: "var(--app-success)" }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 18, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={esimOk}
            onChange={(e) => setEsimOk(e.target.checked)}
            style={{ marginTop: 3, accentColor: "var(--app-primary)" }}
          />
          <span style={{ fontSize: 12.5, color: "var(--app-text)" }}>
            I confirm my device is eSIM compatible and network-enabled.
          </span>
        </label>

        <button
          type="button"
          className="a-btn"
          disabled={!canPay}
          onClick={handlePay}
          style={{
            marginTop: 14,
            background: "var(--app-pay-btn)",
            color: "var(--app-card-fg)",
            border: "1px solid var(--app-muted)",
          }}
        >
          Pay ${total} USD
        </button>
        <div className="a-muted" style={{ textAlign: "center", marginTop: 8, fontSize: 12, minHeight: 16 }}>
          {payStatus}
        </div>
      </div>
    </DeviceFrame>
  );
}
