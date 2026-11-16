"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useField } from "./use-field";

type ServicesExplorerProps = {
  /** The five panels, server-rendered. Each is a <section id={slug}>. */
  children: ReactNode;
  poster: ReactNode;
  items: { slug: string; n: string; name: string; short: string; layer: number }[];
  navLabel: string;
  captions: string[];
};

/**
 * The services page: five panels beside the field. As a panel comes into
 * view the field picks out that panel's layer, and the list of links marks
 * where you are. The panels are plain sections with their own anchors, so the
 * page reads and links correctly with none of this running.
 */
export function ServicesExplorer({
  children,
  poster,
  items,
  navLabel,
  captions,
}: ServicesExplorerProps) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const progress = useCallback(() => 0.3, []);
  const { state, field } = useField(host, canvas, {
    mode: "layer",
    focus: items[0].layer,
    progress,
  });

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = items.findIndex((item) => item.slug === entry.target.id);
            if (index >= 0) {
              setActive(index);
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    field.current?.setFocus(items[active].layer);
  }, [active, field, items, state]);

  return (
    <div className="svc" data-field={state} data-focus={items[active].layer} ref={host}>
      <div className="svc__side">
        <figure aria-hidden="true" className="svc__field">
          <div className="svc__view">
            {poster}
            <canvas ref={canvas} />
          </div>
          <figcaption>{captions[active]}</figcaption>
        </figure>
        <nav aria-label={navLabel} className="svc__nav">
          <ol>
            {items.map((item, index) => (
              <li key={item.slug}>
                <a aria-current={index === active ? "true" : undefined} href={`#${item.slug}`}>
                  <span>{item.n}</span>
                  {item.short}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="svc__panels">{children}</div>
    </div>
  );
}
