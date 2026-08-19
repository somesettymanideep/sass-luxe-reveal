import { useEffect, useRef } from "react";
import { Quote, Instagram, Award } from "lucide-react";
import { gsap, ensureGsap } from "@/lib/motion";
import founderAsset from "@/assets/founder-chunchu-suresh.png.asset.json";
import { LuxeButton } from "../LuxeButton";

const founder = founderAsset.url;

const credentials = [
  "L'Oréal Professionnel certified educator",
  "15 years in couture colour & bridal artistry",
  "Trained in London & Mumbai academies",
];

export function Founder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLDivElement | null>(null);
  const bioItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const bio = bioRef.current;
    if (!section || !portrait || !bio) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      // Portrait reveal: slide from left, blur-to-sharp, subtle scale
      gsap.fromTo(
        portrait,
        {
          autoAlpha: 0,
          x: -80,
          scale: 0.92,
          filter: "blur(16px) brightness(0.7)",
        },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      // Subtle portrait image parallax inside its frame
      const portraitImg = portrait.querySelector("img");
      if (portraitImg) {
        gsap.fromTo(
          portraitImg,
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Decorative gold border draws in
      const border = portrait.querySelector(".founder-border");
      if (border) {
        gsap.fromTo(
          border,
          { autoAlpha: 0, scale: 0.96 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      // Bio items: staggered blur-to-sharp from right
      const bioItems = bioItemsRef.current;
      if (bioItems.length) {
        gsap.fromTo(
          bioItems,
          {
            autoAlpha: 0,
            x: 60,
            filter: "blur(12px)",
          },
          {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-28 text-cream md:py-36"
    >
      <span className="floaty pointer-events-none absolute left-[6%] top-[16%] size-28 rounded-full border border-gold/15" />
      <span
        className="floaty pointer-events-none absolute right-[10%] bottom-[14%] size-1.5 rounded-full bg-gold"
        style={{ animationDelay: "2s" }}
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div
          ref={portraitRef}
          className="relative will-change-transform"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="founder-border pointer-events-none absolute -inset-3 rounded-[2.2rem] border border-gold/25" />
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={founder}
              alt="Chunchu Suresh, founder of SASS Hair & Beauty"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </div>

        <div ref={bioRef} className="will-change-transform">
          <div
            ref={(el) => { if (el) bioItemsRef.current[0] = el; }}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="section-eyebrow text-gold">Meet the Founder</p>
          </div>

          <div
            ref={(el) => { if (el) bioItemsRef.current[1] = el; }}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] text-cream">
              Chunchu Suresh
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.26em] text-gold">
              Founder &amp; Creative Director
            </p>
          </div>

          <div
            ref={(el) => { if (el) bioItemsRef.current[2] = el; }}
            className="mt-8 flex gap-4"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <Quote className="mt-1 size-8 shrink-0 text-gold" />
            <p className="font-display text-xl italic leading-relaxed text-cream/85 md:text-2xl">
              "Luxury isn't marble and gold. It's the ten extra minutes we spend
              understanding your hair before we ever pick up the scissors."
            </p>
          </div>

          <div
            ref={(el) => { if (el) bioItemsRef.current[3] = el; }}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="mt-7 text-sm leading-relaxed text-cream/60">
              Suresh trained as a master colourist before opening the first SASS studio at 27. He
              still takes bridal consultations personally, mentors every new stylist through a
              six-month apprenticeship, and signs off on each product that enters the salon.
            </p>

            <ul className="mt-8 space-y-3">
              {credentials.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-cream/70">
                  <Award className="size-4 shrink-0 text-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={(el) => { if (el) bioItemsRef.current[4] = el; }}
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <LuxeButton as="a" href="/contact" className="px-10">
              Book with the Studio
            </LuxeButton>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="grid size-11 place-items-center rounded-full border border-gold/35 text-gold transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
