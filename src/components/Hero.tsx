import { MessageCircle, ArrowRight, Sparkles, Clock, UserCheck, Target } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { openWhatsApp } from "@/lib/contact";

const WA_AVALIACAO =
  "Olá, Kria! Quero fazer uma avaliação do meu negócio e entender como a consultoria pode me ajudar.";
const WA_CONSULTORIA = "Olá, Kria! Quero saber como funciona a consultoria Kria AI.";
const WA_NAOSEI =
  "Olá, Kria! Ainda não sei o que preciso. Quero uma avaliação do meu negócio.";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-[#07030F] pt-28 md:pt-32"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #07030F 0%, #0D0518 55%, #120720 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 md:pb-28">
        <div className="flex justify-center">
          <BrandLogo size="lg" variant="onDark" className="h-12 md:h-16" />
        </div>

        <div className="mt-10 grid items-start gap-10 md:mt-14 md:grid-cols-[1.15fr_1fr] md:gap-10">
          {/* Texto principal */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#FF6A2C]" />
              Consultoria · IA · Estratégia
            </div>
            <h1 className="mt-5 text-[2.1rem] font-black leading-[1.05] tracking-tight text-white md:text-[3.4rem]">
              Transforme IA em estratégia, conteúdo e{" "}
              <span className="text-[#FF6A2C]">venda</span> para o seu negócio.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-[#B8AFC8] md:mx-0 md:text-lg">
              A Kria AI te ajuda a organizar ideias, criar conteúdo, usar IA do jeito
              certo e montar um plano prático para vender mais sem depender de
              achismo.
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap md:items-start">
              <button
                onClick={() => openWhatsApp(WA_AVALIACAO)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-6 text-sm font-bold text-white shadow-lg shadow-[#FF6A2C]/25 transition hover:bg-[#FF8A3D] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Fazer avaliação pelo WhatsApp
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo("servicos")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Ver serviços da Kria
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#B8AFC8] md:justify-start">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#A855F7]" /> Consultorias e workshops de 1h até 4h
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-[#A855F7]" /> Atendimento humano
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#A855F7]" /> Estratégia personalizada
              </span>
            </div>
          </div>

          {/* Card lateral de destaque */}
          <aside className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C9A6FF]">
              <Sparkles className="h-3 w-3" /> Produto principal
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
              Consultoria Kria AI
            </h2>
            <p className="mt-3 text-sm text-[#B8AFC8] md:text-base">
              Para empreendedores, criadores, agências e profissionais que querem
              usar IA para criar conteúdo, organizar processos e vender melhor.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => openWhatsApp(WA_CONSULTORIA)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-5 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
              >
                <MessageCircle className="h-4 w-4" />
                Quero uma consultoria
              </button>
              <button
                onClick={() => openWhatsApp(WA_NAOSEI)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Não sei o que preciso
              </button>
            </div>

            <p className="mt-4 text-[11px] uppercase tracking-widest text-[#B8AFC8]/70">
              1h · 2h · Workshop até 4h
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
