import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, Phone, BadgeCheck, Sparkles, Award, Volume2, VolumeX } from "lucide-react";
import { useReveal } from "@/lib/motion";
import { LuxeButton } from "../LuxeButton";
import { getAssetUrl } from "@/lib/assets";
import hero from "@/assets/hero.jpg?url";
import vjaHeroReel from "@/assets/vja-hero-reel-optimized.mp4.asset.json";
import heroPoster from "@/assets/hero-reel-poster.jpg.asset.json";

const trust = [
  { Icon: BadgeCheck, label: "Certified Experts" },
  { Icon: Sparkles, label: "Premium Products" },
  { Icon: Award, label: "10+ Years Experience" },
];

export function VjaHero() {
  const ref = useReveal<HTMLDivElement>({ selector: ".vh-item", stagger: 0.1 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative isolate overflow-hidden bg-ink pb-24 pt-32 text-cream md:pb-32 md:pt-40">
      <img src={getAssetUrl(hero)} alt="" aria-hidden className="absolute inset-0 size-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black/70" />
      
      <div ref={ref} className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div>
          <nav aria-label="Breadcrumb" className="vh-item">
            <ol className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.26em] text-cream/50">
              <li><Link to="/" className="link-underline">Home</Link></li>
              <li aria-hidden className="text-gold">/</li>
              <li className="text-gold">Hair &amp; Beauty Clinic in Vijayawada</li>
            </ol>
          </nav>

          <h1 className="vh-item mt-8 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.02]">
            Best Hair &amp; Beauty <span className="italic text-gold-gradient">Clinic</span> in Vijayawada
          </h1>
          <p className="vh-item mt-6 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
            A luxury destination for advanced hair care, skin treatments, laser therapy and bridal
            artistry — crafted by certified experts using globally trusted products, right here on
            MG Road, Vijayawada.
          </p>

          <div className="vh-item mt-9 flex flex-wrap gap-4">
            <LuxeButton as="a" href="#book">Book Appointment</LuxeButton>
            <a
              href="tel:+917286811999"
              className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-7 py-3.5 font-button text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <Phone className="size-3.5" /> Call Now
            </a>
          </div>

          <div className="vh-item mt-10 flex flex-wrap items-center gap-6 rounded-[24px] border border-gold/20 bg-white/5 px-6 py-5 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 font-display text-2xl leading-none">4.9/5</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-cream/55">Google Rating</p>
            </div>
            <span className="hidden h-12 w-px bg-gold/25 sm:block" />
            <div>
              <p className="font-display text-2xl leading-none">2500+</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-cream/55">Happy Clients</p>
            </div>
          </div>

          <ul className="vh-item mt-6 flex flex-wrap gap-x-7 gap-y-3">
            {trust.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-cream/70">
                <Icon className="size-4 text-gold" strokeWidth={1.5} /> {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="vh-item relative">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-[24px] border border-gold/25 shadow-luxe">
            <video
              ref={videoRef}
              poster={getAssetUrl(heroPoster)}
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-cover"
            >
              <source src={getAssetUrl(vjaHeroReel)} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
