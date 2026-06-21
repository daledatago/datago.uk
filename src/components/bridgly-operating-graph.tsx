import { bridglyOperatingGraphMarkup } from "@/lib/bridgly-operating-graph-markup";

export function BridglyOperatingGraph() {
  return (
    <div className="bridgly-operating-graph">
      <div
        aria-label="Bridgly operating graph visual"
        className="bridgly-operating-graph__frame"
        dangerouslySetInnerHTML={{ __html: bridglyOperatingGraphMarkup }}
      />
    </div>
  );
}
