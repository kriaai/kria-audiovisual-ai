# Kria AI Audiovisual — Site com Funil de Captação

Landing page de página única com hero impactante e funil de 5 etapas que envia leads para Formspree e abre o WhatsApp com resumo.

## Identidade visual

- Tokens semânticos no `src/styles.css` (HSL/oklch):
  - `--primary`: roxo `#4c0082`
  - `--accent`: laranja `#fc631b`
  - `--background`: `#f5f5f5`
- Fonte Inter carregada via `<link>` no `__root.tsx` (Google Fonts) e registrada em `@theme` como `--font-sans`.
- Gradientes roxos, sombras suaves e utilitários customizados (`@utility`) para o gradiente hero e animações de blobs.

## Estrutura de rotas e arquivos

- `src/routes/index.tsx` — página única (Hero + Funil + Sucesso).
- `src/routes/__root.tsx` — meta title/description em PT-BR, link Google Fonts (Inter), favicon.
- `src/components/Hero.tsx` — hero com gradiente, logo texto, pills, placeholder de imagem, botão CTA com scroll suave, círculos animados.
- `src/components/Funnel/Funnel.tsx` — orquestrador das 5 etapas, estado central, barra de progresso, navegação (Voltar/Continuar), scroll-to-top a cada etapa, validação.
- `src/components/Funnel/Step1Personal.tsx` — nome, WhatsApp (DDD), e-mail (validação zod).
- `src/components/Funnel/Step2Niche.tsx` — grid de cards (ícone + label), seleção única.
- `src/components/Funnel/Step3Service.tsx` — grid de cards (ícone + título + descrição), seleção única.
- `src/components/Funnel/Step4Dynamic.tsx` — renderiza bloco de perguntas conforme serviço escolhido (mapa de configs).
- `src/components/Funnel/Step5Budget.tsx` — slider R$50–R$10.000 com valor ao vivo + textarea extras + botão "Enviar e falar com a Kria".
- `src/components/Funnel/Success.tsx` — check animado, tags coloridas, botão verde WhatsApp.
- `src/components/Funnel/serviceQuestions.ts` — config declarativa das perguntas dinâmicas por serviço.
- `src/components/ui/*` — usa `Button`, `Input`, `Textarea`, `Checkbox`, `Slider`, `Progress`, `Card` do shadcn já presentes.

## Comportamento do funil

- Estado central tipado com todos os campos. Botão "Continuar" desabilitado até a seleção/validação obrigatória da etapa.
- "Voltar" disponível das etapas 2–5.
- A cada mudança de etapa: `window.scrollTo({ top: formTop, behavior: 'smooth' })`.
- Etapa 1 validada com zod (nome ≥2, WhatsApp regex DDD, e-mail).
- Etapa 4 monta dinamicamente checkboxes + campos auxiliares (cidade / qtd / nível / referência) + textarea conforme o serviço.

## Envio

- No clique de envio na Etapa 5:
  - `POST https://formspree.io/f/xkoabjow` com headers `Content-Type: application/json` e `Accept: application/json`.
  - Body: `{ _subject, _replyto: email, nome, whatsapp, email, nicho, servico, especificacoes, orcamento, extras }` (especificacoes serializa checkboxes + campos auxiliares + descrição).
  - Em caso de sucesso, transita para a tela de Sucesso. Em erro, toast e mantém na etapa.
- Botão WhatsApp na tela de sucesso:
  - `https://wa.me/5591985091584?text=` com mensagem `encodeURIComponent` contendo nome, nicho, serviço, especificações e orçamento formatado.

## SEO

- Title: "Kria AI Audiovisual — Soluções audiovisuais e de IA"
- Meta description em PT-BR (<160 chars), OG/Twitter tags, H1 único no hero, idioma `lang="pt-BR"` no shell.

## Fora de escopo

- Sem backend/banco de dados (Formspree cuida do recebimento).
- Sem autenticação.
- Imagem da pessoa no hero fica como placeholder (div estilizada). Posso gerar uma imagem depois se quiser.
