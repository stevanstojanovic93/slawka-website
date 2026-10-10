"use client";

import { useEffect, useRef } from "react";
import { BookButton } from "@/components/ui/BookButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { SECTIONS, type Dictionary, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./MobileMenu.module.css";

const DESKTOP_QUERY = "(min-width: 960px)";

/**
 * Stops the page behind the open menu from scrolling. overflow:hidden on <html> (base.css) isn't
 * enough on iOS Safari, so the body is pinned at the current position and put back on close.
 */
function lockScroll(): () => void {
  const y = window.scrollY;
  const { style } = document.body;
  Object.assign(style, { position: "fixed", top: `-${y}px`, left: "0", right: "0" });
  return () => {
    Object.assign(style, { position: "", top: "", left: "", right: "" });
    window.scrollTo({ top: y, behavior: "instant" });
  };
}

/**
 * Full-screen mobile menu built on the native <dialog>: showModal() gives focus trapping,
 * Escape to close, an inert background and focus return to the burger for free.
 */
export function MobileMenu({ lang, t }: { lang: Lang; t: Dictionary }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);

  const open = () => {
    unlockRef.current ??= lockScroll();
    dialogRef.current?.showModal();
  };
  // Unlocks synchronously (the dialog's close event is async), so a menu link's own jump to its
  // section happens after the page is back at its original position.
  const unlock = () => {
    unlockRef.current?.();
    unlockRef.current = null;
  };
  const close = () => {
    unlock();
    dialogRef.current?.close();
  };

  // Close if the viewport grows past the mobile breakpoint while open.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => mq.matches && dialogRef.current?.close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape and the breakpoint close the dialog without going through close().
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", unlock);
    return () => {
      dialog?.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        onClick={open}
        aria-label={t.a11y.openMenu}
        aria-haspopup="dialog"
      >
        <span />
        <span />
        <span />
      </button>

      <dialog ref={dialogRef} className={styles.dialog} aria-label={t.a11y.menu}>
        <div className={styles.head}>
          <Logo tagline="Pilates & Movement" />
          <div className={styles.langs}>
            <LanguageSwitcher id="language-menu-mobile" lang={lang} label={t.a11y.chooseLanguage} />
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label={t.a11y.closeMenu}>
            <span />
            <span />
          </button>
        </div>
        <nav className={styles.links} aria-label={t.a11y.mainNav}>
          {SECTIONS.map((s) => (
            <a key={s.key} href={`#${s.id}`} onClick={close}>
              {t.nav[s.key]}
              <span className={styles.arrow}>
                <Icon name="arrowRight" size={22} />
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
