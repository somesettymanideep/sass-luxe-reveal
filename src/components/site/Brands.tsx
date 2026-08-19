const brands = [
  "KÉRASTASE",
  "OLAPLEX",
  "L'ORÉAL PROFESSIONNEL",
  "SCHWARZKOPF",
  "WELLA",
  "DERMALOGICA",
  "MAC",
  "O.P.I",
];

export function Brands() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-gold/15 bg-background py-14">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-16 group-hover:[animation-play-state:paused]">
          {row.map((b, i) => (
            <span
              key={i}
              className="cursor-default whitespace-nowrap font-button text-sm font-semibold tracking-[0.28em] text-muted-foreground/50 transition-all duration-500 hover:scale-110 hover:text-gold"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
