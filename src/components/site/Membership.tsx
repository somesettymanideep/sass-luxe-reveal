import { Check } from "lucide-react";
import { useCounter, useReveal } from "@/lib/motion";
import { LuxeButton } from "./LuxeButton";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Essential",
    price: 7999,
    period: "/ year",
    features: ["10% off all services", "2 complimentary hair spas", "Priority weekday booking", "Birthday blow-dry"],
  },
  {
    name: "Signature",
    price: 14999,
    period: "/ year",
    popular: true,
    features: [
      "20% off all services",
      "6 complimentary rituals",
      "Free colour touch-up quarterly",
      "Dedicated stylist",
      "Weekend priority slots",
    ],
  },
  {
    name: "Atelier",
    price: 27999,
    period: "/ year",
    features: [
      "30% off all services",
      "Unlimited hair spas",
      "Bridal package credit ₹5,000",
      "Home service twice a year",
      "Concierge booking line",
    ],
  },
];

function Price({ value }: { value: number }) {
  const ref = useCounter(value);
  return (
    <p className="mt-6 font-display text-4xl">
      ₹<span ref={ref}>0</span>
    </p>
  );
}

export function Membership() {
  const ref = useReveal<HTMLDivElement>({ selector: ".plan, .reveal-head", stagger: 0.14 });

  return (
    <section id="membership" className="bg-background py-28 md:py-36">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="reveal-head mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Membership</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]">
            Beauty, kept on retainer
          </h2>
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={cn(
                "plan luxe-card flex flex-col p-9",
                p.popular
                  ? "bg-ink text-cream shadow-gold border-gold/60 lg:-mt-6 lg:mb-6"
                  : "bg-card/70",
              )}
            >
              {p.popular && (
                <span className="mb-5 w-fit rounded-full bg-gold-gradient px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-ink">
                  Most popular
                </span>
              )}
              <h3 className="text-2xl">{p.name}</h3>
              <Price value={p.price} />
              <span className="text-xs uppercase tracking-[0.2em] opacity-60">{p.period}</span>
              <ul className="mt-8 flex-1 space-y-3.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 opacity-90">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <LuxeButton
                as="a"
                href="#contact"
                variant={p.popular ? "gold" : "outline"}
                className="mt-9 w-full"
              >
                Choose {p.name}
              </LuxeButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
