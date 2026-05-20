import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
  size?: "default" | "wide";
};

const I = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "60-second audit",
    body: "Drop in your tool list and team size. We compute waste, overlap, and savings instantly — no SaaS connectors needed.",
    icon: <I d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
    size: "wide",
  },
  {
    title: "Tier recommendations",
    body: "Should you be on Team vs Enterprise? We compare your usage to break-even points.",
    icon: <I d="M3 3v18h18M7 14l4-4 4 4 6-6" />,
  },
  {
    title: "Overlap detection",
    body: "Find tools that cover the same job and pick the winner based on your workflow.",
    icon: <I d="M8 3h8a5 5 0 0 1 0 10h-3M16 21H8a5 5 0 0 1 0-10h3" />,
  },
  {
    title: "Idle seat alerts",
    body: "Surface seats with zero activity in the last 30 days. Reclaim or cancel.",
    icon: <I d="M6 2v6a6 6 0 0 0 12 0V2M4 22h16M9 22v-4M15 22v-4" />,
  },
  {
    title: "AI-written summary",
    body: "GPT-class summary written for your CFO. Copy, send, done.",
    icon: <I d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />,
  },
  {
    title: "Shareable report",
    body: "Public link with OG image — share with your team or post the savings.",
    icon: <I d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
    size: "wide",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <Container size="lg">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything you need to{" "}
              <span className="text-gradient-accent">cut waste</span>
            </>
          }
          subtitle="Audit, optimize, and report — all in one place. No connectors, no contracts, no sales calls."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className={`group relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg-elevated/40 p-6 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-bg-elevated/60 ${f.size === "wide" ? "lg:col-span-2" : ""
                }`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-colors group-hover:bg-accent/15"
              />
              <div className="relative">
                <div className="inline-grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-accent-bright">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-[16px] font-medium tracking-tight text-fg">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
