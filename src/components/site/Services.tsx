import { Scissors, Palette, Sparkles, Wand2, Crown, Flower2, Hand, Eye } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import haircut from "@/assets/svc-haircut.jpg";
import colour from "@/assets/svc-colour.jpg";
import keratin from "@/assets/svc-keratin.jpg";
import smoothening from "@/assets/svc-smoothening.jpg";
import bridal from "@/assets/svc-bridal.jpg";
import facial from "@/assets/svc-facial.jpg";
import nails from "@/assets/svc-nails.jpg";
import threading from "@/assets/svc-threading.jpg";

const SERVICES = [
  { title: "Hair Cut", icon: Scissors, image: haircut, alt: "Precision haircut being shaped by a SASS stylist", desc: "Precision cuts sculpted to your face shape, texture and lifestyle." },
  { title: "Fashion Colours", icon: Palette, image: colour, alt: "Fashion balayage hair colour result", desc: "Balayage, global and creative tones using ammonia-free imported colour." },
  { title: "Keratin Treatment", icon: Sparkles, image: keratin, alt: "Glossy hair after a keratin treatment", desc: "Frizz-free, mirror-glossy hair with deep protein reconstruction." },
  { title: "Hair Smoothening", icon: Wand2, image: smoothening, alt: "Silky smooth straight hair after smoothening", desc: "Silky, manageable hair with a soft natural fall that lasts." },
  { title: "Bridal Makeup", icon: Crown, image: bridal, alt: "Bridal makeup artist working on an Indian bride", desc: "HD and airbrush bridal artistry crafted for your wedding day." },
  { title: "Facials", icon: Flower2, image: facial, alt: "Luxury facial skincare products on marble", desc: "Clinical-grade facials for radiance, hydration and clarity." },
  { title: "Pedicure & Manicure", icon: Hand, image: nails, alt: "Manicured hands with luxury nail finish", desc: "Spa rituals for hands and feet with premium polish finishes." },
  { title: "Threading", icon: Eye, image: threading, alt: "Eyebrow shaping and threading close up", desc: "Brow architecture and detailing by specialist technicians." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Signature Services"
          subtitle="Experience luxury grooming and beauty crafted by certified professionals."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="reveal lift-card group overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_50px_-40px_oklch(0_0_0/0.6)]"
                style={{ ["--reveal-delay" as string]: `${(i % 4) * 120}ms` }}
              >
                <div className="zoom-frame relative aspect-4/5">
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent opacity-90" />
                  <span className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-full border border-gold/50 bg-black/50 text-gold backdrop-blur-sm transition-colors duration-500 group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="absolute inset-x-5 bottom-5 font-[family-name:var(--font-display)] text-xl text-ivory">
                    {service.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
                  <span className="mt-4 inline-block h-px w-10 bg-[image:var(--gradient-gold)] transition-all duration-500 group-hover:w-20" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
