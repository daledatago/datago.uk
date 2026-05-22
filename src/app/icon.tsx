import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #1a375e, #1f4e8e)",
          color: "#ffffff",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 34,
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
            height: 5,
            opacity: 0.7,
            position: "absolute",
            right: 15,
            top: 12,
            width: 5,
          }}
        />
        <span
          style={{
            background: "#ffffff",
            borderRadius: "999px",
            height: 5,
            opacity: 0.52,
            position: "absolute",
            right: 11,
            top: 30,
            width: 5,
          }}
        />
        <span
          style={{
            background: "#ffffff",
            borderRadius: "999px",
            bottom: 12,
            height: 5,
            left: 16,
            opacity: 0.44,
            position: "absolute",
            width: 5,
          }}
        />
        D
      </div>
    ),
    size,
  );
}
