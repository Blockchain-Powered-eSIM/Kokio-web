import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

import { getManifesto } from "@/lib/manifesto";
import {
  LOGO_PATHS,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@/lib/og-image";

export const alt = "Kokio Manifesto";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

const anybodyBold = fs.readFileSync(
  path.join(process.cwd(), "assets/fonts/Anybody-Bold.ttf")
);

const meadowBgBase64 = fs
  .readFileSync(path.join(process.cwd(), "public/manifesto/meadow-bg.png"))
  .toString("base64");

const DEFAULT_HEADLINE =
  "Connectivity is a human right. Privacy is its guardian.";

/** Distinct from the shared blog OG template (lib/og-image.tsx) — watercolor
 * background + the credo line, not the page title, per #29. */
export default function Image() {
  const manifesto = getManifesto();
  const headline = manifesto.ogHeadline ?? DEFAULT_HEADLINE;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#FAF3DD",
        }}
      >
        <img
          src={`data:image/png;base64,${meadowBgBase64}`}
          width={OG_IMAGE_SIZE.width}
          height={OG_IMAGE_SIZE.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#F9FAF6",
            opacity: 0.72,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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

          <span
            style={{
              display: "flex",
              fontFamily: "Anybody",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#193238",
              maxWidth: 950,
            }}
          >
            {headline}
          </span>

          <span
            style={{
              display: "flex",
              fontFamily: "Anybody",
              fontSize: 26,
              fontWeight: 700,
              color: "#193238",
              opacity: 0.6,
            }}
          >
            kokio.app/manifesto
          </span>
        </div>
      </div>
    ),
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
