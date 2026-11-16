"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Leaf = {
  id: string;
  label: string;
  note?: string;
  href: string;
  captionTitle: string;
  caption: string;
};

type StructureMapProps = {
  label: string;
  /** Hidden text added to a leaf that links to another site. */
  newTab: string;
  pause: string;
  play: string;
  root: string;
  branches: { id: string; label: string; note: string; leaves: Leaf[] }[];
  captionTitle: string;
  caption: string;
};

type Point = [number, number];
type Path = { id: string; trunk: Point[]; spur: Point[]; phase: number };

const SPEED = 0.00008;
const COLOUR_TOKENS = ["--lattice", "--line-strong", "--signal", "--brand"] as const;

function length(points: Point[]) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total +=
      Math.abs(points[i][0] - points[i - 1][0]) +
      Math.abs(points[i][1] - points[i - 1][1]);
  }
  return total;
}

function pointAt(points: Point[], t: number): Point {
  let distance = t * length(points);
  for (let i = 1; i < points.length; i++) {
    const segment =
      Math.abs(points[i][0] - points[i - 1][0]) +
      Math.abs(points[i][1] - points[i - 1][1]);
    if (distance <= segment) {
      const f = segment ? distance / segment : 0;
      return [
        points[i - 1][0] + (points[i][0] - points[i - 1][0]) * f,
        points[i - 1][1] + (points[i][1] - points[i - 1][1]) * f,
      ];
    }
    distance -= segment;
  }
  return points[points.length - 1];
}

/**
 * The company structure. Every label is HTML text; the canvas behind draws
 * only the lattice, the connectors and the pulses that travel them. Nothing
 * moves under reduced motion, and the Pause button stops the pulses.
 */
export function StructureMap({
  label,
  newTab,
  pause,
  play,
  root,
  branches,
  captionTitle,
  caption,
}: StructureMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hotRef = useRef<string | null>(null);
  const pausedRef = useRef(false);
  const kickRef = useRef<() => void>(() => {});
  const redrawRef = useRef<() => void>(() => {});
  const [hot, setHot] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const leaves = branches.flatMap((branch) => branch.leaves);
  const hotLeaf = leaves.find((leaf) => leaf.id === hot);

  useEffect(() => {
    const map = mapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!map || !canvas || !context) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colours: Record<string, string> = {};
    let paths: Path[] = [];
    let width = 0;
    let height = 0;
    let pointer: Point | null = null;
    let visible = true;
    let frame = 0;

    const readColours = () => {
      const styles = getComputedStyle(map);
      COLOUR_TOKENS.forEach((token) => {
        colours[token] = styles.getPropertyValue(token).trim();
      });
    };

    const rectOf = (id: string) => {
      const element = map.querySelector<HTMLElement>(`[data-n="${id}"]`);
      const box = map.getBoundingClientRect();
      const r = element!.getBoundingClientRect();
      return {
        l: r.left - box.left,
        t: r.top - box.top,
        b: r.bottom - box.top,
        cx: (r.left + r.right) / 2 - box.left,
        cy: (r.top + r.bottom) / 2 - box.top,
      };
    };

    const layout = () => {
      const box = map.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const rootRect = rectOf("root");
      paths = [];
      map.querySelectorAll<HTMLElement>("[data-branch]").forEach((branchEl) => {
        const branch = rectOf(branchEl.dataset.n!);
        const midY = (rootRect.b + branch.t) / 2;
        const trunk: Point[] = [
          [rootRect.cx, rootRect.b],
          [rootRect.cx, midY],
          [branch.cx, midY],
          [branch.cx, branch.t],
        ];
        map
          .querySelectorAll<HTMLElement>(`[data-p="${branchEl.dataset.n}"]`)
          .forEach((leafEl) => {
            const leaf = rectOf(leafEl.dataset.n!);
            const spurX = branch.l + (leaf.l - branch.l) / 2;
            paths.push({
              id: leafEl.dataset.n!,
              trunk,
              spur: [
                [spurX, branch.b],
                [spurX, leaf.cy],
                [leaf.l, leaf.cy],
              ],
              phase: paths.length / 7,
            });
          });
      });
    };

    const stroke = (points: Point[], colour: string, lineWidth: number) => {
      context.beginPath();
      context.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1]);
      }
      context.strokeStyle = colour;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const gap = 24;
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          let near = 0;
          if (pointer) {
            const d = Math.hypot(x - pointer[0], y - pointer[1]);
            near = d < 110 ? 1 - d / 110 : 0;
          }
          context.fillStyle = near > 0 ? colours["--signal"] : colours["--lattice"];
          context.globalAlpha = near > 0 ? 0.35 + near * 0.65 : 0.7;
          const size = 1.5 + near * 2.5;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      context.globalAlpha = 1;
      paths.forEach((path) => {
        stroke(path.trunk, colours["--line-strong"], 1);
        stroke(path.spur, colours["--line-strong"], 1);
      });
      paths.forEach((path) => {
        if (path.id === hotRef.current) {
          stroke(path.trunk, colours["--brand"], 2.5);
          stroke(path.spur, colours["--brand"], 2.5);
        }
      });
      if (!reduce.matches) {
        paths.forEach((path) => {
          const t = (path.phase + now * SPEED) % 1;
          // The pulse travels the trunk for 55% of the cycle, then the spur.
          const point =
            t < 0.55
              ? pointAt(path.trunk, t / 0.55)
              : pointAt(path.spur, (t - 0.55) / 0.45);
          context.fillStyle = colours["--signal"];
          context.fillRect(point[0] - 3.5, point[1] - 3.5, 7, 7);
        });
      }
    };

    const setRunning = (running: boolean) => {
      map.dataset.running = running ? "true" : "false";
    };

    const loop = (now: number) => {
      draw(now);
      const carryOn =
        !pausedRef.current && visible && !reduce.matches && !document.hidden;
      frame = carryOn ? requestAnimationFrame(loop) : 0;
      setRunning(frame !== 0);
    };

    const kick = () => {
      if (!frame) {
        frame = requestAnimationFrame(loop);
      }
    };

    const redraw = () => {
      if (!frame) {
        draw(performance.now());
      }
    };

    const relayout = () => {
      layout();
      draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = map.getBoundingClientRect();
      pointer = [event.clientX - box.left, event.clientY - box.top];
      redraw();
    };
    const onPointerLeave = () => {
      pointer = null;
      redraw();
    };
    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    const onTheme = () => {
      readColours();
      draw(performance.now());
    };
    const onMotionChange = () => {
      relayout();
      kick();
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(relayout, 80);
    };

    kickRef.current = kick;
    redrawRef.current = redraw;

    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) kick();
    });
    intersection.observe(map);
    const resize = new ResizeObserver(relayout);
    resize.observe(map);
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    map.addEventListener("pointermove", onPointerMove);
    map.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", onMotionChange);
    document.fonts?.ready.then(relayout);

    readColours();
    layout();
    setRunning(false);
    kick();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      intersection.disconnect();
      resize.disconnect();
      themeObserver.disconnect();
      map.removeEventListener("pointermove", onPointerMove);
      map.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", onMotionChange);
    };
  }, []);

  function highlight(id: string | null) {
    hotRef.current = id;
    setHot(id);
    redrawRef.current();
  }

  function togglePause() {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    if (!next) {
      kickRef.current();
    }
  }

  return (
    <div className="map" id="map" ref={mapRef}>
      <canvas aria-hidden="true" ref={canvasRef} />
      <div className="map__bar">
        <span className="map__label">{label}</span>
        <button
          aria-pressed={paused}
          className="map__pause"
          id="pause"
          onClick={togglePause}
          type="button"
        >
          {paused ? play : pause}
        </button>
      </div>
      <div className="tree">
        <div className="tree__root">
          <span className="node node--root" data-n="root">
            {root}
          </span>
        </div>
        <div className="tree__branches">
          {branches.map((branch) => (
            <div key={branch.id}>
              <span className="node node--branch" data-branch="" data-n={branch.id}>
                {branch.label}
                <small>{branch.note}</small>
              </span>
              <ul className="tree__leaves">
                {branch.leaves.map((leaf) => (
                  <li key={leaf.id}>
                    <Link
                      className={leaf.id === hot ? "node is-hot" : "node"}
                      data-n={leaf.id}
                      data-p={branch.id}
                      href={leaf.href}
                      {...(leaf.href.startsWith("http")
                        ? { rel: "noopener noreferrer", target: "_blank" }
                        : {})}
                      onBlur={() => highlight(null)}
                      onFocus={() => highlight(leaf.id)}
                      onPointerEnter={() => highlight(leaf.id)}
                      onPointerLeave={(event) => {
                        if (document.activeElement !== event.currentTarget) {
                          highlight(null);
                        }
                      }}
                    >
                      {leaf.label}
                      {leaf.note ? <small>{leaf.note}</small> : null}
                      {leaf.href.startsWith("http") ? (
                        <span className="vh"> {newTab}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p aria-live="polite" className="map__caption">
        <strong>{hotLeaf ? hotLeaf.captionTitle : captionTitle}</strong>{" "}
        {hotLeaf ? hotLeaf.caption : caption}
      </p>
    </div>
  );
}
