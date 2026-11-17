import { ialGenesis } from "./config";
import { createGalaxyRenderer, type GalaxyRenderer } from "./galaxy-renderer";
import { GALAXY_MOTION_EVENT, galaxyMotionEnabled } from "./motion-preference";

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
let introductionSeen = false;
let rememberedAmbientTime = 0;

/** One visible-only clock layers ambient orbits and damped pointer influence. */
export function mountGenesis(root: HTMLElement, onState: (state: { intro: boolean }) => void) {
  const canvas = root.querySelector<HTMLCanvasElement>("[data-ial-canvas]");
  if (!canvas) throw new Error("Missing stellar canvas");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const narrow = matchMedia("(max-width: 767px)");
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const clock = root.querySelector<HTMLElement>("[data-ial-clock]");
  let renderer: GalaxyRenderer | null = null;
  let disposed = false, visible = false, failed = false, contextLost = false, geometryDirty = true;
  let frame = 0, previousDraw = 0, journey = 0, slowFrames = 0, sampledFrames = 0;
  let qualityReduced = false;
  let ambientSeconds = rememberedAmbientTime;
  let introDone = introductionSeen || scrollY > 90 || !galaxyMotionEnabled();
  const cssStart = clock?.getAnimations()[0]?.currentTime;
  let elapsed = introDone ? ialGenesis.introMs : typeof cssStart === "number" ? cssStart : ialGenesis.introMs;
  if (elapsed >= ialGenesis.introMs) introDone = true;
  let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
  let strength = 0, targetStrength = 0, velocityX = 0, velocityY = 0, targetVelocityX = 0, targetVelocityY = 0;
  let lastPointerTime = 0, lastClientX = 0, lastClientY = 0, pointerPresent = false;
  const isMobile = () => narrow.matches || !fine.matches || Boolean(connection?.saveData);
  const state = () => onState({ intro: !introDone && galaxyMotionEnabled() && !reduced.matches && !failed && !contextLost });
  function finishIntro() { introDone = true; elapsed = ialGenesis.introMs; introductionSeen = true; root.dataset.intro = "complete"; state(); }
  function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; previousDraw = 0; }
  function release() { renderer?.dispose(); renderer = null; geometryDirty = true; }
  function resetPointer(immediate = false) {
    pointerPresent = false; targetStrength = 0; targetVelocityX = 0; targetVelocityY = 0;
    if (immediate) { strength = 0; velocityX = 0; velocityY = 0; currentX = 0; currentY = 0; targetX = 0; targetY = 0; }
  }
  function fallback(reason: string) { stop(); release(); resetPointer(true); root.dataset.renderer = "fallback"; root.dataset.motion = reason; root.dataset.ambient = "static"; finishIntro(); }
  function measure() {
    const rect = root.getBoundingClientRect(); journey = galaxyMotionEnabled() ? clamp(-rect.top / (rect.height * .8)) : 0;
    root.style.setProperty("--ial-journey", journey.toFixed(4));
  }
  function requestDraw() {
    if (!frame && !disposed && visible && !document.hidden && !reduced.matches && !failed && !contextLost) frame = requestAnimationFrame(draw);
  }
  function projectPointer(x: number, y: number, now: number, withVelocity: boolean) {
    const rect = canvas!.getBoundingClientRect();
    if (!galaxyMotionEnabled() || isMobile() || x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) { resetPointer(); return; }
    const units = Math.min(rect.width / 2.08, rect.height / 1.16);
    const px = clamp((x - rect.left - rect.width / 2) / Math.max(1, units), -2, 2);
    const py = clamp(-(y - rect.top - rect.height / 2) / Math.max(1, units), -1.3, 1.3);
    const distanceToSegment = (ax: number, ay: number, bx: number, by: number) => {
      const t = clamp(((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2));
      return Math.hypot(px - ax - t * (bx - ax), py - ay - t * (by - ay));
    };
    const r = Math.hypot((px - .43 - (py - .015) * .145) / .35, (py - .015) / .445);
    const proximity = Math.min(Math.abs(r - 1) * .35, Math.hypot(px + .105, py + .335), distanceToSegment(-.537, -.36, -.439, .39), distanceToSegment(-.68, .21, -.44, .4), distanceToSegment(-.67, -.36, -.28, -.36));
    const nextStrength = clamp(1 - proximity / .3);
    if (strength < .0005 && nextStrength > 0) { currentX = px; currentY = py; }
    if (withVelocity && pointerPresent) {
      const delta = Math.max(8, now - lastPointerTime);
      targetVelocityX = clamp((px - targetX) * 150 / delta, -.8, .8);
      targetVelocityY = clamp((py - targetY) * 150 / delta, -.8, .8);
    }
    targetX = px; targetY = py; targetStrength = nextStrength;
    pointerPresent = true; lastPointerTime = now; lastClientX = x; lastClientY = y;
  }
  function draw(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden || reduced.matches || failed || contextLost) return;
    const mobile = isMobile(), enabled = galaxyMotionEnabled();
    const cap = qualityReduced ? 20 : 30;
    if (previousDraw && now - previousDraw < 1000 / cap - 1) { requestDraw(); return; }
    const rawDelta = previousDraw ? now - previousDraw : 16.7;
    const delta = Math.min(rawDelta, 60);
    try {
      if (!renderer || renderer.mobile !== mobile) {
        release(); renderer = createGalaxyRenderer(canvas!, mobile ? ialGenesis.particles.mobile : ialGenesis.particles.desktop, mobile);
        root.dataset.tier = mobile ? "light" : "desktop"; root.dataset.particles = String(renderer.particles);
      }
      if (geometryDirty) {
        const rect = canvas!.getBoundingClientRect();
        const dprCap = qualityReduced ? 1 : mobile ? ialGenesis.budgets.mobileDpr : ialGenesis.budgets.desktopDpr;
        renderer.resize(rect.width, rect.height, Math.min(devicePixelRatio || 1, dprCap)); geometryDirty = false;
      }
      if (!introDone) {
        elapsed += delta; const cssTime = clock?.getAnimations()[0]?.currentTime;
        if (typeof cssTime === "number") elapsed = Math.max(elapsed, cssTime);
        if (elapsed >= ialGenesis.introMs) finishIntro();
      }
      if (mobile || !enabled) resetPointer(true);
      if (now - lastPointerTime > 65) { targetVelocityX *= .5; targetVelocityY *= .5; }
      const damping = 1 - Math.exp(-delta / 85), fade = 1 - Math.exp(-delta / 105);
      currentX += (targetX - currentX) * damping; currentY += (targetY - currentY) * damping;
      strength += (targetStrength - strength) * fade;
      velocityX += (targetVelocityX - velocityX) * damping; velocityY += (targetVelocityY - velocityY) * damping;
      if (targetStrength === 0 && strength < .0005) { strength = 0; velocityX = 0; velocityY = 0; }
      const moving = Math.abs(currentX - targetX) + Math.abs(currentY - targetY) > .0005 || Math.abs(strength - targetStrength) > .0005 || Math.abs(velocityX) + Math.abs(velocityY) > .0005;
      const t = clamp(elapsed / ialGenesis.introMs), fadeTime = clamp((1 - t) / .35);
      const ambient = introDone && enabled && !mobile;
      // Integrate real active draw intervals, not frame counts. stop() clears
      // the interval origin, so hidden/offscreen time never causes a jump.
      if (ambient) ambientSeconds += rawDelta / 1000;
      rememberedAmbientTime = ambientSeconds;
      renderer.render({ time: introDone ? mobile ? 0 : ambientSeconds : elapsed / 1000 * fadeTime * fadeTime, formation: introDone ? 1 : clamp((elapsed - 450) / 2900), reveal: introDone ? 1 : clamp(elapsed / 900), scroll: journey, pointerX: clamp(currentX, -1, 1) * strength * .35, pointerY: clamp(currentY, -1, 1) * strength * .35, hoverX: currentX, hoverY: currentY, influence: strength, velocityX, velocityY });
      root.dataset.renderer = "webgl"; root.dataset.interaction = strength === 0 ? "resting" : moving ? "responding" : "held";
      root.dataset.quality = qualityReduced ? "adaptive" : "standard";
      root.dataset.ambient = ambient ? "running" : mobile ? "light-static" : "paused";
      root.dataset.motionPreference = enabled ? "on" : "off";
      // Slow visible frames reduce DPR and scheduling cost without replacing
      // the geometry, allocating a second canvas, or blocking page navigation.
      if (ambient && !qualityReduced && previousDraw) {
        sampledFrames++; if (rawDelta > 58) slowFrames++;
        if (sampledFrames >= 18) { if (slowFrames >= 7) { qualityReduced = true; geometryDirty = true; } sampledFrames = 0; slowFrames = 0; }
      }
      if (ambient || !introDone || moving || geometryDirty) { root.dataset.motion = ambient ? "ambient" : "responding"; previousDraw = now; requestDraw(); }
      else { root.dataset.motion = "settled"; previousDraw = 0; }
    } catch { failed = true; fallback("unavailable"); }
  }
  function onPointer(event: PointerEvent) {
    if (!fine.matches || reduced.matches || !galaxyMotionEnabled() || event.pointerType !== "mouse") return;
    projectPointer(event.clientX, event.clientY, performance.now(), true); requestDraw();
  }
  function leave() { resetPointer(); requestDraw(); }
  function pointerOut(event: PointerEvent) { if (!event.relatedTarget) leave(); }
  function onScroll() { measure(); if (pointerPresent) projectPointer(lastClientX, lastClientY, performance.now(), false); requestDraw(); }
  function visibility() { if (document.hidden) { stop(); resetPointer(true); root.dataset.motion = "hidden"; root.dataset.ambient = "suspended"; } else requestDraw(); }
  function preferences() {
    if (reduced.matches) fallback("reduced");
    else { stop(); resetPointer(true); if (!galaxyMotionEnabled()) finishIntro(); geometryDirty = true; measure(); state(); requestDraw(); }
  }
  function resize() { geometryDirty = true; resetPointer(true); measure(); requestDraw(); }
  function pageShow() { if (scrollY > 90) finishIntro(); geometryDirty = true; requestDraw(); }
  function timelineComplete() { if (!disposed && !introDone) { finishIntro(); requestDraw(); } }
  function control(event: Event) { if ((event as CustomEvent<string>).detail === "skip") { finishIntro(); requestDraw(); } }
  function lost(event: Event) { event.preventDefault(); contextLost = true; fallback("context-lost"); }
  function restored() { contextLost = false; failed = false; geometryDirty = true; state(); requestDraw(); }
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) { window.addEventListener("scroll", onScroll, { passive: true }); root.addEventListener("pointermove", onPointer, { passive: true }); requestDraw(); }
    else { if (entries[0].boundingClientRect.bottom <= 0) finishIntro(); window.removeEventListener("scroll", onScroll); root.removeEventListener("pointermove", onPointer); resetPointer(true); stop(); root.dataset.motion = "offscreen"; root.dataset.ambient = "suspended"; }
  }, { threshold: 0 });
  const sizes = new ResizeObserver(resize); observer.observe(canvas); sizes.observe(canvas);
  measure();
  root.addEventListener("pointerleave", leave); root.addEventListener("ial:control", control); clock?.addEventListener("animationend", timelineComplete);
  canvas.addEventListener("webglcontextlost", lost); canvas.addEventListener("webglcontextrestored", restored);
  document.addEventListener("visibilitychange", visibility); window.addEventListener("pageshow", pageShow); window.addEventListener("blur", leave); window.addEventListener("pointerout", pointerOut);
  reduced.addEventListener("change", preferences); fine.addEventListener("change", resize); narrow.addEventListener("change", resize);
  window.addEventListener(GALAXY_MOTION_EVENT, preferences);
  root.dataset.intro = introDone ? "complete" : "running";
  if (reduced.matches) fallback("reduced"); state();
  return () => {
    disposed = true; introductionSeen = true; stop(); release(); observer.disconnect(); sizes.disconnect();
    window.removeEventListener("scroll", onScroll); window.removeEventListener("pageshow", pageShow); window.removeEventListener("blur", leave); window.removeEventListener("pointerout", pointerOut);
    document.removeEventListener("visibilitychange", visibility); root.removeEventListener("pointermove", onPointer); root.removeEventListener("pointerleave", leave); root.removeEventListener("ial:control", control); clock?.removeEventListener("animationend", timelineComplete);
    canvas.removeEventListener("webglcontextlost", lost); canvas.removeEventListener("webglcontextrestored", restored);
    reduced.removeEventListener("change", preferences); fine.removeEventListener("change", resize); narrow.removeEventListener("change", resize);
    window.removeEventListener(GALAXY_MOTION_EVENT, preferences);
  };
}
