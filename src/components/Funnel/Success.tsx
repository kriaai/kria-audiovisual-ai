import { Check, MessageCircle, Sparkles, Star, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import type { FunnelData } from "./Funnel";
import { useMemo, useState } from "react";
import { calcScores, scoreKria, recomendar, classificarLead, type Pacote } from "./packages";

type Props = { data: FunnelData };

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

function buildMensagemWhats(
  d: FunnelData,
  total: number,
  principal: Pacote,
  selecionados: Pacote[]
): string {
  const primeiroNome = d.nome.split(" ")[0] || d.nome;
  const lista = selecionados.length > 0
    ? selecionados.map((p) => `• ${p.nome} — ${p.preco}`).join("\n")
    : "• (nenhum selecionado ainda)";

  return [
    `Olá, equipe Kria AI! 👋`,
    ``,
    `Acabei de concluir meu Diagnóstico Kria AI.`,
    ``,
    `*Nome:* ${primeiroNome}`,
    `*Instagram:* ${d.instagram}`,
    `*E-mail:* ${d.email}`,
    `*Segmento:* ${d.segmento}`,
    `*Score Kria:* ${total}/100`,
    ``,
    `*Pacote recomendado:* ${principal.nome} — ${principal.preco}`,
    ``,
    `*Pacotes que tenho interesse:*`,
    lista,
    ``,
    `*Objetivo (90 dias):* ${d.objetivo90dias}`,
    `*Urgência:* ${d.urgencia}`,
    `*Investimento previsto:* ${d.faixaInvestimento}`,
    ``,
    `*Principal problema relatado:*`,
    d.problemaPrincipalTexto,
    ``,
    `Quero conversar sobre a melhor solução para o meu negócio. 🚀`,
  ].join("\n");
}

function PacoteCard({
  pacote,
  destaque,
  selecionado,
  onToggle,
  motivo,
}: {
  pacote: Pacote;
  destaque?: boolean;
  selecionado: boolean;
  onToggle: () => void;
  motivo?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-full rounded-2xl border p-5 text-left transition ${
        destaque
          ? "border-primary bg-gradient-to-br from-primary/10 via-card to-accent/10 shadow-xl shadow-primary/15"
          : "border-border bg-card hover:border-primary/40"
      } ${selecionado ? "ring-2 ring-primary" : ""}`}
    >
      {destaque && (
        <div className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-widest text-accent-foreground shadow-md">
          <Star className="h-3 w-3" /> Mais indicado para você
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={`font-black ${destaque ? "text-lg md:text-xl" : "text-base"}`}>{pacote.nome}</div>
          <div className="mt-0.5 text-sm font-bold text-primary">{pacote.preco}</div>
        </div>
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
            selecionado ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
          }`}
        >
          {selecionado && <Check className="h-4 w-4" strokeWidth={3} />}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{pacote.descricao}</p>
      {motivo && (
        <div className="mt-3 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
          {motivo}
        </div>
      )}
    </button>
  );
}

export default function Success({ data }: Props) {
  const scores = useMemo(() => calcScores(data), [data]);
  const total = useMemo(() => scoreKria(scores), [scores]);
  const rec = useMemo(() => recomendar(data, scores), [data, scores]);
  const primeiroNome = data.nome.split(" ")[0] || data.nome;

  const todosPacotes = useMemo(() => [rec.principal, ...rec.adicionais], [rec]);
  const [selecionadosIds, setSelecionadosIds] = useState<string[]>([rec.principal.id]);
  const [enviando, setEnviando] = useState(false);

  const toggle = (id: string) =>
    setSelecionadosIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const selecionados = todosPacotes.filter((p) => selecionadosIds.includes(p.id));

  const continuarWhats = async () => {
    setEnviando(true);
    const mensagem = buildMensagemWhats(data, total, rec.principal, selecionados);
    // Envia para Formspree os pacotes selecionados antes de abrir o WhatsApp
    try {
      await fetch("https://formspree.io/f/xkoabjow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🛒 Seleção de pacotes — ${data.nome} | Score ${total}`,
          tipoFormulario: "Diagnóstico Kria AI",
          tipo: "Seleção de pacotes após diagnóstico",
          nome: data.nome,
          whatsapp: data.whatsapp,
          email: data.email,
          instagram: data.instagram,
          segmento: data.segmento,
          scoreKria: total,
          classificacaoLead: classificarLead(data.urgencia),
          pontosFortes: rec.pontosFortes.join(", "),
          gargalos: rec.gargalos.join(", "),
          oportunidades: rec.oportunidades.join(" | "),
          pacotePrincipalRecomendado: `${rec.principal.nome} (${rec.principal.preco})`,
          pacotesAdicionaisExibidos: rec.adicionais.map((p) => p.nome).join(", "),
          pacotesSelecionados: selecionados.map((p) => `${p.nome} (${p.preco})`).join(", "),
          objetivo90dias: data.objetivo90dias,
          urgencia: data.urgencia,
          faixaInvestimento: data.faixaInvestimento,
          problemaPrincipalTexto: data.problemaPrincipalTexto,
        }),
      });
    } catch (e) {
      console.error("Erro ao enviar seleção ao Formspree:", e);
    } finally {
      setEnviando(false);
      window.open(
        `https://wa.me/5591985091584?text=${encodeURIComponent(mensagem)}`,
        "_blank"
      );
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
          Analisamos suas respostas e identificamos os principais gargalos que estão limitando seu crescimento digital.
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
          <Bar label="Conteúdo" value={scores.conteudo} />
          <Bar label="Autoridade" value={scores.autoridade} />
          <Bar label="Presença Digital" value={scores.presencaDigital} />
          <Bar label="Estrutura" value={scores.estrutura} />
          <Bar label="Aquisição de Clientes" value={scores.aquisicao} />
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-success/30 bg-success/5 p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-success">
              <TrendingUp className="h-3 w-3" /> Pontos fortes
            </div>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-foreground/90">
              {rec.pontosFortes.length > 0
                ? rec.pontosFortes.map((p) => <li key={p}>• {p}</li>)
                : <li className="text-muted-foreground">A construir 💪</li>}
            </ul>
          </div>
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-destructive">
              <AlertTriangle className="h-3 w-3" /> Gargalos
            </div>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-foreground/90">
              {rec.gargalos.length > 0
                ? rec.gargalos.map((p) => <li key={p}>• {p}</li>)
                : <li className="text-muted-foreground">Nenhum crítico</li>}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
              <Lightbulb className="h-3 w-3" /> Oportunidades
            </div>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-foreground/90">
              {rec.oportunidades.map((p) => <li key={p}>• {p}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* RECOMENDAÇÕES DE PACOTES */}
      <div className="mt-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            <Sparkles className="h-3 w-3" /> Plano recomendado
          </div>
          <h3 className="mt-3 text-2xl font-black md:text-3xl">A prescrição da Kria para o seu momento</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecione um ou mais pacotes para conversar com a nossa equipe.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <PacoteCard
            pacote={rec.principal}
            destaque
            selecionado={selecionadosIds.includes(rec.principal.id)}
            onToggle={() => toggle(rec.principal.id)}
            motivo={rec.motivo}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {rec.adicionais.map((p) => (
              <PacoteCard
                key={p.id}
                pacote={p}
                selecionado={selecionadosIds.includes(p.id)}
                onToggle={() => toggle(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Resumo da seleção */}
        <div className="mt-6 rounded-2xl border bg-card p-5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Você selecionou</div>
          {selecionados.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Nenhum pacote selecionado.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {selecionados.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-foreground/90">{p.nome}</span>
                  <span className="font-bold text-primary">{p.preco}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={continuarWhats}
            disabled={enviando}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-600 disabled:opacity-70"
          >
            <MessageCircle className="h-5 w-5" />
            {enviando ? "Abrindo WhatsApp..." : "Continuar pelo WhatsApp"}
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/diagnostico-pdf" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-purple-600/30 transition hover:scale-[1.02] hover:bg-purple-700"
          >
            <FileText className="h-5 w-5" />
            Quero meu diagnóstico em PDF
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Sua mensagem no WhatsApp já vai com o resumo do diagnóstico e os pacotes escolhidos.
        </p>
      </div>
    </div>
  );
}

export function buildWhatsMessage(_data: FunnelData) {
  return "";
}
