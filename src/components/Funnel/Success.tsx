import { Check, MessageCircle, FileText, Sparkles } from "lucide-react";
import type { FunnelData } from "./Funnel";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

type Props = { data: FunnelData };

type Scores = {
  marketing: number;
  conteudo: number;
  automacao: number;
  posicionamento: number;
  vendas: number;
};

function calcScores(d: FunnelData): Scores {
  // Marketing
  let marketing = 20;
  marketing += Math.min(d.canais.filter((c) => c !== "Não faço divulgação").length * 8, 40);
  if (d.anuncios === "Sim") marketing += 20;
  else if (d.anuncios === "Já investi antes") marketing += 10;
  if (d.equipeMkt === "Sim") marketing += 15;
  marketing = Math.min(marketing, 95);

  // Conteúdo
  const freqMap: Record<string, number> = {
    "Todo dia": 70, "3 a 5 vezes": 55, "1 a 2 vezes": 35, "Quase nunca": 15, "Nunca": 5,
  };
  let conteudo = freqMap[d.frequenciaConteudo] ?? 10;
  if (d.gravaVideos === "Sim") conteudo += 15;
  if (d.ferramentas.some((f) => ["Canva", "CapCut"].includes(f))) conteudo += 10;
  conteudo = Math.min(conteudo, 95);

  // Automação (uso de IA)
  const iaTools = d.ferramentas.filter((f) => ["ChatGPT", "Gemini", "Claude", "IA para imagens"].includes(f)).length;
  let automacao = 10 + iaTools * 18;
  if (d.ferramentas.includes("Nenhuma")) automacao = 5;
  automacao = Math.min(automacao, 95);

  // Posicionamento
  const tempoMap: Record<string, number> = {
    "Menos de 6 meses": 25, "6 meses a 1 ano": 40, "1 a 3 anos": 60, "Mais de 3 anos": 75,
  };
  let posicionamento = tempoMap[d.tempoNegocio] ?? 30;
  if (d.situacao === "Meu negócio não aparece") posicionamento -= 15;
  if (d.situacao === "Tenho seguidores mas vendo pouco") posicionamento += 5;
  posicionamento = Math.max(10, Math.min(posicionamento, 95));

  // Vendas
  const fatMap: Record<string, number> = {
    "Ainda não vendo": 5,
    "Até R$ 2 mil": 20,
    "R$ 2 mil a R$ 5 mil": 35,
    "R$ 5 mil a R$ 10 mil": 55,
    "R$ 10 mil a R$ 30 mil": 75,
    "Acima de R$ 30 mil": 90,
  };
  const vendas = fatMap[d.faturamento] ?? 20;

  return { marketing, conteudo, automacao, posicionamento, vendas };
}

function scoreKria(s: Scores) {
  return Math.round((s.marketing + s.conteudo + s.automacao + s.posicionamento + s.vendas) / 5);
}

function recomendar(d: FunnelData, s: Scores) {
  const entries = Object.entries(s) as [keyof Scores, number][];
  entries.sort((a, b) => a[1] - b[1]);
  const fraco = entries[0][0];

  const mapServico: Record<keyof Scores, string> = {
    conteudo: "Gestão de Conteúdo com IA",
    marketing: "Tráfego Pago Estratégico",
    automacao: "Automação com IA Kria",
    posicionamento: "Posicionamento Estratégico de Marca",
    vendas: "Funil de Vendas com IA",
  };

  const mapDiagnostico: Record<keyof Scores, string> = {
    conteudo: "geração e consistência de conteúdo",
    marketing: "aquisição de clientes e divulgação",
    automacao: "automação e uso inteligente de IA",
    posicionamento: "posicionamento e percepção de marca",
    vendas: "estrutura de vendas e conversão",
  };

  return {
    servico: mapServico[fraco],
    diagnostico: `Identificamos que seu principal gargalo está em ${mapDiagnostico[fraco]}. Esse é o ponto que mais limita seu crescimento agora.`,
    gargalo: fraco,
  };
}

function buildMensagem(d: FunnelData, s: Scores, servico: string, resumo: string) {
  return [
    `*Novo Diagnóstico Kria Recebido* ✨`,
    "",
    `*Nome:* ${d.nome}`,
    `*Instagram:* ${d.instagram}`,
    `*Segmento:* ${d.segmento}`,
    `*Faturamento:* ${d.faturamento}`,
    `*Principal Problema:* ${d.situacao} — ${d.problemaUm}`,
    `*Investimento em Marketing:* ${d.anuncios}`,
    `*Serviço Recomendado:* ${servico}`,
    "",
    `*Score Kria:* ${scoreKria(s)}/100`,
    `• Marketing: ${s.marketing}%`,
    `• Conteúdo: ${s.conteudo}%`,
    `• Automação: ${s.automacao}%`,
    `• Posicionamento: ${s.posicionamento}%`,
    `• Vendas: ${s.vendas}%`,
    "",
    `*Resumo:* ${resumo}`,
  ].join("\n");
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground/90">{label}</span>
        <span className="font-bold text-primary">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Success({ data }: Props) {
  const scores = calcScores(data);
  const total = scoreKria(scores);
  const rec = recomendar(data, scores);
  const primeiroNome = data.nome.split(" ")[0] || data.nome;
  const mensagem = buildMensagem(data, scores, rec.servico, rec.diagnostico);

  const [premiumLoading, setPremiumLoading] = useState(false);
  const [premiumSent, setPremiumSent] = useState(false);

  const requestPremium = async () => {
    setPremiumLoading(true);
    try {
      await fetch("https://formspree.io/f/xkoabjow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🔥 LEAD QUENTE — Diagnóstico Completo — ${data.nome}`,
          tipo: "Interesse no Diagnóstico Premium",
          nome: data.nome,
          whatsapp: data.whatsapp,
          instagram: data.instagram,
          segmento: data.segmento,
          servicoRecomendado: rec.servico,
          scoreKria: total,
        }),
      });
      setPremiumSent(true);
      toast.success("Recebemos seu interesse! A Kria vai entrar em contato.");
    } catch {
      toast.error("Não conseguimos registrar agora. Tente pelo WhatsApp.");
    } finally {
      setPremiumLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <div className="mx-auto inline-flex animate-check items-center justify-center rounded-full bg-success p-5 text-success-foreground shadow-xl shadow-success/30">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
        <h2 className="mt-6 text-3xl font-black tracking-tight md:text-4xl">
          Seu Diagnóstico Kria está pronto, {primeiroNome}!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Analisamos suas respostas e montamos um raio-x estratégico do seu negócio.
        </p>
      </div>

      {/* CARD VISUAL */}
      <div className="mt-8 overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-7 shadow-xl shadow-primary/10 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" /> Diagnóstico Kria AI
            </div>
            <div className="mt-3 text-2xl font-black md:text-3xl">{data.nome}</div>
            <div className="text-sm text-muted-foreground">{data.instagram} · {data.segmento}</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Score Kria</div>
            <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-5xl font-black leading-none text-transparent md:text-6xl">
              {total}
            </div>
            <div className="text-xs font-semibold text-muted-foreground">de 100</div>
          </div>
        </div>

        <div className="mt-7 grid gap-3">
          <Bar label="Marketing" value={scores.marketing} />
          <Bar label="Conteúdo" value={scores.conteudo} />
          <Bar label="Automação" value={scores.automacao} />
          <Bar label="Posicionamento" value={scores.posicionamento} />
          <Bar label="Vendas" value={scores.vendas} />
        </div>

        <div className="mt-7 rounded-2xl border border-primary/20 bg-card/70 p-5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Diagnóstico estratégico</div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 md:text-base">{rec.diagnostico}</p>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold text-foreground">Serviço recomendado: {rec.servico}</span>
          </div>
        </div>
      </div>

      {/* CTA WHATSAPP */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={() => window.open(waLink(mensagem), "_blank")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-600"
        >
          <MessageCircle className="h-5 w-5" />
          Falar com a Kria no WhatsApp
        </button>
        <p className="text-xs text-muted-foreground">Sua resposta vai com o resumo completo do diagnóstico.</p>
      </div>

      {/* PDF PREMIUM */}
      <div className="mt-10 rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-7 text-center md:p-10">
        <div className="text-xs font-bold uppercase tracking-widest text-primary">Próximo nível</div>
        <h3 className="mt-2 text-xl font-black md:text-2xl">Seu diagnóstico inicial está pronto.</h3>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Quer receber o <strong>Diagnóstico Kria Completo</strong> com plano de ação personalizado para os próximos 30 dias?
        </p>
        <button
          type="button"
          onClick={requestPremium}
          disabled={premiumLoading || premiumSent}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.02] disabled:opacity-70"
        >
          <FileText className="h-5 w-5" />
          {premiumSent ? "Interesse registrado ✓" : premiumLoading ? "Enviando..." : "Receber Diagnóstico Completo"}
        </button>
      </div>
    </div>
  );
}

export function buildWhatsMessage(_data: FunnelData) {
  return "";
}
