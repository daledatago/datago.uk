import type { Metadata } from "next";
import { AssessmentDemo } from "./assessment-demo";

export const metadata: Metadata = {
  title: "Assessment authoring demonstration",
  description: "An interactive mock assessment workspace covering question creation, review, management, evidence and reporting.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demos/assessment-authoring" },
};

export default function AssessmentPage() {
  return <AssessmentDemo />;
}
