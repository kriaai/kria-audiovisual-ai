import { CalendarCheck, Sparkles } from "lucide-react";
import kriaHero from "@/assets/kria-hero.png.asset.json";
import BrandLogo from "@/components/BrandLogo";
import { waLink } from "@/lib/contact";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="topo" className="hero-gradient relative overflow-hidden pt-20">
      <span className="blob animate-float bg-accent/40 h-72 w-72 left-[-4rem] top-24" />
      <span className="blob animate-float-slow bg-fuchsia-500/30 h-96 w-96 right-[-6rem] top-10" />
      <span className="blob animate-float bg-violet-400/30 h-80 w-80 left-1/3 bottom-[-6rem]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-24 md:pt-10 md:pb-32">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-start md:gap-5">
          <div className="relative">
            <span className="absolute -inset-8 -z-10 rounded-full bg-accent/25 blur-3xl" />
            <BrandLogo size="lg" variant="onDark" className="h-16 md:h-28" />
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Kria <span className="text-accent">AI</span>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
              Inteligência criativa
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Diagnóstico inteligente · gratuito · em 2 minutos
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              Descubra o que está travando o{" "}
              <span className="text-gradient-brand">crescimento do seu negócio</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
              A Kria AI analisa seu momento, identifica seus gargalos e recomenda as soluções certas
              para você criar conteúdo, vender melhor e crescer com inteligência artificial.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("diagnostico-kria")}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-xl shadow-accent/40 ring-1 ring-accent/40 transition hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/50 active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                Fazer Diagnóstico Kria Gratuito
              </button>
              <button
                onClick={() => scrollTo("solucoes")}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Ver soluções
              </button>
            </div>

            <p className="mt-6 max-w-md text-sm text-white/60">
              Você pode <span className="font-semibold text-white/85">aprender a fazer com IA</span> ou
              <span className="font-semibold text-white/85"> encontrar quem faça por você</span>.
              A Kria identifica o melhor caminho para o seu momento.
            </p>
          </div>

          {/* Foto da Kria */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/40 to-fuchsia-400/30 blur-2xl" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-2xl">
              <img
                src={kriaHero.url}
                alt="Kria — CEO da Kria AI"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/40 p-4 backdrop-blur-md ring-1 ring-white/10">
                <div className="text-[10px] font-semibold tracking-[0.25em] text-accent">CEO</div>
                <div className="text-sm font-bold text-white">Olá, eu sou a Kria</div>
                <div className="text-xs text-white/70">Estratégia. Conteúdo. IA. Resultado.</div>
              </div>
            </div>




            <a
              href={waLink(
                "Olá Kria! Quero agendar uma reunião (R$50) para conversar pessoalmente ou online sobre meu projeto.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-5 flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 text-left shadow-xl transition hover:scale-[1.01] hover:shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-bold text-primary">Falar direto com a Kria</div>
                  <div className="text-xs text-neutral-600">Reunião online ou presencial</div>
                </div>
              </div>
              <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white">
                R$ 50
              </span>
            </a>
            <p className="mt-2 text-center text-[11px] text-white/60">
              Prefere pular o formulário? Agende uma conversa direta com a Kria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
