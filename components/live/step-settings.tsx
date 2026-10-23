"use client";

import { useState, type CSSProperties } from "react";
import { DeviceFrame } from "@/components/live/device-frame";
import { Icon } from "@/components/live/icon-sprite";
import { useLiveTheme } from "@/components/live/theme-context";
import { SETTINGS_MENU, SETTINGS_THEME_MODES } from "@/components/live/mock-data";
import {
  DELETE_ACCOUNT,
  SETTINGS_ABOUT,
  SETTINGS_CONTACT,
  SETTINGS_DELETED,
} from "@/components/live/content";

type ThemeMode = (typeof SETTINGS_THEME_MODES)[number]["value"];

type Panel = "list" | "about" | "contact" | "delete" | "deleted";

const ABOUT_TEXT_STYLE = {
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "var(--app-text)",
  opacity: 0.9,
  margin: "0 0 12px",
} as const;

// Sprite lacks these two glyphs (Ionicons gift-outline / contrast-outline), so draw them inline.
function SettingsIcon({ name, style }: { name: string; style?: CSSProperties }) {
  if (name === "gift") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
        <rect x="3.5" y="8" width="17" height="4" rx="1" />
        <path d="M5 12v8h14v-8M12 8v12M12 8c-1-3.5-5-4-5-1.6C7 8 9 8 12 8zM12 8c1-3.5 5-4 5-1.6C17 8 15 8 12 8z" />
      </svg>
    );
  }
  if (name === "contrast") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
      </svg>
    );
  }
  return <Icon name={name} style={style} />;
}

/**
 * Step 07 — Settings.
 */
export function StepSettingsVisual() {
  const { theme, setTheme } = useLiveTheme();
  const [panel, setPanel] = useState<Panel>("list");
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");
  // "System" follows the OS; remember which theme it resolved to so an outside
  // change (the page-level toggle) drops the selection back to Day/Night.
  const [systemApplied, setSystemApplied] = useState<{ theme: "light" | "dark" } | null>(null);
  const selectedMode: ThemeMode = systemApplied && systemApplied.theme === theme ? "system" : theme;
  const isDark = theme === "dark";

  function pickMode(mode: ThemeMode) {
    if (mode === "system") {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setSystemApplied({ theme: sys });
      setTheme(sys);
    } else {
      setSystemApplied(null);
      setTheme(mode);
    }
  }

  function resetDelete() {
    setDeleteInput("");
    setDeleteStatus("");
    setPanel("list");
  }

  function confirmDelete() {
    if (deleteInput.trim() !== "DELETE") return;
    setDeleteStatus("Deleting your account…");
    setTimeout(() => {
      setDeleteStatus("");
      setDeleteInput("");
      setPanel("deleted");
    }, 900);
  }

  function renderMenuItem(item: (typeof SETTINGS_MENU)[number], i: number) {
    const iconName = item.icon;
    const label = item.label;
    return (
      <button
        key={i}
        type="button"
        onClick={() => {
          if ("href" in item && item.href) {
            window.open(item.href, "_blank", "noopener");
          } else if ("view" in item && (item.view === "about" || item.view === "contact" || item.view === "delete")) {
            setPanel(item.view);
          } else if ("view" in item && item.view === "logout") {
            document.getElementById("step-auth")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: 16,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <SettingsIcon
            name={iconName}
            style={{ width: 22, height: 22, color: "#ffffff" }}
          />
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--app-text)" }}>
            {label}
          </span>
        </span>
        <Icon name="chev-fwd" style={{ width: 15, height: 15, color: "#ffffff" }} />
      </button>
    );
  }

  return (
    <DeviceFrame sourceTag="Account, privacy & settings">
      <div style={{ padding: "0 4px 4px", display: "flex", alignItems: "center", gap: 8 }}>
        {(panel === "about" || panel === "contact") && (
          <button type="button" aria-label="Back" onClick={() => setPanel("list")} style={{ all: "unset", cursor: "pointer", display: "flex" }}>
            <Icon name="chev-back" style={{ width: 20, height: 20, color: "var(--app-text)" }} />
          </button>
        )}
        <b style={{ fontSize: 16, color: "var(--app-text)" }}>
          {panel === "about" ? "About" : panel === "contact" ? "Contact Support" : "Settings"}
        </b>
      </div>

      {panel === "list" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SETTINGS_MENU.map((item, i) => renderMenuItem(item, i))}
          <div style={{ padding: "14px 16px", marginTop: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--app-text)", marginBottom: 12 }}>Display</div>
            <div style={{ display: "flex", gap: 8 }}>
              {SETTINGS_THEME_MODES.map((opt) => {
                const selected = selectedMode === opt.value;
                const tint = selected ? "var(--app-primary)" : isDark ? "var(--app-muted-fg)" : "var(--app-text)";
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-label={`Use ${opt.label} theme`}
                    aria-pressed={selected}
                    onClick={() => pickMode(opt.value)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "12px 0",
                      borderRadius: 12,
                      background: selected ? "var(--app-item-bg)" : "transparent",
                      color: tint,
                    }}
                  >
                    <SettingsIcon name={opt.icon} style={{ width: 22, height: 22, color: tint }} />
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: tint }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {panel === "about" && (
        <div style={{ background: "var(--app-bg)", padding: 4 }}>
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

      {panel === "deleted" && (
        <div style={{ marginTop: 12, background: "var(--app-surface)", borderRadius: 20, padding: 20, fontSize: 13, lineHeight: 1.6, color: "var(--app-text)" }}>
          <div style={{ fontSize: 20, fontWeight: 300, marginBottom: 10 }}>{SETTINGS_DELETED.title}</div>
          {SETTINGS_DELETED.body.map((p) => (
            <p key={p} style={{ margin: "0 0 12px" }}>
              {p}
            </p>
          ))}
          <ol style={{ margin: "0 0 12px", paddingLeft: 18, color: "var(--app-foreground2)", fontSize: 12, lineHeight: 1.6 }}>
            {SETTINGS_DELETED.steps.map((s) => (
              <li key={s} style={{ marginBottom: 4 }}>
                {s}
              </li>
            ))}
          </ol>
          <p style={{ margin: "0 0 4px", fontSize: 12, color: "var(--app-foreground2)" }}>{SETTINGS_DELETED.note}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="button" className="a-btn a-btn-fgborder" style={{ height: 48 }} onClick={resetDelete}>
              {SETTINGS_DELETED.openSettingsLabel}
            </button>
            <button type="button" className="a-btn a-btn-highlight" style={{ height: 48 }} onClick={resetDelete}>
              {SETTINGS_DELETED.doneLabel}
            </button>
          </div>
        </div>
      )}
    </DeviceFrame>
  );
}
