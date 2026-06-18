## Escopo

Refator visual + reorganização comercial do site Kria AI. Mantenho a estrutura TanStack Start atual, componentes UI shadcn e fluxo Formspree existente. Não reescrevo o projeto.

## Arquivos a tocar

**Lógica / utilitários**
- `src/lib/contact.ts` — adicionar `openWhatsApp(message)` reutilizando `waLink`.
- `src/lib/packages.ts` — atualizar/expandir catálogo de pacotes, serviços e produtos digitais (sem preço).
- `src/lib/recommend.ts` *(novo)* — função `recommendPackage(answers)` com as regras descritas.

**Páginas / rotas**
- `src/routes/index.tsx` — nova ordem: Hero → ConsultoriaWorkshop → ServicesGrid → PacotesKria → Diagnóstico → ProdutosDigitais → SejaUmKria → Footer.
- `src/routes/__root.tsx` — ajustes só se necessário p/ nav.

**Componentes existentes**
- `src/components/Hero.tsx` — novo título, subtítulo, CTA WhatsApp, CTA "Ver serviços", microcopy, card lateral "Consultoria Kria AI". Remover halos/blobs/glow.
- `src/components/ConsultoriaGabbe.tsx` — renomear visualmente para "Consultoria e Workshop Kria AI", 4 cards (1h, 2h, Workshop 4h, Avaliação WA), selo "Produto principal", sem preço. Mantém arquivo (sem renomear pra não quebrar imports).
- `src/components/DiagnosticoHighlight.tsx` — virar wrapper enxuto do diagnóstico (título + subtítulo novos + Funnel).
- `src/components/Funnel/Funnel.tsx` — substituir formulário atual por quiz mobile-first em 8 etapas, botões grandes laranja, integra `recommendPackage`, envia Formspree.
- `src/components/Funnel/Success.tsx` — mini-relatório (perfil, gargalo, potencial, pacote, serviços, próximo passo) + 3 CTAs WhatsApp com template preenchido.
- `src/components/SiteNav.tsx` — menu: Início, Consultoria, Serviços, Diagnóstico, Produtos, Seja um Kria, WhatsApp; botão "Falar com a Kria".
- `src/components/FloatingActions.tsx` — manter botão flutuante WhatsApp; remover poluição.
- `src/components/Footer.tsx` — pequenos ajustes de links.
- `src/styles.css` — remover halos/glows fortes, ajustar paleta para `#07030F → #120720`, accent `#FF6A2C`, roxo `#A855F7`. Glassmorphism discreto.

**Componentes novos**
- `src/components/ServicesGrid.tsx` — 8 serviços com CTAs WhatsApp personalizados, selos "Apenas Belém" onde se aplica.
- `src/components/PacotesKria.tsx` — 4 pacotes (Iniciante, Empresário, Creator, Packs), sem preço.
- `src/components/ProdutosDigitais.tsx` — 3 produtos (Pack Prompts, Clone IA, PDF Vídeos com IA).
- `src/components/SejaUmKria.tsx` — formulário Formspree com origem "Cadastro Rede de Krias".

## Visual

- Background: degradê escuro `#07030F → #120720`, sem blobs nem halo.
- Botões CTA: laranja `#FF6A2C` (hover `#FF8A3D`), texto branco.
- Roxo `#A855F7` só como detalhe (bordas, ícones, selos).
- Glass: `bg-white/[0.04]` + `border-white/10` + `backdrop-blur-md`. Sem shadow neon.
- Mobile-first: 1 coluna, botões grandes (`h-12`), tipografia menor mas legível.

## Formspree

- Centralizar em `src/lib/contact.ts`: `export const FORMSPREE_ENDPOINT = "..."` (manter o atual se existir, com comentário "trocar aqui").
- Payload do diagnóstico com todos os campos pedidos (perfil, objetivo, bloqueio, preferência, interesse, cidade, estado, momento_financeiro, pacote_recomendado, servicos_indicados, etc.).
- Payload do "Seja um Kria" com `origem: "Cadastro Rede de Krias"`.

## Regras de recomendação (resumo)

| Condição                                           | Pacote                                  |
| -------------------------------------------------- | --------------------------------------- |
| iniciante / financeiro começando / fazer sozinho   | Kria Packs                              |
| empreendedor c/ bloqueio tempo/organização/ideias  | Kria Empresário Autônomo                |
| creator/influencer/artista + objetivo conteúdo/IA  | Kria Creator                            |
| agência/produtora/social                           | Workshop Kria AI + Rede de Krias        |
| preferência = contratar execução                   | Serviços personalizados + consultoria   |
| objetivo = site/landing                            | Site + Consultoria Estratégica          |
| objetivo = produto digital                         | Ebook + Pack Prompts + Consultoria      |
| Belém + interesse captação/book                    | + Serviços presenciais                  |

## Fora de escopo (mantenho como está)

- shadcn UI internals.
- `src/router.tsx`, `src/start.ts`, `src/server.ts`.
- Zip enviado: trato `/dev-server` atual como já equivalente — não vou re-extrair em cima para evitar conflito com `.git`.

## Validação final

- Build limpo (`vite build` automático).
- Smoke do preview: hero, quiz funcionando até a tela de resultado, botões WhatsApp abrindo `wa.me`.

Posso seguir?