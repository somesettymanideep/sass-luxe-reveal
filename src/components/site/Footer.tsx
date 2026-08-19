import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/sass-logo-white.png.asset.json";
import { useReveal } from "@/lib/motion";

const quickLinks: [string, string][] = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Transformations", "/#gallery"],
  ["Bridal Beauty", "/#bridal"],
  ["Our Experts", "/#experts"],
  ["Membership", "/#membership"],
  ["FAQs", "/#faq"],
  ["Contact", "/contact"],
];

const services = [
  "Hair Cut & Styling",
  "Fashion Colours",
  "Keratin Treatment",
  "Hair Smoothening",
  "Bridal Makeup",
  "Pedicure & Manicure",
  "Threading",
];

const branches = [
  { city: "Vijayawada", address: "2nd Floor, PVP Square, MG Road, Mogalrajapuram, Labbipet, Vijayawada 520010" },
  { city: "Guntur", address: "1st Floor, Phoenix Mall, Srinivasarao Pet, Guntur 522004" },
  { city: "Rajahmundry", address: "Prasaditya Mall, Ave Appa Rao Road, Venkateswara Nagar, Rajamahendravaram 533103" },
];

export function Footer() {
  const ref = useReveal<HTMLDivElement>({ selector: ".foot-col", stagger: 0.1 });

  return (
    <footer className="border-t border-gold/15 bg-ink pb-16 pt-14 text-cream md:pb-10">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-10"
      >
        {/* Brand */}
        <div className="foot-col lg:col-span-4">
          <img src={logo.url} alt="SASS Hair & Beauty" width={180} height={90} className="w-36" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
            A premium hair &amp; beauty atelier with flagship salons in Vijayawada,
            Guntur and Rajahmundry.
          </p>

          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
              { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
              { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-gold/25 text-gold transition-transform duration-500 hover:-translate-y-1.5 hover:border-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav className="foot-col lg:col-span-2" aria-label="Quick links">
          <h3 className="eyebrow text-gold">Quick Links</h3>
          <ul className="mt-6 space-y-3 text-sm text-cream/60">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                {href.startsWith("/#") ? (
                  <a href={href} className="link-underline">
                    {label}
                  </a>
                ) : (
                  <Link to={href} className="link-underline">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav className="foot-col lg:col-span-3" aria-label="Services">
          <h3 className="eyebrow text-gold">Our Services</h3>
          <ul className="mt-6 space-y-3 text-sm text-cream/60">
            {services.map((s) => (
              <li key={s}>
                <a href="/#services" className="link-underline">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div className="foot-col lg:col-span-3">
          <h3 className="eyebrow text-gold">Contact Info</h3>
          <ul className="mt-6 space-y-4 text-sm text-cream/60">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href="mailto:hello@sasshairbeauty.in" className="link-underline">
                hello@sasshairbeauty.in
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href="tel:+917286811999" className="link-underline">
                +91 72868 11999
              </a>
            </li>
            {branches.map((b) => (
              <li key={b.city} className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  <span className="block text-cream/85">{b.city}</span>
                  {b.address}
                </span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              Open daily · 10:00 AM – 9:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-cream/10 px-6 pt-6 text-xs text-cream/40 md:flex-row lg:px-10">
        <span>© {new Date().getFullYear()} SASS Hair &amp; Beauty. All rights reserved.</span>
        <span>
          Designed and developed by{" "}
          <a
            href="https://ayrondigitalsolutions.com/"
            target="_blank"
            rel="noreferrer"
            className="text-cream/60 transition-colors duration-300 hover:text-gold"
          >
            Ayrondigitalsolutions
          </a>
        </span>
      </div>
    </footer>
  );
}
