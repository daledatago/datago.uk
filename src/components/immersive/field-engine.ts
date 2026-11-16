/**
 * The WebGL scene behind the hero and the services page. Loaded on demand by
 * use-field.ts, so it never sits in the first-load bundle.
 *
 * Written against WebGL directly, with no 3D library: the scene is two draw
 * calls (points, then lines), and a library would add over a hundred kilobytes
 * to do the same. All movement is in the vertex shader; the CPU only updates
 * a handful of uniforms each frame. Colours come from the site's CSS
 * variables, so the scene follows the theme.
 */
import { buildField } from "@/lib/field-geometry";

export type FieldOptions = {
  /** "assemble": scroll takes the points from clusters to the lattice. "layer": assembled, one layer picked out. */
  mode: "assemble" | "layer";
  focus: number;
  /** Fewer points and a lower pixel ratio, for small screens. */
  light: boolean;
};

export type FieldHandle = {
  setProgress: (value: number) => void;
  /** Move the highlight to another layer. It travels there, it does not jump. */
  setFocus: (layer: number) => void;
  setPointer: (x: number, y: number, active: boolean) => void;
  setRunning: (running: boolean) => void;
  resize: () => void;
  readColors: () => void;
  dispose: () => void;
};

const POINT_VERTEX = /* glsl */ `
  attribute vec3 position;
  attribute vec3 aScatter;
  attribute vec4 aSeed;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uExplode;
  uniform float uFocus;
  uniform float uAspect;
  uniform float uShift;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec3 uPointer;
  uniform vec3 uInk;
  uniform vec3 uMuted;
  uniform vec3 uBrand;
  uniform vec3 uSignal;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float layer = aSeed.y;
    float dust = aSeed.w;
    float t = clamp((uProgress - 0.08 - aSeed.x * 0.26) / 0.26, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    t *= 1.0 - dust;

    vec3 drift = vec3(
      sin(uTime * 0.35 + aSeed.z * 40.0),
      cos(uTime * 0.28 + aSeed.z * 23.0),
      sin(uTime * 0.31 + aSeed.z * 71.0)
    ) * 0.08 * (1.0 - t);

    vec3 lattice = position;
    lattice.y *= 1.0 + uExplode;
    vec3 p = mix(aScatter + drift, lattice, t);

    /* Points arc in as they travel, so the flow reads as streams, not a fade. */
    float arc = sin(t * 3.14159) * 0.7 * (aSeed.z - 0.35);
    float c = cos(arc);
    float s = sin(arc);
    p.xz = mat2(c, -s, s, c) * p.xz;

    /* Once the platform stands, a pulse climbs the layers: AI working on it. */
    float governed = smoothstep(0.6, 0.72, uProgress) * (1.0 - dust);
    float climb = mix(-1.2, 1.2, fract(uTime * 0.16)) * (1.0 + uExplode);
    float pulse = governed * exp(-pow((p.y - climb) * 5.0, 2.0));

    vec3 color = mix(uMuted, uInk, t);
    color = mix(color, uSignal, pulse);
    float alpha = mix(0.62, 0.92, t);
    float size = 1.0 + pulse * 0.9;

    if (uFocus > -0.5 && dust < 0.5) {
      float on = 1.0 - smoothstep(0.3, 0.7, abs(layer - uFocus));
      color = mix(uMuted, uBrand, on);
      alpha = mix(0.4, 1.0, on);
      size = mix(0.85, 1.45, on);
    }
    alpha = mix(alpha, 0.34, dust);
    size = mix(size, 0.8, dust);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;
    clip.x += uShift * clip.w;

    /* The pointer parts the field. */
    vec2 away = clip.xy / clip.w - uPointer.xy;
    away.x *= uAspect;
    float push = uPointer.z * exp(-dot(away, away) * 16.0);
    clip.xy += normalize(away + 0.0001) * push * 0.05 * clip.w;

    gl_Position = clip;
    gl_PointSize = min(uSize * size / -mv.z, uSize * 0.3);
    vAlpha = alpha * smoothstep(13.0, 4.0, -mv.z) * smoothstep(1.5, 3.5, -mv.z);
    vColor = color;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.36, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

const LINE_VERTEX = /* glsl */ `
  attribute vec3 position;
  attribute float aLayer;
  uniform float uProgress;
  uniform float uExplode;
  uniform float uFocus;
  uniform float uShift;
  uniform float uFrame;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec3 uLine;
  uniform vec3 uBrand;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    p.y *= 1.0 + uExplode;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_Position.x += uShift * gl_Position.w;
    /* Layer 9 marks the outer frame: governance, drawn last around everything. */
    float frame = step(8.5, aLayer);
    float on = uFocus > -0.5 ? 1.0 - smoothstep(0.3, 0.7, abs(aLayer - uFocus)) : 0.0;
    vColor = mix(uLine, uBrand, max(on, frame));
    float drawn = mix(smoothstep(0.36, 0.6, uProgress), uFrame * smoothstep(0.82, 0.95, uProgress), frame);
    vAlpha = drawn * mix(0.75, 1.0, on) * smoothstep(13.0, 4.0, -mv.z);
  }
`;

const LINE_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(vColor * vAlpha, vAlpha);
  }
`;

type Mat4 = Float32Array;

function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) {
        sum += a[k * 4 + row] * b[column * 4 + k];
      }
      out[column * 4 + row] = sum;
    }
  }
  return out;
}

const rotateX = (angle: number): Mat4 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
};

const rotateY = (angle: number): Mat4 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
};

const translate = (x: number, y: number, z: number): Mat4 =>
  new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);

function perspective(fovY: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovY / 2);
  const range = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * range, -1,
    0, 0, 2 * far * near * range, 0,
  ]);
}

type Program = {
  program: WebGLProgram;
  uniform: (name: string) => WebGLUniformLocation | null;
  attribute: (name: string) => number;
};

function link(gl: WebGLRenderingContext, vertex: string, fragment: string): Program {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error("field: shader unavailable");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(`field: ${gl.getShaderInfoLog(shader) ?? "shader failed"}`);
    }
    return shader;
  };
  const program = gl.createProgram();
  if (!program) {
    throw new Error("field: program unavailable");
  }
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`field: ${gl.getProgramInfoLog(program) ?? "link failed"}`);
  }
  const uniforms = new Map<string, WebGLUniformLocation | null>();
  return {
    program,
    uniform(name) {
      if (!uniforms.has(name)) {
        uniforms.set(name, gl.getUniformLocation(program, name));
      }
      return uniforms.get(name) ?? null;
    },
    attribute: (name) => gl.getAttribLocation(program, name),
  };
}

const FOV = (34 * Math.PI) / 180;
const COLOR_NAMES = {
  uInk: "--ink",
  uMuted: "--muted",
  uBrand: "--brand",
  uSignal: "--signal",
  uLine: "--line-strong",
} as const;

export function createField(canvas: HTMLCanvasElement, options: FieldOptions): FieldHandle {
  const context = canvas.getContext("webgl", {
    alpha: true,
    antialias: !options.light,
    premultipliedAlpha: true,
    powerPreference: "high-performance",
  });
  if (!context) {
    throw new Error("field: WebGL unavailable");
  }
  const gl: WebGLRenderingContext = context;

  const field = buildField(options.light ? 11 : 17, options.light ? 160 : 520);
  const points = link(gl, POINT_VERTEX, POINT_FRAGMENT);
  const lines = link(gl, LINE_VERTEX, LINE_FRAGMENT);

  const buffer = (data: Float32Array) => {
    const target = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, target);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return target;
  };
  const buffers = {
    lattice: buffer(field.lattice),
    scatter: buffer(field.scatter),
    seed: buffer(field.seed),
    lines: buffer(field.lines),
    lineLayer: buffer(field.lineLayer),
  };
  const bind = (program: Program, name: string, data: WebGLBuffer | null, size: number) => {
    const location = program.attribute(name);
    if (location < 0) {
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, data);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  };

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const colors: Record<keyof typeof COLOR_NAMES, [number, number, number]> = {
    uInk: [0, 0, 0],
    uMuted: [0.4, 0.4, 0.4],
    uBrand: [0, 0, 1],
    uSignal: [0, 0, 1],
    uLine: [0.5, 0.5, 0.5],
  };

  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let aspect = 1;
  let shift = 0;
  let size = 1;
  let progress = options.mode === "layer" ? 1 : 0;
  let target = progress;
  let explode = 0;
  let focus = options.mode === "layer" ? options.focus : -1;
  let focusTarget = focus;
  let pointerX = 0;
  let pointerY = 0;
  let pointerOn = 0;
  let easedX = 0;
  let easedY = 0;
  let easedOn = 0;
  let running = false;
  let frame = 0;
  let last = 0;
  let time = 0;
  let skip = false;

  function readColors() {
    /* A token can be any CSS colour, so the browser resolves it for us. */
    const probe = document.createElement("span");
    probe.style.display = "none";
    canvas.parentElement?.appendChild(probe);
    (Object.keys(COLOR_NAMES) as (keyof typeof COLOR_NAMES)[]).forEach((key) => {
      probe.style.color = `var(${COLOR_NAMES[key]})`;
      const parts = getComputedStyle(probe).color.match(/[\d.]+/g);
      if (parts && parts.length >= 3) {
        colors[key] = [Number(parts[0]) / 255, Number(parts[1]) / 255, Number(parts[2]) / 255];
      }
    });
    probe.remove();
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, options.light ? 1.5 : 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    aspect = width / height;
    /* On a wide stage the copy sits on the left, so the field sits right of centre. */
    shift = options.mode === "assemble" && width > 900 ? 0.47 : 0;
    size = (options.light ? 0.03 : 0.026) * height * pixelRatio * 1.6;
    draw();
  }

  function draw() {
    const settle = progress * progress * (3 - 2 * progress);
    const wide = aspect > 1.2;
    const distance =
      options.mode === "layer"
        ? wide ? 6.4 : 7
        : (wide ? 8.8 : 9.6) - settle * (wide ? 2 : 3);
    const turn = Math.PI / 4 + Math.sin(time * 0.11) * 0.22 + easedX * 0.28;
    const lean = 0.44 - easedY * 0.14;
    const view = multiply(rotateX(Math.atan2(0.25, distance)), translate(0, -0.25, -distance));
    const modelView = multiply(view, multiply(rotateX(lean), rotateY(turn)));
    const projection = perspective(FOV, aspect, 0.1, 40);

    gl.clear(gl.COLOR_BUFFER_BIT);
    for (const program of [lines, points]) {
      gl.useProgram(program.program);
      gl.uniformMatrix4fv(program.uniform("modelViewMatrix"), false, modelView);
      gl.uniformMatrix4fv(program.uniform("projectionMatrix"), false, projection);
      gl.uniform1f(program.uniform("uProgress"), progress);
      gl.uniform1f(program.uniform("uExplode"), explode);
      gl.uniform1f(program.uniform("uFocus"), focus);
      gl.uniform1f(program.uniform("uShift"), shift);
      (Object.keys(colors) as (keyof typeof colors)[]).forEach((key) => {
        gl.uniform3fv(program.uniform(key), colors[key]);
      });
      if (program === lines) {
        gl.uniform1f(lines.uniform("uFrame"), options.mode === "assemble" ? 1 : 0);
        bind(lines, "position", buffers.lines, 3);
        bind(lines, "aLayer", buffers.lineLayer, 1);
        gl.drawArrays(gl.LINES, 0, field.lines.length / 3);
      } else {
        gl.uniform1f(points.uniform("uTime"), time);
        gl.uniform1f(points.uniform("uSize"), size);
        gl.uniform1f(points.uniform("uAspect"), aspect);
        gl.uniform3f(points.uniform("uPointer"), pointerX, pointerY, easedOn);
        bind(points, "position", buffers.lattice, 3);
        bind(points, "aScatter", buffers.scatter, 3);
        bind(points, "aSeed", buffers.seed, 4);
        gl.drawArrays(gl.POINTS, 0, field.count);
      }
    }
  }

  function tick(now: number) {
    if (!running) {
      return;
    }
    const delta = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    time += delta;
    const k = 1 - Math.exp(-delta * 6);
    if (options.mode === "assemble") {
      progress += (target - progress) * k;
      explode = 0.12 * progress;
    } else {
      explode += (0.18 + target * 0.5 - explode) * k;
      focus += (focusTarget - focus) * k * 0.8;
    }
    easedX += (pointerX - easedX) * k * 0.6;
    easedY += (pointerY - easedY) * k * 0.6;
    easedOn += (pointerOn - easedOn) * k;
    /* On a small screen every other frame is drawn: the field moves slowly, and it halves the work. */
    skip = options.light && !skip;
    if (!skip) {
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  readColors();
  resize();

  return {
    setProgress(value) {
      target = Math.min(1, Math.max(0, value));
    },
    setFocus(layer) {
      focusTarget = layer;
    },
    setPointer(x, y, active) {
      pointerX = x;
      pointerY = y;
      pointerOn = active ? 1 : 0;
    },
    setRunning(next) {
      if (next === running) {
        return;
      }
      running = next;
      if (running) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    },
    resize,
    readColors() {
      readColors();
      draw();
    },
    dispose() {
      running = false;
      cancelAnimationFrame(frame);
      Object.values(buffers).forEach((item) => gl.deleteBuffer(item));
      gl.deleteProgram(points.program);
      gl.deleteProgram(lines.program);
    },
  };
}
