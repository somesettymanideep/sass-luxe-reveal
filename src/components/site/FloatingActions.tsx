import { useEffect, useState } from "react";
import { Phone, ArrowUp, CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-24 right-5 z-50 flex flex-col gap-3 md:bottom-8">
        <a
          href="https://wa.me/917286811999"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-ink text-gold shadow-luxe transition-transform duration-500 hover:scale-110 gold-pulse"
        >
          <WhatsAppIcon className="size-6" />
        </a>
        <a
          href="tel:+917286811999"
          aria-label="Call SASS Hair & Beauty"
          className="grid size-12 place-items-center rounded-full bg-gold-gradient text-ink shadow-gold transition-transform duration-500 hover:scale-110"
        >
          <Phone className="size-5" />
        </a>
        <button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          aria-hidden={!show}
          tabIndex={show ? 0 : -1}
          className="grid size-12 place-items-center rounded-full border border-gold/30 bg-background/70 text-gold shadow-luxe backdrop-blur transition-all duration-500 hover:scale-110 hover:border-gold hover:bg-ink"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(12px)",
            pointerEvents: show ? "auto" : "none",
          }}
        >
          <ArrowUp className="size-5" />
        </button>
      </div>


      {/* Mobile sticky booking bar */}
      <a
        href="#contact"
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-gold-gradient py-4 font-button text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink transition-transform duration-500 md:hidden"
        style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
      >
        <CalendarCheck className="size-4" /> Book Appointment
      </a>
    </>
  );
}
