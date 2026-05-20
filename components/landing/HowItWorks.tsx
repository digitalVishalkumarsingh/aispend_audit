import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "List your tools",
    body: "Pick from our database of 50+ AI tools — ChatGPT, Claude, Cursor, Copilot, v0, and more. Add seats and current tier in one click.",
  },
  {
    n: "02",
    title: "Tell us how you work",
    body: "Team size, usage patterns, and a couple of optional context questions. Takes under a minute. No login, no email gate.",
  },
  {
    n: "03",
    title: "Get your savings report",
    body: "Personalized recommendations, AI-written CFO summary, and a shareable public link. Act on it, then run it again next quarter.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      {/* Faint top divider gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <Container size="lg">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Three steps from{" "}
              <span className="text-gradient-accent">receipts to results</span>
            </>
          }
          subtitle="No data leaves your browser. No connectors, no OAuth, no waiting for sales."
        />

        <div className="relative mt-16">
          {/* Connector line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block"
          />

          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg-elevated/40 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-md border border-accent/30 bg-accent/10 font-mono text-[11px] text-accent-bright">
                    {step.n}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <h3 className="mt-5 text-[18px] font-medium tracking-tight text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
