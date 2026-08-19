import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, X } from "lucide-react";
import { useReveal } from "@/lib/motion";
import reel1 from "@/assets/reels/reel-1.mp4.asset.json";
import reel2 from "@/assets/reels/reel-2.mp4.asset.json";
import reel3 from "@/assets/reels/reel-3.mp4.asset.json";
import reel4 from "@/assets/reels/reel-4.mp4.asset.json";

const REELS = [
  { src: reel1.url, tag: "Hair", title: "Transformation Magic" },
  { src: reel2.url, tag: "Bridal", title: "Wedding Day Reveal" },
  { src: reel3.url, tag: "Skin", title: "Glow Up Session" },
  { src: reel4.url, tag: "Salon", title: "SASS Experience" },
];

export function TransformationReels() {
  const ref = useReveal<HTMLDivElement>({ selector: ".tr-item, .tr-head", stagger: 0.08 });
  const track = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="bg-ink py-20 md:py-28 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="tr-head flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow text-gold">Real Stories</p>
            <h2 className="mt-2 font-semibold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06] text-cream">
              Transformation <span className="italic text-gold-gradient">reels</span>
            </h2>
          </div>
          <p className="hidden text-sm text-cream/60 md:block">
            Hover to preview · swipe to browse
          </p>
        </div>

        <div className="relative mt-12">
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
          >
            {REELS.map((reel, i) => (
              <figure
                key={i}
                onClick={() => setActive(i)}
                className="tr-item group relative aspect-9/16 w-[75%] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[20px] border border-gold/20 sm:w-[45%] md:w-[31%] lg:w-[23%]"
              >
                <video
                  src={reel.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/45 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                  {reel.tag}
                </span>
                <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient text-ink opacity-90 shadow-gold transition-opacity duration-500 group-hover:opacity-0">
                  <Play className="size-5 translate-x-px fill-current" />
                </span>
                <figcaption className="absolute inset-x-4 bottom-4 font-display text-lg leading-tight text-cream">
                  {reel.title}
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            aria-label="Previous reels"
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-ink/90 text-gold shadow-luxe transition-all hover:scale-110 hover:border-gold md:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Next reels"
            onClick={() => scrollBy(1)}
            className="absolute -right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-ink/90 text-gold shadow-luxe transition-all hover:scale-110 hover:border-gold md:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
          onClick={() => setActive(null)}
          style={{ animation: "fade-in 0.3s ease-out both" }}
        >
          <div className="absolute right-6 top-6 flex gap-4">
            <button
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={(e) => {
                e.stopPropagation();
                setMuted(!muted);
              }}
              className="rounded-full border border-gold/30 p-3 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
            <button
              aria-label="Close"
              className="rounded-full border border-gold/30 p-3 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <X className="size-5" />
            </button>
          </div>
          <video
            src={REELS[active]!.src}
            autoPlay
            loop
            controls
            muted={muted}
            playsInline
            className="max-h-[85vh] w-auto rounded-2xl border border-gold/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scale-in 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
          />
        </div>
      )}
    </section>
  );
}
