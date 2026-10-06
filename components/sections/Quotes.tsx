import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { stagger } from "@/lib/reveal";
import quotesImage from "@/public/images/quotes.webp";
import styles from "./Quotes.module.css";

export function Quotes({ t }: { t: Dictionary["quotes"] }) {
  const [featured, ...rest] = t.items;

  return (
    <section className={`section ${styles.quotes}`} aria-labelledby="quotes-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.founder}>
          <div data-reveal="scale" className={styles.portrait}>
            <Image src={quotesImage} alt={t.imageAlt} fill sizes="(max-width: 759px) 176px, 300px" className={styles.img} />
          </div>
          <div className="stack-6">
            <h2 id="quotes-title" data-reveal="clip" className={styles.name}>
              {t.author}
            </h2>
            <p data-reveal="fade" style={stagger(1)} className={styles.role}>
              {t.role}
            </p>
          </div>
        </div>

        <div>
          <p data-reveal="fade" className="eyebrow muted">
            {t.label}
          </p>
          <blockquote data-reveal="" style={stagger(1)} className={styles.featured}>
            <span className={styles.mark} aria-hidden="true">
              “
            </span>
            <p>{featured.text}</p>
          </blockquote>
          <ul className={styles.list}>
            {rest.map((quote, i) => (
              <li key={quote.text} data-reveal="" style={stagger(i + 2)}>
                <blockquote>
                  <p>{quote.text}</p>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
