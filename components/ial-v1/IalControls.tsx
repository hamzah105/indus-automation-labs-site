"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ial-v1.module.css";

export function IalControls() {
  const controls = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    const root = controls.current?.closest<HTMLElement>("[data-ial-hero]");
    if (!root) return;
    let cancelled = false;
    let loading = false;
    let dispose: (() => void) | undefined;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { root.dataset.intro = "complete"; root.dataset.motion = "static"; setIntro(false); };
    const enhance = () => {
      if (cancelled || loading || dispose || reduced.matches) return;
      loading = true;
      import("@/lib/ial-v1/hero-motion").then(module => {
        if (!cancelled) dispose = module.mountGenesis(root, state => setIntro(state.intro));
      }).catch(() => { if (!cancelled) { finish(); root.dataset.renderer = "fallback"; } }).finally(() => { loading = false; });
    };
    const preference = () => { if (!reduced.matches) enhance(); else if (!dispose) finish(); };
    if (reduced.matches) finish(); else enhance();
    reduced.addEventListener("change", preference);
    return () => { cancelled = true; reduced.removeEventListener("change", preference); dispose?.(); };
  }, []);

  function skip() {
    const root = controls.current?.closest<HTMLElement>("[data-ial-hero]");
    root?.dispatchEvent(new CustomEvent("ial:control", { detail: "skip" }));
    root?.querySelector<HTMLAnchorElement>("[data-ial-primary]")?.focus();
  }
  return <div ref={controls} className={styles.controls}>
    {intro && <button type="button" onClick={skip}>Skip intro<span aria-hidden="true"> ↗</span></button>}
    <a href="#ial-motion-settings">Motion settings</a>
    <a href="#ial-work" className={styles.jump}>Skip to our work<span aria-hidden="true"> ↓</span></a>
  </div>;
}
