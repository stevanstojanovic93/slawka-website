"use client";

import { useEffect, useRef } from "react";
import { BookButton } from "@/components/ui/BookButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Logo } from "@/components/ui/Logo";
import { SECTIONS, type Dictionary } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import styles from "./MobileMenu.module.css";

const DESKTOP_QUERY = "(min-width: 960px)";

/**
 * Full-screen mobile menu built on the native <dialog>: showModal() gives focus trapping,
 * Escape to close, an inert background and focus return to the burger for free.
 */
export function MobileMenu({ t }: { t: Dictionary }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  // Close if the viewport grows past the mobile breakpoint while open.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => mq.matches && dialogRef.current?.close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        onClick={() => dialogRef.current?.showModal()}
        aria-label={t.a11y.openMenu}
        aria-haspopup="dialog"
      >
        <span />
        <span />
        <span />
      </button>

      <dialog ref={dialogRef} className={styles.dialog} aria-label={t.a11y.menu}>
        <div className={styles.head}>
          <Logo />
          <button type="button" className={styles.close} onClick={close} aria-label={t.a11y.closeMenu}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav className={styles.links} aria-label={t.a11y.mainNav}>
          {SECTIONS.map((s) => (
            <a key={s.key} href={`#${s.id}`} onClick={close}>
              {t.nav[s.key]}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
        <div className={styles.foot}>
          <BookButton tone="dark" size="lg" block>
            {t.nav.cta}
          </BookButton>
          <div className={styles.contact}>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <ExternalLink href={CONTACT.instagramHref}>{CONTACT.instagram}</ExternalLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
