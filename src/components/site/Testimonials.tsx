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
  {
    name: "Karthik Reddy",
    location: "Vijayawada",
    text: "Walked in for a haircut, walked out feeling like a new person. Attention to detail and service was top-tier.",
  },
  {
    name: "Divya Sri",
    location: "Guntur",
    text: "My facial glow lasted for weeks. The ambience, the products, the care — everything felt five-star.",
  },
];

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [perView, setPerView] = useState(1);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  // Responsive: how many cards per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = REVIEWS.length;
  const maxIndex = Math.max(0, count - perView);

  const go = useCallback(
    (dir: number) => setIndex((i) => Math.min(Math.max(i + dir, 0), maxIndex)),
    [maxIndex],
  );

  const goTo = useCallback(
    (i: number) => setIndex(Math.min(Math.max(i, 0), maxIndex)),
    [maxIndex],
  );

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
          setIndex((i) => (i >= maxIndex ? 0 : i + 1));
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
  }, [paused, maxIndex]);

  // Reset progress when index changes manually
  useEffect(() => {
    setProgress(0);
    lastTickRef.current = null;
  }, [index]);

  // Clamp index when perView changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

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
              style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
            >
              {REVIEWS.map((review) => (
                <div
                  key={review.name}
                  className="shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <article className="glass-panel lift-card reveal flex h-full flex-col rounded-3xl p-7 sm:p-9 text-center">
                    <Quote className="mx-auto size-8 text-gold/60" aria-hidden />
                    <div className="mt-5 flex justify-center gap-1" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className="size-4 fill-gold text-gold" aria-hidden />
                      ))}
                    </div>
                    <p className="mt-5 flex-1 text-base leading-relaxed text-ivory/80 sm:text-lg">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-7 flex items-center justify-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-black/40 font-[family-name:var(--font-display)] text-base text-gold">
                        {review.name.charAt(0)}
                      </span>
                      <div className="text-left">
                        <span className="block text-sm text-ivory">{review.name}</span>
                        <span className="block text-[0.62rem] uppercase tracking-[0.22em] text-gold-deep">
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
              disabled={index === 0}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Dots with autoplay progress */}
            <div className="flex items-center gap-3">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
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
              disabled={index >= maxIndex}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
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
