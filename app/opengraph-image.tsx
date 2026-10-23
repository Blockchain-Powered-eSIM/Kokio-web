import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

import {
  LOGO_PATHS,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@/lib/og-image";

export const alt = "Kokio: travel data without the paperwork";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

const anybodyBold = fs.readFileSync(
  path.join(process.cwd(), "assets/fonts/Anybody-Bold.ttf")
);

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        padding: "80px",
      }}
    >
      <svg width="140" height="33" viewBox="0 0 207 48">
        {LOGO_PATHS.map((p) => (
          <path
            key={p.fill}
            d={p.d}
            fill={p.fill}
            fillRule={p.fillRule}
            clipRule={p.clipRule}
          />
        ))}
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span
          style={{
            display: "flex",
            fontFamily: "Anybody",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.12,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          Friendly eSIM store for your safe trips
        </span>
        <span
          style={{
            display: "flex",
            fontFamily: "Anybody",
            fontSize: 28,
            fontWeight: 700,
            color: "#ffd60a",
            maxWidth: 1040,
          }}
        >
          Travel eSIMs for 200+ destinations. No name, email or ID.
        </span>
      </div>

      <span
        style={{
          display: "flex",
          fontFamily: "Anybody",
          fontSize: 24,
          fontWeight: 700,
          color: "#aeaeb2",
        }}
      >
        kokio.app
      </span>
    </div>,
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        {
          name: "Anybody",
          data: anybodyBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
