import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { ensureGsap } from "@/lib/motion";
import faqImage from "@/assets/best_hair_and_beauty_clinic.png.asset.json";

const faqs = [
  {
    q: "Do I need an appointment or can I walk in?",
    a: "Walk-ins are welcome at all three branches, but weekends fill quickly. Booking ahead guarantees your preferred stylist and a consultation slot.",
  },
  {
    q: "How far in advance should I book a bridal trial?",
    a: "We recommend 6–8 weeks before the wedding date. Peak muhurtham season in Vijayawada and Guntur books out several months ahead.",
  },
  {
    q: "Which products do you use for colour?",
    a: "L'Oréal Professionnel, Schwarzkopf and Wella colour systems, always paired with Olaplex bond protection at no extra charge.",
  },
  {
    q: "Do you offer home or destination services?",
    a: "Yes. Our bridal and grooming teams travel across Andhra Pradesh and Telangana. Travel is quoted separately at the time of booking.",
  },
  {
    q: "Can I use my membership at any branch?",
    a: "Absolutely. Memberships are valid across Vijayawada, Guntur and Rajahmundry with a single profile.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      // Image: elegant slide-in from left with subtle scale and blur
      gsap.fromTo(
        ".faq-image",
        { autoAlpha: 0, x: -80, scale: 1.04, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );

      // Heading block: fade up with blur
      gsap.fromTo(
        ".reveal-head",
        { autoAlpha: 0, y: 50, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );

      // FAQ cards: staggered fade + slide + scale + blur
      gsap.fromTo(
        ".faq-item",
        { autoAlpha: 0, y: 45, x: 40, scale: 0.98, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );

      // FAQ number badges: pop in after their cards appear
      gsap.fromTo(
        ".faq-item .faq-num",
        { autoAlpha: 0, scale: 0.6, y: 10 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.8)",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 76%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-background py-28 md:py-36">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Heading — top left of the section */}
        <div className="reveal-head mb-10 lg:mb-14">
          <p className="section-eyebrow text-gold">FAQ</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Good to know before you visit
          </h2>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="faq-image mx-auto w-full max-w-md lg:max-w-none lg:sticky lg:top-28" style={{ willChange: "transform, opacity, filter" }}>
            <img
              src={faqImage.url}
              alt="SASS Hair & Beauty signature services menu"
              loading="lazy"
              width={1080}
              height={1080}
              className="w-full rounded-[7px] shadow-luxe"
              style={{ willChange: "transform, opacity, filter" }}
            />
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={f.q}
                  className={`faq-item group relative overflow-hidden rounded-[7px] border border-gold/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/30 hover:shadow-luxe focus-within:border-gold/30 focus-within:shadow-luxe ${
                    isOpen ? "shadow-luxe" : ""
                  }`}
                  style={{ willChange: "transform, opacity, filter" }}
                >
                  {/* Active gold accent bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-[3px] bg-gold-gradient transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                  />
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 px-5 py-4 text-left transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-4"
                  >
                    <span
                      className={`faq-num flex size-10 shrink-0 items-center justify-center rounded-full border font-button text-xs font-semibold tracking-wider transition-all duration-500 sm:size-11 ${
                        isOpen
                          ? "border-gold bg-gold text-black"
                          : "border-gold/25 bg-cream text-gold group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-black"
                      }`}
                    >
                      {num}
                    </span>
                    <span className="flex-1 font-display text-base transition-colors duration-500 sm:text-lg md:text-xl">
                      {f.q}
                    </span>
                    <Plus
                      className={`size-5 shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "rotate-135" : "group-hover:rotate-90"
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden px-5 sm:px-6">
                      <div className="border-t border-gold/10 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
