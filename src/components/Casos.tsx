import { Sparkles, Utensils, Music, User, Store } from "lucide-react";

type Caso = {
  icon: typeof Utensils;
  nicho: string;
  titulo: string;
  problema: string;
  solucao: string;
  entrega: string;
  servicos: string[];
};

const CASOS: Caso[] = [
  {
    icon: Utensils,
    nicho: "Restaurante",
    titulo: "Divulgação de evento sazonal",
    problema: "Precisava divulgar evento e produtos sazonais sem equipe de marketing.",
    solucao: "Arte, copy estratégica e campanha de conteúdo no Instagram.",
    entrega: "Peça visual + chamada para WhatsApp com fluxo de pedidos.",
    servicos: ["Conteúdo", "Design", "Copy"],
  },
  {
    icon: Music,
    nicho: "Evento cultural",
    titulo: "Programação clara para o público",
    problema: "Difícil comunicar agenda e atrações sem confundir o público.",
    solucao: "Roteiro, legenda e estratégia de divulgação faseada.",
    entrega: "Sequência de conteúdo no Instagram alinhada à grade do evento.",
    servicos: ["Roteiro", "Conteúdo", "Estratégia"],
  },
  {
    icon: User,
    nicho: "Marca pessoal",
    titulo: "Posicionamento e clareza",
    problema: "Perfil sem direcionamento claro e baixa conversão.",
    solucao: "Bio magnética, direcionamento de conteúdo e identidade verbal.",
    entrega: "Nova apresentação digital pronta para atrair clientes certos.",
    servicos: ["Bio Magnética", "Posicionamento", "IA"],
  },
  {
    icon: Store,
    nicho: "Negócio local",
    titulo: "Consistência de conteúdo",
    problema: "Dificuldade em manter postagens regulares e organizadas.",
    solucao: "Calendário, templates e legendas personalizadas.",
    entrega: "1 mês de conteúdo planejado e pronto para publicar.",
    servicos: ["Plano Conteúdo", "Templates", "Calendário"],
  },
];

export default function Casos() {
  return (
    <section id="casos" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Casos Kria
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Casos que a Kria já <span className="text-accent">resolveu</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Problemas reais, soluções aplicadas e entregas concretas. Sem promessa mágica — só estratégia, conteúdo e execução.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {CASOS.map(({ icon: Icon, ...c }) => (
            <article
              key={c.titulo}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 ring-1 ring-border/60 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20" />
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-accent ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{c.nicho}</div>
                  <h3 className="text-lg font-black tracking-tight">{c.titulo}</h3>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-destructive/80">Problema</dt>
                  <dd className="mt-0.5 text-foreground/90">{c.problema}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-primary">Solução Kria</dt>
                  <dd className="mt-0.5 text-foreground/90">{c.solucao}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-success">Entrega</dt>
                  <dd className="mt-0.5 text-foreground/90">{c.entrega}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.servicos.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Casos ilustrativos baseados em problemas reais resolvidos pela rede Kria. Em breve, cases nominais.
        </p>
      </div>
    </section>
  );
}
