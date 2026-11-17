/** Scroll events request one frame; there is no persistent animation loop. */
export function mountStory(root: HTMLElement) {
  const scenes = [...root.querySelectorAll<HTMLElement>("[data-story-scene]")];
  const visible = new Set<HTMLElement>();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0, listening = false, disposed = false;
  const clamp = (x: number) => Math.min(1, Math.max(0, x));
  function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; }
  function paint() {
    frame = 0;
    if (disposed || document.hidden) return;
    let closest = Infinity, current = "";
    for (const scene of visible) {
      const rect = scene.getBoundingClientRect();
      const progress = reduced.matches ? 1 : clamp((innerHeight * .94 - rect.top) / (Math.min(rect.height, innerHeight) * .85));
      scene.style.setProperty("--scene-progress", progress.toFixed(4));
      const distance = Math.abs(rect.top + Math.min(rect.height, innerHeight) * .45 - innerHeight * .5);
      if (distance < closest) { closest = distance; current = scene.dataset.storyScene || ""; }
    }
    root.dataset.currentScene = current;
  }
  function request() { if (!disposed && !frame && visible.size && !document.hidden && !reduced.matches) frame = requestAnimationFrame(paint); }
  function bindings() {
    const active = visible.size > 0 && !document.hidden && !reduced.matches;
    if (active && !listening) { window.addEventListener("scroll", request, { passive: true }); listening = true; }
    if (!active && listening) { window.removeEventListener("scroll", request); listening = false; }
    if (!active) stop();
    root.dataset.storyMotion = active ? "active" : reduced.matches ? "static" : "idle";
    if (active) request();
  }
  function preferences() {
    scenes.forEach(scene => scene.style.setProperty("--scene-progress", "1"));
    bindings();
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const scene = entry.target as HTMLElement;
      scene.dataset.sceneVisible = String(entry.isIntersecting);
      if (entry.isIntersecting) visible.add(scene);
      else { visible.delete(scene); scene.style.setProperty("--scene-progress", entry.boundingClientRect.top < 0 ? "1" : "0"); }
    }
    bindings();
  }, { threshold: [0, .15, .5] });
  scenes.forEach(scene => observer.observe(scene));
  const sizes = new ResizeObserver(request); sizes.observe(root);
  document.addEventListener("visibilitychange", bindings);
  window.addEventListener("resize", request, { passive: true });
  window.addEventListener("pageshow", request);
  reduced.addEventListener("change", preferences);
  root.dataset.storyEnhanced = "true";
  return () => {
    disposed = true; stop(); observer.disconnect(); sizes.disconnect();
    window.removeEventListener("scroll", request); window.removeEventListener("resize", request); window.removeEventListener("pageshow", request);
    document.removeEventListener("visibilitychange", bindings); reduced.removeEventListener("change", preferences);
  };
}
