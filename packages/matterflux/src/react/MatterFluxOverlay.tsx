import { useCallback, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import { createMatterFluxParticles, drawMatterFluxFrame } from "../animation";
import type { MatterFluxSession } from "../types";

export type MatterFluxOverlayProps = {
  session: MatterFluxSession;
  onComplete: (id: number) => void;
};

type MatterFluxStyle = CSSProperties & {
  "--matterflux-x": string;
  "--matterflux-y": string;
  "--matterflux-primary": string;
  "--matterflux-secondary": string;
  "--matterflux-core": string;
  "--matterflux-bg": string;
  "--matterflux-overlay-opacity": string;
  "--matterflux-resolve-duration": string;
};

export function MatterFluxOverlay({ session, onComplete }: MatterFluxOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const completedRef = useRef(false);
  const startedAtRef = useRef(performance.now());
  const pausedAtRef = useRef<number | null>(null);
  const lastFrameAtRef = useRef(0);
  const { options, outcome, outcomeStartedAt } = session;

  const style = useMemo<MatterFluxStyle>(
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
    frameRef.current = undefined;
    onComplete(session.id);
  }, [onComplete, session.id]);

  useEffect(() => {
    if (!options.reducedMotion || !outcome) return;
    const timer = window.setTimeout(finish, outcome === "success" ? 240 : 320);
    return () => window.clearTimeout(timer);
  }, [finish, options.reducedMotion, outcome]);

  useEffect(() => {
    if (!outcome) return;
    let timer: number;
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

    function draw(now: number) {
      frameRef.current = undefined;
      if (!active || document.hidden) return;

      if (now - lastFrameAtRef.current < 1000 / 60 - 0.5) {
        scheduleFrame();
        return;
      }
      lastFrameAtRef.current = now;

      const frame = drawMatterFluxFrame({
        context: context as CanvasRenderingContext2D,
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
        frameRef.current = undefined;
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
      frameRef.current = undefined;
    };
  }, [finish, options, outcome, outcomeStartedAt, session.id]);

  const stateClass = outcome ? `matterflux-overlay--${outcome}` : "matterflux-overlay--collapse";
  const statusLabel = outcome === "failure" ? options.failureMessage : outcome === "success" ? options.successMessage : options.label;

  return (
    <div className={`matterflux-overlay ${stateClass}`} style={style} role="status" aria-live="assertive" aria-label={statusLabel}>
      <div className="matterflux-vignette" aria-hidden="true" />
      {options.reducedMotion ? (
        <div className="matterflux-reduced" aria-hidden="true">
          <span className="matterflux-reduced-dot" />
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="matterflux-canvas" aria-hidden="true" />
          <div className="matterflux-singularity" aria-hidden="true">
            <span className="matterflux-ring matterflux-ring--outer" />
            <span className="matterflux-ring matterflux-ring--inner" />
            <span className="matterflux-core" />
            {outcome === "success" ? <span className="matterflux-shockwave" /> : null}
          </div>
        </>
      )}
      <p className="matterflux-label">{statusLabel}</p>
    </div>
  );
}
