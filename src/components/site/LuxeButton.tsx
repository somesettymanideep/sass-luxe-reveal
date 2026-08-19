import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ink";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  children: ReactNode;
}

const base =
  "relative isolate inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] font-button transition-[transform,box-shadow,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  gold: "bg-gold-gradient text-ink hover:shadow-gold",
  outline:
    "border border-gold/50 text-current hover:border-gold hover:text-gold hover:shadow-gold",
  ink: "bg-ink text-cream hover:shadow-luxe",
};

export function LuxeButton({
  variant = "gold",
  className,
  children,
  as = "button",
  href,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const ripple = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 2;
    span.style.cssText = `position:absolute;left:${e.clientX - rect.left - size / 2}px;top:${
      e.clientY - rect.top - size / 2
    }px;width:${size}px;height:${size}px;border-radius:9999px;background:currentColor;opacity:0.22;transform:scale(0);pointer-events:none;z-index:-1;transition:transform .6s cubic-bezier(0.22,1,0.36,1),opacity .7s ease-out;`;
    el.appendChild(span);
    requestAnimationFrame(() => {
      span.style.transform = "scale(1)";
      span.style.opacity = "0";
    });
    setTimeout(() => span.remove(), 750);
  };

  const cls = cn(base, variants[variant], className);

  if (as === "a") {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        onClick={ripple}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      onClick={(e) => {
        ripple(e);
        rest.onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
