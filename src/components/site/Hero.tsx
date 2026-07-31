import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { LuxeButton } from "./LuxeButton";
import heroStyling from "@/assets/hero-styling.jpg";
import heroColour from "@/assets/hero-colour.jpg";
import heroBridal from "@/assets/hero-bridal.jpg";

const SLIDES = [
  { src: heroStyling, label: "Luxury Hair Styling", alt: "Stylist creating a luxury blow-dry in the SASS salon" },
  { src: heroColour, label: "Hair Colour Transformation", alt: "Client with a glossy caramel balayage hair colour" },
  { src: heroBridal, label: "Bridal Makeup", alt: "Indian bride with gold jewellery and premium bridal makeup" },
];

const BADGES = [
  "Certified Hair Experts",
  "Premium Imported Products",
  "10,000+ Happy Clients",
  "Luxury Salon Experience",
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [index]);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 4),
        duration: `${7 + (i % 6) * 1.6}s`,
        delay: `${(i % 9) * 0.8}s`,
      })),
    [],
  );

  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="home" className="surface-noir relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* decorative gold shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="float-shape absolute -left-24 top-24 size-72 rounded-full border border-gold/15"
          style={{ transform: `translateY(${offset * 0.12}px)` }}
        />
        <div className="float-shape absolute right-1/3 top-10 size-24 rounded-full bg-[image:var(--gradient-gold)] opacity-[0.07] blur-2xl" />
        <div className="float-shape absolute bottom-10 left-1/4 size-40 rounded-full border border-gold/10" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle absolute rounded-full bg-gold/70"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-16">
        <div className="reveal-left">
          <p className="eyebrow text-gold-deep">Vijayawada · Guntur · Rajahmundry</p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.05] text-ivory sm:text-6xl">
            Luxury Hair.
            <span className="mt-2 block text-gilded">Beautiful Transformations.</span>
            <span className="mt-2 block font-[family-name:var(--font-serif-alt)] italic font-light text-ivory/90">
              Timeless Confidence.
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-sm leading-relaxed text-ivory/65 sm:text-base">
            Experience Andhra Pradesh&rsquo;s premium destination for hair, beauty, skincare, bridal
            makeup, and men&rsquo;s grooming with internationally trained stylists.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <LuxeButton onClick={() => (window.location.hash = "#contact")}>Book Appointment</LuxeButton>
            <LuxeButton variant="outline" onClick={() => (window.location.hash = "#services")}>
              View Services
            </LuxeButton>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {BADGES.map((badge, i) => (
              <li
                key={badge}
                className="reveal glass-panel flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <Check className="size-4 shrink-0 text-gold" aria-hidden />
                <span className="text-xs tracking-wide text-ivory/80">{badge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-right relative animate-zoom-out-section">
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe ring-1 ring-gold/20">
            <div className="relative aspect-4/5 sm:aspect-3/2 lg:aspect-4/5">
                {SLIDES.map((slide, i) => (
                  <img
                    key={slide.label}
                    src={slide.src}
                    alt={slide.alt}
                    width={1200}
                    height={1400}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
                      i === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="eyebrow text-gold">Signature</p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-ivory sm:text-2xl">
                    {SLIDES[index]?.label}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous slide"
                    className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-black"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next slide"
                    className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-black"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${slide.label}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-[image:var(--gradient-gold)]" : "w-4 bg-ivory/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
