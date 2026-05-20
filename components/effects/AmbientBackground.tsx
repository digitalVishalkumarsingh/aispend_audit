import { cn } from "@/lib/cn";
import GradientBlob from "./GradientBlob";
import GridOverlay from "./GridOverlay";
import NoiseOverlay from "./NoiseOverlay";

type AmbientBackgroundProps = {
  className?: string;
  /** Show the subtle grid layer. */
  grid?: boolean;
  /** Show the noise / film grain layer. */
  noise?: boolean;
  /** Show floating gradient blobs. */
  blobs?: boolean;
};

/**
 * Layered ambient background:
 *  - Radial vignette (inherited from <body>)
 *  - Floating indigo blobs (slow drift)
 *  - Faint dot/grid mesh
 *  - Film grain noise
 *
 * Drop into any `relative` section as the first child.
 */
export default function AmbientBackground({
  className,
  grid = true,
  noise = true,
  blobs = true,
}: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {blobs && (
        <>
          <GradientBlob
            className="-top-32 -left-32"
            color="radial-gradient(circle at center, #5e6ad2 0%, transparent 65%)"
            size="h-[42rem] w-[42rem]"
            opacity={22}
            animate="float-slow"
          />
          <GradientBlob
            className="top-40 -right-40"
            color="radial-gradient(circle at center, #818cf8 0%, transparent 65%)"
            size="h-[34rem] w-[34rem]"
            opacity={16}
            animate="float"
          />
          <GradientBlob
            className="bottom-[-12rem] left-1/3"
            color="radial-gradient(circle at center, #4c1d95 0%, transparent 70%)"
            size="h-[40rem] w-[40rem]"
            opacity={14}
            animate="pulse-soft"
          />
        </>
      )}
      {grid && <GridOverlay />}
      {noise && <NoiseOverlay opacity={5} />}
    </div>
  );
}
