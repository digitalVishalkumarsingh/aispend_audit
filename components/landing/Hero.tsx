import Link from "next/link";
import AmbientBackground from "@/components/effects/AmbientBackground";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-32 sm:pt-28 sm:pb-40">
      <AmbientBackground />

      <Container size="lg" className="relative">
        {/* Eyebrow pill */}
        <div
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-fg-muted backdrop-blur-md"
          style={{ animation: "var(--animate-fade-up)", animationDelay: "0ms" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span>Free during beta · No signup required</span>
        </div>

        {/* Headline */}
        <h1
          className="mx-auto mt-8 max-w-4xl text-center text-[44px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[64px] lg:text-[80px]"
          style={{ animation: "var(--animate-fade-up)", animationDelay: "80ms" }}
        >
          <span className="text-gradient-fg">Audit your AI spend.</span>
          <br />
          <span className="text-gradient-accent animate-shimmer">
            Cut waste by 40%.
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-relaxed text-fg-muted sm:text-[19px]"
          style={{ animation: "var(--animate-fade-up)", animationDelay: "160ms" }}
        >
          Most teams overpay for ChatGPT, Claude, Cursor, and Copilot — duplicate
          seats, wrong tiers, idle subscriptions. Get a personalized savings
          report in 60 seconds.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animation: "var(--animate-fade-up)", animationDelay: "240ms" }}
        >
          <Link
            href="/audit"
            className="group relative inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-[14px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all duration-200 hover:bg-white/90 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_12px_32px_-8px_rgba(255,255,255,0.5)]"
          >
            Run free audit
            <span
              aria-hidden
              className="text-fg-muted/60 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <Link
            href="#examples"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 text-[14px] text-fg-muted backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] hover:text-fg"
          >
            View sample report
          </Link>
        </div>

        {/* Trust line */}
        <p
          className="mt-8 text-center text-[12px] text-fg-muted/70"
          style={{ animation: "var(--animate-fade-up)", animationDelay: "320ms" }}
        >
          Trusted by teams at YC startups · No data leaves your browser
        </p>

        {/* Product preview frame */}
        <div
          className="relative mx-auto mt-20 max-w-5xl"
          style={{ animation: "var(--animate-fade-up)", animationDelay: "400ms" }}
        >
          {/* Glow behind the frame */}
          <div
            aria-hidden
            className="absolute inset-x-10 -top-10 h-40 bg-accent/30 blur-3xl"
          />
          <div className="relative rounded-xl border border-white/10 bg-bg-elevated/60 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="rounded-lg border border-white/[0.06] bg-bg-deep/80">
              {/* Faux window chrome */}
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-3 font-mono text-[11px] text-fg-muted/60">
                  stacksave.app / audit
                </span>
              </div>
              {/* Faux content rows */}
              <div className="grid gap-3 p-6 sm:grid-cols-3">
                {[
                  { label: "Current spend", value: "$2,840", tone: "text-fg" },
                  { label: "Potential savings", value: "$1,136", tone: "text-gradient-accent" },
                  { label: "Idle seats", value: "12", tone: "text-fg" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-fg-muted/70">
                      {s.label}
                    </div>
                    <div
                      className={`mt-2 text-2xl font-medium tracking-tight ${s.tone}`}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 px-6 pb-6">
                {[
                  ["ChatGPT Team · 14 seats", "$280/mo", "3 idle"],
                  ["Cursor Pro · 8 seats", "$160/mo", "Downgrade 2"],
                  ["GitHub Copilot · 12 seats", "$228/mo", "Consolidate"],
                ].map(([name, cost, hint]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-md border border-white/[0.04] bg-white/[0.01] px-4 py-3"
                  >
                    <span className="text-[13px] text-fg-muted">{name}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[12px] text-fg-muted/80">
                        {cost}
                      </span>
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] text-accent-bright">
                        {hint}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
