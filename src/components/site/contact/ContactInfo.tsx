import { Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { useDirectionalReveal } from "@/lib/motion";

const branchPhones = [
  { name: "Vijayawada", phone: "+91 72868 11999", href: "tel:+917286811999" },
  { name: "Guntur", phone: "+91 89071 11999", href: "tel:+918907111999" },
  { name: "Rajahmundry", phone: "+91 95502 81116", href: "tel:+919550281116" },
];

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/917286811999" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export function ContactInfo() {
  const ref = useDirectionalReveal<HTMLDivElement>("right", { selector: ".ci-inner" });

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
          {/* Call us - All 3 branches */}
          <div className="ci-card luxe-card bg-background p-6 sm:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 hover:bg-gold-gradient hover:text-ink">
                <Phone className="size-4" />
              </span>
              <div>
                <h3 className="text-base font-semibold">Call us</h3>
                <p className="text-xs text-muted-foreground">
                  Direct lines for our branch locations
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {branchPhones.map((b) => (
                <a
                  key={b.name}
                  href={b.href}
                  className="group/branch flex flex-col rounded-xl border border-gold/15 bg-card/60 p-3.5 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5"
                >
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    {b.name}
                  </span>
                  <span className="mt-1 text-sm font-medium text-foreground transition-colors group-hover/branch:text-gold">
                    {b.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@sasshairbeauty.in"
            className="ci-card group luxe-card block bg-background p-5"
          >
            <span className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold-gradient group-hover:text-ink">
              <Mail className="size-4" />
            </span>
            <h3 className="mt-4 text-base">Email</h3>
            <p className="mt-1 text-sm text-muted-foreground">hello@sasshairbeauty.in</p>
            <p className="mt-0.5 text-sm text-muted-foreground">bridal@sasshairbeauty.in</p>
          </a>

          {/* Business hours */}
          <div className="ci-card group luxe-card bg-background p-5">
            <span className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold-gradient group-hover:text-ink">
              <Clock className="size-4" />
            </span>
            <h3 className="mt-4 text-base">Business hours</h3>
            <p className="mt-1 text-sm text-muted-foreground">Mon – Sun · 10:00 AM – 9:00 PM</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Bridal slots from 6:00 AM</p>
          </div>
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
