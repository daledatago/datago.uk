"use client";

import { type ReactNode, useRef } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Largest tilt, in degrees. */
  max?: number;
};

/**
 * Gives a card depth under a mouse: it leans towards the pointer and a soft
 * highlight follows it. Touch, keyboard and reduced-motion visitors get the
 * same card, flat. The effect is styling only and changes no content.
 */
export function Tilt({ children, className = "", max = 5 }: TiltProps) {
  const element = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = element.current;
    if (!node || event.pointerType !== "mouse") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      node.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
      node.style.setProperty("--rx", `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
      node.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      node.style.setProperty("--glare", "1");
    });
  }

  function onLeave() {
    const node = element.current;
    cancelAnimationFrame(frame.current);
    if (!node) {
      return;
    }
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--glare", "0");
  }

  return (
    <div
      className={`tilt ${className}`.trim()}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      ref={element}
    >
      {children}
    </div>
  );
}
