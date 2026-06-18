import { CheckCircle2, MessageCircle, Sparkles, Target, TrendingUp, Package, ArrowRight } from "lucide-react";
import type { FunnelData } from "./Funnel";
import type { Recomendacao } from "@/lib/recommend";
import { openWhatsApp } from "@/lib/contact";

type Props = { data: FunnelData; recomendacao: Recomendacao };

export default function Success({ data, recomendacao }: Props) {
  const first = data.nome.split(" ")[0] || data.nome;
  const servicosTxt = recomendacao.servicos.join(", ");

  const msgEnviar = [
    `Olá, Kria! Fiz o diagnóstico no site.`,
    `Nome: ${data.nome}`,
    `Perfil: ${data.perfil}`,
    `Objetivo: ${data.objetivo}`,
    `Maior bloqueio: ${data.bloqueio.join(", ")}`,
    `Pacote recomendado: ${recomendacao.pacote}`,
    `Serviços indicados: ${servicosTxt}`,
    `Quero uma avaliação do meu negócio.`,
  ].join("\n");

  const msgPacote = `Olá, Kria! Meu diagnóstico indicou o ${recomendacao.pacote}. Quero entender como funciona.`;
  const msgConsultoria = `Olá, Kria! Quero agendar uma consultoria para avaliar meu negócio.`;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
          Seu Diagnóstico Kria está pronto, {first}!
        </h2>
        <p className="mt-2 text-sm text-[#B8AFC8] md:text-base">
          Seu diagnóstico foi gerado. Agora você pode falar com a Kria no WhatsApp
          e receber uma avaliação mais certeira.
        </p>
      </div>

      {/* Mini relatório */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#A855F7]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A6FF]">
              <Sparkles className="h-3 w-3" /> Relatório Kria AI
            </div>
            <div className="mt-3 text-xl font-black text-white md:text-2xl">{data.nome}</div>
            <div className="text-xs text-[#B8AFC8]">
              {data.instagram} · {data.cidade} - {data.estado.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <InfoBlock label="Perfil" value={data.perfil} accent="#A855F7" />
          <InfoBlock label="Objetivo principal" value={data.objetivo} accent="#A855F7" />
          <InfoBlock label="Principal gargalo" value={recomendacao.gargalo} accent="#FF6A2C" icon={Target} />
          <InfoBlock label="Potencial" value={recomendacao.potencial} accent="#FF6A2C" icon={TrendingUp} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#FF6A2C]/30 bg-gradient-to-br from-[#FF6A2C]/10 to-[#A855F7]/[0.05] p-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FF8A3D]">
            <Package className="h-3.5 w-3.5" /> Pacote recomendado
          </div>
          <div className="mt-2 text-lg font-black text-white md:text-xl">{recomendacao.pacote}</div>
          <p className="mt-1 text-sm text-[#B8AFC8]">{recomendacao.pacoteDescricao}</p>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-[#07030F]/40 p-5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A6FF]">
            Serviços indicados
          </div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {recomendacao.servicos.map((s) => (
              <li key={s} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-300">
            <ArrowRight className="h-3.5 w-3.5" /> Próximo passo
          </div>
          <p className="mt-2 text-sm text-white">{recomendacao.proximoPasso}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 grid gap-3">
        <button
          onClick={() => openWhatsApp(msgEnviar)}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-6 text-sm font-bold text-white shadow-lg shadow-[#FF6A2C]/25 transition hover:bg-[#FF8A3D]"
        >
          <MessageCircle className="h-4 w-4" />
          Enviar meu diagnóstico para a Kria no WhatsApp
        </button>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => openWhatsApp(msgPacote)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Quero o pacote recomendado
          </button>
          <button
            onClick={() => openWhatsApp(msgConsultoria)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Prefiro uma consultoria
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label, value, accent, icon: Icon,
}: {
  label: string; value: string; accent: string; icon?: typeof Target;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#07030F]/40 p-4">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
        {Icon && <Icon className="h-3 w-3" />} {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
