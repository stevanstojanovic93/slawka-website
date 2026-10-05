"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SECTIONS, type Dictionary, type SectionKey } from "@/lib/i18n";
import { BOOKING_HREF } from "@/lib/site";
import styles from "./NavLinks.module.css";

/** A section is "current" once its top has scrolled above this fraction of the viewport height. */
const SPY_RATIO = 0.4;

function useActiveSection(): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive(SECTIONS.at(-1)!.key);
      const line = window.innerHeight * SPY_RATIO;
      // Last section in document order whose top is above the line wins.
      const current = SECTIONS.findLast((s) => {
        const top = document.getElementById(s.id)?.getBoundingClientRect().top;
        return top !== undefined && top <= line;
      });
      setActive(current?.key ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}

export function NavLinks({ nav, label }: { nav: Dictionary["nav"]; label: string }) {
  const active = useActiveSection();

  return (
    <nav aria-label={label} className={styles.links}>
      {SECTIONS.map((s) => (
        <a
          key={s.key}
          href={`#${s.id}`}
          className={styles.link}
          aria-current={active === s.key ? "location" : undefined}
        >
          {nav[s.key]}
          <span className={styles.indicator} />
        </a>
      ))}
      <ExternalLink href={BOOKING_HREF} className={`btn btn-dark ${styles.cta}`}>
        {nav.cta}
      </ExternalLink>
    </nav>
  );
}
