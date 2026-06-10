const partners = [
  { name: "Troika", short: "TRK" },
  { name: "Veropa Films", short: "VRP" },
  { name: "SB Marketing", short: "SB" },
];

export default function Partners() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Agências parceiras
        </div>
        <h2 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">
          Quem caminha com a Kria AI
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          Quando faz mais sentido, conectamos você diretamente a quem resolve.
        </p>

        <div className="mt-10 grid grid-cols-1 items-center gap-6 sm:grid-cols-3">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex h-24 items-center justify-center rounded-2xl border bg-card px-6 shadow-sm transition hover:shadow-md"
              title={p.name}
            >
              <div className="flex items-center gap-3 opacity-70 transition group-hover:opacity-100">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xs font-black tracking-widest text-primary">
                  {p.short}
                </span>
                <span className="text-base font-bold tracking-tight text-foreground">
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
