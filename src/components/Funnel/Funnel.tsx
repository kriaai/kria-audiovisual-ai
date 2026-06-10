import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";
import Step1Personal from "./Step1Personal";
import Step2Niche from "./Step2Niche";
import Step3Service from "./Step3Service";
import Step4Dynamic from "./Step4Dynamic";
import Step5Budget from "./Step5Budget";
import Success from "./Success";
import { SERVICE_QUESTIONS } from "./serviceQuestions";
import { toast } from "sonner";

export type FunnelData = {
  nome: string;
  whatsapp: string;
  email: string;
  nicho: string;
  servicos: string[];
  checkboxes: string[];
  extras: Record<string, string>;
  descricao: string;
  orcamento: number;
  prazo: string;
  observacoes: string;
};

const initial: FunnelData = {
  nome: "",
  whatsapp: "",
  email: "",
  nicho: "",
  servicos: [],
  checkboxes: [],
  extras: {},
  descricao: "",
  orcamento: 1500,
  prazo: "",
  observacoes: "",
};

const TOTAL = 5;

export default function Funnel() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const partialSent = useRef(false);

  // Apenas role para a seção quando aparece a tela de Sucesso
  useEffect(() => {
    if (done && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [done]);

  const update = <K extends keyof FunnelData>(key: K, value: FunnelData[K]) =>
    setData((d) => ({ ...d, [key]: value }));


  const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isWhats = (w: string) => /\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}/.test(w.replace(/\s/g, ""));

  const canContinue = (() => {
    switch (step) {
      case 1:
        return data.nome.trim().length >= 2 && isWhats(data.whatsapp) && isEmail(data.email);
      case 2:
        return !!data.nicho;
      case 3:
        return data.servicos.length > 0;
      case 4: {
        const hasAnyCfg = data.servicos.some((s) => SERVICE_QUESTIONS[s]);
        if (!hasAnyCfg) return true;
        return data.checkboxes.length > 0 && data.descricao.trim().length >= 3;
      }
      case 5:
        return data.orcamento > 0;
      default:
        return false;
    }
  })();

  const next = () => {
    if (!canContinue) return;
    // Lead parcial silencioso após Etapa 1
    if (step === 1 && !partialSent.current) {
      partialSent.current = true;
      fetch("https://formspree.io/f/xkoabjow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Lead parcial — ${data.nome}`,
          _replyto: data.email,
          tipo: "parcial",
          nome: data.nome,
          whatsapp: data.whatsapp,
          email: data.email,
        }),
      }).catch(() => {});
    }
    if (step < TOTAL) setStep(step + 1);
  };
  const back = () => step > 1 && setStep(step - 1);


  const buildEspecificacoes = () => {
    const parts: string[] = [];
    if (data.checkboxes.length) parts.push(`Itens: ${data.checkboxes.join(", ")}`);
    const seen = new Set<string>();
    for (const s of data.servicos) {
      const cfg = SERVICE_QUESTIONS[s];
      if (!cfg) continue;
      for (const ex of cfg.extras) {
        if (seen.has(ex.key)) continue;
        seen.add(ex.key);
        const v = data.extras[ex.key];
        if (v) parts.push(`${ex.label}: ${v}`);
      }
    }
    if (data.descricao) parts.push(`Descrição: ${data.descricao}`);
    return parts.join(" | ");
  };

  const submit = async () => {
    setSubmitting(true);
    const servicosStr = data.servicos.join(", ");
    const payload = {
      _subject: `Nova proposta — ${data.nome} (${servicosStr})`,
      _replyto: data.email,
      nome: data.nome,
      whatsapp: data.whatsapp,
      email: data.email,
      nicho: data.nicho,
      servico: servicosStr,
      especificacoes: buildEspecificacoes(),
      orcamento: `R$ ${data.orcamento.toLocaleString("pt-BR")}`,
      prazo: data.prazo,
      extras: data.observacoes,
    };
    try {
      const res = await fetch("https://formspree.io/f/xkoabjow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setDone(true);
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível enviar. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section id="funil" ref={sectionRef} className="px-6 py-16 md:py-24">
        <Success data={data} />
      </section>
    );
  }

  const progress = (step / TOTAL) * 100;

  return (
    <section id="funil" ref={sectionRef} className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Etapa {step} de {TOTAL}
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5 md:p-10">
          {step === 1 && <Step1Personal data={data} update={update} />}
          {step === 2 && <Step2Niche data={data} update={update} />}
          {step === 3 && <Step3Service data={data} update={update} />}
          {step === 4 && <Step4Dynamic data={data} update={update} />}
          {step === 5 && <Step5Budget data={data} update={update} />}

          <div className="mt-10 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              disabled={step === 1 || submitting}
              className="gap-1"
            >
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
                {submitting ? "Enviando..." : "Enviar e falar com a Kria"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
