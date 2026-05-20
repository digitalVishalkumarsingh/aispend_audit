"use client";

import { useMemo, useState } from "react";
import { TOOL_CATALOG } from "@/features/audit/pricing-rules";
import PricingInput from "./PricingInput";
import { cn } from "@/lib/cn";
import type { ToolEntry } from "@/types/audit";

type Props = {
  value: ToolEntry[];
  onChange: (next: ToolEntry[]) => void;
};

/**
 * Lets the user assemble the list of paid AI tools. Catalog entries become
 * one-click "chips"; custom tools can be added through a small free-text row.
 * Each selected tool is rendered as a `PricingInput` row below the picker.
 */
export default function ToolSelector({ value, onChange }: Props) {
  const [customName, setCustomName] = useState("");

  const selectedIds = useMemo(() => new Set(value.map((t) => t.toolId)), [value]);

  function addFromCatalog(toolId: string) {
    const entry = TOOL_CATALOG.find((t) => t.toolId === toolId);
    if (!entry || selectedIds.has(entry.toolId)) return;
    const defaultTier = entry.tiers[entry.tiers.length - 1] ?? entry.tiers[0];
    const seats = 5;
    onChange([
      ...value,
      {
        toolId: entry.toolId,
        name: entry.name,
        tier: defaultTier.tier,
        seats,
        monthlyCost: defaultTier.pricePerSeat * seats,
      },
    ]);
  }

  function addCustom() {
    const name = customName.trim();
    if (!name) return;
    const slug = `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    if (selectedIds.has(slug)) {
      setCustomName("");
      return;
    }
    onChange([
      ...value,
      {
        toolId: slug,
        name,
        tier: "Pro",
        seats: 1,
        monthlyCost: 20,
      },
    ]);
    setCustomName("");
  }

  function updateAt(idx: number, next: ToolEntry) {
    const copy = value.slice();
    copy[idx] = next;
    onChange(copy);
  }

  function removeAt(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-5">
      {/* Catalog chips */}
      <div className="flex flex-wrap gap-2">
        {TOOL_CATALOG.map((entry) => {
          const selected = selectedIds.has(entry.toolId);
          return (
            <button
              key={entry.toolId}
              type="button"
              onClick={() => addFromCatalog(entry.toolId)}
              disabled={selected}
              className={cn(
                "rounded-full border px-3 py-1 text-[12px] transition-colors",
                selected
                  ? "border-accent/40 bg-accent/10 text-accent-bright cursor-not-allowed"
                  : "border-white/10 bg-white/[0.02] text-fg-muted hover:border-white/20 hover:text-fg"
              )}
            >
              {selected ? "✓" : "+"} {entry.name}
            </button>
          );
        })}
      </div>

      {/* Custom tool */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder="Add another tool…"
          className="h-9 flex-1 rounded-md border border-white/10 bg-bg-deep/60 px-3 text-[13px] text-fg outline-none transition-colors focus:border-accent/40 placeholder:text-fg-muted/50"
        />
        <button
          type="button"
          onClick={addCustom}
          disabled={customName.trim().length === 0}
          className={cn(
            "h-9 rounded-md border border-white/10 bg-white/[0.02] px-3 text-[12px] text-fg-muted transition-colors",
            "hover:border-white/20 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          Add
        </button>
      </div>

      {/* Selected rows */}
      {value.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] p-6 text-center">
          <p className="text-[13px] text-fg-muted/70">
            Pick at least one tool above to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {value.map((tool, idx) => (
            <PricingInput
              key={tool.toolId}
              value={tool}
              onChange={(next) => updateAt(idx, next)}
              onRemove={() => removeAt(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
