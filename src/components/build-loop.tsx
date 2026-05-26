"use client";

import { useEffect, useRef, useState } from "react";

type BuildLoopPhase = {
  step: string;
  title: string;
  body: string;
};

type BuildLoopProps = {
  phases: BuildLoopPhase[];
};

export function BuildLoop({ phases }: BuildLoopProps) {
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
    <div className="build-loop">
      <div className="build-loop__track" aria-hidden="true">
        {phases.map((phase, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              className={`build-loop__dot${isActive ? " is-active" : ""}`}
              key={phase.title}
            >
              <span>{phase.step}</span>
            </div>
          );
        })}
      </div>

      <div className="build-loop__grid" role="tablist">
        {phases.map((phase, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              aria-selected={isActive}
              className={`build-loop__tile${isActive ? " is-active" : ""}`}
              key={phase.title}
              onBlur={cancelDelayedActivation}
              onClick={() => activateImmediately(index)}
              onFocus={() => activateImmediately(index)}
              onMouseEnter={() => activateWithDelay(index)}
              onMouseLeave={cancelDelayedActivation}
              role="tab"
              type="button"
            >
              <span className="build-loop__step">{phase.step}</span>
              <span className="build-loop__title">{phase.title}</span>
              <span className="build-loop__body">{phase.body}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
