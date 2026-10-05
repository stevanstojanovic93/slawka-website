import type { Dictionary, Lang } from "@/lib/i18n";
import { PriceList } from "./PriceList";
import { TrialCard } from "./TrialCard";
import styles from "./Services.module.css";

export function Services({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <section id="usluge" className={styles.services} aria-labelledby="services-title">
      <div data-reveal="" className={styles.panel}>
        <div className="stack-28">
          <div className="stack-16">
            <p className="eyebrow">{t.services.label}</p>
            <h2 id="services-title" className="h2">
              {t.services.title}
            </h2>
            <p className={styles.sub}>{t.services.sub}</p>
          </div>
          <TrialCard t={t.services} />
        </div>
        <PriceList lang={lang} t={t.services} />
      </div>
    </section>
  );
}
