import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/lib/motion";
const reel1 = { url: "/sass-luxe-reveal/__l5e/assets-v1/06ee9068-cfe1-4dff-aab0-4e6694d66458/transformation-1.mp4" };;
const reel2 = { url: "/sass-luxe-reveal/__l5e/assets-v1/a5974689-9d32-40bc-b7aa-aae102dfd29a/transformation-2.mp4" };;
const reel3 = { url: "/sass-luxe-reveal/__l5e/assets-v1/4fc3f559-398a-405c-92d0-366e8d39921f/transformation-3.mp4" };;
const reel4 = { url: "/sass-luxe-reveal/__l5e/assets-v1/11e5ce91-dc4b-49a9-bbf4-922cf3914521/transformation-4.mp4" };;
const poster1 = { url: "/sass-luxe-reveal/__l5e/assets-v1/ee2947a9-7de2-406b-9853-a4eac369e36f/trans-poster-1.jpg" };;
const poster2 = { url: "/sass-luxe-reveal/__l5e/assets-v1/a29c4b8a-0d41-42a9-bff4-cdd5e3a4d7f6/trans-poster-2.jpg" };;
const poster3 = { url: "/sass-luxe-reveal/__l5e/assets-v1/2195d8a4-4b1f-4704-9b4f-c018cdcceb26/trans-poster-3.jpg" };;
const poster4 = { url: "/sass-luxe-reveal/__l5e/assets-v1/b1f1c67d-e5d4-412d-920d-5a4c007677fc/trans-poster-4.jpg" };;

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
            >
              <source src={c.src} type="video/mp4" />
            </video>
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
          <p className="section-eyebrow text-gold">Before & After</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">
            Transformations worth the drive
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
