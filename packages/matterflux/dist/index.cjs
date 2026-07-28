'use strict';

// src/animation.ts
var clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
var easeInCubic = (value) => value * value * value;
var easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
function createMatterFluxParticles(count, width, height, options, seed) {
  let randomState = seed >>> 0;
  const random = () => {
    randomState += 1831565813;
    let value = randomState;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
  return Array.from({ length: count }, (_, index) => {
    const edge = index % 4;
    const along = random();
    const padding = random() * Math.min(width, height) * 0.06;
    let x = 0;
    let y = 0;
    if (edge === 0) {
      x = along * width;
      y = padding;
    } else if (edge === 1) {
      x = width - padding;
      y = along * height;
    } else if (edge === 2) {
      x = along * width;
      y = height - padding;
    } else {
      x = padding;
      y = along * height;
    }
    return {
      x,
      y,
      size: 0.7 + random() * 2.2,
      spin: (random() > 0.5 ? 1 : -1) * (0.3 + random() * 1.2),
      phase: random() * Math.PI * 2,
      alpha: 0.42 + random() * 0.58,
      color: index % 13 === 0 ? options.coreColor : index % 5 === 0 ? options.secondaryColor : options.primaryColor
    };
  });
}
function drawMatterFluxFrame({
  context,
  particles,
  width,
  height,
  options,
  elapsed,
  outcome,
  resolutionElapsed,
  now
}) {
  const collapseDuration = options.duration * 0.64;
  const collapse = clamp(elapsed / collapseDuration);
  const travel = easeInCubic(collapse);
  const resolutionDuration = outcome === "success" ? options.duration * 0.36 : options.duration * 0.5;
  const resolution = outcome ? clamp(resolutionElapsed / resolutionDuration) : 0;
  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = "lighter";
  for (const particle of particles) {
    const dx = options.center.x - particle.x;
    const dy = options.center.y - particle.y;
    const distance = Math.hypot(dx, dy) || 1;
    const perpendicularX = -dy / distance;
    const perpendicularY = dx / distance;
    const spiral = Math.sin(travel * Math.PI * 2.4 + particle.phase) * distance * 0.12 * (1 - travel) * particle.spin;
    let x = particle.x + dx * travel + perpendicularX * spiral;
    let y = particle.y + dy * travel + perpendicularY * spiral;
    let alpha = particle.alpha * clamp(collapse * 2.8) * (1 - resolution);
    if (outcome === "failure") {
      x -= dx * resolution * 0.035;
      y -= dy * resolution * 0.035;
      alpha *= 1 - resolution;
    }
    const size = particle.size * (0.75 + travel * 1.4);
    context.beginPath();
    context.fillStyle = particle.color;
    context.globalAlpha = alpha;
    context.shadowBlur = 8 + size * 3;
    context.shadowColor = particle.color;
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }
  const pulse = 0.92 + Math.sin(now * 0.012) * 0.08;
  const baseRadius = 12 + collapse * 20;
  const successBoost = outcome === "success" ? easeOutCubic(resolution) * 38 : 0;
  const failureFade = outcome === "failure" ? 1 - resolution : 1;
  const gradient = context.createRadialGradient(
    options.center.x,
    options.center.y,
    0,
    options.center.x,
    options.center.y,
    (baseRadius + successBoost) * 3.2
  );
  gradient.addColorStop(0, options.coreColor);
  gradient.addColorStop(0.12, options.primaryColor);
  gradient.addColorStop(0.48, options.primaryColor);
  gradient.addColorStop(1, "transparent");
  context.globalAlpha = clamp(collapse * 1.8) * failureFade;
  context.shadowBlur = 36 + successBoost;
  context.shadowColor = options.primaryColor;
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(options.center.x, options.center.y, (baseRadius + successBoost) * pulse * 3.2, 0, Math.PI * 2);
  context.fill();
  if (outcome === "success" && resolution > 0.06) {
    const shockwave = easeOutCubic(resolution);
    context.globalAlpha = (1 - resolution) * 0.9;
    context.strokeStyle = options.coreColor;
    context.lineWidth = 2.5;
    context.shadowBlur = 18;
    context.beginPath();
    context.arc(options.center.x, options.center.y, 18 + shockwave * Math.max(width, height) * 0.34, 0, Math.PI * 2);
    context.stroke();
  }
  context.globalAlpha = 1;
  context.shadowBlur = 0;
  context.globalCompositeOperation = "source-over";
  return {
    complete: Boolean(outcome) && resolution >= 1,
    settled: !outcome && collapse >= 1
  };
}

// src/defaults.ts
var MATTERFLUX_DEFAULTS = {
  primaryColor: "#a855f7",
  secondaryColor: "#22d3ee",
  coreColor: "#f5d0fe",
  backgroundColor: "#020617",
  overlayOpacity: 0.88,
  duration: 1400,
  intensity: "medium",
  label: "Resolving action",
  successMessage: "Action complete",
  failureMessage: "The action could not be completed"
};
var MATTERFLUX_PARTICLE_COUNTS = {
  low: { desktop: 50, mobile: 25 },
  medium: { desktop: 90, mobile: 45 },
  high: { desktop: 140, mobile: 70 }
};
var clamp2 = (value, min, max) => Math.min(max, Math.max(min, value));
function resolveCenter(options) {
  if (Number.isFinite(options.x) && Number.isFinite(options.y)) {
    return { x: options.x, y: options.y };
  }
  if (options.event && Number.isFinite(options.event.clientX) && Number.isFinite(options.event.clientY)) {
    return { x: options.event.clientX, y: options.event.clientY };
  }
  const eventOrigin = options.event?.currentTarget;
  const origin = options.origin ?? (eventOrigin instanceof Element ? eventOrigin : null);
  if (origin) {
    const bounds = origin.getBoundingClientRect();
    return { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}
function resolveMatterFluxOptions(options = {}, defaults = {}) {
  const merged = { ...defaults, ...options };
  const intensity = merged.intensity ?? MATTERFLUX_DEFAULTS.intensity;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const systemReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reducedMotion = merged.reducedMotion === true || systemReducedMotion;
  const defaultParticleCount = MATTERFLUX_PARTICLE_COUNTS[intensity][isMobile ? "mobile" : "desktop"];
  const duration = clamp2(merged.duration ?? MATTERFLUX_DEFAULTS.duration, 650, 3e3);
  return {
    center: resolveCenter(merged),
    label: merged.label ?? MATTERFLUX_DEFAULTS.label,
    mode: merged.mode ?? "success",
    href: merged.href,
    target: merged.target ?? "_self",
    duration: reducedMotion ? 420 : duration,
    intensity,
    particleCount: Math.round(clamp2(merged.particleCount ?? defaultParticleCount, 0, 200)),
    primaryColor: merged.primaryColor ?? MATTERFLUX_DEFAULTS.primaryColor,
    secondaryColor: merged.secondaryColor ?? MATTERFLUX_DEFAULTS.secondaryColor,
    coreColor: merged.coreColor ?? MATTERFLUX_DEFAULTS.coreColor,
    backgroundColor: merged.backgroundColor ?? MATTERFLUX_DEFAULTS.backgroundColor,
    overlayOpacity: clamp2(merged.overlayOpacity ?? MATTERFLUX_DEFAULTS.overlayOpacity, 0, 1),
    reducedMotion,
    action: merged.action,
    successMessage: merged.successMessage ?? MATTERFLUX_DEFAULTS.successMessage,
    failureMessage: merged.failureMessage ?? MATTERFLUX_DEFAULTS.failureMessage,
    onStart: merged.onStart,
    onComplete: merged.onComplete,
    onError: merged.onError
  };
}

// src/matterflux.ts
var runtimeSeed = 0;
function reportError(options, error) {
  try {
    options.onError?.(error);
  } catch {
  }
}
function navigate(href, target) {
  if (target === "_blank") {
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(href);
    return;
  }
  window.location.assign(href);
}
function createOverlayRuntime(options) {
  const id = ++runtimeSeed;
  const overlay = document.createElement("div");
  overlay.className = "matterflux-overlay matterflux-overlay--collapse";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "assertive");
  overlay.setAttribute("aria-label", options.label);
  overlay.style.setProperty("--matterflux-x", `${options.center.x}px`);
  overlay.style.setProperty("--matterflux-y", `${options.center.y}px`);
  overlay.style.setProperty("--matterflux-primary", options.primaryColor);
  overlay.style.setProperty("--matterflux-secondary", options.secondaryColor);
  overlay.style.setProperty("--matterflux-core", options.coreColor);
  overlay.style.setProperty("--matterflux-bg", options.backgroundColor);
  overlay.style.setProperty("--matterflux-overlay-opacity", `${options.overlayOpacity * 100}%`);
  overlay.style.setProperty("--matterflux-resolve-duration", `${options.duration * 0.36}ms`);
  const vignette = document.createElement("div");
  vignette.className = "matterflux-vignette";
  vignette.setAttribute("aria-hidden", "true");
  overlay.append(vignette);
  let canvas = null;
  let context = null;
  if (options.reducedMotion) {
    const reduced = document.createElement("div");
    reduced.className = "matterflux-reduced";
    reduced.setAttribute("aria-hidden", "true");
    const dot = document.createElement("span");
    dot.className = "matterflux-reduced-dot";
    reduced.append(dot);
    overlay.append(reduced);
  } else {
    canvas = document.createElement("canvas");
    canvas.className = "matterflux-canvas";
    canvas.setAttribute("aria-hidden", "true");
    context = canvas.getContext("2d");
    overlay.append(canvas);
    const singularity = document.createElement("div");
    singularity.className = "matterflux-singularity";
    singularity.setAttribute("aria-hidden", "true");
    for (const className of [
      "matterflux-ring matterflux-ring--outer",
      "matterflux-ring matterflux-ring--inner",
      "matterflux-core"
    ]) {
      const item = document.createElement("span");
      item.className = className;
      singularity.append(item);
    }
    overlay.append(singularity);
  }
  const label = document.createElement("p");
  label.className = "matterflux-label";
  label.textContent = options.label;
  overlay.append(label);
  document.body.append(overlay);
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = createMatterFluxParticles(options.particleCount, width, height, options, id);
  let frameId = null;
  let outcome = null;
  let outcomeStartedAt = null;
  let startedAt = performance.now();
  let pausedAt = document.hidden ? performance.now() : null;
  let lastFrameAt = 0;
  let complete = false;
  const timers = /* @__PURE__ */ new Set();
  let resolveDone = () => {
  };
  const done = new Promise((resolve) => {
    resolveDone = resolve;
  });
  const scheduleTimer = (callback, duration) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, duration);
    timers.add(timer);
    return timer;
  };
  const finish = () => {
    if (complete) return;
    complete = true;
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    frameId = null;
    resolveDone();
  };
  const resize = () => {
    if (!canvas || !context) return;
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = createMatterFluxParticles(options.particleCount, width, height, options, id);
  };
  const scheduleFrame = () => {
    if (complete || document.hidden || frameId !== null || !context) return;
    frameId = window.requestAnimationFrame(draw);
  };
  function draw(now) {
    frameId = null;
    if (complete || document.hidden || !context) return;
    if (now - lastFrameAt < 1e3 / 60 - 0.5) {
      scheduleFrame();
      return;
    }
    lastFrameAt = now;
    const frame = drawMatterFluxFrame({
      context,
      particles,
      width,
      height,
      options,
      elapsed: now - startedAt,
      outcome,
      resolutionElapsed: outcomeStartedAt ? now - outcomeStartedAt : 0,
      now
    });
    if (frame.complete) {
      finish();
      return;
    }
    if (!frame.settled) scheduleFrame();
  }
  const handleVisibility = () => {
    if (document.hidden) {
      pausedAt = performance.now();
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
      return;
    }
    if (pausedAt !== null) {
      const pauseDuration = performance.now() - pausedAt;
      startedAt += pauseDuration;
      if (outcomeStartedAt !== null) outcomeStartedAt += pauseDuration;
      pausedAt = null;
    }
    scheduleFrame();
  };
  if (canvas && context) {
    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    scheduleFrame();
  }
  const setOutcome = (nextOutcome) => {
    if (complete) return;
    outcome = nextOutcome;
    outcomeStartedAt = performance.now();
    overlay.className = `matterflux-overlay matterflux-overlay--${nextOutcome}`;
    overlay.style.setProperty(
      "--matterflux-resolve-duration",
      `${options.duration * (nextOutcome === "failure" ? 0.5 : 0.36)}ms`
    );
    const status = nextOutcome === "success" ? options.successMessage : options.failureMessage;
    overlay.setAttribute("aria-label", status);
    label.textContent = status;
    if (nextOutcome === "success") {
      const singularity = overlay.querySelector(".matterflux-singularity");
      const shockwave = document.createElement("span");
      shockwave.className = "matterflux-shockwave";
      singularity?.append(shockwave);
    }
    if (options.reducedMotion) {
      scheduleTimer(finish, nextOutcome === "success" ? 240 : 320);
    } else if (!context) {
      scheduleTimer(finish, 360);
    } else {
      scheduleFrame();
    }
    const watchdog = () => {
      if (document.hidden) {
        scheduleTimer(watchdog, 250);
      } else {
        finish();
      }
    };
    scheduleTimer(watchdog, options.duration + 500);
  };
  const cleanup = () => {
    finish();
    if (canvas && context) {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    }
    for (const timer of timers) window.clearTimeout(timer);
    timers.clear();
    overlay.remove();
  };
  return { element: overlay, done, setOutcome, cleanup };
}
function createMatterFlux(defaultOptions = {}) {
  let active = false;
  let destroyed = false;
  let runtime = null;
  let resolveDestroyed = () => {
  };
  const destroyedSignal = new Promise((resolve) => {
    resolveDestroyed = resolve;
  });
  const run = async (options = {}) => {
    if (active || destroyed) return false;
    if (typeof window === "undefined" || typeof document === "undefined") {
      reportError({ ...defaultOptions, ...options }, new Error("MatterFlux requires a browser environment."));
      return false;
    }
    active = true;
    const resolved = resolveMatterFluxOptions(options, defaultOptions);
    let collapseTimer;
    try {
      resolved.onStart?.();
      runtime = createOverlayRuntime(resolved);
      let actionError;
      const actionResult = resolved.action ? Promise.resolve().then(resolved.action).then(
        () => true,
        (error) => {
          actionError = error;
          return false;
        }
      ) : Promise.resolve(true);
      const collapseDelay = new Promise((resolve) => {
        collapseTimer = window.setTimeout(resolve, resolved.reducedMotion ? 160 : resolved.duration * 0.58);
      });
      const result = await Promise.race([
        Promise.all([actionResult, collapseDelay]).then(([succeeded]) => succeeded),
        destroyedSignal.then(() => false)
      ]);
      if (destroyed) return false;
      const outcome = result ? resolved.mode : "failure";
      if (actionError !== void 0) reportError(resolved, actionError);
      runtime.setOutcome(outcome);
      await Promise.race([runtime.done, destroyedSignal]);
      if (destroyed) return false;
      runtime.cleanup();
      runtime = null;
      try {
        resolved.onComplete?.();
      } catch (error) {
        reportError(resolved, error);
      }
      if (outcome === "success" && resolved.href) navigate(resolved.href, resolved.target);
      return outcome === "success";
    } catch (error) {
      reportError(resolved, error);
      runtime?.cleanup();
      runtime = null;
      return false;
    } finally {
      if (collapseTimer !== void 0) window.clearTimeout(collapseTimer);
      active = false;
    }
  };
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    active = false;
    runtime?.cleanup();
    runtime = null;
    resolveDestroyed();
  };
  return {
    run,
    destroy,
    isActive: () => active
  };
}
var MatterFlux = Object.freeze({ create: createMatterFlux });

exports.MATTERFLUX_DEFAULTS = MATTERFLUX_DEFAULTS;
exports.MATTERFLUX_PARTICLE_COUNTS = MATTERFLUX_PARTICLE_COUNTS;
exports.MatterFlux = MatterFlux;
exports.createMatterFlux = createMatterFlux;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map