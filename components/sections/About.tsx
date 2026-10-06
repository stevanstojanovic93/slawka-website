import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/lib/i18n";
import { stagger } from "@/lib/reveal";
import { ABOUT_PHOTO, BRAND } from "@/lib/site";
import styles from "./About.module.css";

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="o-nama" className="section" aria-labelledby="about-title">
      <div className="container stack-40">
        <div className={`${styles.grid} ${ABOUT_PHOTO ? "" : styles.textOnly}`}>
          {ABOUT_PHOTO && (
            <div data-reveal="scale" className={styles.photo}>
              <Image src={ABOUT_PHOTO} alt={t.about.photoAlt} fill sizes="(max-width: 860px) 100vw, 600px" className={styles.img} />
            </div>
          )}
          <div className="stack-24">
            <div data-reveal="fade" className={styles.labels}>
              <p className="eyebrow muted">{t.nav.about}</p>
              <span className={styles.pill}>{BRAND.equipment} reformer</span>
            </div>
            <h2 id="about-title" data-reveal="clip" className="h2">
              {t.about.title}
            </h2>
            <p data-reveal="" style={stagger(1)} className={`lead ${styles.sub}`}>
              {t.about.p1Before}
              <strong>{BRAND.equipment}</strong>
              {t.about.p1After}
            </p>
          </div>
        </div>
        <ul className={styles.features}>
          {t.about.features.map((feature, i) => (
            <li key={feature.title} data-reveal="" style={stagger(i)} className={`glass-card ${styles.card}`}>
              <span className="icon-bubble">
                <Icon name={feature.icon} />
              </span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
