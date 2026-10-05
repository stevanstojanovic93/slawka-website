/** Single source of truth for business data. Edit here; every page, metadata and JSON-LD reads from it. */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.slawkapilates.com").replace(/\/$/, "");

/** Absolute URL for a site path. The home page has no trailing slash, matching Next's canonical/hreflang output. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export const BRAND = {
  name: "SLAWKA",
  fullName: "SLAWKA Pilates & Movement Studio",
  tagline: "Pilates & Movement Studio",
  city: "Kragujevac",
  equipment: "Align Pilates",
};

export const ADDRESS = {
  street: "Durmitorska 24",
  postalCode: "34000",
  city: "Kragujevac",
  country: "RS",
};

export const GEO = { latitude: 44.014429, longitude: 20.897885 };

/** Weekly opening hours (24h "HH:MM"). Used for the contact section and JSON-LD. */
export const OPENING_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:00",
  closes: "20:00",
} as const;

const fullAddress = `${ADDRESS.street}, ${ADDRESS.city}`;
const phoneE164 = "+381617255541";

export const CONTACT = {
  phone: "+381 61 7255541",
  phoneE164,
  phoneHref: `tel:${phoneE164}`,
  instagram: "@slawka.studio",
  instagramHref: "https://instagram.com/slawka.studio",
  address: fullAddress,
  mapsHref: `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=16&output=embed`,
};

/** Main booking channel used by every "book" button. */
export const BOOKING_HREF = CONTACT.instagramHref;

/** Prices in RSD. Labels for each plan live in the dictionaries under `services.plans` (same order). */
export const PRICES = [1700, 10000, 13000] as const;
export const CURRENCY = "RSD";

/** Set to e.g. "/images/about.jpg" once you have a photo of the instructor or a session. */
export const ABOUT_PHOTO: string | null = null;

/** Show the (click-to-load) Google Map in the contact section. */
export const SHOW_MAP = true;
