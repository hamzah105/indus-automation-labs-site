import type { MatterFluxIntensity, MatterFluxOptions, MatterFluxResolvedOptions } from "./types";

export const MATTERFLUX_DEFAULTS = {
  primaryColor: "#a855f7",
  secondaryColor: "#22d3ee",
  coreColor: "#f5d0fe",
  backgroundColor: "#020617",
  overlayOpacity: 0.88,
  duration: 1400,
  intensity: "medium" as MatterFluxIntensity,
  label: "Resolving action",
  successMessage: "Action complete",
  failureMessage: "The action could not be completed"
};

export const MATTERFLUX_PARTICLE_COUNTS: Record<MatterFluxIntensity, { desktop: number; mobile: number }> = {
  low: { desktop: 50, mobile: 25 },
  medium: { desktop: 90, mobile: 45 },
  high: { desktop: 140, mobile: 70 }
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function resolveCenter(options: MatterFluxOptions) {
  if (Number.isFinite(options.x) && Number.isFinite(options.y)) {
    return { x: options.x as number, y: options.y as number };
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

export function resolveMatterFluxOptions(
  options: MatterFluxOptions = {},
  defaults: MatterFluxOptions = {}
): MatterFluxResolvedOptions {
  const merged = { ...defaults, ...options };
  const intensity = merged.intensity ?? MATTERFLUX_DEFAULTS.intensity;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const systemReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reducedMotion = merged.reducedMotion === true || systemReducedMotion;
  const defaultParticleCount = MATTERFLUX_PARTICLE_COUNTS[intensity][isMobile ? "mobile" : "desktop"];
  const duration = clamp(merged.duration ?? MATTERFLUX_DEFAULTS.duration, 650, 3000);

  return {
    center: resolveCenter(merged),
    label: merged.label ?? MATTERFLUX_DEFAULTS.label,
    mode: merged.mode ?? "success",
    href: merged.href,
    target: merged.target ?? "_self",
    duration: reducedMotion ? 420 : duration,
    intensity,
    particleCount: Math.round(clamp(merged.particleCount ?? defaultParticleCount, 0, 200)),
    primaryColor: merged.primaryColor ?? MATTERFLUX_DEFAULTS.primaryColor,
    secondaryColor: merged.secondaryColor ?? MATTERFLUX_DEFAULTS.secondaryColor,
    coreColor: merged.coreColor ?? MATTERFLUX_DEFAULTS.coreColor,
    backgroundColor: merged.backgroundColor ?? MATTERFLUX_DEFAULTS.backgroundColor,
    overlayOpacity: clamp(merged.overlayOpacity ?? MATTERFLUX_DEFAULTS.overlayOpacity, 0, 1),
    reducedMotion,
    action: merged.action,
    successMessage: merged.successMessage ?? MATTERFLUX_DEFAULTS.successMessage,
    failureMessage: merged.failureMessage ?? MATTERFLUX_DEFAULTS.failureMessage,
    onStart: merged.onStart,
    onComplete: merged.onComplete,
    onError: merged.onError
  };
}
