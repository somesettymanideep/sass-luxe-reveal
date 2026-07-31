import { useEffect, useRef, useState } from "react";
import { CalendarClock, HeartHandshake, Users, Sparkles, MapPin } from "lucide-react";

const STATS = [
  { value: 15, suffix: "+", label: "Years Experience", icon: CalendarClock },
  { value: 50, suffix: "K+", label: "Happy Clients", icon: HeartHandshake },
  { value: 30, suffix: "+", label: "Certified Stylists", icon: Users },
  { value: 100, suffix: "K+", label: "Luxury Services Delivered", icon: Sparkles },
  { value: 3, suffix: "", label: "Premium Salon Locations", icon: MapPin },
];

function Counter({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}

export function Stats() {
  return (
    <section className="surface-noir relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-gold)] opacity-40" />
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="reveal text-center"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <Icon className="mx-auto size-6 text-gold" aria-hidden />
              <p className="mt-5 font-[family-name:var(--font-display)] text-4xl text-gilded sm:text-5xl">
                <Counter target={stat.value} />
                {stat.suffix}
              </p>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/55">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
