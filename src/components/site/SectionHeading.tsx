import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "reveal max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow text-gold-deep">{eyebrow}</p> : null}
      <h2
        className={cn(
          "mt-4 text-4xl leading-[1.1] sm:text-5xl",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      <div className={cn("rule-gold mt-6", align === "center" && "mx-auto")} />
      {subtitle ? (
        <p
          className={cn(
            "mt-5 text-sm leading-relaxed sm:text-base",
            dark ? "text-ivory/65" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
