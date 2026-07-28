"use client";
import { createContext, useRef, useMemo, useCallback, useEffect, useState, useContext } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// src/react/MatterFluxOverlay.tsx

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
function MatterFluxOverlay({ session, onComplete }) {
  const canvasRef = useRef(null);
  const frameRef = useRef();
  const completedRef = useRef(false);
  const startedAtRef = useRef(performance.now());
  const pausedAtRef = useRef(null);
  const lastFrameAtRef = useRef(0);
  const { options, outcome, outcomeStartedAt } = session;
  const style = useMemo(
    () => ({
      "--matterflux-x": `${options.center.x}px`,
      "--matterflux-y": `${options.center.y}px`,
      "--matterflux-primary": options.primaryColor,
      "--matterflux-secondary": options.secondaryColor,
      "--matterflux-core": options.coreColor,
      "--matterflux-bg": options.backgroundColor,
      "--matterflux-overlay-opacity": `${options.overlayOpacity * 100}%`,
      "--matterflux-resolve-duration": `${options.duration * (outcome === "failure" ? 0.5 : 0.36)}ms`
    }),
    [options, outcome]
  );
  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = void 0;
    onComplete(session.id);
  }, [onComplete, session.id]);
  useEffect(() => {
    if (!options.reducedMotion || !outcome) return;
    const timer = window.setTimeout(finish, outcome === "success" ? 240 : 320);
    return () => window.clearTimeout(timer);
  }, [finish, options.reducedMotion, outcome]);
  useEffect(() => {
    if (!outcome) return;
    let timer;
    const watchdog = () => {
      if (document.hidden) {
        timer = window.setTimeout(watchdog, 250);
      } else {
        finish();
      }
    };
    timer = window.setTimeout(watchdog, options.duration + 500);
    return () => window.clearTimeout(timer);
  }, [finish, options.duration, outcome]);
  useEffect(() => {
    if (options.reducedMotion) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    pausedAtRef.current = document.hidden ? performance.now() : null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = createMatterFluxParticles(options.particleCount, width, height, options, session.id);
    let active = true;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createMatterFluxParticles(options.particleCount, width, height, options, session.id);
    };
    const scheduleFrame = () => {
      if (!active || document.hidden || frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(draw);
    };
    function draw(now) {
      frameRef.current = void 0;
      if (!active || document.hidden) return;
      if (now - lastFrameAtRef.current < 1e3 / 60 - 0.5) {
        scheduleFrame();
        return;
      }
      lastFrameAtRef.current = now;
      const frame = drawMatterFluxFrame({
        context,
        particles,
        width,
        height,
        options,
        elapsed: now - startedAtRef.current,
        outcome,
        resolutionElapsed: outcomeStartedAt ? now - outcomeStartedAt : 0,
        now
      });
      if (frame.complete) {
        finish();
      } else if (!frame.settled) {
        scheduleFrame();
      }
    }
    const handleVisibility = () => {
      if (document.hidden) {
        pausedAtRef.current = performance.now();
        if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
        frameRef.current = void 0;
        return;
      }
      if (pausedAtRef.current !== null) {
        startedAtRef.current += performance.now() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
      scheduleFrame();
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    scheduleFrame();
    return () => {
      active = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = void 0;
    };
  }, [finish, options, outcome, outcomeStartedAt, session.id]);
  const stateClass = outcome ? `matterflux-overlay--${outcome}` : "matterflux-overlay--collapse";
  const statusLabel = outcome === "failure" ? options.failureMessage : outcome === "success" ? options.successMessage : options.label;
  return /* @__PURE__ */ jsxs("div", { className: `matterflux-overlay ${stateClass}`, style, role: "status", "aria-live": "assertive", "aria-label": statusLabel, children: [
    /* @__PURE__ */ jsx("div", { className: "matterflux-vignette", "aria-hidden": "true" }),
    options.reducedMotion ? /* @__PURE__ */ jsx("div", { className: "matterflux-reduced", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "matterflux-reduced-dot" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "matterflux-canvas", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "matterflux-singularity", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("span", { className: "matterflux-ring matterflux-ring--outer" }),
        /* @__PURE__ */ jsx("span", { className: "matterflux-ring matterflux-ring--inner" }),
        /* @__PURE__ */ jsx("span", { className: "matterflux-core" }),
        outcome === "success" ? /* @__PURE__ */ jsx("span", { className: "matterflux-shockwave" }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "matterflux-label", children: statusLabel })
  ] });
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
var MatterFluxContext = createContext(null);
function navigate(href, target) {
  if (target === "_blank") {
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(href);
    return;
  }
  window.location.assign(href);
}
function reportError(options, error) {
  try {
    options.onError?.(error);
  } catch {
  }
}
function MatterFluxProvider({ children, ...providerDefaults }) {
  const [session, setSession] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const defaultsRef = useRef(providerDefaults);
  const activeRef = useRef(false);
  const mountedRef = useRef(true);
  const completionRef = useRef(null);
  const delayResolversRef = useRef(/* @__PURE__ */ new Map());
  const announcementTimerRef = useRef();
  const sessionIdRef = useRef(0);
  defaultsRef.current = providerDefaults;
  const waitFor = useCallback((duration) => {
    return new Promise((resolve) => {
      let timer = 0;
      const finish = () => {
        window.clearTimeout(timer);
        delayResolversRef.current.delete(timer);
        resolve();
      };
      timer = window.setTimeout(finish, duration);
      delayResolversRef.current.set(timer, finish);
    });
  }, []);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      activeRef.current = false;
      if (announcementTimerRef.current) window.clearTimeout(announcementTimerRef.current);
      for (const finish of delayResolversRef.current.values()) finish();
      delayResolversRef.current.clear();
      completionRef.current?.();
      completionRef.current = null;
    };
  }, []);
  const handleOverlayComplete = useCallback((id) => {
    if (id !== sessionIdRef.current) return;
    completionRef.current?.();
    completionRef.current = null;
  }, []);
  const runMatterFlux = useCallback(
    async (options = {}) => {
      if (activeRef.current || !mountedRef.current) return false;
      activeRef.current = true;
      const resolved = resolveMatterFluxOptions(options, defaultsRef.current);
      const id = ++sessionIdRef.current;
      try {
        resolved.onStart?.();
      } catch (error) {
        reportError(resolved, error);
        activeRef.current = false;
        return false;
      }
      setAnnouncement(null);
      setSession({ id, outcome: null, outcomeStartedAt: null, options: resolved });
      let actionError;
      const actionResult = resolved.action ? Promise.resolve().then(resolved.action).then(
        () => true,
        (error) => {
          actionError = error;
          return false;
        }
      ) : Promise.resolve(true);
      const [actionSucceeded] = await Promise.all([
        actionResult,
        waitFor(resolved.reducedMotion ? 160 : resolved.duration * 0.58)
      ]);
      if (!mountedRef.current) return false;
      const outcome = actionSucceeded ? resolved.mode : "failure";
      if (actionError !== void 0) reportError(resolved, actionError);
      setSession(
        (current) => current?.id === id ? { ...current, outcome, outcomeStartedAt: performance.now() } : current
      );
      await new Promise((resolve) => {
        completionRef.current = resolve;
      });
      if (!mountedRef.current) return false;
      setSession(null);
      activeRef.current = false;
      try {
        resolved.onComplete?.();
      } catch (error) {
        reportError(resolved, error);
      }
      if (outcome === "failure") {
        setAnnouncement(resolved.failureMessage);
        announcementTimerRef.current = window.setTimeout(() => setAnnouncement(null), 5e3);
        return false;
      }
      if (resolved.href) navigate(resolved.href, resolved.target);
      return true;
    },
    [waitFor]
  );
  const value = useMemo(
    () => ({ isActive: session !== null, runMatterFlux }),
    [runMatterFlux, session]
  );
  return /* @__PURE__ */ jsxs(MatterFluxContext.Provider, { value, children: [
    children,
    session ? /* @__PURE__ */ jsx(MatterFluxOverlay, { session, onComplete: handleOverlayComplete }, session.id) : null,
    announcement ? /* @__PURE__ */ jsxs("div", { className: "matterflux-toast", role: "alert", children: [
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true" }),
      announcement
    ] }) : null
  ] });
}
function useMatterFlux() {
  const context = useContext(MatterFluxContext);
  if (!context) {
    throw new Error("useMatterFlux must be used inside a MatterFluxProvider.");
  }
  return context;
}

export { MatterFluxOverlay, MatterFluxProvider, useMatterFlux };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map