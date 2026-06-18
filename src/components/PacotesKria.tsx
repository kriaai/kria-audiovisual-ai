import { MessageCircle, Sparkles, Rocket, Briefcase, Star, Package } from "lucide-react";
import { openWhatsApp } from "@/lib/contact";

type Pacote = {
  icon: typeof Rocket;
  nome: string;
  descricao: string;
  inclui: string[];
  cta: string;
  msg: string;
  destaque?: boolean;
};

const PACOTES: Pacote[] = [
  {
    icon: Rocket,
    nome: "Pacote Kria Iniciante",
    descricao:
      "Para quem está começando, não tem clareza de conteúdo, não sabe usar IA ou precisa organizar presença digital.",
    inclui: ["Consultoria inicial", "Direcionamento de conteúdo", "Ideias de posts", "Ferramentas base"],
    cta: "Quero começar",
    msg: "Olá, Kria! Quero entender o Pacote Kria Iniciante.",
  },
  {
    icon: Briefcase,
    nome: "Pacote Kria Empresário Autônomo",
    descricao:
      "Para profissionais liberais, pequenos negócios e prestadores de serviço.",
    inclui: ["Consultoria", "Cronograma", "Organização de conteúdo", "Pack do empreendedor", "Orientação de IA e WhatsApp"],
    cta: "Quero organizar meu negócio",
    msg: "Olá, Kria! Quero entender o Pacote Kria Empresário Autônomo.",
    destaque: true,
  },
  {
    icon: Star,
    nome: "Pacote Kria Creator",
    descricao:
      "Para criadores, influencers, artistas e marcas pessoais.",
    inclui: ["Posicionamento", "Ideias de conteúdo", "Personagem de IA", "Roteiro", "Estética visual", "Plano de publicação"],
    cta: "Quero crescer como creator",
    msg: "Olá, Kria! Quero entender o Pacote Kria Creator.",
  },
  {
    icon: Package,
    nome: "Pacote Kria Packs",
    descricao: "Para quem gosta de fazer sozinho.",
    inclui: ["Packs de prompts", "PDFs práticos", "Templates de ideias", "Clone de IA base", "Guias de execução"],
    cta: "Quero fazer sozinho",
    msg: "Olá, Kria! Quero conhecer o Pacote Kria Packs.",
  },
];

export default function PacotesKria() {
  return (
    <section id="pacotes" className="bg-[#0A0414] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C9A6FF]">
            <Sparkles className="h-3 w-3" /> Pacotes recomendados
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Não sabe o que contratar?{" "}
            <span className="text-[#FF6A2C]">A Kria indica</span> o melhor pacote.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#B8AFC8] md:text-lg">
            Escolha seu momento ou faça o diagnóstico para receber uma recomendação
            personalizada.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PACOTES.map(({ icon: Icon, nome, descricao, inclui, cta, msg, destaque }) => (
            <div
              key={nome}
              className={`flex flex-col rounded-3xl border p-6 backdrop-blur-md transition hover:-translate-y-0.5 ${
                destaque
                  ? "border-[#FF6A2C]/40 bg-gradient-to-br from-[#FF6A2C]/[0.10] via-white/[0.04] to-[#A855F7]/[0.06]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-[#C9A6FF] ring-1 ring-[#A855F7]/25">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-white md:text-xl">{nome}</h3>
              </div>
              <p className="mt-3 text-sm text-[#B8AFC8]">{descricao}</p>
              <ul className="mt-4 space-y-1.5">
                {inclui.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A2C]" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openWhatsApp(msg)}
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-5 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
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
