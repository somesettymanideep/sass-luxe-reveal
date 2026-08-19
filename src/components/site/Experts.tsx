import { Instagram, Facebook, Linkedin } from "lucide-react";
import { useReveal } from "@/lib/motion";
import hero from "@/assets/hero.jpg";
import after from "@/assets/after.jpg";
import bridal from "@/assets/bridal.jpg";
import g1 from "@/assets/g1.jpg";

const team = [
  { name: "Aarav Menon", role: "Creative Director · Cutting", img: hero },
  { name: "Nikita Rao", role: "Master Colourist", img: after },
  { name: "Sana Fatima", role: "Lead Bridal Artist", img: bridal },
  { name: "Rohit Naidu", role: "Texture & Smoothening", img: g1 },
];

export function Experts() {
  const ref = useReveal<HTMLDivElement>({ selector: ".exp-card, .reveal-head", stagger: 0.12 });

  return (
    <section id="experts" className="bg-background py-28 md:py-36">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="reveal-head max-w-2xl">
          <p className="section-eyebrow text-gold">Our Experts</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]">
            The hands behind the transformation
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <article
              key={t.name}
              className="exp-card group relative overflow-hidden rounded-[1.5rem] border border-gold/15 transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:rotate-[-0.8deg] hover:border-gold/60 hover:shadow-gold"
            >
              <div className="relative aspect-3/4 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl text-cream">{t.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-xs uppercase tracking-[0.2em] text-gold opacity-0 transition-all duration-700 group-hover:max-h-10 group-hover:opacity-100">
                    {t.role}
                  </p>
                  <div className="mt-4 flex translate-y-4 gap-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                      <span
                        key={i}
                        className="grid size-9 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 hover:scale-110"
                      >
                        <Icon className="size-4" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
