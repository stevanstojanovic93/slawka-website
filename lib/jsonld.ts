import type { Dictionary, Lang } from "@/lib/i18n";
import { localePath } from "@/lib/i18n/config";
import { absoluteUrl, ADDRESS, BRAND, CONTACT, CURRENCY, GEO, OPENING_HOURS, PRICES } from "@/lib/site";

export function buildLocalBusinessJsonLd(lang: Lang, t: Dictionary) {
  const url = absoluteUrl(localePath(lang));
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: BRAND.fullName,
    description: t.meta.description,
    url,
    image: absoluteUrl("/images/hero.jpg"),
    telephone: CONTACT.phoneE164,
    sameAs: [CONTACT.instagramHref],
    hasMap: CONTACT.mapsHref,
    priceRange: `${Math.min(...PRICES)}–${Math.max(...PRICES)} ${CURRENCY}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      postalCode: ADDRESS.postalCode,
      addressLocality: ADDRESS.city,
      addressCountry: ADDRESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: OPENING_HOURS.days.map((d) => `https://schema.org/${d}`),
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      },
    ],
    makesOffer: PRICES.map((price, i) => ({
      "@type": "Offer",
      name: t.services.plans[i]?.title,
      description: t.services.plans[i]?.sub,
      price,
      priceCurrency: CURRENCY,
    })),
  };
}

/** Serialize for a <script type="application/ld+json">, escaping "<" so content can't close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
