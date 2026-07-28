import type { MatterFluxMode, MatterFluxResolvedOptions } from "./types";

export type MatterFluxParticle = {
  x: number;
  y: number;
  size: number;
  spin: number;
  phase: number;
  alpha: number;
  color: string;
};

type DrawFrameOptions = {
  context: CanvasRenderingContext2D;
  particles: MatterFluxParticle[];
  width: number;
  height: number;
  options: MatterFluxResolvedOptions;
  elapsed: number;
  outcome: MatterFluxMode | null;
  resolutionElapsed: number;
  now: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeInCubic = (value: number) => value * value * value;
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function createMatterFluxParticles(
  count: number,
  width: number,
  height: number,
  options: Pick<MatterFluxResolvedOptions, "primaryColor" | "secondaryColor" | "coreColor">,
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

  return Array.from({ length: count }, (_, index): MatterFluxParticle => {
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

export function drawMatterFluxFrame({
  context,
  particles,
  width,
  height,
  options,
  elapsed,
  outcome,
  resolutionElapsed,
  now
}: DrawFrameOptions) {
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
