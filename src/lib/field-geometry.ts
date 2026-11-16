/**
 * Geometry for the DataGo field: the same points in two arrangements.
 * "scatter" is fragmented sources (separate clusters). "lattice" is one
 * model: five layers, one per kind of work, bottom to top in the order of
 * `immersive.stack.order`.
 *
 * Deterministic and dependency-free, so the server-rendered poster and the
 * WebGL scene draw the same thing.
 */

export const FIELD_LAYERS = 5;
export const LAYER_GAP = 0.42;

export type FieldGeometry = {
  count: number;
  /** xyz per point, the assembled lattice. */
  lattice: Float32Array;
  /** xyz per point, the fragmented clusters. */
  scatter: Float32Array;
  /** per point: delay 0..1, layer 0..4, random 0..1, kind (0 lattice, 1 dust). */
  seed: Float32Array;
  /** Line segments of the lattice: xyz pairs. */
  lines: Float32Array;
  /** Layer index for each line vertex. */
  lineLayer: Float32Array;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Six source clusters: centre, then radii on each axis. */
const CLUSTERS: readonly (readonly number[])[] = [
  [-2.3, 1.0, -0.6, 0.55, 0.3, 0.55],
  [-1.2, -1.15, 1.1, 0.7, 0.16, 0.5],
  [0.3, 1.45, 1.3, 0.34, 0.5, 0.34],
  [1.7, 0.9, -1.2, 0.6, 0.22, 0.6],
  [2.2, -0.8, 0.7, 0.3, 0.62, 0.42],
  [0.2, -1.5, -1.6, 0.75, 0.2, 0.36],
];

export function buildField(grid: number, dust: number): FieldGeometry {
  const random = mulberry32(20261116);
  const gauss = () => (random() + random() + random() + random() - 2) / 2;
  const perLayer = grid * grid;
  const latticeCount = perLayer * FIELD_LAYERS;
  const count = latticeCount + dust;
  const lattice = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const seed = new Float32Array(count * 4);

  let i = 0;
  for (let layer = 0; layer < FIELD_LAYERS; layer += 1) {
    const y = (layer - (FIELD_LAYERS - 1) / 2) * LAYER_GAP;
    for (let gx = 0; gx < grid; gx += 1) {
      for (let gz = 0; gz < grid; gz += 1) {
        const x = (gx / (grid - 1)) * 2 - 1;
        const z = (gz / (grid - 1)) * 2 - 1;
        lattice.set([x, y, z], i * 3);
        const cluster = CLUSTERS[Math.floor(random() * CLUSTERS.length)];
        scatter.set(
          [
            cluster[0] + gauss() * cluster[3] * 1.5,
            cluster[1] + gauss() * cluster[4] * 1.5,
            cluster[2] + gauss() * cluster[5] * 1.5,
          ],
          i * 3,
        );
        /* Lower layers settle first: the foundation arrives before what rests on it. */
        const delay = Math.min(1, (layer / (FIELD_LAYERS - 1)) * 0.6 + random() * 0.4);
        seed.set([delay, layer, random(), 0], i * 4);
        i += 1;
      }
    }
  }

  for (let d = 0; d < dust; d += 1) {
    const p = [(random() * 2 - 1) * 3.6, (random() * 2 - 1) * 2.2, (random() * 2 - 1) * 3];
    lattice.set(p, i * 3);
    scatter.set(p, i * 3);
    seed.set([random(), 2, random(), 1], i * 4);
    i += 1;
  }

  const segments: number[] = [];
  const segmentLayers: number[] = [];
  const push = (a: number[], b: number[], la: number, lb: number) => {
    segments.push(...a, ...b);
    segmentLayers.push(la, lb);
  };
  for (let layer = 0; layer < FIELD_LAYERS; layer += 1) {
    const y = (layer - (FIELD_LAYERS - 1) / 2) * LAYER_GAP;
    for (let g = 0; g < grid; g += 1) {
      const t = (g / (grid - 1)) * 2 - 1;
      push([t, y, -1], [t, y, 1], layer, layer);
      push([-1, y, t], [1, y, t], layer, layer);
    }
  }
  /* Uprights join the layers: corners, edge midpoints and the centre. */
  const posts = [-1, 0, 1];
  for (const x of posts) {
    for (const z of posts) {
      for (let layer = 0; layer < FIELD_LAYERS - 1; layer += 1) {
        const y0 = (layer - (FIELD_LAYERS - 1) / 2) * LAYER_GAP;
        push([x, y0, z], [x, y0 + LAYER_GAP, z], layer, layer + 1);
      }
    }
  }

  /* The outer frame, a little outside the lattice. Marked as layer 9 for the shader. */
  const f = 1.12;
  const top = ((FIELD_LAYERS - 1) / 2) * LAYER_GAP + 0.14;
  const corners = [
    [-f, -f],
    [f, -f],
    [f, f],
    [-f, f],
  ];
  corners.forEach(([x, z], index) => {
    const [nx, nz] = corners[(index + 1) % 4];
    push([x, -top, z], [nx, -top, nz], 9, 9);
    push([x, top, z], [nx, top, nz], 9, 9);
    push([x, -top, z], [x, top, z], 9, 9);
  });

  return {
    count,
    lattice,
    scatter,
    seed,
    lines: new Float32Array(segments),
    lineLayer: new Float32Array(segmentLayers),
  };
}

/** Fixed three-quarter view used by the static poster. Returns [x, y, depth]. */
export function projectPoster(x: number, y: number, z: number): [number, number, number] {
  const yaw = Math.PI / 4;
  const pitch = 0.5;
  const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
  const rz = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const ry = y * Math.cos(pitch) - rz * Math.sin(pitch);
  const depth = y * Math.sin(pitch) + rz * Math.cos(pitch);
  return [rx, -ry, depth];
}
