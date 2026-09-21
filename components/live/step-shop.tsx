"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/live/device-frame";
import { PhoneTabBar } from "@/components/live/phone-tabbar";
import { Icon } from "@/components/live/icon-sprite";
import { PLANS, type PlanCategory } from "@/components/live/mock-data";
import { useFlow } from "@/components/live/flow-context";

const CATEGORIES: PlanCategory[] = ["Countries", "Regions", "Global", "Special"];

/** Step 02 — Browse & compare (Home hero card + Shop tabs).
 * The visitor here landing on the Home shop card — they tap Shop themselves
 * to reach the browsing screen */
export function StepShopVisual() {
  const flow = useFlow();
  const screen = flow.shopScreen;
  const setScreen = flow.setShopScreen;
  const [category, setCategory] = useState<PlanCategory>("Countries");

  return (
    <DeviceFrame sourceTag="Browse & compare">
      <div className="a-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 16px 4px" }}>
          {screen === "home" ? (
            <div>
              <div className="a-sublabel" style={{ margin: "0 0 8px" }}>
                Home
              </div>
              <div className="a-hero">
                <div className="a-hero-imgwrap">
                  <img className="a-hero-bg" src="/live/home-hero-sunburst.png" alt="" />
                  <img className="a-hero-flagsimg" src="/live/home-hero-flags.png" alt="" />
                </div>
                <div className="a-hero-footer">
                  <div>
                    <div className="a-hero-title">Plan Your Next Adventure</div>
                    <div className="a-hero-sub">The world awaits you!</div>
                  </div>
                  <button type="button" className="a-hero-btn" onClick={() => setScreen("shop")}>
                    Shop
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="segmented" style={{ background: "var(--app-muted)", width: "100%" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={category === cat ? "active" : ""}
                    style={{ flex: 1 }}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 14 }}>
                {PLANS[category].map((plan) => (
                  <div className="a-card-wrap" key={plan.country}>
                    <span className="a-flag" style={{ fontSize: 26, top: -8, right: 20 }}>
                      {plan.flag}
                    </span>
                    <div className="esim-card">
                      <div className="a-country" style={{ fontSize: 17, paddingRight: 56 }}>
                        {plan.country}
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
                      <button type="button" className="a-view-btn" onClick={() => flow.choosePlan(plan)}>
                        <b>${plan.price}</b>
                        <span className="vb-right">
                          <Icon name="cart" />
                          <span>View</span>
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 14 }}>
          <PhoneTabBar
            active={screen === "home" ? "home" : "shop"}
            onNavigate={(tab) => {
              if (tab === "home" || tab === "shop") setScreen(tab);
            }}
          />
        </div>
      </div>
    </DeviceFrame>
  );
}
