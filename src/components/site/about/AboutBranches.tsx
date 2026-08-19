import { MapPin, Phone, Navigation } from "lucide-react";
import { useReveal } from "@/lib/motion";
import vijayawada from "@/assets/branch-vijayawada.jpg";
import guntur from "@/assets/branch-guntur.jpg";
import rajahmundryAsset from "@/assets/rajahmundry-bridge.jpg.asset.json";


const branches = [
  {
    city: "Vijayawada",
    tag: "Flagship & bridal suite",
    address: "2nd Floor, PVP Square, MG Road, Mogalrajapuram, Labbipet, Vijayawada 520010",
    phone: "+91 72868 11999",
    image: vijayawada,
    q: "SASS hair and beauty PVP Square MG Road Vijayawada",
  },
  {
    city: "Guntur",
    tag: "Colour lab & academy",
    address: "1st Floor, Phoenix Mall, Srinivasarao Pet, Guntur 522004",
    phone: "+91 89071 11999",
    image: guntur,
    q: "SASS hair and beauty Phoenix Mall Guntur",
  },
  {
    city: "Rajahmundry",
    tag: "Hair & skin studio",
    address: "Prasaditya Mall, Ave Appa Rao Road, Venkateswara Nagar, Rajamahendravaram 533103",
    phone: "+91 95502 81116",
    image: rajahmundryAsset.url,
    q: "SASS Hair and beauty Prasaditya Mall Rajahmundry",

  },
];

export function AboutBranches() {
  const ref = useReveal<HTMLDivElement>({ selector: ".ab-br-head, .ab-br-card", stagger: 0.12 });

  return (
    <section className="bg-cream py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="ab-br-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Our Branches</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
            Three cities, one standard of luxury
          </h2>

          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/40" />
            <svg
              width="28"
              height="12"
              viewBox="0 0 28 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gold"
            >
              <path
                d="M14 0L16.5 5L22 6L17.5 9L18 12L14 9L10 12L10.5 9L6 6L11.5 5L14 0Z"
                fill="currentColor"
              />
            </svg>
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <article
              key={b.city}
              className="ab-br-card group relative overflow-hidden rounded-[1.75rem] border border-gold/20 bg-white shadow-luxe"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={b.image}
                  alt={`${b.city} flagship location`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <p className="text-[0.65rem] uppercase tracking-[0.24em] text-gold">{b.tag}</p>
                  <h3 className="mt-1 font-display text-3xl text-cream">{b.city}</h3>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="pt-4">
                        <p className="flex items-start gap-2 text-sm text-cream/80">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                          {b.address}
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-cream/80">
                          <Phone className="size-4 text-gold" />
                          <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="link-underline text-cream">
                            {b.phone}
                          </a>
                        </p>
                        <div className="mt-4 flex gap-3">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.q)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 font-button text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:-translate-y-1"
                          >
                            <Navigation className="size-3.5" /> Directions
                          </a>
                          <a
                            href={`tel:${b.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-4 py-2 font-button text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
                          >
                            <Phone className="size-3.5" /> Call now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
