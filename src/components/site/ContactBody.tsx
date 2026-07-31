import { useState, type FormEvent } from "react";
import { User, Mail, Phone, PenLine, ArrowRight, MapPin, CalendarDays, Sparkles } from "lucide-react";
import { toast } from "sonner";
import salonInterior from "@/assets/salon-interior.jpg";
import { LuxeButton } from "./LuxeButton";

const LOCATIONS = [
  {
    city: "Vijayawada",
    lines: ["Door No 40-14-8, 1st Floor,", "M.G Road, Vijayawada,", "Andhra Pradesh - 520010"],
  },
  {
    city: "Guntur",
    lines: ["3rd Floor, Brodipet,", "Near Main Road, Guntur,", "Andhra Pradesh - 522002"],
  },
  {
    city: "Rajahmundry",
    lines: ["2nd Floor, Main Road,", "Kakinada Bypass, Rajahmundry,", "Andhra Pradesh - 533101"],
  },
];

const PINS = [
  { city: "Guntur", left: "26%", top: "62%" },
  { city: "Vijayawada", left: "52%", top: "44%" },
  { city: "Rajahmundry", left: "78%", top: "24%" },
];

function GoldHeading({ children }: { children: string }) {
  return (
    <div className="reveal flex items-center gap-4">
      <h2 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.14em] text-gilded sm:text-2xl">
        {children}
      </h2>
      <Sparkles className="size-4 shrink-0 text-gold" aria-hidden />
      <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
    </div>
  );
}

const inputCls =
  "peer w-full rounded-xl border border-gold/20 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-ivory placeholder:text-ivory/35 transition-all duration-300 focus:border-gold/70 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-gold/25";

export function ContactBody() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      toast.success("Message sent — our team will reach out shortly.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section className="relative bg-black py-20 sm:py-24">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Form */}
          <div className="reveal-left">
            <GoldHeading>Send Us a Message</GoldHeading>
            <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/60 transition-colors peer-focus:text-gold" aria-hidden />
                <input required maxLength={100} name="name" placeholder="Your Name" aria-label="Your Name" className={inputCls} />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/60" aria-hidden />
                <input required type="email" maxLength={255} name="email" placeholder="Your Email" aria-label="Your Email" className={inputCls} />
              </div>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/60" aria-hidden />
                <input required maxLength={20} name="phone" placeholder="Your Phone" aria-label="Your Phone" className={inputCls} />
              </div>
              <div className="relative">
                <PenLine className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/60" aria-hidden />
                <input maxLength={120} name="subject" placeholder="Subject" aria-label="Subject" className={inputCls} />
              </div>
              <div className="relative sm:col-span-2">
                <PenLine className="pointer-events-none absolute left-4 top-4 size-4 text-gold/60" aria-hidden />
                <textarea
                  required
                  maxLength={1000}
                  name="message"
                  rows={6}
                  placeholder="Your Message"
                  aria-label="Your Message"
                  className={`${inputCls} resize-y pt-3.5`}
                />
              </div>
              <div className="sm:col-span-2">
                <LuxeButton type="submit" disabled={sending} className="group">
                  {sending ? "Sending…" : "Send Message"}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </LuxeButton>
              </div>
            </form>
          </div>

          {/* Locations */}
          <div className="reveal-right">
            <GoldHeading>Our Salon Locations</GoldHeading>
            <ul className="mt-8 space-y-4">
              {LOCATIONS.map((loc, i) => (
                <li
                  key={loc.city}
                  className="reveal lift-card group flex items-center gap-5 rounded-2xl border border-gold/20 bg-white/[0.03] p-4 backdrop-blur-md"
                  style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                >
                  <div className="zoom-frame size-24 shrink-0 overflow-hidden rounded-xl border border-gold/25">
                    <img src={salonInterior} alt={`SASS salon interior in ${loc.city}`} className="size-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.2em] text-gold">{loc.city}</p>
                    {loc.lines.map((l) => (
                      <p key={l} className="text-xs leading-relaxed text-ivory/60">{l}</p>
                    ))}
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${loc.city} on Google Maps`}
                    className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-black transition-transform duration-300 group-hover:scale-110"
                  >
                    <MapPin className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map band */}
        <div className="reveal mt-14 overflow-hidden rounded-3xl border border-gold/20">
          <div className="relative grid gap-8 bg-[radial-gradient(120%_120%_at_80%_20%,oklch(0.16_0.02_95)_0%,oklch(0.05_0_0)_70%)] p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.12em] text-gilded">Find Us Easily</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
                Visit our nearest SASS Hair &amp; Beauty salon and experience the luxury.
              </p>
              <LuxeButton
                className="group mt-6"
                onClick={() => window.open("https://maps.google.com", "_blank", "noopener")}
              >
                View on Google Map
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </LuxeButton>
            </div>
            <div className="relative min-h-56 overflow-hidden rounded-2xl border border-gold/15 bg-[linear-gradient(115deg,oklch(0.11_0_0),oklch(0.06_0_0))]">
              <svg aria-hidden className="absolute inset-0 size-full opacity-25" viewBox="0 0 400 200" preserveAspectRatio="none">
                {Array.from({ length: 9 }).map((_, i) => (
                  <path key={`h${i}`} d={`M0 ${i * 25 + 8} Q 200 ${i * 25 - 6} 400 ${i * 25 + 14}`} stroke="oklch(0.775 0.128 88 / 0.45)" fill="none" strokeWidth="0.6" />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <path key={`v${i}`} d={`M${i * 30 + 6} 0 Q ${i * 30 + 18} 100 ${i * 30 - 4} 200`} stroke="oklch(0.775 0.128 88 / 0.3)" fill="none" strokeWidth="0.5" />
                ))}
              </svg>
              {PINS.map((pin, i) => (
                <div
                  key={pin.city}
                  className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
                  style={{ left: pin.left, top: pin.top }}
                >
                  <span className="float-shape flex size-8 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-black shadow-gold" style={{ animationDelay: `${i * 700}ms` }}>
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold">{pin.city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking band */}
        <div className="reveal relative mt-8 overflow-hidden rounded-3xl border border-gold/20">
          <img src={salonInterior} alt="" aria-hidden className="absolute inset-0 size-full object-cover opacity-25" loading="lazy" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
          <div className="relative flex flex-col items-center gap-6 p-8 text-center sm:p-10 lg:flex-row lg:text-left">
            <span className="float-shape flex size-20 shrink-0 items-center justify-center rounded-full border border-gold/50">
              <CalendarDays className="size-8 text-gold" aria-hidden />
            </span>
            <div className="lg:flex-1">
              <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.1em] text-gilded sm:text-3xl">
                Ready to Look Your Best?
              </h2>
              <p className="mt-2 font-[family-name:var(--font-serif-alt)] text-xl italic text-ivory/80">
                Book your appointment today!
              </p>
            </div>
            <LuxeButton className="group">
              Book Appointment Now
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </LuxeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
