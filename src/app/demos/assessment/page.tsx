import type { Metadata } from "next";
import { AssessmentDemo } from "./assessment-demo";

export const metadata: Metadata = {
  title: "Assessment authoring demonstration",
  description: "An illustrative source-to-review workflow for a draft assessment question.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demos/assessment" },
};

export default function AssessmentPage() {
  return <AssessmentDemo />;
}
