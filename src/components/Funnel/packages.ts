import type { FunnelData } from "./Funnel";

export type Pacote = {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
};

export const CATALOGO: Record<string, Pacote> = {
  conteudo: {
    id: "conteudo",
    nome: "Plano Conteúdo Kria",
    preco: "R$ 500",
    descricao: "12 templates no Canva, identidade visual adaptada, temas, legendas e calendário de postagem.",
  },
  bancoIA: {
    id: "bancoIA",
    nome: "Banco de Referência IA",
    preco: "R$ 150",
    descricao: "Book visual com fotos em vários ângulos e prompt mestre para criação de imagens e vídeos com IA.",
  },
  landing: {
    id: "landing",
    nome: "Landing Page Kria",
    preco: "A partir de R$ 1.000",
    descricao: "Página estratégica para apresentação da oferta e conversão em leads.",
  },
  prompts: {
    id: "prompts",
    nome: "Pack de Prompts Personalizado",
    preco: "A partir de R$ 80",
    descricao: "Prompts criados sob medida para o seu negócio acelerar a produção com IA.",
  },
  captacao: {
    id: "captacao",
    nome: "Captação de Vídeo",
    preco: "R$ 180/hora",
    descricao: "Captação profissional de vídeos para conteúdo e campanhas.",
  },
  edicao: {
    id: "edicao",
    nome: "Edição de Vídeo",
    preco: "R$ 90/minuto",
    descricao: "Edição com direção própria e até 1 alteração inclusa.",
  },
  edicaoTerceiros: {
    id: "edicaoTerceiros",
    nome: "Edição com Direção de Terceiros",
    preco: "R$ 150/minuto",
    descricao: "Edição seguindo direção, briefing ou roteiro de terceiros.",
  },
  bookIA: {
    id: "bookIA",
    nome: "Book Fotográfico IA",
    preco: "R$ 25 por foto",
    descricao: "Fotos geradas com IA para imagem pessoal, conteúdo ou marca.",
  },
  projetoIA: {
    id: "projetoIA",
    nome: "Projeto com IA",
    preco: "A partir de R$ 50",
    descricao: "Criação visual ou conceitual com IA, conforme complexidade.",
  },
  roteiro: {
    id: "roteiro",
    nome: "Roteiro Personalizado",
    preco: "R$ 70",
    descricao: "Roteiro estratégico para vídeo, apresentação ou conteúdo.",
  },
  logo: {
    id: "logo",
    nome: "Logomarca e Identidade Visual",
    preco: "A partir de R$ 300",
    descricao: "Criação de marca visual com prazo de até 1 mês.",
  },
  workshopIA: {
    id: "workshopIA",
    nome: "Workshop IA Online",
    preco: "R$ 450",
    descricao: "Aula online sobre uso de IA para produtividade, marketing e criação.",
  },
  workshopConteudo: {
    id: "workshopConteudo",
    nome: "Workshop Kria Conteúdo",
    preco: "R$ 250",
    descricao: "Aula online para aprender a criar conteúdo com método e IA.",
  },
  consultoria: {
    id: "consultoria",
    nome: "Consultoria Kria AI",
    preco: "R$ 350",
    descricao: "Sessão estratégica online personalizada para destravar o próximo passo.",
  },
  bio: {
    id: "bio",
    nome: "Bio Magnética",
    preco: "R$ 150",
    descricao: "Bio estratégica para Instagram com posicionamento e chamada para ação.",
  },
};

export type Scores = {
  conteudo: number;
  autoridade: number;
  presencaDigital: number;
  estrutura: number;
  aquisicao: number;
};

export function calcScores(d: FunnelData): Scores {
  // Conteúdo
  const freqMap: Record<string, number> = {
    "Todo dia": 80, "3 a 5 vezes": 60, "1 a 2 vezes": 40, "Quase nunca": 20, "Nunca": 5,
  };
  let conteudo = freqMap[d.frequenciaConteudo] ?? 15;
  if (d.gravaVideos === "Sim") conteudo += 10;
  if (d.dificuldadeConteudo === "Falta de tempo") conteudo -= 15;
  if (d.dificuldadeConteudo === "Não tenho dificuldade") conteudo += 10;
  if (d.apareceEmVideos === "Não") conteudo -= 5;
  conteudo = Math.max(5, Math.min(conteudo, 95));

  // Autoridade
  const tempoMap: Record<string, number> = {
    "Menos de 6 meses": 20, "6 meses a 1 ano": 35, "1 a 3 anos": 55, "Mais de 3 anos": 75,
  };
  let autoridade = tempoMap[d.tempoNegocio] ?? 25;
  if (d.frequenciaConteudo === "Todo dia" || d.frequenciaConteudo === "3 a 5 vezes") autoridade += 10;
  if (d.situacao === "Meu negócio não aparece") autoridade -= 15;
  autoridade = Math.max(10, Math.min(autoridade, 95));

  // Presença Digital
  let presencaDigital = 25;
  presencaDigital += Math.min((d.canais?.length || 0) * 6, 30);
  presencaDigital += Math.min((d.origemClientes?.length || 0) * 5, 25);
  if (d.possuiSite === "Sim") presencaDigital += 15;
  if (d.possuiSite === "Não") presencaDigital -= 10;
  if (d.canais.includes("Não faço divulgação")) presencaDigital -= 20;
  if (d.origemClientes.length === 1 && d.origemClientes.includes("Indicação")) presencaDigital -= 15;
  presencaDigital = Math.max(5, Math.min(presencaDigital, 95));

  // Estrutura
  let estrutura = 20;
  if (d.equipeMkt === "Sim") estrutura += 25;
  if (d.criadorConteudo && d.criadorConteudo !== "Eu mesmo" && d.criadorConteudo !== "Ninguém cria conteúdo") estrutura += 15;
  if (d.criadorConteudo === "Ninguém cria conteúdo") estrutura -= 10;
  if (d.equipamento === "iPhone" || d.equipamento === "Câmera profissional") estrutura += 10;
  const iaTools = d.ferramentas.filter((f) => ["ChatGPT", "Gemini", "Claude", "IA para imagens"].includes(f)).length;
  estrutura += iaTools * 5;
  if (d.possuiWhatsappBusiness === "Sim") estrutura += 10;
  estrutura = Math.max(5, Math.min(estrutura, 95));

  // Aquisição
  let aquisicao = 20;
  if (d.anuncios === "Sim") aquisicao += 30;
  else if (d.anuncios === "Já investi antes") aquisicao += 15;
  const fatMap: Record<string, number> = {
    "Ainda não vendo": 0, "Até R$ 2 mil": 5, "R$ 2 mil a R$ 5 mil": 15,
    "R$ 5 mil a R$ 10 mil": 25, "R$ 10 mil a R$ 30 mil": 35, "Acima de R$ 30 mil": 45,
  };
  aquisicao += fatMap[d.faturamento] ?? 5;
  aquisicao = Math.max(5, Math.min(aquisicao, 95));

  return { conteudo, autoridade, presencaDigital, estrutura, aquisicao };
}

export function scoreKria(s: Scores): number {
  return Math.round((s.conteudo + s.autoridade + s.presencaDigital + s.estrutura + s.aquisicao) / 5);
}

export type Recomendacao = {
  principal: Pacote;
  motivo: string;
  adicionais: Pacote[];
  pontosFortes: string[];
  gargalos: string[];
  oportunidades: string[];
};

export function recomendar(d: FunnelData, s: Scores): Recomendacao {
  const semTempo =
    d.situacao === "Não tenho tempo" ||
    d.dificuldadeConteudo === "Falta de tempo" ||
    d.frequenciaConteudo === "Quase nunca" ||
    d.frequenciaConteudo === "Nunca";

  const naoGrava = d.gravaVideos === "Não";
  const usaIA = d.ferramentas.some((f) => ["ChatGPT", "Gemini", "Claude", "IA para imagens"].includes(f));
  const semSite = d.possuiSite === "Não";
  const precisaPosicionamento =
    d.situacao === "Meu negócio não aparece" ||
    d.situacao === "Tenho seguidores mas vendo pouco" ||
    s.autoridade < 40;
  const investAlto =
    d.faixaInvestimento === "R$ 1.000 a R$ 3.000" || d.faixaInvestimento === "Acima de R$ 3.000";
  const investBaixo = d.faixaInvestimento === "Até R$ 100";

  // Escolha do pacote principal por prioridade
  let principalId = "conteudo";
  let motivo = "Indicado porque seu maior gargalo está na geração de conteúdo consistente.";

  if (semTempo) {
    principalId = "conteudo";
    motivo = "Indicado porque você informou que tem pouco tempo para criar conteúdo com consistência.";
  } else if (semSite && investAlto) {
    principalId = "landing";
    motivo = "Indicado porque você não possui site e tem orçamento para transformar visitantes em leads.";
  } else if (naoGrava && !d.apareceEmVideos.startsWith("Não")) {
    principalId = "captacao";
    motivo = "Indicado porque você não grava vídeos hoje e isso limita seu alcance.";
  } else if (d.apareceEmVideos === "Não") {
    principalId = "bancoIA";
    motivo = "Indicado porque você prefere não aparecer em vídeos — vamos criar com IA mantendo sua identidade.";
  } else if (precisaPosicionamento && investBaixo) {
    principalId = "bio";
    motivo = "Indicado para melhorar sua primeira impressão e aumentar conversão no Instagram.";
  } else if (precisaPosicionamento) {
    principalId = "consultoria";
    motivo = "Indicado porque você precisa de direcionamento estratégico antes de executar.";
  } else if (usaIA) {
    principalId = "bancoIA";
    motivo = "Indicado porque você já usa IA e pode elevar a qualidade das imagens geradas.";
  } else if (d.dificuldadeConteudo === "Falta de ideias") {
    principalId = "prompts";
    motivo = "Indicado porque sua maior dificuldade é gerar ideias — vamos resolver com prompts personalizados.";
  }

  const principal = CATALOGO[principalId];

  // Adicionais compatíveis (até 4, sem repetir o principal)
  const candidatos: string[] = [];
  if (semTempo) candidatos.push("bancoIA", "consultoria", "bio");
  if (naoGrava) candidatos.push("captacao", "workshopConteudo");
  if (usaIA) candidatos.push("bancoIA", "prompts", "bookIA");
  if (precisaPosicionamento) candidatos.push("bio", "consultoria", "logo");
  if (semSite) candidatos.push("landing");
  if (d.possuiWhatsappBusiness === "Não") candidatos.push("consultoria");
  if (d.dificuldadeConteudo === "Falta de ideias") candidatos.push("prompts", "consultoria");
  if (d.dificuldadeConteudo === "Vergonha de aparecer") candidatos.push("bancoIA", "bookIA");
  if (d.dificuldadeConteudo === "Não sei gravar") candidatos.push("captacao", "workshopConteudo");
  if (d.dificuldadeConteudo === "Não sei editar") candidatos.push("edicao");
  if (d.objetivo90dias === "Lançar um produto ou serviço") candidatos.push("landing", "roteiro");
  if (d.objetivo90dias === "Fortalecer minha marca") candidatos.push("logo", "bio");
  if (d.objetivo90dias === "Automatizar processos") candidatos.push("prompts", "workshopIA");
  // fallback variety
  candidatos.push("consultoria", "bio", "bancoIA", "captacao");

  const adicionais: Pacote[] = [];
  const seen = new Set<string>([principalId]);
  for (const id of candidatos) {
    if (adicionais.length >= 4) break;
    if (seen.has(id)) continue;
    if (!CATALOGO[id]) continue;
    seen.add(id);
    adicionais.push(CATALOGO[id]);
  }

  // Pontos fortes / Gargalos / Oportunidades
  const entries = Object.entries(s) as [keyof Scores, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const labelMap: Record<keyof Scores, string> = {
    conteudo: "Conteúdo",
    autoridade: "Autoridade",
    presencaDigital: "Presença Digital",
    estrutura: "Estrutura",
    aquisicao: "Aquisição de Clientes",
  };
  const pontosFortes = sorted.filter(([, v]) => v >= 55).slice(0, 2).map(([k]) => labelMap[k]);
  const gargalos = sorted.filter(([, v]) => v < 45).slice(-2).map(([k]) => labelMap[k]);
  const oportunidades: string[] = [];
  if (semSite) oportunidades.push("Criar uma landing page para converter visitantes em leads");
  if (d.possuiWhatsappBusiness === "Não") oportunidades.push("Ativar WhatsApp Business para profissionalizar o atendimento");
  if (!usaIA) oportunidades.push("Incorporar IA na rotina para escalar produção de conteúdo");
  if (d.frequenciaConteudo === "Quase nunca" || d.frequenciaConteudo === "Nunca")
    oportunidades.push("Estabelecer cadência semanal de conteúdo");
  if (oportunidades.length === 0) oportunidades.push("Aprofundar o uso de IA para acelerar resultados");

  return { principal, motivo, adicionais, pontosFortes, gargalos, oportunidades };
}

export function classificarLead(urgencia: string): string {
  switch (urgencia) {
    case "Hoje": return "Quente";
    case "Nos próximos 30 dias": return "Morno";
    case "Nos próximos 3 meses": return "Em nutrição";
    case "Ainda estou pesquisando": return "Frio";
    default: return "Indefinido";
  }
}
