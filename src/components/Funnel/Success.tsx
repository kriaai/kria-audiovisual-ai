import { Check, MessageCircle } from "lucide-react";
import type { FunnelData } from "./Funnel";

type Props = { data: FunnelData };

export default function Success({ data }: Props) {
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

  const tags: { label: string; cls: string }[] = [
    { label: data.nicho, cls: "bg-primary/10 text-primary" },
    { label: data.servico, cls: "bg-accent/15 text-accent" },
    ...data.checkboxes.map((c) => ({ label: c, cls: "bg-fuchsia-100 text-fuchsia-700" })),
    { label: fmt(data.orcamento), cls: "bg-emerald-100 text-emerald-700" },
  ];

  const buildWhatsMessage = () => {
    const parts: string[] = [
      `Olá Kria! Sou ${data.nome}.`,
      ``,
      `*Nicho:* ${data.nicho}`,
      `*Serviço:* ${data.servico}`,
    ];
    if (data.checkboxes.length) parts.push(`*Especificações:* ${data.checkboxes.join(", ")}`);
    const extraVals = Object.entries(data.extras).filter(([, v]) => v);
    for (const [k, v] of extraVals) parts.push(`*${k}:* ${v}`);
    if (data.descricao) parts.push(`*Descrição:* ${data.descricao}`);
    parts.push(`*Orçamento:* ${fmt(data.orcamento)}`);
    if (data.observacoes) parts.push(`*Observações:* ${data.observacoes}`);
    return parts.join("\n");
  };

  const whatsHref = `https://wa.me/5591985091584?text=${encodeURIComponent(buildWhatsMessage())}`;

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

      <a
        href={whatsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-600"
      >
        <MessageCircle className="h-5 w-5" />
        Abrir WhatsApp com resumo
      </a>
    </div>
  );
}
