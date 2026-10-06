import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { stagger } from "@/lib/reveal";
import quotesImage from "@/public/images/quotes.webp";
import styles from "./Quotes.module.css";

export function Quotes({ t }: { t: Dictionary["quotes"] }) {
  return (
    <section className={styles.quotes} aria-labelledby="quotes-title">
      <div className={styles.panel}>
        <div className={styles.media}>
          <div data-reveal="left" className={styles.photo}>
            <Image src={quotesImage} alt={t.imageAlt} fill sizes="(max-width: 860px) 90vw, 480px" className={styles.img} />
          </div>
          <div data-reveal="scale" style={stagger(3)} className={styles.badge} aria-hidden="true">
            “
          </div>
        </div>

        <div className="stack-28">
          <div className="stack-16">
            <p data-reveal="fade" className="eyebrow">
              {t.label}
            </p>
            <h2 id="quotes-title" data-reveal="clip" className="h2 h2-sm">
              {t.author}
            </h2>
          </div>
          <ul className={styles.list}>
            {t.items.map((quote, i) => (
              <li key={quote.text} data-reveal="right" style={stagger(i + 1)}>
                <blockquote className={styles.quote}>
                  <span className={styles.mark} aria-hidden="true">
                    “
                  </span>
                  <p>{quote.text}</p>
                </blockquote>
              </li>
            ))}
          </ul>
          <p data-reveal="fade" style={stagger(4)} className={styles.cite}>
            — {t.author}, {t.role}
          </p>
        </div>
      </div>
    </section>
  );
}
