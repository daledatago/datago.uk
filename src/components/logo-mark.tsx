import Link from "next/link";

export function LogoMark() {
  return (
    <Link aria-label="Datago home" className="logo-mark" href="/">
      <span className="logo-mark__symbol" aria-hidden="true">
        D
      </span>
      <span className="logo-mark__text">Datago</span>
    </Link>
  );
}

