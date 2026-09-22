import { permanentRedirect } from "next/navigation";

export default function LegacyCircularDemoPage() {
  permanentRedirect("/demos/circular-economy");
}
