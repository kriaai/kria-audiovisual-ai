import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FunnelData } from "./Funnel";

type Props = {
  data: FunnelData;
  update: <K extends keyof FunnelData>(key: K, value: FunnelData[K]) => void;
};

export default function Step1Personal({ data, update }: Props) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Vamos começar</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Conta pra gente quem você é para a Kria te conhecer melhor.
        </p>
      </header>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            value={data.nome}
            onChange={(e) => update("nome", e.target.value)}
            placeholder="Seu nome completo"
            className="mt-1.5 h-12"
            maxLength={120}
          />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp (com DDD)</Label>
          <Input
            id="whatsapp"
            value={data.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="(91) 99999-9999"
            className="mt-1.5 h-12"
            maxLength={20}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="voce@email.com"
            className="mt-1.5 h-12"
            maxLength={255}
          />
        </div>
      </div>
    </div>
  );
}
