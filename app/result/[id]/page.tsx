import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AmbientBackground from "@/components/effects/AmbientBackground";
import SavingsSummary from "@/components/result/SavingsSummary";
import AuditCard from "@/components/result/AuditCard";
import RecommendationCard from "@/components/result/RecommendationCard";
import AuditBreakdown from "@/components/result/AuditBreakdown";
import ShareActions from "@/components/result/ShareActions";
import EmailCaptureForm from "@/components/forms/EmailCaptureForm";
import { getAudit } from "@/services/database/audit-service";
import { buildShareLink } from "@/features/share/generate-share-link";
import {
  buildShareDescription,
  buildShareTitle,
} from "@/features/share/metadata";

type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) {
    return { title: "Audit not found — StackSave" };
  }
  const title = buildShareTitle(audit);
  const description = buildShareDescription(audit);
  return {
    title,
    description,
    openGraph: { title, description, url: buildShareLink(audit.id) },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ResultPage({ params }: RouteProps) {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) notFound();

  const shareUrl = buildShareLink(audit.id);

  return (
    <>
      <Navbar />
      <main className="relative isolate flex-1 overflow-hidden pt-16 pb-32">
        <AmbientBackground noise grid={false} />

        <Container size="lg" className="relative">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright">
                Audit report
              </p>
              <h1 className="mt-3 text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-gradient-fg sm:text-[48px]">
                Your AI spend report
              </h1>
              <p className="mt-2 font-mono text-[12px] text-fg-muted/70">
                ref: {audit.id}
              </p>
            </div>
            <ShareActions shareUrl={shareUrl} />
          </div>

          {/* Headline stats */}
          <div className="mt-10">
            <SavingsSummary audit={audit} />
          </div>

          {/* AI Summary card */}
          <div className="mt-10">
            <AuditCard auditId={audit.id} initialSummary={audit.summary} />
          </div>

          {/* Recommendations */}
          {audit.recommendations.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-[20px] font-medium tracking-tight text-fg">
                Recommendations
              </h2>
              <p className="mt-1 text-[13px] text-fg-muted">
                Apply these to capture the savings above.
              </p>
              <div className="mt-4 space-y-2">
                {audit.recommendations.map((rec) => (
                  <RecommendationCard key={`${rec.toolId}-${rec.action}`} rec={rec} />
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-10 rounded-2xl border border-white/[0.06] bg-bg-elevated/40 p-6 text-center backdrop-blur-sm">
              <p className="text-[14px] text-fg">
                No obvious waste detected — your stack is already lean.
              </p>
              <p className="mt-1 text-[13px] text-fg-muted">
                Re-run the audit whenever your team or tools change.
              </p>
            </section>
          )}

          {/* Breakdown */}
          <section className="mt-10">
            <h2 className="text-[20px] font-medium tracking-tight text-fg">
              What we looked at
            </h2>
            <p className="mt-1 text-[13px] text-fg-muted">
              The inputs that produced this report.
            </p>
            <div className="mt-4">
              <AuditBreakdown tools={audit.input.tools} />
            </div>
          </section>

          {/* Lead capture */}
          <section className="mt-10 max-w-xl">
            <EmailCaptureForm auditId={audit.id} source="audit-result" />
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
