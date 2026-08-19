import { Navigation, Phone } from "lucide-react";
import { useReveal } from "@/lib/motion";
import { branches as branchData } from "@/lib/branches";

const branches = branchData;

export function Branches() {
  const ref = useReveal<HTMLDivElement>({ selector: ".br-card, .br-head", stagger: 0.12 });

  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="br-head max-w-2xl">
          <p className="section-eyebrow text-gold">Our Branches</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] text-cream">
            Three flagships across Andhra Pradesh
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {branches.map((b) => (
            <article id={`branch-${b.city.toLowerCase()}`} key={b.city} className="br-card luxe-card overflow-hidden bg-white/[0.03]">
              <iframe
                title={`Map of SASS ${b.city}`}
                src={b.mapEmbed}
                loading="lazy"
                className="h-52 w-full"
              />
              <div className="p-7">
                <p className="text-[0.65rem] uppercase tracking-[0.24em] text-gold">{b.tag}</p>
                <h3 className="mt-2 text-2xl text-cream">{b.city}</h3>
                <p className="mt-3 text-sm text-cream/60">{b.address}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.q)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 font-button text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:-translate-y-1"
                  >
                    <Navigation className="size-3.5" /> Directions
                  </a>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 font-button text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
                  >
                    <Phone className="size-3.5" /> Call now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
