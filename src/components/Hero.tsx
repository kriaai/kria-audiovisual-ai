import { Sparkles, ArrowRight } from "lucide-react";
import kriaHero from "@/assets/kria-hero.png.asset.json";
import BrandLogo from "@/components/BrandLogo";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="topo" className="hero-premium relative overflow-hidden pt-24 md:pt-28">
      {/* Halo arch (referência fintech) */}
      <div className="hero-halo pointer-events-none absolute left-1/2 top-12 -z-0 h-[620px] w-[1100px] -translate-x-1/2 md:top-6 md:h-[820px] md:w-[1400px]" />
      {/* Estrelas / grão sutil */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,oklch(0.35_0.22_305/.35),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        {/* Logo central destacada */}
        <div className="flex justify-center">
          <div className="relative">
            <span className="absolute -inset-10 -z-10 rounded-full bg-accent/30 blur-3xl" />
            <BrandLogo size="lg" variant="onDark" className="h-14 md:h-20" />
          </div>
        </div>

        {/* Headline central */}
        <div className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 ring-1 ring-white/15 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Diagnóstico inteligente · gratuito · 2 minutos
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
            Descubra o que está travando o{" "}
            <span className="text-gradient-brand">crescimento do seu negócio</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/75 md:text-lg">
            A Kria AI analisa seu momento, identifica seus gargalos e recomenda as soluções certas
            para você crescer com inteligência artificial.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollTo("diagnostico-kria")}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-[0_0_40px_-8px_oklch(0.72_0.21_45/.7)] ring-1 ring-accent/40 transition hover:scale-[1.03] active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              Fazer Diagnóstico Kria Gratuito
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Personagem Kria com glow */}
        <div className="relative mx-auto mt-14 w-full max-w-md md:mt-20 md:max-w-lg">
          <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/40 via-fuchsia-500/30 to-primary/40 blur-3xl" />
          <div className="absolute inset-x-10 -bottom-6 h-12 rounded-full bg-accent/40 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-2xl">
            <img
              src={kriaHero.url}
              alt="Kria — assistente criativa com IA"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Transição suave roxo → próximo bloco (sem cortes) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[oklch(0.18_0.16_305/.7)] to-[oklch(0.16_0.14_300)]" />
    </section>
  );
}
