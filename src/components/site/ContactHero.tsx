import { Phone, MessageCircle, Mail, Clock, Crown } from "lucide-react";
import heroStyling from "@/assets/hero-styling.jpg";

const INFO = [
  {
    icon: Phone,
    label: "Call Us",
    lines: ["+91 91234 56789", "+91 91234 56790"],
    href: "tel:+919123456789",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    lines: ["+91 91234 56789"],
    href: "https://wa.me/919123456789",
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["info@sasshairbeauty.com"],
    href: "mailto:info@sasshairbeauty.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    lines: ["Mon - Sat: 9:00 AM - 9:00 PM", "Sunday: 9:00 AM - 8:00 PM"],
  },
];

export function ContactHero() {
  return (
    <section className="surface-noir relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="float-shape absolute left-10 top-24 size-40 rounded-full border border-gold/[0.04]" />
        <div className="float-shape absolute bottom-10 left-1/3 size-64 rounded-full bg-[image:var(--gradient-gold)] opacity-[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="reveal">
            <Crown className="size-7 text-gold" aria-hidden />
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase leading-[1.05] tracking-[0.06em] text-gilded sm:text-7xl">
              Get in Touch
            </h1>
            <p className="mt-4 font-[family-name:var(--font-serif-alt)] text-2xl italic text-ivory/85 sm:text-3xl">
              We&rsquo;d Love to Hear from You!
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/60 sm:text-base">
              Have a question, need assistance, or ready to book your appointment? Our team is here
              to help you every step of the way.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {INFO.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <Icon className="size-6 text-gold transition-transform duration-500 group-hover:scale-110" aria-hidden />
                  <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
                    {item.label}
                  </p>
                  {item.lines.map((line) => (
                    <p key={line} className="mt-1 break-words text-[0.7rem] leading-relaxed text-ivory/70">
                      {line}
                    </p>
                  ))}
                </>
              );
              const cls =
                "group lift-card block rounded-2xl border border-gold/20 bg-white/[0.03] p-4 backdrop-blur-md";
              return (
                <div
                  key={item.label}
                  className="reveal"
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  {item.href ? (
                    <a href={item.href} className={cls} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal-right relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[7px]">
            <div
              aria-hidden
              className="float-shape absolute left-1/2 top-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50 shadow-gold"
            />
            <img
              src={heroStyling}
              alt="SASS Hair & Beauty client with luxurious styled hair"
              className="size-full object-cover"
              loading="lazy"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
