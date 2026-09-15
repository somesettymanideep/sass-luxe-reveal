import { useEffect, useRef } from "react";
import { Award, Quote } from "lucide-react";
import { ensureGsap, gsap } from "@/lib/motion";
import founder from "@/assets/founder-custom.jpg?url";

const credentials = ["Pioneer of luxury salon experiences across Andhra Pradesh"];

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
            ref={(el) => {
              if (el) bioItemsRef.current[0] = el;
            }}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="section-eyebrow text-gold">Founder's Message</p>
          </div>

          <div
            ref={(el) => {
              if (el) bioItemsRef.current[1] = el;
            }}
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
            ref={(el) => {
              if (el) bioItemsRef.current[2] = el;
            }}
            className="mt-8 flex gap-4"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <Quote className="mt-1 size-8 shrink-0 text-gold" />
            <p className="font-display text-xl italic leading-relaxed text-cream/85 md:text-2xl">
              "Our dream has always been to bring global runway standards and luxury hair couture to
              Andhra Pradesh. SASS was born from the conviction that our guests deserve world-class
              artistry without compromise."
            </p>
          </div>

          <div
            ref={(el) => {
              if (el) bioItemsRef.current[3] = el;
            }}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="mt-7 text-sm leading-relaxed text-cream/60">
              From our bespoke styling stations to our state-of-the-art bridal lounges across
              Vijayawada, Guntur, and Rajahmundry, our passionate team of artists works tirelessly
              to turn every visit into an unforgettable transformation. We don't just follow
              trends—we set standards and honor your trust with excellence every single day.
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
        </div>
      </div>
    </section>
  );
}
