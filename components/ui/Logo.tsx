import styles from "./Logo.module.css";

export function Logo({ size = "sm", tagline }: { size?: "sm" | "lg"; tagline?: string }) {
  return (
    <span className={`${styles.logo} ${size === "lg" ? styles.lg : ""}`}>
      <span className={styles.rule} />
      <span className={styles.word}>SLAWKA</span>
      <span className={styles.rule} />
      {tagline && <span className={styles.tagline}>{tagline}</span>}
    </span>
  );
}
