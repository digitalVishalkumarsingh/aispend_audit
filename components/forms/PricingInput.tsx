"use client";

import { findCatalogEntry } from "@/features/audit/pricing-rules";
import { cn } from "@/lib/cn";
import type { ToolEntry } from "@/types/audit";

type Props = {
  value: ToolEntry;
  onChange: (next: ToolEntry) => void;
  onRemove: () => void;
};

/**
 * Row of inputs describing one tool subscription. Pulls available tiers from
 * `TOOL_CATALOG` when possible; otherwise falls back to a free-text tier input.
 */
export default function PricingInput({ value, onChange, onRemove }: Props) {
  const catalog = findCatalogEntry(value.toolId);

  return (
    <div className="grid gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_auto] sm:items-end sm:gap-3">
      {/* Name (read-only display) */}
      <div className="min-w-0">
        <label className="block text-[11px] uppercase tracking-wider text-fg-muted/70">
          Tool
        </label>
        <div className="mt-1.5 truncate text-[14px] font-medium text-fg">
          {value.name}
        </div>
      </div>

      {/* Tier */}
      <div>
        <label className="block text-[11px] uppercase tracking-wider text-fg-muted/70">
          Plan
        </label>
        {catalog ? (
          <select
            value={value.tier}
            onChange={(e) => onChange({ ...value, tier: e.target.value })}
            className="mt-1.5 h-9 w-full rounded-md border border-white/10 bg-bg-deep/60 px-2 text-[13px] text-fg outline-none transition-colors focus:border-accent/40"
          >
            {catalog.tiers.map((t) => (
              <option key={t.tier} value={t.tier} className="bg-bg-deep">
                {t.tier} (${t.pricePerSeat}/seat)
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={value.tier}
            onChange={(e) => onChange({ ...value, tier: e.target.value })}
            placeholder="Pro / Team / …"
            className="mt-1.5 h-9 w-full rounded-md border border-white/10 bg-bg-deep/60 px-2 text-[13px] text-fg outline-none transition-colors focus:border-accent/40"
          />
        )}
      </div>

      {/* Seats */}
      <div>
        <label className="block text-[11px] uppercase tracking-wider text-fg-muted/70">
          Seats
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={value.seats}
          onChange={(e) =>
            onChange({
              ...value,
              seats: Math.max(0, parseInt(e.target.value, 10) || 0),
            })
          }
          className="mt-1.5 h-9 w-full rounded-md border border-white/10 bg-bg-deep/60 px-2 text-center font-mono text-[13px] text-fg outline-none transition-colors focus:border-accent/40"
        />
      </div>

      {/* Monthly cost */}
      <div>
        <label className="block text-[11px] uppercase tracking-wider text-fg-muted/70">
          $/mo
        </label>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={1}
          value={value.monthlyCost}
          onChange={(e) =>
            onChange({
              ...value,
              monthlyCost: Math.max(0, parseFloat(e.target.value) || 0),
            })
          }
          className="mt-1.5 h-9 w-full rounded-md border border-white/10 bg-bg-deep/60 px-2 text-center font-mono text-[13px] text-fg outline-none transition-colors focus:border-accent/40"
        />
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${value.name}`}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.02] text-fg-muted/60 transition-colors",
          "hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-300"
        )}
      >
        <span aria-hidden>×</span>
      </button>

      {/* Active users (optional, full row on mobile) */}
      <div className="sm:col-span-5">
        <label className="block text-[11px] uppercase tracking-wider text-fg-muted/70">
          Active users last 30 days <span className="text-fg-muted/40">(optional)</span>
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={value.seats}
          value={value.activeUsers ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              const { activeUsers: _drop, ...rest } = value;
              void _drop;
              onChange(rest as ToolEntry);
              return;
            }
            onChange({
              ...value,
              activeUsers: Math.max(0, parseInt(v, 10) || 0),
            });
          }}
          placeholder="e.g. 8"
          className="mt-1.5 h-9 w-full rounded-md border border-white/10 bg-bg-deep/60 px-2 text-[13px] text-fg outline-none transition-colors focus:border-accent/40 sm:max-w-[160px]"
        />
      </div>
    </div>
  );
}
