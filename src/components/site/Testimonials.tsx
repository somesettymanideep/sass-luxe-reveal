import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import { useReveal } from "@/lib/motion";
import c1 from "@/assets/client-1.jpg";
import c2 from "@/assets/client-2.jpg";
import c3 from "@/assets/client-3.jpg";

const reviews = [
  {
    name: "Priya M.",
    city: "Vijayawada",
    img: c1,
    text: "Absolutely love the service! The staff is professional and made me feel so special. My hair has never looked better!",
  },
  {
    name: "Anusha R.",
    city: "Guntur",
    img: c2,
    text: "Best salon experience ever! The ambience, hygiene and the results — everything is just perfect.",
  },
  {
    name: "Kavya L.",
    city: "Rajahmundry",
    img: c3,
    text: "I trust SASS for all my beauty needs. Highly recommend their bridal makeup and hair services!",
  },
  {
    name: "Sravani R.",
    city: "Vijayawada",
    img: c3,
    text: "The consultation alone was worth it — they matched the colour to my skin tone, not to a chart. Flawless finish.",
  },
  {
    name: "Divya P.",
    city: "Rajahmundry",
    img: c1,
    text: "The Olaplex bond therapy genuinely rescued my hair. Six months later it still feels brand new.",
  },
  {
    name: "Harika S.",
    city: "Guntur",
    img: c2,
    text: "They handled my entire bridal party across two days. Punctual, calm and the makeup held all day long.",
  },
];

const TRANSITION_DURATION = 1200; // ms — slow, cinematic slide timing
const AUTO_INTERVAL = 7000; // ms

export function Testimonials() {
  const ref = useReveal<HTMLDivElement>({ selector: ".reveal-head", stagger: 0.1 });
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(1); // position in the extended array
  const [noTransition, setNoTransition] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setPerView(w < 1024 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Center-mode infinite loop: prepend leading clones and append trailing clones
  const lead = Math.max(1, Math.floor(perView / 2));
  const trail = Math.max(1, perView - 1);

  const extended = [
    ...reviews.slice(-lead),
    ...reviews,
    ...reviews.slice(0, trail),
  ].map((r, i) => ({ ...r, extKey: i }));

  const itemWidth = 100 / perView;
  const translate = 50 - (index + 0.5) * itemWidth;

  // Reset to the first real position whenever visible count changes
  useEffect(() => {
    setNoTransition(true);
    setIndex(lead);
    const t = setTimeout(() => setNoTransition(false), 60);
    return () => clearTimeout(t);
  }, [perView, lead]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((v) => v + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [perView, lead]);

  // Seamless loop reset: when we land on the trailing clone, jump back to the real position
  useEffect(() => {
    const maxIndex = reviews.length + lead;
    if (index !== maxIndex) return;
    const t = setTimeout(() => {
      setNoTransition(true);
      setIndex(lead);
      const restore = setTimeout(() => setNoTransition(false), 60);
      return () => clearTimeout(restore);
    }, TRANSITION_DURATION);
    return () => clearTimeout(t);
  }, [index, lead]);

  const activeReal = (index - lead + reviews.length) % reviews.length;

  return (
    <section className="bg-background py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="reveal-head text-center">
          <p className="font-script text-[clamp(1.6rem,3vw,2.2rem)] leading-none text-gold">
            What Our
          </p>
          <h2 className="mt-2 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.1]">
            Happy <span className="text-gold">Clients</span> Say
          </h2>
          <span className="mx-auto mt-5 block h-px w-40 bg-gold-gradient" />
        </div>

        <div
          className="relative mt-14 overflow-hidden"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div
            className="flex"
            style={{
              transform: `translate3d(${translate}%, 0, 0)`,
              transition: noTransition ? "none" : `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          >
            {extended.map((r, i) => {
              const isActive = i === index;
              return (
                <figure
                  key={r.extKey}
                  className="shrink-0 px-3"
                  style={{ width: `${itemWidth}%` }}
                >
                  <div
                    className={`flex h-full items-start gap-5 rounded-[14px] border p-7 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.45)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
                      isActive
                        ? "border-gold/40 bg-black text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
                        : "border-border/60 bg-card text-foreground"
                    }`}
                  >
                    <img
                      src={r.img}
                      alt={`${r.name} — SASS Hair & Beauty client`}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="size-16 shrink-0 rounded-full border-2 border-gold/50 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Quote className="size-4 shrink-0 fill-gold text-gold" />
                        <span className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="size-3.5 fill-gold text-gold" />
                          ))}
                        </span>
                      </div>
                      <blockquote
                        className={`mt-4 text-sm leading-relaxed ${
                          isActive ? "text-cream/80" : "text-foreground/80"
                        }`}
                      >
                        {r.text}
                      </blockquote>
                      <figcaption className="mt-5">
                        <p className="text-sm font-semibold">– {r.name}</p>
                        <p
                          className={`mt-1 text-xs ${
                            isActive ? "text-cream/60" : "text-muted-foreground"
                          }`}
                        >
                          {r.city}
                        </p>
                      </figcaption>
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center gap-2.5">
            {reviews.map((_, d) => (
              <button
                key={d}
                aria-label={`Go to slide ${d + 1}`}
                onClick={() => setIndex(d + lead)}
                className={`size-2.5 rounded-full transition-all duration-500 ${
                  d === activeReal ? "bg-gold" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
