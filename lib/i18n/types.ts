import type { IconName } from "@/components/ui/Icon";
import type { PRICES } from "@/lib/site";

type Plan = { title: string; sub: string };
/** Maps each element of a tuple to T, keeping its length. */
type SameLength<Tuple extends readonly unknown[], T> = { -readonly [K in keyof Tuple]: T };
/** One plan label per entry in PRICES, in the same order. */
type Plans = SameLength<typeof PRICES, Plan>;

export type Feature = { icon: IconName; title: string; text: string };
export type Quote = { text: string };
export type RuleItem = { term?: string; text: string };
export type RuleGroup = { icon: IconName; title: string; items: RuleItem[] };

export type Dictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string; ogImageAlt: string };
  a11y: {
    skipToContent: string;
    mainNav: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    chooseLanguage: string;
    home: string;
    backToTop: string;
  };
  nav: { about: string; services: string; rules: string; contact: string; cta: string };
  hero: { title: string; sub: string; cta: string; pricing: string; imageAlt: string };
  about: { photoAlt: string; title: string; p1Before: string; p1After: string; features: Feature[] };
  services: {
    label: string;
    title: string;
    sub: string;
    trial: string;
    trialSub: string;
    book: string;
    call: string;
    currency: string;
    plans: Plans;
  };
  quotes: { label: string; author: string; role: string; imageAlt: string; items: Quote[] };
  rules: { title: string; intro: string; groups: RuleGroup[] };
  contact: {
    title: string;
    phone: string;
    whatsapp: string;
    whatsappMessage: string;
    address: string;
    hours: string;
    mapTitle: string;
    showMap: string;
    openInMaps: string;
    mapNotice: string;
  };
};
