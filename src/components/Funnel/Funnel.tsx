import { useEffect, useMemo, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Send, Loader2, Sparkles } from "lucide-react";
import Success from "./Success";

export type FunnelData = {
  // Etapa 1 - Identificação
  nome: string;
  whatsapp: string;
  email: string;
  instagram: string;
  // Etapa 2 - Negócio
  segmento: string;
  tempoNegocio: string;
  faturamento: string;
  // Etapa 3 - Marketing
  canais: string[];
  anuncios: string;
  equipeMkt: string;
  frequenciaConteudo: string;
  // Etapa 4 - Estrutura digital
  gravaVideos: string;
  equipamento: string;
  ferramentas: string[];
  // Etapa 5 - Desafio
  situacao: string;
  // Etapa 6 - Objetivos & Aquisição & Presença
  objetivo90dias: string;
  origemClientes: string[];
  possuiSite: string;
  possuiWhatsappBusiness: string;
  // Etapa 7 - Conteúdo & Equipe
  dificuldadeConteudo: string;
  apareceEmVideos: string;
  criadorConteudo: string;
  // Etapa 8 - Investimento, urgência, problema
  faixaInvestimento: string;
  urgencia: string;
  problemaPrincipalTexto: string;
};

const initial: FunnelData = {
  nome: "",
  whatsapp: "",
  email: "",
  instagram: "",
  segmento: "",
  tempoNegocio: "",
  faturamento: "",
  canais: [],
  anuncios: "",
  equipeMkt: "",
  frequenciaConteudo: "",
  gravaVideos: "",
  equipamento: "",
  ferramentas: [],
  situacao: "",
  objetivo90dias: "",
  origemClientes: [],
  possuiSite: "",
  possuiWhatsappBusiness: "",
  dificuldadeConteudo: "",
  apareceEmVideos: "",
  criadorConteudo: "",
  faixaInvestimento: "",
  urgencia: "",
  problemaPrincipalTexto: "",
};

const TOTAL = 8;

const SEGMENTOS: { value: string; icon: string; titulo: string; sub: string }[] = [
  { value: "Médicos e Saúde", icon: "🏥", titulo: "Médicos e Saúde", sub: "Atrair pacientes e autoridade no digital" },
  { value: "Políticos e Assessores", icon: "🏛️", titulo: "Políticos e Assessores", sub: "Comunicação estratégica e presença pública" },
  { value: "Varejo e Comércio", icon: "🛍️", titulo: "Varejo e Comércio", sub: "Vender mais com conteúdo e tráfego" },
  { value: "Influencers e Criadores", icon: "📱", titulo: "Influencers e Criadores", sub: "Crescer audiência e monetizar com IA" },
  { value: "Eventos e Entretenimento", icon: "🎪", titulo: "Eventos e Entretenimento", sub: "Encher casa e gerar buzz nas redes" },
];
const TEMPOS = ["Menos de 6 meses", "6 meses a 1 ano", "1 a 3 anos", "Mais de 3 anos"];
const FATURAMENTOS = [
  "Ainda não vendo", "Até R$ 2 mil", "R$ 2 mil a R$ 5 mil",
  "R$ 5 mil a R$ 10 mil", "R$ 10 mil a R$ 30 mil", "Acima de R$ 30 mil",
];
const CANAIS = [
  "Instagram", "Facebook", "TikTok", "Google", "Indicação",
  "Tráfego Pago", "Agência", "Marketplace", "Não faço divulgação",
];
const ANUNCIOS = ["Sim", "Não", "Já investi antes"];
const EQUIPE = ["Sim", "Não"];
const FREQUENCIAS = ["Todo dia", "3 a 5 vezes", "1 a 2 vezes", "Quase nunca", "Nunca"];
const VIDEOS = ["Sim", "Não"];
const EQUIPAMENTOS = ["iPhone", "Samsung", "Xiaomi", "Outro Android", "Câmera profissional"];
const FERRAMENTAS = ["Canva", "CapCut", "ChatGPT", "Gemini", "Claude", "IA para imagens", "Nenhuma"];
const SITUACOES = [
  "Tenho seguidores mas vendo pouco",
  "Não consigo criar conteúdo",
  "Meu negócio não aparece",
  "Preciso de mais clientes",
  "Não tenho tempo",
  "Já tentei marketing e não funcionou",
  "Quero crescer mais rápido",
];

const OBJETIVOS = [
  "Conseguir mais clientes",
  "Aumentar faturamento",
  "Fortalecer minha marca",
  "Organizar meu marketing",
  "Lançar um produto ou serviço",
  "Melhorar minhas redes sociais",
  "Automatizar processos",
  "Outro",
];
const ORIGEM_CLIENTES = [
  "Indicação", "Instagram", "Facebook", "Google", "WhatsApp",
  "Tráfego Pago", "Marketplace", "Site", "Eventos presenciais", "Outro",
];
const SIM_NAO = ["Sim", "Não"];
const SIM_NAO_NAOSEI = ["Sim", "Não", "Não sei"];
const DIFICULDADES = [
  "Falta de tempo", "Falta de ideias", "Vergonha de aparecer",
  "Não sei gravar", "Não sei editar", "Não sei o que postar",
  "Falta de organização", "Não tenho dificuldade",
];
const APARECE_VIDEOS = ["Sim", "Não", "Talvez"];
const INVESTIMENTOS = [
  "Até R$ 100", "R$ 100 a R$ 300", "R$ 300 a R$ 1.000",
  "R$ 1.000 a R$ 3.000", "Acima de R$ 3.000",
];
const URGENCIAS = [
  "Hoje", "Nos próximos 30 dias", "Nos próximos 3 meses", "Ainda estou pesquisando",
];
const CRIADORES = [
  "Eu mesmo", "Funcionário", "Freelancer", "Agência", "Ninguém cria conteúdo",
];

const SUGESTOES: Record<string, string[]> = {
  mais: ["Mais clientes", "Mais vendas", "Mais alcance", "Mais seguidores"],
  cli: ["Mais clientes", "Clientes recorrentes"],
  vend: ["Mais vendas", "Aumentar ticket médio", "Vender pelo Instagram"],
  cont: ["Conteúdo para Instagram", "Conteúdo para Reels", "Conteúdo estratégico"],
  reel: ["Reels que vendem", "Reels virais"],
  segu: ["Mais seguidores", "Seguidores qualificados"],
  alca: ["Mais alcance", "Alcance orgânico"],
  trafe: ["Tráfego pago no Instagram", "Tráfego pago no Google"],
  marca: ["Construir marca forte", "Posicionamento de marca"],
  temp: ["Falta de tempo para criar conteúdo", "Automatizar tarefas"],
};

function getSugestoes(input: string): string[] {
  const q = input.trim().toLowerCase();
  if (q.length < 2) return [];
  const set = new Set<string>();
  for (const key of Object.keys(SUGESTOES)) {
    if (key.startsWith(q.slice(0, key.length)) || q.startsWith(key.slice(0, 3))) {
      SUGESTOES[key].forEach((s) => set.add(s));
    }
  }
  return Array.from(set).slice(0, 4);
}

function Chips({ options, value, onSelect, multi = false, selected = [] }: {
  options: string[]; value?: string; onSelect: (v: string) => void;
  multi?: boolean; selected?: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = multi ? selected.includes(opt) : value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-foreground/90">{label}</div>
      {children}
    </div>
  );
}

export default function Funnel() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [done]);

  const update = <K extends keyof FunnelData>(key: K, value: FunnelData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleArr = (key: "canais" | "ferramentas" | "origemClientes", v: string) => {
    setData((d) => {
      const cur = d[key];
      return { ...d, [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });
  };

  const isWhats = (w: string) => /\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}/.test(w.replace(/\s/g, ""));

  const canContinue = (() => {
    switch (step) {
      case 1:
        return (
          data.nome.trim().length >= 2 &&
          isWhats(data.whatsapp) &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) &&
          data.instagram.trim().length >= 2
        );
      case 2:
        return !!data.segmento && !!data.tempoNegocio && !!data.faturamento;
      case 3:
        return data.canais.length > 0 && !!data.anuncios && !!data.equipeMkt && !!data.frequenciaConteudo;
      case 4:
        return !!data.gravaVideos && !!data.equipamento && data.ferramentas.length > 0;
      case 5:
        return !!data.situacao;
      case 6:
        return !!data.objetivo90dias && data.origemClientes.length > 0 && !!data.possuiSite && !!data.possuiWhatsappBusiness;
      case 7:
        return !!data.dificuldadeConteudo && !!data.apareceEmVideos && !!data.criadorConteudo;
      case 8:
        return !!data.faixaInvestimento && !!data.urgencia && data.problemaPrincipalTexto.trim().length >= 3;
      default:
        return false;
    }
  })();

  const next = () => { if (canContinue && step < TOTAL) setStep(step + 1); };
  const back = () => step > 1 && setStep(step - 1);

  const submit = async () => {
    setSubmitting(true);
    const payload = {
      _subject: `🎯 Diagnóstico Kria — ${data.nome} | ${data.segmento} | Fat: ${data.faturamento}`,
      tipoFormulario: "Diagnóstico Kria AI",
      "DADOS PESSOAIS": "---",
      nome: data.nome,
      whatsapp: data.whatsapp,
      email: data.email,
      instagram: data.instagram,
      "NEGÓCIO": "---",
      segmento: data.segmento,
      tempoNegocio: data.tempoNegocio,
      faturamento: data.faturamento,
      "MARKETING": "---",
      canais: data.canais.join(", "),
      anuncios: data.anuncios,
      equipeMkt: data.equipeMkt,
      frequenciaConteudo: data.frequenciaConteudo,
      "CONTEÚDO": "---",
      gravaVideos: data.gravaVideos,
      equipamento: data.equipamento,
      ferramentas: data.ferramentas.join(", "),
      "DESAFIO": "---",
      situacao: data.situacao,
      "OBJETIVOS & AQUISIÇÃO": "---",
      objetivo90dias: data.objetivo90dias,
      origemClientes: data.origemClientes.join(", "),
      possuiSite: data.possuiSite,
      possuiWhatsappBusiness: data.possuiWhatsappBusiness,
      "PERFIL DE CONTEÚDO": "---",
      dificuldadeConteudo: data.dificuldadeConteudo,
      apareceEmVideos: data.apareceEmVideos,
      criadorConteudo: data.criadorConteudo,
      "QUALIFICAÇÃO": "---",
      faixaInvestimento: data.faixaInvestimento,
      urgencia: data.urgencia,
      problemaPrincipalTexto: data.problemaPrincipalTexto,
      "META": "---",
      origem: "Diagnóstico Kria AI",
      dataEnvio: new Date().toLocaleString("pt-BR", { timeZone: "America/Belem" }),
    };
    try {
      await fetch("https://formspree.io/f/xkoabjow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Erro ao enviar para Formspree:", e);
    } finally {
      setDone(true);
      setSubmitting(false);
    }
  };

  const sugestoes = useMemo(() => getSugestoes(data.problemaPrincipalTexto), [data.problemaPrincipalTexto]);

  if (done) {
    return (
      <section id="funil" ref={sectionRef} className="px-6 py-16 md:py-24">
        <Success data={data} />
      </section>
    );
  }

  const progress = (step / TOTAL) * 100;
  const titulos: Record<number, { tag: string; h: string; sub: string }> = {
    1: { tag: "Identificação", h: "Vamos descobrir o que está impedindo seu negócio de crescer.", sub: "Em menos de 3 minutos, a Kria monta um diagnóstico estratégico pra você." },
    2: { tag: "Sobre o negócio", h: "Conta um pouco sobre o seu negócio.", sub: "Quanto mais real, mais certeiro o diagnóstico." },
    3: { tag: "Marketing", h: "Como você atrai clientes hoje?", sub: "Sem julgamento — só pra entender o ponto de partida." },
    4: { tag: "Estrutura digital", h: "Sua estrutura de conteúdo.", sub: "Vamos ver o que você já tem em mãos." },
    5: { tag: "Desafio principal", h: "O que mais te incomoda hoje?", sub: "É aqui que a Kria foca a estratégia." },
    6: { tag: "Objetivos", h: "Pra onde você quer ir nos próximos 90 dias?", sub: "Isso define o tipo de plano que vamos montar." },
    7: { tag: "Conteúdo & equipe", h: "Como funciona sua produção hoje?", sub: "Entender o time muda totalmente a recomendação." },
    8: { tag: "Última etapa", h: "Pra fechar o diagnóstico.", sub: "Essas respostas personalizam a sua proposta." },
  };
  const t = titulos[step];

  return (
    <section id="funil" ref={sectionRef} className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> {t.tag} · Etapa {step} de {TOTAL}
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5 md:p-10">
          <header className="mb-8">
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">{t.h}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.sub}</p>
          </header>

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="nome">Seu nome</Label>
                <Input id="nome" value={data.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Como podemos te chamar?" className="mt-1.5 h-12" maxLength={120} />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp (com DDD)</Label>
                <Input id="whatsapp" value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="(91) 99999-9999" className="mt-1.5 h-12" maxLength={20} />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="seuemail@exemplo.com" className="mt-1.5 h-12" maxLength={120} />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@seu_perfil" className="mt-1.5 h-12" maxLength={60} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-7">
              <Field label="Qual é o seu segmento?">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {SEGMENTOS.map((s) => {
                    const active = data.segmento === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => update("segmento", s.value)}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                            : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        <span className="text-2xl leading-none">{s.icon}</span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-foreground">{s.titulo}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{s.sub}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Field label="Há quanto tempo seu negócio existe?">
                <Chips options={TEMPOS} value={data.tempoNegocio} onSelect={(v) => update("tempoNegocio", v)} />
              </Field>
              <Field label="Qual seu faturamento médio mensal?">
                <Chips options={FATURAMENTOS} value={data.faturamento} onSelect={(v) => update("faturamento", v)} />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-7">
              <Field label="Como você consegue clientes hoje?">
                <Chips options={CANAIS} selected={data.canais} multi onSelect={(v) => toggleArr("canais", v)} />
              </Field>
              <Field label="Você já investe em anúncios?">
                <Chips options={ANUNCIOS} value={data.anuncios} onSelect={(v) => update("anuncios", v)} />
              </Field>
              <Field label="Você possui agência ou equipe de marketing?">
                <Chips options={EQUIPE} value={data.equipeMkt} onSelect={(v) => update("equipeMkt", v)} />
              </Field>
              <Field label="Quantas vezes por semana você publica conteúdo?">
                <Chips options={FREQUENCIAS} value={data.frequenciaConteudo} onSelect={(v) => update("frequenciaConteudo", v)} />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-7">
              <Field label="Você grava vídeos para seu negócio?">
                <Chips options={VIDEOS} value={data.gravaVideos} onSelect={(v) => update("gravaVideos", v)} />
              </Field>
              <Field label="Qual equipamento você utiliza?">
                <Chips options={EQUIPAMENTOS} value={data.equipamento} onSelect={(v) => update("equipamento", v)} />
              </Field>
              <Field label="Quais ferramentas você já utiliza?">
                <Chips options={FERRAMENTAS} selected={data.ferramentas} multi onSelect={(v) => toggleArr("ferramentas", v)} />
              </Field>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-7">
              <Field label="Qual destas situações mais parece com você?">
                <Chips options={SITUACOES} value={data.situacao} onSelect={(v) => update("situacao", v)} />
              </Field>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-7">
              <Field label="Qual seu principal objetivo nos próximos 90 dias?">
                <Chips options={OBJETIVOS} value={data.objetivo90dias} onSelect={(v) => update("objetivo90dias", v)} />
              </Field>
              <Field label="Como seus clientes chegam até você hoje?">
                <Chips options={ORIGEM_CLIENTES} selected={data.origemClientes} multi onSelect={(v) => toggleArr("origemClientes", v)} />
              </Field>
              <Field label="Você possui site ou landing page?">
                <Chips options={SIM_NAO} value={data.possuiSite} onSelect={(v) => update("possuiSite", v)} />
              </Field>
              <Field label="Você utiliza WhatsApp Business?">
                <Chips options={SIM_NAO_NAOSEI} value={data.possuiWhatsappBusiness} onSelect={(v) => update("possuiWhatsappBusiness", v)} />
              </Field>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-7">
              <Field label="Qual sua maior dificuldade ao criar conteúdo?">
                <Chips options={DIFICULDADES} value={data.dificuldadeConteudo} onSelect={(v) => update("dificuldadeConteudo", v)} />
              </Field>
              <Field label="Você estaria disposto(a) a aparecer em vídeos?">
                <Chips options={APARECE_VIDEOS} value={data.apareceEmVideos} onSelect={(v) => update("apareceEmVideos", v)} />
              </Field>
              <Field label="Quem cria seu conteúdo atualmente?">
                <Chips options={CRIADORES} value={data.criadorConteudo} onSelect={(v) => update("criadorConteudo", v)} />
              </Field>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-7">
              <Field label="Quanto você estaria disposto(a) a investir para resolver seu principal problema?">
                <Chips options={INVESTIMENTOS} value={data.faixaInvestimento} onSelect={(v) => update("faixaInvestimento", v)} />
              </Field>
              <Field label="Quando você pretende resolver esse problema?">
                <Chips options={URGENCIAS} value={data.urgencia} onSelect={(v) => update("urgencia", v)} />
              </Field>
              <Field label="Se a Kria pudesse resolver apenas um problema do seu negócio agora, qual seria?">
                <Textarea
                  value={data.problemaPrincipalTexto}
                  onChange={(e) => update("problemaPrincipalTexto", e.target.value)}
                  placeholder="Conta com suas palavras o que mais te incomoda hoje..."
                  className="min-h-[110px]"
                  maxLength={500}
                />
                {sugestoes.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sugestoes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update("problemaPrincipalTexto", s)}
                        className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/10"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={back} disabled={step === 1 || submitting} className="gap-1">
              <ChevronLeft className="h-4 w-4" /> Voltar
            </Button>

            {step < TOTAL ? (
              <Button
                type="button"
                onClick={next}
                disabled={!canContinue}
                size="lg"
                className="gap-1 rounded-full bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"
              >
                Continuar <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={submit}
                disabled={!canContinue || submitting}
                size="lg"
                className="gap-2 rounded-full bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Gerando diagnóstico..." : "Gerar meu diagnóstico"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
