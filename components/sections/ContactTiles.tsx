import { Icon, type IconName } from "@/components/ui/Icon";
import { formatOpeningHours } from "@/lib/format";
import type { Dictionary, Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import styles from "./ContactTiles.module.css";

type Tile = { href?: string; icon: IconName; label: string; value: string; external?: boolean };

export function ContactTiles({ lang, t }: { lang: Lang; t: Dictionary["contact"] }) {
  const tiles: Tile[] = [
    { href: CONTACT.phoneHref, icon: "phone", label: t.phone, value: CONTACT.phone, external: false },
    { href: CONTACT.instagramHref, icon: "instagram", label: "Instagram", value: CONTACT.instagram, external: true },
    { href: CONTACT.mapsHref, icon: "pin", label: t.address, value: CONTACT.address, external: true },
    { icon: "clock", label: t.hours, value: formatOpeningHours(lang) },
  ];

  return (
    <ul className={styles.tiles}>
      {tiles.map((tile) => {
        const body = (
          <>
            <span className={styles.top}>
              <span className="icon-bubble">
                <Icon name={tile.icon} />
              </span>
              {tile.href && (
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              )}
            </span>
            <span className="stack-6">
              <span className={styles.label}>{tile.label}</span>
              <span className={styles.value}>{tile.value}</span>
            </span>
          </>
        );
        return (
          <li key={tile.label}>
            {tile.href ? (
              <a
                href={tile.href}
                {...(tile.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`glass-card ${styles.tile}`}
              >
                {body}
              </a>
            ) : (
              <div className={`glass-card ${styles.tile}`}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
