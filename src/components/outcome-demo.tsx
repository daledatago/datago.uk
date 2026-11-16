"use client";

import { useState } from "react";

type OutcomeDemoProps = {
  note: string;
  groupLabel: string;
  options: { key: string; label: string; title: string; body: string }[];
};

/** Illustration of Bridgly's three outcomes. It is not the product interface. */
export function OutcomeDemo({ note, groupLabel, options }: OutcomeDemoProps) {
  const [selected, setSelected] = useState(options[0].key);
  const current = options.find((option) => option.key === selected) ?? options[0];

  return (
    <div className="demo">
      <p className="demo__note">{note}</p>
      <div aria-label={groupLabel} className="demo__opts" role="group">
        {options.map((option) => (
          <button
            aria-pressed={option.key === selected}
            key={option.key}
            onClick={() => setSelected(option.key)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="demo__out" data-state={current.key}>
        <b>{current.title}</b>
        <span>{current.body}</span>
      </p>
    </div>
  );
}
