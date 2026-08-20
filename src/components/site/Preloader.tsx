import { useEffect, useState } from "react";
import logo from "@/assets/sass-logo-new.png.asset.json";
import { Scissors, Sparkles, Heart, Star, Sparkle } from "lucide-react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const icons = [
    { Icon: Scissors, label: "Precision" },
    { Icon: Sparkles, label: "Luxe" },
    { Icon: Heart, label: "Care" },
    { Icon: Star, label: "Glamour" },
    { Icon: Sparkle, label: "Style" }
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % icons.length);
    }, 400);

    const t1 = setTimeout(() => {
      clearInterval(iconInterval);
      setDone(true);
    }, 2000);
    
    const t2 = setTimeout(() => setHidden(true), 2900);
    
    return () => {
      clearInterval(iconInterval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        opacity: done ? 0 : 1,
        transform: done ? "scale(1.04)" : "scale(1)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        {/* Decorative Ring */}
        <div className="absolute inset-0 rounded-full border border-gold/20 animate-[spin_8s_linear_infinite]" />
        
        {/* Animated Icons */}
        {icons.map(({ Icon }, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-luxe"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transform: `scale(${activeIndex === index ? 1 : 0.5}) rotate(${activeIndex === index ? 0 : -45}deg)`,
            }}
          >
            <Icon className="h-10 w-10 text-gold" strokeWidth={1.5} />
          </div>
        ))}
      </div>

      <div className="relative h-20 w-64 px-4 overflow-hidden flex items-center justify-center">
        <img
          src={logo.url.startsWith('/') && !logo.url.startsWith("/sass-luxe-reveal/") ? `${"/sass-luxe-reveal/".replace(/\/$/, '')}${logo.url}` : logo.url}
          alt="SASS Hair & Beauty"
          className="h-full w-auto object-contain transition-all duration-700 ease-luxe"
          style={{ 
            opacity: done ? 0 : 1,
            transform: done ? "translateY(-10px)" : "translateY(0)",
            filter: "brightness(0) invert(1) contrast(1.2)"
          }}
        />
      </div>

      <div className="mt-8 h-px w-40 overflow-hidden bg-cream/15">
        <div
          className="h-full bg-gold-gradient"
          style={{
            width: done ? "100%" : `${(activeIndex + 1) * (100 / icons.length)}%`,
            transition: "width 0.4s ease-out",
          }}
        />
      </div>
      
      <p className="eyebrow mt-6 text-cream/50 min-h-[1em] transition-opacity duration-300" style={{ opacity: done ? 0 : 1 }}>
        {icons[activeIndex]?.label ?? "SASS"}
      </p>
    </div>
  );
}
