/** Original seeded stellar sculpture. No fonts, source images or sampled assets. */
export type GalaxyGeometry = { vertices: Float32Array; count: number; mobile: boolean };
export const GALAXY_STRIDE = 14;

function randomSource(seed: number) {
  let value = seed;
  return () => {
    value |= 0; value = value + 0x6D2B79F5 | 0;
    let t = Math.imul(value ^ value >>> 15, 1 | value);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function createGalaxyGeometry(count: number, mobile: boolean): GalaxyGeometry {
  const random = randomSource(103197);
  const normal = () => Math.sqrt(-2 * Math.log(Math.max(.0001, random()))) * Math.cos(random() * Math.PI * 2);
  const vertices = new Float32Array(count * GALAXY_STRIDE);
  const zeroX = mobile ? .39 : .43;
  const zeroY = .015;
  const radiusX = mobile ? .31 : .35;
  const radiusY = mobile ? .48 : .445;

  for (let i = 0; i < count; i++) {
    const field = i < count * .045;
    const choice = random();
    const kind = field ? 0 : choice < .32 ? 1 : choice < .365 ? 2 : 3;
    const dust = !field && random() < .105;
    let x: number, y: number, z: number;
    if (kind === 0) {
      x = (random() - .5) * 3.5;
      y = (random() - .5) * 1.6;
      z = random() * 1.5 - .65;
    } else if (kind === 1) {
      // An angled stem, ascending shoulder and short foot make a numeral one.
      const segment = random();
      if (segment < .77) {
        y = -.36 + random() * .75;
        const ribbon = .023 + .015 * Math.sin(y * 13 + 1);
        x = -.49 + y * .13 + normal() * (dust ? .065 : ribbon);
      } else if (segment < .91) {
        const t = random();
        x = -.68 + t * .24 + normal() * .018;
        y = .21 + t * .19 + normal() * .015;
      } else {
        x = -.67 + random() * .39;
        y = -.36 + normal() * .016;
      }
      z = normal() * (dust ? .1 : .036);
      x += Math.sin(y * 37 + z * 7) * .009;
    } else if (kind === 2) {
      // Compact, separate decimal. It must survive the low density mobile tier.
      x = -.105 + normal() * (dust ? .036 : .014);
      y = -.335 + normal() * (dust ? .038 : .017);
      z = normal() * .035;
    } else {
      // A galactic annulus with three broken logarithmic arms and a dark eye.
      const arm = Math.floor(random() * 3);
      const radial = random();
      const armParticle = random() < .53;
      const r = armParticle ? .65 + radial * .58 + normal() * .035 : .92 + normal() * (dust ? .16 : .09);
      const theta = armParticle ? arm * Math.PI * 2 / 3 + radial * 3.55 + normal() * .115 : random() * Math.PI * 2;
      const eccentric = 1 + .045 * Math.sin(theta * 3 + .8) + .025 * Math.sin(theta * 7);
      x = zeroX + Math.cos(theta) * radiusX * r * eccentric;
      y = zeroY + Math.sin(theta) * radiusY * r;
      z = normal() * (dust ? .12 : .035) + Math.sin(theta * 2) * .025;
      // Tilted dust plane, not a perfectly geometric neon loop.
      x += (y - zeroY) * .145;
      if (random() < .045) { x += normal() * .075; y += normal() * .08; }
    }

    const hot = random();
    // Phase 2 light refinement: preserve every position/seed draw and both tiers.
    // Smaller, dimmer dust leaves black gaps; selected stars carry local glow.
    const luminance = (field ? .3 + random() * .6 : dust ? .009 + random() * .02 : .24 + Math.pow(random(), 3) * 1.65) * (kind === 2 ? .5 : 1);
    let color = hot > .95 ? [.64, .84, 1] : hot > .53 ? [.96, .91, 1] : hot > .22 ? [.7, .56, 1] : [.48, .3, .95];
    if (kind === 2) color = [.94, .88, 1];
    const size = dust ? 9 + random() * 16 : field ? .65 + random() * 1.1 : hot > .985 ? 5 + random() * 6 : .6 + Math.pow(random(), 2) * 2;
    const at = i * GALAXY_STRIDE;
    vertices.set([
      x, y, z,
      (random() - .5) * 3.3, (random() - .5) * 1.55, random() * 1.7 - .85,
      color[0], color[1], color[2],
      size, luminance, random(), kind, dust ? 1 : 0
    ], at);
  }
  return { vertices, count, mobile };
}
