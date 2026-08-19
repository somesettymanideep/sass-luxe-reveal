import { useEffect, useRef, useState } from "react";
import { X, MoveHorizontal, Play, Volume2, VolumeX } from "lucide-react";
import { useReveal } from "@/lib/motion";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";
import reel1 from "@/assets/reel1.mp4.asset.json";
import reel2 from "@/assets/reel2.mp4.asset.json";
import reel3 from "@/assets/reel3.mp4.asset.json";
import reel4 from "@/assets/reel4.mp4.asset.json";
import poster1 from "@/assets/reel1-poster.jpg.asset.json";
import poster2 from "@/assets/reel2-poster.jpg.asset.json";
import poster3 from "@/assets/reel3-poster.jpg.asset.json";
import poster4 from "@/assets/reel4-poster.jpg.asset.json";

const reels = [
  { src: reel1.url, poster: poster1.url, tag: "Colour", title: "Fashion colour transformation" },
  { src: reel2.url, poster: poster2.url, tag: "Bridal", title: "Bridal makeover reveal" },
  { src: reel3.url, poster: poster3.url, tag: "Styling", title: "Signature blowout styling" },
  { src: reel4.url, poster: poster4.url, tag: "Makeover", title: "Complete salon makeover" },
];

const SNAP_POINTS = [0, 25, 50, 75, 100];

function BeforeAfter() {
  const [pos, setPos] = useState(38);
  const [dragging, setDragging] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);

  const move = (clientX: number, snap = false) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    let next = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    if (snap) {
      const near = SNAP_POINTS.find((p) => Math.abs(p - next) <= 6);
      if (near !== undefined) next = near;
    }
    setPos(next);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={wrap}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={onKey}
      className="relative aspect-4/5 w-full touch-pan-y select-none overflow-hidden rounded-[1.5rem] border border-gold/20 outline-none focus-visible:border-gold/60 sm:aspect-16/11"
      style={{ touchAction: dragging ? "none" : "pan-y" }}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        setDragging(true);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={(e) => {
        setDragging(false);
        move(e.clientX, true);
      }}
      onPointerCancel={() => setDragging(false)}
    >
      <img
        src={after}
        alt="After transformation at SASS"
        loading="lazy"
        width={1008}
        height={1200}
        className="absolute inset-0 size-full object-cover object-top"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt="Before transformation"
          loading="lazy"
          width={1008}
          height={1200}
          className="size-full object-cover object-top"
        />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-gold-gradient"
        style={{ left: `${pos}%`, transition: dragging ? "none" : "left 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <span
          className={`absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold transition-transform duration-300 sm:size-12 ${dragging ? "scale-110" : ""}`}
        >
          <MoveHorizontal className="size-7 sm:size-5" />
        </span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-cream backdrop-blur">
        Before
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
        After
      </span>
    </div>
  );
}

function ReelCard({
  reel,
  onOpen,
}: {
  reel: (typeof reels)[number];
  onOpen: () => void;
}) {
  const video = useRef<HTMLVideoElement | null>(null);

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => void video.current?.play().catch(() => {})}
      onMouseLeave={() => {
        video.current?.pause();
        if (video.current) video.current.currentTime = 0;
      }}
      className="gal-item group relative aspect-9/16 overflow-hidden rounded-[1.25rem] border border-gold/15 text-left transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold/60 hover:shadow-gold"
    >
      <video
        ref={video}
        src={reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
      <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/45 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-gold backdrop-blur">
        {reel.tag}
      </span>
      <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient text-ink opacity-90 shadow-gold transition-opacity duration-500 group-hover:opacity-0">
        <Play className="size-5 translate-x-px fill-current" />
      </span>
      <span className="absolute inset-x-4 bottom-4 block font-display text-lg leading-tight text-cream">
        {reel.title}
      </span>
    </button>
  );
}

export function Gallery() {
  const ref = useReveal<HTMLDivElement>({ selector: ".gal-item, .reveal-head", stagger: 0.09 });
  const [active, setActive] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="bg-ink py-28 md:py-36">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="reveal-head max-w-2xl">
          <p className="section-eyebrow text-gold">Before &amp; After</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] text-cream">
            Transformations worth the drive
          </h2>
          <p className="mt-5 text-cream/70">
            Drag the handle to see the difference a SASS consultation makes — then watch the real
            makeovers filmed inside our studios.
          </p>
        </div>

        <div className="gal-item mt-14">
          <BeforeAfter />
        </div>

        <div className="reveal-head mt-16 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-2xl md:text-3xl text-cream">Live transformation reels</h3>
          <p className="text-sm text-cream/70">Hover to preview · tap to watch full</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {reels.map((r, i) => (
            <ReelCard key={i} reel={r} onOpen={() => setActive(i)} />
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-90 flex items-center justify-center bg-black/92 p-6 backdrop-blur-sm"
          style={{ animation: "fade-in 0.35s ease-out both" }}
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 rounded-full border border-gold/30 p-3 text-cream"
          >
            <X className="size-5" />
          </button>
          <button
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => !m);
            }}
            className="absolute left-6 top-6 rounded-full border border-gold/30 p-3 text-cream"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
          <video
            key={active}
            src={reels[active]!.src}
            poster={reels[active]!.poster}
            autoPlay
            loop
            controls
            muted={muted}
            playsInline
            className="max-h-[86vh] w-auto rounded-2xl border border-gold/20 object-contain"
            style={{ animation: "scale-in 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
