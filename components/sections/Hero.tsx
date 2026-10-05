import Image from "next/image";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Dictionary } from "@/lib/i18n";
import { BOOKING_HREF, BRAND } from "@/lib/site";
import heroImage from "@/public/images/hero.jpg";
import styles from "./Hero.module.css";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={heroImage}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={80}
          placeholder="blur"
          className={styles.img}
        />
      </div>
      <div className={styles.shade} />
      <div className={styles.copy}>
        <p className="eyebrow">
          {BRAND.tagline} · {BRAND.city}
        </p>
        <h1 id="hero-title" className={styles.title}>
          {t.hero.title}
        </h1>
        <p className={styles.sub}>{t.hero.sub}</p>
        <div className={styles.actions}>
          <ExternalLink href={BOOKING_HREF} className="btn btn-light btn-lg">
            {t.hero.cta}
          </ExternalLink>
          <a href="#usluge" className="btn btn-outline-light btn-lg">
            {t.hero.pricing}
          </a>
        </div>
      </div>
    </section>
  );
}
