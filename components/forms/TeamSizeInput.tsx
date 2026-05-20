"use client";

import { cn } from "@/lib/cn";

type Props = {
  value: number;
  onChange: (next: number) => void;
  id?: string;
  disabled?: boolean;
};

export default function TeamSizeInput({ value, onChange, id, disabled }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Decrease team size"
        disabled={disabled || value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.02] text-fg-muted transition-colors",
          "hover:border-white/20 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <span aria-hidden>−</span>
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={1}
        max={5000}
        step={1}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          onChange(Number.isFinite(n) && n > 0 ? n : 1);
        }}
        disabled={disabled}
        className="h-9 w-20 rounded-md border border-white/10 bg-bg-deep/60 px-3 text-center font-mono text-[13px] text-fg outline-none transition-colors focus:border-accent/40"
      />
      <button
        type="button"
        aria-label="Increase team size"
        disabled={disabled}
        onClick={() => onChange(Math.min(5000, value + 1))}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.02] text-fg-muted transition-colors",
          "hover:border-white/20 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <span aria-hidden>+</span>
      </button>
      <span className="ml-1 text-[12px] text-fg-muted/70">people</span>
    </div>
  );
}
