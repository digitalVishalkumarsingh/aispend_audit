import { cn } from "@/lib/cn";

type NoiseOverlayProps = {
  className?: string;
  /** Opacity 0–100. */
  opacity?: number;
};

export default function NoiseOverlay({
  className,
  opacity = 4,
}: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-noise mix-blend-overlay",
        className
      )}
      style={{ opacity: opacity / 100 }}
    />
  );
}
