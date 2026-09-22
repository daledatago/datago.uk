import type { Metadata } from "next";
import { CircularDemo } from "./circular-demo";

export const metadata: Metadata = {
  title: "Circular value demonstration",
  description: "An illustrative commercial decision tool for circular business practices.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demos/circular-economy" },
};

export default function CircularValuePage() {
  return <CircularDemo />;
}
