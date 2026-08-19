import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/sass-logo-white.png.asset.json";
import { LuxeButton } from "./LuxeButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Branches",
    children: [
      { label: "Vijayawada", href: "/branches/vijayawada" },
      { label: "Guntur", href: "/branches/guntur" },
      { label: "Rajahmundry", href: "/branches/rajahmundry" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBranchesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-gold/15 bg-ink/70 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-6",
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" aria-label="SASS Hair & Beauty home" className="shrink-0">
          <img
            src={logo.url}
            alt="SASS Hair & Beauty"
            width={160}
            height={80}
            className={cn(
              "w-28 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-36",
              scrolled && "w-24 md:w-28",
            )}
          />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) =>
            l.children ? (
              <li key={l.label} className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setBranchesOpen((v) => !v)}
                  onMouseEnter={() => setBranchesOpen(true)}
                  className="link-underline flex items-center gap-1 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-cream/85"
                  aria-expanded={branchesOpen}
                  aria-haspopup="true"
                >
                  {l.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-300",
                      branchesOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  onMouseLeave={() => setBranchesOpen(false)}
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 pt-3 transition-all duration-300",
                    branchesOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0",
                  )}
                >
                  <div className="rounded-xl border border-gold/20 bg-ink/95 p-2 backdrop-blur-xl shadow-luxe">
                    {l.children.map((c) => (
                      <a
                        key={c.href}
                        href={c.href}
                        onClick={() => setBranchesOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-sm text-cream/80 transition-colors hover:bg-gold/10 hover:text-gold"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-[0.78rem] font-medium uppercase tracking-[0.18em] text-cream/85"
                >
                  {l.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <LuxeButton
            as="a"
            href="/contact"
            className="hidden gold-pulse md:inline-flex"
          >
            Book Appointment
          </LuxeButton>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-full border border-gold/30 p-2.5 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[80] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-ink px-8 py-8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <img src={logo.url} alt="" width={120} height={60} className="w-24" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-full border border-gold/30 p-2.5 text-cream"
            >
              <X className="size-5" />
            </button>
          </div>
          {navLinks.map((l, i) =>
            l.children ? (
              <div key={l.label} className="border-b border-cream/10">
                <button
                  type="button"
                  onClick={() => setMobileBranchesOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 font-display text-2xl text-cream transition-colors hover:text-gold"
                  style={{
                    transitionDelay: `${i * 40}ms`,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(24px)",
                    transitionProperty: "opacity, transform, color",
                    transitionDuration: "600ms",
                  }}
                  aria-expanded={mobileBranchesOpen}
                >
                  {l.label}
                  <ChevronDown
                    className={cn(
                      "size-5 transition-transform duration-300",
                      mobileBranchesOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    mobileBranchesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {l.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 pl-3 text-lg text-cream/70 transition-colors hover:text-gold"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-4 font-display text-2xl text-cream transition-colors hover:text-gold"
                style={{
                  transitionDelay: `${i * 40}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(24px)",
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "600ms",
                }}
              >
                {l.label}
              </a>
            ),
          )}
          <LuxeButton as="a" href="/contact" className="mt-8 w-full">
            Book Appointment
          </LuxeButton>
        </aside>
      </div>
    </header>
  );
}

