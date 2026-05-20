import type { AuditResult } from "@/types/audit";

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type Props = {
  audit: AuditResult;
};

/**
 * Three headline stat cards at the top of the report: current spend,
 * recommended spend, savings. The savings card carries the accent glow.
 */
export default function SavingsSummary({ audit }: Props) {
  const cards = [
    {
      label: "Current spend",
      value: fmt(audit.currentMonthlySpend),
      sub: "/ month",
      accent: false,
      glow: false,
    },
    {
      label: "Recommended",
      value: fmt(audit.recommendedMonthlySpend),
      sub: "/ month",
      accent: true,
      glow: false,
    },
    {
      label: "You save",
      value: fmt(audit.monthlySavings),
      sub:
        audit.savingsPercent > 0
          ? `${audit.savingsPercent}% cut · ${fmt(audit.annualSavings)}/yr`
          : "Spend already lean",
      accent: false,
      glow: audit.monthlySavings > 0,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((s) => (
        <div
          key={s.label}
          className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-bg-elevated/50 p-6 backdrop-blur-sm"
        >
          {s.glow ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
            />
          ) : null}
          <div className="relative">
            <div className="text-[11px] uppercase tracking-wider text-fg-muted/70">
              {s.label}
            </div>
            <div
              className={`mt-3 text-[36px] font-medium leading-none tracking-tight ${s.accent ? "text-gradient-accent" : "text-gradient-fg"
                }`}
            >
              {s.value}
            </div>
            <div className="mt-2 text-[12px] text-fg-muted">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
