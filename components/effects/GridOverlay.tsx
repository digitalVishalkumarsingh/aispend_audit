import { cn } from "@/lib/cn";

type GridOverlayProps = {
  className?: string;
  /** Whether to apply the radial mask that fades the grid towards the edges. */
  masked?: boolean;
};

export default function GridOverlay({
  className,
  masked = true,
}: GridOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-grid",
        className
      )}
      style={
        masked
          ? {
            maskImage:
              "radial-gradient(ellipse at center, black 0%, black 35%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, black 35%, transparent 80%)",
          }
          : undefined
      }
    />
  );
}
