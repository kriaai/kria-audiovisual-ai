import {
  MessageCircle, Sparkles, Bot, Globe, Video, Scissors, Camera, ImageIcon, BookOpen, LayoutGrid,
} from "lucide-react";
import { openWhatsApp } from "@/lib/contact";

type Servico = {
  icon: typeof Bot;
  nome: string;
  descricao: string;
  msg: string;
  selo?: string;
};

const SERVICOS: Servico[] = [
  {
    icon: Bot,
    nome: "Personagem de IA",
    descricao:
      "Criação de personagem visual com identidade, estilo, roteiro de uso e prompts para conteúdo.",
    msg: "Olá, Kria! Quero saber sobre o serviço de Personagem de IA.",
  },
  {
    icon: Globe,
    nome: "Site e Landing Page",
    descricao:
      "Página estratégica para apresentar sua marca, vender serviço, captar lead ou divulgar campanha.",
    msg: "Olá, Kria! Quero criar um site ou landing page.",
  },
  {
    icon: Video,
    nome: "Captação de Conteúdo",
    descricao:
      "Captação com celular ou câmera para reels, bastidores, institucional, evento ou conteúdo de marca.",
    msg: "Olá, Kria! Quero orçamento para captação de conteúdo em Belém/região.",
    selo: "Apenas Belém e região",
  },
  {
    icon: Scissors,
    nome: "Edição de Vídeo",
    descricao:
      "Edição para reels, vídeos de venda, anúncios, bastidores, cortes e conteúdos para Instagram.",
    msg: "Olá, Kria! Quero saber sobre edição de vídeo.",
  },
  {
    icon: ImageIcon,
    nome: "Book de IA",
    descricao:
      "Imagens criativas com IA para posicionamento, campanha, avatar, marca pessoal ou divulgação.",
    msg: "Olá, Kria! Quero criar um Book de IA.",
  },
  {
    icon: Camera,
    nome: "Book Fotográfico",
    descricao:
      "Ensaio fotográfico para marca pessoal, profissional, produto ou conteúdo.",
    msg: "Olá, Kria! Quero saber sobre Book Fotográfico em Belém.",
    selo: "Apenas Belém",
  },
  {
    icon: BookOpen,
    nome: "Criação de Ebooks",
    descricao:
      "Estrutura, texto, design e estratégia para transformar conhecimento em produto digital.",
    msg: "Olá, Kria! Quero criar um ebook.",
  },
  {
    icon: LayoutGrid,
    nome: "Pack de Carrossel Instagram",
    descricao:
      "Carrosséis estratégicos para educar, posicionar, vender e aumentar autoridade.",
    msg: "Olá, Kria! Quero um pack de carrossel para Instagram.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicos" className="bg-[#07030F] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6A2C]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#FF8A3D]">
            <Sparkles className="h-3 w-3" /> Serviços Kria
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Serviços que a Kria pode criar para você
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#B8AFC8] md:text-lg">
            Escolha o que você precisa e fale direto no WhatsApp. A Kria entende o
            seu momento e indica o melhor caminho.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICOS.map(({ icon: Icon, nome, descricao, msg, selo }) => (
            <div
              key={nome}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#A855F7]/40"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#A855F7]/15 text-[#C9A6FF] ring-1 ring-[#A855F7]/25">
                  <Icon className="h-5 w-5" />
                </span>
                {selo && (
                  <span className="rounded-full border border-[#FF6A2C]/40 bg-[#FF6A2C]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF8A3D]">
                    {selo}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{nome}</h3>
              <p className="mt-1.5 flex-1 text-sm text-[#B8AFC8]">{descricao}</p>
              <button
                onClick={() => openWhatsApp(msg)}
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-4 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
              >
                <MessageCircle className="h-4 w-4" /> Pedir pelo WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
