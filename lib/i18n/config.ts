export const LOCALES = ["sr", "en"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Lang = "sr";

export const LOCALE_NAMES: Record<Lang, string> = { sr: "Srpski", en: "English" };
export const OG_LOCALES: Record<Lang, string> = { sr: "sr_RS", en: "en_US" };
/** BCP 47 tags for Intl formatting. */
export const INTL_LOCALES: Record<Lang, string> = { sr: "sr-Latn-RS", en: "en-US" };

export function isLocale(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}

/** Public path of a locale: the default locale is served at "/", the others under "/<lang>". */
export function localePath(lang: Lang): string {
  return lang === DEFAULT_LOCALE ? "/" : `/${lang}`;
}

/** Section anchors are shared by both languages so links stay stable. */
export const SECTIONS = [
  { key: "about", id: "o-nama" },
  { key: "services", id: "usluge" },
  { key: "rules", id: "pravilnik" },
  { key: "contact", id: "kontakt" },
] as const;
export type SectionKey = (typeof SECTIONS)[number]["key"];
