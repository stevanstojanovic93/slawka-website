import type { Dictionary, Lang } from "@/lib/i18n";
import { stagger } from "@/lib/reveal";
import { PriceList } from "./PriceList";
import { TrialCard } from "./TrialCard";
import styles from "./Services.module.css";

export function Services({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <section id="usluge" className={styles.services} aria-labelledby="services-title">
      <div data-reveal="scale" className={styles.panel}>
        <div className="stack-28">
          <div className="stack-16">
            <p data-reveal="fade" className="eyebrow">
              {t.services.label}
            </p>
            <h2 id="services-title" data-reveal="clip" className="h2">
              {t.services.title}
            </h2>
            <p data-reveal="" style={stagger(1)} className={styles.sub}>
              {t.services.sub}
            </p>
          </div>
          <TrialCard t={t.services} />
        </div>
        <PriceList lang={lang} t={t.services} />
      </div>
    </section>
  );
}
