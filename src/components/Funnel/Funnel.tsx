import { useEffect, useMemo, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Send, Loader2, Sparkles } from "lucide-react";
import Success from "./Success";

export type FunnelData = {
  // Etapa 1
  nome: string;
  whatsapp: string;
  instagram: string;
  // Etapa 2
  segmento: string;
  tempoNegocio: string;
  faturamento: string;
  // Etapa 3
  canais: string[];
  anuncios: string;
  equipeMkt: string;
  frequenciaConteudo: string;
  // Etapa 4
  gravaVideos: string;
  equipamento: string;
  ferramentas: string[];
  // Etapa 5
  situacao: string;
  problemaUm: string;
};

const initial: FunnelData = {
  nome: "",
  whatsapp: "",
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
  problemaUm: "",
};

const TOTAL = 5;

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

const SUGESTOES: Record<string, string[]> = {
  mais: ["Mais clientes", "Mais vendas", "Mais alcance", "Mais seguidores"],
  cli: ["Mais clientes", "Clientes recorrentes"],
  vend: ["Mais vendas", "Aumentar ticket médio", "Vender pelo Instagram"],
  cont: ["Conteúdo para Instagram", "Conteúdo para Reels", "Conteúdo para vendas", "Conteúdo estratégico"],
  reel: ["Reels que vendem", "Reels virais", "Roteiro de Reels"],
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

// ---------- UI helpers ----------
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

// ---------- Component ----------
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

  const toggleArr = (key: "canais" | "ferramentas", v: string) => {
    setData((d) => {
      const cur = d[key];
      return { ...d, [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });
  };

  const isWhats = (w: string) => /\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}/.test(w.replace(/\s/g, ""));

  const canContinue = (() => {
    switch (step) {
      case 1:
        return data.nome.trim().length >= 2 && isWhats(data.whatsapp) && data.instagram.trim().length >= 2;
      case 2:
        return !!data.segmento && !!data.tempoNegocio && !!data.faturamento;
      case 3:
        return data.canais.length > 0 && !!data.anuncios && !!data.equipeMkt && !!data.frequenciaConteudo;
      case 4:
        return !!data.gravaVideos && !!data.equipamento && data.ferramentas.length > 0;
      case 5:
        return !!data.situacao && data.problemaUm.trim().length >= 2;
      default:
        return false;
    }
  })();

  const next = () => { if (canContinue && step < TOTAL) setStep(step + 1); };
  const back = () => step > 1 && setStep(step - 1);

  const submit = async () => {
    setSubmitting(true);
    const payload = {
      _subject: `Diagnóstico Kria — ${data.nome} (${data.segmento})`,
      ...data,
      canais: data.canais.join(", "),
      ferramentas: data.ferramentas.join(", "),
      origem: "Diagnóstico Kria AI",
      dataEnvio: new Date().toISOString(),
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

  const sugestoes = useMemo(() => getSugestoes(data.problemaUm), [data.problemaUm]);

  if (done) {
    return (
      <section id="funil" ref={sectionRef} className="px-6 py-16 md:py-24">
        <Success data={data} />
      </section>
    );
  }

  const progress = (step / TOTAL) * 100;
  const titulos: Record<number, { tag: string; h: string; sub: string }> = {
    1: { tag: "Identificação", h: "Vamos descobrir o que está impedindo seu negócio de crescer.", sub: "Em menos de 2 minutos, a Kria monta um diagnóstico estratégico pra você." },
    2: { tag: "Sobre o negócio", h: "Conta um pouco sobre o seu negócio.", sub: "Quanto mais real, mais certeiro o diagnóstico." },
    3: { tag: "Marketing", h: "Como você atrai clientes hoje?", sub: "Sem julgamento — só pra entender o ponto de partida." },
    4: { tag: "Estrutura digital", h: "Sua estrutura de conteúdo.", sub: "Vamos ver o que você já tem em mãos." },
    5: { tag: "Desafio principal", h: "O que mais te incomoda hoje?", sub: "É aqui que a Kria foca a estratégia." },
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
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@seu_perfil" className="mt-1.5 h-12" maxLength={60} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-7">
              <Field label="Qual é o seu segmento?">
                <Chips options={SEGMENTOS} value={data.segmento} onSelect={(v) => update("segmento", v)} />
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
              <Field label="Se a Kria pudesse resolver apenas um problema do seu negócio hoje, qual seria?">
                <Input
                  value={data.problemaUm}
                  onChange={(e) => update("problemaUm", e.target.value)}
                  placeholder="Ex.: mais clientes, conteúdo, vendas..."
                  className="h-12"
                  maxLength={200}
                />
                {sugestoes.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sugestoes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update("problemaUm", s)}
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
