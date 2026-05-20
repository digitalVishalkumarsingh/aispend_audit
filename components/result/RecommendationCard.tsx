import type { Recommendation } from "@/types/audit";

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type Props = {
  rec: Recommendation;
};

/**
 * One row in the Recommendations list: tool name, action description, and a
 * pill showing the monthly savings.
 */
export default function RecommendationCard({ rec }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/[0.06] bg-bg-elevated/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-white/[0.12]">
      <div className="min-w-0">
        <div className="text-[14px] font-medium text-fg">{rec.toolName}</div>
        <div className="mt-0.5 text-[13px] text-fg-muted">{rec.description}</div>
      </div>
      <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
        −{fmt(rec.monthlySavings)}/mo
      </span>
    </div>
  );
}
