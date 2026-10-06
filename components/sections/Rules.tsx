import type { Dictionary } from "@/lib/i18n";
import { stagger } from "@/lib/reveal";
import { RuleCard } from "./RuleCard";
import styles from "./Rules.module.css";

export function Rules({ t }: { t: Dictionary }) {
  return (
    <section id="pravilnik" className={`section ${styles.rules}`} aria-labelledby="rules-title">
      <div className="container stack-40">
        <div className={`stack-16 ${styles.head}`}>
          <p data-reveal="fade" className="eyebrow muted">
            {t.nav.rules}
          </p>
          <h2 id="rules-title" data-reveal="clip" className="h2 h2-sm">
            {t.rules.title}
          </h2>
          <p data-reveal="" style={stagger(1)} className="body-muted">
            {t.rules.intro}
          </p>
        </div>
        <div className={styles.grid}>
          {t.rules.groups.map((group, i) => (
            <RuleCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
