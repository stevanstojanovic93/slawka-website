"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Always full size this close to the top. */
const TOP_ZONE = 24;
/** Scroll this far in one direction before switching, so trackpad jitter doesn't make it flicker. */
const TOLERANCE = 8;

/**
 * Sets `data-compact` on the header while scrolling down and clears it on the way back up
 * (the Headroom.js pattern). The CSS in Header.module.css does the shrinking.
 */
export function HeaderShell({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      // MobileMenu pins the body while open; its jump to 0 and back isn't real scrolling.
      if (document.body.style.position === "fixed") return;
      const header = ref.current;
      const y = window.scrollY;
      if (!header) return;

      if (y < TOP_ZONE) header.removeAttribute("data-compact");
      else if (y - lastY > TOLERANCE) header.setAttribute("data-compact", "");
      else if (lastY - y > TOLERANCE) header.removeAttribute("data-compact");
      else return; // not far enough yet: keep measuring from the same point
      lastY = y;
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}
