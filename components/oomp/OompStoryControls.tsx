"use client";

import { useEffect, useState } from "react";
import styles from "./oomp-story.module.css";

export function OompStoryControls() {
  const [ready, setReady] = useState(false);
  const [staticView, setStaticView] = useState(false);

  useEffect(() => {
    const root = document.getElementById("architecture");
    if (!root) return;
    let cancelled = false;
    let loading = false;
    let near = false;
    let dispose: (() => void) | undefined;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const loadMotion = async () => {
      if (loading) return;
      loading = true;
      observer.disconnect();
      desktop.removeEventListener("change", considerMotion);
      reduced.removeEventListener("change", considerMotion);
      try {
        const { mountOompStory } = await import("./oomp-story-motion");
        if (cancelled) return;
        dispose = mountOompStory(root);
        setReady(true);
      } catch {
        // Server-rendered stacked scenes remain fully usable if enhancement fails.
        root.dataset.layout = "static";
      }
    };

    function considerMotion() {
      if (near && desktop.matches && !reduced.matches) void loadMotion();
    }

    const observer = new IntersectionObserver(entries => {
      near = entries.some(entry => entry.isIntersecting);
      considerMotion();
    }, { rootMargin: "160px 0px" });
    observer.observe(root);
    desktop.addEventListener("change", considerMotion);
    reduced.addEventListener("change", considerMotion);

    return () => {
      cancelled = true;
      observer.disconnect();
      desktop.removeEventListener("change", considerMotion);
      reduced.removeEventListener("change", considerMotion);
      dispose?.();
    };
  }, []);

  function toggleView() {
    const next = !staticView;
    setStaticView(next);
    const root = document.getElementById("architecture");
    if (root) {
      root.dataset.static = String(next);
      root.dispatchEvent(new Event("oomp:viewchange"));
    }
  }

  return (
    <div className={styles.storySettings}>
      <button type="button" hidden={!ready} className={styles.viewToggle} onClick={toggleView} aria-pressed={staticView}>
        <span aria-hidden="true">{staticView ? "↕" : "Ⅱ"}</span>{staticView ? "Use scroll view" : "Use static view"}
      </button>
      <a href="#capabilities" className={styles.skipStory}>Skip visual story <span aria-hidden="true">↓</span></a>
    </div>
  );
}
