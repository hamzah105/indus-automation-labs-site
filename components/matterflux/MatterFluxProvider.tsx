"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MatterFluxOverlay } from "./MatterFluxOverlay";
import type {
  MatterFluxContextValue,
  MatterFluxIntensity,
  MatterFluxMode,
  MatterFluxOptions,
  MatterFluxProviderProps,
  MatterFluxResolvedOptions,
  MatterFluxSession
} from "./types";

const DEFAULTS = {
  primaryColor: "#a855f7",
  secondaryColor: "#22d3ee",
  coreColor: "#f5d0fe",
  backgroundColor: "#020617",
  duration: 1400,
  intensity: "medium" as MatterFluxIntensity,
  successMessage: "Action complete",
  failureMessage: "The action could not be completed"
};

const particleScale: Record<MatterFluxIntensity, number> = {
  low: 0.72,
  medium: 1,
  high: 1.28
};

export const MatterFluxContext = createContext<MatterFluxContextValue | null>(null);

function delay(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

function resolveCenter(options: MatterFluxOptions) {
  if (options.event && Number.isFinite(options.event.clientX) && Number.isFinite(options.event.clientY)) {
    return { x: options.event.clientX, y: options.event.clientY };
  }

  if (options.origin) {
    const bounds = options.origin.getBoundingClientRect();
    return { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
  }

  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

function navigate(href: string, target: MatterFluxOptions["target"]) {
  if (target === "_blank") {
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(href);
    return;
  }

  window.location.assign(href);
}

export function MatterFluxProvider({
  children,
  primaryColor = DEFAULTS.primaryColor,
  secondaryColor = DEFAULTS.secondaryColor,
  coreColor = DEFAULTS.coreColor,
  backgroundColor = DEFAULTS.backgroundColor,
  duration = DEFAULTS.duration,
  particleCount,
  intensity = DEFAULTS.intensity,
  successMessage = DEFAULTS.successMessage,
  failureMessage = DEFAULTS.failureMessage
}: MatterFluxProviderProps) {
  const [session, setSession] = useState<MatterFluxSession | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const activeRef = useRef(false);
  const mountedRef = useRef(true);
  const completionRef = useRef<(() => void) | null>(null);
  const announcementTimerRef = useRef<number>();
  const sessionIdRef = useRef(0);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (announcementTimerRef.current) window.clearTimeout(announcementTimerRef.current);
      completionRef.current?.();
    };
  }, []);

  const handleOverlayComplete = useCallback((id: number) => {
    if (id !== sessionIdRef.current) return;
    completionRef.current?.();
    completionRef.current = null;
  }, []);

  const runMatterFlux = useCallback(
    async (options: MatterFluxOptions = {}) => {
      if (activeRef.current || !mountedRef.current) return false;
      activeRef.current = true;

      const id = ++sessionIdRef.current;
      const selectedIntensity = options.intensity ?? intensity;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const baseParticles = particleCount ?? (isMobile ? 70 : 160);
      const selectedDuration = Math.min(3000, Math.max(650, options.duration ?? duration));
      const resolved: MatterFluxResolvedOptions = {
        center: resolveCenter(options),
        duration: reducedMotion ? 420 : selectedDuration,
        particleCount: Math.round(
          Math.min(240, Math.max(24, options.particleCount ?? baseParticles * particleScale[selectedIntensity]))
        ),
        intensity: selectedIntensity,
        label: options.label ?? "Resolving action",
        primaryColor: options.primaryColor ?? primaryColor,
        secondaryColor: options.secondaryColor ?? secondaryColor,
        coreColor: options.coreColor ?? coreColor,
        backgroundColor: options.backgroundColor ?? backgroundColor,
        successMessage: options.successMessage ?? successMessage,
        failureMessage: options.failureMessage ?? failureMessage
      };

      setAnnouncement(null);
      setSession({ id, outcome: null, outcomeStartedAt: null, options: resolved });

      let outcome: MatterFluxMode = options.mode ?? options.result ?? "success";
      const [actionResult] = await Promise.all([
        options.action
          ? Promise.resolve().then(options.action).then(() => true, () => false)
          : Promise.resolve(true),
        delay(reducedMotion ? 160 : selectedDuration * 0.58)
      ]);
      if (!actionResult) outcome = "failure";

      if (!mountedRef.current) {
        activeRef.current = false;
        return false;
      }

      setSession((current) =>
        current?.id === id
          ? { ...current, outcome, outcomeStartedAt: performance.now() }
          : current
      );

      await new Promise<void>((resolve) => {
        completionRef.current = resolve;
      });

      if (!mountedRef.current) {
        activeRef.current = false;
        return false;
      }

      setSession(null);
      activeRef.current = false;

      if (outcome === "failure") {
        setAnnouncement(resolved.failureMessage);
        announcementTimerRef.current = window.setTimeout(() => setAnnouncement(null), 5000);
        return false;
      }

      if (options.href) navigate(options.href, options.target);
      return true;
    },
    [backgroundColor, coreColor, duration, failureMessage, intensity, particleCount, primaryColor, secondaryColor, successMessage]
  );

  const value = useMemo<MatterFluxContextValue>(
    () => ({ isActive: session !== null, runMatterFlux }),
    [runMatterFlux, session]
  );

  return (
    <MatterFluxContext.Provider value={value}>
      {children}
      {session ? <MatterFluxOverlay key={session.id} session={session} onComplete={handleOverlayComplete} /> : null}
      {announcement ? (
        <div className="matterflux-toast" role="alert">
          <span aria-hidden="true" />
          {announcement}
        </div>
      ) : null}
    </MatterFluxContext.Provider>
  );
}
