export function OperatingMesh() {
  return (
    <div className="operating-mesh" aria-label="Operating intelligence mesh visual">
      <span className="operating-mesh__label">Operating intelligence layer</span>
      <span className="operating-mesh__live">live</span>

      <svg className="operating-mesh__svg" viewBox="0 0 500 500" role="img">
        <defs>
          <radialGradient id="mesh-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="500" height="500" fill="url(#mesh-bg-glow)" />

        <text x="40" y="125" className="operating-mesh__layer-label">
          SYSTEMS
        </text>
        <text x="40" y="245" className="operating-mesh__layer-label">
          INTELLIGENCE
        </text>
        <text x="40" y="365" className="operating-mesh__layer-label">
          DECISIONS
        </text>

        <line className="operating-mesh__guide" x1="0" y1="135" x2="500" y2="135" />
        <line className="operating-mesh__guide" x1="0" y1="255" x2="500" y2="255" />
        <line className="operating-mesh__guide" x1="0" y1="375" x2="500" y2="375" />

        <g className="operating-mesh__quiet-lines">
          <line x1="115" y1="120" x2="180" y2="245" />
          <line x1="115" y1="120" x2="260" y2="240" />
          <line x1="200" y1="105" x2="180" y2="245" />
          <line x1="200" y1="105" x2="260" y2="240" />
          <line x1="290" y1="115" x2="260" y2="240" />
          <line x1="290" y1="115" x2="340" y2="250" />
          <line x1="380" y1="100" x2="340" y2="250" />
          <line x1="380" y1="100" x2="420" y2="245" />
          <line x1="445" y1="125" x2="420" y2="245" />
          <line x1="180" y1="245" x2="130" y2="375" />
          <line x1="180" y1="245" x2="220" y2="370" />
          <line x1="260" y1="240" x2="220" y2="370" />
          <line x1="260" y1="240" x2="310" y2="380" />
          <line x1="340" y1="250" x2="310" y2="380" />
          <line x1="340" y1="250" x2="395" y2="365" />
          <line x1="420" y1="245" x2="395" y2="365" />
          <line x1="420" y1="245" x2="450" y2="380" />
        </g>

        <g className="operating-mesh__cluster-lines">
          <line x1="180" y1="245" x2="260" y2="240" />
          <line x1="260" y1="240" x2="340" y2="250" />
          <line x1="340" y1="250" x2="420" y2="245" />
        </g>

        <path className="operating-mesh__flow-line" d="M 200 105 L 260 240 L 310 380" />
        <path
          className="operating-mesh__flow-line operating-mesh__flow-line--delayed"
          d="M 380 100 L 340 250 L 395 365"
        />
        <path
          className="operating-mesh__flow-line operating-mesh__flow-line--soft"
          d="M 290 115 L 340 250 L 220 370"
        />

        <g className="operating-mesh__system-nodes">
          <circle cx="115" cy="120" r="6" />
          <circle cx="200" cy="105" r="7" className="operating-mesh__node-ink" />
          <circle cx="290" cy="115" r="6" />
          <circle cx="380" cy="100" r="7" className="operating-mesh__node-ink" />
          <circle cx="445" cy="125" r="6" />
        </g>

        <g className="operating-mesh__intel-nodes">
          <circle cx="180" cy="245" r="9" className="operating-mesh__pulse-node" />
          <circle cx="260" cy="240" r="11" className="operating-mesh__pulse-node operating-mesh__pulse-node--b" />
          <circle cx="340" cy="250" r="11" className="operating-mesh__pulse-node operating-mesh__pulse-node--c" />
          <circle cx="420" cy="245" r="9" className="operating-mesh__pulse-node operating-mesh__pulse-node--d" />
        </g>

        <circle cx="260" cy="240" r="8" className="operating-mesh__ring" />
        <circle cx="340" cy="250" r="8" className="operating-mesh__ring operating-mesh__ring--delayed" />

        <g className="operating-mesh__decision-nodes">
          <circle cx="130" cy="375" r="6" />
          <circle cx="220" cy="370" r="7" className="operating-mesh__node-ink" />
          <circle cx="310" cy="380" r="6" />
          <circle cx="395" cy="365" r="7" className="operating-mesh__node-ink" />
          <circle cx="450" cy="380" r="6" />
        </g>

        <g transform="translate(232 200) scale(0.55)" opacity="0.08">
          <rect x="6" y="6" width="34" height="34" rx="6" fill="var(--foreground)" />
          <rect x="24" y="24" width="34" height="34" rx="6" fill="var(--accent)" />
        </g>
      </svg>

      <div className="operating-mesh__foot">
        <span>14 systems · 6 decisions · 4 governed paths</span>
        <span>illustrative</span>
      </div>
    </div>
  );
}

