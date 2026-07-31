import { Instagram } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { LuxeButton } from "./LuxeButton";
import galMens from "@/assets/gal-mens.jpg";
import galUpdo from "@/assets/gal-updo.jpg";
import colour from "@/assets/svc-colour.jpg";
import nails from "@/assets/svc-nails.jpg";
import bridal from "@/assets/hero-bridal.jpg";
import keratin from "@/assets/svc-keratin.jpg";

const POSTS = [
  { image: galUpdo, alt: "Bridal updo with gold hair accessories" },
  { image: colour, alt: "Balayage hair colour result" },
  { image: bridal, alt: "Indian bridal makeup look" },
  { image: galMens, alt: "Men's premium fade haircut and beard grooming" },
  { image: keratin, alt: "Glossy keratin-treated hair" },
  { image: nails, alt: "Luxury manicure finish" },
];

export function InstagramGallery() {
  return (
    <section id="locations" className="bg-background pb-24 sm:pb-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading eyebrow="@sasshairandbeauty" title="Inside The Studio" subtitle="Fresh looks from our chairs, every week." />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {POSTS.map((post, i) => (
            <a
              key={post.alt}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="reveal-zoom zoom-frame group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-border"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              aria-label={`View on Instagram: ${post.alt}`}
            >
              <img src={post.image} alt={post.alt} width={900} height={900} loading="lazy" className="size-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Instagram className="size-6 text-gold" aria-hidden />
              </span>
            </a>
          ))}
        </div>

        <div className="reveal mt-12 flex justify-center">
          <LuxeButton
            variant="ink"
            onClick={() => window.open("https://instagram.com", "_blank", "noopener")}
          >
            <Instagram className="size-4" aria-hidden />
            Follow Us
          </LuxeButton>
        </div>
      </div>
    </section>
  );
}
