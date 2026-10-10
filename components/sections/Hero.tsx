import Image from "next/image";
import { BookButton } from "@/components/ui/BookButton";
import type { Dictionary } from "@/lib/i18n";
import heroImage from "@/public/images/hero.jpg";
import styles from "./Hero.module.css";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        {/* No placeholder="blur": its SVG blur filter, painted over the whole hero, blocks the main thread
            for over a second on GPU-less devices (PageSpeed TBT). The olive hero background shows instead. */}
        <Image
          src={heroImage}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={80}
          className={styles.img}
        />
      </div>
      <div className={styles.shade} />
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          {t.hero.title}
        </h1>
        <p className={styles.sub}>{t.hero.sub}</p>
        <div className={styles.actions}>
          <BookButton tone="light" size="lg">
            {t.hero.cta}
          </BookButton>
          <a href="#usluge" className="btn btn-outline-light btn-lg">
            {t.hero.pricing}
          </a>
        </div>
      </div>
    </section>
  );
}
