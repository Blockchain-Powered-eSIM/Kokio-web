"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/live/device-frame";
import { Icon } from "@/components/live/icon-sprite";
import { useLiveTheme } from "@/components/live/theme-context";
import { SETTINGS_MENU } from "@/components/live/mock-data";
import { DELETE_ACCOUNT, SETTINGS_ABOUT, SETTINGS_CONTACT } from "@/components/live/content";

type Panel = "list" | "about" | "contact" | "delete";

const ABOUT_TEXT_STYLE = {
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "var(--app-text)",
  opacity: 0.9,
  margin: "0 0 12px",
} as const;

/**
 * Step 07 — Settings (app/(tabs)/settings.tsx + DeleteAccountModal.tsx).
 */
export function StepSettingsVisual() {
  const { theme, setTheme } = useLiveTheme();
  const [panel, setPanel] = useState<Panel>("list");
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");
  const isDark = theme === "dark";

  function resetDelete() {
    setDeleteInput("");
    setDeleteStatus("");
    setPanel("list");
  }

  function confirmDelete() {
    if (deleteInput.trim() !== "DELETE") return;
    setDeleteStatus("Deleting your account…");
    setTimeout(() => setDeleteStatus("This is a preview — no account was deleted."), 700);
    setTimeout(resetDelete, 2200);
  }

  return (
    <DeviceFrame sourceTag="Account, privacy & settings">
      <div style={{ padding: "0 4px 4px" }}>
        <b style={{ fontSize: 16, color: "var(--app-text)" }}>Settings</b>
      </div>

      {panel === "list" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SETTINGS_MENU.map((item, i) => {
            const isToggle = "toggle" in item && item.toggle;
            const iconName = isToggle ? (isDark ? "moon" : "sun") : item.icon;
            const label = isToggle ? (isDark ? "Dark Mode" : "Light Mode") : item.label;
            const disabled = "disabled" in item && item.disabled;
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  if (isToggle) {
                    setTheme(isDark ? "light" : "dark");
                  } else if ("href" in item && item.href) {
                    window.open(item.href, "_blank", "noopener");
                  } else if ("view" in item && (item.view === "about" || item.view === "contact" || item.view === "delete")) {
                    setPanel(item.view);
                  } else if ("view" in item && item.view === "logout") {
                    document.getElementById("step-auth")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{
                  all: "unset",
                  cursor: disabled ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  padding: 16,
                  opacity: disabled ? 0.4 : 1,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Icon
                    name={iconName}
                    style={{
                      width: 22,
                      height: 22,
                      color: isToggle ? "var(--app-text)" : disabled ? "var(--app-inactive)" : "#ffffff",
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 500, color: disabled ? "var(--app-inactive)" : "var(--app-text)" }}>
                    {label}
                  </span>
                </span>
                {isToggle ? (
                  <span
                    style={{
                      width: 38,
                      height: 22,
                      borderRadius: 999,
                      background: isDark ? "var(--app-primary)" : "var(--app-muted)",
                      position: "relative",
                      flex: "none",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        left: isDark ? 18 : 2,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "var(--app-text)",
                        transition: "left .15s",
                      }}
                    />
                  </span>
                ) : (
                  <Icon name="chev-fwd" style={{ width: 15, height: 15, color: disabled ? "var(--app-inactive)" : "#ffffff" }} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {panel === "about" && (
        <div style={{ background: "var(--app-bg)", padding: 4 }}>
          <PanelHeader title="About" onClose={() => setPanel("list")} />
          {SETTINGS_ABOUT.lines.map((line) => (
            <p key={line} style={ABOUT_TEXT_STYLE}>
              {line}
            </p>
          ))}
          <p style={ABOUT_TEXT_STYLE}>
            {SETTINGS_ABOUT.basedOn.text}
            <a href={SETTINGS_ABOUT.basedOn.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--app-link)", textDecoration: "underline" }}>
              {SETTINGS_ABOUT.basedOn.linkLabel}
            </a>
          </p>
          <p style={ABOUT_TEXT_STYLE}>{SETTINGS_ABOUT.privacyLine}</p>
          <p style={ABOUT_TEXT_STYLE}>
            {SETTINGS_ABOUT.website.text}
            <a href={SETTINGS_ABOUT.website.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--app-link)", textDecoration: "underline" }}>
              {SETTINGS_ABOUT.website.linkLabel}
            </a>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--app-text)", opacity: 0.9, marginTop: 4 }}>
            Follow us on socials
            <span style={{ display: "flex", gap: 8 }}>
              {SETTINGS_ABOUT.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    background: "var(--app-item-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="close" style={{ width: 14, height: 14, color: "var(--app-link)" }} />
                </a>
              ))}
            </span>
          </div>
        </div>
      )}

      {panel === "contact" && (
        <div style={{ background: "var(--app-bg)", padding: 4 }}>
          <PanelHeader title="Contact Support" onClose={() => setPanel("list")} />
          <a href={`mailto:${SETTINGS_CONTACT.email}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, padding: "14px 4px" }}>
            <Icon name="mail" style={{ width: 22, height: 22, color: "#ffffff", flex: "none" }} />
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 500, color: "var(--app-text)" }}>Email Us</span>
            <span style={{ fontSize: 13, color: "var(--app-link)", textDecoration: "underline" }}>{SETTINGS_CONTACT.email}</span>
          </a>
          <a
            href={SETTINGS_CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, padding: "14px 4px" }}
          >
            <Icon name="send" style={{ width: 22, height: 22, color: "#ffffff", flex: "none" }} />
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 500, color: "var(--app-text)" }}>Telegram</span>
            <Icon name="chev-fwd" style={{ width: 17, height: 17, color: "var(--app-icon)" }} />
          </a>
        </div>
      )}

      {panel === "delete" && (
        <div style={{ marginTop: 12, background: "var(--app-surface)", borderRadius: 20, padding: 20, fontSize: 13, lineHeight: 1.6, color: "var(--app-text)" }}>
          <div style={{ fontSize: 20, fontWeight: 300, marginBottom: 10 }}>{DELETE_ACCOUNT.title}</div>
          <p style={{ margin: "0 0 12px" }}>{DELETE_ACCOUNT.intro}</p>
          <ul style={{ margin: "0 0 14px", paddingLeft: 16, color: "var(--app-foreground2)", fontSize: 12, lineHeight: 1.5 }}>
            {DELETE_ACCOUNT.bullets.map((b) => (
              <li key={b} style={{ marginBottom: 6 }}>
                {b}
              </li>
            ))}
          </ul>
          <div style={{ fontSize: 12, color: "var(--app-foreground2)", marginBottom: 8 }}>{DELETE_ACCOUNT.confirmLabel}</div>
          <input
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value.toUpperCase())}
            placeholder="DELETE"
            autoCapitalize="characters"
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid var(--app-foreground2)",
              borderRadius: 14,
              padding: "12px 14px",
              fontSize: 15,
              letterSpacing: 2,
              color: "var(--app-text)",
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="button" className="a-btn a-btn-fgborder" style={{ height: 48 }} onClick={resetDelete}>
              Cancel
            </button>
            <button
              type="button"
              className="a-btn"
              disabled={deleteInput.trim() !== "DELETE"}
              onClick={confirmDelete}
              style={{ height: 48, background: "var(--app-destructive)", color: "#fff", opacity: deleteInput.trim() === "DELETE" ? 1 : 0.45 }}
            >
              Delete account
            </button>
          </div>
          <div className="a-muted" style={{ marginTop: 10, fontSize: 12, minHeight: 16 }}>
            {deleteStatus}
          </div>
        </div>
      )}
    </DeviceFrame>
  );
}

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid var(--app-muted)",
        paddingBottom: 12,
        marginBottom: 16,
      }}
    >
      <span style={{ fontSize: 20, fontWeight: 600, color: "var(--app-text)" }}>{title}</span>
      <button type="button" onClick={onClose} style={{ all: "unset", cursor: "pointer", display: "flex" }}>
        <Icon name="close" style={{ width: 22, height: 22, color: "var(--app-icon)" }} />
      </button>
    </div>
  );
}
