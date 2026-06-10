import { useState, useEffect } from "react";
import {
  Landmark, Star, HeartPulse, Cpu, Music, Megaphone, Film, Calendar,
  Store, Sparkles, GraduationCap, Home, UtensilsCrossed,
  Briefcase, Mic, Truck, Clapperboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelData } from "./Funnel";


const NICHES: { label: string; icon: LucideIcon; highlight?: boolean }[] = [
  // Nichos em destaque
  { label: "Político", icon: Landmark, highlight: true },
  { label: "Influencers", icon: Star, highlight: true },
  { label: "Saúde", icon: HeartPulse, highlight: true },
  { label: "Tecnologia", icon: Cpu, highlight: true },
  { label: "Músicos", icon: Music, highlight: true },

  // Nichos adicionais
  { label: "Marketing", icon: Megaphone },
  { label: "Produtores", icon: Film },
  { label: "Eventos", icon: Calendar },

  // Demais nichos
  { label: "Comércio", icon: Store },
  { label: "Beleza", icon: Sparkles },
  { label: "Educação", icon: GraduationCap },
  { label: "Imóveis", icon: Home },
  { label: "Alimentação", icon: UtensilsCrossed },
  { label: "Serviços", icon: Briefcase },
  { label: "Conteúdo", icon: Mic },
  { label: "Logística", icon: Truck },
  { label: "Entretenimento", icon: Clapperboard },
];

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step2Niche({ data, update }: Props) {
  const highlighted = NICHES.filter((n) => n.highlight);
  const regular = NICHES.filter((n) => !n.highlight);

  const knownLabels = NICHES.map((n) => n.label);
  const isOutroActive = !!data.nicho && !knownLabels.includes(data.nicho);
  const [outroText, setOutroText] = useState(isOutroActive ? data.nicho : "");

  useEffect(() => {
    if (isOutroActive) setOutroText(data.nicho);
  }, [data.nicho, isOutroActive]);

  const baseBorder = "border-border bg-background hover:border-primary/40";
  const activeBorder = "border-accent bg-accent/10 text-primary shadow-lg shadow-accent/20";


  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Qual é o seu nicho?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Escolha a área que melhor representa o seu negócio.</p>
      </header>

      {/* Destaques — frames maiores */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">Em destaque</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {highlighted.map(({ label, icon: Icon }) => {
            const active = data.nicho === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => update("nicho", label)}
                className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-base font-semibold transition ${
                  active ? activeBorder : baseBorder
                }`}
              >
                <Icon className={`h-9 w-9 ${active ? "text-accent" : "text-primary"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Demais nichos — frames menores */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Outros nichos</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {regular.map(({ label, icon: Icon }) => {
            const active = data.nicho === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => update("nicho", label)}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3 text-xs font-medium transition ${
                  active ? activeBorder : baseBorder
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-accent" : "text-primary"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
