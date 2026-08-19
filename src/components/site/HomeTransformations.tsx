import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/lib/motion";
import reel1 from "@/assets/transformation-1.mp4.asset.json";
import reel2 from "@/assets/transformation-2.mp4.asset.json";
import reel3 from "@/assets/transformation-3.mp4.asset.json";
import reel4 from "@/assets/transformation-4.mp4.asset.json";
import poster1 from "@/assets/trans-poster-1.jpg.asset.json";
import poster2 from "@/assets/trans-poster-2.jpg.asset.json";
import poster3 from "@/assets/trans-poster-3.jpg.asset.json";
import poster4 from "@/assets/trans-poster-4.jpg.asset.json";

const clips = [
  { src: reel1.url, poster: poster1.url, tag: "Style", title: "Signature Hair Transformation" },
  { src: reel2.url, poster: poster2.url, tag: "Bridal", title: "Exquisite Bridal Glow" },
  { src: reel3.url, poster: poster3.url, tag: "Glow", title: "Skin Revival Reveal" },
  { src: reel4.url, poster: poster4.url, tag: "Art", title: "Technical Colour Excellence" },
];

function VideoSlider() {
  const track = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div className="relative mt-8 md:mt-12">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
      >
        {clips.map((c) => (
          <figure
            key={c.src}
            className="ht-item group relative aspect-9/16 w-[75%] shrink-0 snap-center overflow-hidden rounded-[18px] border border-gold/20 sm:w-[45%] md:w-[31%] lg:w-[23%]"
          >
            <video
              src={c.src}
              poster={c.poster}
              muted
              loop
              playsInline
              preload="auto"
              onMouseEnter={(e) => {
                const v = e.currentTarget;
                v.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                const v = e.currentTarget;
                v.pause();
                v.currentTime = 0;
              }}
              className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/20" />
            <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/45 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
              {c.tag}
            </span>
            <figcaption className="absolute inset-x-4 bottom-4 font-display text-base leading-tight text-cream">
              {c.title}
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        aria-label="Previous videos"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-background/90 text-foreground shadow-luxe transition-colors hover:border-gold hover:text-gold md:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        aria-label="Next videos"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-background/90 text-foreground shadow-luxe transition-colors hover:border-gold hover:text-gold md:flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function HomeTransformations() {
  const ref = useReveal<HTMLDivElement>({ selector: ".ht-item, .ht-head", stagger: 0.08 });
  return (
    <section className="bg-background py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="ht-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Our Artistry</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">
            Transformations we love
          </h2>
          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gold/40" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        <div className="ht-item">
          <VideoSlider />
        </div>
      </div>
    </section>
  );
}
