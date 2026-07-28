import { createMatterFluxParticles, drawMatterFluxFrame } from "./animation";
import { resolveMatterFluxOptions } from "./defaults";
import type {
  MatterFluxInstance,
  MatterFluxMode,
  MatterFluxOptions,
  MatterFluxResolvedOptions
} from "./types";

type OverlayRuntime = {
  element: HTMLDivElement;
  done: Promise<void>;
  setOutcome: (outcome: MatterFluxMode) => void;
  cleanup: () => void;
};

let runtimeSeed = 0;

function reportError(options: MatterFluxResolvedOptions | MatterFluxOptions, error: unknown) {
  try {
    options.onError?.(error);
  } catch {
    // Consumer error handlers must not leave the overlay mounted.
  }
}

function navigate(href: string, target: MatterFluxResolvedOptions["target"]) {
  if (target === "_blank") {
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(href);
    return;
  }

  window.location.assign(href);
}

function createOverlayRuntime(options: MatterFluxResolvedOptions): OverlayRuntime {
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

  let canvas: HTMLCanvasElement | null = null;
  let context: CanvasRenderingContext2D | null = null;

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
  let frameId: number | null = null;
  let outcome: MatterFluxMode | null = null;
  let outcomeStartedAt: number | null = null;
  let startedAt = performance.now();
  let pausedAt = document.hidden ? performance.now() : null;
  let lastFrameAt = 0;
  let complete = false;
  const timers = new Set<number>();
  let resolveDone: () => void = () => {};
  const done = new Promise<void>((resolve) => {
    resolveDone = resolve;
  });

  const scheduleTimer = (callback: () => void, duration: number) => {
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

  function draw(now: number) {
    frameId = null;
    if (complete || document.hidden || !context) return;

    if (now - lastFrameAt < 1000 / 60 - 0.5) {
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

  const setOutcome = (nextOutcome: MatterFluxMode) => {
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

export function createMatterFlux(defaultOptions: MatterFluxOptions = {}): MatterFluxInstance {
  let active = false;
  let destroyed = false;
  let runtime: OverlayRuntime | null = null;
  let resolveDestroyed: () => void = () => {};
  const destroyedSignal = new Promise<void>((resolve) => {
    resolveDestroyed = resolve;
  });

  const run = async (options: MatterFluxOptions = {}) => {
    if (active || destroyed) return false;
    if (typeof window === "undefined" || typeof document === "undefined") {
      reportError({ ...defaultOptions, ...options }, new Error("MatterFlux requires a browser environment."));
      return false;
    }

    active = true;
    const resolved = resolveMatterFluxOptions(options, defaultOptions);
    let collapseTimer: number | undefined;

    try {
      resolved.onStart?.();
      runtime = createOverlayRuntime(resolved);

      let actionError: unknown;
      const actionResult = resolved.action
        ? Promise.resolve()
            .then(resolved.action)
            .then(
              () => true,
              (error: unknown) => {
                actionError = error;
                return false;
              }
            )
        : Promise.resolve(true);
      const collapseDelay = new Promise<void>((resolve) => {
        collapseTimer = window.setTimeout(resolve, resolved.reducedMotion ? 160 : resolved.duration * 0.58);
      });

      const result = await Promise.race([
        Promise.all([actionResult, collapseDelay]).then(([succeeded]) => succeeded),
        destroyedSignal.then(() => false)
      ]);
      if (destroyed) return false;

      const outcome: MatterFluxMode = result ? resolved.mode : "failure";
      if (actionError !== undefined) reportError(resolved, actionError);
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
      if (collapseTimer !== undefined) window.clearTimeout(collapseTimer);
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

export const MatterFlux = Object.freeze({ create: createMatterFlux });
