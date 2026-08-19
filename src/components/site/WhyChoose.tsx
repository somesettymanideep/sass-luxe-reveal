import { useEffect, useRef } from "react";
import { gsap, ensureGsap } from "@/lib/motion";
import salonIcon from "@/assets/why-beauty-salon.svg.asset.json";
import makeupIcon from "@/assets/employees.svg.asset.json";
import productsIcon from "@/assets/skincare.svg.asset.json";
import safeIcon from "@/assets/why-safe.svg.asset.json";
import consumerIcon from "@/assets/why-consumer.svg.asset.json";

const items = [
  {
    icon: salonIcon.url,
    title: "Premium Experience",
    copy: "Luxury salon experience with world-class services.",
  },
  {
    icon: makeupIcon.url,
    title: "Expert Stylists",
    copy: "Trained & certified professionals at your service.",
  },
  {
    icon: productsIcon.url,
    title: "High Quality Products",
    copy: "We use only top-quality, skin & hair safe products.",
  },
  {
    icon: safeIcon.url,
    title: "Hygiene & Cleanliness",
    copy: "100% hygiene and sterilized equipment.",
  },
  {
    icon: consumerIcon.url,
    title: "Customer Satisfaction",
    copy: "Your satisfaction is our top priority.",
  },
];

export function WhyChoose() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-head",
        { autoAlpha: 0, y: 28, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );

      gsap.fromTo(
        ".wc-item",
        { autoAlpha: 0, y: 42, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        ".wc-icon",
        { autoAlpha: 0, scale: 0.7, rotate: -8 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 0.12,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        ".wc-divider",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-background py-16 md:py-20">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="reveal-head mx-auto max-w-2xl text-center">
          <h2 className="font-semibold text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15]">
            Why Choose <span className="text-gold-gradient">SASS?</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ icon, title, copy }, i) => (
            <div
              key={title}
              className="wc-item group relative px-4 text-center lg:px-6"
            >
              {i > 0 && (
                <span className="wc-divider pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gold/25 lg:block" />
              )}
              <img
                src={icon}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="wc-icon mx-auto size-12 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-110"
              />
              <h3 className="mt-5 font-button text-sm font-semibold uppercase tracking-[0.06em]">
                {title}
              </h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
