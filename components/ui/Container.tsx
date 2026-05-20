import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Max-width preset. */
  size?: "sm" | "md" | "lg" | "xl";
  as?: "div" | "section" | "header" | "footer" | "main";
};

const SIZE_MAP = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
} as const;

export default function Container({
  children,
  className,
  size = "lg",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        SIZE_MAP[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
