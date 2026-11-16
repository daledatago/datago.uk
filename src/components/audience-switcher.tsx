"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";

type Role = {
  id: string;
  who: string;
  doing: string;
  question: string;
  answer: string;
  signposts: { href: string; label: string; note: string }[];
};

type AudienceSwitcherProps = {
  listLabel: string;
  startWith: string;
  roles: Role[];
};

/**
 * "If you are…": a tab list. It filters nothing on the page; it only signposts.
 * Until the script runs, all five panels are shown, so it works without it.
 */
export function AudienceSwitcher({ listLabel, startWith, roles }: AudienceSwitcherProps) {
  const ready = useHydrated();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = roles.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next !== null) {
      event.preventDefault();
      setSelected(next);
      tabs.current[next]?.focus();
    }
  }

  return (
    <div className="tabs" data-reveal="">
      <div aria-label={listLabel} className="tabs__list" role="tablist">
        {roles.map((role, index) => (
          <button
            aria-controls={`${role.id}-panel`}
            aria-selected={index === selected}
            id={role.id}
            key={role.id}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            role="tab"
            tabIndex={!ready || index === selected ? 0 : -1}
            type="button"
          >
            <b>{role.who}</b>
            <span>{role.doing}</span>
          </button>
        ))}
      </div>
      {roles.map((role, index) => (
        <div
          aria-labelledby={role.id}
          className="tabs__panel"
          hidden={ready && index !== selected}
          id={`${role.id}-panel`}
          key={role.id}
          role="tabpanel"
          tabIndex={0}
        >
          <h3>{role.question}</h3>
          <p>{role.answer}</p>
          <p className="label">{startWith}</p>
          <div className="signposts">
            {role.signposts.map((signpost) => (
              <Link href={signpost.href} key={signpost.label}>
                {signpost.label}
                <span>{signpost.note}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
