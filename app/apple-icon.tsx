import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon, mirroring app/icon.svg. */
export default function AppleIcon() {
  const rule = { width: 100, height: 5, background: "#F2E9D8", opacity: 0.7 };
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#61654B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          color: "#F2E9D8",
          fontFamily: "Georgia, serif",
          fontSize: 84,
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        <div style={rule} />
        <div>S</div>
        <div style={rule} />
      </div>
    ),
    size
  );
}
