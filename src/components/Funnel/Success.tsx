import { Check, MessageCircle } from "lucide-react";
import type { FunnelData } from "./Funnel";

type Props = { data: FunnelData };

const PRAZO_LABEL: Record<string, string> = {
  urgente: "urgente (até 3 dias)",
  rapido: "rápido (até 1 semana)",
  normal: "normal (2 a 4 semanas)",
  flexivel: "flexível (sem pressa)",
};

const WHATS_NUMBER = "559195091584";

function buildResumoEstrategico(data: FunnelData) {
  const primeiroNome = data.nome.split(" ")[0] || data.nome;
  const segmento = data.nicho?.toLowerCase() || "seu segmento";
  const servicos = data.servicos.length
    ? data.servicos.join(", ").toLowerCase()
    : "as soluções da Kria AI";
  const prazoTxt = data.prazo ? ` com prazo ${PRAZO_LABEL[data.prazo] ?? data.prazo}` : "";
  return `${primeiroNome} atua no segmento de ${segmento} e busca avançar com ${servicos}${prazoTxt}. A Kria AI recomenda um plano sob medida combinando estratégia, produção e automação para acelerar os resultados.`;
}

export function buildWhatsMessage(data: FunnelData) {
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

  const segmento = data.nicho || "—";
  const objetivo = data.descricao?.trim()
    ? data.descricao.trim()
    : `Evoluir no segmento de ${segmento.toLowerCase()} com apoio da Kria AI.`;

  const dores = data.checkboxes.length
    ? data.checkboxes.map((c) => `  - ${c.replace(/^[^:]+:\s*/, "")}`).join("\n")
    : "  - A detalhar em conversa";

  const servicos = data.servicos.length
    ? data.servicos.map((s) => `  - ${s}`).join("\n")
    : "  - A definir";

  const valor = fmt(data.orcamento);
  const resumo = buildResumoEstrategico(data);

  return [
    "Olá, equipe Kria AI.",
    "",
    "Acabei de concluir o diagnóstico estratégico do site.",
    "",
    `Meu nome é: ${data.nome}`,
    "",
    "Resumo do meu projeto:",
    "",
    `• Segmento: ${segmento}`,
    `• Objetivo principal: ${objetivo}`,
    "• Principais desafios:",
    dores,
    "• Serviços de interesse:",
    servicos,
    `• Faixa de investimento: ${valor}`,
    "",
    "Resumo estratégico:",
    "",
    resumo,
    "",
    "Mensagem final:",
    "",
    "Gostaria de receber uma proposta personalizada para meu negócio.",
  ].join("\n");
}

export default function Success({ data }: Props) {
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

  const tags: { label: string; cls: string }[] = [
    { label: data.nicho, cls: "bg-primary/10 text-primary" },
    ...data.servicos.map((s) => ({ label: s, cls: "bg-accent/15 text-accent" })),
    ...data.checkboxes.map((c) => ({ label: c, cls: "bg-fuchsia-100 text-fuchsia-700" })),
    { label: fmt(data.orcamento), cls: "bg-emerald-100 text-emerald-700" },
  ];

  const openWhats = () => {
    const mensagem = buildWhatsMessage(data);
    const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto inline-flex animate-check items-center justify-center rounded-full bg-success p-5 text-success-foreground shadow-xl shadow-success/30">
        <Check className="h-10 w-10" strokeWidth={3} />
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight md:text-4xl">Proposta enviada!</h2>
      <p className="mt-2 text-muted-foreground">
        Recebemos suas respostas, {data.nome.split(" ")[0]}. Agora é só falar com a Kria pelo WhatsApp.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {tags.map((t, i) => (
          <span key={i} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${t.cls}`}>
            {t.label}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={openWhats}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-600"
      >
        <MessageCircle className="h-5 w-5" />
        Abrir WhatsApp com resumo
      </button>
    </div>
  );
}
