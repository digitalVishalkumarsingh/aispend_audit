import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AmbientBackground from "@/components/effects/AmbientBackground";
import SpendForm from "@/components/forms/SpendForm";

export const metadata: Metadata = {
  title: "Run your audit — StackSave",
  description:
    "Tell us about your AI tools and team. We'll calculate where you're overspending.",
};

const STEPS = [
  { n: "01", label: "Tools" },
  { n: "02", label: "Team & usage" },
  { n: "03", label: "Report" },
];

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex-1 overflow-hidden pt-16 pb-32">
        <AmbientBackground blobs noise grid={false} />

        <Container size="md" className="relative">
          {/* Header */}
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright">
              Audit
            </p>
            <h1 className="mt-4 text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-gradient-fg sm:text-[52px]">
              Let&apos;s see where your{" "}
              <span className="text-gradient-accent">budget is leaking</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              Answer three short questions. We&apos;ll do the math and give you a
              shareable report at the end.
            </p>
          </div>

          {/* Stepper */}
          <ol className="mx-auto mt-10 flex max-w-md items-center justify-between gap-2">
            {STEPS.map((s, i) => (
              <li key={s.n} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-md border font-mono text-[11px] ${i === 0
                    ? "border-accent/40 bg-accent/10 text-accent-bright"
                    : "border-white/10 bg-white/[0.02] text-fg-muted/60"
                    }`}
                >
                  {s.n}
                </span>
                <span
                  className={`text-[12px] ${i === 0 ? "text-fg" : "text-fg-muted/60"
                    }`}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 ? (
                  <span className="ml-1 h-px flex-1 bg-white/10" />
                ) : null}
              </li>
            ))}
          </ol>

          {/* Form card */}
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-elevated/50 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-12 -top-10 h-32 bg-accent/20 blur-3xl"
            />
            <div className="relative">
              <SpendForm />
            </div>
          </div>

          <p className="mt-6 text-center text-[12px] text-fg-muted/60">
            🔒 Your data stays in your browser. We never call your billing
            provider.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
