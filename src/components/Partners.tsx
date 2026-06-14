import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";

type Partner = {
  name: string;
  short: string;
  description: string;
  whatsappMessage: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Veropa Filmes",
    short: "VRP",
    description: "Produção audiovisual completa para marcas, eventos e campanhas.",
    whatsappMessage:
      "Olá Kria! Tenho interesse no parceiro Veropa Filmes — pode me conectar?",
  },
  {
    name: "Mais Brasil",
    short: "MB",
    description: "Marketing, estratégia e ativações que aproximam marcas do público.",
    whatsappMessage:
      "Olá Kria! Tenho interesse no parceiro Mais Brasil — pode me conectar?",
  },
  {
    name: "Troika",
    short: "TRK",
    description: "Criação, branding e direção de arte para projetos diferenciados.",
    whatsappMessage:
      "Olá Kria! Tenho interesse no parceiro Troika — pode me conectar?",
  },
];

export default function Partners() {
  return (
    <section id="parceiros" className="px-6 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Parceiros Kria
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Conexão com quem <span className="text-accent">resolve</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Quando faz mais sentido, indicamos você diretamente a parceiros de confiança.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-xs font-black tracking-widest text-accent ring-1 ring-white/10">
                  {p.short}
                </span>
                <h3 className="text-lg font-black tracking-tight text-foreground">{p.name}</h3>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <a
                href={waLink(p.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-md shadow-accent/20 transition hover:bg-accent/90"
              >
                <MessageCircle className="h-4 w-4" /> Conectar via WhatsApp
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
