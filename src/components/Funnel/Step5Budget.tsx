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
        <Label htmlFor="observacoes">Informações extras (opcional)</Label>
        <Textarea
          id="observacoes"
          value={data.observacoes}
          onChange={(e) => update("observacoes", e.target.value)}
          placeholder="Prazo, urgência, qualquer detalhe importante..."
          className="mt-1.5 min-h-28"
          maxLength={1500}
        />
      </div>
    </div>
  );
}
