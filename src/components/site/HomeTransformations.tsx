import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { useReveal } from "@/lib/motion";
import before from "@/assets/before.jpg?url";
import after from "@/assets/after.jpg?url";
import reel1 from "@/assets/transformation-1.mp4.asset.json";
import reel2 from "@/assets/transformation-2.mp4.asset.json";
import reel3 from "@/assets/transformation-3.mp4.asset.json";
import reel4 from "@/assets/transformation-4.mp4.asset.json";
import poster1 from "@/assets/trans-poster-1.jpg.asset.json";
import poster2 from "@/assets/trans-poster-2.jpg.asset.json";
import poster3 from "@/assets/trans-poster-3.jpg.asset.json";
import poster4 from "@/assets/trans-poster-4.jpg.asset.json";

function Slider() {
  const [pos, setPos] = useState(42);
  const wrap = useRef<HTMLDivElement | null>(null);
  const move = (clientX: number) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };
  return (
    <div
      ref={wrap}
      className="relative mx-auto h-[240px] w-full max-w-4xl select-none overflow-hidden rounded-[24px] border border-gold/25 sm:h-[340px] lg:h-[400px]"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
      onTouchMove={(e) => e.touches[0] && move(e.touches[0].clientX)}
    >
      <img src={after} alt="After transformation" loading="lazy" className="absolute inset-0 size-full object-cover object-top" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="Before transformation" loading="lazy" className="size-full object-cover object-top" />
      </div>
      <div className="absolute inset-y-0 w-px bg-gold-gradient" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold">
          <MoveHorizontal className="size-5" />
        </span>
      </div>
    </div>
  );
}

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
    <div className="relative">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
      >
        {clips.map((c) => (
          <figure
            key={c.src}
            className="ht-item group relative aspect-9/16 w-[68%] shrink-0 snap-center overflow-hidden rounded-[18px] border border-gold/20 sm:w-[45%] md:w-[31%] lg:w-[23%]"
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
          <p className="section-eyebrow text-gold">Before & After</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06]">
            Transformations worth the drive
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Drag the handle to see the difference a SASS consultation makes — then watch the real makeovers filmed inside our studios.
          </p>
        </div>

        <div className="ht-item mt-12">
          <Slider />
        </div>

        <div className="ht-head mt-16 flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-2xl md:text-3xl">Transformation reels</h3>
          <p className="text-sm text-muted-foreground">Hover to preview · swipe to browse</p>
        </div>

        <div className="mt-8">
          <VideoSlider />
        </div>
      </div>
    </section>
  );
}

