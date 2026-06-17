import { MessageCircle, MapPin } from "lucide-react";
import { waLink } from "@/lib/contact";

type Partner = {
  name: string;
  short: string;
  especialidade: string;
  cidade: string;
  categoria: string;
  servicos: string[];
  description: string;
  whatsappMessage: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Veropa Filmes",
    short: "VRP",
    especialidade: "Produtora audiovisual",
    cidade: "Belém · PA",
    categoria: "Vídeo",
    servicos: ["Captação", "Edição", "Direção"],
    description: "Produção audiovisual completa para marcas, eventos e campanhas.",
    whatsappMessage: "Olá Kria! Tenho interesse no parceiro Veropa Filmes — pode me conectar?",
  },
  {
    name: "UMAZ Brasil",
    short: "UMZ",
    especialidade: "Eventos e casting",
    cidade: "Belém · PA",
    categoria: "Eventos e Casting",
    servicos: ["Produção de eventos", "Casting", "Ativações"],
    description:
      "Produção de eventos, casting, ativações e conexões criativas para marcas e projetos.",
    whatsappMessage: "Olá Kria! Tenho interesse no parceiro UMAZ Brasil — pode me conectar?",
  },
  {
    name: "Troika",
    short: "TRK",
    especialidade: "Branding & direção de arte",
    cidade: "Belém · PA",
    categoria: "Branding",
    servicos: ["Identidade visual", "Direção de arte", "Design"],
    description: "Criação, branding e direção de arte para projetos diferenciados.",
    whatsappMessage: "Olá Kria! Tenho interesse no parceiro Troika — pode me conectar?",
  },
];

export default function Partners() {
  return (
    <section id="krias" className="px-6 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Nossos Krias
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Uma rede de <span className="text-accent">Krias</span> para resolver o que o seu negócio precisa.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Criadores, agências e especialistas para ajudar negócios a saírem da ideia e chegarem na execução.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <article
              key={p.name}
              className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-sm ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15"
            >
              <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/25" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-xs font-black tracking-widest text-accent ring-1 ring-white/10">
                    {p.short}
                  </span>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-foreground">{p.name}</h3>
                    <p className="text-xs font-semibold text-muted-foreground">{p.especialidade}</p>
                  </div>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {p.categoria}
                </span>
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {p.cidade}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.servicos.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={waLink(p.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-md shadow-accent/20 transition hover:bg-accent/90"
              >
                <MessageCircle className="h-4 w-4" /> Conhecer
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
