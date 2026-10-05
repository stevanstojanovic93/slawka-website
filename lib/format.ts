import { INTL_LOCALES, type Lang } from "@/lib/i18n/config";
import { OPENING_HOURS } from "@/lib/site";

export function formatPrice(amount: number, lang: Lang, currencyLabel: string): string {
  return `${new Intl.NumberFormat(INTL_LOCALES[lang]).format(amount)} ${currencyLabel}`;
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

/** Short localized weekday name, e.g. "Pon" / "Mon". 2026-01-05 is a Monday. */
function weekdayName(day: (typeof WEEKDAYS)[number], lang: Lang): string {
  const date = new Date(Date.UTC(2026, 0, 5 + WEEKDAYS.indexOf(day)));
  const name = new Intl.DateTimeFormat(INTL_LOCALES[lang], { weekday: "short", timeZone: "UTC" }).format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** e.g. "Pon–Pet · 08:00–20:00" / "Mon–Fri · 08:00–20:00" (assumes consecutive days). */
export function formatOpeningHours(lang: Lang): string {
  const { days, opens, closes } = OPENING_HOURS;
  const first = weekdayName(days[0], lang);
  const last = weekdayName(days[days.length - 1]!, lang);
  return `${first}–${last} · ${opens}–${closes}`;
}
