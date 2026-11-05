/**
 * Languages the /esim pages are published in. English lives at the root.
 *
 * Add a locale only once its translations have been approved by a reviewer.
 */
export const LOCALES = [
  { code: "en", name: "English", currency: "USD" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: LocaleCode = "en";
