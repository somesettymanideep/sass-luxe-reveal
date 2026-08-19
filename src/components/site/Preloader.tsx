import { useEffect, useState } from "react";
import logo from "@/assets/sass-logo.png.asset.json";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1500);
    const t2 = setTimeout(() => setHidden(true), 2400);
    return () => {
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
      <img
        src={logo.url}
        alt=""
        width={220}
        height={110}
        className="w-40 invert md:w-52"
        style={{ animation: "fade-in 1s ease-out both" }}
      />
      <div className="mt-8 h-px w-40 overflow-hidden bg-cream/15">
        <div
          className="h-full bg-gold-gradient"
          style={{
            width: done ? "100%" : "0%",
            transition: "width 1.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      <p className="eyebrow mt-6 text-cream/50">Hair &amp; Beauty</p>
    </div>
  );
}
