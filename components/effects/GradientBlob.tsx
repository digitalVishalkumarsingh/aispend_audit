import { cn } from "@/lib/cn";

type GradientBlobProps = {
  className?: string;
  /** CSS color or gradient string for the blob. */
  color?: string;
  /** Tailwind size class, e.g. `h-[40rem] w-[40rem]`. */
  size?: string;
  /** Blur radius class, e.g. `blur-3xl`. */
  blur?: string;
  /** Opacity 0–100. */
  opacity?: number;
  /** Animation preset. */
  animate?: "float" | "float-slow" | "pulse-soft" | "none";
};

export default function GradientBlob({
  className,
  color = "radial-gradient(circle at center, #5e6ad2 0%, transparent 70%)",
  size = "h-[36rem] w-[36rem]",
  blur = "blur-3xl",
  opacity = 30,
  animate = "float",
}: GradientBlobProps) {
  const animationClass =
    animate === "none" ? "" : `animate-${animate}`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full",
        size,
        blur,
        animationClass,
        className
      )}
      style={{
        background: color,
        opacity: opacity / 100,
        willChange: "transform, opacity",
      }}
    />
  );
}
