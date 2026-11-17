"use client";

import { useEffect, useState } from "react";
import { GALAXY_MOTION_EVENT, galaxyMotionEnabled, setGalaxyMotion } from "@/lib/ial-v1/motion-preference";
import styles from "./motion-preference.module.css";

export function MotionPreference() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setEnabled(galaxyMotionEnabled()); setReduced(preference.matches); setReady(true); };
    sync(); preference.addEventListener("change", sync); window.addEventListener(GALAXY_MOTION_EVENT, sync);
    return () => { preference.removeEventListener("change", sync); window.removeEventListener(GALAXY_MOTION_EVENT, sync); };
  }, []);
  return <aside className={styles.preferences} aria-label="Homepage motion preference">
    <span>THE HOMEPAGE EXPERIENCE</span>
    <details id="ial-motion-settings" className={styles.disclosure}>
      <summary>Motion settings <span aria-hidden="true">＋</span></summary>
      <div><label><input type="checkbox" checked={enabled && !reduced} disabled={!ready || reduced} onChange={event => setGalaxyMotion(event.target.checked)} />Animate the galaxy <strong>{enabled && !reduced ? "On" : "Off"}</strong></label><p data-motion-explanation>{reduced ? "Your system requests reduced motion, so the galaxy stays still." : "Choose a living galaxy or a still view. Lightweight devices use a limited-motion view."} This preference applies during this visit. Your system’s reduced-motion setting always takes priority.</p><noscript><p>JavaScript is disabled. The galaxy stays still, and every story chapter remains available.</p></noscript></div>
    </details>
    <noscript><style>{`#ial-motion-settings label,#ial-motion-settings [data-motion-explanation]{display:none!important}`}</style></noscript>
  </aside>;
}
