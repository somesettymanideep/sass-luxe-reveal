import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type RefObject } from "react";

let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

/** Reveal children (or self) on scroll: fade + rise + blur-to-sharp, staggered. */
export function useReveal<T extends HTMLElement>(options?: {
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
}): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const targets = options?.selector
      ? Array.from(el.querySelectorAll<HTMLElement>(options.selector))
      : [el];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: options?.y ?? 44, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.12,
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? "top 82%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Specific directional reveals mimicking Wow.js animations. */
export function useDirectionalReveal<T extends HTMLElement>(
  direction: "left" | "right" | "up" | "down",
  options?: {
    selector?: string;
    stagger?: number;
    delay?: number;
    distance?: number;
  }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const targets = options?.selector
      ? Array.from(el.querySelectorAll<HTMLElement>(options.selector))
      : [el];
    if (!targets.length) return;

    const distance = options?.distance ?? 100;
    const initialProps = {
      autoAlpha: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      scale: 0.95,
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        initialProps,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: options?.delay ?? 0,
          ease: "back.out(1.2)", // Mimics Wow.js "backIn" effect
          stagger: options?.stagger ?? 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}


/** Count from 0 to value when scrolled into view. */
export function useCounter(value: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureGsap();
    const obj = { n: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.n.toLocaleString("en-IN", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        });
      },
    });
    return () => st.kill();
  }, [value, decimals]);

  return ref;
}

export { gsap, ScrollTrigger };
