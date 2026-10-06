import { BookButton } from "@/components/ui/BookButton";
import type { Dictionary } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import styles from "./TrialCard.module.css";

export function TrialCard({ t }: { t: Dictionary["services"] }) {
  return (
    <div data-reveal="left" className={styles.trial}>
      <div className="stack-6">
        <h3 className={styles.title}>{t.trial}</h3>
        <p className={styles.sub}>{t.trialSub}</p>
      </div>
      <div className={styles.actions}>
        <BookButton tone="light">{t.book}</BookButton>
        <a href={CONTACT.phoneHref} className="btn btn-outline-light">
          {t.call}
        </a>
      </div>
    </div>
  );
}
