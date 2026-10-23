"use client";

import { useState, type ReactNode } from "react";
import { DeviceFrame } from "@/components/live/device-frame";
import { PhoneTabBar } from "@/components/live/phone-tabbar";
import { Icon } from "@/components/live/icon-sprite";
import {
  BACKUP_COUNTRY_PLANS,
  COUNTRY_PLANS,
  DATA_FILTERS,
  PLANS,
  PRICE_FILTERS,
  REGION_PLANS,
  SHOP_COUNTRIES,
  SHOP_REGIONS,
  VALIDITY_FILTERS,
  type CountryPlan,
  type Plan,
  type PlanCategory,
} from "@/components/live/mock-data";
import { SHOP_EXAMPLE_CAPTION } from "@/components/live/content";
import { useFlow } from "@/components/live/flow-context";

const CATEGORIES: PlanCategory[] = [
  "Countries",
  "Regions",
  "Global",
  "Special",
];

type Filters = { price: string; data: string; validity: string };
const NO_FILTERS: Filters = { price: "ANY", data: "ANY", validity: "ANY" };

type Detail =
  { kind: "country"; code: string } | { kind: "region"; name: string } | null;

function matchesFilters(plan: Plan, f: Filters): boolean {
  const price = Number(plan.price);
  const gb = Number(plan.gb);
  const days = Number(plan.days);
  const okPrice =
    f.price === "ANY" ||
    (f.price === "UNDER_5" && price < 5) ||
    (f.price === "5_15" && price >= 5 && price <= 15) ||
    (f.price === "15_PLUS" && price > 15);
  const okData =
    f.data === "ANY" ||
    (f.data === "UNDER_1GB" && gb <= 1) ||
    (f.data === "1_5GB" && gb > 1 && gb <= 5) ||
    (f.data === "5_10GB" && gb > 5 && gb <= 10) ||
    (f.data === "10GB_PLUS" && gb > 10);
  const okValidity =
    f.validity === "ANY" ||
    (f.validity === "UNDER_7D" && days > 0 && days <= 7) ||
    (f.validity === "7_30D" && days > 7 && days <= 30) ||
    (f.validity === "30_90D" && days > 30 && days <= 90) ||
    (f.validity === "90D_PLUS" && days > 90);
  return okPrice && okData && okValidity;
}

function filtersActive(f: Filters) {
  return f.price !== "ANY" || f.data !== "ANY" || f.validity !== "ANY";
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="13" y2="7" />
      <line x1="18" y1="7" x2="20" y2="7" />
      <circle cx="15.5" cy="7" r="2.5" />
      <line x1="4" y1="17" x2="6" y2="17" />
      <line x1="11" y1="17" x2="20" y2="17" />
      <circle cx="8.5" cy="17" r="2.5" />
    </svg>
  );
}

/** Flag image from flagcdn.com in a 1.6:1 box; unicode flag emoji don't render on all platforms. */
function FlagImg({ code }: { code: string }) {
  return (
    <span className="sh-flag-img">
      <img src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`} alt="" />
    </span>
  );
}

function FilterButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="sh-filter-btn"
      aria-label="Filter plans"
      onClick={onClick}
    >
      <FilterIcon />
      {active && <span className="sh-filter-dot" />}
    </button>
  );
}

function PlanCard({
  plan,
  onView,
}: {
  plan: Plan;
  onView: (plan: Plan) => void;
}) {
  return (
    <div className="a-card-wrap">
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
        <button
          type="button"
          className="a-view-btn"
          onClick={() => onView(plan)}
        >
          <b>${plan.price}</b>
          <span className="vb-right">
            <Icon name="cart" />
            <span>View</span>
          </span>
        </button>
      </div>
    </div>
  );
}

function PlanList({
  plans,
  active,
  onClear,
  onView,
  footer,
}: {
  plans: Plan[];
  active: boolean;
  onClear: () => void;
  onView: (plan: Plan) => void;
  footer?: ReactNode;
}) {
  return (
    <div className="sh-plan-list">
      {plans.length === 0 ? (
        <div className="sh-empty">
          {active ? (
            <>
              <div>No plans match your filters</div>
              <button type="button" className="sh-link" onClick={onClear}>
                Clear filters
              </button>
            </>
          ) : (
            <div>No Plans found</div>
          )}
        </div>
      ) : (
        plans.map((plan) => (
          <PlanCard
            key={`${plan.country}-${plan.days}-${plan.gb}`}
            plan={plan}
            onView={onView}
          />
        ))
      )}
      {footer}
    </div>
  );
}

/** Step 02 — Explore plans (Home + Shop tab): search + filter, Countries/Regions/Global/Special, country and region plan lists. */
export function StepShopVisual() {
  const flow = useFlow();
  const screen = flow.shopScreen;
  const setScreen = flow.setShopScreen;
  const [category, setCategory] = useState<PlanCategory>("Countries");
  const [detail, setDetail] = useState<Detail>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [draft, setDraft] = useState<Filters>(NO_FILTERS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [network, setNetwork] = useState<string | null>(null);
  const [showBackup, setShowBackup] = useState(false);

  const active = filtersActive(filters);
  const query = search.trim().toLowerCase();

  function resetShop() {
    setCategory("Countries");
    setDetail(null);
    setSearch("");
    setNetwork(null);
    setShowBackup(false);
  }

  function openCountry(code: string) {
    setNetwork(null);
    setShowBackup(false);
    setDetail({ kind: "country", code });
  }

  function openSheet() {
    setDraft(filters);
    setSheetOpen(true);
  }

  function clearFilters() {
    setFilters(NO_FILTERS);
    setNetwork(null);
  }

  function renderHome() {
    const bought = flow.completedPlan;
    return (
      <div>
        <div className="a-hero">
          <div className="a-hero-imgwrap">
            <img
              className="a-hero-bg"
              src="/live/home-hero-sunburst.png"
              alt=""
            />
            <img
              className="a-hero-flagsimg"
              src="/live/home-hero-flags.png"
              alt=""
            />
          </div>
          <div className="a-hero-footer">
            <div>
              <div className="a-hero-title">Plan My Next Adventure</div>
              <div className="a-hero-sub">The world is waiting</div>
            </div>
            <button
              type="button"
              className="a-hero-btn"
              aria-label="Shop for eSIM plans"
              onClick={() => setScreen("shop")}
            >
              Shop
            </button>
          </div>
        </div>

        <div className="sh-home-heading">eSIMs</div>
        {bought ? (
          <div className="a-card-wrap">
            <span
              className="a-flag"
              style={{ fontSize: 26, top: -8, right: 20 }}
            >
              {bought.flag}
            </span>
            <div className="esim-card">
              <div
                className="a-country"
                style={{ fontSize: 17, paddingRight: 56 }}
              >
                {bought.country}
              </div>
              <div className="a-statrow">
                <span className="a-stat">
                  <Icon name="calendar" />
                  <b>{bought.days}</b>&nbsp;Days
                </span>
                <span className="a-stat">
                  <Icon name="cellular" />
                  <b>{bought.gb}</b>&nbsp;GB
                </span>
              </div>
              <button
                type="button"
                className="sh-install-btn"
                onClick={() => flow.goTo("install")}
              >
                <Icon name="download" />
                Quick install
              </button>
            </div>
          </div>
        ) : (
          <div className="a-card sh-empty-esim">
            <div style={{ fontSize: 24 }} aria-hidden="true">
              📶
            </div>
            <div className="sh-empty-title">No active eSIMs</div>
            <div className="sh-empty-sub">Purchased eSIMs will appear here</div>
          </div>
        )}

        <div className="sh-home-heading">Wallet</div>
        <div className="a-card">
          {flow.walletState === "ready" ? (
            <>
              <div className="w-title-row">
                <span className="w-title">
                  <Icon name="wallet" />
                  Kokio wallet
                </span>
                <span className="w-title">$0.00</span>
              </div>
              <div className="w-desc">
                Pays for eSIMs and top-ups, signed with Face ID.
              </div>
              <button
                type="button"
                className="a-cta-btn"
                onClick={() => flow.goTo("wallet")}
              >
                Open wallet
              </button>
            </>
          ) : flow.walletState === "deploying" ? (
            <>
              <div className="w-title-row">
                <span className="w-title">
                  <Icon name="clock" />
                  Setting up your wallet
                </span>
              </div>
              <div className="w-desc">
                This can take a few minutes. Purchases are restricted at the
                moment, feel free to explore plans.
              </div>
              <span
                className="a-spinner"
                role="status"
                aria-label="Setting up your wallet"
              />
            </>
          ) : (
            <>
              <div className="w-title-row">
                <span className="w-title">
                  <Icon name="fingerprint" />
                  Add a Kokio wallet
                </span>
              </div>
              <div className="w-desc">
                Unlock with Face ID. Simple, Fast and Secure.
              </div>
              <button
                type="button"
                className="a-cta-btn"
                onClick={() => flow.goTo("wallet")}
              >
                Create wallet
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  function renderSearchResults() {
    const countries = SHOP_COUNTRIES.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
    const regions = SHOP_REGIONS.filter((r) =>
      r.name.toLowerCase().includes(query)
    );
    return (
      <div>
        {countries.length > 0 && (
          <div className="sh-grid">
            {countries.map((c) => (
              <button
                key={c.code}
                type="button"
                className="sh-country"
                onClick={() => {
                  setSearch("");
                  openCountry(c.code);
                }}
              >
                <FlagImg code={c.code} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )}
        <div className="sh-multi-row">
          <div>
            <b>Plans for several countries</b>
            <span>Find one plan that covers your whole trip</span>
          </div>
          <Icon name="chev-fwd" />
        </div>
        <div className="sh-section-title">Regions</div>
        {regions.length === 0 ? (
          <div className="sh-empty">No regions found</div>
        ) : (
          regions.map((r) => (
            <button
              key={r.name}
              type="button"
              className="sh-region-row"
              onClick={() => {
                setSearch("");
                setDetail({ kind: "region", name: r.name });
              }}
            >
              {r.name}
            </button>
          ))
        )}
      </div>
    );
  }

  function renderDetail(d: NonNullable<Detail>) {
    if (d.kind === "region") {
      const plans = (REGION_PLANS[d.name] ?? []).filter((p) =>
        matchesFilters(p, filters)
      );
      return (
        <PlanList
          plans={plans}
          active={active}
          onClear={clearFilters}
          onView={flow.choosePlan}
        />
      );
    }
    const base: CountryPlan[] = [
      ...(COUNTRY_PLANS[d.code] ?? []),
      ...(showBackup ? (BACKUP_COUNTRY_PLANS[d.code] ?? []) : []),
    ];
    const networks = Array.from(new Set(base.map((p) => p.network))).sort();
    const visible = base
      .filter((p) => network === null || p.network === network)
      .map((p) => p.plan)
      .filter((p) => matchesFilters(p, filters));
    return (
      <div>
        {networks.length > 1 && (
          <div className="sh-chips">
            <button
              type="button"
              className={`sh-chip${network === null ? "sel" : ""}`}
              onClick={() => setNetwork(null)}
            >
              All
            </button>
            {networks.map((n) => (
              <button
                key={n}
                type="button"
                className={`sh-chip${network === n ? "sel" : ""}`}
                onClick={() => setNetwork(n)}
              >
                {n}
              </button>
            ))}
          </div>
        )}
        <PlanList
          plans={visible}
          active={active || network !== null}
          onClear={clearFilters}
          onView={flow.choosePlan}
          footer={
            showBackup ? null : (
              <button
                type="button"
                className="sh-pill-btn"
                onClick={() => setShowBackup(true)}
              >
                <Icon name="download" />
                Show more plans
              </button>
            )
          }
        />
      </div>
    );
  }

  function renderShop() {
    if (detail) {
      const title =
        detail.kind === "country"
          ? (SHOP_COUNTRIES.find((c) => c.code === detail.code)?.name ?? "")
          : detail.name;
      return (
        <div>
          <div className="sh-header">
            <button
              type="button"
              className="sh-back"
              aria-label="Back"
              onClick={() => {
                setDetail(null);
                setNetwork(null);
              }}
            >
              <Icon name="chev-back" />
            </button>
            <span className="sh-header-title">{title}</span>
            <FilterButton active={active} onClick={openSheet} />
          </div>
          {renderDetail(detail)}
        </div>
      );
    }

    return (
      <div>
        <div className="sh-header sh-header--root">
          <span className="sh-header-title">Shop</span>
        </div>
        <div className="sh-search-row">
          <label className="sh-search">
            <Icon name="search" />
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
              <button
                type="button"
                className="sh-search-clear"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <Icon name="close" />
              </button>
            )}
          </label>
          <FilterButton active={active} onClick={openSheet} />
        </div>

        {query ? (
          renderSearchResults()
        ) : (
          <>
            <div
              className="segmented"
              style={{
                background: "var(--app-muted)",
                width: "100%",
                marginTop: 12,
              }}
            >
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

            <div style={{ marginTop: 14 }}>
              {category === "Countries" && (
                <div className="sh-grid">
                  {SHOP_COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className="sh-country"
                      onClick={() => openCountry(c.code)}
                    >
                      <FlagImg code={c.code} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
              {category === "Regions" && (
                <div className="sh-regions">
                  {SHOP_REGIONS.map((r) => (
                    <button
                      key={r.name}
                      type="button"
                      className="sh-region"
                      onClick={() =>
                        setDetail({ kind: "region", name: r.name })
                      }
                    >
                      <span className="sh-region-name">{r.name}</span>
                      <img src={r.image} alt="" />
                    </button>
                  ))}
                </div>
              )}
              {(category === "Global" || category === "Special") && (
                <PlanList
                  plans={PLANS[category].filter((p) =>
                    matchesFilters(p, filters)
                  )}
                  active={active}
                  onClear={clearFilters}
                  onView={flow.choosePlan}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <DeviceFrame sourceTag="Explore" caption={SHOP_EXAMPLE_CAPTION}>
      <div className="sh-screen">
        {screen === "home" ? renderHome() : renderShop()}

        <div
          className="a-card"
          style={{ padding: 0, overflow: "hidden", marginTop: 14 }}
        >
          <PhoneTabBar
            active={screen === "home" ? "home" : "shop"}
            onNavigate={(tab) => {
              if (tab === "home") setScreen("home");
              if (tab === "shop") {
                resetShop();
                setScreen("shop");
              }
              if (tab === "wallet") flow.goTo("wallet");
            }}
          />
        </div>

        {sheetOpen && (
          <div
            className="sh-sheet-backdrop"
            onClick={() => setSheetOpen(false)}
            role="presentation"
          >
            <div
              className="sh-sheet"
              role="dialog"
              aria-label="Filter Plans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sh-sheet-handle" />
              <div className="sh-sheet-title">Filter Plans</div>
              {(
                [
                  ["Price", "price", PRICE_FILTERS],
                  ["Data", "data", DATA_FILTERS],
                  ["Validity", "validity", VALIDITY_FILTERS],
                ] as const
              ).map(([label, field, options]) => (
                <div key={field}>
                  <div className="sh-sheet-section">{label}</div>
                  <div className="sh-sheet-chips">
                    {options.map((o) => (
                      <button
                        key={o.key}
                        type="button"
                        className={`sh-chip${draft[field] === o.key ? "sel" : ""}`}
                        onClick={() => setDraft({ ...draft, [field]: o.key })}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="sh-sheet-footer">
                <button
                  type="button"
                  className="sh-link"
                  onClick={() => setDraft(NO_FILTERS)}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="sh-apply"
                  onClick={() => {
                    setFilters(draft);
                    setSheetOpen(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DeviceFrame>
  );
}
