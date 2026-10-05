import { formatPrice } from "@/lib/format";
import type { Dictionary, Lang } from "@/lib/i18n";
import { PRICES } from "@/lib/site";
import styles from "./PriceList.module.css";

export function PriceList({ lang, t }: { lang: Lang; t: Dictionary["services"] }) {
  return (
    <ul className={styles.list}>
      {PRICES.map((price, i) => {
        const plan = t.plans[i];
        if (!plan) return null;
        return (
          <li key={plan.title} className={styles.row}>
            <div className="stack-6">
              <h3 className={styles.title}>{plan.title}</h3>
              <p className={styles.sub}>{plan.sub}</p>
            </div>
            <p className={styles.price}>{formatPrice(price, lang, t.currency)}</p>
          </li>
        );
      })}
    </ul>
  );
}
