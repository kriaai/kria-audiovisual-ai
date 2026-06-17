import { Bot, Compass, GraduationCap, LineChart } from "lucide-react";

const SERVICES = [
  {
    icon: Bot,
    title: "Consultoria de IA",
    desc:
      "Como usar Inteligência Artificial para automatizar tarefas, criar conteúdo, melhorar processos e aumentar a produtividade do seu negócio.",
  },
  {
    icon: Compass,
    title: "Planejamento Estratégico",
    desc:
      "Diagnóstico e direcionamento personalizado para ajudar empresas, marcas e profissionais a crescerem de forma mais eficiente.",
  },
  {
    icon: GraduationCap,
    title: "Workshop K.R.I.A",
    desc:
      "Treinamento sobre criação de conteúdo, produção com celular, edição, fluxo de trabalho e uso de IA — adaptado ao seu nicho.",
  },
  {
    icon: LineChart,
    title: "Diagnóstico Kria AI",
    desc:
      "Análise do seu negócio com recomendações práticas, oportunidades de crescimento, ideias de conteúdo, tendências e próximos passos.",
  },
];

export default function Positioning() {
  return (
    <section id="solucoes" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            O que é a Kria AI
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground md:text-5xl">
            Diagnóstico, estratégia, IA e <span className="text-accent">conexão com especialistas</span>.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Uma plataforma que ajuda empresários a descobrir quais soluções precisam para crescer seus negócios — e os conecta a quem resolve.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-black tracking-tight text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
