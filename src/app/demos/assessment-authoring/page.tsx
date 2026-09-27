import { permanentRedirect } from "next/navigation";

export default function LegacyAssessmentAuthoringPage() {
  permanentRedirect("/demos/citb-assessment");
}
