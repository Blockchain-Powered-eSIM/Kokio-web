/**
 * Simulated data for the /live guide , illustrative only, no real backend calls.
 */

export type PlanCategory = "Countries" | "Regions" | "Global" | "Special";

export type Plan = {
  country: string;
  flag: string;
  days: string;
  gb: string;
  price: string;
};

export const PLANS: Record<PlanCategory, Plan[]> = {
  Countries: [
    { country: "Japan", flag: "🇯🇵", days: "7", gb: "5", price: "24.99" },
    { country: "France", flag: "🇫🇷", days: "15", gb: "10", price: "32.50" },
    { country: "Brazil", flag: "🇧🇷", days: "30", gb: "20", price: "44.00" },
  ],
  Regions: [
    { country: "Europe", flag: "🇪🇺", days: "10", gb: "8", price: "28.00" },
    { country: "Southeast Asia", flag: "🌏", days: "15", gb: "12", price: "35.00" },
    { country: "North America", flag: "🌎", days: "7", gb: "6", price: "22.00" },
  ],
  Global: [
    { country: "Global 5GB", flag: "🌐", days: "15", gb: "5", price: "26.00" },
    { country: "Global 10GB", flag: "🌐", days: "30", gb: "10", price: "42.00" },
    { country: "Global 20GB", flag: "🌐", days: "30", gb: "20", price: "58.00" },
  ],
  Special: [
    { country: "3-Country Bundle", flag: "✨", days: "20", gb: "15", price: "39.00" },
  ],
};

export const CHECKOUT_RADIOS: {
  id: string;
  label: string;
  sub: string;
  disabled?: boolean;
}[] = [
  { id: "wallet", label: "Device Wallet", sub: "Coming soon", disabled: true },
  { id: "card", label: "Credit Card", sub: "Pay with a card" },
  { id: "apple", label: "Apple Pay", sub: "Pay with Apple Pay" },
  { id: "crypto", label: "External Wallet (via Moonpay)", sub: "Pay in crypto" },
];

export const BASE_PRICE = 24.99;

export const TOPUP_CANDIDATES = [
  { esimId: "japan-1", label: "Japan · 7 Days · 5GB" },
  { esimId: "global-1", label: "Global · 30 Days · 10GB" },
];

export type OrderStatus = "Processing" | "Provisioning" | "eSIM Ready" | "Completed";

export type Order = {
  id: string;
  plan: string;
  flag: string;
  days: string;
  gb: string;
  mins: string;
  sms: string;
  pill: OrderStatus;
  pillTone: "warning" | "success";
  expandable: boolean;
  note?: string;
  install?: boolean;
  iccid?: string;
  lpa?: string;
  paymentMethod?: string;
  supportRef?: string;
  invoiceUrl?: string;
  planHistory?: { planId: string; validity: number; purchaseDate: string }[];
};

export const ORDERS: Order[] = [
  {
    id: "france",
    plan: "France",
    flag: "🇫🇷",
    days: "15",
    gb: "10",
    mins: "0",
    sms: "0",
    pill: "Processing",
    pillTone: "warning",
    expandable: false,
    note: "No action needed while it finishes.",
  },
  {
    id: "global",
    plan: "Global",
    flag: "🌐",
    days: "30",
    gb: "10",
    mins: "0",
    sms: "0",
    pill: "eSIM Ready",
    pillTone: "warning",
    expandable: true,
    install: true,
    iccid: "8988 2801 0000 4471 923",
    lpa: "LPA:1$rsp.example.net$B4C5-D6E7-F8G9-H0I1",
    paymentMethod: "Credit Card",
    supportRef: "KOK-48291",
    invoiceUrl: "#",
  },
  {
    id: "japan",
    plan: "Japan",
    flag: "🇯🇵",
    days: "7",
    gb: "5",
    mins: "100",
    sms: "50",
    pill: "Completed",
    pillTone: "success",
    expandable: true,
    install: false,
    iccid: "8988 2801 0000 5512 044",
    paymentMethod: "Apple Pay",
    supportRef: "KOK-30144",
    invoiceUrl: "#",
    planHistory: [{ planId: "Japan 5GB / 7 days", validity: 7, purchaseDate: "2026-08-14" }],
  },
];

// The active eSIM card on Home (app/esim-detail.tsx) — a separate screen
// from Orders, per the source-accuracy correction in AppLiveTasks.md.
export const HOME_ESIM_DETAIL = {
  plan: "Japan",
  flag: "🇯🇵",
  days: "7",
  gb: "5",
  remaining: "2.35 GB",
  totalGb: 5,
  usedPct: 47,
  status: "Active" as const,
  iccid: "8988 2801 0000 5512 044",
};

export const QR_PATTERN = [
  1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1,
  0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1,
];

export const MANUAL_LPA = "LPA:1$rsp.example.net$A1B2-C3D4-E5F6-G7H8";

export const WALLET_ADDRESS_SHORT = "0x9bf...b1e2ef7";
export const WALLET_ADDRESS_FULL =
  "0x9bfbf5000f10121edc519bdc198f2fb93e16c4fd9c20846ff837e82a8b1e2ef7";

export const SETTINGS_MENU = [
  { icon: "call", label: "Contact", disabled: true },
  { icon: "lock", label: "Privacy Policy", href: "https://kokio.app/privacy-policy" },
  { icon: "info", label: "About", view: "about" as const },
  { icon: "headset", label: "Contact Support", view: "contact" as const },
  { icon: "theme", toggle: true },
  { icon: "logout", label: "Logout", view: "logout" as const },
  { icon: "trash", label: "Delete Account", view: "delete" as const },
];
