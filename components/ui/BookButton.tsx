import type { ReactNode } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Icon } from "@/components/ui/Icon";
import { BOOKING_HREF } from "@/lib/site";
import styles from "./BookButton.module.css";

type Props = {
  children: ReactNode;
  /** "light" sits on dark backgrounds, "dark" on light ones. */
  tone: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** "compact" is the header variant: calendar icon on the left, fill grows from there. */
  variant?: "default" | "compact";
  block?: boolean;
  className?: string;
};

/**
 * The single "book a session" button. Outline at rest; on hover/focus the icon bubble
 * grows to fill the whole button while the icon animates.
 */
export function BookButton({ children, tone, size = "md", variant = "default", block, className = "" }: Props) {
  const compact = variant === "compact";
  const icon = (
    <span className={styles.icon} aria-hidden="true">
      <span className={styles.glyphs}>
        {compact ? (
          <span className={styles.glyph}>
            <Icon name="calendar" size={16} />
          </span>
        ) : (
          <>
            <span className={styles.glyph}>
              <Icon name="arrowUpRight" size={18} />
            </span>
            <span className={`${styles.glyph} ${styles.glyphNext}`}>
              <Icon name="arrowUpRight" size={18} />
            </span>
          </>
        )}
      </span>
    </span>
  );

  return (
    <ExternalLink
      href={BOOKING_HREF}
      className={`${styles.book} ${styles[tone]} ${styles[size]} ${compact ? styles.compact : ""} ${block ? styles.block : ""} ${className}`}
    >
      {compact && icon}
      <span className={styles.label}>{children}</span>
      {!compact && icon}
    </ExternalLink>
  );
}
