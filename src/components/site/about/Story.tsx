import { useEffect, useRef } from "react";
import { Target, Eye, Gem } from "lucide-react";
import { useReveal, gsap, ensureGsap } from "@/lib/motion";
import interior from "@/assets/interior.jpg";
import g2 from "@/assets/g2.jpg";

const pillars = [
  {
    title: "Mission",
    icon: Target,
    body: "To make world-class hair and beauty craft accessible across Andhra Pradesh, without ever diluting the detail.",
  },
  {
    title: "Vision",
    icon: Eye,
    body: "To be the most trusted luxury salon house in South India — known for consistency, hygiene and artistry.",
  },
  {
    title: "Values",
    icon: Gem,
    body: "Honest consultation, premium products only, respect for every hair type, and a calm, unhurried chair.",
  },
];


export function Story() {
  const ref = useReveal<HTMLDivElement>({ selector: ".story-fade", stagger: 0.14 });
  const mvvRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mvvRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mvv-card",
        { autoAlpha: 0, y: 48, scale: 0.97, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        ".mvv-badge",
        { autoAlpha: 0, scale: 0.6, rotate: -18 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.9,
          delay: 0.25,
          ease: "back.out(1.6)",
          stagger: 0.18,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);


  return (
    <section id="story" className="bg-background py-28 md:py-36">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="story-fade relative">
            <div className="overflow-hidden rounded-[2rem] border border-gold/20 shadow-luxe">
              <img
                src={interior}
                alt="Interior of the SASS Hair & Beauty flagship salon"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-4/3 w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -right-4 hidden w-44 overflow-hidden rounded-[1.5rem] border border-gold/30 shadow-gold md:block">
              <img
                src={g2}
                alt="Styling detail at SASS"
                loading="lazy"
                width={400}
                height={500}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </div>

          <div className="story-fade">
            <p className="section-eyebrow text-gold">Our Story</p>
            <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]">
              A single chair in Vijayawada,{" "}
              <span className="italic text-gold-gradient">a house of craft today</span>
            </h2>
            <div className="mt-7 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                SASS Hair &amp; Beauty began in 2011 as a small studio on MG Road with one
                promise — that a haircut in Andhra Pradesh should feel as considered as one
                in Milan or Mumbai. No rushed chairs, no compromise products, no guesswork.
              </p>
              <p>
                Over fifteen years that promise turned into three flagship salons, a
                dedicated bridal suite, and a team of colourists and texture specialists
                trained on L'Oréal, Schwarzkopf, Wella and Olaplex systems.
              </p>
              <p>
                Today more than 42,000 clients trust us with the way they walk into a room —
                and every one of them still starts with the same twelve-minute consultation
                we began with.
              </p>
            </div>
          </div>
        </div>

        <div ref={mvvRef} className="mt-24">
          <div className="story-fade text-center">
            <h2 className="text-[clamp(1.85rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em]">
              Mission, Vision <span className="text-gold">&amp;</span> Values
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gold/40 sm:w-24" />
              <span className="size-2 rotate-45 bg-gold-gradient" />
              <span className="h-px w-16 bg-gold/40 sm:w-24" />
            </div>
          </div>

          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="mvv-card group relative flex h-full items-center gap-5 overflow-hidden rounded-[7px] border border-gold/15 bg-card p-7 pr-9 shadow-luxe transition-all duration-500 will-change-transform hover:-translate-y-1 hover:border-gold/40"
                >
                  <span className="absolute top-[12%] bottom-[12%] right-2 w-1.5 bg-gold-gradient opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:top-[5cm] md:bottom-[5cm]" />
                  <span className="mvv-badge grid size-16 shrink-0 place-items-center self-center rounded-full bg-ink ring-1 ring-gold/30 transition-transform duration-700 group-hover:scale-105">
                    <Icon className="size-7 text-gold" strokeWidth={1.2} />
                  </span>

                  <div className="pr-2">
                    <h3 className="font-body text-[0.7rem] font-semibold uppercase leading-[1.4] tracking-[0.3em] text-gold sm:text-[0.75rem]">
                      {p.title}
                    </h3>
                    <span className="mt-2.5 block h-px w-8 bg-gold/50" />
                    <p className="mt-3.5 text-[0.9rem] leading-[1.75] tracking-[0.005em] text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}
