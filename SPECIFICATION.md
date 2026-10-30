# Especificação Técnica e de Produto: Diriggo

> **Plataforma Gamificada de Aprendizado para a Prova Teórica da CNH (DETRAN - Brasil)**  
> **Padrão de Qualidade:** Elephant Goldfish Model (EGM)  
> **Versão:** 1.0.0  
> **Status:** Aprovado para Implementação

---

## 1. Visão Geral e Proposta de Valor

### 1.1 O Problema
No Brasil, anualmente mais de 3 milhões de candidatos realizam a prova teórica do DETRAN para obter a Primeira Habilitação (Categorias A e B). A taxa de reprovação chega a 40% em diversos estados (como SP, RJ, MG e PR). Os principais motivos são:
- Apostilas densas, maçantes e com linguagem jurídica complexa (Código de Trânsito Brasileiro - CTB).
- Simulados tradicionais dos DETRANs que oferecem apenas listas estáticas de perguntas com interfaces datadas dos anos 2000, sem explicação didática do *porquê* da resposta.
- Falta de retenção espaçada e engajamento diário.

### 1.2 A Solução: Diriggo
O **Diriggo** é uma plataforma web responsiva de aprendizado gamificado, aplicando a pedagogia e a psicologia de engajamento do Duolingo ao contexto do trânsito brasileiro:
- **Trilha de Aprendizado em Zigue-Zague (Roadmap/Caminho):** O aluno avança por uma rodovia visual dividida em Unidades Temáticas.
- **Micro-lições Interativas (3 a 5 minutos):** Sessões rápidas de 5 a 10 perguntas com feedback imediato e explicação legislativa simplificada.
- **Sistema de Gamificação:**
  - **Vidas (Corações):** 5 vidas que diminuem em caso de erro, incentivando a atenção.
  - **Ofensiva (Streak/Chama):** Contador de dias seguidos de estudo para criar o hábito diário.
  - **Pontos de Experiência (XP):** Recompensa imediata por cada lição concluída.
  - **Modo Simulado Oficial:** Prova cronometrada de 30 questões no modelo CONTRAN/DETRAN (nota de corte: 70% / 21 acertos).
- **Identidade Visual Temática de Trânsito:** Primária em Amarelo Atenção (`#FFCC00`), com elementos de sinalização, faixas de pedestre, asfalto e semáforos.

---

## 2. Matriz Curricular (Resoluções CONTRAN nº 789/2020 e 168/2004)

A matriz de questões e lições do Diriggo é dividida nas 5 disciplinas obrigatórias do curso teórico técnico:

| Módulo | Nome da Matéria | Carga Horária Exigida | Peso Típico na Prova (30Q) | Foco Pedagógico |
| :--- | :--- | :--- | :--- | :--- |
| **MOD-01** | **Legislação de Trânsito & CTB** | 18 horas | 12 questões (40%) | Normas de circulação, preferência, infrações (leve a gravíssima), pontuação, CNH Provisória (PPD). |
| **MOD-02** | **Direção Defensiva** | 16 horas | 10 questões (33%) | Prevenção de acidentes, condições adversas (luz, tempo, via, trânsito, veículo, condutor), distância de segurança. |
| **MOD-03** | **Primeiros Socorros** | 4 horas | 3 questões (10%) | Sinalização do local, acionamento SAMU (192)/Bombeiros (193), o que NÃO fazer (não mover vítima, não tirar capacete). |
| **MOD-04** | **Cidadania e Meio Ambiente** | 4 horas | 3 questões (10%) | Poluição sonora e do ar (PROCONVE), respeito a pedestres, ciclistas e vulneráveis, convívio harmônico. |
| **MOD-05** | **Mecânica Básica** | 3 horas | 2 questões (7%) | Instrumentos do painel, nível de óleo, sistema de arrefecimento, calibragem de pneus, freios e segurança veicular. |
| **MOD-06** | **Sinalização de Trânsito (Especial)** | Transversal | Presente em todos | Placas de Regulamentação (vermelhas), Advertência (amarelas), Indicação (azuis/verdes) e Marcas Viárias. |

---

## 3. Arquitetura de Informação e Fluxo do Usuário

```
[Visitante]
    │
    ▼
[Landing Page Diriggo]
    ├── Hero: "Passe na Prova do DETRAN de Primeira"
    ├── Demonstração Interativa (Widget com pergunta real do DETRAN)
    ├── Benefícios: Gamificação, Simulado Real, Explicações do CTB
    └── CTA Principal: "Começar a Estudar Grátis"
          │
          ├──> [Modal Login / Cadastro ou Modo Convidado Instantâneo]
          │
          ▼
[Aplicação Principal - Dashboard do Aluno]
    ├── Navbar de Status:
    │     ├── Fogo / Ofensiva (Streak)
    │     ├── Raio / XP Total
    │     ├── Corações / Vidas (1 a 5)
    │     └── Botão "Fazer Simulado 30Q"
    │
    ├── Trilha de Aprendizado (Learning Path Road):
    │     ├── Unidade 1: Regras de Ouro do Trânsito (Placas & Preferência)
    │     ├── Unidade 2: Direção Defensiva & Riscos
    │     ├── Unidade 3: Primeiros Socorros na Prática
    │     ├── Unidade 4: Infrações, Multas & CTB
    │     ├── Unidade 5: Mecânica Sem Mistério & Meio Ambiente
    │     └── Checkpoints de Troféu / Revisão de Módulo
    │
    ├── Modal de Lição Interativa:
    │     ├── Barra de Progresso Superior
    │     ├── Enunciado claro com imagem/placa SVG quando aplicável
    │     ├── 4 Alternativas tácteis estilo Duolingo (3D click)
    │     ├── Gaveta de Feedback Inferior (Verde = Correto / Vermelho = Erro + Artigo do CTB)
    │     └── Tela de Vitória (XP ganho, Precisão %, Áudio de conquista)
    │
    └── Modal de Simulado Oficial DETRAN:
          ├── Cronômetro Regressivo (40:00)
          ├── 30 Questões balanceadas conforme CONTRAN
          ├── Grade de Navegação rápida entre questões (1 a 30)
          └── Relatório de Desempenho (Aprovado/Reprovado com >= 21 acertos e gabarito comentado)
```

---

## 4. Requisitos Funcionais (RF) e Não-Funcionais (RNF)

### 4.1 Requisitos Funcionais
- **RF-01 (Mecanismo de Lição):** Permitir responder perguntas de múltipla escolha com checagem imediata, revelando a resposta correta e explicação embasada no Código de Trânsito Brasileiro.
- **RF-02 (Feedback Sonoro Nativo):** Emitir efeitos sonoros ricos (Acerto, Erro, Conclusão de Lição, Clique de Botão) gerados dinamicamente via Web Audio API (sem dependências de rede para arquivos `.mp3`).
- **RF-03 (Controle de Vidas):** Cada erro deduz 1 coração. Ao chegar a 0, o aluno recebe feedback para praticar lições de revisão ou recarregar as vidas.
- **RF-04 (Persistência Local):** Salvar progresso do aluno (XP, vidas, lições completadas, streak, último acesso) no `localStorage`, garantindo funcionamento offline ou sem login prévio.
- **RF-05 (Simulado Oficial):** Gerar simulado de 30 questões sorteadas respeitando a proporção oficial (Legislação: 12, Direção Defensiva: 10, Socorros: 3, Meio Ambiente: 3, Mecânica: 2).
- **RF-06 (Renderizador Vetorial de Placas):** Exibir placas de trânsito em SVG fiel ao padrão CONTRAN (Placas R-1, R-2, R-19, A-1a, A-15, etc.) para garantir nitidez em qualquer resolução de tela (Retina, mobile e desktop).

### 4.2 Requisitos Não-Funcionais
- **RNF-01 (Responsividade Total):** Suporte mobile-first de 360px até 2560px (smartphones, tablets e desktops).
- **RNF-02 (Acessibilidade WCAG AA):** Contraste mínimo de 4.5:1 em todos os textos sobre fundos amarelos, botões com altura mínima de 44px para toque móvel.
- **RNF-03 (Performance):** Tempo de carregamento inferior a 1 segundo; zero requisições bloqueantes.
- **RNF-04 (Compatibilidade de Navegadores):** Execução sem falhas em Chrome, Safari (iOS/macOS), Edge e Firefox.

---

## 5. Estratégia de Dados e Fontes

1. **Repositório Base:** Extração do padrão de dados de `lucianodiisouza/teorical-questions-detran` e `andregamma/banco-nacional-de-questoes-cnh`.
2. **Validação Jurídica:** Todas as explicações e gabaritos revisados com base no texto atualizado do Código de Trânsito Brasileiro (Lei nº 9.503/1997 e alterações pela Lei nº 14.071/2020 e 14.599/2023).
3. **Placas Oficiais:** Manual Brasileiro de Sinalização de Trânsito (Volumes I e II do CONTRAN).
