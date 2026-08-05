import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cortexia AI",
    short_name: "Cortexia",
    description:
      "Engineering Intelligence. Empowering Businesses. AI solutions, automation, and scalable software.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
