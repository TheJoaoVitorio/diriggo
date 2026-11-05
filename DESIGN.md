---
version: 1.0.0
name: Diriggo Design System
description: "Gamified Brazilian Traffic & CNH Learning Platform inspired by Duolingo's tactile design system and Brazilian road signage aesthetics."
sourceReference: "duolingo-DESIGN.md"

colors:
  primary: "#FFC800"          # Amarelo Trânsito / Placa de Advertência
  primary-hover: "#EAB308"    # Amarelo queimado para interação
  primary-shadow: "#CA8A04"   # Sombra 3D de botão inferior
  on-primary: "#18181B"       # Preto asfalto de alto contraste (WCAG AAA)
  
  background: "#F8FAFC"       # Fundo limpo (cinza muito claro/asfalto claro)
  background-dark: "#0F172A"  # Pista noturna / Asfalto escuro
  surface: "#FFFFFF"          # Cartões e modais brancos
  surface-secondary: "#F1F5F9"
  
  text: "#1E293B"             # Texto principal neutro escuro
  text-muted: "#64748B"       # Texto secundário e dicas
  
  traffic-green: "#22C55E"    # Semáforo Verde / Resposta Correta / Sucesso
  traffic-green-shadow: "#16A34A"
  traffic-red: "#EF4444"      # Semáforo Vermelho / Erro / Placa Pare
  traffic-red-shadow: "#DC2626"
  traffic-blue: "#0284C7"     # Placas de Serviços Auxiliares / Dica
  traffic-asphalt: "#334155"  # Cinza textura asfalto

typography:
  display:
    fontFamily: "Inter, 'DIN Alternate', -apple-system, sans-serif"
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -0.5px
  heading:
    fontFamily: "Inter, 'DIN Alternate', -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.3

spacing:
  base: 8px
  scale: [8, 12, 16, 24, 32, 48, 64]

radius:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px

elevation:
  duo-button: "border-b-4 active:border-b-0 active:translate-y-1 transition-all"
  card: "border-2 border-slate-200 shadow-[0_4px_0_0_#cbd5e1]"

motion:
  easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  duration: 200ms

breakpoints: [360px, 480px, 640px, 768px, 1024px, 1280px]
---

# Diriggo Design System (Inspirado no Duolingo, Movido a Trânsito)

## 1. Racional de Adaptação (De Duolingo para Trânsito Brasileiro)

O arquivo de referência [`duolingo-DESIGN.md`](duolingo-DESIGN.md) documenta um sistema vibrante focado no verde-limão (`#a5ed6e`) com azul suave (`#ddf4ff`). No **Diriggo**, reinterpretamos cada componente à luz da sinalização e da vivência de trânsito brasileira:

1. **A Cor Amarela como Protagonista (`#FFC800`)**:
   No trânsito brasileiro, o amarelo representa **Atenção**, presente nas placas de advertência (A-1 a A-48), nas faixas divisórias de fluxo e na luz intermediária do semáforo. É uma cor quente, viva, estimulante e que se destaca imediatamente, perfeita para o aprendizado focado.
2. **Preto Asfalto de Alto Contraste (`#18181B`) sobre Amarelo**:
   Diferente do verde claro do Duolingo que exigia ajustes de contraste, o contraste entre Amarelo Trânsito (`#FFC800`) e Preto Asfalto (`#18181B`) atinge a proporção de **12:1**, superando com folga o padrão máximo **WCAG AAA (7:1)**.
3. **Semáforo Funcional para Feedbacks**:
   - **Verde Sinal Aberto (`#22C55E`)**: Usado exclusivamente para validação positiva, avanço de lição e resposta correta.
   - **Vermelho Pare / Sinal Fechado (`#EF4444`)**: Usado para erros, alertas de perda de vidas e infrações graves.
   - **Azul Indicativo (`#0284C7`)**: Usado para dicas de direção defensiva e referências ao Código de Trânsito Brasileiro.
4. **Botões Tácteis "Duolingo-3D"**:
   Todos os botões primários e cartões de alternativa utilizam a técnica de borda inferior espessa (`border-b-4`), dando a sensação tátil de um botão físico de fliperama ou pedal que abaixa ao ser pressionado (`active:translate-y-1 active:border-b-0`).

---

## 2. Componentes Fundamentais

### 2.1 Botões de Ação (CTAs)
- **Botão Primário de Ação (Amarelo Trânsito - Verificar, Continuar, Pronto)**:
  `bg-[#FFC800] hover:bg-[#FACC15] text-slate-950 font-extrabold border-b-4 border-[#CA8A04] rounded-2xl` (.duo-btn-yellow)
- **Botão de Alternativa em Lição**:
  Caixa branca com borda `border-2 border-slate-200 border-b-4 hover:border-slate-300 hover:bg-slate-50 cursor-pointer rounded-2xl p-4 flex items-center`. Quando selecionado, adquire contorno amarelo ou azul brilhante.

### 2.2 Trilha de Aprendizado (The Road)
A trilha imita uma rodovia sinuosa de asfalto estilizado:
- Marcadores de nó circulares (diâmetro 70px) com relevo 3D.
- Nós completos brilham em amarelo trânsito ou verde com checkmark ou troféu.
- O nó atual possui animação de pulso sutil convidando o clique.
- Linhas tracejadas de asfalto conectam os nós em zigue-zague.

### 2.3 Barra de Vidas e Status (HUD Superior)
- 🔥 **Ofensiva (Streak)**: Laranja fogo com contagem de dias seguidos.
- ❤️ **Corações (Vidas)**: Vermelho rubi pulsante, escala de 1 a 5.
- ⚡ **Pontos de Experiência (XP)**: Amarelo raio com totalizador animado.
- 🚦 **Modo Simulado**: Acesso direto à prova completa de 30 questões.

### 2.4 Gaveta de Resposta da Lição (Bottom Sheet)
Ao submeter uma alternativa:
- **Acerto**: Faixa inferior verde (`#DCFCE7`), texto `#15803D`, ícone de checkmark sonoro e mensagem motivacional ("Perfeito!", "Na faixa!").
- **Erro**: Faixa inferior vermelha (`#FEE2E2`), texto `#B91C1C`, ícone de alerta com a resposta correta destacada e a justificativa legal (Ex: "Art. 29 do CTB: Veículos na rotatória têm preferência").

---

## 3. Acessibilidade e Diretrizes de Usabilidade

1. **Alvos de Toque (Touch Targets)**:
   Todos os botões móveis possuem no mínimo 48×48px de área clicável.
2. **Independência de Cores**:
   Nenhum estado depende apenas de cor; todos os botões de certo/errado possuem ícones universais de trânsito (placa de pare, checkmark, semáforo) e texto explicativo.
3. **Áudio Não-Bloqueante**:
   Efeitos sonoros gerados por sintetizador Web Audio API com controle para ativar/mutar sons a qualquer momento.
