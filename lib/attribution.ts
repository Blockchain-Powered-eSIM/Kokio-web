// Campaign attribution for community QR links (see docs/community-qr-tracking.md).
// A visitor lands on e.g. /?utm_source=ethchiangmai&..., but the query string is
// gone as soon as they navigate, so the UTM values are kept for the session and
// forwarded to the app stores and the "Download Click" event.

export const IOS_URL = "https://apps.apple.com/us/app/kokio/id6799362847";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=app.kokio.mobile";

// App Store Connect > Apps > Kokio > Analytics > Acquisition > Campaigns > "+"
// shows the provider token (pt). Apple ignores `ct` without it, so the App Store
// link stays untagged until this is filled in.
const APP_STORE_PROVIDER_TOKEN = "";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;
const STORAGE_KEY = "kokio-attribution";

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>>;

// Reads UTMs from the current URL (and saves them), falling back to the ones
// saved earlier in this session.
export function getAttribution(): Attribution | null {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  try {
    if (fromUrl.utm_source) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Attribution) : null;
  } catch {
    // Storage blocked (private mode, etc.): attribute this page only.
    return fromUrl.utm_source ? fromUrl : null;
  }
}

export function storeUrl(
  platform: "ios" | "android",
  attribution: Attribution | null
): string {
  const source = attribution?.utm_source;
  if (!source) return platform === "ios" ? IOS_URL : ANDROID_URL;

  if (platform === "android") {
    // Play Console > Grow users > Store performance reads this referrer.
    const referrer = new URLSearchParams({
      utm_source: source,
      utm_medium: attribution.utm_medium ?? "website",
      utm_campaign: attribution.utm_campaign ?? source,
    });
    const url = new URL(ANDROID_URL);
    url.searchParams.set("referrer", referrer.toString());
    return url.toString();
  }

  if (!APP_STORE_PROVIDER_TOKEN) return IOS_URL;
  const url = new URL(IOS_URL);
  url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  // Campaign token: Apple caps it at 30 characters.
  url.searchParams.set("ct", (attribution.utm_campaign ?? source).slice(0, 30));
  url.searchParams.set("mt", "8");
  return url.toString();
}

export function trackDownload(
  platform: "ios" | "android",
  page: string,
  attribution: Attribution | null
) {
  const w = window as unknown as {
    umami?: { track: (event: string, data?: object) => void };
  };
  w.umami?.track("Download Click", { page, platform, ...attribution });
}
