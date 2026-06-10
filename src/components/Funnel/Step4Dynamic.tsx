import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_QUESTIONS } from "./serviceQuestions";
import type { FunnelData } from "./Funnel";

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step4Dynamic({ data, update }: Props) {
  const services = data.servicos.filter((s) => SERVICE_QUESTIONS[s]);
  if (services.length === 0) {
    return <p className="text-muted-foreground">Volte e selecione ao menos um serviço.</p>;
  }

  const toggle = (item: string) => {
    const has = data.checkboxes.includes(item);
    update("checkboxes", has ? data.checkboxes.filter((c) => c !== item) : [...data.checkboxes, item]);
  };

  const setExtra = (key: string, val: string) => update("extras", { ...data.extras, [key]: val });

  // Deduplicate extras across selected services by key
  const seenExtras = new Set<string>();
  const extras = services.flatMap((s) =>
    SERVICE_QUESTIONS[s].extras.filter((ex) => {
      if (seenExtras.has(ex.key)) return false;
      seenExtras.add(ex.key);
      return true;
    })
  );

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">
          Sobre {services.length > 1 ? "os serviços" : "o serviço"}{" "}
          <span className="text-primary">{services.join(", ")}</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Marque tudo que se aplica e dê detalhes para uma proposta certeira.</p>
      </header>

      {services.map((s) => {
        const cfg = SERVICE_QUESTIONS[s];
        return (
          <div key={s} className="space-y-3">
            <Label className="block text-sm font-bold text-primary">
              {s} — {cfg.checkboxLabel}
            </Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cfg.checkboxes.map((item) => {
                const key = `${s}: ${item}`;
                const active = data.checkboxes.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${
                      active ? "border-accent bg-accent/10" : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <Checkbox checked={active} onCheckedChange={() => toggle(key)} />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {extras.map((ex) => (
        <div key={ex.key}>
          <Label htmlFor={ex.key}>{ex.label}</Label>
          <Input
            id={ex.key}
            value={data.extras[ex.key] ?? ""}
            onChange={(e) => setExtra(ex.key, e.target.value)}
            placeholder={ex.placeholder}
            className="mt-1.5 h-12"
            maxLength={200}
          />
        </div>
      ))}

      <div>
        <Label htmlFor="descricao">Descreva o seu projeto</Label>
        <Textarea
          id="descricao"
          value={data.descricao}
          onChange={(e) => update("descricao", e.target.value)}
          placeholder="Conte mais sobre o que você precisa, referências, prazos..."
          className="mt-1.5 min-h-32"
          maxLength={1500}
        />
      </div>
    </div>
  );
}
