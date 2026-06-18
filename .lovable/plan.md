## Reestruturação Kria AI — foco em conversão e diagnóstico

Mantém 100% da identidade visual atual (cores, tokens, gradients em `src/styles.css`). Trabalha apenas em componentes existentes + 4 novos. Remove qualquer vestígio de PDF.

---

### 1. Hero (`src/components/Hero.tsx`)
- Logo maior e mais centralizada com brilho/halo.
- Nova headline: **"Descubra o que está travando o crescimento do seu negócio"** + subheadline indicada.
- Dois CTAs: **"Fazer Diagnóstico Kria Gratuito"** (scroll para `#funil`) e **"Ver soluções"** (scroll para seção de pacotes/diagnóstico).
- Cards flutuantes animados ao redor da foto: Conteúdo, IA, WhatsApp, Branding, Landing Page, Diagnóstico, Parceiros Kria — efeito glass + neon sutil usando tokens existentes.
- Manter foto da Kria + CTA "Falar direto com a Kria R$50".

### 2. Botões flutuantes globais (novo: `src/components/FloatingActions.tsx`)
- Fixos bottom-right, empilhados, glass + neon.
- Botão 1: "Diagnóstico Kria" → scroll para `#funil`.
- Botão 2: WhatsApp → `wa.me/5591985091584` com mensagem padrão codificada.
- Montado no `__root.tsx` para aparecer em todas as rotas.

### 3. Header de seção do formulário (`Funnel.tsx`)
- `id="funil"` (já existe).
- Nova `head` da seção: título "Diagnóstico Kria AI", headline e subtexto indicados.
- Card com glass + borda neon sutil + barra de progresso já existente refinada.

### 4. Etapa 1 do formulário — novos campos
Adicionar: **Cidade** e **Estado** (Estado em select de UFs). E-mail já obrigatório, manter.
Validação Zod atualizada.

### 5. Multi-seleção e nichos expandidos
- Substituir todas as perguntas "single choice" relevantes por **multi-select chips/cards** com destaque visual ao marcar:
  - Canais de divulgação, origem dos clientes, ferramentas, desafios, tipos de conteúdo, soluções de interesse, áreas a melhorar.
- Expandir lista de **segmento/nicho** com todas as opções enviadas (multi-select, "Outro" com input).

### 6. Sugestões clicáveis em campos abertos
- No textarea "Principal problema" (e similares), renderizar chips de sugestões: clicar adiciona o texto ao campo. Usuário pode escrever livremente.

### 7. Recomendação inteligente (`packages.ts`)
- Atualizar catálogo para refletir os 15 pacotes (preços e descrições do brief).
- `recomendar()` retorna **1 pacote principal** + até **4 adicionais**, pré-selecionados.
- **Regra geográfica:** se `estado !== "PA"` (ou cidade fora da RMB), nunca recomendar Captação de Vídeo / serviços presenciais — priorizar digitais.
- Cálculo de score 0–100 mantém lógica atual, adaptada aos novos campos.

### 8. Tela de resultado (`Success.tsx`)
- Sem PDF, sem menção. Apenas:
  - Score Kria (0–100) com barra/círculo
  - Pontos fortes / Gargalos / Oportunidades
  - Card destaque do **Pacote principal** com selo "Mais indicado para você"
  - Grid de pacotes adicionais selecionáveis (cards glass+neon, checkbox visual, pré-selecionados)
  - **Resumo + Total estimado: R$ X** atualizado em tempo real
  - Aviso: "Valores podem variar conforme escopo e complexidade."
  - Botão único: **"Continuar pelo WhatsApp"** → envia ao Formspree e abre WhatsApp.

### 9. Envio Formspree e WhatsApp
- Payload inclui: dados pessoais, respostas, score, gargalos, pacote principal, adicionais, selecionados, valor total, timestamp, `tipoFormulario: "Diagnóstico Kria AI"`.
- Falha no Formspree → `console.error` mas segue.
- Mensagem WhatsApp formatada conforme template do brief (emojis + dados + total), via `window.open` + `encodeURIComponent` para `+55 91 9850-91584` (5591985091584).

### 10. Casos Kria (novo: `src/components/Casos.tsx`)
- Seção `id="casos"` com 4 cards (Restaurante, Evento cultural, Marca pessoal, Negócio local) — estrutura: nicho, problema, solução, entrega, serviços.
- Cards glass + neon.

### 11. Nossos Krias (`Partners.tsx`)
- Subtítulo atualizado. Cards melhorados: avatar/logo, nome, especialidade, cidade, serviços, selo de categoria (Vídeo/Design/Branding/Tráfego/Social/Foto/IA/Web/Copy), botão "Conhecer", hover com neon.

### 12. Seja um Kria (`Clube.tsx`)
- Manter CTA "Quero ser um Kria". Garantir formulário com todos campos do brief e `tipoFormulario: "Cadastro Seja um Kria"` no payload Formspree.

### 13. Menu / Header (novo: `src/components/SiteNav.tsx`)
- Itens: Início, Diagnóstico, Soluções, Casos, Nossos Krias, Seja um Kria, WhatsApp.
- Scroll suave para âncoras (`#funil`, `#solucoes`, `#casos`, `#krias`, `#seja-kria`).
- Renderizado no `__root.tsx` (transparente sobre hero, glass ao scrollar).

### 14. Padronização de botões
- Variants consistentes via classes utilitárias em `styles.css`:
  - `.btn-primary-neon` (CTAs principais — brilho neon)
  - `.btn-glass` (secundários — glass)
- Aplicar em hero, funil, casos, partners, clube.

### 15. Limpeza PDF
- `grep` final por `pdf|diagnostico-pdf|baixar` e remover qualquer referência remanescente.
- Confirmar que `routeTree.gen.ts` não referencia rota deletada (já corrigido).

### 16. Posicionamento
- Adicionar bloco curto (em `Positioning.tsx` ou na hero secundária): "Você pode aprender a fazer com IA ou encontrar quem faça por você. A Kria identifica o melhor caminho para o seu momento."

---

### Arquivos
**Criar:**
- `src/components/FloatingActions.tsx`
- `src/components/SiteNav.tsx`
- `src/components/Casos.tsx`

**Editar:**
- `src/components/Hero.tsx`
- `src/components/Funnel/Funnel.tsx`
- `src/components/Funnel/Success.tsx`
- `src/components/Funnel/packages.ts`
- `src/components/Partners.tsx`
- `src/components/Clube.tsx`
- `src/components/Positioning.tsx`
- `src/routes/index.tsx` (incluir `<Casos />`, ordem das seções)
- `src/routes/__root.tsx` (montar `SiteNav` + `FloatingActions`)
- `src/styles.css` (utilitários `.btn-primary-neon`, `.btn-glass`, glow cards)

### Testes manuais finais
Clique hero → scroll funil → multi-seleção → sugestões → envio Formspree → tela resultado → seleção pacotes → total atualiza → WhatsApp abre com mensagem → seções Casos, Krias, Seja um Kria funcionam → mobile responsivo → sem tela branca → sem rota PDF.
