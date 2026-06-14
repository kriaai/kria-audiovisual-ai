# Plano de refino — Kria AI

Mantém a estrutura, paleta e fluxo atuais. Apenas refina CSS, troca a marca textual pela logo oficial, corrige o WhatsApp e adiciona seções de posicionamento.

## 1. Logo oficial (com fundo transparente)

- Subir a logo enviada via `lovable-assets`, gerar versão PNG transparente com `edit_image` (`transparent_background: true`) e salvar pointer em `src/assets/kria-logo.png.asset.json`.
- Criar componente `src/components/BrandLogo.tsx` (img responsiva, alt "Kria AI", tamanhos `sm/md/lg`).
- Substituir o bloco "Sparkles + Kria AI / AUDIOVISUAL" em:
  - `src/components/Hero.tsx` (topo)
  - `src/components/Footer.tsx` (coluna de marca)
  - `src/routes/clube.tsx` (header)
- Manter a paleta atual (roxo `--primary`, laranja `--accent`, fundo claro). Nenhuma cor nova.

## 2. Correção do WhatsApp

- Substituir todas as ocorrências do número antigo `559195091584` / `(91) 9509-1584` pelo oficial **+55 91 8509-1584** (`5591850091584`… confirmar formatação `5591985091584` se o usuário responder que tem o 9 — por ora uso exatamente o número informado: `559185091584`).
- Arquivos atingidos (varrer com `rg`): `Hero.tsx`, `Footer.tsx`, `Funnel/Success.tsx`, `Clube.tsx`, qualquer outro CTA.
- Centralizar o número em `src/lib/contact.ts` (`WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, helper `waLink(text)`) para evitar divergência futura.

## 3. Reposicionamento + novos blocos na home

Inserir entre `<Hero />` e `<Funnel />` no `src/routes/index.tsx`, sem mexer no funil:

- **`src/components/Positioning.tsx`** — frase curta: "Plataforma de diagnóstico empresarial, estratégia, IA e conexão com especialistas." + 4 cards de serviços (Consultoria de IA, Planejamento Estratégico, Workshop K.R.I.A, Diagnóstico Kria AI), usando os tokens `bg-card`, `text-primary`, destaque `accent`.
- **`src/components/DiagnosticoHighlight.tsx`** — bloco de destaque para o Diagnóstico Kria AI por **R$ 59**, com bullets (análise, marketing, oportunidades, tendências, conteúdo, cronograma, ferramentas, próximos passos) e CTA principal "Receber Diagnóstico Kria AI" → WhatsApp com mensagem pré-preenchida.
- **`src/components/ConsultoriaGabbe.tsx`** — card "Consultoria com Gabbe Mary — Fundadora da Kria AI" com botão WhatsApp.
- **`src/components/Partners.tsx`** (nova seção dedicada): cards com logo (placeholder com iniciais por enquanto), nome, descrição curta e botão WhatsApp. Estrutura pronta para Veropa Filmes, Mais Brasil e novos parceiros via array de dados. Remover a strip de parceiros do `Footer.tsx`.

## 4. Refinamentos de CSS (sem mudar identidade)

Ajustes pontuais em `src/styles.css` e componentes:

- Aumentar espaçamento vertical entre seções (`py-20 md:py-28`).
- Hierarquia: H2 padronizado (`text-3xl md:text-5xl font-black tracking-tight`), subtítulo `text-muted-foreground`.
- Cards: `rounded-2xl`, `ring-1 ring-border`, `shadow-sm hover:shadow-lg transition`.
- Botões CTA primários: gradiente sutil roxo→roxo escuro + sombra `shadow-primary/20`; CTA destaque continua laranja.
- Inputs do funil: `rounded-xl`, foco com `ring-2 ring-accent/40`.
- Mobile: aumentar `min-h-12` nos botões e revisar paddings em Hero/Funnel.

## 5. Detalhes técnicos

```text
src/
  assets/kria-logo.png.asset.json        (novo)
  components/
    BrandLogo.tsx                        (novo)
    Positioning.tsx                      (novo)
    DiagnosticoHighlight.tsx             (novo)
    ConsultoriaGabbe.tsx                 (novo)
    Partners.tsx                         (novo — dedicado)
    Hero.tsx                             (logo + número)
    Footer.tsx                           (logo + número + remove strip parceiros)
    Funnel/Success.tsx                   (número via contact.ts)
    Clube.tsx                            (logo + número)
  lib/contact.ts                         (novo — fonte única do WhatsApp)
  routes/index.tsx                       (composição das novas seções)
  styles.css                             (refinos de tokens utilitários)
```

Pontos abertos a confirmar antes de implementar:

1. **Número correto**: você escreveu `+55 91 8509-1584` (começa com 8). O site hoje usa `9509-1584`. Confirma que o oficial é mesmo **8509-1584**, ou é **9 8509-1584** / **9 9509-1584**?
2. **Logo no Hero**: substituo o bloco "Sparkles + Kria AI" pela logo oficial (ícone+wordmark juntos), ok? Em fundo escuro do Hero, uso a versão com wordmark em branco (filtro CSS) para legibilidade, mantendo o "K" laranja.
3. **Funil**: mantenho 100% intacto (lógica, passos, mensagem WhatsApp final), só troco o número. Confirma?
