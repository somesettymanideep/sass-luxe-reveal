import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import colour from "@/assets/svc-colour.jpg";
import keratin from "@/assets/svc-keratin.jpg";
import smoothening from "@/assets/svc-smoothening.jpg";
import bridal from "@/assets/hero-bridal.jpg";
import haircut from "@/assets/hero-styling.jpg";

const ITEMS = [
  { name: "Sravani R.", service: "Fashion Hair Colour", image: colour, alt: "Fashion hair colour transformation result" },
  { name: "Divya K.", service: "Keratin Treatment", image: keratin, alt: "Glossy hair after keratin treatment" },
  { name: "Anusha M.", service: "Hair Smoothening", image: smoothening, alt: "Smooth silky hair transformation" },
  { name: "Harika P.", service: "Bridal Makeup", image: bridal, alt: "Bridal makeup transformation" },
  { name: "Ritu S.", service: "Signature Hair Cut", image: haircut, alt: "Luxury haircut and styling result" },
];

export function Transformations() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 4500);
    return () => window.clearInterval(id);
  }, [index]);

  const go = (dir: number) => setIndex((i) => (i + dir + ITEMS.length) % ITEMS.length);

  return (
    <section id="gallery" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Before &amp; After"
            title="Transformations We Love"
            subtitle="Real guests, real results — styled and photographed in our salons."
            align="left"
          />
          <div className="reveal flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous transformation"
              className="flex size-11 items-center justify-center rounded-full border border-gold-deep/50 text-gold-deep transition-colors hover:bg-primary hover:text-gold"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next transformation"
              className="flex size-11 items-center justify-center rounded-full border border-gold-deep/50 text-gold-deep transition-colors hover:bg-primary hover:text-gold"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="reveal-zoom mt-14 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(calc(${-index} * (var(--card-w) + 1.5rem)))`, ["--card-w" as string]: "clamp(16rem, 30vw, 26rem)" }}
          >
            {ITEMS.map((item) => (
              <figure
                key={item.name}
                className="zoom-frame group relative shrink-0 overflow-hidden rounded-[1.75rem] ring-1 ring-border"
                style={{ width: "var(--card-w)" }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow text-gold">{item.service}</p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-ivory">{item.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          {ITEMS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${item.service} transformation`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-[image:var(--gradient-gold)]" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
