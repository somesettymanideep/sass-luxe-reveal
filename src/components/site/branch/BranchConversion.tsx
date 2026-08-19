import { useState, type FormEvent } from "react";
import {
  Check, Clock, Mail, MapPin, Navigation, Phone, MessageCircle, Car, Landmark, Plus,
} from "lucide-react";
import { useReveal } from "@/lib/motion";
import { LuxeButton } from "../LuxeButton";
import type { Branch } from "@/lib/branches";
import { branches } from "@/lib/branches";
import faqImage from "@/assets/best_hair_and_beauty_clinic.png.asset.json";

const serviceOptions = [
  "Hair Cut", "Hair Styling", "Threading", "Fashion Colours", "Hair Smoothening",
  "Keratin Treatment", "Hair Spa", "Facials", "Pedicure", "Manicure",
  "Bridal Makeup", "Party Makeup", "Advanced Hair Treatments",
];

const benefits = ["Free Hair Analysis", "Skin Consultation", "Bridal Consultation", "Hair Treatment Guidance"];

/* ---------------- Section 7 — Free Consultation ---------------- */

export function BranchConsultation({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".bc-item", stagger: 0.12 });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get("name") || "").trim() || !String(data.get("phone") || "").trim()) {
      setError("Please share your name and phone number.");
      setTimeout(() => setError(""), 1600);
      return;
    }
    setState("loading");
    setTimeout(() => setState("done"), 1100);
  };

  const field =
    "peer w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm outline-none transition-[border-color,box-shadow] duration-400 focus:border-gold focus:shadow-gold";
  const label =
    "pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.6rem] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.6rem]";
  const selectCls =
    "w-full appearance-none rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm outline-none transition-[border-color,box-shadow] duration-400 focus:border-gold focus:shadow-gold";
  const staticLabel = "pointer-events-none absolute left-4 top-2 text-[0.6rem] uppercase tracking-[0.16em] text-gold";

  return (
    <section id="consultation" className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto grid max-w-[1400px] items-start gap-10 px-6 lg:grid-cols-2 lg:px-10">
        <div className="bc-item lg:sticky lg:top-28">
          <p className="section-eyebrow text-gold">Free Consultation</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">
            Book your free <span className="italic text-gold-gradient">consultation</span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Meet our expert stylists at {branch.city} and receive personalised recommendations
            for your perfect look.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-[18px] border border-gold/20 bg-card/70 p-4 backdrop-blur-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="text-sm text-foreground/75">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <LuxeButton as="a" href={`tel:${branch.phone.replace(/\s/g, "")}`}>
              Book Consultation
            </LuxeButton>
          </div>
        </div>

        <div className="bc-item rounded-[24px] border border-gold/20 bg-card p-8 shadow-luxe md:p-10">
          <form onSubmit={submit} noValidate className={`grid gap-4 md:grid-cols-2 ${error ? "shake" : ""}`}>
            <div className="relative">
              <input name="name" placeholder=" " className={field} />
              <span className={label}>Full name</span>
            </div>
            <div className="relative">
              <input name="phone" inputMode="tel" placeholder=" " className={field} />
              <span className={label}>Phone number</span>
            </div>
            <div className="relative md:col-span-2">
              <input name="email" type="email" placeholder=" " className={field} />
              <span className={label}>Email address</span>
            </div>
            <div className="relative">
              <select name="service" className={selectCls}>
                {serviceOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <span className={staticLabel}>Select service</span>
            </div>
            <div className="relative">
              <select name="location" defaultValue={branch.city} className={selectCls}>
                {branches.map((b) => <option key={b.slug}>{b.city}</option>)}
              </select>
              <span className={staticLabel}>Location</span>
            </div>
            <div className="relative">
              <input name="date" type="date" className={selectCls} />
              <span className={staticLabel}>Preferred date</span>
            </div>
            <div className="relative">
              <input name="time" type="time" className={selectCls} />
              <span className={staticLabel}>Preferred time</span>
            </div>
            <div className="relative md:col-span-2">
              <textarea name="message" rows={4} placeholder=" " className={field} />
              <span className={label}>Message</span>
            </div>
            {error && <p className="text-xs text-destructive md:col-span-2">{error}</p>}
            <div className="md:col-span-2">
              <LuxeButton type="submit" className="w-full py-4" disabled={state !== "idle"}>
                {state === "idle" && "Book Appointment"}
                {state === "loading" && "Sending…"}
                {state === "done" && (
                  <span className="inline-flex items-center gap-2"><Check className="size-4" /> Request received</span>
                )}
              </LuxeButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 8 — Location & Map ---------------- */

export function BranchLocation({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".bl-item", stagger: 0.12 });
  const tel = branch.phone.replace(/\s/g, "");
  const wa = tel.replace(/\D/g, "");

  return (
    <section id="location" className="bg-cream py-20 md:py-28">
      <div ref={ref} className="mx-auto grid max-w-[1400px] gap-8 px-6 lg:grid-cols-2 lg:px-10">
        <div className="bl-item overflow-hidden rounded-[24px] border border-gold/25 bg-background shadow-luxe">
          <iframe
            title={`Map of SASS Hair & Beauty ${branch.city}`}
            src={branch.mapEmbed}
            loading="lazy"
            className="h-[340px] w-full md:h-[420px]"
          />
          <div className="grid gap-3 p-6 sm:grid-cols-2">
            <p className="flex items-center gap-2.5 text-sm text-foreground/75">
              <Car className="size-4 text-gold" /> Parking available on site
            </p>
            <p className="flex items-center gap-2.5 text-sm text-foreground/75">
              <Landmark className="size-4 text-gold" /> Close to {branch.q.split(" ")[0]} landmark
            </p>
          </div>
        </div>

        <div className="bl-item rounded-[24px] border border-gold/25 bg-ink p-8 shadow-luxe md:p-10">
          <p className="section-eyebrow text-gold">Visit Us</p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] text-cream">
            SASS Hair &amp; Beauty — {branch.city}
          </h2>
          <div className="mt-8 space-y-4">
            <p className="flex items-start gap-3 text-sm text-cream/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {branch.address}
            </p>
            <p className="flex items-center gap-3 text-sm text-cream/75">
              <Clock className="size-4 shrink-0 text-gold" /> {branch.hours}
            </p>
            <p className="flex items-center gap-3 text-sm text-cream/75">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${tel}`} className="link-underline text-cream">{branch.phone}</a>
            </p>
            <p className="flex items-center gap-3 text-sm text-cream/75">
              <MessageCircle className="size-4 shrink-0 text-gold" />
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="link-underline text-cream">
                WhatsApp us
              </a>
            </p>
            <p className="flex items-center gap-3 text-sm text-cream/75">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${branch.email}`} className="link-underline text-cream">{branch.email}</a>
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.q)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 font-button text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:-translate-y-1"
            >
              <Navigation className="size-3.5" /> Get directions
            </a>
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-6 py-3 font-button text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <Phone className="size-3.5" /> Call now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 9 — FAQ ---------------- */

function branchFaqs(branch: Branch) {
  return [
    {
      q: `What services are available at SASS ${branch.city}?`,
      a: `Our ${branch.city} branch offers precision hair cuts and styling, global colour and balayage, keratin, botox and smoothening, hair spa and advanced scalp treatments, facials and skin care, bridal and party makeup, threading, and manicure & pedicure.`,
    },
    {
      q: `How do I book an appointment at ${branch.city}?`,
      a: `Use the consultation form on this page, call ${branch.phone}, or message us on WhatsApp. Our ${branch.city} front desk confirms most slots within the hour.`,
    },
    {
      q: `Where exactly is the ${branch.city} salon located?`,
      a: `${branch.address}. Parking is available on site and the salon is easy to reach from the main road — tap "Get directions" above for live navigation.`,
    },
    {
      q: `What are the working hours in ${branch.city}?`,
      a: `${branch.hours}. Weekends and muhurtham season fill fast, so we recommend booking your slot a few days ahead.`,
    },
    {
      q: `Do you offer bridal makeup and packages at ${branch.city}?`,
      a: `Yes. HD and airbrush bridal makeup, saree draping, bridal hairstyling, trials and on-location service are all available, along with pre-bridal skin and hair packages.`,
    },
    {
      q: "Which brands and products do you use?",
      a: "L'Oréal Professionnel, Schwarzkopf, Wella, Matrix, Kérastase and Olaplex bond protection with every colour and chemical service.",
    },
    {
      q: "Is the consultation free?",
      a: `Every service at ${branch.city} starts with a complimentary consultation covering hair analysis, scalp and skin condition, face shape and lifestyle before we recommend anything.`,
    },
  ];
}

export function BranchFAQ({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".bf-item, .bf-head, .bf-image", stagger: 0.07 });
  const [open, setOpen] = useState<number | null>(0);
  const faqs = branchFaqs(branch);

  return (
    <section className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="bf-head mb-10 lg:mb-14">
          <p className="section-eyebrow text-gold">FAQ</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4vw,3rem)] leading-[1.06]">
            {branch.city} — questions, answered
          </h2>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="bf-image mx-auto w-full max-w-md lg:max-w-none lg:sticky lg:top-28">
            <img
              src={faqImage.url}
              alt={`SASS Hair & Beauty ${branch.city} signature services`}
              loading="lazy"
              width={1080}
              height={1080}
              className="w-full rounded-[7px] shadow-luxe"
            />
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={f.q}
                  className={`bf-item group relative overflow-hidden rounded-[7px] border border-gold/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/30 hover:shadow-luxe ${isOpen ? "shadow-luxe" : ""}`}
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-[3px] bg-gold-gradient transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                  />
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 px-5 py-4 text-left sm:px-6"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border font-button text-xs font-semibold tracking-wider transition-all duration-500 sm:size-11 ${
                        isOpen
                          ? "border-gold bg-gold text-black"
                          : "border-gold/25 bg-cream text-gold group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-black"
                      }`}
                    >
                      {num}
                    </span>
                    <span className="flex-1 font-display text-base sm:text-lg md:text-xl">{f.q}</span>
                    <Plus className={`size-5 shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-135" : "group-hover:rotate-90"}`} />
                  </button>
                  <div
                    className="grid transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden px-5 sm:px-6">
                      <div className="border-t border-gold/10 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 10 — Final CTA ---------------- */

export function BranchCTA({ branch }: { branch: Branch }) {
  const ref = useReveal<HTMLDivElement>({ selector: ".bcta-item", stagger: 0.1 });
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />
      <div ref={ref} className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="bcta-item text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05]">
          Ready for your <span className="italic text-gold-gradient">beauty transformation?</span>
        </h2>
        <p className="bcta-item mt-5 text-sm leading-relaxed text-cream/70 md:text-base">
          Experience premium salon services from Andhra Pradesh&apos;s trusted beauty destination.
        </p>
        <div className="bcta-item mt-9 flex flex-wrap justify-center gap-4">
          <LuxeButton as="a" href="#consultation">Book Appointment</LuxeButton>
          <a
            href={`tel:${branch.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-7 py-3.5 font-button text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
          >
            <Phone className="size-3.5" /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
