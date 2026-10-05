import styles from "./Texture.module.css";

/** Decorative palm-shadow overlay (desktop only). */
export function Texture() {
  return <div className={styles.texture} aria-hidden="true" />;
}
