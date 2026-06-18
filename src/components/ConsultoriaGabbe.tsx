import { MessageCircle, Sparkles, Clock, Layers, Users, MessagesSquare } from "lucide-react";
import { openWhatsApp } from "@/lib/contact";

type Card = {
  icon: typeof Clock;
  titulo: string;
  texto: string;
  cta: string;
  msg: string;
  destaque?: boolean;
};

const CARDS: Card[] = [
  {
    icon: Clock,
    titulo: "Consultoria 1h",
    texto:
      "Ideal para quem precisa de clareza rápida, diagnóstico do momento atual e próximos passos.",
    cta: "Quero consultoria de 1h",
    msg: "Olá, Kria! Quero saber sobre a consultoria de 1h.",
  },
  {
    icon: Layers,
    titulo: "Consultoria Estratégica 2h",
    texto:
      "Para organizar conteúdo, ofertas, ferramentas, IA, fluxo de trabalho e plano de execução.",
    cta: "Quero organizar meu negócio",
    msg: "Olá, Kria! Quero uma consultoria estratégica para organizar meu negócio, conteúdo e uso de IA.",
    destaque: true,
  },
  {
    icon: Users,
    titulo: "Workshop até 4h",
    texto:
      "Para equipes, agências, criadores e negócios que querem aprender a aplicar IA no dia a dia.",
    cta: "Quero um workshop",
    msg: "Olá, Kria! Quero saber sobre o workshop de IA de até 4h.",
  },
  {
    icon: MessagesSquare,
    titulo: "Avaliação pelo WhatsApp",
    texto:
      "Responda algumas perguntas rápidas e receba uma recomendação do melhor caminho.",
    cta: "Fazer avaliação agora",
    msg: "Olá, Kria! Quero fazer uma avaliação do meu negócio pelo WhatsApp.",
  },
];

export default function ConsultoriaGabbe() {
  return (
    <section id="consultoria" className="bg-[#0A0414] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C9A6FF]">
            <Sparkles className="h-3 w-3" /> Produto principal da Kria AI
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Consultoria e Workshop <span className="text-[#FF6A2C]">Kria AI</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#B8AFC8] md:text-lg">
            Uma conversa prática para organizar seu negócio, encontrar gargalos e
            transformar IA em ação.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, titulo, texto, cta, msg, destaque }) => (
            <div
              key={titulo}
              className={`flex flex-col rounded-3xl border p-6 backdrop-blur-md transition hover:-translate-y-0.5 ${
                destaque
                  ? "border-[#FF6A2C]/40 bg-gradient-to-b from-[#FF6A2C]/[0.08] to-white/[0.03]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20"
              }`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-[#C9A6FF] ring-1 ring-[#A855F7]/25">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-[#B8AFC8]">{texto}</p>
              <button
                onClick={() => openWhatsApp(msg)}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-4 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
              >
                <MessageCircle className="h-4 w-4" /> {cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-[#B8AFC8] md:text-base">
          Você sai da consultoria com clareza do que postar, quais ferramentas usar,
          quais serviços priorizar e qual próximo passo executar.
        </p>
      </div>
    </section>
  );
}
