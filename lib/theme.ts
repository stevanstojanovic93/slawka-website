export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Runs inline before first paint (see app/[lang]/layout.tsx): applies the saved theme, or the OS
 * preference when nothing is saved, so the page never flashes the wrong theme.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t;d.classList.add("js");try{t=localStorage.getItem("${STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("${DARK_QUERY}").matches?"dark":"light";d.dataset.theme=t})()`;

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; // storage blocked (e.g. some private modes)
  }
}

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Applies the theme and remembers it as an explicit choice. */
export function setTheme(theme: Theme) {
  apply(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Not persisted; the choice still holds for this page view.
  }
}

/**
 * Notifies on theme changes made here, in other tabs (storage event), or by the OS while no
 * explicit choice is saved. Shaped for useSyncExternalStore.
 */
export function subscribeTheme(onChange: () => void) {
  const mq = window.matchMedia(DARK_QUERY);
  const sync = () => {
    apply(readStored() ?? systemTheme());
    onChange();
  };
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && sync();
  const observer = new MutationObserver(onChange);

  mq.addEventListener("change", sync);
  window.addEventListener("storage", onStorage);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => {
    mq.removeEventListener("change", sync);
    window.removeEventListener("storage", onStorage);
    observer.disconnect();
  };
}
