import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, ensureGsap } from "@/lib/motion";
import { LuxeButton } from "./LuxeButton";
import fashionColours from "@/assets/hero-colours.jpg.asset.json";
import bridalBanner from "@/assets/hero-bride.jpg.asset.json";
import mensBanner from "@/assets/hero-mens.jpg.asset.json";

const slides = [
  {
    image: fashionColours.url,
    alt: "Model with bold fashion colour balayage styled at SASS Hair & Beauty",
    eyebrow: "Fashion Colours",
    line1: "Bold shades.",
    line2: "Beautiful you.",
    copy: "Global colour, balayage and creative highlights crafted with premium ammonia-free formulas for long lasting, luminous results.",
    tags: ["Trendy Colours", "Expert Technique", "Premium Care", "Long Lasting"],
    href: "/services",
    cta: "Explore Colour Services",
  },
  {
    image: bridalBanner.url,
    alt: "Bride in traditional gold jewellery styled by the SASS bridal team",
    eyebrow: "Bridal Excellence",
    line1: "Your wedding day,",
    line2: "flawlessly styled.",
    copy: "Complete bridal packages — HD airbrush makeup, hair styling, draping and pre-bridal skin care by our senior artists.",
    tags: ["HD Makeup", "Hair Styling", "Pre-Bridal Care", "Draping"],
    href: "/#bridal",
    cta: "Book Bridal Consultation",
  },
  {
    image: mensBanner.url,
    alt: "Man receiving a precision beard detailing service at SASS Hair & Beauty",
    eyebrow: "Master Barbers",
    line1: "Sharp looks.",
    line2: "Confident you.",
    copy: "Skin fades, textured crops, beard sculpting and luxury grooming rituals delivered by internationally trained barbers.",
    tags: ["Skin Fades", "Beard Detailing", "Hair Spa", "Grooming"],
    href: "/services",
    cta: "Explore Men's Services",
  },
];

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.hero-slide-${active} .hero-img`,
        { scale: 1.12 },
        { scale: 1, duration: 7, ease: "power2.out" },
      );
      gsap.fromTo(
        `.hero-slide-${active} .hero-anim`,
        { autoAlpha: 0, y: 34, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {slides.map((s, i) => (
        <div
          key={s.eyebrow}
          className={`hero-slide-${i} absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt={s.alt}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            className="hero-img absolute inset-0 size-full object-cover object-[72%_center] will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20 lg:via-black/60 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 lg:hidden" />
        </div>
      ))}

      <span
        className="floaty pointer-events-none absolute left-[30%] bottom-[18%] size-2.5 rotate-45 bg-gold/70"
        style={{ animationDelay: "1.2s" }}
      />


      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-36 lg:px-10">
        {slides.map((s, i) => (
          <div
            key={s.eyebrow}
            className={`hero-slide-${i} max-w-2xl ${i === active ? "block" : "hidden"}`}
          >
            <p className="hero-anim eyebrow mb-6 text-gold">{s.eyebrow}</p>
            <h1 className="hero-anim text-[clamp(2.6rem,6.6vw,5.4rem)] leading-[0.98] text-cream">
              <span className="block">{s.line1}</span>
              <span className="block italic text-gold-gradient">{s.line2}</span>
            </h1>
            <p className="hero-anim mt-7 max-w-lg text-base leading-relaxed text-cream/70 md:text-lg">
              {s.copy}
            </p>
            <ul className="hero-anim mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">
              {s.tags.map((t) => (
                <li
                  key={t}
                  className="border-l border-gold/50 pl-4 first:border-l-0 first:pl-0"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LuxeButton as="a" href="/contact" className="hero-anim">
                Book Your Appointment
              </LuxeButton>
              <LuxeButton
                as="a"
                href={s.href}
                variant="outline"
                className="hero-anim text-cream"
              >
                {s.cta}
              </LuxeButton>
            </div>
          </div>
        ))}

        <div className="mt-14 flex items-center gap-4">
          {slides.map((s, i) => (
            <button
              key={s.eyebrow}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${s.eyebrow} slide`}
              aria-current={i === active}
              className={`h-[2px] transition-all duration-700 ${
                i === active ? "w-16 bg-gold" : "w-8 bg-cream/30 hover:bg-cream/60"
              }`}
            />
          ))}
        </div>
      </div>

      <a
        href="#why"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-gold md:block"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </a>
    </section>
  );
}
