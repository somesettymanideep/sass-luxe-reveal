import { Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/motion";

interface Props {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle: string;
  image: string;
  crumb: string;
  hideCircle?: boolean;
}


export function PageHero({ eyebrow, title, italic, subtitle, image, crumb, hideCircle }: Props) {
  const ref = useReveal<HTMLDivElement>({ selector: ".ph-fade", stagger: 0.14 });

  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      <img
        src={image}
        alt=""
        aria-hidden
        width={1600}
        height={900}
        className="absolute inset-0 size-full scale-105 object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/95" />

      {!hideCircle && (
        <span className="floaty pointer-events-none absolute right-[12%] top-[30%] size-40 rounded-full border border-gold/20" />
      )}
      <span
        className="floaty pointer-events-none absolute left-[8%] bottom-[20%] size-2 rounded-full bg-gold"
        style={{ animationDelay: "1.4s" }}
      />


      <div ref={ref} className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
        <nav aria-label="Breadcrumb" className="ph-fade">
          <ol className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.26em] text-cream/50">
            <li>
              <Link to="/" className="link-underline">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-gold">
              /
            </li>
            <li className="text-gold">{crumb}</li>
          </ol>
        </nav>
        <p className="ph-fade section-eyebrow mt-8 text-gold">{eyebrow}</p>
        <h1 className="ph-fade mt-5 max-w-4xl pb-2 text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] text-cream">
          {title} {italic && <span className="italic text-gold-gradient">{italic}</span>}
        </h1>
        <p className="ph-fade mt-6 max-w-xl text-cream/65">{subtitle}</p>
      </div>
    </section>
  );
}
