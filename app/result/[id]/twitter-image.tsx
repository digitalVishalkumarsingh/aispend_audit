import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(<div style={{ fontSize: 48 }}>StackSave Audit</div>, {
    ...size,
  });
}
