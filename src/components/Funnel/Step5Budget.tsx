import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FunnelData } from "./Funnel";

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step5Budget({ data, update }: Props) {
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Qual o seu orçamento?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ajuste o valor para alinharmos a melhor proposta.</p>
      </header>

      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-deep p-8 text-center text-white">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/70">Investimento previsto</div>
        <div className="mt-2 text-5xl font-black tracking-tight md:text-6xl">{fmt(data.orcamento)}</div>
      </div>

      <div>
        <Slider
          min={50}
          max={10000}
          step={50}
          value={[data.orcamento]}
          onValueChange={(v) => update("orcamento", v[0])}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>R$ 50</span>
          <span>R$ 10.000</span>
        </div>
      </div>

      <div>
        <Label>Qual o prazo / urgência?</Label>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          {[
            { v: "urgente", t: "Urgente", s: "até 3 dias" },
            { v: "rapido", t: "Rápido", s: "até 1 semana" },
            { v: "normal", t: "Normal", s: "2 a 4 semanas" },
            { v: "flexivel", t: "Flexível", s: "sem pressa" },
          ].map((o) => {
            const active = data.prazo === o.v;
            return (
              <button
                key={o.v}
                type="button"
                onClick={() => update("prazo", o.v)}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="text-sm font-bold">{o.t}</div>
                <div className="text-xs text-muted-foreground">{o.s}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="observacoes">Informações extras (opcional)</Label>
        <Textarea
          id="observacoes"
          value={data.observacoes}
          onChange={(e) => update("observacoes", e.target.value)}
          placeholder="Qualquer detalhe importante..."
          className="mt-1.5 min-h-28"
          maxLength={1500}
        />
      </div>
    </div>
  );
}
