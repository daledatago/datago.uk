import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #1a375e, #1f4e8e)",
          color: "#ffffff",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 92,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <span
          style={{
            background: "#ffffff",
            borderRadius: "999px",
            height: 13,
            opacity: 0.7,
            position: "absolute",
            right: 42,
            top: 34,
            width: 13,
          }}
        />
        <span
          style={{
            background: "#ffffff",
            borderRadius: "999px",
            height: 13,
            opacity: 0.52,
            position: "absolute",
            right: 30,
            top: 90,
            width: 13,
          }}
        />
        <span
          style={{
            background: "#ffffff",
            borderRadius: "999px",
            bottom: 34,
            height: 13,
            left: 46,
            opacity: 0.44,
            position: "absolute",
            width: 13,
          }}
        />
        D
      </div>
    ),
    size,
  );
}
