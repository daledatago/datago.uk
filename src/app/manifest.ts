import type { MetadataRoute } from "next";
import { site } from "@/lib/strings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Datago",
    short_name: "Datago",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f2",
    theme_color: "#132019",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

