"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import type { FieldHandle, FieldOptions } from "./field-engine";

/** "poster": the still drawing. "live": the 3D scene is running. "static": no WebGL, the drawing stays. */
export type FieldState = "poster" | "live" | "static";

type UseFieldOptions = {
  mode: FieldOptions["mode"];
  focus?: number;
  /** Scroll progress 0..1 for this field, read on each scroll. */
  progress: () => number;
  onProgress?: (value: number) => void;
};

function supportsWebGL() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the 3D field on a canvas, once it is worth doing: not with reduced
 * motion, not without WebGL, and only after the page has loaded and the
 * browser is idle, so the scene never competes with first paint.
 */
export function useField(
  host: RefObject<HTMLElement | null>,
  canvas: RefObject<HTMLCanvasElement | null>,
  { mode, focus = -1, progress, onProgress }: UseFieldOptions,
): { state: FieldState; field: RefObject<FieldHandle | null> } {
  const [state, setState] = useState<FieldState>("poster");
  const field = useRef<FieldHandle | null>(null);

  useEffect(() => {
    const hostElement = host.current;
    const canvasElement = canvas.current;
    if (!hostElement || !canvasElement) {
      return;
    }

    const report = () => onProgress?.(progress());
    report();
    window.addEventListener("scroll", report, { passive: true });
    window.addEventListener("resize", report);
    const stopReporting = () => {
      window.removeEventListener("scroll", report);
      window.removeEventListener("resize", report);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return stopReporting;
    }
    if (!supportsWebGL()) {
      queueMicrotask(() => setState("static"));
      return stopReporting;
    }

    let handle: FieldHandle | null = null;
    let cancelled = false;
    let visible = true;
    let idle = 0;
    let timer = 0;

    const sync = () => handle?.setProgress(progress());
    const run = () => handle?.setRunning(visible && !document.hidden);

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }
      const rect = canvasElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      handle?.setPointer(x, y, Math.abs(x) <= 1 && Math.abs(y) <= 1);
    };
    const onLeave = () => handle?.setPointer(0, 0, false);
    const onLost = (event: Event) => {
      event.preventDefault();
      handle?.setRunning(false);
      setState("static");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1].isIntersecting;
        run();
      },
      { rootMargin: "80px" },
    );
    const resizer = new ResizeObserver(() => handle?.resize());
    const theme = new MutationObserver(() => handle?.readColors());

    const start = async () => {
      try {
        const { createField } = await import("./field-engine");
        if (cancelled) {
          return;
        }
        const light = window.matchMedia("(max-width: 979px)").matches;
        handle = createField(canvasElement, { mode, focus, light });
        field.current = handle;
        sync();
        observer.observe(hostElement);
        resizer.observe(canvasElement);
        theme.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        window.addEventListener("scroll", sync, { passive: true });
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", run);
        canvasElement.addEventListener("webglcontextlost", onLost);
        run();
        setState("live");
      } catch {
        setState("static");
      }
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(() => void start(), { timeout: 1200 });
      } else {
        timer = globalThis.setTimeout(() => void start(), 200) as unknown as number;
      }
    };
    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      stopReporting();
      window.removeEventListener("load", schedule);
      if (idle && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
      globalThis.clearTimeout(timer);
      observer.disconnect();
      resizer.disconnect();
      theme.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", run);
      canvasElement.removeEventListener("webglcontextlost", onLost);
      handle?.dispose();
      field.current = null;
    };
    // The options are fixed for the life of a field.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, field };
}
