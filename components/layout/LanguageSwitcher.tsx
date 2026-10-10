import { Icon } from "@/components/ui/Icon";
import { LOCALE_NAMES, LOCALES, localePath, type Lang } from "@/lib/i18n";
import styles from "./LanguageSwitcher.module.css";

/**
 * Native popover: open/close, Escape and light-dismiss come from the browser, so no client JS is needed.
 * Rendered in both the header and the mobile menu, so each instance needs its own `id`.
 */
export function LanguageSwitcher({ id, lang, label }: { id: string; lang: Lang; label: string }) {
  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.button} popoverTarget={id} aria-label={label}>
        <Icon name="globe" size={18} />
        <span aria-hidden="true">{lang.toUpperCase()}</span>
      </button>
      <div id={id} popover="auto" className={styles.menu}>
        <ul className={styles.list}>
          {LOCALES.map((code) => (
            <li key={code}>
              <a
                href={localePath(code)}
                hrefLang={code}
                lang={code}
                aria-current={code === lang ? "page" : undefined}
                className={styles.option}
              >
                <span className={styles.name}>
                  <span className={styles.code} aria-hidden="true">
                    {code.toUpperCase()}
                  </span>
                  {LOCALE_NAMES[code]}
                </span>
                <span className={styles.check} aria-hidden="true">
                  ✓
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
