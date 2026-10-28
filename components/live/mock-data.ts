/**
 * Simulated data for the /live guide, illustrative only, no real backend calls.
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
    { country: "Asia", flag: "🌏", days: "15", gb: "12", price: "35.00" },
    {
      country: "North America",
      flag: "🌎",
      days: "7",
      gb: "6",
      price: "22.00",
    },
  ],
  Global: [
    { country: "Global 5GB", flag: "🌐", days: "15", gb: "5", price: "26.00" },
    {
      country: "Global 10GB",
      flag: "🌐",
      days: "30",
      gb: "10",
      price: "42.00",
    },
    {
      country: "Global 20GB",
      flag: "🌐",
      days: "30",
      gb: "20",
      price: "58.00",
    },
  ],
  Special: [
    {
      country: "Europe & Asia",
      flag: "✨",
      days: "20",
      gb: "15",
      price: "39.00",
    },
  ],
};

export type ShopCountry = { code: string; name: string; flag: string };

export const SHOP_COUNTRIES: ShopCountry[] = [
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
];

export const SHOP_REGIONS: { name: string; image: string }[] = [
  { name: "Europe", image: "/live/region-europe.png" },
  { name: "Asia", image: "/live/region-asia.png" },
  { name: "North America", image: "/live/region-north-america.png" },
];

export type CountryPlan = { plan: Plan; network: string };

// Plans per country. The first entry of each is the PLANS.Countries entry.
// `network` drives the network chips.
export const COUNTRY_PLANS: Record<string, CountryPlan[]> = {
  JP: [
    { plan: PLANS.Countries[0], network: "NTT Docomo" },
    {
      plan: {
        country: "Japan",
        flag: "🇯🇵",
        days: "15",
        gb: "10",
        price: "34.00",
      },
      network: "SoftBank",
    },
  ],
  FR: [
    { plan: PLANS.Countries[1], network: "Orange" },
    {
      plan: {
        country: "France",
        flag: "🇫🇷",
        days: "30",
        gb: "20",
        price: "48.00",
      },
      network: "SFR",
    },
  ],
  BR: [
    { plan: PLANS.Countries[2], network: "Claro" },
    {
      plan: {
        country: "Brazil",
        flag: "🇧🇷",
        days: "15",
        gb: "10",
        price: "30.00",
      },
      network: "Vivo",
    },
  ],
};

// Extra plans loaded by "Show more plans".
export const BACKUP_COUNTRY_PLANS: Record<string, CountryPlan[]> = {
  JP: [
    {
      plan: {
        country: "Japan",
        flag: "🇯🇵",
        days: "30",
        gb: "20",
        price: "52.00",
      },
      network: "NTT Docomo",
    },
  ],
  FR: [
    {
      plan: {
        country: "France",
        flag: "🇫🇷",
        days: "7",
        gb: "5",
        price: "19.00",
      },
      network: "Orange",
    },
  ],
  BR: [
    {
      plan: {
        country: "Brazil",
        flag: "🇧🇷",
        days: "7",
        gb: "5",
        price: "21.00",
      },
      network: "Claro",
    },
  ],
};

// Plans per region.
export const REGION_PLANS: Record<string, Plan[]> = {
  Europe: [PLANS.Regions[0]],
  Asia: [PLANS.Regions[1]],
  "North America": [PLANS.Regions[2]],
};

export const PRICE_FILTERS = [
  { key: "ANY", label: "Any price" },
  { key: "UNDER_5", label: "Under $5" },
  { key: "5_15", label: "$5 – $15" },
  { key: "15_PLUS", label: "$15+" },
];
export const DATA_FILTERS = [
  { key: "ANY", label: "Any data" },
  { key: "UNDER_1GB", label: "Up to 1GB" },
  { key: "1_5GB", label: "1 – 5GB" },
  { key: "5_10GB", label: "5 – 10GB" },
  { key: "10GB_PLUS", label: "10GB+" },
  { key: "UNLIMITED", label: "Unlimited" },
];
export const VALIDITY_FILTERS = [
  { key: "ANY", label: "Any validity" },
  { key: "UNDER_7D", label: "Up to 7 days" },
  { key: "7_30D", label: "8 – 30 days" },
  { key: "30_90D", label: "31 – 90 days" },
  { key: "90D_PLUS", label: "90+ days" },
];

export const CHECKOUT_RADIOS: {
  id: string;
  label: string;
  disabled?: boolean;
}[] = [
  { id: "wallet", label: "Kokio Wallet" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "apple", label: "Apple Pay" },
  { id: "crypto", label: "Other crypto wallet" },
];

export const BASE_PRICE = 24.99;

export const TOPUP_CANDIDATES = [
  { esimId: "japan-1", label: "Japan · 7 Days · 5GB" },
  { esimId: "global-1", label: "Global · 30 Days · 10GB" },
];

export type OrderStatus =
  "Processing" | "Provisioning" | "eSIM Ready" | "Completed";

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
  // Set once the eSIM is installed and its wallet is deployed; shows a wallet button on the order card.
  esimWalletId?: string;
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
    pillTone: "success",
    expandable: true,
    install: true,
    iccid: "8988 2801 0000 4471 923",
    lpa: "LPA:1$rsp.example.net$B4C5-D6E7-F8G9-H0I1",
    paymentMethod: "Card",
    supportRef: "KOK-48291",
    invoiceUrl: "#",
  },
  {
    id: "japan",
    plan: "Japan",
    flag: "🇯🇵",
    days: "7",
    gb: "5",
    mins: "0",
    sms: "0",
    pill: "Completed",
    pillTone: "success",
    expandable: true,
    install: false,
    esimWalletId: "japan-1",
    iccid: "8988 2801 0000 5512 044",
    paymentMethod: "Kokio Wallet",
    supportRef: "KOK-30144",
    invoiceUrl: "#",
    planHistory: [
      { planId: "Japan 5GB / 7 days", validity: 7, purchaseDate: "2026-08-14" },
    ],
  },
];

// The active eSIM card on Home, separate from Orders.
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
  1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1,
];

export const MANUAL_LPA = "LPA:1$rsp.example.net$A1B2-C3D4-E5F6-G7H8";

export const WALLET_ADDRESS_SHORT = "base:0x9bfb...2ef7";
export const WALLET_ADDRESS_FULL =
  "0x9bfbf5000f10121edc519bdc198f2fb93e16c4fd9c20846ff837e82a8b1e2ef7";

export const SETTINGS_MENU = [
  { icon: "gift", label: "Refer & Earn", view: "refer" as const },
  { icon: "lock", label: "Privacy Policy", href: "https://kokio.app/privacy-policy" },
  { icon: "info", label: "About", view: "about" as const },
  { icon: "headset", label: "Contact Support", view: "contact" as const },
  { icon: "logout", label: "Logout", view: "logout" as const },
  { icon: "trash", label: "Delete Account", view: "delete" as const },
];

// Display section at the bottom of Settings: System / Day / Night.
export const SETTINGS_THEME_MODES = [
  { value: "system" as const, label: "System", icon: "contrast" },
  { value: "light" as const, label: "Day", icon: "sun" },
  { value: "dark" as const, label: "Night", icon: "moon" },
];
