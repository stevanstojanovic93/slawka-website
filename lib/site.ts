/** Single source of truth for business data. Edit here; every page, metadata and JSON-LD reads from it. */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.slawkapilates.com").replace(/\/$/, "");

/** Absolute URL for a site path. The home page has no trailing slash, matching Next's canonical/hreflang output. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * ✏️ BUSINESS DATA — edit only this object.
 * Everything below (contact links, maps, JSON-LD, price list, opening hours) is derived from it.
 */
export const BUSINESS = {
  /** Phone as you want it displayed. Spaces are fine; the tel: link strips them. */
  phone: "+381 61 7255541",
  /** Instagram username, without the "@". Also used as the booking link. */
  instagram: "slawka.studio",
  address: {
    street: "Durmitorska 24",
    postalCode: "34000",
    city: "Kragujevac",
    country: "RS",
  },
  /** Map pin. Find it by right-clicking the location in Google Maps. */
  geo: { latitude: 44.014429, longitude: 20.897885 },
  /** Working days (consecutive, English names) and hours in 24h "HH:MM". */
  workTime: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "20:00",
  },
  /** Prices in RSD. Plan names/descriptions are translated in lib/i18n/{sr,en}.ts → services.plans. */
  prices: {
    single: 2000,
    eightSessions: 11000,
    twelveSessions: 14000,
  },
  currency: "RSD",
} as const;

export const BRAND = {
  name: "SLAWKA",
  fullName: "SLAWKA Pilates & Movement Studio",
  tagline: "Pilates & Movement Studio",
  city: BUSINESS.address.city,
  equipment: "Align Pilates",
};

export const ADDRESS = BUSINESS.address;
export const GEO = BUSINESS.geo;
export const OPENING_HOURS = BUSINESS.workTime;

const fullAddress = `${ADDRESS.street}, ${ADDRESS.city}`;
const phoneE164 = BUSINESS.phone.replace(/[^\d+]/g, "");

export const CONTACT = {
  phone: BUSINESS.phone,
  phoneE164,
  phoneHref: `tel:${phoneE164}`,
  instagram: `@${BUSINESS.instagram}`,
  instagramHref: `https://instagram.com/${BUSINESS.instagram}`,
  address: fullAddress,
  mapsHref: `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=16&output=embed`,
};

/** Main booking channel used by every "book" button. */
export const BOOKING_HREF = CONTACT.instagramHref;

/** Same order as the dictionaries' `services.plans`: single, 8 sessions, 12 sessions. */
export const PRICES = [BUSINESS.prices.single, BUSINESS.prices.eightSessions, BUSINESS.prices.twelveSessions] as const;
export const CURRENCY = BUSINESS.currency;

/** Set to e.g. "/images/about.jpg" once you have a photo of the instructor or a session. */
export const ABOUT_PHOTO: string | null = null;

/** Show the (click-to-load) Google Map in the contact section. */
export const SHOW_MAP = true;
