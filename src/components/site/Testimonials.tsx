import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const REVIEWS = [
  {
    name: "Lakshmi Prasanna",
    location: "Vijayawada",
    text: "The colour correction on my hair was flawless. The consultation alone convinced me — they explained every step and the result lasted months.",
  },
  {
    name: "Ravi Teja",
    location: "Guntur",
    text: "Best men's grooming experience in the city. Sharp fade, hot towel finish and a genuinely premium lounge to sit in.",
  },
  {
    name: "Sneha Reddy",
    location: "Rajahmundry",
    text: "They did my bridal makeup and hair. Twelve hours of functions and my look did not move once. Worth every rupee.",
  },
  {
    name: "Aishwarya N.",
    location: "Vijayawada",
    text: "Keratin here is on another level. My hair feels imported-salon good and the hygiene standards are spotless.",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000);
    return () => window.clearInterval(id);
  }, [index]);

  return (
    <section className="surface-noir relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-10 size-72 rounded-full border border-gold/10 float-shape" />
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Guest Stories"
          title="Loved Across Andhra Pradesh"
          subtitle="Verified reviews from guests at our Vijayawada, Guntur and Rajahmundry salons."
          tone="dark"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <article
              key={review.name}
              className={`reveal glass-panel lift-card rounded-3xl p-8 transition-opacity duration-700 ${
                i === index ? "ring-1 ring-gold/40" : ""
              }`}
              style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
            >
              <Quote className="size-7 text-gold/60" aria-hidden />
              <div className="mt-5 flex gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className="size-4 fill-gold text-gold" aria-hidden />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ivory/75">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-7 flex items-center gap-4 border-t border-gold/15 pt-6">
                <span className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-black/40 font-[family-name:var(--font-display)] text-gold">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm text-ivory">{review.name}</span>
                  <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep">
                    {review.location}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
