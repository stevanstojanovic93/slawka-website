import type { Dictionary } from "@/lib/i18n";
import { RuleCard } from "./RuleCard";
import styles from "./Rules.module.css";

export function Rules({ t }: { t: Dictionary }) {
  return (
    <section id="pravilnik" data-reveal="" className={`section ${styles.rules}`} aria-labelledby="rules-title">
      <div className="container stack-40">
        <div className={`stack-16 ${styles.head}`}>
          <p className="eyebrow muted">{t.nav.rules}</p>
          <h2 id="rules-title" className="h2 h2-sm">
            {t.rules.title}
          </h2>
          <p className="body-muted">{t.rules.intro}</p>
        </div>
        <div className={styles.grid}>
          {t.rules.groups.map((group) => (
            <RuleCard key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
