import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AmbientBackground from "@/components/effects/AmbientBackground";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing — StackSave",
  description:
    "Free during beta. Simple per-team pricing when we launch. No seat charges, no surprises.",
};

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Run as many audits as you want. Public shareable reports.",
    features: [
      "Unlimited audits",
      "AI-written summary",
      "Public report link",
      "Up to 5 tools per audit",
    ],
    cta: "Run free audit",
    href: "/audit",
    featured: false,
  },
  {
    name: "Team",
    price: "$29",
    period: "/ month",
    description: "For startups tracking spend over time.",
    features: [
      "Everything in Free",
      "Unlimited tools per audit",
      "Private reports & history",
      "Quarterly drift alerts",
      "PDF + CSV export",
      "Slack & email digests",
    ],
    cta: "Coming soon",
    href: "#",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "For finance teams managing 20+ tools across departments.",
    features: [
      "Everything in Team",
      "SSO + audit log",
      "Multi-team workspaces",
      "Vendor benchmark database",
      "Dedicated success manager",
    ],
    cta: "Talk to us",
    href: "mailto:hello@stacksave.app",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex-1 overflow-hidden pt-16 pb-32">
        <AmbientBackground />

        <Container size="lg" className="relative">
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Free during beta.{" "}
                <span className="text-gradient-accent">Simple after.</span>
              </>
            }
            subtitle="No per-seat charges. No connectors to set up. Pick the tier when our paid plans launch — until then, everything is free."
          />

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {TIERS.map((t) => (
              <article
                key={t.name}
                className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm sm:p-8 ${
                  t.featured
                    ? "border-accent/30 bg-bg-elevated/60 shadow-[0_0_0_1px_rgba(94,106,210,0.2),0_30px_80px_-20px_rgba(94,106,210,0.4)]"
                    : "border-white/[0.08] bg-bg-elevated/40"
                }`}
              >
                {t.featured ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
                    />
                    <div className="absolute right-6 top-6 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-accent-bright">
                      Most popular
                    </div>
                  </>
                ) : null}
                <div className="relative">
                  <h3 className="text-[18px] font-medium tracking-tight text-fg">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-fg-muted">
                    {t.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-[40px] font-medium leading-none tracking-tight text-gradient-fg">
                      {t.price}
                    </span>
                    <span className="text-[13px] text-fg-muted">{t.period}</span>
                  </div>
                  <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-fg-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-accent-bright" aria-hidden>
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={t.href}
                    className={`mt-8 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md text-[13px] font-medium transition-all ${
                      t.featured
                        ? "bg-white text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] hover:bg-white/90"
                        : "border border-white/10 bg-white/[0.02] text-fg-muted hover:border-white/20 hover:text-fg"
                    }`}
                  >
                    {t.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center text-[13px] text-fg-muted">
            Have a question?{" "}
            <a href="mailto:hello@stacksave.app" className="text-fg underline decoration-white/20 underline-offset-4 hover:decoration-white/40">
              hello@stacksave.app
            </a>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
