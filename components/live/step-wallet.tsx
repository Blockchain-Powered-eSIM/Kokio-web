"use client";

import { useState } from "react";
import Image from "next/image";
import Logomark from "@/assets/logomark.svg";
import { DeviceFrame } from "@/components/live/device-frame";
import { Icon } from "@/components/live/icon-sprite";
import { useFlow } from "@/components/live/flow-context";
import {
  WALLET_ADDRESS_FULL,
  WALLET_ADDRESS_SHORT,
} from "@/components/live/mock-data";

const BENEFITS = [
  {
    icon: "wallet",
    title: "Pay in stablecoins (USDC and more)",
    description: "No card fees, no foreign markup, no surprise declines",
  },
  {
    icon: "cellular",
    title: "Top up without the card",
    description: "No card details to type again",
  },
  {
    icon: "lock",
    title: "Own it",
    description: "Funds stay on this phone, not with us",
  },
  {
    icon: "arrow-up",
    title: "Move leftover balance",
    description: "Send unused balance to anyone",
  },
];

const CREATE_BENEFITS = [
  {
    icon: "lock",
    title: "Own it",
    description: "Kokio can never move your funds",
  },
  { icon: "wallet", title: "Card still works", description: "Nothing changes" },
  {
    icon: "cellular",
    title: "Every eSIM gets a wallet",
    description: "Top-ups without re-entering card details",
  },
];

/**
 * Step 06 — Wallet. Mirrors the app's Wallet tab as the main screen: the pre-wallet "What a Kokio wallet adds"
 * pitch, the Create wallet page, then the created wallet's dashboard (hero card, Send / Receive / Deposit, Buy eSIMs with USDC, tokens, transactions, contacts).
 * Balance, tokens, transactions and contacts are empty on purpose, matching a fresh wallet in the app.
 */
export function StepWalletVisual() {
  const { walletState, createWallet } = useFlow();
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);

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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {creating ? (
          <div className="w-create">
            <button
              type="button"
              className="w-create-back"
              aria-label="Go back"
              onClick={() => setCreating(false)}
            >
              <Icon name="chev-back" />
            </button>
            <div className="w-create-icon">
              <Icon name="fingerprint" />
            </div>
            <h4>Just Face ID.</h4>
            <p>
              Kokio wallet lives on this phone and signs with the Face ID
              already in use.
            </p>
            {CREATE_BENEFITS.map((b) => (
              <div className="w-benefit" key={b.title}>
                <span className="w-benefit-icon">
                  <Icon name={b.icon} />
                </span>
                <div>
                  <div className="w-benefit-title">{b.title}</div>
                  <div className="w-benefit-desc">{b.description}</div>
                </div>
              </div>
            ))}
            <div className="w-create-actions">
              <button
                type="button"
                className="a-cta-btn"
                style={{ gap: 8 }}
                onClick={() => {
                  createWallet();
                  setCreating(false);
                }}
              >
                <Icon name="fingerprint" style={{ width: 20, height: 20 }} />
                Create with Face ID
              </button>
              <button
                type="button"
                className="w-create-skip"
                onClick={() => setCreating(false)}
              >
                Keep using my card
              </button>
            </div>
          </div>
        ) : walletState !== "ready" ? (
          <>
            <div className="a-card w-panel">
              <div className="w-title">What a Kokio wallet adds</div>
              <div className="w-desc">
                Paying by card works fine. Here&apos;s what changes with a
                wallet.
              </div>
              {BENEFITS.map((b) => (
                <div className="w-benefit" key={b.title}>
                  <span className="w-benefit-icon">
                    <Icon name={b.icon} />
                  </span>
                  <div>
                    <div className="w-benefit-title">{b.title}</div>
                    <div className="w-small">{b.description}</div>
                  </div>
                </div>
              ))}
              <a
                className="w-link"
                href="https://kokio.app/blogs/where-your-sim-data-goes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-small">Why not just a card?</span>
                <span className="w-link-strong">
                  The hidden cost of freedom of connectivity →
                </span>
              </a>
            </div>

            <div className="a-card w-panel w-panel--outlined">
              <div className="w-title-row">
                <span className="w-title">
                  <Icon
                    name={walletState === "deploying" ? "clock" : "fingerprint"}
                  />
                  {walletState === "deploying"
                    ? "Setting up your wallet"
                    : "Add a Kokio wallet"}
                </span>
              </div>
              <div className="w-desc">
                {walletState === "deploying"
                  ? "This can take a few minutes. Purchases are restricted at the moment, feel free to explore plans."
                  : "Optional, do this anytime, setup in a second and the card keeps working."}
              </div>
              {walletState === "deploying" ? (
                <span
                  className="a-spinner"
                  role="status"
                  aria-label="Setting up your wallet"
                />
              ) : (
                <button
                  type="button"
                  className="a-cta-btn"
                  onClick={() => setCreating(true)}
                >
                  Create wallet
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-hero">
              <div className="w-hero-top">
                <span className="w-badge">TESTNET</span>
                <Image
                  src={Logomark}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
              </div>
              <div className="w-hero-label">Total balance</div>
              <div className="w-hero-balance">
                <span>$0</span>
                <small>USD</small>
              </div>
              <div className="w-hero-address">
                <span>{WALLET_ADDRESS_SHORT}</span>
                <Icon name="external" />
                <button
                  type="button"
                  onClick={copyAddress}
                  aria-label="Copy wallet address"
                >
                  <Icon
                    name={copied ? "check" : "copy"}
                    style={copied ? { color: "var(--app-success)" } : undefined}
                  />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "arrow-up", label: "Send", bg: "var(--app-warning)" },
                {
                  icon: "arrow-down",
                  label: "Receive",
                  bg: "var(--app-success)",
                },
                { icon: "deposit", label: "Deposit", bg: "#007aff" },
              ].map((item) => (
                <div className="a-card w-action" key={item.label}>
                  <span
                    className="w-action-icon"
                    style={{ background: item.bg }}
                  >
                    <Icon name={item.icon} />
                  </span>
                  <span className="w-action-label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="a-card w-row">
              <span
                className="w-action-icon w-action-icon--square"
                style={{ background: "var(--app-cta-bg)" }}
              >
                <Icon name="flash" />
              </span>
              <div style={{ flex: 1 }}>
                <div className="w-benefit-title">Buy eSIMs with USDC</div>
                <div className="w-small">No card, no personal details</div>
              </div>
              <Icon name="chev-fwd" style={{ width: 18, height: 18 }} />
            </div>

            <div className="a-card w-panel w-panel--slim">
              <div className="w-small">Your Tokens</div>
              <div className="w-desc" style={{ margin: "14px 0 2px" }}>
                You don&apos;t hold any tokens yet.
              </div>
            </div>

            <div className="a-card w-panel w-panel--slim">
              <div className="w-small">Transactions</div>
              <div className="w-desc" style={{ margin: "14px 0 2px" }}>
                No Transactions to show
              </div>
            </div>

            <div className="a-card w-panel w-panel--slim">
              <div className="w-small">Contacts</div>
              <div className="w-contact">
                <span className="w-contact-add">+</span>
                <span className="w-small">Add new</span>
              </div>
            </div>
          </>
        )}
      </div>
    </DeviceFrame>
  );
}
