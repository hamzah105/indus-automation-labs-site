import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { resolveMatterFluxOptions } from "../defaults";
import type { MatterFluxMode, MatterFluxOptions, MatterFluxSession } from "../types";
import { MatterFluxOverlay } from "./MatterFluxOverlay";

export type MatterFluxContextValue = {
  isActive: boolean;
  runMatterFlux: (options?: MatterFluxOptions) => Promise<boolean>;
};

export type MatterFluxProviderProps = MatterFluxOptions & {
  children: ReactNode;
};

export const MatterFluxContext = createContext<MatterFluxContextValue | null>(null);

function navigate(href: string, target: MatterFluxOptions["target"]) {
  if (target === "_blank") {
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(href);
    return;
  }

  window.location.assign(href);
}

function reportError(options: MatterFluxOptions, error: unknown) {
  try {
    options.onError?.(error);
  } catch {
    // Consumer callbacks must not strand the provider in an active state.
  }
}

export function MatterFluxProvider({ children, ...providerDefaults }: MatterFluxProviderProps) {
  const [session, setSession] = useState<MatterFluxSession | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const defaultsRef = useRef<MatterFluxOptions>(providerDefaults);
  const activeRef = useRef(false);
  const mountedRef = useRef(true);
  const completionRef = useRef<(() => void) | null>(null);
  const delayResolversRef = useRef(new Map<number, () => void>());
  const announcementTimerRef = useRef<number>();
  const sessionIdRef = useRef(0);
  defaultsRef.current = providerDefaults;

  const waitFor = useCallback((duration: number) => {
    return new Promise<void>((resolve) => {
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

  const handleOverlayComplete = useCallback((id: number) => {
    if (id !== sessionIdRef.current) return;
    completionRef.current?.();
    completionRef.current = null;
  }, []);

  const runMatterFlux = useCallback(
    async (options: MatterFluxOptions = {}) => {
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
      const [actionSucceeded] = await Promise.all([
        actionResult,
        waitFor(resolved.reducedMotion ? 160 : resolved.duration * 0.58)
      ]);

      if (!mountedRef.current) return false;

      const outcome: MatterFluxMode = actionSucceeded ? resolved.mode : "failure";
      if (actionError !== undefined) reportError(resolved, actionError);
      setSession((current) =>
        current?.id === id
          ? { ...current, outcome, outcomeStartedAt: performance.now() }
          : current
      );

      await new Promise<void>((resolve) => {
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
        announcementTimerRef.current = window.setTimeout(() => setAnnouncement(null), 5000);
        return false;
      }

      if (resolved.href) navigate(resolved.href, resolved.target);
      return true;
    },
    [waitFor]
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
