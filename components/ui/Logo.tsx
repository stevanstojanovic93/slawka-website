import styles from "./Logo.module.css";

export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span className={`${styles.logo} ${size === "lg" ? styles.lg : ""}`}>
      <span className={styles.rule} />
      <span className={styles.word}>SLAWKA</span>
      <span className={styles.rule} />
    </span>
  );
}
