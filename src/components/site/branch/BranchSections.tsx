import { useEffect, useRef, useState } from "react";
import {
  Sparkles, BadgeCheck, Crown, Droplets, Palette, ShieldCheck, Gem, MessageCircle,
  Star, MoveHorizontal, X,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "@/lib/motion";
import type { Branch } from "@/lib/branches";
import rjy1 from "@/assets/rjy-store-1.jpg.asset.json";
import rjy2 from "@/assets/rjy-store-2.jpg.asset.json";
import rjy3 from "@/assets/rjy-store-3.jpg.asset.json";
import rjy4 from "@/assets/rjy-store-4.jpg.asset.json";
import rjy5 from "@/assets/rjy-store-5.jpg.asset.json";
import rjy6 from "@/assets/rjy-store-6.jpg.asset.json";
import rjy7 from "@/assets/rjy-store-7.jpg.asset.json";
import rjy8 from "@/assets/rjy-store-8.jpg.asset.json";
import haircut from "@/assets/svc-haircut.jpg";
import hairspa from "@/assets/svc-hairspa.jpg";
import colour from "@/assets/svc-colour.jpg";
import smoothening from "@/assets/svc-smoothening.jpg";
import keratin from "@/assets/svc-keratin.jpg";
import bridalMakeup from "@/assets/svc-bridal.jpg";
import bridal from "@/assets/svc-bridal.jpg";
import bridalHair from "@/assets/bridal.jpg";
import pedicure from "@/assets/svc-pedicure.jpg";
import manicure from "@/assets/svc-manicure.jpg";
import facial from "@/assets/svc-facial.jpg";
import makeup from "@/assets/svc-makeup.jpg";
import threading from "@/assets/svc-threading.jpg";
import interior from "@/assets/interior.jpg";
import hero from "@/assets/hero.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";
import storeFront from "@/assets/store-front.jpg";
import storeReception from "@/assets/store-reception.jpg";
import storeStyling from "@/assets/store-styling-floor.jpg";
import storeWash from "@/assets/store-wash-lounge.jpg";
import storeBridalSuite from "@/assets/store-bridal-suite.jpg";
import storeNail from "@/assets/store-nail-lounge.jpg";
import reel1 from "@/assets/reel1.mp4.asset.json";
import reel2 from "@/assets/reel2.mp4.asset.json";
import reel3 from "@/assets/reel3.mp4.asset.json";
import reel4 from "@/assets/reel4.mp4.asset.json";
import poster1 from "@/assets/reel1-poster.jpg.asset.json";
import poster2 from "@/assets/reel2-poster.jpg.asset.json";
import poster3 from "@/assets/reel3-poster.jpg.asset.json";
import poster4 from "@/assets/reel4-poster.jpg.asset.json";
import reel5 from "@/assets/reel5.mp4.asset.json";
import reel6 from "@/assets/reel6.mp4.asset.json";
import poster5 from "@/assets/reel5-poster.jpg.asset.json";
import poster6 from "@/assets/reel6-poster.jpg.asset.json";
import salonIcon from "@/assets/why-beauty-salon.svg.asset.json";
import employeesIcon from "@/assets/employees.svg.asset.json";
import makeupIcon from "@/assets/why-makeup.svg.asset.json";
import skincareIcon from "@/assets/skincare.svg.asset.json";
import productsIcon from "@/assets/why-products.svg.asset.json";
import safeIcon from "@/assets/why-safe.svg.asset.json";

import hairIcon from "@/assets/hair.svg.asset.json";
import consultationIcon from "@/assets/consultation.svg.asset.json";

/* ---------------- Section 2 — Why Choose SASS ---------------- */

const reasons: { icon: string; title: string }[] = [
  { icon: salonIcon.url, title: "Premium Salon Experience" },
  { icon: employeesIcon.url, title: "Certified Hair Stylists" },
  { icon: makeupIcon.url, title: "Bridal Makeup Experts" },
  { icon: hairIcon.url, title: "Luxury Hair Treatments" },
  { icon: productsIcon.url, title: "International Colour Techniques" },
  { icon: safeIcon.url, title: "Hygiene & Safety Standards" },
  { icon: skincareIcon.url, title: "Premium Imported Products" },
  { icon: consultationIcon.url, title: "Personalised Consultation" },
];

export function BranchWhy({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".bw-item, .bw-head", stagger: 0.07 });
  return (
    <section className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="bw-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Why Choose SASS {branch.city}</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">
            A salon built on <span className="italic text-gold-gradient">detail</span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/40" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon, title }) => (
            <article
              key={title}
              className="bw-item group rounded-[20px] border border-gold/20 bg-card/70 p-7 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold hover:shadow-gold"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-ink ring-1 ring-gold/30 transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:shadow-gold">
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="size-9 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-110"
                />
              </span>
              <h3 className="mt-5 font-display text-lg leading-snug">{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 3 — Signature Services ---------------- */

const serviceGroups: { title: string; image: string; items: string[]; more?: string }[] = [
  { title: "Hair Services", image: colour, items: ["Hair Cut & Styling", "Hair Spa", "Hair Coloring", "Hair Smoothening", "Keratin Treatment", "Hair Botox"], more: "7 More Services" },
  { title: "Beauty & Skin Services", image: facial, items: ["Hydra Facial", "Medi Facial", "Skin Brightening", "Acne Treatment", "Pigmentation Treatment", "Anti-Aging Treatments"], more: "5 More Services" },
  { title: "Laser Treatments", image: g1, items: ["Laser Hair Removal", "Tattoo Removal", "Scar Removal", "Pigmentation Laser", "Stretch Mark Removal", "Laser Skin Tightening"] },
  { title: "Bridal Services", image: bridal, items: ["Bridal Makeup", "Engagement Makeup", "Reception Makeup", "HD Makeup", "Airbrush Makeup", "Pre-Bridal Packages"], more: "2 More Services" },
  { title: "Nail & Spa Services", image: manicure, items: ["Manicure", "Pedicure", "Nail Extensions", "Gel Nails", "Nail Art", "Head Massage"], more: "2 More Services" },
  { title: "Hair Treatments", image: hairspa, items: ["Hair Fall Treatment", "PRP Hair Treatment", "Dandruff Treatment", "Scalp Detox", "Protein Treatment", "Ozone Therapy"] },
  { title: "Makeup & Styling", image: makeup, items: ["Party Makeup", "HD Makeup", "Airbrush Makeup", "Hairstyling", "Saree Draping", "Groom Packages"] },
  { title: "Body Care", image: interior, items: ["Body Massage", "Body Spa", "Body Polishing", "Detan Treatment", "Stretch Mark Therapy", "Slimming Treatments"] },
];

export function BranchServices() {
  const ref = useReveal<HTMLDivElement>({ selector: ".bs-card, .bs-head", stagger: 0.05 });
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="bs-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Signature Services</p>
          <h2 className="font-semibold text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.1]">Our Services</h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map(({ title, image, items, more }) => (
            <article
              key={title}
              className="bs-card group relative flex overflow-hidden rounded-[10px] bg-ink text-cream shadow-luxe transition-[transform,box-shadow] duration-700 hover:-translate-y-2 hover:shadow-gold"
            >
              <div className="relative w-[38%] shrink-0 overflow-hidden">
                <img
                  src={image}
                  alt={`${title} at SASS Hair & Beauty`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1300ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink" />
              </div>
              <div className="flex min-h-[290px] min-w-0 flex-1 flex-col justify-between p-4 pl-3">
                <div>
                  <h3 className="font-button text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold">{title}</h3>
                  <ul className="mt-3 space-y-[7px]">
                    {items.map((i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[0.7rem] leading-snug text-cream/85">
                        <span className="mt-[1px] shrink-0 text-[0.6rem] text-gold">◈</span> {i}
                      </li>
                    ))}
                  </ul>
                  {more && <p className="mt-2 text-[0.66rem] text-gold">+ {more}</p>}
                </div>
                <a
                  href="#book"
                  className="mx-auto mt-4 inline-flex w-fit items-center justify-center rounded-[4px] bg-gold-gradient px-6 py-2 font-button text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-500 group-hover:-translate-y-0.5"
                >
                  View All
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 4 — Transformations ---------------- */

function Slider() {
  const [pos, setPos] = useState(42);
  const wrap = useRef<HTMLDivElement | null>(null);
  const move = (clientX: number) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };
  return (
    <div
      ref={wrap}
      className="relative mx-auto h-[240px] w-full max-w-4xl select-none overflow-hidden rounded-[24px] border border-gold/25 sm:h-[340px] lg:h-[400px]"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
      onTouchMove={(e) => e.touches[0] && move(e.touches[0].clientX)}
    >
      <img src={after} alt="After transformation" loading="lazy" className="absolute inset-0 size-full object-cover object-top" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="Before transformation" loading="lazy" className="size-full object-cover object-top" />
      </div>
      <div className="absolute inset-y-0 w-px bg-gold-gradient" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold">
          <MoveHorizontal className="size-5" />
        </span>
      </div>
    </div>
  );
}

const clips = [
  { src: reel1.url, poster: poster1.url, tag: "Colour", title: "Fashion colour transformation" },
  { src: reel2.url, poster: poster2.url, tag: "Bridal", title: "Bridal makeover reveal" },
  { src: reel3.url, poster: poster3.url, tag: "Styling", title: "Signature blowout styling" },
  { src: reel4.url, poster: poster4.url, tag: "Makeover", title: "Complete salon makeover" },
  { src: reel5.url, poster: poster5.url, tag: "Studio", title: "Inside the SASS studio" },
  { src: reel6.url, poster: poster6.url, tag: "Salon", title: "A day at SASS Hair & Beauty" },
];

function VideoSlider() {
  const track = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
      >
        {clips.map((c) => (
          <figure
            key={c.src}
            className="bt-item group relative aspect-9/16 w-[68%] shrink-0 snap-center overflow-hidden rounded-[18px] border border-gold/20 sm:w-[45%] md:w-[31%] lg:w-[23%]"
          >
            <video
              src={c.src}
              poster={c.poster}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/20" />
            <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/45 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
              {c.tag}
            </span>
            <figcaption className="absolute inset-x-4 bottom-4 font-display text-base leading-tight text-cream">
              {c.title}
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        aria-label="Previous videos"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-background/90 text-foreground shadow-luxe transition-colors hover:border-gold hover:text-gold md:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        aria-label="Next videos"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-background/90 text-foreground shadow-luxe transition-colors hover:border-gold hover:text-gold md:flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function BranchTransformations() {
  const ref = useReveal<HTMLDivElement>({ selector: ".bt-item, .bt-head", stagger: 0.08 });
  return (
    <section className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="bt-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Before &amp; After</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">Transformations we love</h2>
          <p className="mt-4 text-sm text-muted-foreground">Drag the handle to reveal the difference.</p>
        </div>

        <div className="bt-item mt-12"><Slider /></div>

        <div className="bt-head mt-14 flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-2xl md:text-3xl">Transformation reels</h3>
          <p className="text-sm text-muted-foreground">Hover to preview · swipe to browse</p>
        </div>

        <div className="mt-6"><VideoSlider /></div>
      </div>
    </section>
  );
}


/* ---------------- Section 5 — Testimonials ---------------- */

const reviews = [
  { name: "Sravani Reddy", service: "Balayage & Gloss", text: "The consultation alone was worth it — they matched the tone to my skin, not to a chart. Best colour I've had." },
  { name: "Anusha Kolli", service: "Bridal Package", text: "They handled my entire bridal party across two days. The makeup held through a 14-hour muhurtham." },
  { name: "Divya Prasad", service: "Olaplex Bond Therapy", text: "Genuinely rescued my hair after a bad smoothening elsewhere. Six months in and it still feels new." },
  { name: "Karthik Varma", service: "Precision Cut", text: "Cleanest, most professional studio in the city. Booking is effortless and the stylists actually listen." },
  { name: "Harika Sannidhi", service: "Keratin Treatment", text: "My frizz disappeared for months. The staff explained every step and the ambience is unmatched." },
  { name: "Priya Mantri", service: "Party Makeup", text: "Got compliments all evening. They understood my outfit and matched the look perfectly." },
];

const TRANSITION_DURATION = 1200;
const AUTO_INTERVAL = 7000;

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.5 12.28c0-.86-.08-1.68-.22-2.48H12v4.7h6.45c-.28 1.48-1.11 2.74-2.36 3.58v2.98h3.82c2.24-2.06 3.53-5.1 3.53-8.78z" fill="#4285F4" />
      <path d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.82-2.98c-1.08.72-2.45 1.15-4.12 1.15-3.17 0-5.85-2.14-6.81-5.01H1.47v3.09C3.45 21.34 7.39 24 12 24z" fill="#34A853" />
      <path d="M5.19 14.25c-.24-.72-.38-1.49-.38-2.25s.14-1.53.38-2.25V6.66H1.47A11.98 11.98 0 000 12c0 1.93.47 3.75 1.29 5.34l3.9-3.09z" fill="#FBBC05" />
      <path d="M12 4.77c1.78 0 3.38.61 4.64 1.81l3.48-3.48C17.95 1.18 15.23 0 12 0 7.39 0 3.45 2.66 1.47 6.66l3.72 2.89c.96-2.87 3.64-5.01 6.81-5.01z" fill="#EA4335" />
    </svg>
  );
}

export function BranchTestimonials({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".br-head", stagger: 0.1 });
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(1);
  const [noTransition, setNoTransition] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setPerView(w < 1024 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lead = Math.max(1, Math.floor(perView / 2));
  const trail = Math.max(1, perView - 1);

  const extended = [
    ...reviews.slice(-lead),
    ...reviews,
    ...reviews.slice(0, trail),
  ].map((r, i) => ({ ...r, extKey: i }));

  const itemWidth = 100 / perView;
  const translate = 50 - (index + 0.5) * itemWidth;

  useEffect(() => {
    setNoTransition(true);
    setIndex(lead);
    const t = setTimeout(() => setNoTransition(false), 60);
    return () => clearTimeout(t);
  }, [perView, lead]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((v) => v + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [perView, lead]);

  useEffect(() => {
    const maxIndex = reviews.length + lead;
    if (index !== maxIndex) return;
    const t = setTimeout(() => {
      setNoTransition(true);
      setIndex(lead);
      const restore = setTimeout(() => setNoTransition(false), 60);
      return () => clearTimeout(restore);
    }, TRANSITION_DURATION);
    return () => clearTimeout(t);
  }, [index, lead]);

  const activeReal = (index - lead + reviews.length) % reviews.length;

  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="br-head text-center">
          <p className="section-eyebrow text-gold">Client Testimonials</p>
          <h2 className="mx-auto mt-2 max-w-2xl font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">
            Loved by <span className="text-gold">{branch.city}</span>
          </h2>
          <div className="mx-auto mt-6 flex w-fit items-center gap-4 rounded-full border border-gold/30 bg-cream/5 px-6 py-3 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.55)] backdrop-blur-sm">
            <GoogleLogo className="size-6" />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-cream">4.9</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3 fill-gold text-gold" />
                  ))}
                </span>
              </div>
              <p className="text-[0.65rem] text-cream/60">Google Reviews · 5000+ clients</p>
            </div>
          </div>
        </div>

        <div
          className="relative mt-14 overflow-hidden"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div
            className="flex"
            style={{
              transform: `translate3d(${translate}%, 0, 0)`,
              transition: noTransition ? "none" : `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          >
            {extended.map((r, i) => {
              const isActive = i === index;
              return (
                <figure
                  key={r.extKey}
                  className="shrink-0 px-3"
                  style={{ width: `${itemWidth}%` }}
                >
                  <div
                    className={`flex h-full flex-col items-center gap-5 rounded-[14px] border p-7 text-center shadow-[0_18px_44px_-30px_rgba(0,0,0,0.55)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
                      isActive
                        ? "border-gold/50 bg-[#1a1a1a] shadow-[0_28px_70px_-24px_rgba(231,185,97,0.22)]"
                        : "border-white/10 bg-black/60 text-cream/90"
                    }`}
                  >
                    <span
                      className={`flex size-16 items-center justify-center rounded-full border font-display text-2xl transition-all duration-700 ${
                        isActive ? "border-gold/40 bg-gold/15 text-gold" : "border-white/15 text-cream/80"
                      }`}
                    >
                      {r.name.charAt(0)}
                    </span>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="size-3.5 fill-gold text-gold" />
                        ))}
                      </div>
                      <blockquote className={`mt-4 text-sm leading-relaxed ${isActive ? "text-cream/90" : "text-cream/70"}`}>
                        “{r.text}”
                      </blockquote>
                      <figcaption className="mt-5">
                        <p className="text-sm font-semibold">– {r.name}</p>
                        <p className={`mt-1 text-xs ${isActive ? "text-cream/60" : "text-cream/50"}`}>{r.service}</p>
                      </figcaption>
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                        <GoogleLogo className="size-3" /> Google review
                      </div>
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center gap-2.5">
            {reviews.map((_, d) => (
              <button
                key={d}
                aria-label={`Go to review ${d + 1}`}
                onClick={() => setIndex(d + lead)}
                className={`size-2.5 rounded-full transition-all duration-500 ${d === activeReal ? "bg-gold" : "bg-cream/25 hover:bg-cream/45"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------------- Section 6 — Gallery ---------------- */

const baseShots = [
  { src: storeFront, alt: "SASS salon storefront", cat: "Storefront", span: "row-span-2" },
  { src: storeReception, alt: "Salon reception desk", cat: "Reception", span: "" },
  { src: storeStyling, alt: "Styling floor with chairs and mirrors", cat: "Styling Floor", span: "" },
  { src: storeBridalSuite, alt: "Private bridal suite", cat: "Bridal Suite", span: "row-span-2" },
  { src: storeWash, alt: "Hair wash lounge", cat: "Wash Lounge", span: "" },
  { src: storeNail, alt: "Nail and pedicure lounge", cat: "Nail Lounge", span: "" },
];

const rajahmundryShots = [
  { src: rjy2.url, alt: "SASS Hair & Beauty Rajahmundry storefront at Prasaditya Mall", cat: "Storefront", span: "row-span-2" },
  { src: rjy6.url, alt: "SASS Rajahmundry reception desk", cat: "Reception", span: "" },
  { src: rjy3.url, alt: "Styling floor with lit mirrors", cat: "Styling Floor", span: "" },
  { src: rjy4.url, alt: "Kids styling chair at SASS Rajahmundry", cat: "Kids Zone", span: "row-span-2" },
  { src: rjy8.url, alt: "Hair wash lounge with backwash units", cat: "Wash Lounge", span: "" },
  { src: rjy1.url, alt: "Private facial and skin treatment room", cat: "Skin Studio", span: "" },
  { src: rjy5.url, alt: "Marble corridor of the salon", cat: "Interiors", span: "" },
  { src: rjy7.url, alt: "Styling stations along the salon corridor", cat: "Studio", span: "" },
];

export function BranchGallery({ slug }: { slug?: string }) {
  const shots = slug === "rajahmundry" ? rajahmundryShots : baseShots;
  const ref = useReveal<HTMLDivElement>({ selector: ".bg-item, .bg-head", stagger: 0.07 });
  const [lightbox, setLightbox] = useState<number | null>(null);


  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => ((v ?? 0) + 1) % shots.length);
      if (e.key === "ArrowLeft") setLightbox((v) => ((v ?? 0) - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="bg-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Gallery</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">Inside the studio</h2>
        </div>

        <div className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-4 md:auto-rows-[210px] md:grid-cols-4">
          {shots.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setLightbox(idx)}
              className={`bg-item group relative overflow-hidden rounded-[18px] border border-gold/20 ${s.span}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent p-4 text-[0.6rem] uppercase tracking-[0.2em] text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {s.cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-6 backdrop-blur-sm"
          style={{ animation: "fade-in 0.35s ease-out both" }}
          onClick={() => setLightbox(null)}
        >
          <button aria-label="Close" className="absolute right-6 top-6 rounded-full border border-gold/30 p-3 text-cream">
            <X className="size-5" />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightbox((v) => ((v ?? 0) - 1 + shots.length) % shots.length); }}
            className="absolute left-4 rounded-full border border-gold/30 p-3 text-cream md:left-10"
          >
            <ChevronLeft className="size-5" />
          </button>
          <img
            src={shots[lightbox]!.src}
            alt={shots[lightbox]!.alt}
            className="max-h-[84vh] max-w-[90vw] rounded-2xl object-contain"
            style={{ animation: "scale-in 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightbox((v) => ((v ?? 0) + 1) % shots.length); }}
            className="absolute right-4 rounded-full border border-gold/30 p-3 text-cream md:right-10"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
