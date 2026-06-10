import { Video, Camera, Scissors, Bot, Clapperboard, Palette, Brain, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FunnelData } from "./Funnel";

const SERVICES: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Filmmaker", icon: Video, desc: "Produção de vídeos com direção e câmera" },
  { label: "Fotógrafo", icon: Camera, desc: "Ensaios e produção de imagens" },
  { label: "Editor de Vídeo", icon: Scissors, desc: "Edição, motion e color grading" },
  { label: "Automação com IA", icon: Bot, desc: "Fluxos inteligentes para seu negócio" },
  { label: "Produtor", icon: Clapperboard, desc: "Direção, roteiro e produção" },
  { label: "Design", icon: Palette, desc: "Identidade visual e materiais gráficos" },
  { label: "Consultoria de IA", icon: Brain, desc: "Estratégia para aplicar IA" },
  { label: "Criação de Sites", icon: Globe, desc: "Sites, landing pages e portfólios" },
];

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step3Service({ data, update }: Props) {
  const select = (label: string) => {
    update("servico", label);
    update("checkboxes", []);
    update("extras", {});
    update("descricao", "");
  };
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Qual serviço você procura?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Selecione o que faz mais sentido para o seu projeto.</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map(({ label, icon: Icon, desc }) => {
          const active = data.servico === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => select(label)}
              className={`group flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                active
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                  : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
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
