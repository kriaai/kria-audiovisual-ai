import { Compass, CalendarRange, Network, FileText, Sparkles } from "lucide-react";

const BADGES = ["Estratégia", "IA", "Conteúdo", "Conexão", "Execução"];

const CARDS = [
  {
    icon: Compass,
    title: "Estratégia",
    desc: "Mapeamos o seu negócio e criamos soluções personalizadas para o seu momento.",
  },
  {
    icon: CalendarRange,
    title: "Organização",
    desc: "Te ajudamos a organizar seu cronograma de postagens, ideias e fluxo de trabalho.",
  },
  {
    icon: Network,
    title: "Conexão",
    desc: "Conectamos você com quem pode resolver o marketing da sua empresa.",
  },
  {
    icon: FileText,
    title: "Conteúdo",
    desc: "Te entregamos diversas opções de pacotes para você começar a criar hoje mesmo.",
  },
];

export default function WhatKria() {
  return (
    <section id="o-que-e-kria" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Texto */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> O que é a Kria AI
            </div>
            <h2 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight text-foreground md:text-5xl">
              O sistema que entende o que seu negócio precisa para{" "}
              <span className="text-accent">crescer</span>.
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              A Kria AI ajuda empreendedores a entenderem seus gargalos de conteúdo, presença digital,
              organização e vendas. A partir de um diagnóstico, indicamos caminhos possíveis: aprender
              a fazer com IA, contratar um pacote pronto ou se conectar com especialistas da rede Kria.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Imagem ilustrativa */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent/20 to-fuchsia-300/20 blur-2xl" />
            <div className="hero-gradient relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-primary/20 shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="glass-card neon-border rounded-2xl p-6 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    Kria AI · Sistema
                  </div>
                  <div className="mt-2 text-2xl font-black leading-tight text-white">
                    Estratégia + IA <br /> + Execução
                  </div>
                  <div className="mt-3 text-xs text-white/80">
                    Conectando empreendedores ao caminho certo.
                  </div>
                </div>
              </div>
              <span className="blob animate-float bg-accent/40 h-40 w-40 left-[-2rem] top-6" />
              <span className="blob animate-float-slow bg-fuchsia-500/40 h-48 w-48 right-[-2rem] bottom-6" />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 text-primary ring-1 ring-primary/15 transition group-hover:from-accent group-hover:to-accent group-hover:text-accent-foreground">
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
