import styles from "./SkipLink.module.css";

export function SkipLink({ label }: { label: string }) {
  return (
    <a href="#main" className={styles.skip}>
      {label}
    </a>
  );
}
