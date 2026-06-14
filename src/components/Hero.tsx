import { Camera, Video, Palette, Bot, Globe, Scissors, CalendarCheck } from "lucide-react";
import kriaHero from "@/assets/kria-hero.png.asset.json";
import BrandLogo from "@/components/BrandLogo";
import { waLink } from "@/lib/contact";

const pills = [
  { icon: Video, label: "Filmmaker" },
  { icon: Camera, label: "Fotografia" },
  { icon: Palette, label: "Design" },
  { icon: Bot, label: "IA & Automação" },
  { icon: Globe, label: "Sites" },
  { icon: Scissors, label: "Edição" },
];

export default function Hero() {
  const scrollToFunnel = () => {
    const el = document.getElementById("funil");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* blobs animados */}
      <span className="blob animate-float bg-accent/40 h-72 w-72 left-[-4rem] top-24" />
      <span className="blob animate-float-slow bg-fuchsia-500/30 h-96 w-96 right-[-6rem] top-10" />
      <span className="blob animate-float bg-violet-400/30 h-80 w-80 left-1/3 bottom-[-6rem]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-24 md:pt-16 md:pb-32">
        {/* Logo */}
        <div className="flex items-center">
          <BrandLogo size="lg" variant="onDark" />
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Diagnóstico em 2 minutos
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              O serviço certo para{" "}
              <span className="text-gradient-brand">transformar o seu negócio</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
              Descubra em 2 minutos qual solução audiovisual ou digital faz mais sentido para você.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {pills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </div>

            <button
              onClick={scrollToFunnel}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-xl shadow-accent/30 transition hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/40 active:scale-95"
            >
              Descobrir meu serviço ideal
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Foto da Kria + CTA de reunião */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/40 to-fuchsia-400/30 blur-2xl" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-2xl">
              <img
                src={kriaHero.url}
                alt="Kria — CEO da Kria AI Audiovisual"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/40 p-4 backdrop-blur-md ring-1 ring-white/10">
                <div className="text-[10px] font-semibold tracking-[0.25em] text-accent">CEO</div>
                <div className="text-sm font-bold text-white">Olá, eu sou a Kria</div>
                <div className="text-xs text-white/70">Liderança. Inovação. Conexão. Resultado.</div>
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
