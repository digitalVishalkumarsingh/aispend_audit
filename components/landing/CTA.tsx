import Link from "next/link";
import Container from "@/components/ui/Container";
import GradientBlob from "@/components/effects/GradientBlob";
import GridOverlay from "@/components/effects/GridOverlay";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container size="lg">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-elevated/40 px-6 py-20 backdrop-blur-sm sm:px-12 sm:py-24">
          {/* Ambient layers contained to the card */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <GradientBlob
              className="-top-32 left-1/4"
              color="radial-gradient(circle at center, #5e6ad2 0%, transparent 65%)"
              size="h-[28rem] w-[28rem]"
              opacity={30}
              animate="float-slow"
            />
            <GradientBlob
              className="bottom-[-12rem] right-[-4rem]"
              color="radial-gradient(circle at center, #818cf8 0%, transparent 70%)"
              size="h-[24rem] w-[24rem]"
              opacity={22}
              animate="float"
            />
            <GridOverlay />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-fg-muted backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Free during beta
            </div>

            <h2 className="mt-6 text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-gradient-fg sm:text-[56px]">
              Find out what you&apos;re wasting.
              <br />
              <span className="text-gradient-accent">In 60 seconds.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-fg-muted sm:text-[17px]">
              No signup, no credit card, no calls. Just answers — and a report you
              can share with your team or your CFO.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/audit"
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-[14px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all duration-200 hover:bg-white/90"
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
                href="/pricing"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 text-[14px] text-fg-muted backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] hover:text-fg"
              >
                See pricing
              </Link>
            </div>

            <p className="mt-6 font-mono text-[11px] text-fg-muted/60">
              ⌘ + K to start anywhere
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
