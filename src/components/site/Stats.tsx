import { useEffect, useRef } from "react";
import { Scissors, Users, Store, Star } from "lucide-react";
import { ensureGsap, gsap } from "@/lib/motion";

const stats = [
  { icon: Users, value: 42000, suffix: "+", label: "Happy clients", decimals: 0 },
  { icon: Store, value: 3, suffix: "", label: "Flagship branches", decimals: 0 },
  { icon: Scissors, value: 15, suffix: " yrs", label: "Of craft", decimals: 0 },
  { icon: Star, value: 4.9, suffix: "/5", label: "Google rating", decimals: 1 },
];

function Stat({ s, index }: { s: (typeof stats)[number]; index: number }) {
  const Icon = s.icon;
  const [num, unit] = s.suffix.startsWith(" ") ? ["", s.suffix.trim()] : [s.suffix, ""];

  return (
    <div className="stat-item group relative flex flex-col items-center px-4 py-2 text-center">
      {/* ghost index */}
      <span
        aria-hidden
        className="stat-ghost pointer-events-none absolute right-2 top-0 select-none font-display text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-none text-cream/[0.055] transition-all duration-700 group-hover:text-gold/15"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="stat-icon relative flex size-[4.2rem] items-center justify-center rounded-full border border-gold/45 transition-all duration-500 ease-out group-hover:border-gold group-hover:shadow-[0_0_28px_-4px_rgba(231,185,97,0.55)] md:size-[4.7rem]">
        <Icon className="size-7 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
      </span>

      <p className="mt-6 font-sans text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-none tracking-tight text-cream">
        <span className="stat-num" data-value={s.value} data-decimals={s.decimals}>
          0
        </span>
        {num}
        {unit && <span className="ml-1.5 text-[0.5em] font-semibold uppercase tracking-[0.08em]">{unit}</span>}
      </p>

      <span className="stat-bar mt-4 block h-[3px] w-10 origin-left rounded-full bg-gold transition-all duration-500 group-hover:w-16" />

      <p className="stat-label mt-4 font-button text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-cream/70 transition-colors duration-500 group-hover:text-gold">
        {s.label}
      </p>
    </div>
  );
}

export function Stats() {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel, start: "top 80%", once: true },
      });

      tl.fromTo(
        panel,
        { autoAlpha: 0, y: 70, scale: 0.965, filter: "blur(14px)" },
        { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
      )
        .fromTo(
          ".stat-item",
          { autoAlpha: 0, y: 46, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", stagger: 0.14 },
          "-=0.6",
        )
        .fromTo(
          ".stat-icon",
          { scale: 0.6, rotate: -25 },
          { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.12 },
          "<0.05",
        )
        .fromTo(
          ".stat-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.out", stagger: 0.12 },
          "<0.15",
        )
        .fromTo(
          ".stat-ghost",
          { autoAlpha: 0, y: -18 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1 },
          "<",
        )
        // count-ups begin only once the panel is in view
        .add(() => {
          panel.querySelectorAll<HTMLElement>(".stat-num").forEach((el, i) => {
            const value = Number(el.dataset["value"] ?? 0);
            const decimals = Number(el.dataset["decimals"] ?? 0);
            const obj = { n: 0 };
            gsap.to(obj, {
              n: value,
              duration: 2.2,
              delay: i * 0.1,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = obj.n.toLocaleString("en-IN", {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                });
              },
            });
          });
        }, "-=0.5");
    }, panel);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-[2rem] bg-ink px-4 py-12 shadow-luxe md:px-10 md:py-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_50%_0%,rgba(231,185,97,0.10),transparent_60%)]" />
          <div className="relative grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "relative",
                  i % 2 === 1 ? "border-l border-cream/12" : "",
                  "md:border-l md:first:border-l-0",
                  i === 2 ? "border-l-0 md:border-l" : "",
                ].join(" ")}
              >
                <Stat s={s} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
