import { Logo } from "@/components/ui/Logo";
import type { Dictionary, Lang } from "@/lib/i18n";
import { HeaderShell } from "./HeaderShell";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import styles from "./Header.module.css";

export function Header({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <HeaderShell className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.inner}>
          <a href="#top" className={styles.brand} aria-label={t.a11y.home}>
            <Logo tagline="Pilates & Movement" />
          </a>
          <div className={styles.right}>
            <NavLinks nav={t.nav} label={t.a11y.mainNav} />
            <div className={styles.desktopOnly}>
              <LanguageSwitcher id="language-menu" lang={lang} label={t.a11y.chooseLanguage} />
            </div>
            <MobileMenu lang={lang} t={t} />
          </div>
        </div>
      </div>
    </HeaderShell>
  );
}
