import type { ToolEntry } from "@/types/audit";

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type Props = {
  tools: ToolEntry[];
};

/**
 * Renders the list of tools that went into the audit alongside their current
 * cost and (where supplied) active-user counts. Pure presentational.
 */
export default function AuditBreakdown({ tools }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-bg-elevated/40 backdrop-blur-sm">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-fg-muted/70">
            <th className="px-5 py-3 font-normal">Tool</th>
            <th className="px-5 py-3 font-normal">Plan</th>
            <th className="px-5 py-3 text-right font-normal">Seats</th>
            <th className="px-5 py-3 text-right font-normal">Active</th>
            <th className="px-5 py-3 text-right font-normal">$/mo</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t) => (
            <tr
              key={t.toolId}
              className="border-b border-white/[0.04] last:border-b-0"
            >
              <td className="px-5 py-3 font-medium text-fg">{t.name}</td>
              <td className="px-5 py-3 text-fg-muted">{t.tier}</td>
              <td className="px-5 py-3 text-right font-mono text-fg-muted">
                {t.seats}
              </td>
              <td className="px-5 py-3 text-right font-mono text-fg-muted">
                {t.activeUsers != null ? t.activeUsers : "—"}
              </td>
              <td className="px-5 py-3 text-right font-mono text-fg">
                {fmt(t.monthlyCost)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
