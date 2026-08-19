import { useEffect, useRef } from "react";
import bridalImg from "@/assets/bridal.jpg";
import { gsap, ensureGsap } from "@/lib/motion";
import { LuxeButton } from "./LuxeButton";

export function Bridal() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bridal-img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.fromTo(
        ".bridal-fade",
        { autoAlpha: 0, y: 40, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="bridal" ref={root} className="relative overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <img
          src={bridalImg}
          alt="Bride styled by SASS Hair & Beauty"
          loading="lazy"
          width={1200}
          height={1504}
          className="bridal-img size-full scale-110 object-cover object-[70%_30%] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/30" />
      </div>

      <span className="floaty pointer-events-none absolute left-[6%] top-[18%] size-2 rounded-full bg-gold" />
      <span
        className="floaty pointer-events-none absolute left-[20%] bottom-[22%] size-1.5 rounded-full bg-gold/80"
        style={{ animationDelay: "1.2s" }}
      />
      <span
        className="floaty pointer-events-none absolute right-[30%] top-[30%] size-32 rounded-full border border-gold/20"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-32 lg:px-10 md:py-44">
        <div className="max-w-xl">
          <p className="bridal-fade section-eyebrow text-gold">Bridal Beauty</p>
          <h2 className="bridal-fade mt-6 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] text-cream">
            Your wedding day, <span className="italic text-gold-gradient">flawlessly composed</span>
          </h2>
          <p className="bridal-fade mt-6 text-cream/70">
            A dedicated bridal suite, trial sessions, HD &amp; airbrush artistry, saree
            draping and a team that travels across Andhra Pradesh for your muhurtham.
          </p>
          <ul className="bridal-fade mt-8 space-y-3 text-sm text-cream/70">
            {["Bridal trial & mood board", "Muhurtham + reception looks", "On-location team", "Family & bridesmaid packages"].map(
              (i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="size-1.5 rotate-45 bg-gold" />
                  {i}
                </li>
              ),
            )}
          </ul>
          <div className="bridal-fade mt-10">
            <LuxeButton as="a" href="#contact" className="px-12">
              Reserve Bridal Consultation
            </LuxeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
