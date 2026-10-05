"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { CONTACT, I18N, type Lang } from "@/lib/i18n";

/** Set to e.g. "/images/about.jpg" once you have a photo of the instructor or a session. */
const ABOUT_PHOTO: string | null = null;
/** Toggle the Google Map in the contact section. */
const SHOW_MAP = true;

const SECTIONS = [
  { key: "about", id: "o-nama" },
  { key: "services", id: "usluge" },
  { key: "rules", id: "pravilnik" },
  { key: "contact", id: "kontakt" },
] as const;
type SectionKey = (typeof SECTIONS)[number]["key"];

const EASE = "cubic-bezier(.2,.7,.2,1)";

function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span className={`logo logo-${size}`}>
      <span className="logo-rule" />
      <span className="logo-word">SLAWKA</span>
      <span className="logo-rule" />
    </span>
  );
}

const Arrow = () => <span className="tile-arrow">↗</span>;

const icons = {
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

function Icon({ name, size = 20 }: { name: keyof typeof icons; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export default function Site() {
  const [lang, setLangState] = useState<Lang>("sr");
  const [active, setActive] = useState<SectionKey | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);
  const t = I18N[lang];

  // Restore saved language
  useEffect(() => {
    try {
      const saved = localStorage.getItem("slawka-lang");
      if (saved === "en" || saved === "sr") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem("slawka-lang", l);
    } catch {}
    setLangState(l);
    setLangOpen(false);
  };

  // Scroll spy
  const onScroll = useCallback(() => {
    if (Date.now() < lockUntil.current) return;
    const line = 120;
    let next: SectionKey | null = null;
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) next = s.key;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) next = "contact";
    setActive(next);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Menu: lock page scroll, close when growing past mobile breakpoint
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 700px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

  // Outside click + Escape
  useEffect(() => {
    const onDoc = (e: globalThis.MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Entrance + reveal animations
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = document.querySelector<HTMLElement>("[data-hero-img]");
    if (img) {
      const k = parseFloat(getComputedStyle(img).getPropertyValue("--hero-scale")) || 1.62;
      img.animate(
        [{ transform: `scale(${k * 1.08})`, opacity: 0.4 }, { transform: `scale(${k})`, opacity: 1 }],
        { duration: 2200, easing: EASE, fill: "backwards" }
      );
    }
    const copy = document.querySelector("[data-hero-copy]");
    if (copy)
      Array.from(copy.children).forEach((el, i) =>
        el.animate([{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "none" }], {
          duration: 900,
          delay: 250 + i * 120,
          easing: EASE,
          fill: "backwards",
        })
      );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          e.target.animate([{ opacity: 0, transform: "translateY(48px)" }, { opacity: 1, transform: "none" }], {
            duration: 1000,
            easing: EASE,
          });
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (k: SectionKey) => {
    lockUntil.current = Date.now() + 900;
    setActive(k);
    setTimeout(onScroll, 950);
  };

  const menuGo = (k: SectionKey, id: string, e: MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    go(k);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  const goTop = (e: MouseEvent) => {
    e.preventDefault();
    lockUntil.current = Date.now() + 900;
    setActive(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", location.pathname + location.search);
  };

  const services = [
    { title: t.s1, sub: t.s1s, price: t.s1p },
    { title: t.s2, sub: t.s2s, price: t.s2p },
    { title: t.s3, sub: t.s3s, price: t.s3p },
  ];

  const ruleGroups = [
    { icon: "⏳", title: t.g1, items: [{ t: t.r1t, d: t.r1 }, { d: t.r2 }, { t: t.r3t, d: t.r3 }] },
    { icon: "🧦", title: t.g2, items: [{ t: t.r4t, d: t.r4 }, { t: t.r5t, d: t.r5 }] },
    { icon: "🛡️", title: t.g3, items: [{ t: t.r6t, d: t.r6 }, { t: t.r7t, d: t.r7 }, { t: t.r8t, d: t.r8 }] },
  ];

  const contactTiles = [
    { href: CONTACT.phoneHref, icon: "phone" as const, label: t.phone, value: CONTACT.phone, external: false },
    { href: CONTACT.instagramHref, icon: "instagram" as const, label: "Instagram", value: CONTACT.instagram, external: true },
    { href: CONTACT.webHref, icon: "globe" as const, label: "Web", value: CONTACT.web, external: true },
    { href: CONTACT.mapsHref, icon: "pin" as const, label: t.address, value: CONTACT.address, external: true },
  ];

  const ext = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <div className="page">
      <div className="texture" aria-hidden="true" />

      <nav className="topnav">
        <div className="topnav-inner">
          <a href="#top" onClick={goTop} className="brand" aria-label="SLAWKA">
            <Logo />
          </a>
          <div className="topnav-right">
            <div className="nav-links">
              {SECTIONS.map((s) => (
                <a
                  key={s.key}
                  href={`#${s.id}`}
                  onClick={() => go(s.key)}
                  className={`nav-link${active === s.key ? " is-active" : ""}`}
                  aria-current={active === s.key ? "true" : undefined}
                >
                  {t[s.key]}
                  <span className="nav-ind" />
                </a>
              ))}
              <a href={CONTACT.instagramHref} {...ext} className="btn btn-dark nav-cta">
                {t.cta}
              </a>
            </div>

            <div ref={langRef} className="lang">
              <button
                type="button"
                className="lang-btn"
                onClick={() => setLangOpen((v) => !v)}
                aria-label={t.langLabel}
                aria-haspopup="true"
                aria-expanded={langOpen}
              >
                <Icon name="globe" size={18} />
                <span>{lang.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div role="menu" className="lang-menu">
                  {(
                    [
                      ["sr", "Srpski"],
                      ["en", "English"],
                    ] as const
                  ).map(([code, name]) => (
                    <button key={code} type="button" role="menuitem" className="lang-opt" onClick={() => setLang(code)}>
                      <span className="lang-opt-name">
                        <span className="lang-code">{code.toUpperCase()}</span>
                        {name}
                      </span>
                      <span style={{ opacity: lang === code ? 1 : 0 }}>✓</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" className="burger" onClick={() => setMenuOpen(true)} aria-label={t.openMenu}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
      >
        <div className="mobile-menu-head">
          <Logo />
          <button type="button" className="close-btn" onClick={() => setMenuOpen(false)} aria-label={t.closeMenu}>
            ×
          </button>
        </div>
        <nav className="mobile-links">
          {SECTIONS.map((s) => (
            <a key={s.key} href={`#${s.id}`} onClick={(e) => menuGo(s.key, s.id, e)} tabIndex={menuOpen ? 0 : -1}>
              {t[s.key]}
              <span className="mobile-arrow">→</span>
            </a>
          ))}
        </nav>
        <div className="mobile-foot">
          <a href={CONTACT.instagramHref} {...ext} className="btn btn-dark btn-xl" tabIndex={menuOpen ? 0 : -1}>
            {t.cta}
          </a>
          <div className="mobile-contact">
            <a href={CONTACT.phoneHref} tabIndex={menuOpen ? 0 : -1}>{CONTACT.phone}</a>
            <a href={CONTACT.instagramHref} {...ext} tabIndex={menuOpen ? 0 : -1}>{CONTACT.instagram}</a>
          </div>
        </div>
      </div>

      <header id="top" className="hero">
        <div className="hero-media">
          <Image
            src="/images/hero.jpg"
            alt={t.heroAlt}
            fill
            priority
            sizes="100vw"
            quality={80}
            data-hero-img=""
            className="hero-img"
          />
        </div>
        <div className="hero-shade" />
        <div data-hero-copy="" className="hero-copy">
          <div className="eyebrow">Pilates &amp; Movement Studio · Kragujevac</div>
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-sub">{t.heroSub}</p>
          <div className="hero-actions">
            <a href={CONTACT.instagramHref} {...ext} className="btn btn-light btn-lg">
              {t.heroCta}
            </a>
            <a href="#usluge" onClick={() => go("services")} className="btn btn-outline-light btn-lg">
              {t.pricing}
            </a>
          </div>
        </div>
      </header>

      <section id="o-nama" data-reveal="" className="section about">
        <div className="container about-grid">
          <div className="about-photo">
            {ABOUT_PHOTO ? (
              <Image src={ABOUT_PHOTO} alt={t.aboutPh} fill sizes="(max-width: 860px) 100vw, 600px" style={{ objectFit: "cover" }} />
            ) : (
              <div className="photo-ph">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <circle cx="9" cy="10" r="1.6" />
                  <path d="m21 16-5-5-8 8" />
                </svg>
                <span>{t.aboutPh}</span>
              </div>
            )}
          </div>
          <div className="stack-24">
            <div className="about-labels">
              <div className="eyebrow muted">{t.about}</div>
              <span className="pill">Align Pilates reformer</span>
            </div>
            <h2 className="h2">{t.aboutTitle}</h2>
            <p className="lead">
              {t.aboutP1a}
              <strong>Align Pilates</strong>
              {t.aboutP1b}
            </p>
            <p className="lead">{t.aboutP2}</p>
          </div>
        </div>
      </section>

      <section id="usluge" className="services">
        <div data-reveal="" className="services-panel">
          <div className="stack-28">
            <div className="stack-16">
              <div className="eyebrow">{t.svcLabel}</div>
              <h2 className="h2">{t.svcTitle}</h2>
              <p className="svc-sub">{t.svcSub}</p>
            </div>
            <div className="trial">
              <div className="stack-6">
                <div className="trial-title">{t.trial}</div>
                <div className="trial-sub">{t.trialSub}</div>
              </div>
              <a href={CONTACT.instagramHref} {...ext} className="btn btn-light">
                {t.book}
              </a>
            </div>
          </div>
          <div className="price-list">
            {services.map((s) => (
              <div key={s.title} className="price-row">
                <div className="stack-6">
                  <div className="price-title">{s.title}</div>
                  <div className="price-sub">{s.sub}</div>
                </div>
                <div className="price">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pravilnik" data-reveal="" className="section rules">
        <div className="container stack-40">
          <div className="stack-16 rules-head">
            <div className="eyebrow muted">{t.rules}</div>
            <h2 className="h2 h2-sm">{t.rulesTitle}</h2>
            <p className="body-muted">{t.rulesIntro}</p>
          </div>
          <div className="rules-grid">
            {ruleGroups.map((g) => (
              <div key={g.title} className="glass-card rule-card">
                <div className="rule-head">
                  <span className="icon-bubble" aria-hidden="true">{g.icon}</span>
                  <h3 className="rule-title">{g.title}</h3>
                </div>
                <ul className="rule-list">
                  {g.items.map((it, i) => (
                    <li key={i}>
                      {it.t && <span className="rule-term">{it.t}</span>}
                      <span className="rule-desc">{it.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" data-reveal="" className="section contact">
        <div className="container contact-grid">
          <div className="contact-left">
            <div className="stack-16">
              <div className="eyebrow muted">{t.contact}</div>
              <h2 className="h2">{t.contactTitle}</h2>
            </div>
            <div className="tiles">
              {contactTiles.map((c) => (
                <a key={c.label} href={c.href} {...(c.external ? ext : {})} className="glass-card tile">
                  <span className="tile-top">
                    <span className="icon-bubble">
                      <Icon name={c.icon} />
                    </span>
                    <Arrow />
                  </span>
                  <span className="stack-6">
                    <span className="tile-label">{c.label}</span>
                    <span className="tile-value">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          {SHOW_MAP && (
            <div className="map">
              <iframe title={t.mapTitle} src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-panel">
          <a href="#top" onClick={goTop} aria-label={t.backTop} className="footer-brand">
            <Logo size="lg" />
            <span className="footer-tag">Pilates &amp; Movement Studio</span>
          </a>
          <div className="footer-links">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={CONTACT.instagramHref} {...ext}>{CONTACT.instagram}</a>
            <span>{CONTACT.address}</span>
            <a href={CONTACT.webHref} {...ext}>www.{CONTACT.web}</a>
          </div>
          <div className="footer-copy" suppressHydrationWarning>© {new Date().getFullYear()} SLAWKA Pilates &amp; Movement Studio</div>
        </div>
      </footer>
    </div>
  );
}
