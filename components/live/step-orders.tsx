"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/live/icon-sprite";
import { ORDERS, HOME_ESIM_DETAIL, type Order } from "@/components/live/mock-data";
import { useFlow } from "@/components/live/flow-context";

type CopyRow = { label: string; value: string; display?: string };

function PurchaseDetailsSheet({ order, onClose }: { order: Order; onClose: () => void }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const rows: CopyRow[] = [];
  if (order.iccid) rows.push({ label: "ICCID", value: order.iccid });
  if (order.supportRef) rows.push({ label: "Reference", value: order.supportRef });
  if (order.lpa) rows.push({ label: "LPA String", value: order.lpa, display: "Install using this code in SIM settings" });

  function copy(key: string, value: string) {
    try {
      navigator.clipboard?.writeText(value);
    } catch {
      // clipboard access can be blocked — the visual "copied" state still runs
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        overflow: "hidden",
        background: "rgba(0,0,0,.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 5,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          background: "var(--app-card)",
          borderRadius: "20px 20px 0 0",
          padding: "0 20px 28px",
          maxHeight: "88%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 4 }}>
          <span style={{ width: 36, height: 4, borderRadius: 2, background: "var(--app-muted)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, paddingTop: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "var(--app-card-fg)" }}>Purchase Details</span>
          <button type="button" onClick={onClose} style={{ all: "unset", cursor: "pointer", display: "flex" }}>
            <Icon name="close" style={{ width: 24, height: 24, color: "var(--app-muted-fg)" }} />
          </button>
        </div>
        <div style={{ overflowY: "auto" }}>
          {rows.map((row) => (
            <button
              key={row.label}
              type="button"
              onClick={() => copy(row.label, row.value)}
              style={{
                all: "unset",
                boxSizing: "border-box",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--app-muted)",
                cursor: "pointer",
              }}
            >
              <div style={{ flex: 1, marginRight: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".03em", textTransform: "uppercase", color: "var(--app-inactive)", marginBottom: 3 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: 13, color: "var(--app-card-fg)" }}>{row.display || row.value}</div>
              </div>
              <Icon
                name={copiedKey === row.label ? "check" : "copy"}
                style={{ width: 18, height: 18, color: copiedKey === row.label ? "var(--app-success)" : "var(--app-muted-fg)", flex: "none" }}
              />
            </button>
          ))}
          {order.paymentMethod && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--app-muted)" }}>
              <span style={{ fontSize: 13, color: "var(--app-inactive)" }}>Payment Method</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--app-card-fg)" }}>{order.paymentMethod}</span>
            </div>
          )}
          {order.invoiceUrl && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--app-muted)" }}>
              <span style={{ fontSize: 13, color: "var(--app-inactive)" }}>Invoice</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--app-link)" }}>View invoice →</span>
            </div>
          )}
          {order.planHistory?.length ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--app-inactive)", marginTop: 16, marginBottom: 4 }}>
                Plan History
              </div>
              {order.planHistory.map((entry) => (
                <div key={entry.planId} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--app-muted)" }}>
                  <span style={{ fontSize: 13, color: "var(--app-card-fg)" }}>{entry.planId}</span>
                  <span style={{ fontSize: 12, color: "var(--app-inactive)" }}>
                    {entry.validity}d · {new Date(entry.purchaseDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Renders the order card as a real <button> when it's expandable (so
 * keyboard/screen-reader users can toggle it, not just mouse clickers),
 * otherwise a plain non-interactive <div> — matches the artifact's own
 * distinction between expandable and static order cards. */
function CardWrapTag({
  expandable,
  expanded,
  onToggle,
  children,
}: {
  expandable: boolean;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  if (!expandable) {
    return <div className="a-card-wrap">{children}</div>;
  }
  return (
    <button
      type="button"
      className="a-card-wrap"
      aria-expanded={expanded}
      onClick={onToggle}
      style={{ all: "unset", position: "relative", width: "100%", display: "block", textAlign: "left", cursor: "pointer" }}
    >
      {children}
    </button>
  );
}

function OrdersTabView() {
  const flow = useFlow();
  const [openId, setOpenId] = useState<string | null>(null);
  const [pdOrder, setPdOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (flow.completedOrderId) setOpenId(flow.completedOrderId);
  }, [flow.completedOrderId]);

  const orders = ORDERS.map((order) =>
    order.id === flow.completedOrderId && flow.completedPlan
      ? {
          ...order,
          plan: flow.completedPlan.country,
          flag: flow.completedPlan.flag,
          days: flow.completedPlan.days,
          gb: flow.completedPlan.gb,
        }
      : order
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.map((order) => {
          const expanded = openId === order.id;
          return (
            <div key={order.id} style={{ cursor: order.expandable ? "pointer" : "default" }}>
              <CardWrapTag
                expandable={order.expandable}
                expanded={expanded}
                onToggle={() => setOpenId(expanded ? null : order.id)}
              >
                <span className="a-flag" style={{ fontSize: 26, top: -6, right: 16 }}>
                  {order.flag}
                </span>
                <div className="esim-card">
                  <div className="a-country" style={{ fontSize: 17, paddingRight: 56 }}>
                    {order.plan}
                  </div>
                  <div className="a-statrow">
                    <span className="a-stat">
                      <Icon name="calendar" />
                      <b>{order.days}</b>&nbsp;Days
                    </span>
                    <span className="a-stat">
                      <Icon name="cellular" />
                      <b>{order.gb}</b>&nbsp;GB
                    </span>
                    <span className="a-stat">
                      <Icon name="call" />
                      <b>{order.mins}</b>&nbsp;Mins
                    </span>
                    <span className="a-stat">
                      <Icon name="chat" />
                      <b>{order.sms}</b>&nbsp;SMS
                    </span>
                  </div>
                </div>
              </CardWrapTag>
              <div className="a-order-meta">
                <span
                  className="a-pill"
                  style={{
                    background: `color-mix(in srgb, ${order.pillTone === "warning" ? "var(--app-warning)" : "var(--app-success)"} 20%, transparent)`,
                    color: order.pillTone === "warning" ? "var(--app-warning)" : "var(--app-success)",
                  }}
                >
                  {order.pill}
                </span>
                {order.expandable ? (
                  <Icon name={expanded ? "chev-up" : "chev-down"} className="a-chevron" />
                ) : order.note ? (
                  <span className="a-muted" style={{ marginLeft: "auto", fontSize: 11 }}>
                    {order.note}
                  </span>
                ) : null}
              </div>
              {expanded && (
                <div className="a-detail">
                  <div className="a-action-row">
                    {order.install && (
                      <button
                        type="button"
                        className="a-btn a-btn-primary"
                        style={{ flex: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById("step-install")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <Icon name="download" />
                        Install eSIM
                      </button>
                    )}
                    <button
                      type="button"
                      className="a-btn a-btn-outline"
                      style={{ flex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPdOrder(order);
                      }}
                    >
                      <Icon name="receipt" />
                      Purchase Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {pdOrder && <PurchaseDetailsSheet order={pdOrder} onClose={() => setPdOrder(null)} />}
    </div>
  );
}

function HomeEsimDetailView() {
  const barColor =
    HOME_ESIM_DETAIL.usedPct > 40 ? "var(--app-success)" : HOME_ESIM_DETAIL.usedPct > 15 ? "var(--app-warning)" : "var(--app-destructive)";
  return (
    <div className="a-card-wrap">
      <span className="a-flag" style={{ fontSize: 26, top: -6, right: 16 }}>
        {HOME_ESIM_DETAIL.flag}
      </span>
      <div className="esim-card">
        <div className="a-country" style={{ fontSize: 17, paddingRight: 56 }}>
          {HOME_ESIM_DETAIL.plan}
        </div>
        <div className="a-statrow">
          <span className="a-stat">
            <Icon name="calendar" />
            <b>{HOME_ESIM_DETAIL.days}</b>&nbsp;Days
          </span>
          <span className="a-stat">
            <Icon name="cellular" />
            <b>{HOME_ESIM_DETAIL.gb}</b>&nbsp;GB
          </span>
        </div>
      </div>
      <div className="a-detail">
        <div className="a-summary-row">
          <span className="lbl">Data Remaining</span>
          <span className="val">{HOME_ESIM_DETAIL.remaining}</span>
        </div>
        <div className="a-usage-track">
          <div className="a-usage-fill" style={{ width: `${HOME_ESIM_DETAIL.usedPct}%`, background: barColor }} />
        </div>
        <div className="a-summary-row">
          <span className="lbl">Status</span>
          <span className="val" style={{ color: "var(--app-success)" }}>
            {HOME_ESIM_DETAIL.status}
          </span>
        </div>
        <div className="a-summary-row">
          <span className="lbl">ICCID</span>
          <span className="val mono">{HOME_ESIM_DETAIL.iccid}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 04 — Orders + the separate Home eSIM-detail screen. The artifact
 * originally conflated these into one view; the mobile source shows
 * they're two different screens (see AppLiveTasks.md accuracy table), so
 * this mockup keeps them as an explicit toggle rather than pretending
 * they're one expand panel.
 */
export function StepOrdersVisual() {
  const [screen, setScreen] = useState<"orders" | "detail">("orders");

  return (
    <div>
      <div className="src-tag">Track your order</div>
      <div className="stage" style={{ position: "relative" }}>
        <div className="phone">
          <div className="control-group" style={{ justifyContent: "center", margin: "0 0 14px" }}>
            <div className="segmented" style={{ background: "var(--app-muted)" }}>
              <button type="button" className={screen === "orders" ? "active" : ""} onClick={() => setScreen("orders")}>
                Orders tab
              </button>
              <button type="button" className={screen === "detail" ? "active" : ""} onClick={() => setScreen("detail")}>
                Home · eSIM detail
              </button>
            </div>
          </div>
          {screen === "orders" ? <OrdersTabView /> : <HomeEsimDetailView />}
        </div>
      </div>
    </div>
  );
}
