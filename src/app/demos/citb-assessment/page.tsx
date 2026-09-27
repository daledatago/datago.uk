import type { Metadata } from "next";
import { AssessmentDemo } from "../assessment-authoring/assessment-demo";

export const metadata: Metadata = {
  title: "CITB assessment authoring prototype",
  description: "An interactive mock CITB assessment workspace covering question creation, review, management, evidence and reporting.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demos/citb-assessment" },
};

export default function CitbAssessmentPage() {
  return <AssessmentDemo />;
}
