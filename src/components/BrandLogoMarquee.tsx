const BRANDS = [
  "Veropa Filmes",
  "UMAZ Brasil",
  "Troika",
  "Mercado Local",
  "Estúdio Açaí",
  "Belém Eventos",
  "Casa Criativa",
  "Norte Conecta",
];

const LOOP = [...BRANDS, ...BRANDS];

export default function BrandLogoMarquee() {
  return (
    <section aria-label="Marcas que já passaram pela Kria" className="px-6 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Quem já confiou na Kria
        </p>

        <div className="group relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

          <div className="animate-marquee-slow flex w-max items-center gap-10 py-2 group-hover:[animation-play-state:paused]">
            {LOOP.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="shrink-0 rounded-xl border border-border/60 bg-card/60 px-6 py-3 text-sm font-black uppercase tracking-widest text-foreground/60 grayscale transition hover:text-foreground hover:grayscale-0"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
