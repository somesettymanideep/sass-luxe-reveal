import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "What is the best hair treatment?",
    a: "It depends on your hair diagnosis. For frizz and shine we recommend keratin; for damage repair, a bond-building ritual; for limp hair, a scalp and protein programme. Our stylists assess porosity and elasticity before recommending anything.",
  },
  {
    q: "How long does keratin last?",
    a: "Typically 4 to 6 months with sulphate-free aftercare. We include a home-care routine and a complimentary follow-up review after four weeks.",
  },
  {
    q: "Do you provide bridal packages?",
    a: "Yes. Our bridal studio offers trial sessions, mehendi, haldi, wedding and reception looks, plus family and bridesmaid packages with an on-site team.",
  },
  {
    q: "Which brands do you use?",
    a: "Only professional imported lines for colour, treatments and skincare, selected by our technical team and patch-tested before use.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome, but appointments guarantee your preferred stylist and time slot — especially for colour, keratin and bridal services.",
  },
  {
    q: "Do you offer men's grooming?",
    a: "Yes. Precision cuts, beard sculpting, hair colour, detan facials and grooming memberships are available at all three locations.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="offers" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Good To Know"
          title="Frequently Asked Questions"
          subtitle="Everything guests ask us before their first visit."
        />

        <div className="mt-14 divide-y divide-border rounded-3xl border border-border bg-card">
          {FAQS.map((faq, i) => {
            const expanded = open === i;
            return (
              <div key={faq.q} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:text-gold-deep sm:px-8"
                  >
                    <span className="font-[family-name:var(--font-display)] text-lg text-ink">{faq.q}</span>
                    <Plus
                      className={`size-5 shrink-0 text-gold-deep transition-transform duration-500 ${expanded ? "rotate-45" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-7 text-sm leading-relaxed text-muted-foreground sm:px-8">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
