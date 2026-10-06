import type { CSSProperties } from "react";

/** Inline style that staggers a `data-reveal` element by its index among siblings. */
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
