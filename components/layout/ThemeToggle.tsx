"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { getTheme, setTheme, subscribeTheme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

/**
 * Light/dark switch; the choice is saved in localStorage (lib/theme). The icon is picked in CSS
 * from html[data-theme], which the inline init script sets before paint, so it never flickers.
 */
export function ThemeToggle({ label }: { label: string }) {
  // null on the server: the theme is only known in the browser.
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => null);

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
    >
      <span className={styles.moon}>
        <Icon name="moon" size={18} />
      </span>
      <span className={styles.sun}>
        <Icon name="sun" size={18} />
      </span>
    </button>
  );
}
