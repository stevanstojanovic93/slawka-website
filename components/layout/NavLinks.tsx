"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SECTIONS, type Dictionary, type SectionKey } from "@/lib/i18n";
import { BOOKING_HREF } from "@/lib/site";
import styles from "./NavLinks.module.css";

/** Distance from the viewport top (below the sticky header) that decides which section is "current". */
const SPY_LINE = 120;

function useActiveSection(): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    const visible = new Set<SectionKey>();
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      // Last matching section in document order wins; the final section wins at page bottom.
      const current = atBottom ? SECTIONS.at(-1)!.key : SECTIONS.findLast((s) => visible.has(s.key))?.key;
      setActive(current ?? null);
    };

    // Observe a 1px band at SPY_LINE: a section is "visible" while it crosses that line.
    // The band depends on viewport height, so the observer is rebuilt on resize.
    let io: IntersectionObserver | undefined;
    const observe = () => {
      io?.disconnect();
      visible.clear();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const key = SECTIONS.find((s) => s.id === e.target.id)?.key;
            if (!key) continue;
            if (e.isIntersecting) visible.add(key);
            else visible.delete(key);
          }
          update();
        },
        { rootMargin: `-${SPY_LINE}px 0px -${Math.max(0, window.innerHeight - SPY_LINE - 1)}px 0px` }
      );
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) io.observe(el);
      }
    };

    observe();
    window.addEventListener("resize", observe);
    window.addEventListener("scrollend", update);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", observe);
      window.removeEventListener("scrollend", update);
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
