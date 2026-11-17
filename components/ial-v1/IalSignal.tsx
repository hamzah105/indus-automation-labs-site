"use client";

import { useEffect, useRef } from "react";

/** Small section activation primitive, separate from the protected OOMP story. */
export function IalSignal() {
  const signal = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const section = signal.current?.closest<HTMLElement>("[data-ial-section]");
    if (!section) return;
    const observer = new IntersectionObserver(entries => { section.dataset.activated = entries[0].isIntersecting ? "true" : "false"; }, { threshold: .2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return <span ref={signal} aria-hidden="true" hidden />;
}
