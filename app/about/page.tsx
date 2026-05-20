import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AmbientBackground from "@/components/effects/AmbientBackground";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About — StackSave",
  description:
    "Why we built StackSave: AI spend is the next SaaS sprawl. We're making it auditable.",
};

const VALUES = [
  {
    title: "No connectors",
    body: "We don't want your billing OAuth. The audit runs in your browser; nothing leaves until you choose to share a report.",
  },
  {
    title: "Calibrated against real pricing",
    body: "Our pricing database is updated weekly. Recommendations are tied to break-even points, not vibes.",
  },
  {
    title: "Free for the people we help",
    body: "If you're a startup, the audit is free forever. Paid tiers exist for teams that want history and alerts.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex-1 overflow-hidden pt-16 pb-32">
        <AmbientBackground />

        <Container size="md" className="relative">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                We&apos;re making AI spend{" "}
                <span className="text-gradient-accent">auditable</span>
              </>
            }
            subtitle="SaaS sprawl ate the 2010s. AI tools are doing the same thing — faster, with shorter contracts, and almost no visibility. StackSave is the answer."
          />
        </Container>

        <Container size="md" className="relative mt-20">
          <article className="space-y-6 text-[15px] leading-relaxed text-fg-muted sm:text-[17px]">
            <p>
              In 2024 we ran a casual audit of a friend&apos;s 12-person startup.
              They were paying for <span className="text-fg">ChatGPT Team, Claude Pro, Cursor Pro, GitHub Copilot, Perplexity Pro, and v0</span>{" "}
              — eight subscriptions, twenty-two seats, and no one tracking who used what.
            </p>
            <p>
              Half the seats hadn&apos;t logged in for thirty days. Three tools
              overlapped completely. They were on the wrong tier for two of the
              big ones.{" "}
              <span className="text-gradient-accent">Total waste: $1,840/month.</span>
            </p>
            <p>
              That conversation became this product. StackSave isn&apos;t another
              dashboard you have to log into every day — it&apos;s a calculator
              you run quarterly, the way you&apos;d run a tax review. Three
              minutes in, you have a report you can actually act on.
            </p>
          </article>

          {/* Values grid */}
          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-white/[0.06] bg-bg-elevated/40 p-6 backdrop-blur-sm"
              >
                <h3 className="text-[15px] font-medium tracking-tight text-fg">
                  {v.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-20 flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-bg-elevated/40 p-8 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-[18px] font-medium tracking-tight text-fg">
                Ready to see your numbers?
              </h3>
              <p className="mt-1 text-[13px] text-fg-muted">
                Sixty seconds. No signup. Just receipts.
              </p>
            </div>
            <Link
              href="/audit"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md bg-white px-4 text-[13px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90"
            >
              Run audit
              <span aria-hidden className="text-fg-muted/60">→</span>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
