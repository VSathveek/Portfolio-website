import { ImageResponse } from "next/og";

// A generated "VS" monogram favicon in the site's accent color.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2d5f8b",
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 700,
        borderRadius: 7,
        fontFamily: "serif",
      }}
    >
      VS
    </div>,
    { ...size }
  );
}
