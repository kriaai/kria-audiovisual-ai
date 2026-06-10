import {
  Video, Camera, Scissors, Bot, Clapperboard, Palette, Brain, Globe,
  Sparkles, Target, CalendarRange, Share2, BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelData } from "./Funnel";

type Service = { label: string; icon: LucideIcon; desc: string };

const FEATURED: Service = {
  label: "Conteúdo com IA",
  icon: Sparkles,
  desc: "Roteiros, edição e produção potencializados por inteligência artificial",
};

const SERVICES: Service[] = [
  { label: "Filmmaker", icon: Video, desc: "Produção de vídeos com direção e câmera" },
  { label: "Fotógrafo", icon: Camera, desc: "Ensaios e produção de imagens" },
  { label: "Editor de Vídeo", icon: Scissors, desc: "Edição, motion e color grading" },
  { label: "Automação com IA", icon: Bot, desc: "Fluxos inteligentes para seu negócio" },
  { label: "Produtor", icon: Clapperboard, desc: "Direção, roteiro e produção" },
  { label: "Design", icon: Palette, desc: "Identidade visual e materiais gráficos" },
  { label: "Consultoria de IA", icon: Brain, desc: "Estratégia para aplicar IA" },
  { label: "Criação de Sites", icon: Globe, desc: "Sites, landing pages e portfólios" },
  { label: "Planejamento Estratégico", icon: Target, desc: "Posicionamento e plano de ação" },
  { label: "Cronograma de Conteúdo", icon: CalendarRange, desc: "Calendário editorial mensal" },
  { label: "Social Media", icon: Share2, desc: "Gestão de redes sociais e engajamento" },
  { label: "Gestão de Marketing", icon: BarChart3, desc: "Campanhas, tráfego e performance" },
];

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step3Service({ data, update }: Props) {
  const toggle = (label: string) => {
    const has = data.servicos.includes(label);
    const next = has ? data.servicos.filter((s) => s !== label) : [...data.servicos, label];
    update("servicos", next);
    update("checkboxes", []);
    update("extras", {});
    update("descricao", "");
  };

  const baseBorder = "border-border bg-background hover:border-primary/40 hover:bg-primary/5";
  const activeBorder = "border-accent bg-accent/10 shadow-lg shadow-accent/20";
  const featuredActive = data.servicos.includes(FEATURED.label);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Qual serviço você procura?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Selecione um ou mais serviços que fazem sentido para o seu projeto.</p>
      </header>

      {/* Destaque — frame maior */}
      <button
        type="button"
        onClick={() => toggle(FEATURED.label)}
        className={`relative flex w-full items-center gap-5 overflow-hidden rounded-3xl border-2 p-6 text-left transition md:p-7 ${
          featuredActive ? activeBorder : baseBorder
        }`}
      >
        <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          Destaque
        </span>
        <div className={`shrink-0 rounded-2xl p-4 ${featuredActive ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"}`}>
          <FEATURED.icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="text-lg font-black md:text-xl">{FEATURED.label}</div>
          <div className="mt-1 text-sm text-muted-foreground">{FEATURED.desc}</div>
        </div>
      </button>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map(({ label, icon: Icon, desc }) => {
          const active = data.servico === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => select(label)}
              className={`group flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                active ? activeBorder : baseBorder
              }`}
            >
              <div className={`rounded-xl p-2.5 ${active ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
