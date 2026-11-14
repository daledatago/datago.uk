import Image from "next/image";
import Link from "next/link";

export function LogoMark() {
  return (
    <Link aria-label="DataGo home" className="logo-mark" href="/">
      <Image src="/assets/datago-wordmark.png" alt="" width={151} height={54} unoptimized />
    </Link>
  );
}
