import { buildField, FIELD_LAYERS, LAYER_GAP, projectPoster } from "@/lib/field-geometry";

const r = (value: number) => Math.round(value * 10) / 10;

/**
 * The field as a still drawing. It is what a visitor sees before the 3D scene
 * loads, with reduced motion, without WebGL and without scripting. Drawn on the
 * server from the same geometry as the scene. Decorative: the steps beside it
 * carry the meaning in text. A parent with data-focus="n" picks out layer n.
 */
export function FieldPoster() {
  const field = buildField(9, 0);
  const scale = 118;
  const assembled: string[] = Array.from({ length: FIELD_LAYERS }, () => "");
  let scattered = "";

  for (let i = 0; i < field.count; i += 1) {
    const layer = field.seed[i * 4 + 1];
    const [lx, ly] = projectPoster(
      field.lattice[i * 3],
      field.lattice[i * 3 + 1] * 1.25,
      field.lattice[i * 3 + 2],
    );
    assembled[layer] += `M${r(lx * scale)} ${r(ly * scale)}h0`;
    const [sx, sy] = projectPoster(
      field.scatter[i * 3] * 0.62,
      field.scatter[i * 3 + 1] * 0.62,
      field.scatter[i * 3 + 2] * 0.62,
    );
    scattered += `M${r(sx * scale)} ${r(sy * scale)}h0`;
  }

  const frames = Array.from({ length: FIELD_LAYERS }, (_, layer) => {
    const y = (layer - (FIELD_LAYERS - 1) / 2) * LAYER_GAP * 1.25;
    const corners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(([x, z]) => projectPoster(x, y, z));
    return `M${corners.map(([x, py]) => `${r(x * scale)} ${r(py * scale)}`).join("L")}Z`;
  });

  return (
    <svg
      aria-hidden="true"
      className="field-poster"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="-240 -200 480 400"
    >
      <g className="field-poster__scatter">
        <path d={scattered} />
      </g>
      <g className="field-poster__lattice">
        {frames.map((d, layer) => (
          <path
            className="field-poster__frame"
            d={d}
            data-layer={layer}
            key={`f${d}`}
          />
        ))}
        {assembled.map((d, layer) => (
          <path
            className="field-poster__dots"
            d={d}
            data-layer={layer}
            key={`d${layer}`}
          />
        ))}
      </g>
    </svg>
  );
}
