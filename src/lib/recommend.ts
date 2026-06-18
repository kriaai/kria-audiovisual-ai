export type QuizAnswers = {
  perfil: string;
  objetivo: string;
  bloqueio: string[];
  preferencia: string;
  interesse: string[];
  cidade: string;
  estado: string;
  momentoFinanceiro: string;
  nome: string;
  whatsapp: string;
  instagram: string;
  email: string;
};

const BELEM_AREA = ["belem", "belém", "ananindeua", "marituba", "benevides", "icoaraci"];

export function isBelemRegiao(cidade: string, estado: string) {
  if ((estado || "").toUpperCase() !== "PA") return false;
  const c = (cidade || "").trim().toLowerCase();
  return BELEM_AREA.some((x) => c.includes(x));
}

export type Recomendacao = {
  pacote: string;
  pacoteDescricao: string;
  servicos: string[];
  proximoPasso: string;
  gargalo: string;
  potencial: string;
};

export function recommend(a: QuizAnswers): Recomendacao {
  const perfil = a.perfil || "";
  const obj = a.objetivo || "";
  const bloq = a.bloqueio || [];
  const pref = a.preferencia || "";
  const inter = a.interesse || [];
  const mom = a.momentoFinanceiro || "";
  const belem = isBelemRegiao(a.cidade, a.estado);

  let pacote = "Pacote Kria Empresário Autônomo";
  let pacoteDescricao =
    "Mais indicado para organizar conteúdo, rotina, IA, WhatsApp e execução comercial.";
  const servicos: string[] = [];
  let proximoPasso =
    "Agendar uma consultoria estratégica para mapear seus próximos 30 dias.";

  const isIniciante =
    /Estudante|iniciante/i.test(perfil) ||
    mom.startsWith("Estou começando") ||
    pref === "Quero aprender e fazer sozinho";

  const isAgencia = /Agência|produtora|social/i.test(perfil);
  const isCreator = /Criador|influencer|artista|Produtor/i.test(perfil);
  const isEmpreendedor = /Empreendedor|negócio local|autônomo|Prestador/i.test(perfil);

  if (isIniciante) {
    pacote = "Pacote Kria Packs";
    pacoteDescricao =
      "Mais indicado para você começar com autonomia usando prompts, guias e materiais prontos.";
  } else if (isAgencia) {
    pacote = "Workshop Kria AI + Rede de Krias";
    pacoteDescricao =
      "Mais indicado para aprender IA aplicada, criar novos serviços e participar da rede Kria.";
  } else if (
    isCreator &&
    (/conteúdo|marca|IA|personagem/i.test(obj) || inter.some((i) => /Personagem|Book|Conteúdo/i.test(i)))
  ) {
    pacote = "Pacote Kria Creator";
    pacoteDescricao =
      "Mais indicado para transformar sua imagem, conteúdo e narrativa em presença digital com estratégia.";
  } else if (
    isEmpreendedor &&
    bloq.some((b) => /tempo|organização|constância|ideias|postar/i.test(b))
  ) {
    pacote = "Pacote Kria Empresário Autônomo";
    pacoteDescricao =
      "Mais indicado para organizar conteúdo, rotina, IA, WhatsApp e execução comercial.";
  }

  if (pref === "Quero contratar alguém para executar") {
    servicos.push("Serviços personalizados", "Consultoria inicial");
  }
  if (/site|landing/i.test(obj)) {
    servicos.push("Site e Landing Page", "Consultoria Estratégica");
  }
  if (/produtos digitais/i.test(obj)) {
    servicos.push("Criação de Ebook", "Pack de Prompts", "Consultoria");
  }
  if (/conteúdo|constância/i.test(obj)) {
    servicos.push("Pack de Carrossel Instagram", "Edição de Vídeo");
  }
  if (/IA/i.test(obj)) {
    servicos.push("Personagem de IA", "Book de IA");
  }
  if (belem && inter.some((i) => /Captação|Book/i.test(i))) {
    servicos.push("Captação de Conteúdo (Belém)", "Book Fotográfico (Belém)");
  }
  if (servicos.length === 0) {
    servicos.push("Consultoria Kria AI", "Pack de Prompts");
  }

  const gargalo = bloq[0] || "Falta de direção estratégica";
  const potencial = isCreator
    ? "Alto potencial para escalar marca pessoal usando IA + conteúdo estratégico."
    : isAgencia
    ? "Alto potencial para expandir oferta de serviços com IA aplicada."
    : "Alto potencial para profissionalizar presença digital e vender mais.";

  if (pref === "Quero consultoria para organizar") {
    proximoPasso = "Fechar uma consultoria estratégica de 2h para destravar seu plano.";
  } else if (pref === "Quero aprender e fazer sozinho") {
    proximoPasso = "Começar pelo Pack de Prompts e acompanhar o método Kria.";
  }

  return {
    pacote,
    pacoteDescricao,
    servicos: Array.from(new Set(servicos)).slice(0, 5),
    proximoPasso,
    gargalo,
    potencial,
  };
}
