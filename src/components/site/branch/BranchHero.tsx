import { useRef, useState } from "react";
import { Star, Users, BadgeCheck, Sparkles, Phone, Scissors, Crown, Gem, HeartHandshake, Volume2, VolumeX } from "lucide-react";
import { useReveal } from "@/lib/motion";
import { LuxeButton } from "../LuxeButton";
import type { Branch } from "@/lib/branches";
import heroReel from "@/assets/hero-reel.mp4.asset.json";
import heroPoster from "@/assets/hero-reel-poster.jpg.asset.json";
import gunturReel from "@/assets/guntur-reel.mp4.asset.json";
import gunturPoster from "@/assets/guntur-reel-poster.jpg.asset.json";

const badges = [
  { Icon: Star, label: "4.9 Rating", sub: "★★★★★" },
  { Icon: Users, label: "5000+", sub: "Happy clients" },
  { Icon: BadgeCheck, label: "Certified", sub: "Expert stylists" },
  { Icon: Sparkles, label: "Premium", sub: "Global products" },
];

const floating = [
  { Icon: Scissors, label: "Hair Experts", pos: "left-4 top-8 md:-left-6 md:top-14" },
  { Icon: Crown, label: "Luxury Bridal", pos: "right-4 top-1/3 md:-right-6" },
  { Icon: Gem, label: "Premium Salon", pos: "left-4 bottom-28 md:-left-8" },
  { Icon: HeartHandshake, label: "Beauty Care", pos: "right-6 bottom-8 md:-right-4" },
];

export function BranchHero({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".bh-item", stagger: 0.1 });
  const tel = `tel:${branch.phone.replace(/\s/g, "")}`;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const isGuntur = branch.slug === "guntur";
  const reel = isGuntur ? gunturReel : heroReel;
  const poster = isGuntur ? gunturPoster : heroPoster;



  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play().catch(() => {});
  };

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-cream md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-gold/10 blur-[140px]" />
      <div
        ref={ref}
        className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-10"
      >
        <div>
          <p className="bh-item section-eyebrow text-gold">SASS Hair &amp; Beauty — {branch.city}</p>
          <h1 className="bh-item mt-5 text-[clamp(2.3rem,5vw,4rem)] leading-[1.03]">
            Luxury Hair, Beauty &amp; <span className="italic text-gold-gradient">Bridal</span> Destination
          </h1>
          <p className="bh-item mt-6 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
            Experience premium hair styling, advanced hair treatments, bridal makeovers,
            professional skincare and luxury beauty services delivered by expert stylists in {branch.city}.
          </p>

          <div className="bh-item mt-9 flex flex-wrap gap-4">
            <LuxeButton as="a" href="#consultation">
              Book Appointment
            </LuxeButton>
            <a
              href={tel}
              className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-7 py-3.5 font-button text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <Phone className="size-3.5" /> Call Now
            </a>
          </div>

          <div className="bh-item mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map(({ Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-[18px] border border-gold/20 bg-white/5 p-4 backdrop-blur-md transition-transform duration-500 hover:-translate-y-1"
              >
                <Icon className="size-5 text-gold" strokeWidth={1.5} />
                <p className="mt-3 font-display text-lg leading-none">{label}</p>
                <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-cream/55">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bh-item relative">
          <div className="relative mx-auto max-w-[26rem] overflow-hidden rounded-[24px] border border-gold/25 shadow-luxe">
            <video
              ref={videoRef}
              src={reel.url}
              poster={poster.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`SASS Hair & Beauty ${branch.city} salon showreel`}
              className="mx-auto aspect-9/16 w-full max-w-[26rem] object-cover"
            />
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-gold/40 bg-black/55 text-gold backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:bg-black/75"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>

          {floating.map(({ Icon, label, pos }) => (
            <div
              key={label}
              className={`absolute ${pos} flex items-center gap-2 rounded-full border border-gold/30 bg-black/55 px-4 py-2.5 backdrop-blur-md`}
              style={{ animation: "fade-in 0.8s ease-out both" }}
            >
              <Icon className="size-4 text-gold" strokeWidth={1.5} />
              <span className="text-[0.62rem] uppercase tracking-[0.18em] text-cream">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
