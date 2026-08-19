import { useReveal } from "@/lib/motion";
import mens from "@/assets/mens-grooming.jpg";
import bridal from "@/assets/bridal-split.jpg";

export function SplitBanner() {
  const ref = useReveal<HTMLDivElement>({ selector: ".split-fade", stagger: 0.16 });

  return (
    <section className="bg-background py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Men's panel */}
          <article className="split-fade group relative flex overflow-hidden rounded-[10px] bg-ink text-cream shadow-luxe">
            <div className="relative w-[38%] shrink-0 overflow-hidden">
              <img
                src={mens}
                alt="Men's precision haircut and beard detailing at SASS"
                loading="lazy"
                width={912}
                height={1104}
                className="size-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-10 sm:px-8">
              <p className="font-body text-[0.95rem] font-bold uppercase tracking-[0.08em] text-gold sm:text-lg">
                Master Barbers
              </p>
              <h3 className="font-body text-[1.05rem] font-bold uppercase leading-tight tracking-[0.02em] text-cream sm:text-xl">
                Sharp Looks
                <br />. Confident You
              </h3>
              <p className="max-w-xs text-[0.82rem] leading-relaxed text-cream/70">
                Skin fades, undercuts, beard detailing &amp; luxury grooming.
              </p>
              <a
                href="/services"
                className="mt-3 inline-flex w-fit items-center rounded-[4px] border border-gold/60 px-5 py-2.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream transition-colors duration-500 hover:bg-gold hover:text-ink"
              >
                Explore Men's Services
              </a>
            </div>
          </article>

          {/* Bridal panel */}
          <article className="split-fade group relative flex overflow-hidden rounded-[10px] bg-gold-gradient text-ink shadow-luxe">
            <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-10 sm:px-8">
              <h3 className="font-body text-[1.05rem] font-bold uppercase leading-tight tracking-[0.02em] text-ink sm:text-xl">
                Bridal
                <br />
                Excellence
              </h3>
              <p className="max-w-xs text-[0.82rem] leading-relaxed text-ink/75">
                Make your special day even more beautiful with our bridal packages.
              </p>
              <a
                href="/#bridal"
                className="mt-3 inline-flex w-fit items-center rounded-[4px] bg-ink px-5 py-2.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream transition-transform duration-500 hover:-translate-y-0.5"
              >
                Explore Bridal Packages
              </a>
            </div>
            <div className="relative w-[42%] shrink-0 overflow-hidden">
              <img
                src={bridal}
                alt="Bride in traditional gold jewellery styled by SASS bridal team"
                loading="lazy"
                width={912}
                height={1104}
                className="size-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
