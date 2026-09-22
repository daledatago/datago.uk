import { permanentRedirect } from "next/navigation";

export default function LegacyAssessmentDemoPage() {
  permanentRedirect("/demos/assessment-authoring");
}
