import { useState } from "react";
import {
  Star, Check, Instagram, Facebook, Phone, Mail, MapPin, Clock, Plus, MessageCircle, Navigation,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useReveal } from "@/lib/motion";
import { LuxeButton } from "../LuxeButton";
import { VjaHead as Head } from "./VjaServices";
import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";
import client3 from "@/assets/client-3.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import interior from "@/assets/interior.jpg";
import makeup from "@/assets/svc-makeup.jpg";
import colour from "@/assets/svc-colour.jpg";
import facial from "@/assets/svc-facial.jpg";

const PHONE = "+91 72868 11999";
const TEL = "tel:+917286811999";
const WA = "https://wa.me/917286811999";

/* -------- 10. Testimonials -------- */
const reviews = [
  { name: "Priya M.", area: "Vijayawada", image: client1, text: "The best salon experience I've ever had! The staff is so professional and my hair looks absolutely amazing." },
  { name: "Anusha R.", area: "Vijayawada", image: client2, text: "I got my bridal makeover here and it was beyond my expectations. Highly recommended!" },
  { name: "Kavya L.", area: "Vijayawada", image: client3, text: "Amazing skin treatment results! My skin feels so fresh and glowing. Thank you SASS!" },
  { name: "Sravani M.", area: "Vijayawada", image: client2, text: "Keratin treatment here changed my hair completely — smooth, shiny and frizz free for months." },
  { name: "Harika S.", area: "Vijayawada", image: client3, text: "Loved the hydra facial and the nail spa. Clean, luxurious and worth every rupee." },
  { name: "Divya P.", area: "Vijayawada", image: client1, text: "Laser sessions were comfortable and the team explained everything patiently. Great results." },
  { name: "Meghana T.", area: "Vijayawada", image: client3, text: "My global colour looks so natural. They matched it to my skin tone perfectly." },
  { name: "Lasya K.", area: "Vijayawada", image: client1, text: "Hygiene and ambience are top class. My go-to salon in Vijayawada now." },
  { name: "Sindhu V.", area: "Vijayawada", image: client2, text: "Booked a monthly membership — the value and the service quality are unmatched." },
];

function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 110"
      className={`h-24 w-14 text-gold ${flip ? "-scale-x-100" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M46 6C24 20 12 44 14 72c1 14 6 24 12 32" />
      {Array.from({ length: 7 }).map((_, i) => {
        const t = i / 6;
        const x = 46 - 32 * t * t - 2 * t;
        const y = 10 + 88 * t;
        return (
          <g key={i}>
            <path d={`M${x} ${y} c-10 -6 -16 -2 -18 4 c7 4 14 3 18 -4Z`} fill="currentColor" stroke="none" opacity="0.85" />
            <path d={`M${x} ${y} c-2 -10 -8 -13 -14 -11 c1 8 7 12 14 11Z`} fill="currentColor" stroke="none" opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
}

export function VjaTestimonials() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-card", stagger: 0.09 });
  const [page, setPage] = useState(0);
  const pages = Math.ceil(reviews.length / 3);
  const go = (d: number) => setPage((p) => (p + d + pages) % pages);

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1320px] px-6">
        <div className="v-head text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/60" />
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-gold">Testimonials</p>
            <span className="h-px w-12 bg-gold/60" />
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08]">
            What Our <span className="text-gold">Clients</span> Say
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Real stories from real people who trusted us with their beauty and confidence.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.78fr_2.22fr]">
          {/* Rating summary */}
          <div className="v-card flex flex-col items-center text-center">
            <div className="flex items-center justify-center">
              <Laurel />
              <div className="-mx-2">
                <p className="font-display text-[3.4rem] font-semibold leading-none">
                  4.9<span className="text-2xl font-normal text-muted-foreground">/5</span>
                </p>
                <div className="mt-3 flex justify-center gap-1.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}
                </div>
              </div>
              <Laurel flip />
            </div>
            <p className="mt-3 text-lg">
              <span className="font-semibold">1250+</span> Happy Clients
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-[18px] border border-gold/15 bg-card px-6 py-4 shadow-luxe">
              <svg viewBox="0 0 48 48" className="size-8 shrink-0" aria-hidden>
                <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.9-1.5 4.7-4.4 6.6l6.7 5.2C42.2 35.5 45 30.3 45 24z" />
                <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
                <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 9.9l7.1-5.5z" />
                <path fill="#EA4335" d="M24 10.6c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.4 29.9 2 24 2 15.4 2 8.1 6.9 4.4 14.1l7.1 5.5c1.8-5.3 6.7-9 12.5-9z" />
              </svg>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">
                  Rated <span className="font-semibold text-foreground">4.9/5</span> on Google
                </p>
                <div className="mt-1 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="relative px-2 sm:px-10">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}
              >
                {Array.from({ length: pages }).map((_, p) => (
                  <div key={p} className="grid w-full shrink-0 gap-6 px-1 py-2 md:grid-cols-3">
                    {reviews.slice(p * 3, p * 3 + 3).map(({ name, area, image, text }) => (
                      <article
                        key={name}
                        className="v-card group rounded-[16px] bg-card p-6 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] ring-1 ring-gold/10 transition-all duration-700 hover:-translate-y-2 hover:ring-gold/40"
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-display text-[2.6rem] leading-[0.8] text-gold/45">“</span>
                          <div className="mt-2 flex gap-1 text-gold">
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                          </div>
                        </div>
                        <div className="mt-3 flex items-start gap-4">
                          <img
                            src={image}
                            alt={`${name} — SASS Hair & Beauty Vijayawada client`}
                            loading="lazy"
                            className="size-[68px] shrink-0 rounded-full object-cover ring-2 ring-gold/30"
                          />
                          <p className="text-[0.8rem] leading-[1.7] text-muted-foreground">{text}</p>
                        </div>
                        <span className="mt-5 block h-px w-14 bg-gold/60" />
                        <div className="mt-4">
                          <p className="text-sm font-semibold">{name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{area}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button
              aria-label="Previous testimonials"
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-card text-foreground shadow-[0_10px_26px_-14px_rgba(0,0,0,0.5)] ring-1 ring-gold/15 transition-colors hover:bg-gold hover:text-ink"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              aria-label="Next testimonials"
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-card text-foreground shadow-[0_10px_26px_-14px_rgba(0,0,0,0.5)] ring-1 ring-gold/15 transition-colors hover:bg-gold hover:text-ink"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="mt-8 flex justify-center gap-2.5">
              {Array.from({ length: pages }).map((_, d) => (
                <button
                  key={d}
                  aria-label={`Go to testimonial slide ${d + 1}`}
                  onClick={() => setPage(d)}
                  className={`size-2.5 rounded-full transition-all duration-500 ${d === page ? "bg-gold" : "bg-gold/25"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* -------- 11. Packages & offers -------- */
const packages = [
  { name: "Hair Care Package", price: "₹2,499", copy: "Hair spa, Hair cut, Hair smoothening & more" },
  { name: "Skin Care Package", price: "₹3,499", copy: "Hydra facial, Clean up, Skin polishing & more" },
  { name: "Bridal Package", price: "₹15,999", copy: "HD makeup, Hairstyle, Saree draping & more" },
  { name: "Monthly Membership", price: "₹2,999", suffix: "/Month", copy: "Unlimited services with exclusive benefits" },
];

export function VjaPackages() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-card", stagger: 0.08 });
  return (
    <section className="bg-background py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1280px] px-6">
        <div className="v-head"><Head title="Packages & Offers" /></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map(({ name, price, suffix, copy }) => (
            <article
              key={name}
              className="v-card flex flex-col rounded-[14px] border border-gold/20 bg-card p-6 transition-all duration-700 hover:-translate-y-2 hover:border-gold hover:shadow-gold"
            >
              <h3 className="font-display text-lg">{name}</h3>
              <p className="mt-3 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">Starts from</p>
              <p className="mt-1 font-display text-3xl">
                {price}
                {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
              </p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
              <a
                href="#book"
                className="mt-6 inline-flex items-center justify-center rounded-[6px] bg-ink px-5 py-2.5 font-button text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-500 hover:-translate-y-1 hover:bg-gold-gradient hover:text-ink"
              >
                View Details
              </a>
            </article>
          ))}

          <article className="v-card relative overflow-hidden rounded-[14px] border border-gold/40 bg-ink p-7 text-center text-cream shadow-gold">
            <span className="floaty pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gold/20 blur-3xl" />
            <p className="relative font-display text-xl text-gold">Special Offer</p>
            <p className="relative mt-3 font-display text-4xl leading-none text-gold-gradient">20% OFF</p>
            <p className="relative mt-3 text-xs uppercase tracking-[0.16em] text-cream/70">On Your First Service</p>
            <a
              href="#book"
              className="relative mt-6 inline-flex rounded-[6px] bg-gold-gradient px-6 py-2.5 font-button text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:-translate-y-1"
            >
              Book Now
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------- 12. Experts -------- */
const experts = [
  { name: "Ramya Sri", role: "Senior Hair Stylist", cert: "L'Oréal Colour Certified", image: g1 },
  { name: "Kavya Nair", role: "Skin Expert", cert: "Advanced Aesthetics", image: facial },
  { name: "Meghana R.", role: "Beauty Therapist", cert: "Spa & Wellness Diploma", image: g2 },
  { name: "Pooja Sharma", role: "Makeup Artist", cert: "HD & Airbrush Pro", image: makeup },
];

export function VjaExperts() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-tile", stagger: 0.08 });
  return (
    <section className="bg-background py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6">
        <div className="v-head"><Head eyebrow="Meet Our Experts" title="The hands behind the" italic="transformations" /></div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map(({ name, role, cert, image }) => (
            <article key={name} className="v-tile group overflow-hidden rounded-[24px] border border-gold/20 bg-card transition-all duration-700 hover:-translate-y-2 hover:border-gold hover:shadow-gold">
              <div className="relative overflow-hidden">
                <img src={image} alt={`${name}, ${role} at SASS Vijayawada`} loading="lazy" className="aspect-4/5 w-full object-cover transition-transform duration-[1300ms] group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-3 bg-black/65 py-3 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0">
                  <Instagram className="size-4 text-gold" />
                  <Facebook className="size-4 text-gold" />
                  <MessageCircle className="size-4 text-gold" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg">{name}</h3>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-gold">{role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{cert}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 13. FAQ -------- */
export const vjaFaqs = [
  { q: "Where is the SASS Hair & Beauty clinic in Vijayawada located?", a: "We are on 2nd Floor, PVP Square, MG Road, Mogalrajapuram, Labbipet, Vijayawada 520010 — minutes from Benz Circle and easily reachable from Governorpet and Patamata." },
  { q: "Do I need an appointment?", a: "Walk-ins are welcome, but we recommend booking so your preferred stylist and consultation slot are reserved." },
  { q: "Which products do you use?", a: "Only globally certified professional brands including L'Oréal, Kérastase, Olaplex, Schwarzkopf and Wella." },
  { q: "How much does laser hair removal cost in Vijayawada?", a: "Pricing depends on the treatment area and sessions required. Your first consultation and patch test are complimentary." },
  { q: "Do you offer bridal packages?", a: "Yes — pre-bridal skin and hair programmes, HD and airbrush bridal makeup, reception and engagement looks with a dedicated bridal suite." },
];

export function VjaFAQ() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-faq", stagger: 0.07 });
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-cream py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-[900px] px-6">
        <div className="v-head"><Head eyebrow="FAQ" title="Questions, answered" /></div>
        <div className="mt-12 space-y-4">
          {vjaFaqs.map(({ q, a }, i) => {
            const active = open === i;
            return (
              <div
                key={q}
                className={`v-faq overflow-hidden rounded-[24px] border bg-card transition-all duration-500 ${
                  active ? "border-gold shadow-gold" : "border-gold/20 hover:-translate-y-1 hover:border-gold/60"
                }`}
              >
                <button
                  onClick={() => setOpen(active ? null : i)}
                  aria-expanded={active}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 font-button text-[0.6rem] transition-all duration-500 ${active ? "bg-gold-gradient text-ink" : "text-gold"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-base md:text-lg">{q}</span>
                  <Plus className={`size-4 shrink-0 text-gold transition-transform duration-500 ${active ? "rotate-135" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pl-19 text-sm leading-relaxed text-muted-foreground">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------- 14. Blogs -------- */
const blogs = [
  { title: "Keratin vs Smoothening: which suits Vijayawada humidity?", cat: "Hair Care", date: "12 Jul 2026", image: colour },
  { title: "The 90-day pre-bridal skin calendar our brides follow", cat: "Bridal", date: "28 Jun 2026", image: makeup },
  { title: "Is laser hair removal safe? A clinician explains", cat: "Skin & Laser", date: "09 Jun 2026", image: facial },
];

export function VjaBlogs() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-tile", stagger: 0.09 });
  return (
    <section className="bg-background py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6">
        <div className="v-head"><Head eyebrow="Latest Blogs" title="Beauty notes from our" italic="studio" /></div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {blogs.map(({ title, cat, date, image }) => (
            <article key={title} className="v-tile group overflow-hidden rounded-[24px] border border-gold/20 bg-card transition-all duration-700 hover:-translate-y-2 hover:border-gold hover:shadow-gold">
              <div className="overflow-hidden">
                <img src={image} alt={title} loading="lazy" className="aspect-16/10 w-full object-cover transition-transform duration-[1300ms] group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.2em] text-gold">
                  <span>{cat}</span><span className="size-1 rounded-full bg-gold/50" /><span className="text-muted-foreground">{date}</span>
                </div>
                <h3 className="mt-4 font-display text-lg leading-snug">{title}</h3>
                <span className="link-underline mt-4 inline-block font-button text-[0.62rem] uppercase tracking-[0.2em] text-gold">Read More</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 15. Service areas -------- */
const areas = ["Benz Circle", "Labbipet", "Governorpet", "Patamata", "Poranki", "Kanuru", "Moghalrajpuram", "Salon Near Me"];

export function VjaAreas() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-head, .v-card, .v-map", stagger: 0.05 });
  return (
    <section className="bg-cream py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6">
        <div className="v-head"><Head eyebrow="Service Areas" title="Serving all of" italic="Vijayawada" /></div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid grid-cols-2 gap-4 self-start">
            {areas.map((a) => (
              <div key={a} className="v-card group flex items-center gap-3 rounded-[24px] border border-gold/20 bg-card px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-gold">
                <MapPin className="size-4 shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" />
                <span className="text-xs font-medium">{a}</span>
              </div>
            ))}
          </div>
          <div className="v-map overflow-hidden rounded-[24px] border border-gold/25 shadow-luxe">
            <iframe
              title="SASS Hair & Beauty Vijayawada service area map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61207.488515262055!2d80.56650304863281!3d16.502452700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fbe0e42abaa1%3A0xc9060a3286b543a7!2sSASS%20hair%20and%20beauty!5e0!3m2!1sen!2sin!4v1786008105215!5m2!1sen!2sin"
              loading="lazy"
              className="h-[420px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- 16. Book appointment -------- */
const serviceOptions = ["Hair Cut & Styling", "Hair Colour", "Keratin / Smoothening", "Hydra / Medi Facial", "Laser Treatment", "Bridal Makeup", "Nails & Spa"];

export function VjaBooking() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-col", stagger: 0.12 });
  const [form, setForm] = useState({ name: "", phone: "", service: serviceOptions[0], date: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello SASS Vijayawada,%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0APreferred date: ${form.date}%0A%0A${form.message}`;
    window.open(`${WA}?text=${text}`, "_blank");
  };

  const field = "w-full rounded-[14px] border border-gold/25 bg-black/25 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold";

  return (
    <section id="book" className="relative overflow-hidden bg-ink py-16 text-cream md:py-20">
      <span className="floaty pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-gold/10 blur-[140px]" />
      <div ref={ref} className="relative mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div className="v-col">
          <h2 className="font-display text-xl text-gold">Book Your Appointment</h2>
          <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
            <input required placeholder="Your Name*" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="tel" placeholder="Phone Number*" className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select className={field} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              {serviceOptions.map((s) => <option key={s} className="text-ink">{s}</option>)}
            </select>
            <input type="date" className={field} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <input type="time" className={`${field} sm:col-span-2`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center rounded-[6px] bg-gold-gradient px-8 py-3 font-button text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-500 hover:-translate-y-1"
            >
              Book Appointment
            </button>
          </form>
        </div>

        <div className="v-col lg:border-l lg:border-gold/20 lg:pl-8">
          <h3 className="font-display text-lg text-gold">Or Book via WhatsApp</h3>
          <div className="mt-5 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#25D366] text-ink">
              <MessageCircle className="size-5" />
            </span>
            <p className="text-xs leading-relaxed text-cream/65">Get instant confirmation on WhatsApp</p>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-[6px] bg-[#25D366] px-5 py-2.5 font-button text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:-translate-y-1"
          >
            <MessageCircle className="size-4" /> Chat on WhatsApp
          </a>
        </div>

        <div className="v-col lg:border-l lg:border-gold/20 lg:pl-8">
          <h3 className="font-display text-lg text-gold">Call Us Now</h3>
          <div className="mt-5 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-ink">
              <Phone className="size-4" />
            </span>
            <p className="text-xs leading-relaxed text-cream/65">Speak to our experts now</p>
          </div>
          <a
            href={TEL}
            className="mt-5 inline-flex items-center gap-2 rounded-[6px] border border-gold/50 px-5 py-2.5 font-button text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-500 hover:-translate-y-1 hover:bg-gold-gradient hover:text-ink"
          >
            <Phone className="size-4" /> {PHONE}
          </a>
        </div>

        <div className="v-col lg:border-l lg:border-gold/20 lg:pl-8">
          <h3 className="font-display text-lg text-gold">Clinic Timings</h3>
          <ul className="mt-5 space-y-2 text-xs text-cream/70">
            <li className="flex justify-between gap-4"><span>Monday – Saturday</span><span>10:00 AM – 9:00 PM</span></li>
            <li className="flex justify-between gap-4"><span>Sunday</span><span>10:00 AM – 8:00 PM</span></li>
          </ul>
          <p className="mt-5 flex items-center gap-2 text-xs text-cream/50"><Clock className="size-4 text-gold" /> We are open all 7 days a week</p>
          <p className="mt-1 text-xs text-cream/50">Book your slot now!</p>
        </div>
      </div>
    </section>
  );
}

/* -------- 17. Location strip -------- */
export function VjaContact() {
  const ref = useReveal<HTMLDivElement>({ selector: ".v-col", stagger: 0.1 });
  return (
    <section className="bg-ink pb-16 text-cream">
      <div ref={ref} className="mx-auto grid max-w-[1280px] gap-10 border-t border-gold/15 px-6 pt-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="v-col grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-lg text-gold">Our Location</h3>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-cream/65">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              MG Road, Labbipet, Vijayawada – 520010, Andhra Pradesh, India
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=MG+Road+Labbipet+Vijayawada"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-[6px] border border-gold/50 px-5 py-2.5 font-button text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-500 hover:-translate-y-1 hover:bg-gold-gradient hover:text-ink"
            >
              <Navigation className="size-3.5" /> View on Map
            </a>
          </div>
          <div className="overflow-hidden rounded-[10px] border border-gold/25">
            <iframe
              title="SASS Hair & Beauty Vijayawada location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61207.488515262055!2d80.56650304863281!3d16.502452700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fbe0e42abaa1%3A0xc9060a3286b543a7!2sSASS%20hair%20and%20beauty!5e0!3m2!1sen!2sin!4v1786008105215!5m2!1sen!2sin"
              loading="lazy"
              className="h-40 w-full"
            />
          </div>
        </div>

        <div className="v-col">
          <h3 className="font-display text-lg text-gold">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-xs text-cream/65">
            <li className="flex items-center gap-2"><Phone className="size-4 text-gold" /><a href={TEL} className="link-underline">{PHONE}</a></li>
            <li className="flex items-center gap-2"><Phone className="size-4 text-gold" /><a href="tel:+918907111999" className="link-underline">+91 89071 11999</a></li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-gold" /><a href="mailto:hello@sasshairbeauty.in" className="link-underline">hello@sasshairbeauty.in</a></li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-gold" /><a href="mailto:info@sasshairbeauty.in" className="link-underline">info@sasshairbeauty.in</a></li>
          </ul>
        </div>

        <div className="v-col">
          <h3 className="font-display text-lg text-gold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
              <span key={i} className="grid size-9 place-items-center rounded-full border border-gold/30 text-gold transition-transform duration-500 hover:-translate-y-1 hover:border-gold">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-cream/55">
            Stay connected for latest offers and updates!
          </p>
        </div>
      </div>
    </section>
  );
}
