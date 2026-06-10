import {
  Store, Sparkles, HeartPulse, GraduationCap, Home, UtensilsCrossed,
  Briefcase, Mic, Truck, Cpu, Clapperboard, MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelData } from "./Funnel";

const NICHES: { label: string; icon: LucideIcon }[] = [
  { label: "Comércio", icon: Store },
  { label: "Beleza", icon: Sparkles },
  { label: "Saúde", icon: HeartPulse },
  { label: "Educação", icon: GraduationCap },
  { label: "Imóveis", icon: Home },
  { label: "Alimentação", icon: UtensilsCrossed },
  { label: "Serviços", icon: Briefcase },
  { label: "Conteúdo", icon: Mic },
  { label: "Logística", icon: Truck },
  { label: "Tecnologia", icon: Cpu },
  { label: "Entretenimento", icon: Clapperboard },
  { label: "Outro", icon: MoreHorizontal },
];

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step2Niche({ data, update }: Props) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Qual é o seu nicho?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Escolha a área que melhor representa o seu negócio.</p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {NICHES.map(({ label, icon: Icon }) => {
          const active = data.nicho === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => update("nicho", label)}
              className={`group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-semibold transition ${
                active
                  ? "border-accent bg-accent/10 text-primary shadow-lg shadow-accent/20"
                  : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              <Icon className={`h-6 w-6 ${active ? "text-accent" : "text-primary"}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
