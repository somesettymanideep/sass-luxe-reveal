import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

const QUICK_LINKS = ["Home", "About", "Services", "Bridal", "Gallery", "Offers", "Contact"];
const SERVICES = ["Hair Cut", "Fashion Colours", "Keratin", "Smoothening", "Bridal Makeup", "Facials"];
const LOCATIONS = [
  { city: "Vijayawada", address: "MG Road, Labbipet, Vijayawada 520010" },
  { city: "Guntur", address: "Brodipet 4th Line, Guntur 522002" },
  { city: "Rajahmundry", address: "Danavaipeta Main Road, Rajahmundry 533103" },
];

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { label: "Google Maps", icon: MapPin, href: "https://maps.google.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-black pt-20 pb-10">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="reveal">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full border border-gold/50">
                <span className="font-[family-name:var(--font-display)] text-lg text-gilded">S</span>
              </span>
              <span>
                <span className="block font-[family-name:var(--font-display)] text-lg tracking-[0.22em] text-ivory">SASS</span>
                <span className="block text-[0.55rem] uppercase tracking-[0.42em] text-gold-deep">Hair &amp; Beauty</span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
              Andhra Pradesh&rsquo;s luxury salon chain for hair, beauty, skincare, bridal artistry and
              men&rsquo;s grooming — delivered by internationally trained professionals.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-black"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="reveal" aria-label="Quick links" style={{ ["--reveal-delay" as string]: "100ms" }}>
            <h2 className="eyebrow text-gold">Quick Links</h2>
            <ul className="mt-6 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-ivory/60 transition-colors hover:text-gold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-8 text-gold">Services</h2>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-ivory/60 transition-colors hover:text-gold">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="reveal" style={{ ["--reveal-delay" as string]: "200ms" }}>
            <h2 className="eyebrow text-gold">Locations</h2>
            <ul className="mt-6 space-y-6">
              {LOCATIONS.map((location) => (
                <li key={location.city}>
                  <p className="font-[family-name:var(--font-display)] text-base text-ivory">{location.city}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory/55">{location.address}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ ["--reveal-delay" as string]: "300ms" }}>
            <h2 className="eyebrow text-gold">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm text-ivory/60">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-gold-deep" aria-hidden />
                <a href="tel:+919000000000" className="transition-colors hover:text-gold">+91 90000 00000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-gold-deep" aria-hidden />
                <a href="mailto:hello@sasshairandbeauty.com" className="transition-colors hover:text-gold">
                  hello@sasshairandbeauty.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden />
                <span>
                  Mon &ndash; Sun
                  <br />
                  10:00 AM &ndash; 9:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/12 pt-8 sm:flex-row">
          <p className="text-xs text-ivory/40">
            &copy; {new Date().getFullYear()} SASS Hair &amp; Beauty. All rights reserved.
          </p>
          <p className="text-xs text-ivory/40">Vijayawada &middot; Guntur &middot; Rajahmundry</p>
        </div>
      </div>
    </footer>
  );
}
