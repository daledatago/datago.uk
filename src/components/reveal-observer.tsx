"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements, and draws the [data-line] rule, as they
 * scroll into view. With reduced motion, or without IntersectionObserver,
 * everything is shown at once. The CSS only hides content when scripting is on.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-line]"),
    );
    const show = (element: HTMLElement) => element.setAttribute("data-in", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
