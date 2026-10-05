import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Dictionary } from "@/lib/i18n";
import { BOOKING_HREF, CONTACT } from "@/lib/site";
import styles from "./TrialCard.module.css";

export function TrialCard({ t }: { t: Dictionary["services"] }) {
  return (
    <div className={styles.trial}>
      <div className="stack-6">
        <h3 className={styles.title}>{t.trial}</h3>
        <p className={styles.sub}>{t.trialSub}</p>
      </div>
      <div className={styles.actions}>
        <ExternalLink href={BOOKING_HREF} className="btn btn-light">
          {t.book}
        </ExternalLink>
        <a href={CONTACT.phoneHref} className="btn btn-outline-light">
          {t.call}
        </a>
      </div>
    </div>
  );
}
