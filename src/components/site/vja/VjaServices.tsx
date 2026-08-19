import { useState } from "react";
import {
  BadgeCheck, Sparkles, Cpu, Wallet, MessageCircle, ShieldCheck,
  ArrowRight, ChevronLeft, ChevronRight, UserRound, ScanSearch, Wand2, HeartHandshake, CalendarCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "@/lib/motion";
import haircut from "@/assets/svc-haircut.jpg";
import hairspa from "@/assets/svc-hairspa.jpg";
import colour from "@/assets/svc-colour.jpg";
import smoothening from "@/assets/svc-smoothening.jpg";
import facial from "@/assets/svc-facial.jpg";
import makeup from "@/assets/svc-makeup.jpg";
import bridal from "@/assets/svc-bridal.jpg";
import manicure from "@/assets/svc-manicure.jpg";
import threading from "@/assets/svc-threading.jpg";
import interior from "@/assets/interior.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";

function Head({ eyebrow, title, italic, copy, light }: { eyebrow?: string; title: string; italic?: string; copy?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="section-eyebrow text-gold">{eyebrow}</p>}
      <div className="flex items-center justify-center gap-4">
        <span className="hidden h-px w-14 bg-gold/50 sm:block" />
        <h2 className={`font-semibold text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.1] ${light ? "text-cream" : ""}`}>
          {title} {italic && <span className="italic text-gold-gradient">{italic}</span>}
        </h2>
        <span className="hidden h-px w-14 bg-gold/50 sm:block" />
      </div>
      {copy && <p className={`mt-4 text-sm leading-relaxed ${light ? "text-cream/65" : "text-muted-foreground"}`}>{copy}</p>}
    </div>
  );
}

/* -------- 2. Why choose — single horizontal row with dividers -------- */
const why: { Icon: LucideIcon; title: string; copy: string }[] = [
  { Icon: BadgeCheck, title: "Certified Professionals", copy: "Expert & experienced beauty specialists" },
  { Icon: Sparkles, title: "Premium Products", copy: "We use top-quality, international brands" },
  { Icon: Cpu, title: "Modern Equipment", copy: "Advanced technology for best results" },
  { Icon: MessageCircle, title: "Personalized Consultation", copy: "Customized treatments for your unique needs" },
  { Icon: Wallet, title: "Affordable Pricing", copy: "Luxury services at reasonable prices" },
  { Icon: ShieldCheck, title: "Hygienic Environment", copy: "Clean, safe & sanitized clinic" },
];

export function VjaWhy() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-card", stagger: 0.07 });
  return (
    <section className="bg-cream py-16 md:py-20">
      <div ref={ref} className="mx-auto max-w-[1280px] px-6">
        <div className="v-head">
          <h2 className="text-center font-semibold text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.1]">
            Why Choose Our Hair &amp; Beauty Clinic?
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {why.map(({ Icon, title, copy }, i) => (
            <div
              key={title}
              className={`v-card group px-4 text-center ${i ? "lg:border-l lg:border-gold/25" : ""}`}
            >
              <Icon className="mx-auto size-8 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.2} />
              <h3 className="mt-4 font-button text-[0.72rem] font-semibold uppercase tracking-[0.08em]">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 3. Services — 8 dark image cards with service lists -------- */
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

export function VjaServiceGrid() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-tile", stagger: 0.05 });
  return (
    <section id="services" className="bg-background py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1280px] px-6">
        <div className="v-head"><Head title="Our Services" /></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map(({ title, image, items, more }) => (
            <article
              key={title}
              className="v-tile group relative flex overflow-hidden rounded-[10px] bg-ink text-cream shadow-luxe transition-[transform,box-shadow] duration-700 hover:-translate-y-2 hover:shadow-gold"
            >
              <div className="relative w-[38%] shrink-0 overflow-hidden">
                <img
                  src={image}
                  alt={`${title} in Vijayawada at SASS Hair & Beauty`}
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

/* -------- 4. Process — horizontal steps with arrows -------- */
const steps: { Icon: LucideIcon; title: string; copy: string }[] = [
  { Icon: UserRound, title: "Consultation", copy: "Understanding your needs" },
  { Icon: ScanSearch, title: "Analysis", copy: "Skin & hair analysis" },
  { Icon: Wand2, title: "Personalized Treatment", copy: "Tailored treatment for you" },
  { Icon: HeartHandshake, title: "Aftercare Guidance", copy: "Tips for better results" },
  { Icon: CalendarCheck, title: "Follow-Up Support", copy: "We care even after treatment" },
];

export function VjaProcess() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-step", stagger: 0.09 });
  return (
    <section className="bg-cream py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6">
        <div className="v-head"><Head title="Our Treatment Process" /></div>
        <div className="mt-14 flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {steps.map(({ Icon, title, copy }, i) => (
            <div key={title} className="v-step flex items-center gap-6">
              <div className="group max-w-[10rem] text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full border border-gold/45 text-gold transition-all duration-700 group-hover:-translate-y-1 group-hover:border-gold group-hover:shadow-gold">
                  <Icon className="size-6" strokeWidth={1.2} />
                </span>
                <h3 className="mt-4 font-button text-[0.72rem] font-semibold uppercase tracking-[0.08em]">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{copy}</p>
              </div>
              {i < steps.length - 1 && <ArrowRight className="hidden size-5 shrink-0 text-gold/60 md:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 5. Before / after gallery with category tabs -------- */
const gallery: Record<string, { before: string; after: string }[]> = {
  "Hair Transformations": [
    { before, after }, { before: hairspa, after: colour }, { before: smoothening, after: haircut }, { before: g2, after: g1 },
  ],
  "Skin Treatments": [
    { before: facial, after: g1 }, { before: g2, after: facial }, { before: interior, after: facial }, { before: facial, after: g2 },
  ],
  "Bridal Makeovers": [
    { before: makeup, after: bridal }, { before: bridal, after: makeup }, { before: g1, after: bridal }, { before: makeup, after: bridal },
  ],
  "Laser Results": [
    { before: threading, after: facial }, { before: facial, after: threading }, { before: g2, after: facial }, { before: threading, after: g1 },
  ],
  "Nail Art Gallery": [
    { before: manicure, after: makeup }, { before: makeup, after: manicure }, { before: manicure, after: g2 }, { before: g1, after: manicure },
  ],
};
const tabs = Object.keys(gallery);
type Pair = { before: string; after: string };

export function VjaBeforeAfter() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-tile", stagger: 0.07 });
  const [tab, setTab] = useState<string>(tabs[0] as string);
  const items: Pair[] = gallery[tab] ?? [];
  const shift = (dir: number) => {
    const i = (tabs.indexOf(tab) + dir + tabs.length) % tabs.length;
    setTab(tabs[i] as string);
  };

  return (
    <section className="bg-background py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1280px] px-6">
        <div className="v-head"><Head title="Before & After Gallery" /></div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 font-button text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-all duration-500 ${
                t === tab ? "bg-gold-gradient text-ink shadow-gold" : "border border-gold/30 text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            aria-label="Previous category"
            onClick={() => shift(-1)}
            className="hidden size-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink transition-transform duration-500 hover:-translate-x-1 md:grid"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((pair: Pair, i: number) => (
              <article key={i} className="v-tile group overflow-hidden rounded-[14px] border border-gold/20 shadow-luxe">
                <div className="grid grid-cols-2">
                  {[["Before", pair.before], ["After", pair.after]].map(([label, src]) => (
                    <div key={label} className="relative">
                      <img src={src} alt={`${tab} ${label}`} loading="lazy" className="aspect-3/4 w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <span className={`absolute inset-x-0 bottom-0 py-1.5 text-center font-button text-[0.52rem] uppercase tracking-[0.2em] ${
                        label === "After" ? "bg-gold text-ink" : "bg-black/75 text-cream"
                      }`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <button
            aria-label="Next category"
            onClick={() => shift(1)}
            className="hidden size-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink transition-transform duration-500 hover:translate-x-1 md:grid"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#book"
            className="rounded-[6px] border border-gold/40 px-6 py-2.5 font-button text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-500 hover:-translate-y-1 hover:bg-gold-gradient hover:text-ink"
          >
            View All Gallery
          </a>
        </div>
      </div>
    </section>
  );
}

export { Head as VjaHead };
