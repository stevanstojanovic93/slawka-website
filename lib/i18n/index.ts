import type { Lang } from "./config";
import { en } from "./en";
import { sr } from "./sr";
import type { Dictionary } from "./types";

const dictionaries: Record<Lang, Dictionary> = { sr, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export * from "./config";
export type { Dictionary } from "./types";
