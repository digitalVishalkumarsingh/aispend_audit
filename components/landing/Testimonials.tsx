import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const QUOTES = [
  {
    quote:
      "Ran the audit on a Friday, cancelled $1,400/mo of duplicate Cursor and Copilot seats on Monday. Paid for our annual Linear plan.",
    name: "Priya Shah",
    role: "Engineering Lead",
    company: "Stride.dev",
    initial: "P",
  },
  {
    quote:
      "I was the de-facto SaaS admin and had no idea what we were paying for. StackSave gave me a ready-to-send report for our CFO.",
    name: "Marcus Chen",
    role: "Founder",
    company: "Quill",
    initial: "M",
  },
  {
    quote:
      "We were on ChatGPT Enterprise for 30 seats but only 8 people used it daily. Dropped to Team and saved $4k/mo overnight.",
    name: "Sarah Lindgren",
    role: "COO",
    company: "Helio Labs",
    initial: "S",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <Container size="lg">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by <span className="text-gradient-accent">AI-forward teams</span>
            </>
          }
          subtitle="Founders, operators, and engineering leads using StackSave to reclaim their AI budget."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-bg-elevated/40 p-6 backdrop-blur-sm"
            >
              <svg
                aria-hidden
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent/40"
              >
                <path
                  d="M9.5 5C5.91 6.31 4 9.07 4 13v6h6v-6H7c0-2.21 1.79-4 4-4l-1.5-4zm10 0c-3.59 1.31-5.5 4.07-5.5 8v6h6v-6h-3c0-2.21 1.79-4 4-4l-1.5-4z"
                  fill="currentColor"
                />
              </svg>

              <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-fg">
                &ldquo;{q.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-[#818cf8] text-[13px] font-semibold text-white shadow-[0_0_18px_-4px_rgba(94,106,210,0.7)]">
                  {q.initial}
                </span>
                <div>
                  <div className="text-[13px] font-medium text-fg">{q.name}</div>
                  <div className="text-[12px] text-fg-muted">
                    {q.role} · {q.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
