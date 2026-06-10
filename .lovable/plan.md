
# Plano atualizado — Kria AI (conversão, parceiros e clube)

Mantém 100% do visual atual. Mudanças em comportamento, microcopy, integrações e dois novos blocos seguindo o design system existente.

## 1. Fluidez do funil

`Funnel.tsx` hoje força `scrollIntoView` a cada etapa. Remover esse efeito entre etapas; manter scroll suave apenas quando o Hero leva ao funil e ao mostrar a tela de Sucesso.

## 2. Rodapé novo

Criar `src/components/Footer.tsx` e incluir em `index.tsx`:
- Instagram `@kria.ai` → `https://instagram.com/kria.ai`
- E-mail `papodekria@gmail.com` (mailto)
- WhatsApp `(91) 9509-1584`
- Copyright discreto
Ícones `lucide-react`, mesmas cores/tokens.

## 3. Captura garantida de leads

Formspree já existe (`xkoabjow`). Plano:
- Enriquecer payload final com objetivo, dores, serviços, valor, prazo, resumo estratégico.
- **Lead parcial**: ao concluir Etapa 1 (nome + WhatsApp + e-mail válidos), enviar 1 POST silencioso ao Formspree com `tipo: "parcial"` e `_subject: "Lead parcial — {nome}"`. Flag em `useRef` para não duplicar. Erros não bloqueiam UX.

## 4. Resumo em 1ª pessoa com emojis e visual escaneável

Reescrever `buildWhatsMessage` em `Success.tsx`. Mensagem natural, em 1ª pessoa, com emojis e blocos visualmente claros:

```
Olá, equipe Kria AI! 👋

Meu nome é {nome} e acabei de fazer o diagnóstico no site.

👤 *Sobre mim*
• Nicho: {nicho}
• WhatsApp: {whatsapp}
• E-mail: {email}

🎯 *Meu objetivo*
{objetivo}

⚠️ *Principais desafios*
• {dor 1}
• {dor 2}
...

💡 *Tenho interesse em*
• {serviço 1}
• {serviço 2}

⏱️ *Prazo ideal*: {prazo}
💰 *Investimento*: {orcamento}

📌 *Resumo*
{resumo estratégico em 2-3 linhas, em 1ª pessoa}

Gostaria de receber uma proposta personalizada. 🚀
```

- Texto gerado de forma determinística (templates por nicho/serviço, sem custo/LLM).
- Mesma string usada na **prévia visual** dentro da tela de Sucesso (bloco igual aos cards atuais) e no botão WhatsApp via `window.open('https://wa.me/559195091584?text=' + encodeURIComponent(msg), '_blank')`.

## 5. Microcopy de conversão na tela de Sucesso

Sem mexer no layout:
- "Com base nas suas respostas, identificamos as maiores oportunidades para acelerar seu crescimento."
- "Esta recomendação foi gerada especificamente para o seu cenário. Quanto antes começar, maiores as chances de acelerar resultados."

## 6. Portfólio / Agências parceiras (apenas logos)

Novo componente `src/components/Partners.tsx` entre Hero e Funil:
- Título curto: "Agências parceiras"
- Subtítulo discreto: "Quando faz mais sentido, conectamos você diretamente a quem resolve."
- Faixa horizontal com **só as logos** (sem texto/descrição por cliente):
  - Troika
  - Veropa Films
  - SB Marketing
- Logos via `src/assets/partners/*` (placeholders monocromáticos com a inicial até o usuário enviar os arquivos reais). Layout em grid responsivo, espaçamento generoso, hover com leve opacidade — coerente com o design atual.

> Observação: assim que você enviar os PNG/SVG das logos, substituo os placeholders sem mudar o layout.

## 7. Clube de prestadores (nova aba/seção)

Nova seção `src/components/Clube.tsx` (renderizada abaixo do funil) + rota dedicada `src/routes/clube.tsx` para link compartilhável.

Objetivo: captar filmmakers, fotógrafos, editores, agências etc. que pagam mensalidade (ex.: R$ 50/mês) para serem divulgados no site e receberem leads.

Conteúdo da seção:
- Título: "Clube Kria — para prestadores e agências"
- 3 bullets de benefício:
  - "Divulgação no site da Kria AI"
  - "Leads qualificados encaminhados direto para você"
  - "Conexão com agências e clientes da nossa rede"
- Preço destacado: "A partir de R$ 50/mês"
- Mini-formulário de cadastro (nome, área de atuação, cidade, WhatsApp, e-mail, link de portfólio) → envia para Formspree com `_subject: "Clube Kria — novo interessado"`.
- Botão alternativo "Falar no WhatsApp" abrindo mensagem pré-pronta: *"Olá! Tenho interesse em participar do Clube Kria como prestador/agência."*

Link "Clube" também adicionado discretamente no Header/Hero e no Footer.

## 8. Auditoria final

- Fluxo completo das 5 etapas (mobile 375px + desktop)
- Botão Continuar libera/bloqueia corretamente
- `window.open` do WhatsApp dispara a partir de clique (sem popup blocker)
- Console sem erros, Formspree retornando 200
- Links do rodapé, Instagram, e-mail, WhatsApp e Clube validados

## Arquivos afetados

```text
src/components/Funnel/Funnel.tsx     # remove scroll entre etapas + lead parcial + payload enriquecido
src/components/Funnel/Success.tsx    # nova buildWhatsMessage com emojis + prévia visual + microcopy
src/components/Footer.tsx            # NOVO — Instagram, e-mail, WhatsApp, link Clube
src/components/Partners.tsx          # NOVO — faixa de logos (Troika, Veropa Films, SB Marketing)
src/components/Clube.tsx             # NOVO — seção do Clube + form Formspree
src/routes/clube.tsx                 # NOVO — rota dedicada /clube
src/routes/index.tsx                 # inclui <Partners />, <Clube /> e <Footer />
src/assets/partners/*                # placeholders das logos (substituíveis depois)
```

Nada de mudanças em cores, fontes, espaçamentos globais ou componentes shadcn.
