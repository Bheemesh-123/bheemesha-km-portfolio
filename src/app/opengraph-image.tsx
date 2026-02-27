import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bheemesha K M — Apprentice Data Scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e1b4b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(99,102,241,0.4)",
              background: "rgba(99,102,241,0.1)",
              fontSize: 16,
              color: "#a5b4fc",
            }}
          >
            ✨ Available for opportunities
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#ffffff",
              marginTop: 16,
            }}
          >
            Bheemesha K M
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Apprentice Data Scientist
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "#94a3b8",
              marginTop: 8,
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            ML/DL • Computer Vision • EDA • Building practical AI solutions
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 16,
              color: "#6366f1",
              marginTop: 24,
              letterSpacing: 1,
            }}
          >
            bheemesha.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
