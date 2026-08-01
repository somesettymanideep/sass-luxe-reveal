import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const count = REVIEWS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Autoplay with progress tracking; pauses on hover
  useEffect(() => {
    if (paused) {
      lastTickRef.current = null;
      return;
    }

    const tick = (ts: number) => {
      if (lastTickRef.current == null) lastTickRef.current = ts;
      const elapsed = ts - lastTickRef.current;
      lastTickRef.current = ts;
      setProgress((p) => {
        const next = p + elapsed / AUTOPLAY_MS;
        if (next >= 1) {
          setIndex((i) => (i + 1) % count);
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTickRef.current = null;
    };
  }, [paused, index, count]);

  // Reset progress when index changes manually
  useEffect(() => {
    setProgress(0);
    lastTickRef.current = null;
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

        <div
          className="relative mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {REVIEWS.map((review) => (
                <div key={review.name} className="w-full shrink-0 px-1">
                  <article className="glass-panel lift-card reveal mx-auto max-w-3xl rounded-3xl p-8 sm:p-12 text-center">
                    <Quote className="mx-auto size-10 text-gold/60" aria-hidden />
                    <div className="mt-6 flex justify-center gap-1" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className="size-5 fill-gold text-gold" aria-hidden />
                      ))}
                    </div>
                    <p className="mt-7 text-lg leading-relaxed text-ivory/80 sm:text-xl">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-9 flex items-center justify-center gap-4">
                      <span className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-black/40 font-[family-name:var(--font-display)] text-lg text-gold">
                        {review.name.charAt(0)}
                      </span>
                      <div className="text-left">
                        <span className="block text-base text-ivory">{review.name}</span>
                        <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep">
                          {review.location}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-black"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Dots with autoplay progress */}
            <div className="flex items-center gap-3">
              {REVIEWS.map((review, i) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show review from ${review.name}`}
                  aria-current={i === index}
                  className="relative h-1.5 overflow-hidden rounded-full bg-ivory/25 transition-all duration-500"
                  style={{ width: i === index ? "2.5rem" : "1.5rem" }}
                >
                  {i === index && (
                    <span
                      className="absolute inset-0 origin-left bg-[image:var(--gradient-gold)]"
                      style={{ transform: `scaleX(${progress})` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-black"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <p className="mt-5 text-center text-[0.68rem] uppercase tracking-[0.22em] text-ivory/40">
            {paused ? "Paused — hover away to resume" : "Auto-playing"}
          </p>
        </div>
      </div>
    </section>
  );
}
