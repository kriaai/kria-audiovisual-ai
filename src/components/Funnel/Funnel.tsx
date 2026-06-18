import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Send, Loader2, Sparkles } from "lucide-react";
import Success from "./Success";
import { sendToFormspree } from "@/lib/contact";
import { recommend, type QuizAnswers, type Recomendacao } from "@/lib/recommend";

export type FunnelData = QuizAnswers;

const initial: FunnelData = {
  perfil: "",
  objetivo: "",
  bloqueio: [],
  preferencia: "",
  interesse: [],
  cidade: "",
  estado: "",
  momentoFinanceiro: "",
  nome: "",
  whatsapp: "",
  instagram: "",
  email: "",
};

const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const PERFIS = [
  "Empreendedor / negócio local",
  "Criador de conteúdo / influencer",
  "Agência / produtora / social media",
  "Profissional autônomo",
  "Estudante / iniciante",
  "Prestador de serviço criativo",
  "Produtor",
  "Outro",
];

const OBJETIVOS = [
  "Vender mais pelo Instagram",
  "Criar conteúdo com mais constância",
  "Organizar meu negócio",
  "Aprender a usar IA",
  "Criar uma marca mais profissional",
  "Ter um site ou landing page",
  "Criar produtos digitais",
  "Contratar alguém para executar",
];

const BLOQUEIOS = [
  "Não tenho tempo",
  "Não tenho ideias",
  "Não sei gravar",
  "Não sei editar",
  "Não sei o que postar",
  "Tenho muitas ideias e não executo",
  "Não sei usar IA direito",
  "Não tenho equipe",
];

const PREFERENCIAS = [
  "Quero aprender e fazer sozinho",
  "Quero consultoria para organizar",
  "Quero contratar alguém para executar",
  "Quero uma mistura dos dois",
  "Ainda não sei",
];

const INTERESSES = [
  "Consultoria / workshop",
  "Conteúdo para Instagram",
  "Site ou landing page",
  "Personagem de IA",
  "Book de IA",
  "Captação de conteúdo",
  "Edição de vídeo",
  "Ebook",
  "Pack de prompts",
  "Quero que a Kria indique",
];

const MOMENTOS = [
  "Estou começando e preciso de algo acessível",
  "Já vendo, mas preciso organizar",
  "Já faturo bem e quero crescer",
  "Tenho equipe ou agência",
  "Quero primeiro entender as opções",
];

const TOTAL = 8;

const TITULOS: Record<number, { tag: string; pergunta: string }> = {
  1: { tag: "Etapa 1", pergunta: "Quem é você hoje?" },
  2: { tag: "Etapa 2", pergunta: "Qual seu principal objetivo agora?" },
  3: { tag: "Etapa 3", pergunta: "Qual seu maior bloqueio?" },
  4: { tag: "Etapa 4", pergunta: "Você prefere fazer sozinho ou quer ajuda?" },
  5: { tag: "Etapa 5", pergunta: "Que tipo de entrega mais te interessa?" },
  6: { tag: "Etapa 6", pergunta: "Onde você está?" },
  7: { tag: "Etapa 7", pergunta: "Qual seu momento financeiro?" },
  8: { tag: "Última etapa", pergunta: "Para onde enviamos sua recomendação?" },
};

export default function Funnel() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [rec, setRec] = useState<Recomendacao | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [done]);

  const update = <K extends keyof FunnelData>(k: K, v: FunnelData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleArr = (k: "bloqueio" | "interesse", v: string) =>
    setData((d) => {
      const cur = d[k];
      return { ...d, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  const canContinue = (() => {
    switch (step) {
      case 1: return !!data.perfil;
      case 2: return !!data.objetivo;
      case 3: return data.bloqueio.length > 0;
      case 4: return !!data.preferencia;
      case 5: return data.interesse.length > 0;
      case 6: return data.cidade.trim().length >= 2 && data.estado.length === 2;
      case 7: return !!data.momentoFinanceiro;
      case 8:
        return (
          data.nome.trim().length >= 2 &&
          data.whatsapp.trim().length >= 8 &&
          data.instagram.trim().length >= 2
        );
      default: return false;
    }
  })();

  const next = () => { if (canContinue && step < TOTAL) setStep(step + 1); };
  const back = () => step > 1 && setStep(step - 1);

  const submit = async () => {
    setSubmitting(true);
    const recomendacao = recommend(data);
    setRec(recomendacao);
    await sendToFormspree({
      _subject: `🎯 Diagnóstico Kria — ${data.nome} | ${data.perfil}`,
      origem: "Diagnóstico Kria AI",
      data_envio: new Date().toLocaleString("pt-BR", { timeZone: "America/Belem" }),
      nome: data.nome,
      whatsapp: data.whatsapp,
      email: data.email,
      instagram: data.instagram,
      cidade: data.cidade,
      estado: data.estado.toUpperCase(),
      perfil: data.perfil,
      objetivo: data.objetivo,
      bloqueio: data.bloqueio.join(", "),
      preferencia: data.preferencia,
      interesse: data.interesse.join(", "),
      momento_financeiro: data.momentoFinanceiro,
      pacote_recomendado: recomendacao.pacote,
      servicos_indicados: recomendacao.servicos.join(", "),
    });
    setSubmitting(false);
    setDone(true);
  };

  if (done && rec) {
    return (
      <section id="diagnostico" ref={sectionRef} className="bg-[#07030F] px-5 py-20 md:py-28">
        <Success data={data} recomendacao={rec} />
      </section>
    );
  }

  const progress = (step / TOTAL) * 100;
  const t = TITULOS[step];

  return (
    <section id="diagnostico" ref={sectionRef} className="bg-[#07030F] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6A2C]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#FF8A3D]">
            <Sparkles className="h-3 w-3" /> Diagnóstico gratuito
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Faça seu <span className="text-[#FF6A2C]">Diagnóstico Kria AI</span> gratuito
          </h2>
          <p className="mt-3 text-[#B8AFC8] md:text-lg">
            Responda em poucos cliques e receba uma indicação inicial do melhor
            caminho: consultoria, serviço, pack ou rede Kria.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#B8AFC8]">
            <span>{t.tag} de {TOTAL}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />

          <h3 className="mt-6 text-xl font-bold text-white md:text-2xl">{t.pergunta}</h3>

          <div className="mt-5">
            {step === 1 && (
              <ChipsSingle options={PERFIS} value={data.perfil} onSelect={(v) => update("perfil", v)} />
            )}
            {step === 2 && (
              <ChipsSingle options={OBJETIVOS} value={data.objetivo} onSelect={(v) => update("objetivo", v)} />
            )}
            {step === 3 && (
              <ChipsMulti options={BLOQUEIOS} selected={data.bloqueio} onToggle={(v) => toggleArr("bloqueio", v)} />
            )}
            {step === 4 && (
              <ChipsSingle options={PREFERENCIAS} value={data.preferencia} onSelect={(v) => update("preferencia", v)} />
            )}
            {step === 5 && (
              <ChipsMulti options={INTERESSES} selected={data.interesse} onToggle={(v) => toggleArr("interesse", v)} />
            )}
            {step === 6 && (
              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <FormField label="Cidade">
                  <input
                    value={data.cidade}
                    onChange={(e) => update("cidade", e.target.value)}
                    placeholder="Belém"
                    className={inputCls}
                  />
                </FormField>
                <FormField label="Estado">
                  <select
                    value={data.estado}
                    onChange={(e) => update("estado", e.target.value)}
                    className={`${inputCls} sm:w-24`}
                  >
                    <option value="">UF</option>
                    {UFS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </FormField>
              </div>
            )}
            {step === 7 && (
              <ChipsSingle options={MOMENTOS} value={data.momentoFinanceiro} onSelect={(v) => update("momentoFinanceiro", v)} />
            )}
            {step === 8 && (
              <div className="grid gap-4">
                <FormField label="Nome">
                  <input value={data.nome} onChange={(e) => update("nome", e.target.value)} className={inputCls} />
                </FormField>
                <FormField label="WhatsApp">
                  <input value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="(91) 99999-9999" className={inputCls} />
                </FormField>
                <FormField label="Instagram">
                  <input value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@seu_perfil" className={inputCls} />
                </FormField>
                <FormField label="E-mail (opcional)">
                  <input value={data.email} onChange={(e) => update("email", e.target.value)} type="email" className={inputCls} />
                </FormField>
              </div>
            )}
          </div>

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="inline-flex h-11 items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] px-4 text-sm font-semibold text-white/85 transition hover:bg-white/[0.08] disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Voltar
            </button>
            {step < TOTAL ? (
              <button
                type="button"
                onClick={next}
                disabled={!canContinue}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FF6A2C] px-6 text-sm font-bold text-white transition hover:bg-[#FF8A3D] disabled:opacity-40"
              >
                Continuar <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={!canContinue || submitting}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FF6A2C] px-6 text-sm font-bold text-white transition hover:bg-[#FF8A3D] disabled:opacity-40"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Gerando..." : "Ver meu diagnóstico"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-[#07030F]/60 px-3 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#FF6A2C] focus:ring-2 focus:ring-[#FF6A2C]/20";

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#B8AFC8]">{label}</span>
      {children}
    </label>
  );
}

function ChipsSingle({ options, value, onSelect }: { options: string[]; value: string; onSelect: (v: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onSelect(o)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
              active
                ? "border-[#FF6A2C] bg-[#FF6A2C] text-white shadow-md shadow-[#FF6A2C]/25"
                : "border-white/10 bg-white/[0.03] text-white/85 hover:border-white/25 hover:bg-white/[0.08]"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ChipsMulti({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
              active
                ? "border-[#FF6A2C] bg-[#FF6A2C] text-white shadow-md shadow-[#FF6A2C]/25"
                : "border-white/10 bg-white/[0.03] text-white/85 hover:border-white/25 hover:bg-white/[0.08]"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
