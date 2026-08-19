import { Scissors, Palette, Droplets, Waves, Sparkles, Crown, Flower2, Feather } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/motion";
import haircut from "@/assets/svc-haircut.jpg";
import colour from "@/assets/svc-colour.jpg";
import keratin from "@/assets/svc-keratin.jpg";
import smoothening from "@/assets/svc-smoothening.jpg";
import bridalMakeup from "@/assets/svc-bridal.jpg";
import bridalHair from "@/assets/bridal.jpg";
import pedicure from "@/assets/svc-pedicure.jpg";
import threading from "@/assets/svc-threading.jpg";

interface Service {
  title: string;
  copy: string;
  image: string;
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Hair Cut",
    copy: "Trendy cuts tailored to your personality.",
    image: haircut,
    Icon: Scissors,
  },
  {
    title: "Fashion Colours",
    copy: "Vibrant, long-lasting colours that make a statement.",
    image: colour,
    Icon: Palette,
  },
  {
    title: "Keratin Treatment",
    copy: "Smooth, frizz-free hair with natural shine.",
    image: keratin,
    Icon: Droplets,
  },
  {
    title: "Hair Smoothening",
    copy: "Silky smooth hair that's easy to style and manage.",
    image: smoothening,
    Icon: Waves,
  },
  {
    title: "Bridal Makeup",
    copy: "Elegant bridal looks for your special day.",
    image: bridalMakeup,
    Icon: Sparkles,
  },
  {
    title: "Bridal Hairstyling",
    copy: "Statement bridal hair that enhances your natural beauty.",
    image: bridalHair,
    Icon: Crown,
  },
  {
    title: "Pedicure & Manicure",
    copy: "Complete care for beautiful hands and feet.",
    image: pedicure,
    Icon: Flower2,
  },
  {
    title: "Threading",
    copy: "Precision threading for perfectly shaped brows.",
    image: threading,
    Icon: Feather,
  },
];

export function ServicesGrid() {
  const ref = useReveal<HTMLDivElement>({ selector: ".sv-card, .sv-head", stagger: 0.08 });

  return (
    <section id="services" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="sv-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Our Menu</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
            Beauty. Expertise. <span className="italic text-gold-gradient">You.</span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/40" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, copy, image, Icon }) => (
            <article
              key={title}
              className="sv-card group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-gold/25 bg-background p-3 text-center shadow-luxe transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold hover:shadow-gold"
            >
              <div className="relative overflow-hidden rounded-[0.9rem]">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="aspect-4/5 w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>

              <div className="relative -mt-7 flex justify-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-gold/60 bg-ink text-gold shadow-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[12deg] group-hover:scale-110">
                  <Icon className="size-6" strokeWidth={1.4} />
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-6 pt-3">
                <h3 className="font-display text-lg uppercase tracking-[0.08em]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                <span className="mx-auto mt-5 block h-px w-10 bg-gold-gradient transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20" />
                <Link
                  to="/contact"
                  className="mx-auto mt-4 inline-block font-button text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  Book now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
