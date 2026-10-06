import { Logo } from "@/components/ui/Logo";
import type { Dictionary, Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

export function Header({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label={t.a11y.home}>
          <Logo />
        </a>
        <div className={styles.right}>
          <NavLinks nav={t.nav} label={t.a11y.mainNav} />
          <ThemeToggle label={t.a11y.darkMode} />
          <LanguageSwitcher lang={lang} label={t.a11y.chooseLanguage} />
          <MobileMenu t={t} />
        </div>
      </div>
    </header>
  );
}
