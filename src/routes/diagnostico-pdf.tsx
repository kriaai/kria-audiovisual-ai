import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/diagnostico-pdf")({
  head: () => ({
    meta: [
      { title: "Diagnóstico Kria em PDF — Plano de ação personalizado" },
      { name: "description", content: "Receba seu diagnóstico estratégico completo em PDF, entregue em até 24h no seu WhatsApp." },
      { property: "og:title", content: "Diagnóstico Kria em PDF" },
      { property: "og:description", content: "Plano de ação personalizado entregue no seu WhatsApp em até 24h." },
    ],
  }),
  component: DiagnosticoPDF,
});

function DiagnosticoPDF() {
  const beneficios = [
    "Análise do seu nicho com IA",
    "Principais oportunidades identificadas",
    "Ferramentas recomendadas para o seu caso",
    "Cronograma sugerido de implementação",
    "Entregue em até 24h no seu WhatsApp",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <header className="mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <FileText className="h-3 w-3" /> Diagnóstico em PDF
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Seu diagnóstico personalizado em IA está quase pronto
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Baseado nas suas respostas, nossa IA vai montar um plano de ação completo para o seu negócio.
          </p>
        </header>

        <section className="mt-10 rounded-3xl border bg-card p-7 shadow-xl shadow-primary/5 md:p-10">
          <h2 className="text-xl font-black md:text-2xl">O que você vai receber</h2>
          <ul className="mt-5 space-y-3">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-base text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-7 text-center shadow-xl shadow-primary/10 md:p-10">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">Investimento</div>
          <div className="mt-3 text-5xl font-black md:text-6xl">R$ 97,00</div>
          <div className="mt-1 text-sm text-muted-foreground">pagamento único, entrega em até 24h</div>

          <button
            type="button"
            onClick={() => window.open("https://link.mercadopago.com.br/kriaai", "_blank")}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-orange-500/30 transition hover:scale-[1.02] hover:bg-orange-600 md:text-lg"
          >
            Garantir meu diagnóstico por R$ 97
          </button>

          <p className="mt-4 text-xs text-muted-foreground md:text-sm">
            Após o pagamento, enviaremos seu diagnóstico personalizado diretamente no seu WhatsApp em até 24 horas.
          </p>
        </section>

        <footer className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          <div>Email: <a href="mailto:papodekria@gmail.com" className="font-semibold text-foreground hover:underline">papodekria@gmail.com</a></div>
          <div className="mt-1">© 2025 Kria AI Audiovisual</div>
        </footer>
      </div>
    </div>
  );
}
