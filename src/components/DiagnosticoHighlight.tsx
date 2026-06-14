import { Check, Sparkles, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";

const ITEMS = [
  "Análise da situação atual do seu negócio",
  "Sugestões práticas de marketing",
  "Oportunidades de crescimento",
  "Tendências do seu nicho",
  "Ideias de conteúdo sob medida",
  "Cronograma básico de execução",
  "Ferramentas recomendadas",
  "Próximos passos claros",
];

const MSG =
  "Olá Kria! Quero receber o Diagnóstico Kria AI (R$ 59) personalizado para o meu negócio.";

export default function DiagnosticoHighlight() {
  return (
    <section id="diagnostico" className="px-6 pb-16 pt-4 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-deep p-8 text-primary-foreground shadow-2xl shadow-primary/30 md:p-12">
          <span className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <span className="pointer-events-none absolute -left-12 bottom-[-4rem] h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Produto principal
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                Diagnóstico Kria AI
              </h2>
              <p className="mt-3 max-w-md text-primary-foreground/80">
                Um relatório personalizado para entender exatamente onde seu negócio pode crescer — e como começar agora.
              </p>

              <div className="mt-6 inline-flex items-baseline gap-2 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/15 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">A partir de</span>
                <span className="text-4xl font-black">R$ 59</span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-black text-accent-foreground shadow-xl shadow-accent/30 transition hover:scale-[1.02] hover:bg-accent/90"
                >
                  <MessageCircle className="h-5 w-5" />
                  Receber Diagnóstico Kria AI
                </a>
              </div>
              <p className="mt-3 text-xs text-primary-foreground/60">
                Atendimento direto no WhatsApp · resposta em até 24h.
              </p>
            </div>

            <ul className="grid gap-2.5 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur sm:grid-cols-2">
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
