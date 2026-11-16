"use client";

import { useEffect, useRef } from "react";

/**
 * A ring that follows a mouse and opens over anything that can be clicked.
 * Decoration only: the system cursor stays, and nothing is drawn for touch,
 * keyboard or reduced-motion visitors.
 */
export function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ring.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || !fine || reduce) {
      return;
    }

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;
    let seen = false;

    const tick = () => {
      ringX += (x - ringX) * 0.22;
      ringY += (y - ringY) * 0.22;
      node.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0)`;
      frame =
        Math.abs(x - ringX) + Math.abs(y - ringY) > 0.2 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (!seen) {
        seen = true;
        ringX = x;
        ringY = y;
        node.dataset.on = "";
      }
      const target = event.target as Element | null;
      const over = target?.closest?.("a, button, [role='tab']");
      node.toggleAttribute("data-over", Boolean(over));
      node.toggleAttribute(
        "data-field",
        !over && Boolean(target?.closest?.(".stage, .svc__view")),
      );
      if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      seen = false;
      delete node.dataset.on;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div aria-hidden="true" className="cursor-ring" ref={ring} />;
}
