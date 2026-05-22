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
          background: "#132019",
          color: "#f5f7f2",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 92,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        D
      </div>
    ),
    size,
  );
}

