"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { MatterFluxMode, MatterFluxSession } from "./types";

type MatterFluxOverlayProps = {
  session: MatterFluxSession;
  onComplete: (id: number) => void;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  spin: number;
  phase: number;
  alpha: number;
  color: string;
};

type MatterFluxStyle = CSSProperties & {
  "--matterflux-x": string;
  "--matterflux-y": string;
  "--matterflux-primary": string;
  "--matterflux-secondary": string;
  "--matterflux-core": string;
  "--matterflux-bg": string;
  "--matterflux-resolve-duration": string;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeInCubic = (value: number) => value * value * value;
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

function createParticles(
  count: number,
  width: number,
  height: number,
  primary: string,
  secondary: string,
  core: string,
  seed: number
) {
  let randomState = seed >>> 0;
  const random = () => {
    randomState += 0x6d2b79f5;
    let value = randomState;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  return Array.from({ length: count }, (_, index): Particle => {
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
      color: index % 13 === 0 ? core : index % 5 === 0 ? secondary : primary
    };
  });
}

export function MatterFluxOverlay({ session, onComplete }: MatterFluxOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const completedRef = useRef(false);
  const startedAtRef = useRef(performance.now());
  const particlesRef = useRef<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { options, outcome, outcomeStartedAt } = session;

  const style = useMemo<MatterFluxStyle>(
    () => ({
      "--matterflux-x": `${options.center.x}px`,
      "--matterflux-y": `${options.center.y}px`,
      "--matterflux-primary": options.primaryColor,
      "--matterflux-secondary": options.secondaryColor,
      "--matterflux-core": options.coreColor,
      "--matterflux-bg": options.backgroundColor,
      "--matterflux-resolve-duration": `${options.duration * (outcome === "failure" ? 0.5 : 0.36)}ms`
    }),
    [options, outcome]
  );

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete(session.id);
  }, [onComplete, session.id]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!reducedMotion || !outcome) return;
    const timer = window.setTimeout(finish, outcome === "success" ? 240 : 320);
    return () => window.clearTimeout(timer);
  }, [finish, outcome, reducedMotion]);

  useEffect(() => {
    if (!outcome) return;
    const fallback = window.setTimeout(finish, options.duration + 500);
    return () => window.clearTimeout(fallback);
  }, [finish, options.duration, outcome]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particlesRef.current = createParticles(
        options.particleCount,
        width,
        height,
        options.primaryColor,
        options.secondaryColor,
        options.coreColor,
        session.id
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const elapsed = now - startedAtRef.current;
      const collapseDuration = options.duration * 0.64;
      const collapse = clamp(elapsed / collapseDuration);
      const travel = easeInCubic(collapse);
      const resolutionElapsed = outcomeStartedAt ? now - outcomeStartedAt : 0;
      const resolutionDuration = outcome === "success" ? options.duration * 0.36 : options.duration * 0.5;
      const resolution = outcome ? clamp(resolutionElapsed / resolutionDuration) : 0;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (const particle of particlesRef.current) {
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
        context.shadowBlur = 10 + size * 4;
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
      context.shadowBlur = 42 + successBoost;
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
        context.shadowBlur = 22;
        context.beginPath();
        context.arc(options.center.x, options.center.y, 18 + shockwave * Math.max(width, height) * 0.34, 0, Math.PI * 2);
        context.stroke();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;

      if (outcome && resolution >= 1) {
        finish();
        return;
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    frameRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [finish, options, outcome, outcomeStartedAt, reducedMotion, session.id]);

  const stateClass = outcome ? `matterflux-overlay--${outcome}` : "matterflux-overlay--collapse";
  const statusLabel = outcome === "failure" ? options.failureMessage : outcome === "success" ? options.successMessage : options.label;

  return (
    <div className={`matterflux-overlay ${stateClass}`} style={style} role="status" aria-live="assertive" aria-label={statusLabel}>
      <div className="matterflux-vignette" aria-hidden="true" />
      {reducedMotion ? (
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
