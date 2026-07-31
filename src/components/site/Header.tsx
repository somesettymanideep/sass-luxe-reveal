import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { LuxeButton } from "./LuxeButton";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Bridal", href: "#bridal" },
  { label: "Gallery", href: "#gallery" },
  { label: "Locations", href: "#locations" },
  { label: "Offers", href: "#offers" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/95 py-3 shadow-luxe backdrop-blur-md"
          : "bg-transparent py-6",
      )}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="SASS Hair & Beauty home">
          <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 bg-black/40">
            <span className="font-[family-name:var(--font-display)] text-lg text-gilded">S</span>
          </span>
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-display)] text-lg tracking-[0.22em] text-ivory">
              SASS
            </span>
            <span className="block text-[0.55rem] tracking-[0.42em] text-gold-deep uppercase">
              Hair &amp; Beauty
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[image:var(--gradient-gold)] after:transition-all after:duration-300 hover:text-gold hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+919000000000" className="hidden text-ivory/75 transition-colors hover:text-gold lg:block" aria-label="Call SASS Hair & Beauty">
            <Phone className="size-4" />
          </a>
          <LuxeButton className="hidden sm:inline-flex" onClick={() => (window.location.hash = "#contact")}>
            Book Appointment
          </LuxeButton>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="mx-5 mt-4 rounded-3xl border border-gold/20 bg-black/95 p-6 backdrop-blur-xl xl:hidden"
        >
          <ul className="grid grid-cols-2 gap-4">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-xs uppercase tracking-[0.2em] text-ivory/80 hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LuxeButton className="mt-6 w-full" magnetic={false} onClick={() => setOpen(false)}>
            Book Appointment
          </LuxeButton>
        </nav>
      ) : null}
    </header>
  );
}
