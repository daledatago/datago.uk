"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DatagoMark } from "@/components/datago-mark";
import { useDarkTheme } from "@/lib/use-hydrated";

type SiteHeaderProps = {
  items: { href: string; label: string }[];
  labels: {
    home: string;
    wordmark: string;
    primaryNav: string;
    mobileNav: string;
    menu: string;
    theme: string;
    cta: string;
  };
  ctaHref: string;
};

export function SiteHeader({ items, labels, ctaHref }: SiteHeaderProps) {
  const dark = useDarkTheme();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("datago-theme", next);
    } catch {
      /* Storage can be unavailable. The choice still applies to this page. */
    }
    document.dispatchEvent(new Event("datago-theme"));
  }

  return (
    <header className="header">
      <div className="shell header__in">
        <Link aria-label={labels.home} className="logo" href="/">
          <DatagoMark size={28} />
          {labels.wordmark}
        </Link>
        <nav aria-label={labels.primaryNav} className="nav">
          {items.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header__tools">
          <button
            aria-pressed={dark}
            className="icon-btn"
            onClick={toggleTheme}
            type="button"
          >
            <svg aria-hidden="true" height="18" viewBox="0 0 18 18" width="18">
              <circle cx="9" cy="9" fill="none" r="7.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 1.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
            </svg>
            <span className="vh">{labels.theme}</span>
          </button>
          <button
            aria-controls="mobile-nav"
            aria-expanded={open}
            className="icon-btn menu-btn"
            onClick={() => setOpen((value) => !value)}
            ref={menuButton}
            type="button"
          >
            {labels.menu}
          </button>
          <Link className="btn btn--sm" href={ctaHref}>
            {labels.cta}
          </Link>
        </div>
      </div>
      <nav
        aria-label={labels.mobileNav}
        className="mobile-nav"
        hidden={!open}
        id="mobile-nav"
      >
        {items.map((item) => (
          <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
