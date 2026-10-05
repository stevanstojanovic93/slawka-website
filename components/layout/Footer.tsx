import { ExternalLink } from "@/components/ui/ExternalLink";
import { Logo } from "@/components/ui/Logo";
import type { Dictionary } from "@/lib/i18n";
import { BRAND, CONTACT } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <a href="#top" aria-label={t.a11y.backToTop} className={styles.brand}>
          <Logo size="lg" />
          <span className={styles.tag}>{BRAND.tagline}</span>
        </a>
        <address className={styles.links}>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <ExternalLink href={CONTACT.instagramHref}>{CONTACT.instagram}</ExternalLink>
          <ExternalLink href={CONTACT.mapsHref}>{CONTACT.address}</ExternalLink>
        </address>
        {/* Rendered at build time; redeploy once a year to update. */}
        <p className={styles.copy}>
          © {new Date().getFullYear()} {BRAND.fullName}
        </p>
      </div>
    </footer>
  );
}
