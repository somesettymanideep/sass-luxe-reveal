import { ArrowRight } from "lucide-react";
import bannerBridal from "@/assets/banner-bridal.jpg";
import bannerTransform from "@/assets/banner-transform.jpg";

const BANNERS = [
  {
    id: "bridal",
    title: "Luxury Bridal Studio",
    copy: "Trials, mehendi looks, reception glam and a dedicated bridal suite for your entourage.",
    cta: "Explore Bridal Packages",
    image: bannerBridal,
    alt: "Bride in a red and gold lehenga inside the SASS bridal studio",
  },
  {
    id: "offers",
    title: "Premium Hair Transformation",
    copy: "Colour correction, keratin and smoothening designed around a personal hair diagnosis.",
    cta: "Book Consultation",
    image: bannerTransform,
    alt: "Model with a dramatic glossy hair transformation",
  },
];

export function TwinBanners() {
  return (
    <section className="bg-background pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[88rem] gap-6 px-5 sm:px-8 lg:grid-cols-2">
        {BANNERS.map((banner, i) => (
          <article
            key={banner.id}
            id={banner.id}
            className={`zoom-frame group relative isolate overflow-hidden rounded-[7px] ${i === 0 ? "reveal-left" : "reveal-right"}`}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              width={1400}
              height={900}
              loading="lazy"
              className="h-[26rem] w-full object-cover sm:h-[30rem]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20 transition-opacity duration-700 group-hover:from-black/95" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <span className="rule-gold" />
              <h3 className="mt-5 max-w-sm font-[family-name:var(--font-display)] text-3xl text-ivory sm:text-4xl">
                {banner.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">{banner.copy}</p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold transition-colors hover:text-ivory"
              >
                {banner.cta}
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
