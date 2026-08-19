import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Scissors,
  Feather,
  Palette,
  Flower2,
  Hand,
  Waves,
  Droplets,
  Smile,
  Crown,
  Sparkles,
  Wind,
  Brush,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { gsap, ensureGsap } from "@/lib/motion";
import haircut from "@/assets/svc-haircut.jpg";
import threading from "@/assets/svc-threading.jpg";
import colour from "@/assets/svc-colour.jpg";
import pedicure from "@/assets/svc-pedicure.jpg";
import manicure from "@/assets/svc-manicure.jpg";
import smoothening from "@/assets/svc-smoothening.jpg";
import keratin from "@/assets/svc-keratin.jpg";
import facial from "@/assets/svc-facial.jpg";
import bridal from "@/assets/svc-bridal.jpg";
import after from "@/assets/after.jpg";
import hairspa from "@/assets/svc-hairspa.jpg";
import makeup from "@/assets/svc-makeup.jpg";

interface Service {
  title: string;
  copy: string;
  img: string;
  Icon: LucideIcon;
}

const services: Service[] = [
  { title: "Hair Cuts", copy: "Trendy cuts tailored to your personality.", img: haircut, Icon: Scissors },
  { title: "Threading", copy: "Perfect shaping for a flawless look.", img: threading, Icon: Feather },
  { title: "Fashion Colours", copy: "Bold, vibrant & stunning colour transformations.", img: colour, Icon: Palette },
  { title: "Pedicure", copy: "Relaxing pedicures for soft & smooth feet.", img: pedicure, Icon: Flower2 },
  { title: "Manicure", copy: "Perfect nails, perfect you.", img: manicure, Icon: Hand },
  { title: "Smoothening", copy: "Frizz-free, silky & smooth hair.", img: smoothening, Icon: Waves },
  { title: "Keratin", copy: "Stronger, shinier & healthier hair.", img: keratin, Icon: Droplets },
  { title: "Facials", copy: "Rejuvenate your skin with expert care.", img: facial, Icon: Smile },
  { title: "Bridal Makeup", copy: "Look your best on your big day.", img: bridal, Icon: Crown },
  { title: "Transformations", copy: "Stunning makeovers that inspire.", img: after, Icon: Sparkles },
  { title: "Hair Spa", copy: "Deep nourishment for lustrous hair.", img: hairspa, Icon: Wind },
  { title: "Makeup", copy: "Enhancing your beauty for every occasion.", img: makeup, Icon: Brush },
];

export function Services() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-head",
        { autoAlpha: 0, y: 30, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        },
      );

      gsap.fromTo(
        ".svc-card",
        { autoAlpha: 0, y: 48, scale: 0.96, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: { each: 0.07, grid: "auto", from: "start" },
          scrollTrigger: { trigger: ".svc-grid", start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        ".svc-badge",
        { autoAlpha: 0, scale: 0.5, rotate: -20 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(2)",
          stagger: 0.07,
          delay: 0.2,
          scrollTrigger: { trigger: ".svc-grid", start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="reveal-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Our</p>
          <h2 className="mt-1 font-semibold text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
            Signature <span className="text-gold-gradient">Services</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gold/40" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-14 bg-gold/40" />
          </div>
        </div>

        <div className="svc-grid mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {services.map(({ title, copy, img, Icon }) => (
            <article
              key={title}
              className="svc-card group relative flex flex-col overflow-hidden rounded-[0.6rem] border border-gold/25 bg-white p-2 text-center shadow-luxe transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold hover:shadow-gold"
            >
              <div className="relative overflow-hidden rounded-[0.4rem]">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="aspect-4/3 w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span className="svc-badge absolute -bottom-4 left-2 flex size-9 items-center justify-center rounded-full border border-gold/60 bg-ink text-gold shadow-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[12deg] group-hover:scale-110">
                  <Icon className="size-4" strokeWidth={1.4} />
                </span>
              </div>

              <div className="flex flex-1 flex-col px-2 pb-4 pt-6">
                <h3 className="font-display text-base leading-tight">{title}</h3>
                <p className="mt-2 text-[0.7rem] leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal-head mt-12 text-center">
          <Link
            to="/services"
            className="inline-block rounded-[0.35rem] bg-ink px-8 py-3.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-gold hover:text-ink"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
