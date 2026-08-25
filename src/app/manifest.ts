import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oney Erge | Applied AI and Physics",
    short_name: "Oney Erge",
    description:
      "Oney Erge is an applied AI researcher, engineer, and inventor with 8 US patents, building agent systems, local AI inference, and robotics simulation.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f7f4",
    theme_color: "#f7f7f4",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/media/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/media/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
