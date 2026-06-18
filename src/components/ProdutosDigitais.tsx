import { MessageCircle, Sparkles, FileText, Bot, Video } from "lucide-react";
import { openWhatsApp } from "@/lib/contact";

const PRODUTOS = [
  {
    icon: FileText,
    nome: "Pack de Prompts Kria",
    descricao:
      "Prompts para conteúdo, ideias, carrosséis, roteiros, imagens e organização.",
    cta: "Quero o pack",
    msg: "Olá, Kria! Quero saber sobre o Pack de Prompts Kria.",
  },
  {
    icon: Bot,
    nome: "Seu Clone de IA Base",
    descricao:
      "Um prompt estruturado para criar um assistente com a voz, estilo e estratégia da sua marca.",
    cta: "Quero meu clone de IA",
    msg: "Olá, Kria! Quero saber sobre o produto Seu Clone de IA Base.",
  },
  {
    icon: Video,
    nome: "PDF Guia de Vídeos com IA",
    descricao:
      "Base prática para começar a criar vídeos, personagens, cenas e campanhas com IA.",
    cta: "Quero o guia",
    msg: "Olá, Kria! Quero saber sobre o PDF Guia de Vídeos com IA.",
  },
];

export default function ProdutosDigitais() {
  return (
    <section id="produtos" className="bg-[#07030F] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C9A6FF]">
            <Sparkles className="h-3 w-3" /> Produtos digitais
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Produtos prontos para quem quer{" "}
            <span className="text-[#FF6A2C]">começar sozinho</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PRODUTOS.map(({ icon: Icon, nome, descricao, cta, msg }) => (
            <div
              key={nome}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#A855F7]/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-[#C9A6FF] ring-1 ring-[#A855F7]/25">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{nome}</h3>
              <p className="mt-2 flex-1 text-sm text-[#B8AFC8]">{descricao}</p>
              <button
                onClick={() => openWhatsApp(msg)}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-4 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
              >
                <MessageCircle className="h-4 w-4" /> {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
