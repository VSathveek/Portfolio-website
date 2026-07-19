import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Default social-share preview image (1200×630) used across the site.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#faf9f6",
        color: "#1a1a19",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#57564f", letterSpacing: 1 }}>
        {site.tagline.toUpperCase()}
      </div>
      <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 20 }}>
        {site.name}
      </div>
      <div
        style={{ display: "flex", marginTop: 40, height: 6, width: 120, background: "#2d5f8b" }}
      />
      <div style={{ display: "flex", fontSize: 30, color: "#57564f", marginTop: 40 }}>
        Machine learning · interpretability · retrieval
      </div>
    </div>,
    { ...size }
  );
}
