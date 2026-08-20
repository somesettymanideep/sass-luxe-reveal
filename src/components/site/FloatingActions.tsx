import { useEffect, useState } from "react";
import { Phone, ArrowUp, CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { AppointmentForm } from "./contact/AppointmentForm";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      <TooltipProvider delayDuration={200}>
        <div className="fixed bottom-24 right-5 z-50 flex flex-col gap-3 md:bottom-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://wa.me/917286811999"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] gold-pulse"
              >
                <WhatsAppIcon className="size-6" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left" className="border-gold/20 bg-ink px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-gold">
              Chat on WhatsApp
            </TooltipContent>
          </Tooltip>
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
          className="grid size-12 place-items-center rounded-full border border-gold/30 bg-gold-gradient text-ink shadow-luxe backdrop-blur transition-all duration-500 hover:scale-110 hover:border-gold hover:bg-gold"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(12px)",
            pointerEvents: show ? "auto" : "none",
          }}
        >
            <ArrowUp className="size-5" />
          </button>
        </div>
      </TooltipProvider>


      {/* Mobile sticky booking bar */}
      <AppointmentForm 
        trigger={
          <button
            className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-gold-gradient py-4 font-button text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink transition-transform duration-500 md:hidden"
            style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
          >
            <CalendarCheck className="size-4" /> Book Appointment
          </button>
        }
      />
    </>
  );
}
