"use client";

import { cn } from "@/lib/cn";

export type UsageValue = "heavy" | "moderate" | "light";

type Props = {
  value: UsageValue | undefined;
  onChange: (next: UsageValue) => void;
  disabled?: boolean;
};

const OPTIONS: Array<{
  value: UsageValue;
  label: string;
  hint: string;
}> = [
    { value: "heavy", label: "Heavy", hint: "Daily, all day" },
    { value: "moderate", label: "Moderate", hint: "A few hours, most days" },
    { value: "light", label: "Light", hint: "Occasional, ad-hoc" },
  ];

export default function UsagePattern({ value, onChange, disabled }: Props) {
  return (
    <div role="radiogroup" aria-label="Usage pattern" className="grid grid-cols-3 gap-2">
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              "group flex flex-col items-start gap-1 rounded-lg border px-3 py-3 text-left transition-all",
              selected
                ? "border-accent/40 bg-accent/10 text-fg shadow-[0_0_0_1px_rgba(94,106,210,0.25)]"
                : "border-white/10 bg-white/[0.02] text-fg-muted hover:border-white/20 hover:text-fg",
              "disabled:cursor-not-allowed disabled:opacity-40"
            )}
          >
            <span className="text-[13px] font-medium">{opt.label}</span>
            <span className="text-[11px] text-fg-muted/70">{opt.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
