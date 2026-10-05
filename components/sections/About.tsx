import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { ABOUT_PHOTO, BRAND } from "@/lib/site";
import styles from "./About.module.css";

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="o-nama" data-reveal="" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid} ${ABOUT_PHOTO ? "" : styles.textOnly}`}>
        {ABOUT_PHOTO && (
          <div className={styles.photo}>
            <Image src={ABOUT_PHOTO} alt={t.about.photoAlt} fill sizes="(max-width: 860px) 100vw, 600px" className={styles.img} />
          </div>
        )}
        <div className="stack-24">
          <div className={styles.labels}>
            <p className="eyebrow muted">{t.nav.about}</p>
            <span className={styles.pill}>{BRAND.equipment} reformer</span>
          </div>
          <h2 id="about-title" className="h2">
            {t.about.title}
          </h2>
          <div className={styles.body}>
            <p className="lead">
              {t.about.p1Before}
              <strong>{BRAND.equipment}</strong>
              {t.about.p1After}
            </p>
            <p className="lead">{t.about.p2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
