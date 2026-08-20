import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/motion";
import { Scissors, Palette, Landmark, ShieldCheck, Heart, Sparkles } from "lucide-react";

const milestones = [
  {
    year: "2011",
    date: "Aug 15, 2011",
    title: "The first chair",
    body: "A single-studio salon opens on MG Road, Vijayawada with two stylists and one belief — consultation before scissors.",
    Icon: Scissors,
  },
  {
    year: "2014",
    date: "Mar 10, 2014",
    title: "Colour lab",
    body: "SASS becomes one of the first salons in the region to run a dedicated fashion-colour and balayage lab.",
    Icon: Palette,
  },
  {
    year: "2017",
    date: "Nov 22, 2017",
    title: "Guntur flagship",
    body: "Brodipet opens with 14 stations, a private bridal suite and an in-house academy for new stylists.",
    Icon: Landmark,
  },
  {
    year: "2020",
    date: "Jun 01, 2020",
    title: "Hygiene-first rebuild",
    body: "Every branch re-engineered with single-use kits, sterilisation bays and appointment-only slots.",
    Icon: ShieldCheck,
  },
  {
    year: "2023",
    date: "Sep 18, 2023",
    title: "Rajahmundry & bridal wing",
    body: "Third flagship launches alongside a travelling bridal team covering weddings across Andhra Pradesh.",
    Icon: Heart,
  },
  {
    year: "2026",
    date: "Jan 05, 2026",
    title: "42,000 clients later",
    body: "Three flagships, 30+ specialists and a 4.9 Google rating — with the same twelve-minute consultation.",
    Icon: Sparkles,
  },
];

export function Timeline() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      // Glow and track line scale animation
      gsap.fromTo(
        ".tree-trunk",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".tree-wrap",
            start: "top 72%",
            end: "bottom 82%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".tree-node").forEach((node) => {
        const branch = node.querySelector(".tree-branch");
        const bud = node.querySelector(".tree-bud");
        const card = node.querySelector(".tree-card");
        
        gsap
          .timeline({
            scrollTrigger: { trigger: node, start: "top 78%", once: true },
          })
          .fromTo(
            bud, 
            { scale: 0, rotation: -180 }, 
            { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }
          )
          .fromTo(
            branch,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: "power2.out" },
            "-=0.25",
          )
          .fromTo(
            card,
            { autoAlpha: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
            { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" },
            "-=0.3",
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={root} className="bg-background py-28 md:py-36 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gold-soft/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-gold">Our Journey</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]">
            Fifteen years, <span className="italic text-gold-gradient">growing branch by branch</span>
          </h2>
        </div>

        <div className="tree-wrap relative mt-24 md:mt-32">
          {/* Base background timeline line */}
          <div className="absolute inset-y-0 left-4 w-[2px] bg-gold/10 md:left-1/2 md:-translate-x-1/2 rounded-full" />
          {/* Animated growing progress line with gold glow */}
          <div className="tree-trunk absolute inset-y-0 left-4 w-[2px] origin-top bg-gradient-to-b from-gold via-gold to-gold-soft md:left-1/2 md:-translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(231,185,97,0.4)]" />

          <ul className="space-y-20 md:space-y-32">
            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              const Icon = m.Icon;
              return (
                <li
                  key={m.year}
                  className="tree-node relative pl-16 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  {/* Glowing Icon Badge on the trunk */}
                  <div className="tree-bud absolute left-4 top-0 z-20 -translate-x-1/2 md:left-1/2">
                    <div className="relative flex size-12 items-center justify-center rounded-full border border-gold/40 bg-ink shadow-2xl md:size-14 transition-transform duration-500 hover:scale-110">
                      {/* Pulsing ring outer */}
                      <span className="absolute -inset-2 rounded-full bg-gold/5 border border-gold/10 pointer-events-none" />
                      <span className="absolute -inset-4 animate-ping rounded-full bg-gold/5 pointer-events-none opacity-40 [animation-duration:3s]" />
                      <Icon className="size-5 text-gold-gradient" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Horizontal branch line */}
                  <span
                    className={`tree-branch absolute top-6 h-px bg-gradient-to-r from-gold/30 to-gold/5 md:top-7 ${
                      right
                        ? "left-4 origin-left w-8 md:left-1/2 md:w-16"
                        : "left-4 origin-left w-8 md:left-auto md:right-1/2 md:w-16 md:origin-right md:from-gold/5 md:to-gold/30"
                    }`}
                  />

                  <div
                    className={
                      right
                        ? "md:col-start-2 md:pl-20"
                        : "md:col-start-1 md:row-start-1 md:pr-20 md:text-right"
                    }
                  >
                    <article className="tree-card luxe-card relative overflow-hidden inline-block w-full bg-card/45 backdrop-blur-md p-6 text-left md:w-auto md:p-8 border border-gold/15 transition-all duration-500 hover:border-gold/40">
                      {/* Huge elegant background year watermark */}
                      <span className="absolute -top-4 -right-2 text-[5.5rem] font-display font-black italic select-none pointer-events-none opacity-5 text-gold-gradient">
                        {m.year}
                      </span>
                      
                      <div className={`flex items-center gap-4 mb-4 ${right ? "justify-start" : "md:justify-end"}`}>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3.5 py-0.8 text-[10px] font-semibold tracking-[0.18em] text-gold uppercase">
                          <span className="size-1 rounded-full bg-gold animate-pulse" />
                          {m.date}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">{m.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground/90">
                        {m.body}
                      </p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
