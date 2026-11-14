// Loaded near the narrative, not by the hero. No animation runtime dependency.
export function mountOompStory(root: HTMLElement): () => void {
  const rail = root.querySelector<HTMLElement>("[data-story-rail]");
  const stage = root.querySelector<HTMLElement>("[data-desktop-stage] [data-story-stage]");
  const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-story-chapter]"));
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-story-jump]"));
  if (!rail || !stage || chapters.length !== 5) return () => {};

  const desktop = window.matchMedia("(min-width: 1024px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let listening = false;
  let disposed = false;
  let frame = 0;
  let scene = -1;
  let bounds: { top: number; height: number }[] = [];
  const clamp = (value: number) => Math.min(1, Math.max(0, value));

  function measure() {
    const railTop = rail!.getBoundingClientRect().top;
    bounds = chapters.map(chapter => {
      const rect = chapter.getBoundingClientRect();
      return { top: rect.top - railTop, height: rect.height };
    });
  }

  function render() {
    frame = 0;
    if (disposed || !listening || !bounds.length) return;
    const point = window.innerHeight * .49 - rail!.getBoundingClientRect().top;
    let index = 0;
    for (let i = 1; i < bounds.length; i++) if (point >= bounds[i].top) index = i;
    const progress = clamp((point - bounds[index].top) / bounds[index].height);
    stage!.style.setProperty("--scene-progress", progress.toFixed(4));
    root.style.setProperty("--story-progress", ((index + progress) / chapters.length).toFixed(4));
    if (scene !== index) {
      scene = index;
      stage!.dataset.scene = String(index);
      const graph = stage!.querySelector<HTMLElement>("[data-graph-ready] > div");
      if (graph) graph.inert = index !== 2;
      stage!.dispatchEvent(new CustomEvent("oomp:scenechange", { detail: index }));
      root.dataset.activeScene = String(index);
      chapters.forEach((chapter, i) => { chapter.dataset.active = String(i === index); });
      links.forEach(link => {
        if (link.dataset.storyJump === String(index)) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });
    }
  }

  function schedule() {
    if (listening && !frame) frame = window.requestAnimationFrame(render);
  }

  function resize() {
    if (!disposed) {
      measure();
      schedule();
    }
  }

  function sync() {
    const scrollView = desktop.matches && !reduced.matches && root.dataset.static !== "true";
    root.dataset.layout = scrollView ? "scroll" : "static";
    const shouldListen = scrollView && visible && document.visibilityState !== "hidden";
    if (shouldListen && !listening) {
      listening = true;
      measure();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("pageshow", resize);
      schedule();
    } else if (!shouldListen && listening) {
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pageshow", resize);
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
    root.dataset.motion = listening ? "observing-scroll" : "idle";
    if (!scrollView) {
      scene = -1;
      delete root.dataset.activeScene;
      chapters.forEach(chapter => { delete chapter.dataset.active; });
      links.forEach(link => link.removeAttribute("aria-current"));
    }
  }

  const visibility = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    sync();
  }, { rootMargin: "80px 0px" });
  const size = new ResizeObserver(resize);
  visibility.observe(root);
  size.observe(rail);
  desktop.addEventListener("change", sync);
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  root.addEventListener("oomp:viewchange", sync);
  window.addEventListener("resize", resize, { passive: true });
  void document.fonts.ready.then(() => { if (!disposed) resize(); });
  sync();

  return () => {
    disposed = true;
    visibility.disconnect();
    size.disconnect();
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("pageshow", resize);
    window.removeEventListener("resize", resize);
    desktop.removeEventListener("change", sync);
    reduced.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    root.removeEventListener("oomp:viewchange", sync);
  };
}
