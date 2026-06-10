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
  const segmento = data.nicho?.toLowerCase() || "meu segmento";
  const servicos = data.servicos.length
    ? data.servicos.join(", ").toLowerCase()
    : "as soluções da Kria AI";
  return `Acredito que preciso estruturar melhor minha presença com ${servicos}, focando em ${segmento}, para crescer com mais consistência e resultado.`;
}

export function buildWhatsMessage(data: FunnelData) {
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;
  const primeiroNome = data.nome.split(" ")[0] || data.nome;
  const segmento = data.nicho || "—";
  const objetivo = data.descricao?.trim()
    ? data.descricao.trim()
    : `Evoluir no segmento de ${segmento.toLowerCase()} com apoio da Kria AI.`;

  const dores = data.checkboxes.length
    ? data.checkboxes.map((c) => `• ${c.replace(/^[^:]+:\s*/, "")}`).join("\n")
    : "• A detalhar em conversa";

  const servicos = data.servicos.length
    ? data.servicos.map((s) => `• ${s}`).join("\n")
    : "• A definir";

  const prazoTxt = data.prazo ? PRAZO_LABEL[data.prazo] ?? data.prazo : "a combinar";
  const valor = fmt(data.orcamento);
  const resumo = buildResumoEstrategico(data);

  return [
    `Olá, equipe Kria AI! 👋`,
    "",
    `Meu nome é *${primeiroNome}* e acabei de fazer o diagnóstico no site.`,
    "",
    `👤 *Sobre mim*`,
    `• Nicho: ${segmento}`,
    `• WhatsApp: ${data.whatsapp}`,
    `• E-mail: ${data.email}`,
    "",
    `🎯 *Meu objetivo*`,
    objetivo,
    "",
    `⚠️ *Principais desafios*`,
    dores,
    "",
    `💡 *Tenho interesse em*`,
    servicos,
    "",
    `⏱️ *Prazo ideal*: ${prazoTxt}`,
    `💰 *Investimento*: ${valor}`,
    "",
    `📌 *Resumo*`,
    resumo,
    "",
    `Gostaria de receber uma proposta personalizada. 🚀`,
  ].join("\n");
}

export default function Success({ data }: Props) {
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;
  const primeiroNome = data.nome.split(" ")[0] || data.nome;

  const tags: { label: string; cls: string }[] = [
    { label: data.nicho, cls: "bg-primary/10 text-primary" },
    ...data.servicos.map((s) => ({ label: s, cls: "bg-accent/15 text-accent" })),
    ...data.checkboxes.map((c) => ({ label: c, cls: "bg-fuchsia-100 text-fuchsia-700" })),
    { label: fmt(data.orcamento), cls: "bg-emerald-100 text-emerald-700" },
  ];

  const mensagem = buildWhatsMessage(data);

  const openWhats = () => {
    const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto inline-flex animate-check items-center justify-center rounded-full bg-success p-5 text-success-foreground shadow-xl shadow-success/30">
        <Check className="h-10 w-10" strokeWidth={3} />
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight md:text-4xl">Diagnóstico pronto!</h2>
      <p className="mt-2 text-muted-foreground">
        Com base nas suas respostas, {primeiroNome}, identificamos as maiores oportunidades para acelerar seu crescimento.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {tags.map((t, i) => (
          <span key={i} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${t.cls}`}>
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border bg-muted/40 p-5 text-left">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Prévia da sua mensagem
        </div>
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
{mensagem}
        </pre>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Esta recomendação foi gerada especificamente para o seu cenário. Quanto antes começar, maiores as chances de acelerar resultados.
      </p>

      <button
        type="button"
        onClick={openWhats}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-600"
      >
        <MessageCircle className="h-5 w-5" />
        Abrir WhatsApp com resumo
      </button>
    </div>
  );
}
