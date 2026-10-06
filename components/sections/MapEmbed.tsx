"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import styles from "./MapEmbed.module.css";

/**
 * Click-to-load map: Google's iframe (heavy, sets third-party cookies) is only
 * requested after the visitor asks for it.
 */
export function MapEmbed({ t }: { t: Dictionary["contact"] }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div data-reveal="right" className={styles.map}>
      {loaded ? (
        <iframe
          title={t.mapTitle}
          src={CONTACT.mapEmbed}
          className={styles.frame}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className={styles.facade}>
          <span className={styles.pin}>
            <Icon name="pin" size={28} />
          </span>
          <p className={styles.address}>{CONTACT.address}</p>
          <div className={styles.actions}>
            <button type="button" className="btn btn-dark" onClick={() => setLoaded(true)}>
              {t.showMap}
            </button>
            <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
              {t.openInMaps}
            </a>
          </div>
          <p className={styles.notice}>{t.mapNotice}</p>
        </div>
      )}
    </div>
  );
}
