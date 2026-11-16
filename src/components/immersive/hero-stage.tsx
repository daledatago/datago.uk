"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";
import { useField } from "./use-field";

type HeroStageProps = {
  children: ReactNode;
  poster: ReactNode;
  chapters: { name: string; body: string }[];
  label: string;
  cue: string;
};

/** Where each chapter begins, as scroll progress through the stage. Before the first, the hero copy shows. */
const CHAPTER_AT = [0.14, 0.36, 0.6, 0.82];

/**
 * The home hero and its scroll story. On a wide screen the stage pins while
 * the visitor scrolls: the field assembles from separate clusters into one
 * lattice, and the copy on the left changes chapter by chapter. On a small
 * screen, with reduced motion or without WebGL, nothing pins: the chapters
 * are an ordinary numbered list under the field.
 */
export function HeroStage({ children, poster, chapters, label, cue }: HeroStageProps) {
  const stage = useRef<HTMLElement>(null);
  const fieldBox = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [chapter, setChapter] = useState(-1);

  const progress = useCallback(() => {
    const element = stage.current;
    const box = fieldBox.current;
    if (!element || !box) {
      return 0;
    }
    const viewport = window.innerHeight;
    const rect = element.getBoundingClientRect();
    const travel = rect.height - viewport;
    if (travel > viewport * 0.5) {
      /* Pinned: progress is how far the stage has scrolled through its own height. */
      return Math.min(1, Math.max(0, (68 - rect.top) / (travel + 68)));
    }
    const field = box.getBoundingClientRect();
    return Math.min(1, Math.max(0, (viewport * 0.92 - field.top) / (viewport * 0.72)));
  }, []);

  const onProgress = useCallback((value: number) => {
    stage.current?.style.setProperty("--p", value.toFixed(3));
    let index = -1;
    CHAPTER_AT.forEach((at, i) => {
      if (value >= at) {
        index = i;
      }
    });
    setChapter(index);
  }, []);

  const { state } = useField(stage, canvas, { mode: "assemble", progress, onProgress });

  return (
    <section
      className="stage"
      data-chapter={chapter}
      data-field={state}
      id="top"
      ref={stage}
    >
      <div className="stage__pin">
        <div className="shell stage__copy">{children}</div>
        <div aria-hidden="true" className="stage__field" ref={fieldBox}>
          {poster}
          <canvas ref={canvas} />
        </div>
        <div className="shell stage__story">
          <ol aria-label={label} className="stage__chapters">
            {chapters.map((item, index) => (
              <li
                aria-current={index === chapter ? "step" : undefined}
                data-done={index < chapter ? "" : undefined}
                key={item.name}
              >
                <span className="stage__n">{`0${index + 1} / 0${chapters.length}`}</span>
                <p className="stage__name">{item.name}</p>
                <p className="stage__body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div aria-hidden="true" className="shell stage__rail">
          <span className="stage__cue">{cue}</span>
          <span className="stage__track">
            {chapters.map((item) => (
              <i key={item.name} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
