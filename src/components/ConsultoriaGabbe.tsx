import { MessageCircle, Star } from "lucide-react";
import { waLink } from "@/lib/contact";

const MSG =
  "Olá Gabbe! Tenho interesse em uma consultoria personalizada com você (fundadora da Kria AI).";

export default function ConsultoriaGabbe() {
  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-6 rounded-3xl border bg-card p-6 shadow-sm ring-1 ring-border/60 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              <Star className="h-3.5 w-3.5" /> Atendimento exclusivo
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-foreground md:text-3xl">
              Consultoria com <span className="text-accent">Gabbe Mary</span>
            </h3>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              Fundadora da Kria AI
            </p>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Uma conversa direta com quem entende do seu cenário: estratégia, IA aplicada, posicionamento e próximos passos para o seu negócio crescer.
            </p>
          </div>

          <a
            href={waLink(MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:bg-primary-deep"
          >
            <MessageCircle className="h-5 w-5" />
            Falar com a Gabbe
          </a>
        </div>
      </div>
    </section>
  );
}
