"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Arrow } from "@/components/arrow";

type Layer = {
  slug: string;
  n: string;
  /** Position in the stack, counted from the bottom. */
  layer: number;
  name: string;
  short: string;
  outcome: string;
  how: string;
};

type LayerStackProps = {
  layers: Layer[];
  labels: {
    tabs: string;
    outcome: string;
    how: string;
    more: string;
  };
};

/**
 * The five kinds of work as five layers of one system, drawn in CSS 3D. The
 * drawing is a second way to choose a layer for mouse users; the tab list is
 * the control, with the usual arrow-key behaviour. Without scripting every
 * panel is shown in full.
 */
export function LayerStack({ layers, labels }: LayerStackProps) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scene = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onKey(event: React.KeyboardEvent, index: number) {
    const last = layers.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    if (next < 0) {
      return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = scene.current;
    if (!node || event.pointerType !== "mouse") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.setProperty("--turn", `${(x * 14).toFixed(2)}deg`);
      node.style.setProperty("--lean", `${(-y * 8).toFixed(2)}deg`);
    });
  }

  function onLeave() {
    cancelAnimationFrame(frame.current);
    scene.current?.style.setProperty("--turn", "0deg");
    scene.current?.style.setProperty("--lean", "0deg");
  }

  return (
    <div className="lstack">
      <div
        aria-hidden="true"
        className="lstack__viz"
        onPointerLeave={onLeave}
        onPointerMove={onMove}
      >
        <div className="lstack__scene" ref={scene}>
          {layers.map((layer, index) => (
            <div
              className="lstack__plane"
              data-on={index === selected ? "" : undefined}
              key={layer.slug}
              onClick={() => setSelected(index)}
              style={{ "--i": layer.layer } as React.CSSProperties}
            >
              <span className="lstack__tag">
                <span>{layer.n}</span>
                {layer.short}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="lstack__body">
        <div
          aria-label={labels.tabs}
          aria-orientation="vertical"
          className="lstack__tabs"
          role="tablist"
        >
          {layers.map((layer, index) => (
            <button
              aria-controls={`${id}-panel-${index}`}
              aria-selected={index === selected}
              id={`${id}-tab-${index}`}
              key={layer.slug}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKey(event, index)}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              tabIndex={index === selected ? 0 : -1}
              type="button"
            >
              <span className="lstack__n">{layer.n}</span>
              {layer.name}
            </button>
          ))}
        </div>

        {layers.map((layer, index) => (
          <div
            aria-labelledby={`${id}-tab-${index}`}
            className="lstack__panel"
            hidden={index !== selected}
            id={`${id}-panel-${index}`}
            key={layer.slug}
            role="tabpanel"
            tabIndex={0}
          >
            <p className="lstack__kicker">
              <span>{layer.n}</span>
              {layer.name}
            </p>
            <h3>{layer.outcome}</h3>
            <div className="lstack__how">
              <h4 className="label">{labels.how}</h4>
              <p>{layer.how}</p>
            </div>
            <Link
              aria-label={`${labels.more}: ${layer.name}`}
              className="textlink"
              href={`/services#${layer.slug}`}
            >
              {labels.more}&nbsp;<Arrow />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
