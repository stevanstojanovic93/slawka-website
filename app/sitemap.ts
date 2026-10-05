import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, localePath } from "@/lib/i18n";
import { absoluteUrl as url } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(LOCALES.map((l) => [l, url(localePath(l))])),
    "x-default": url(localePath(DEFAULT_LOCALE)),
  };
  return LOCALES.map((lang) => ({
    url: url(localePath(lang)),
    changeFrequency: "monthly",
    priority: lang === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }));
}
