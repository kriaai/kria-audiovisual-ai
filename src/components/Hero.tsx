import { Sparkles, ArrowRight, Brain, Wand2, MessageCircle, LineChart, Layers, Users } from "lucide-react";
import kriaHero from "@/assets/kria-hero.png.asset.json";
import BrandLogo from "@/components/BrandLogo";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="topo" className="hero-premium relative overflow-hidden pt-24 md:pt-28">
      {/* Grid pattern sutil */}
      <div className="hero-grid pointer-events-none absolute inset-0 -z-0 opacity-[0.18]" />
      {/* Halo arch */}
      <div className="hero-halo pointer-events-none absolute left-1/2 top-8 -z-0 h-[620px] w-[1100px] -translate-x-1/2 md:top-0 md:h-[860px] md:w-[1500px]" />
      {/* Bloom roxo */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[oklch(0.45_0.25_305/.45)] blur-[120px]" />
      {/* Bloom laranja sutil */}
      <div className="pointer-events-none absolute right-0 top-1/3 -z-0 h-[300px] w-[300px] rounded-full bg-[oklch(0.72_0.21_45/.18)] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28 md:pb-36">
        {/* Logo central */}
        <div className="flex justify-center">
          <div className="relative">
            <span className="absolute -inset-10 -z-10 rounded-full bg-accent/30 blur-3xl" />
            <BrandLogo size="lg" variant="onDark" className="h-14 md:h-20" />
          </div>
        </div>

        {/* Layout: headline + personagem com cards flutuantes */}
        <div className="mt-10 grid items-center gap-10 md:mt-14 md:grid-cols-[1.05fr_1fr] md:gap-8">
          {/* Coluna texto */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Diagnóstico inteligente · gratuito · 2 minutos
            </div>
            <h1 className="mt-5 text-[2.6rem] font-black leading-[1.02] tracking-tight text-white md:text-[4.25rem]">
              Descubra o que está travando o{" "}
              <span className="text-gradient-brand">crescimento</span>{" "}
              do seu negócio
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/75 md:mx-0 md:text-lg">
              A Kria AI analisa seu momento, identifica seus gargalos e recomenda as soluções certas
              para você crescer com inteligência artificial.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <button
                onClick={() => scrollTo("diagnostico-kria")}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-[0_0_50px_-8px_oklch(0.72_0.21_45/.8)] ring-1 ring-accent/40 transition hover:scale-[1.03] active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/55 md:justify-start">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 100% gratuito</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Resultado em 2 min</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Sem cadastro</span>
            </div>
          </div>

          {/* Coluna personagem com cards orbitando */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/30 via-fuchsia-500/25 to-primary/35 blur-3xl" />

            {/* Personagem */}
            <div className="relative mx-auto aspect-[3/4] w-[78%] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:w-[82%]">
              <img
                src={kriaHero.url}
                alt="Kria — assistente criativa com IA"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.08_300)]/60 via-transparent to-transparent" />
            </div>

            {/* Cards flutuantes glass — escondidos no mobile pra não cobrir */}
            <FloatingCard
              icon={Brain}
              label="IA Criativa"
              className="absolute left-0 top-6 hidden md:flex"
              style={{ animationDelay: "0s" }}
            />
            <FloatingCard
              icon={Wand2}
              label="Branding"
              className="absolute left-2 top-1/2 hidden md:flex"
              style={{ animationDelay: "1.2s" }}
            />
            <FloatingCard
              icon={Layers}
              label="Conteúdo"
              className="absolute left-6 bottom-12 hidden md:flex"
              style={{ animationDelay: "2.4s" }}
            />
            <FloatingCard
              icon={LineChart}
              label="Diagnóstico"
              className="absolute right-0 top-10 hidden md:flex"
              style={{ animationDelay: "0.6s" }}
            />
            <FloatingCard
              icon={MessageCircle}
              label="WhatsApp"
              className="absolute right-2 top-1/2 hidden md:flex"
              style={{ animationDelay: "1.8s" }}
            />
            <FloatingCard
              icon={Users}
              label="Rede Kria"
              className="absolute right-6 bottom-14 hidden md:flex"
              style={{ animationDelay: "3s" }}
            />
          </div>
        </div>
      </div>

      {/* Transição cinematográfica para próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[oklch(0.18_0.16_305/.7)] to-[oklch(0.16_0.14_300)]" />
    </section>
  );
}

function FloatingCard({
  icon: Icon,
  label,
  className = "",
  style,
}: {
  icon: typeof Brain;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`hero-float animate-float-pill items-center gap-2 rounded-2xl border border-white/20 bg-white/[0.08] px-3 py-2 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ${className}`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/40 to-fuchsia-500/30 text-accent ring-1 ring-white/20 shadow-[0_0_18px_-4px_oklch(0.72_0.21_45/.7)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-xs font-bold text-white whitespace-nowrap">{label}</span>
    </div>
  );
}
