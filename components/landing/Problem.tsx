import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const PROBLEMS = [
  {
    stat: "73%",
    label: "of seats sit idle",
    body: "Teams buy seats for everyone, but only a fraction use them weekly. You're paying full price for empty chairs.",
  },
  {
    stat: "4.2",
    label: "duplicate tools per team",
    body: "Engineering uses Cursor. PMs use ChatGPT Team. Design uses Claude Pro. Most overlap by 80%.",
  },
  {
    stat: "$2.1k",
    label: "wasted per month",
    body: "The average 10-person startup spends this on AI tools no one actively uses. Compounded across the year, that's a hire.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <Container size="lg">
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              You&apos;re paying for AI tools{" "}
              <span className="text-gradient-accent">no one uses</span>
            </>
          }
          subtitle="The average team buys ChatGPT, Claude, Cursor, and Copilot — then forgets who has what. Receipts pile up. Nobody owns the audit."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div
              key={p.label}
              className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg-elevated/40 p-6 backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:bg-bg-elevated/60"
            >
              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-accent/0 blur-3xl transition-colors group-hover:bg-accent/20"
              />
              <div className="relative">
                <div className="text-[44px] font-medium leading-none tracking-tight text-gradient-fg">
                  {p.stat}
                </div>
                <div className="mt-2 text-[13px] font-medium text-accent-bright">
                  {p.label}
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
