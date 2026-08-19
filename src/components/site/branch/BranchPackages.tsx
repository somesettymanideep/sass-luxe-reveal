import { ArrowRight, Check, Clock, Sparkles, Star } from "lucide-react";
import { useReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Branch } from "@/lib/branches";
import hairPkg from "@/assets/svc-keratin.jpg";
import bridalPkg from "@/assets/svc-bridal.jpg";
import glowPkg from "@/assets/svc-facial.jpg";
import groomPkg from "@/assets/mens-grooming.jpg";
import employeesIcon from "@/assets/employees.svg.asset.json";
import productsIcon from "@/assets/why-products.svg.asset.json";
import consultationIcon from "@/assets/consultation.svg.asset.json";
import safeIcon from "@/assets/why-safe.svg.asset.json";
import consumerIcon from "@/assets/why-consumer.svg.asset.json";

interface Pkg {
  name: string;
  image: string;
  desc: string;
  includes: string[];
  duration: string;
  price: number;
  original: number;
  featured?: boolean;
}

const packages: Pkg[] = [
  {
    name: "Luxury Hair Transformation",
    image: hairPkg,
    desc: "A complete hair reset — cut, colour and deep repair by senior stylists.",
    includes: ["Precision Hair Cut", "Hair Spa Ritual", "Global Hair Colour", "Keratin Finish", "Blow-dry Styling"],
    duration: "3–5 Hours",
    price: 4999,
    original: 7999,
  },
  {
    name: "Glow & Skin Care",
    image: glowPkg,
    desc: "Advanced facial therapies for luminous, camera-ready skin.",
    includes: ["Deep Cleanse Facial", "Vitamin C Glow", "De-tan Therapy", "Threading & Shaping", "Hand Massage"],
    duration: "2 Hours",
    price: 2999,
    original: 4499,
  },
  {
    name: "Bridal Beauty Package",
    image: bridalPkg,
    desc: "Our signature bridal journey — from trial to the final aisle-ready look.",
    includes: [
      "HD Bridal Makeup",
      "Hair Styling & Draping",
      "Pre-bridal Facial Course",
      "Manicure & Pedicure",
      "Trial Session Included",
    ],
    duration: "6–8 Hours",
    price: 24999,
    original: 38999,
    featured: true,
  },
  {
    name: "Premium Grooming",
    image: groomPkg,
    desc: "Sharp, modern grooming for men with a barber-crafted finish.",
    includes: ["Signature Hair Cut", "Beard Sculpt & Shave", "Charcoal Facial", "Head Massage", "Hair Colour Touch-up"],
    duration: "1.5–2 Hours",
    price: 1999,
    original: 3199,
  },
];

const benefits = [
  { label: "Certified Stylists", icon: employeesIcon.url },
  { label: "Premium Products", icon: productsIcon.url },
  { label: "Personalised Consultation", icon: consultationIcon.url },
  { label: "Flexible Appointments", icon: safeIcon.url },
  { label: "4.9 Google Rating", icon: consumerIcon.url },
];

const inr = (n: number) => n.toLocaleString("en-IN");

export function BranchPackages({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".pk-head, .pk-card, .pk-benefit", stagger: 0.12 });
  const wa = `https://wa.me/${branch.phone.replace(/\D/g, "")}`;

  return (
    <section id="packages" className="relative overflow-hidden bg-background py-24 md:py-[140px]">
      {/* decorative orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="floaty absolute -left-24 top-24 size-80 rounded-full bg-gold/20 blur-[110px]" />
        <div className="floaty absolute -right-16 bottom-10 size-96 rounded-full bg-gold/15 blur-[130px]" style={{ animationDelay: "2s" }} />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="pk-head mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-gold">Popular Packages</p>
          <h2 className="mt-2 font-semibold text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]">
            Luxury Hair &amp; Beauty Packages Crafted for Every Occasion
          </h2>
          <span className="mx-auto mt-5 block h-px w-24 origin-left bg-gold-gradient" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Choose from our professionally curated packages designed to give you premium salon experiences at{" "}
            {branch.city} with exceptional value.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <article
              key={p.name}
              className={cn(
                "pk-card group relative flex flex-col overflow-hidden rounded-[28px] border transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-4",
                p.featured
                  ? "border-gold/70 bg-ink text-cream shadow-gold lg:-mt-8 lg:mb-0"
                  : "border-gold/20 bg-card/70 backdrop-blur-xl shadow-luxe hover:border-gold/70 hover:shadow-gold",
              )}
            >
              {p.featured && (
                <span className="absolute right-0 top-6 z-20 rounded-l-full bg-gold-gradient px-4 py-1.5 font-button text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink">
                  Best Seller
                </span>
              )}

              <div className={cn("relative overflow-hidden", p.featured ? "h-56" : "h-44")}>
                <img
                  src={p.image}
                  alt={`${p.name} at SASS Hair & Beauty ${branch.city}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-gold-gradient px-3 py-1 font-button text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-ink shadow-gold">
                  {p.featured ? "Most Popular" : `Save ${Math.round((1 - p.price / p.original) * 100)}%`}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg leading-snug">{p.name}</h3>
                <p className={cn("mt-2 text-[0.78rem] leading-relaxed", p.featured ? "text-cream/70" : "text-muted-foreground")}>
                  {p.desc}
                </p>

                <ul className="mt-5 space-y-2">
                  {p.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.76rem] leading-snug">
                      <Check className="mt-[2px] size-3.5 shrink-0 text-gold" />
                      <span className={p.featured ? "text-cream/85" : "text-foreground/80"}>{i}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-gold">
                  <Clock className="size-3.5" /> {p.duration}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap items-end gap-2">
                    <span className="font-display text-3xl">₹{inr(p.price)}</span>
                    <span className={cn("pb-1 text-sm line-through", p.featured ? "text-cream/45" : "text-muted-foreground")}>
                      ₹{inr(p.original)}
                    </span>
                    <span className="mb-1 rounded-full border border-gold/50 px-2 py-0.5 font-button text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      Save {Math.round((1 - p.price / p.original) * 100)}%
                    </span>
                  </div>

                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 font-button text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-gold"
                  >
                    Book Package
                    <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/services"
                    className={cn(
                      "mt-3 block text-center font-button text-[0.58rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-gold",
                      p.featured ? "text-cream/60" : "text-muted-foreground",
                    )}
                  >
                    Know More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="pk-head mt-12 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-3.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition-[transform,box-shadow,color] duration-500 hover:-translate-y-1 hover:text-gold hover:shadow-gold"
          >
            <Sparkles className="size-3.5 text-gold" /> Explore All Packages
          </a>
        </div>

        {/* benefit strip */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-[28px] border border-gold/20 bg-card/60 p-8 backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((b) => (
            <div key={b.label} className="pk-benefit group flex flex-col items-center gap-3 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-ink ring-1 ring-gold/30 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:ring-gold">
                <img src={b.icon} alt="" aria-hidden className="size-7" loading="lazy" />
              </span>
              <p className="text-[0.72rem] font-medium leading-snug">{b.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-[0.72rem] text-muted-foreground">
          <Star className="size-3.5 fill-gold text-gold" /> Rated 4.9 by 5,000+ clients across Andhra Pradesh
        </p>
      </div>
    </section>
  );
}
