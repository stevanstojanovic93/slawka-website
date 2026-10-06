import type { Dictionary } from "./types";

export const en = {
  meta: {
    title: "Private Pilates Reformer Studio in Kragujevac | SLAWKA",
    description:
      "Private Pilates reformer training in Kragujevac. Align Pilates reformer, 50-minute sessions, free trial session.",
    ogTitle: "SLAWKA — Pilates & Movement Studio",
    ogImageAlt: "SLAWKA Pilates & Movement Studio — reformer training in Kragujevac",
    ogDescription: "Private Pilates reformer training · Kragujevac",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    chooseLanguage: "Choose language",
    home: "SLAWKA — home",
    backToTop: "Back to top",
  },
  nav: { about: "About", services: "Services", rules: "Studio rules", contact: "Contact", cta: "Book a trial session" },
  hero: {
    title: "Private training on the Pilates reformer",
    sub: "Find balance and strength in sessions tailored to you.",
    cta: "Book your free trial session",
    pricing: "Pricing",
    imageAlt: "Exercise on a black reformer",
  },
  about: {
    photoAlt: "The instructor and a reformer session",
    title: "Premium equipment, a space that feels like home",
    p1Before: "You train on a premium reformer from the world-renowned brand ",
    p1After:
      " — precise springs, a stable frame and a comfortable carriage make every movement controlled, safe and effective. All supporting equipment is chosen with the same care.",
    features: [
      {
        icon: "award",
        title: "Experience",
        text: "Expert guidance and attention to proper technique in every movement.",
      },
      {
        icon: "home",
        title: "Comfort",
        text: "A warm, calm space where you feel at ease from the very first minute — just like home.",
      },
      {
        icon: "user",
        title: "Personalization",
        text: "One-on-one sessions tailored to your body, your goals and your pace of progress.",
      },
    ],
  },
  services: {
    label: "Services & pricing",
    title: "Private reformer training",
    sub: "Every session lasts 50 minutes and is entirely devoted to you.",
    trial: "Trial session",
    trialSub: "Free · first visit",
    book: "Book",
    call: "Call",
    currency: "RSD",
    plans: [
      { title: "Single session", sub: "one session" },
      { title: "8 sessions per month", sub: "twice a week" },
      { title: "12 sessions per month", sub: "three times a week" },
    ],
  },
  rules: {
    title: "Studio etiquette and reformer guidelines",
    intro:
      "Welcome to our Pilates studio! To ensure maximum safety, hygiene and a pleasant atmosphere for everyone, please follow these rules carefully:",
    groups: [
      {
        icon: "clock",
        title: "Cancellations and booking",
        items: [
          { term: "12-hour rule:", text: "Bookings can be cancelled no later than 12 hours before the session starts." },
          {
            text: "Sessions cancelled less than 12 hours in advance, as well as no-shows without notice, are charged automatically (deducted from your membership).",
          },
          {
            term: "Late arrival:",
            text: "Please arrive 5–10 minutes early. Arriving more than 10 minutes late shortens your session, which cannot be extended.",
          },
        ],
      },
      {
        icon: "sparkle",
        title: "Hygiene and equipment",
        items: [
          {
            term: "Non-slip socks required:",
            text: "For safety reasons, training on the reformer barefoot or in regular socks is not allowed. Socks with rubber, non-slip soles are required.",
          },
          {
            term: "Clothing:",
            text: "Wear clean, form-fitting sportswear without zippers, clasps or buttons on the back that could damage the upholstery.",
          },
        ],
      },
      {
        icon: "shield",
        title: "Safety on the reformer",
        items: [
          {
            term: "Listen to your instructor:",
            text: "Never change springs, remove straps or sit on the moving carriage without direct approval from a licensed instructor.",
          },
          {
            term: "Movement control:",
            text: 'Always return the carriage to its base slowly and with control. Letting the carriage "slam" into the stopper is not allowed.',
          },
          {
            term: "Health:",
            text: "Before the session, always tell your instructor about any injuries, pain or pregnancy.",
          },
        ],
      },
    ],
  },
  quotes: {
    label: "Words of the founder",
    author: "Joseph Pilates",
    role: "founder of the Pilates method",
    imageAlt: "Silhouette of a woman exercising on a reformer",
    items: [
      { text: "In 10 sessions you will feel the difference, in 20 you will see the difference, and in 30 you will have a whole new body." },
      { text: "Physical fitness is the first requisite of happiness." },
      { text: "If your spine is inflexibly stiff at 30, you are old. If it is completely flexible at 60, you are young." },
    ],
  },
  contact: {
    title: "See you at the studio",
    phone: "Phone",
    whatsapp: "Send a message",
    whatsappMessage: "Hi! I'm interested in a trial session.",
    address: "Address",
    hours: "Opening hours",
    mapTitle: "Map — Durmitorska 24, Kragujevac",
    showMap: "Show map",
    openInMaps: "Open in Google Maps",
    mapNotice: "The map loads from Google only when you open it.",
  },
} satisfies Dictionary;
