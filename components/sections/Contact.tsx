import type { Dictionary, Lang } from "@/lib/i18n";
import { SHOW_MAP } from "@/lib/site";
import { ContactTiles } from "./ContactTiles";
import { MapEmbed } from "./MapEmbed";
import styles from "./Contact.module.css";

export function Contact({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <section id="kontakt" data-reveal="" className="section" aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <div className="stack-16">
            <p className="eyebrow muted">{t.nav.contact}</p>
            <h2 id="contact-title" className="h2">
              {t.contact.title}
            </h2>
          </div>
          <ContactTiles lang={lang} t={t.contact} />
        </div>
        {SHOW_MAP && <MapEmbed t={t.contact} />}
      </div>
    </section>
  );
}
