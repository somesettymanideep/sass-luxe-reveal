import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { useReveal } from "@/lib/motion";

const cards = [
  {
    icon: Phone,
    title: "Call us",
    lines: ["+91 72868 11999", "+91 89071 11999"],
    href: "tel:+917286811999",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@sasshairbeauty.in", "bridal@sasshairbeauty.in"],
    href: "mailto:hello@sasshairbeauty.in",
  },
  {
    icon: MapPin,
    title: "Flagship",
    lines: ["2nd Floor, PVP Square, MG Road", "Mogalrajapuram, Vijayawada 520010"],
  },
  {
    icon: Clock,
    title: "Business hours",
    lines: ["Mon – Sun · 10:00 AM – 9:00 PM", "Bridal slots from 6:00 AM"],
  },
];

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/917286811999" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export function ContactInfo() {
  const ref = useReveal<HTMLDivElement>({ selector: ".ci-card, .ci-head", stagger: 0.1 });

  return (
    <div ref={ref} className="h-full">
      <div className="ci-inner h-full rounded-[2rem] border border-gold/20 bg-card p-8 shadow-luxe md:p-10">
        <div className="ci-head">
          <p className="section-eyebrow text-gold">Get in Touch</p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06]">
            We answer every message, <span className="italic text-gold-gradient">personally</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Reach us directly, or visit any of our three luxury salons across Andhra Pradesh.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => {
            const Icon = c.icon;
            const inner = (
              <>
                <span className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold-gradient group-hover:text-ink">
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-4 text-base">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </>
            );
            return c.href ? (
              <a key={c.title} href={c.href} className="ci-card group luxe-card block bg-background p-5">
                {inner}
              </a>
            ) : (
              <div key={c.title} className="ci-card group luxe-card bg-background p-5">
                {inner}
              </div>
            );
          })}
        </div>

        <div className="ci-card mt-4 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-gold/20 bg-background px-6 py-5">
          <div>
            <h3 className="text-base">Follow the work</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fresh transformations posted every week.
            </p>
          </div>
          <div className="flex gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-gold/30 text-foreground transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold-gradient hover:text-ink"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
