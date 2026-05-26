"use client";

import { useEffect, useRef, useState } from "react";

type Principle = {
  title: string;
  body: string;
};

type PrinciplesShowcaseProps = {
  items: Principle[];
};

const ICONS = ["HL", "GV", "EV", "ML", "PD"];

export function PrinciplesShowcase({ items }: PrinciplesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <div className="principles-showcase">
      <div className="principles-showcase__grid" role="tablist">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              aria-selected={isActive}
              className={`principles-showcase__tile${isActive ? " is-active" : ""}`}
              key={item.title}
              onBlur={cancelDelayedActivation}
              onClick={() => activateImmediately(index)}
              onFocus={() => activateImmediately(index)}
              onMouseEnter={() => activateWithDelay(index)}
              onMouseLeave={cancelDelayedActivation}
              role="tab"
              type="button"
            >
              <span className="principles-showcase__icon">{ICONS[index] ?? "DG"}</span>
              <span className="principles-showcase__title">{item.title}</span>
              <span className="principles-showcase__body">{item.body}</span>
            </button>
          );
        })}
      </div>

      <div className="principles-showcase__summary" role="tabpanel">
        <p className="principles-showcase__summary-label">
          {items[activeIndex].title}
        </p>
        <p>{items[activeIndex].body}</p>
      </div>
    </div>
  );
}
