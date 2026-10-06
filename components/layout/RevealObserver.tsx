"use client";

import { useEffect } from "react";

/**
 * Toggles `data-revealed` on each `[data-reveal]` element (see base.css): set as it scrolls into view,
 * cleared once it has fully left the viewport, so the animation replays every time.
 * `data-reveal-from="above"` marks elements that left over the top edge, so they re-enter from
 * above; hiding them with a downward offset would push them back into view and make them flicker.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    // Reveal a little above the bottom edge so the animation plays where the eye is.
    const show = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.setAttribute("data-revealed", "");
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    // Reset only when completely off-screen, so nothing visibly disappears.
    const reset = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) continue;
        entry.target.removeAttribute("data-revealed");
        if (entry.boundingClientRect.top < 0) entry.target.setAttribute("data-reveal-from", "above");
        else entry.target.removeAttribute("data-reveal-from");
      }
    });

    for (const el of elements) {
      show.observe(el);
      reset.observe(el);
    }
    return () => {
      show.disconnect();
      reset.disconnect();
    };
  }, []);

  return null;
}
