"use client";

import { useEffect, useRef } from "react";

export function StoryController() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.closest<HTMLElement>("[data-ial-story]");
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false, started = false;
    let dispose: (() => void) | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting) || started) return;
      started = true; observer.disconnect();
      import("@/lib/ial-v1/story-motion").then(module => { if (!cancelled) dispose = module.mountStory(root); }).catch(() => { root.dataset.storyEnhanced = "false"; });
    }, { rootMargin: "200px" });
    observer.observe(root);
    return () => { cancelled = true; observer.disconnect(); dispose?.(); };
  }, []);
  return <span ref={marker} hidden aria-hidden="true" />;
}
