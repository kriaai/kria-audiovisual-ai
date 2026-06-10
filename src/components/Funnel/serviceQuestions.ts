export type ExtraField = {
  key: string;
  label: string;
  placeholder?: string;
  type: "text" | "textarea";
};

export type ServiceConfig = {
  checkboxes: string[];
  checkboxLabel: string;
  extras: ExtraField[];
  description: { label: string; placeholder: string };
};

export const SERVICE_QUESTIONS: Record<string, ServiceConfig> = {
  Filmmaker: {
    checkboxLabel: "Que tipo de vídeo você precisa?",
    checkboxes: ["Vídeo institucional", "Reels/TikTok", "Documentário", "Cobertura de evento", "Campanha", "Outro"],
    extras: [{ key: "cidade", label: "Cidade", placeholder: "Ex: Belém - PA", type: "text" }],
    description: { label: "Descreva sua ideia", placeholder: "Conte um pouco sobre o projeto..." },
  },
  Fotógrafo: {
    checkboxLabel: "Que tipo de fotografia?",
    checkboxes: ["Produto", "Marca pessoal", "Evento", "Gastronomia", "Arquitetura", "Outro"],
    extras: [{ key: "cidade", label: "Cidade", placeholder: "Ex: Belém - PA", type: "text" }],
    description: { label: "Conte mais sobre o ensaio", placeholder: "Estilo, referências, local..." },
  },
  "Editor de Vídeo": {
    checkboxLabel: "O que você precisa editar?",
    checkboxes: ["Reels/Short", "Vídeo longo", "Motion graphics", "Legendas", "Color grading", "Outro"],
    extras: [{ key: "quantidade", label: "Quantidade por mês", placeholder: "Ex: 10 vídeos/mês", type: "text" }],
    description: { label: "Detalhes da edição", placeholder: "Estilo, prazo, material bruto..." },
  },
  "Automação com IA": {
    checkboxLabel: "O que você quer automatizar?",
    checkboxes: ["Atendimento", "Postagens", "Relatórios", "E-mails", "Orçamentos", "Arquivos"],
    extras: [],
    description: { label: "Como funciona seu processo atual?", placeholder: "Explique o fluxo que quer automatizar..." },
  },
  Produtor: {
    checkboxLabel: "O que você precisa produzir?",
    checkboxes: ["Roteiro", "Direção criativa", "Casting", "Locação", "Pós-produção", "Lançamento"],
    extras: [],
    description: { label: "Detalhes do projeto", placeholder: "Escopo, prazo, equipe..." },
  },
  Design: {
    checkboxLabel: "Que tipo de design?",
    checkboxes: ["Logo", "Posts redes sociais", "Apresentação", "Material impresso", "Embalagem", "Outro"],
    extras: [],
    description: { label: "Conte mais sobre a sua marca", placeholder: "Estilo, referências, público..." },
  },
  "Consultoria de IA": {
    checkboxLabel: "Em que área quer aplicar IA?",
    checkboxes: ["Dia a dia", "Automatizar", "Conteúdo com IA", "Ferramentas", "Vendas", "Gestão"],
    extras: [{ key: "nivel", label: "Seu nível atual com IA", placeholder: "Iniciante, intermediário, avançado", type: "text" }],
    description: { label: "Qual o seu maior desafio com IA?", placeholder: "Conte onde você quer chegar..." },
  },
  "Criação de Sites": {
    checkboxLabel: "Que tipo de site?",
    checkboxes: ["Landing page", "Site institucional", "Portfólio", "E-commerce", "Blog", "Formulário"],
    extras: [{ key: "referencia", label: "Site de referência", placeholder: "Cole um link, se tiver", type: "text" }],
    description: { label: "Detalhes do projeto", placeholder: "O que o site precisa fazer?" },
  },
};
