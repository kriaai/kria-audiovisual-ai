import { Check, Sparkles, ArrowRight } from "lucide-react";

const ITEMS = [
  "Entenda o momento do seu negócio",
  "Descubra seus principais gargalos",
  "Veja por onde começar",
  "Encontre soluções mais alinhadas com sua realidade",
  "Tome decisões com mais clareza",
];

export default function DiagnosticoHighlight() {
  const goForm = () => {
    const el = document.getElementById("diagnostico-kria");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="cta-diagnostico" className="px-6 pb-16 pt-4 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-deep p-8 text-primary-foreground shadow-2xl shadow-primary/30 md:p-12">
          <span className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <span className="pointer-events-none absolute -left-12 bottom-[-4rem] h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Diagnóstico
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                Faça seu <span className="text-accent">Diagnóstico Kria AI</span>
              </h2>
              <p className="mt-3 max-w-md text-primary-foreground/85">
                Responda nosso formulário para entender exatamente onde seu negócio pode crescer —
                e como começar agora.
              </p>

              <div className="mt-6 inline-flex items-baseline gap-2 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/15 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">100%</span>
                <span className="text-4xl font-black">GRÁTIS</span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={goForm}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-black text-accent-foreground shadow-xl shadow-accent/30 transition hover:scale-[1.02] hover:bg-accent/90"
                >
                  <Sparkles className="h-5 w-5" />
                  Fazer diagnóstico grátis
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-xs text-primary-foreground/60">
                Leva cerca de 2 minutos · sem compromisso.
              </p>
            </div>

            <ul className="grid gap-2.5 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur">
              {ITEMS.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-primary-foreground/90">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
