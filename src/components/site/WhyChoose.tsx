import { SectionHeading } from "./SectionHeading";
import { Award, FlaskConical, Gem, MessagesSquare, Wand, ShieldCheck } from "lucide-react";
import interior from "@/assets/salon-interior.jpg";

const FEATURES = [
  { title: "Certified Stylists", icon: Award, desc: "Internationally trained, continuously upskilled artists." },
  { title: "Imported Products", icon: FlaskConical, desc: "Professional global brands only — no compromises." },
  { title: "Luxury Ambience", icon: Gem, desc: "Black marble, gold detailing, private styling suites." },
  { title: "Custom Consultation", icon: MessagesSquare, desc: "Every service begins with a personal hair diagnosis." },
  { title: "Latest Hair Trends", icon: Wand, desc: "Runway-led techniques adapted for Indian hair." },
  { title: "Premium Hygiene", icon: ShieldCheck, desc: "Sterilised tools and single-use essentials, always." },
];

export function WhyChoose() {
  return (
    <section id="about" className="surface-noir relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full border border-gold/10 float-shape" />
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal-left zoom-frame relative overflow-hidden rounded-[2rem] ring-1 ring-gold/20 shadow-luxe">
          <img
            src={interior}
            alt="Interior of the SASS Hair & Beauty luxury salon with black marble and gold mirrors"
            width={1200}
            height={1400}
            loading="lazy"
            className="h-[30rem] w-full object-cover lg:h-[38rem]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-2xl px-6 py-5">
            <p className="eyebrow text-gold">Since 2010</p>
            <p className="mt-2 text-sm text-ivory/80">
              Three flagship salons across Andhra Pradesh, one uncompromising standard.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Why Choose SASS"
            title="Why Clients Love SASS"
            subtitle="A salon experience built around expertise, hygiene and honest consultation — the reason our guests return for years."
            tone="dark"
            align="left"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="reveal glass-panel lift-card rounded-2xl p-6"
                  style={{ ["--reveal-delay" as string]: `${(i % 2) * 100 + Math.floor(i / 2) * 130}ms` }}
                >
                  <Icon className="size-6 text-gold" aria-hidden />
                  <h3 className="mt-4 text-lg text-ivory">{feature.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ivory/60">{feature.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
