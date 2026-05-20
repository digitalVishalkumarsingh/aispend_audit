import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const EXAMPLES = [
  {
    team: "Series A startup · 14 people",
    before: "$3,420",
    after: "$1,890",
    savings: "$1,530",
    pct: "45%",
    items: [
      { name: "ChatGPT Team", note: "Downgrade to Plus for 6 light users", saves: "$72" },
      { name: "Cursor Pro", note: "Cancel 3 inactive seats", saves: "$60" },
      { name: "Claude Pro", note: "Consolidate to Team plan", saves: "$48" },
    ],
  },
  {
    team: "Seed-stage · 6 people",
    before: "$1,180",
    after: "$640",
    savings: "$540",
    pct: "46%",
    items: [
      { name: "GitHub Copilot Business", note: "Move to Individual ×4", saves: "$48" },
      { name: "Perplexity Pro", note: "Drop, overlaps with ChatGPT", saves: "$20" },
      { name: "v0 Premium", note: "Right-size to Hobby", saves: "$30" },
    ],
  },
];

export default function SavingsPreview() {
  return (
    <section id="examples" className="relative py-24 sm:py-32">
      <Container size="lg">
        <SectionHeading
          eyebrow="Examples"
          title={
            <>
              Real savings from{" "}
              <span className="text-gradient-accent">real teams</span>
            </>
          }
          subtitle="Anonymized snapshots from audits run during our beta. Your mileage will vary — but probably not by much."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <article
              key={ex.team}
              className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg-elevated/40 p-6 backdrop-blur-sm sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
              />
              <div className="relative">
                <p className="text-[12px] uppercase tracking-wider text-fg-muted/70">
                  {ex.team}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4 border-b border-white/[0.06] pb-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-fg-muted/70">
                      Before
                    </div>
                    <div className="mt-2 text-2xl font-medium tracking-tight text-fg-muted line-through decoration-fg-muted/40">
                      {ex.before}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-fg-muted/70">
                      After
                    </div>
                    <div className="mt-2 text-2xl font-medium tracking-tight text-fg">
                      {ex.after}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-fg-muted/70">
                      Saved
                    </div>
                    <div className="mt-2 text-2xl font-medium tracking-tight text-gradient-accent">
                      {ex.savings}
                    </div>
                    <div className="text-[11px] text-accent-bright">
                      {ex.pct} cut
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-2">
                  {ex.items.map((it) => (
                    <li
                      key={it.name}
                      className="flex items-start justify-between gap-4 rounded-md border border-white/[0.04] bg-white/[0.01] px-4 py-3"
                    >
                      <div>
                        <div className="text-[13px] font-medium text-fg">{it.name}</div>
                        <div className="text-[12px] text-fg-muted">{it.note}</div>
                      </div>
                      <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                        −{it.saves}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
