import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={cn("max-w-2xl", alignCls, className)}>
      {eyebrow ? (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-fg-muted backdrop-blur-md"
          )}
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-5 text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-gradient-fg sm:text-[44px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted sm:text-[17px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
