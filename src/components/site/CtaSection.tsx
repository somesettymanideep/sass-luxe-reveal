import { Phone } from "lucide-react";
import { LuxeButton } from "./LuxeButton";

export function CtaSection() {
  return (
    <section id="contact" className="surface-noir relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="float-shape absolute left-1/4 top-8 size-56 rounded-full border border-gold/12" />
        <div className="float-shape absolute bottom-4 right-1/4 size-72 rounded-full bg-[image:var(--gradient-gold)] opacity-[0.06] blur-3xl" />
      </div>
      <div className="reveal relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="rule-gold mx-auto" />
        <h2 className="mt-8 text-4xl leading-[1.1] text-ivory sm:text-6xl">
          Ready for Your Next <span className="text-gilded">Transformation?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/65 sm:text-base">
          Book your appointment today and experience luxury hair and beauty services.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LuxeButton>Book Appointment</LuxeButton>
          <LuxeButton variant="outline" onClick={() => (window.location.href = "tel:+919000000000")}>
            <Phone className="size-4" aria-hidden />
            Call Now
          </LuxeButton>
        </div>
      </div>
    </section>
  );
}
