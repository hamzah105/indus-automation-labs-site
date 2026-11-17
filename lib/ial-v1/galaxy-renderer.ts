import { createGalaxyGeometry, GALAXY_STRIDE } from "./galaxy-data";

export type GalaxyFrame = { time: number; formation: number; reveal: number; scroll: number; pointerX: number; pointerY: number; hoverX?: number; hoverY?: number; influence?: number; velocityX?: number; velocityY?: number };
export type GalaxyRenderer = { render: (frame: GalaxyFrame) => void; resize: (width: number, height: number, dpr: number) => void; dispose: () => void; particles: number; mobile: boolean };

const vertexSource = `
precision highp float;
attribute vec3 aTarget;
attribute vec3 aOrigin;
attribute vec3 aColor;
attribute vec4 aLight;
attribute float aDust;
uniform vec2 uViewport;
uniform vec2 uPointer;
uniform vec2 uLocalPointer;
uniform vec2 uVelocity;
uniform float uInfluence;
uniform float uDpr;
uniform float uTime;
uniform float uFormation;
uniform float uReveal;
uniform float uScroll;
uniform float uMobile;
varying vec3 vColor;
varying float vAlpha;
varying float vDust;
varying float vFlare;
void main() {
  float group = aLight.w;
  float phase = aLight.z;
  float progress = smoothstep(phase * .19, .78 + phase * .22, uFormation);
  vec3 target = aTarget;
  if (group > 2.5) {
    vec2 centre = vec2(mix(.43, .39, uMobile), .015);
    vec2 radii = vec2(mix(.35, .31, uMobile), mix(.445, .48, uMobile));
    // Undo/reapply the authored tilted plane so individual orbits retain the
    // original elliptical silhouette. Differential speeds avoid a rigid logo spin.
    vec2 local = target.xy - centre;
    local.x -= local.y * .145;
    vec2 orbit = local / radii;
    float radius = length(orbit);
    float rotation = uTime * (.019 + phase * .009) / max(.7, radius);
    mat2 spin = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
    vec2 evolved = spin * orbit * radii;
    evolved.x += evolved.y * .145;
    target.xy = centre + evolved;
    target.z += (sin(uTime * .17 + phase * 6.28) - sin(phase * 6.28)) * .012;
  } else if (group > .5 && group < 1.5) {
    target.x += sin(target.y * 21.0 + uTime * .19 + phase * 6.28) * .004;
    target.y += (sin(uTime * .13 + phase * 19.0) - sin(phase * 19.0)) * .0015;
  } else if (group > 1.5) {
    target.xy += vec2(sin(uTime * .18 + phase * 17.0) - sin(phase * 17.0), cos(uTime * .14 + phase * 13.0) - cos(phase * 13.0)) * .001;
  } else {
    target.xy += vec2(sin(uTime * .07 + phase * 29.0), cos(uTime * .09 + phase * 31.0)) * .0015;
    target.z += sin(uTime * .1 + phase * 6.28) * .008;
  }
  vec3 origin = aOrigin;
  float gather = (1.0 - progress);
  origin.x += sin(uTime * .17 + phase * 6.28) * .03;
  vec3 point = mix(origin, target, group < .5 ? 1.0 : progress);
  point.x += point.z * uPointer.x * .095;
  point.y += point.z * uPointer.y * .06;
  point.xy *= 1.0 / (1.0 + point.z * .16);
  point.y -= uScroll * .075;
  point.xy *= 1.0 - uScroll * .045;
  // A local lens, not a mutation of the authored vertex buffer. The compact
  // falloff leaves distant stars still, while foreground points lift in depth.
  vec2 towardPointer = uLocalPointer - point.xy;
  float falloff = 1.0 - smoothstep(.015, .27, length(towardPointer));
  float locality = falloff * falloff * uInfluence * progress;
  locality *= group < .5 ? .15 : 1.0;
  point.xy += towardPointer * locality * .25;
  point.xy += uVelocity * locality * .014;
  point.z += locality * (.22 + (phase - .5) * .12);
  float units = min(uViewport.x / mix(2.08, 1.77, uMobile), uViewport.y / 1.16);
  gl_Position = vec4(point.x * units * 2.0 / uViewport.x, point.y * units * 2.0 / uViewport.y, 0.0, 1.0);
  float depth = 1.0 + point.z * .32;
  float starScale = clamp(units / 420.0, .65, 1.4);
  gl_PointSize = max(.7, aLight.x * starScale * depth) * uDpr * mix(1.0, 1.22, uMobile);
  vColor = aColor;
  float fade = group < .5 ? .8 : mix(.16, 1.0, progress);
  float amplitude = mix(.045, .14, smoothstep(.25, 1.8, aLight.y)) * mix(1.0, .15, aDust);
  float organic = 1.0 + (sin(uTime * (.21 + phase * .19) + phase * 36.0) * .7 + sin(uTime * (.11 + phase * .09) + phase * 91.0) * .3) * amplitude;
  vAlpha = aLight.y * uReveal * fade * organic * (1.0 - uScroll * .38) * mix(1.0, 1.65, uMobile);
  float highlight = smoothstep(.6, 1.5, aLight.y) * (1.0 - aDust);
  vAlpha *= 1.0 + locality * (.08 + highlight * .7) * (1.0 - aDust);
  if (aDust > .5) vAlpha *= progress;
  vDust = aDust;
  vFlare = aLight.x > 4.0 && aDust < .5 ? 1.0 : 0.0;
}
`;

const fragmentSource = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying float vDust;
varying float vFlare;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float radius = dot(p, p);
  if (radius > 1.0) discard;
  float glow = exp(-radius * mix(6.0, 3.8, vDust));
  float nucleus = exp(-radius * 38.0) * .8;
  float flare = (exp(-abs(p.x) * 65.0) * exp(-abs(p.y) * 7.0) + exp(-abs(p.y) * 65.0) * exp(-abs(p.x) * 7.0)) * .3 * vFlare;
  float alpha = (glow + nucleus * (1.0 - vDust) + flare) * vAlpha;
  gl_FragColor = vec4(vColor, min(alpha, 1.0));
}
`;

export function createGalaxyRenderer(canvas: HTMLCanvasElement, count: number, mobile: boolean): GalaxyRenderer {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power", preserveDrawingBuffer: false });
  if (!gl) throw new Error("Stellar rendering is unavailable");
  const shaders: WebGLShader[] = [];
  const enabledAttributes: number[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let disposed = false;
  function cleanup() {
    if (disposed) return;
    disposed = true;
    enabledAttributes.forEach(location => gl!.disableVertexAttribArray(location));
    gl!.bindBuffer(gl!.ARRAY_BUFFER, null);
    gl!.useProgram(null);
    if (buffer) gl!.deleteBuffer(buffer);
    if (program) gl!.deleteProgram(program);
    shaders.forEach(shader => gl!.deleteShader(shader));
  }
  try {
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Cannot create stellar shader");
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Cannot compile stellar shader");
      return shader;
    };
    program = gl.createProgram();
    if (!program) throw new Error("Cannot create stellar program");
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Cannot link stellar program");
    gl.useProgram(program);
    const geometry = createGalaxyGeometry(count, mobile);
    buffer = gl.createBuffer();
    if (!buffer) throw new Error("Cannot allocate stellar geometry");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);
    const attribute = (name: string, size: number, offset: number) => {
      const location = gl.getAttribLocation(program!, name);
      if (location < 0) return;
      enabledAttributes.push(location);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, GALAXY_STRIDE * 4, offset * 4);
    };
    attribute("aTarget", 3, 0); attribute("aOrigin", 3, 3); attribute("aColor", 3, 6); attribute("aLight", 4, 9); attribute("aDust", 1, 13);
    const uniform = (name: string) => gl.getUniformLocation(program!, name);
    const locations = { viewport: uniform("uViewport"), dpr: uniform("uDpr"), time: uniform("uTime"), formation: uniform("uFormation"), reveal: uniform("uReveal"), scroll: uniform("uScroll"), pointer: uniform("uPointer"), mobile: uniform("uMobile"), localPointer: uniform("uLocalPointer"), velocity: uniform("uVelocity"), influence: uniform("uInfluence") };
    gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(5 / 255, 4 / 255, 12 / 255, 1);
    gl.uniform1f(locations.mobile, mobile ? 1 : 0);
    let width = 1, height = 1;
    return {
      particles: count, mobile,
      resize(nextWidth, nextHeight, dpr) {
        if (disposed) return;
        width = Math.max(1, nextWidth); height = Math.max(1, nextHeight);
        canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(locations.viewport, width, height); gl.uniform1f(locations.dpr, dpr);
      },
      render(frame) {
        if (disposed || gl.isContextLost()) return;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(locations.time, frame.time); gl.uniform1f(locations.formation, frame.formation); gl.uniform1f(locations.reveal, frame.reveal); gl.uniform1f(locations.scroll, frame.scroll);
        gl.uniform2f(locations.pointer, frame.pointerX, frame.pointerY);
        gl.uniform2f(locations.localPointer, frame.hoverX ?? 0, frame.hoverY ?? 0);
        gl.uniform2f(locations.velocity, frame.velocityX ?? 0, frame.velocityY ?? 0);
        gl.uniform1f(locations.influence, frame.influence ?? 0);
        gl.drawArrays(gl.POINTS, 0, count);
      },
      dispose: cleanup
    };
  } catch (error) { cleanup(); throw error; }
}
