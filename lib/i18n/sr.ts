import type { Dictionary } from "./types";

export const sr = {
  meta: {
    title: "Pilates reformer Kragujevac — individualni treninzi | SLAWKA",
    description:
      "Individualni trening na pilates reformeru u Kragujevcu. Align Pilates reformer, časovi od 50 minuta, besplatan probni trening.",
    ogTitle: "SLAWKA — Pilates & Movement Studio",
    ogImageAlt: "SLAWKA Pilates & Movement Studio — trening na reformeru u Kragujevcu",
    ogDescription: "Individualni trening na pilates reformeru · Kragujevac",
  },
  a11y: {
    skipToContent: "Preskoči na sadržaj",
    mainNav: "Glavna navigacija",
    menu: "Meni",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    chooseLanguage: "Izaberi jezik",
    home: "SLAWKA — početna",
    backToTop: "Nazad na vrh",
  },
  nav: { about: "O nama", services: "Usluge", rules: "Pravilnik", contact: "Kontakt", cta: "Zakaži probni trening" },
  hero: {
    title: "Individualni trening na pilates reformeru",
    sub: "Pronađite balans i snagu u individualno prilagođenim časovima.",
    cta: "Zakažite besplatan probni trening",
    pricing: "Cenovnik",
    imageAlt: "Vežba na crnom reformeru",
  },
  about: {
    photoAlt: "Trenerica i čas na reformeru",
    title: "Vrhunska oprema, prostor kao kod kuće",
    p1Before: "Trenirate na vrhunskom reformeru svetski poznate i priznate marke ",
    p1After:
      " — precizne opruge, stabilna konstrukcija i udobna platforma omogućavaju kontrolisan, bezbedan i efikasan rad. Sva prateća oprema birana je sa istom pažnjom.",
    features: [
      {
        icon: "award",
        title: "Iskustvo",
        text: "Stručno vođenje i pažnja na pravilnu tehniku u svakom pokretu.",
      },
      {
        icon: "home",
        title: "Udobnost",
        text: "Topao i miran prostor u kome se opuštate od prvog minuta — kao kod kuće.",
      },
      {
        icon: "user",
        title: "Personalizacija",
        text: "Individualni časovi prilagođeni vašem telu, ciljevima i tempu napretka.",
      },
    ],
  },
  services: {
    label: "Usluge i cenovnik",
    title: "Individualni trening na reformeru",
    sub: "Svaki čas traje 50 minuta i u potpunosti je posvećen vama.",
    trial: "Probni trening",
    trialSub: "Besplatno · prvi dolazak",
    book: "Zakaži",
    call: "Pozovi",
    currency: "din",
    plans: [
      { title: "Pojedinačni termin", sub: "jedan trening" },
      { title: "8 termina mesečno", sub: "2 puta nedeljno" },
      { title: "12 termina mesečno", sub: "3 puta nedeljno" },
    ],
  },
  rules: {
    title: "Pravilnik ponašanja i korišćenja reformera",
    intro:
      "Dobrodošli u naš pilates studio! Kako bismo osigurali maksimalnu bezbednost, higijenu i prijatnu atmosferu za sve vežbače, molimo vas da se striktno pridržavate sledećih pravila:",
    groups: [
      {
        icon: "clock",
        title: "Otkazivanje i zakazivanje treninga",
        items: [
          { term: "Pravilo 12 sati:", text: "Otkazivanje zakazanog termina je moguće maksimalno 12 sati pre početka treninga." },
          {
            text: "Termini koji se otkažu u roku kraćem od 12 sati, kao i nedolazak bez najave, automatski se naplaćuju (skidaju sa članarine).",
          },
          {
            term: "Kašnjenje:",
            text: "Molimo vas da dolazite 5–10 minuta pre početka. Kašnjenje duže od 10 minuta skraćuje vaš termin, a trening se ne može produžiti.",
          },
        ],
      },
      {
        icon: "sparkle",
        title: "Higijena i oprema",
        items: [
          {
            term: "Obavezne neklizajuće čarape:",
            text: "Vežbanje na reformerima iz bezbednosnih razloga nije dozvoljeno bosih nogu niti u običnim čarapama. Obavezne su čarape sa gumenim, antislip đonom.",
          },
          {
            term: "Garderoba:",
            text: "Nosite čistu i pripijenu sportsku odeću bez rajsferšlusa, kopči ili dugmadi na leđima koji mogu oštetiti tapacirung sprava.",
          },
        ],
      },
      {
        icon: "shield",
        title: "Bezbednost i rad na spravi",
        items: [
          {
            term: "Slušajte instruktora:",
            text: "Nikada nemojte sami menjati opruge, skidati trake ili sedati na pokretnu platformu bez direktnog odobrenja licenciranog trenera.",
          },
          {
            term: "Kontrola pokreta:",
            text: 'Pokretnu platformu (carriage) uvek vraćajte kontrolisano i polako do baze. Zabranjeno je naglo puštanje platforme da "lupi" o kočnicu.',
          },
          {
            term: "Zdravstveno stanje:",
            text: "Pre početka treninga obavezno obavestite instruktora o eventualnim povredama, bolovima ili trudnoći.",
          },
        ],
      },
    ],
  },
  contact: {
    title: "Vidimo se u studiju",
    phone: "Telefon",
    address: "Adresa",
    hours: "Radno vreme",
    mapTitle: "Mapa — Durmitorska 24, Kragujevac",
    showMap: "Prikaži mapu",
    openInMaps: "Otvori u Google mapama",
    mapNotice: "Mapa se učitava sa Google servisa tek kada je otvorite.",
  },
} satisfies Dictionary;
