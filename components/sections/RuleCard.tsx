import { Icon } from "@/components/ui/Icon";
import type { RuleGroup } from "@/lib/i18n/types";
import styles from "./RuleCard.module.css";

export function RuleCard({ group }: { group: RuleGroup }) {
  return (
    <article className={`glass-card ${styles.card}`}>
      <div className={styles.head}>
        <span className="icon-bubble">
          <Icon name={group.icon} />
        </span>
        <h3 className={styles.title}>{group.title}</h3>
      </div>
      <ul className={styles.list}>
        {group.items.map((item) => (
          <li key={item.text}>
            {item.term && <strong className={styles.term}>{item.term}</strong>}
            <span className={styles.desc}>{item.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
