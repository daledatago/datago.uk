"use client";

import { useEffect, useRef, useState } from "react";

type SystemNode = {
  title: string;
  body: string;
};

type CompanySystemMapProps = {
  nodes: SystemNode[];
  label: string;
  bridge: string;
  foot: string;
};

const NODE_POSITIONS = [
  { x: 150, y: 118 },
  { x: 280, y: 76 },
  { x: 410, y: 118 },
  { x: 150, y: 270 },
  { x: 280, y: 312 },
  { x: 410, y: 270 },
];
const BRIDGE_CENTER = { x: 280, y: 194 };

export function CompanySystemMap({
  nodes,
  label,
  bridge,
  foot,
}: CompanySystemMapProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeNode = nodes[activeIndex];

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  function activateWithDelay(index: number) {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      hoverTimeoutRef.current = null;
    }, 1000);
  }

  function activateImmediately(index: number) {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setActiveIndex(index);
  }

  function cancelDelayedActivation() {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }

  return (
    <div className="company-system-map">
      <div className="company-system-map__shell">
        <div className="company-system-map__header">
          <span>{label}</span>
          <span>{bridge}</span>
        </div>

        <div className="company-system-map__visual">
          <svg aria-hidden="true" viewBox="0 0 560 380" role="presentation">
            <defs>
              <linearGradient
                id="company-system-map-gradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(36, 123, 92, 0.24)" />
                <stop offset="100%" stopColor="rgba(31, 78, 142, 0.12)" />
              </linearGradient>
            </defs>

            <rect
              fill="url(#company-system-map-gradient)"
              height="380"
              rx="28"
              width="560"
              x="0"
              y="0"
            />

            <g className="company-system-map__orbits">
              <circle cx="280" cy="194" r="96" />
              <circle cx="280" cy="194" r="138" />
            </g>

            <g className="company-system-map__lines">
              {NODE_POSITIONS.map((position, index) => (
                <line
                  key={nodes[index].title}
                  x1={BRIDGE_CENTER.x}
                  x2={position.x}
                  y1={BRIDGE_CENTER.y}
                  y2={position.y}
                />
              ))}
            </g>

            <g className="company-system-map__bridge">
              <rect height="84" rx="22" width="168" x="196" y="150" />
              <text x="280" y="178">
                DataGo
              </text>
              <text x="280" y="198">
                system builder
              </text>
              <text x="280" y="218">
                Bridgly flagship
              </text>
            </g>

          </svg>

          <div className="company-system-map__hotspots" role="tablist">
            {nodes.map((node, index) => {
              const position = NODE_POSITIONS[index];
              const isActive = index === activeIndex;

              return (
                <button
                  aria-selected={isActive}
                  className={`company-system-map__hotspot${isActive ? " is-active" : ""}`}
                  key={node.title}
                  onBlur={cancelDelayedActivation}
                  onFocus={() => activateImmediately(index)}
                  onMouseEnter={() => activateWithDelay(index)}
                  onMouseLeave={cancelDelayedActivation}
                  onClick={() => activateImmediately(index)}
                  role="tab"
                  style={{
                    left: `${(position.x / 560) * 100}%`,
                    top: `${(position.y / 380) * 100}%`,
                  }}
                  type="button"
                >
                  <span>{node.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="company-system-map__body">
          <div className="company-system-map__panel" role="tabpanel">
            <p className="company-system-map__panel-label">{activeNode.title}</p>
            <p>{activeNode.body}</p>
          </div>
        </div>

        <p className="company-system-map__foot">{foot}</p>
      </div>
    </div>
  );
}
