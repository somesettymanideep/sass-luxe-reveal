import Lenis from "lenis";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ensureGsap, ScrollTrigger } from "@/lib/motion";

export function SmoothScroll() {
  const { pathname, hash } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      hash: s.location.hash,
    }),
  });

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -90, immediate: true });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    const onAnchor = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"], a[href^="/#"]',
      );
      if (!anchor) return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw === "#" || raw === "/#") return;
      const id = raw.startsWith("/#") ? raw.slice(1) : raw;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(frame);
      delete (window as unknown as { lenis?: Lenis }).lenis;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const win = window as unknown as { lenis?: Lenis };
    if (!hash) {
      window.scrollTo(0, 0);
      if (win.lenis) {
        win.lenis.scrollTo(0, { immediate: true });
      }
    } else {
      const target = document.getElementById(hash.replace(/^#/, ""));
      if (target) {
        if (win.lenis) {
          win.lenis.scrollTo(target, { offset: -90 });
        } else {
          target.scrollIntoView();
        }
      }
    }
  }, [pathname, hash]);

  return null;
}
