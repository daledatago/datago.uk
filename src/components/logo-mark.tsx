import Link from "next/link";
import { DatagoMark } from "@/components/datago-mark";

export function LogoMark() {
  return (
    <Link aria-label="Datago home" className="logo-mark" href="/">
      <DatagoMark size={34} />
      <span className="logo-mark__text">datago</span>
    </Link>
  );
}
