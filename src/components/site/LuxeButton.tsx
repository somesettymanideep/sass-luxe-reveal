import { forwardRef, useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ink";

interface LuxeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  magnetic?: boolean;
}

const base =
  "ripple-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-11";

const variants: Record<Variant, string> = {
  gold: "bg-[image:var(--gradient-gold)] text-black shadow-gold hover:brightness-110",
  outline:
    "border border-gold/60 text-gold hover:bg-gold/10 hover:border-gold backdrop-blur-sm",
  ink: "bg-primary text-primary-foreground hover:bg-primary/90",
};

export const LuxeButton = forwardRef<HTMLButtonElement, LuxeButtonProps>(
  ({ className, variant = "gold", magnetic = true, children, onClick, ...props }, ref) => {
    const localRef = useRef<HTMLButtonElement | null>(null);

    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !localRef.current) return;
      const rect = localRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      localRef.current.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    };

    const handleLeave = () => {
      if (localRef.current) localRef.current.style.transform = "";
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const el = localRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const span = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        span.className = "ripple";
        span.style.width = span.style.height = `${size}px`;
        span.style.left = `${e.clientX - rect.left - size / 2}px`;
        span.style.top = `${e.clientY - rect.top - size / 2}px`;
        el.appendChild(span);
        window.setTimeout(() => span.remove(), 700);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

LuxeButton.displayName = "LuxeButton";
