import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap } from "@/lib/motion";
import { Scissors, Palette, Landmark, ShieldCheck, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Import images for milestones
import firstChairImg from "@/assets/interior.jpg?url";
import colorLabImg from "@/assets/hero-hair-custom.jpg?url";
import gunturFlagshipImg from "@/assets/reception.jpg?url";
import hygieneRebuildImg from "@/assets/hair-wash-station.jpg?url";
import rajahmundryBridalImg from "@/assets/hero-bridal-custom.jpg?url";
import clientMilestoneImg from "@/assets/rjy-styling-custom.jpg?url";

const milestones = [
  {
    year: "2011",
    date: "Aug 15, 2011",
    title: "The first chair",
    body: "A single-studio salon opens on MG Road, Vijayawada with two stylists and one belief — consultation before scissors.",
    Icon: Scissors,
    image: firstChairImg,
  },
  {
    year: "2014",
    date: "Mar 10, 2014",
    title: "Colour lab",
    body: "SASS becomes one of the first salons in the region to run a dedicated fashion-colour and balayage lab.",
    Icon: Palette,
    image: colorLabImg,
  },
  {
    year: "2017",
    date: "Nov 22, 2017",
    title: "Guntur flagship",
    body: "Brodipet opens with 14 stations, a private bridal suite and an in-house academy for new stylists.",
    Icon: Landmark,
    image: gunturFlagshipImg,
  },
  {
    year: "2020",
    date: "Jun 01, 2020",
    title: "Hygiene-first rebuild",
    body: "Every branch re-engineered with single-use kits, sterilisation bays and appointment-only slots.",
    Icon: ShieldCheck,
    image: hygieneRebuildImg,
  },
  {
    year: "2023",
    date: "Sep 18, 2023",
    title: "Rajahmundry & bridal wing",
    body: "Third flagship launches alongside a travelling bridal team covering weddings across Andhra Pradesh.",
    Icon: Heart,
    image: rajahmundryBridalImg,
  },
  {
    year: "2026",
    date: "Jan 05, 2026",
    title: "42,000 clients later",
    body: "Three flagships, 30+ specialists and a 4.9 Google rating — with the same twelve-minute consultation.",
    Icon: Sparkles,
    image: clientMilestoneImg,
  },
];

export function Timeline() {
  const root = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const activeMilestone = (milestones[activeIndex] ?? milestones[0]) as typeof milestones[0];
  const progressPercent = (activeIndex / (milestones.length - 1)) * 100;

  // GSAP Transition on activeIndex update
  useEffect(() => {
    if (!cardRef.current) return;
    ensureGsap();
    
    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, y: 15, scale: 0.98, filter: "blur(6px)" },
      { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    );
  }, [activeIndex]);

  // Autoplay effect - pauses when hovering over the card
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 4500); // cycle to next milestone every 4.5 seconds
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % milestones.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  return (
    <section id="journey" ref={root} className="bg-background py-28 md:py-36 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gold-soft/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16 md:mb-24">
          <p className="section-eyebrow text-gold">Our Journey</p>
          <h2 className="mt-2 font-semibold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]">
            Fifteen years, <span className="italic text-gold-gradient">growing branch by branch</span>
          </h2>
        </div>

        {/* Roadmap Year Track */}
        <div className="relative mx-auto max-w-4xl px-4 py-8 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative flex items-center justify-between min-w-[600px] md:min-w-0">
            {/* Background connecting line */}
            <div className="absolute left-0 right-0 top-[20px] md:top-[24px] h-[2px] -translate-y-1/2 bg-gold/10" />
            
            {/* Animated glowing progress line */}
            <div 
              className="absolute left-0 top-[20px] md:top-[24px] h-[2px] -translate-y-1/2 bg-gold-gradient shadow-[0_0_10px_rgba(231,185,97,0.5)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${progressPercent}%` }}
            />
            
            {/* Year Nodes */}
            {milestones.map((m, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              return (
                <button
                  key={m.year}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative z-10 flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  {/* Pulse ring indicator */}
                  <div 
                    className={`flex size-10 items-center justify-center rounded-full border-2 bg-ink transition-all duration-500 md:size-12 ${
                      isActive 
                        ? "border-gold shadow-[0_0_15px_rgba(231,185,97,0.5)] scale-110" 
                        : isPast 
                          ? "border-gold/60 bg-gold/5" 
                          : "border-gold/20 hover:border-gold/50"
                    }`}
                  >
                    {/* Inner core */}
                    <div 
                      className={`size-3 rounded-full transition-all duration-500 ${
                        isActive 
                          ? "bg-gold scale-120 animate-pulse" 
                          : isPast 
                            ? "bg-gold/60" 
                            : "bg-transparent"
                      }`}
                    />
                  </div>
                  
                  {/* Floating Year Label */}
                  <span 
                    className={`mt-4 font-display text-sm font-semibold tracking-wider transition-all duration-500 ${
                      isActive 
                        ? "text-gold scale-110" 
                        : "text-cream/50 hover:text-cream/80"
                    }`}
                  >
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Card */}
        <div 
          ref={cardRef} 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="mx-auto mt-8 max-w-4xl px-2"
        >
          <article className="luxe-card relative overflow-hidden rounded-[2rem] border border-gold/15 bg-card/45 backdrop-blur-md p-6 md:p-8 shadow-luxe transition-all duration-500 hover:border-gold/30">
            {/* Giant background Year watermark */}
            <span className="absolute -right-6 -top-8 text-[8rem] font-display font-black italic select-none pointer-events-none opacity-5 text-gold-gradient md:text-[12rem]">
              {activeMilestone.year}
            </span>
            
            <div className="grid gap-8 md:grid-cols-[280px_1fr] items-center">
              {/* Milestone image on the left */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-gold/15 bg-ink shadow-lg">
                <img 
                  src={activeMilestone.image} 
                  alt={activeMilestone.title} 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Float tag / icon */}
                <div className="absolute bottom-3 left-3 z-10">
                  <div className="relative flex size-10 items-center justify-center rounded-full border border-gold/30 bg-ink/90 shadow-2xl backdrop-blur-sm">
                    {(() => {
                      const Icon = activeMilestone.Icon;
                      return <Icon className="size-5 text-gold-gradient" strokeWidth={1.5} />;
                    })()}
                  </div>
                </div>
              </div>
              
              {/* Content text */}
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-4 py-1 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                    <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                    {activeMilestone.date}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3.5xl">
                  {activeMilestone.title}
                </h3>
                
                <p className="mt-4 text-base leading-relaxed text-muted-foreground/80 md:text-lg">
                  {activeMilestone.body}
                </p>
              </div>
            </div>
            
            {/* Roadmap Navigation Panel */}
            <div className="mt-8 flex items-center justify-between border-t border-gold/10 pt-6">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 cursor-pointer font-button text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60 transition-colors hover:text-gold"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
              
              <span className="font-display text-sm italic text-gold/55 select-none">
                Step {activeIndex + 1} of {milestones.length}
              </span>
              
              <button
                onClick={handleNext}
                className="flex items-center gap-2 cursor-pointer font-button text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60 transition-colors hover:text-gold"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
