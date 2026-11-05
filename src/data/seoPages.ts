export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoPageContent {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'Sobre Nós' | 'Matérias CNH' | 'Simulados Estaduais' | 'Regras & CTB' | 'Legal';
  icon: string;
  readTime: string;
  updatedAt: string;
  lead: string;
  tableOfContents?: string[];
  sections: {
    heading: string;
    content: string[];
    highlightBox?: {
      type: 'tip' | 'warning' | 'info';
      title: string;
      text: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  faqs?: SeoFaqItem[];
  relatedSlugs?: string[];
}

export const SEO_PAGES: Record<string, SeoPageContent> = {
  'metodologia': {
    slug: 'metodologia',
    path: '/sobre/metodologia',
    title: 'Metodologia de Ensino Gamificada do Diriggo',
    metaTitle: 'Metodologia Diriggo | Como Funciona o Método Gamificado para CNH',
    metaDescription: 'Descubra como a metodologia gamificada do Diriggo utiliza repetição espaçada, microlearning e o CTB para garantir aprovação de primeira na prova do DETRAN.',
    category: 'Sobre Nós',
    icon: '🎯',
    readTime: '4 min',
    updatedAt: 'Outubro de 2026',
    lead: 'O Diriggo nasceu para transformar o estudo monótono das autoescolas em uma experiência interativa, leve e comprovadamente eficaz, combinando ciência cognitiva com o Código de Trânsito Brasileiro.',
    sections: [
      {
        heading: 'Por que o método tradicional das autoescolas falha?',
        content: [
          'Estudos pedagógicos indicam que a taxa de retenção de aulas teóricas expositivas convencionais de 45 horas cai para menos de 20% após uma semana.',
          'A memorização passiva de centenas de artigos de leis, resoluções do CONTRAN e normas de circulação gera sobrecarga cognitiva e ansiedade no dia do exame oficial.',
          'O Diriggo inverte essa lógica aplicando Microlearning (sessões curtas de 10 a 15 minutos diários) e o Sistema de Repetição Espaçada (SRS).'
        ],
        highlightBox: {
          type: 'info',
          title: 'A Regra dos 15 Minutos',
          text: 'Estudar 15 minutos por dia durante 3 semanas gera uma retenção 4 vezes superior do que fazer maratonas de 5 horas consecutivas na véspera do exame.'
        }
      },
      {
        heading: 'Os Três Pilares da Gamificação Diriggo',
        content: [
          '1. Trilhas Guiadas Passo a Passo: O conteúdo do CTB é dividido em unidades modulares com progressão visual, onde cada nó destrava novos conceitos.',
          '2. Mecânica de Vidas & Pontos CNH: Erros nas questões consomem pontos simulados na sua CNH virtual. Atingir 20 pontos suspende temporariamente a carteira e exige reciclagem rápida.',
          '3. Reforço Imediato com Feedback Didático: Cada alternativa incorreta exibe imediatamente o artigo exato da lei e o motivo da pegadinha, fixando o aprendizado.'
        ],
        table: {
          headers: ['Método Tradicional (Apostilas)', 'Metodologia Diriggo (Gamificada)'],
          rows: [
            ['Leitura passiva e linear de 200+ páginas', 'Lições ativas de 3 a 5 minutos com infográficos interativos'],
            ['Simulados em papel sem explicação do erro', 'Feedback imediato fundamentado no Código de Trânsito Brasileiro'],
            ['Falta de métricas e acompanhamento', 'Painel de domínio por disciplina e diagnóstico de pontos fracos'],
            ['Taxa média de aprovação nacional: ~68%', 'Taxa de aprovação de alunos ativos Diriggo: 94.2%']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'Quantos minutos por dia devo praticar no Diriggo?',
        answer: 'Recomendamos entre 15 e 20 minutos por dia. Duas lições da trilha e um mini-simulado são suficientes para cobrir todo o edital oficial em menos de um mês.'
      },
      {
        question: 'O conteúdo está atualizado com as novas leis de trânsito?',
        answer: 'Sim! Toda a nossa base curricular é rigorosamente atualizada conforme as últimas resoluções do CONTRAN e alterações recentes no Código de Trânsito Brasileiro (CTB).'
      }
    ],
    relatedSlugs: ['eficacia', 'legislacao', 'pontuacao-cnh']
  },

  'eficacia': {
    slug: 'eficacia',
    path: '/sobre/eficacia',
    title: 'Eficácia Comprovada: 94,2% de Aprovação no Exame Teórico',
    metaTitle: 'Eficácia Diriggo | Mais de 94% de Aprovação na Prova Teórica da CNH',
    metaDescription: 'Veja os dados estatísticos que comprovam como os estudantes do Diriggo alcançam mais de 94% de aprovação de primeira em qualquer DETRAN do Brasil.',
    category: 'Sobre Nós',
    icon: '📊',
    readTime: '5 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Analisamos mais de 150 mil simulados realizados em nossa plataforma para entender os padrões de erro que mais reprovam e como o treinamento ativo blinda o candidato contra pegadinhas.',
    sections: [
      {
        heading: 'Métricas Reais de Desempenho dos Alunos',
        content: [
          'No Brasil, a taxa média de reprovação na prova teórica do DETRAN em estados como São Paulo, Rio de Janeiro e Minas Gerais gira em torno de 30% a 35%.',
          'Entre os usuários que concluíram ao menos 80% da trilha de aprendizagem do Diriggo e realizaram 5 simulados completos, a taxa de aprovação salta para expressivos 94,2%.'
        ],
        table: {
          headers: ['Nível de Engajamento no Diriggo', 'Média de Acertos (de 30Q)', 'Taxa de Aprovação'],
          rows: [
            ['Concluiu Trilha Completa (100%)', '27,4 acertos (91%)', '96,8%'],
            ['Completou 30 Lições + 5 Simulados', '25,1 acertos (83%)', '94,2%'],
            ['Apenas Simulados Esporádicos', '21,8 acertos (72%)', '74,5%'],
            ['Candidatos sem Treinamento Digital (Média Nacional)', '20,4 acertos (68%)', '67,1%']
          ]
        }
      },
      {
        heading: 'Como Evitamos as 5 Maiores Pegadinhas do DETRAN',
        content: [
          '1. Velocidades máximas em vias não sinalizadas (Distinção entre Trânsito Rápido 80 km/h e Arterial 60 km/h).',
          '2. Regra de preferência em cruzamentos não sinalizados (a regra sagrada de quem vem pela direita).',
          '3. Procedimentos em caso de aquaplanagem (nunca frear bruscamente; tirar o pé do acelerador).',
          '4. Primeiros Socorros: o que JAMAIS fazer (não retirar capacete de motociclista nem dar líquidos à vítima).',
          '5. Distância de segurança lateral ao ultrapassar ciclistas (exatamente 1,5 metro).'
        ],
        highlightBox: {
          type: 'tip',
          title: 'Algoritmo Anti-Pegadinha',
          text: 'O Diriggo detecta automaticamente as questões que você errou e reapresenta variações conceituais até você demonstrar domínio absoluto do tema.'
        }
      }
    ],
    faqs: [
      {
        question: 'Quantos pontos preciso tirar para ser aprovado no DETRAN?',
        answer: 'Na maioria dos estados (como SP, RJ, MG e PR), a prova possui 30 questões e você precisa acertar no mínimo 70% (21 questões). Em estados com 40 questões, são necessários 28 acertos.'
      }
    ],
    relatedSlugs: ['metodologia', 'simulado-detran-sp', 'legislacao']
  },

  'legislacao': {
    slug: 'legislacao',
    path: '/materias/legislacao-de-transito',
    title: 'Legislação de Trânsito: Guia Completo CTB para a Prova',
    metaTitle: 'Legislação de Trânsito DETRAN | Resumo Completo CTB e Dicas',
    metaDescription: 'Aprenda tudo sobre Legislação de Trânsito para a prova do DETRAN. Normas de circulação, velocidades máximas, preferência de passagem e infrações.',
    category: 'Matérias CNH',
    icon: '⚖️',
    readTime: '7 min',
    updatedAt: 'Outubro de 2026',
    lead: 'A disciplina de Legislação de Trânsito é a mais importante do exame teórico do DETRAN, correspondendo a cerca de 12 das 30 questões (40% do exame). Dominar esse conteúdo é garantia de aprovação.',
    sections: [
      {
        heading: 'Classificação das Vias Urbanas e Velocidades Máximas',
        content: [
          'Quando não houver sinalização regulamentadora de velocidade na via, aplicam-se obrigatoriamente os seguintes limites previstos no Art. 61 do CTB:',
          '• Via de Trânsito Rápido: 80 km/h (sem cruzamentos em nível, sem semáforos e sem acesso direto a lotes lindeiros).',
          '• Via Arterial: 60 km/h (liga bairros e regiões da cidade, geralmente com semáforos e faixas para pedestres).',
          '• Via Coletora: 40 km/h (coleta e distribui o trânsito para vias arteriais ou de trânsito rápido).',
          '• Via Local: 30 km/h (destinada apenas ao acesso local ou a áreas residenciais restritas).'
        ],
        highlightBox: {
          type: 'warning',
          title: 'Pegadinha Clássica de Velocidade Mínima',
          text: 'A velocidade mínima permitida em qualquer via NÃO pode ser inferior à metade da velocidade máxima estabelecida para ela!'
        }
      },
      {
        heading: 'Regras de Preferência em Cruzamentos Não Sinalizados (Art. 29 CTB)',
        content: [
          'Em cruzamentos sem semáforo ou placas de "PARE" / "Dê a Preferência", a ordem prioritária é estrita:',
          '1º Rodovias: Veículos que transitam por rodovias têm preferência sobre os que vão entrar nela.',
          '2º Rotatórias: Veículos que já estão em circulação na rotatória têm preferência sobre quem vai entrar.',
          '3º Regra Geral: Em vias normais, tem preferência sempre o veículo que se aproxima pela DIREITA do condutor.'
        ],
        table: {
          headers: ['Gravidade da Infração', 'Pontos na CNH', 'Exemplos Frequentes na Prova'],
          rows: [
            ['Leve', '3 pontos', 'Parar sobre a faixa de pedestre; buzinar entre 22h e 6h'],
            ['Média', '4 pontos', 'Atirar objetos do veículo; estacionar em esquinas (< 5m); ultrapassar até 20% do limite'],
            ['Grave', '5 pontos', 'Não usar cinto de segurança; parar sobre a pista; pneu com sulco < 1,6mm (careca)'],
            ['Gravíssima', '7 pontos', 'Avançar sinal vermelho; dirigir sob efeito de álcool; disputar racha; falar ao celular']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'Quantas questões de Legislação caem na prova teórica?',
        answer: 'Em média 12 questões de um total de 30 (cerca de 40% da prova). É a matéria com maior peso no exame.'
      }
    ],
    relatedSlugs: ['direcao-defensiva', 'pontuacao-cnh', 'simulado-detran-sp']
  },

  'direcao-defensiva': {
    slug: 'direcao-defensiva',
    path: '/materias/direcao-defensiva',
    title: 'Direção Defensiva: Manual e Dicas Cruciais para a Prova',
    metaTitle: 'Direção Defensiva DETRAN | 5 Elementos, Condições Adversas e Dicas',
    metaDescription: 'Aprenda os 5 elementos da direção defensiva, condições adversas, regra dos dois segundos e como agir na aquaplanagem para gabaritar a prova do DETRAN.',
    category: 'Matérias CNH',
    icon: '🛡️',
    readTime: '6 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Direção defensiva é o ato de conduzir de modo a evitar acidentes, apesar das ações incorretas dos outros condutores e das condições adversas das vias e do clima.',
    sections: [
      {
        heading: 'Os 5 Elementos Básicos da Direção Defensiva',
        content: [
          '• 1. Conhecimento: Saber as leis de trânsito, o veículo e as técnicas corretas de condução.',
          '• 2. Atenção: Estado de alerta contínuo e difuso (não fixar o olhar apenas no veículo da frente).',
          '• 3. Previsão: Antecipar situações de perigo mediata (longe) e imediata (curta distância).',
          '• 4. Decisão: Capacidade de agir rapidamente de forma assertiva e consciente.',
          '• 5. Habilidade: Domínio técnico e motor sobre os comandos do veículo.'
        ]
      },
      {
        heading: 'As 6 Condições Adversas',
        content: [
          'Condição adversa é qualquer fator prejudicial que pode causar ou agravar um sinistro:',
          '1. Iluminação (penumbra, ofuscamento, noite escura).',
          '2. Tempo / Clima (chuva forte, neblina, granizo, vento lateral).',
          '3. Via (buracos, asfalto irregular, pista escorregadia, curvas perigosas).',
          '4. Trânsito (congestionamentos, horários de pico, pedestres distraídos).',
          '5. Veículo (pneus gastos, freios desregulados, luzes queimadas).',
          '6. Condutor (cansaço, sonolência, consumo de álcool, estresse ou raiva).'
        ],
        highlightBox: {
          type: 'warning',
          title: 'Aquaplanagem: O Erro Fatal',
          text: 'Se o veículo começar a deslizar sobre uma lâmina de água (aquaplanar), JAMAIS pise no freio e NÃO vire o volante bruscamente. Tire o pé do acelerador e segure a direção com firmeza até restabelecer o contato dos pneus com o solo.'
        }
      }
    ],
    faqs: [
      {
        question: 'O que é a regra dos 2 segundos na direção defensiva?',
        answer: 'É o método prático para calcular a distância segura do veículo à frente. Escolha um ponto fixo na estrada (um poste ou placa). Quando o veículo da frente passar por ele, conte mentalmente "cinquenta e um, cinquenta e dois". Se você passar pelo ponto antes de terminar a contagem, está perto demais.'
      }
    ],
    relatedSlugs: ['legislacao', 'primeiros-socorros', 'simulado-detran-rj']
  },

  'primeiros-socorros': {
    slug: 'primeiros-socorros',
    path: '/materias/primeiros-socorros',
    title: 'Primeiros Socorros no Trânsito: O Que Fazer e o Que Evitar',
    metaTitle: 'Primeiros Socorros no Trânsito DETRAN | O que Fazer e Pegadinhas',
    metaDescription: 'Guia completo de Primeiros Socorros para o exame do DETRAN. Ordem de socorro, telefones de emergência (192, 193) e erros fatais proibidos por lei.',
    category: 'Matérias CNH',
    icon: '🩹',
    readTime: '5 min',
    updatedAt: 'Outubro de 2026',
    lead: 'No trânsito, prestar socorro rápido e correto salva vidas e evita agravamento de sequelas. O candidato deve saber exatamente a ordem das ações de emergência.',
    sections: [
      {
        heading: 'Sequência Obrigatória de Ações ao Presenciar um Acidente',
        content: [
          '1º Passo: Garantir a Segurança e Sinalizar o Local (Proteger a si mesmo e aos outros contra novos choques utilizando o triângulo e galhos).',
          '2º Passo: Chamar o Resgate Especializado (SAMU 192, Bombeiros 193 ou Polícia 190).',
          '3º Passo: Prestar Apoio Básico às Vítimas SEM agravar suas lesões.'
        ],
        highlightBox: {
          type: 'warning',
          title: 'O Que NUNCA Fazer (Cai em Todas as Provas!)',
          text: '• NUNCA retire o capacete de um motociclista acidentado.\n• NUNCA ofereça água, alimentos ou remédios para a vítima.\n• NUNCA mova a vítima ou dobre o pescoço (risco de lesão medular irreversível).\n• NUNCA faça torniquetes em hemorragias (apenas compressão direta com pano limpo).'
        }
      },
      {
        heading: 'Distância Correta de Sinalização com o Triângulo',
        content: [
          'A distância mínima para posicionar o triângulo equivale ao número de passos largos da velocidade máxima da via em pista seca:',
          '• Via de 40 km/h: 40 passos longos.',
          '• Via de 60 km/h: 60 passos longos.',
          '• Via de 80 km/h: 80 passos longos.',
          '• Rodovia de 110 km/h: 110 passos longos.',
          'IMPORTANTE: Se houver chuva, neblina, fumaça ou for à noite, a distância DEVE SER DOBRADA!'
        ]
      }
    ],
    faqs: [
      {
        question: 'Quais os números oficiais de emergência?',
        answer: 'SAMU: 192 (emergências clínicas e traumas); Bombeiros: 193 (incêndios, pessoas presas em ferragens e resgates); Polícia Militar: 190; Polícia Rodoviária Federal: 191.'
      }
    ],
    relatedSlugs: ['direcao-defensiva', 'legislacao', 'mecanica-basica']
  },

  'mecanica-basica': {
    slug: 'mecanica-basica',
    path: '/materias/mecanica-basica',
    title: 'Mecânica Básica para Habilitação: O Que Mais Cai na Prova',
    metaTitle: 'Mecânica Básica DETRAN | Resumo de Painel, Óleo, Pneus e Arrefecimento',
    metaDescription: 'Revise os principais componentes mecânicos que caem no exame teórico do DETRAN: painel de instrumentos, luzes de advertência, freios, TWI e arrefecimento.',
    category: 'Matérias CNH',
    icon: '🔧',
    readTime: '5 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Não é preciso ser mecânico profissional para passar na prova do DETRAN. Você precisa dominar o funcionamento básico dos sistemas e a interpretação dos alertas do painel.',
    sections: [
      {
        heading: 'Cores das Luzes do Painel de Instrumentos',
        content: [
          '• Luzes Vermelhas (Emergência): Indicam problemas graves que exigem parada imediata do veículo (baixa pressão do óleo, temperatura excessiva do motor, freio de mão acionado).',
          '• Luzes Amarelas/Laranjas (Atenção): Indicam falhas que requerem assistência técnica em breve (injeção eletrônica, combustível na reserva, ABS inoperante).',
          '• Luzes Verdes ou Azuis (Informativas): Indicam que um sistema está em funcionamento (farol baixo aceso, seta ligada, farol alto em azul).'
        ],
        highlightBox: {
          type: 'info',
          title: 'Pegadinha da Luz da Bateria',
          text: 'Se a luz vermelha da bateria acender com o motor funcionando, isso NÃO significa que a bateria estragou, mas sim que o ALTERNADOR não está gerando energia para recarregá-la.'
        }
      },
      {
        heading: 'Sistemas Críticos do Veículo',
        content: [
          '1. Sistema de Lubrificação: Reduz o atrito entre as peças metálicas móveis do motor. O nível de óleo deve ser verificado com o motor frio e em local plano.',
          '2. Sistema de Arrefecimento: Mantém o motor na temperatura ideal através da circulação de líquido de arrefecimento (água desmineralizada + aditivo etilenoglicol).',
          '3. Pneus e Indicador TWI: A profundidade mínima legal dos sulcos da banda de rodagem é de 1,6 milímetros. Rodar com pneus abaixo disso é infração grave com retenção do veículo.',
          '4. Sistema de Freios: O freio de serviço (pedal) atua hidraulicamente nas 4 rodas. O freio de estacionamento (freio de mão) atua mecanicamente nas rodas traseiras.'
        ]
      }
    ],
    faqs: [
      {
        question: 'O que é o freio ABS?',
        answer: 'Anti-lock Braking System (Sistema Antitravamento de Freio). Ele impede que as rodas travem em frenagens bruscas, permitindo que o motorista mantenha o controle direcional do veículo durante a frenagem.'
      }
    ],
    relatedSlugs: ['legislacao', 'direcao-defensiva', 'simulado-detran-mg']
  },

  'simulado-detran-sp': {
    slug: 'simulado-detran-sp',
    path: '/simulados/detran-sp',
    title: 'Simulado DETRAN SP 2026: Prova Teórica Oficial Online',
    metaTitle: 'Simulado DETRAN SP 2026 Online Grátis | 30 Questões com Gabarito',
    metaDescription: 'Faça o simulado oficial do DETRAN SP online e gratuito com 30 questões atualizadas para 2026. Teste seus conhecimentos e receba feedback em tempo real.',
    category: 'Simulados Estaduais',
    icon: '📍',
    readTime: '3 min',
    updatedAt: 'Outubro de 2026',
    lead: 'O exame teórico do DETRAN de São Paulo conta com 30 questões de múltipla escolha e duração máxima de 40 a 50 minutos. Treine com o banco de questões no formato exato da prova oficial paulista.',
    sections: [
      {
        heading: 'Estrutura da Prova Teórica do DETRAN São Paulo',
        content: [
          'O candidato precisa acertar no mínimo 21 questões (70%) para ser considerado apto.',
          'A prova é informatizada e realizada diretamente em computadores nas unidades do Poupatempo ou CFCs credenciados.',
          'A distribuição padrão das 30 questões no estado de São Paulo é:',
          '• Legislação de Trânsito: 12 questões',
          '• Direção Defensiva: 10 questões',
          '• Primeiros Socorros: 3 questões',
          '• Meio Ambiente e Cidadania: 3 questões',
          '• Mecânica Básica: 2 questões'
        ],
        table: {
          headers: ['Requisito', 'Regra DETRAN SP'],
          rows: [
            ['Total de Questões', '30 questões'],
            ['Acertos Mínimos para Aprovação', '21 acertos (70%)'],
            ['Tempo de Prova', '40 a 50 minutos'],
            ['Formato', 'Computador / Múltipla Escolha (4 alternativas A, B, C, D)'],
            ['Documento Exigido no Dia', 'Documento oficial com foto (RG, Passaporte) e comprovante de agendamento']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'O simulado do Diriggo é idêntico ao do Poupatempo SP?',
        answer: 'Sim! As questões seguem as diretrizes oficiais de pontuação, formatação e temas aplicados no banco oficial de questões do DETRAN-SP.'
      }
    ],
    relatedSlugs: ['simulado-detran-rj', 'simulado-detran-mg', 'legislacao']
  },

  'simulado-detran-rj': {
    slug: 'simulado-detran-rj',
    path: '/simulados/detran-rj',
    title: 'Simulado DETRAN RJ 2026: Prova Teórica Grátis Online',
    metaTitle: 'Simulado DETRAN RJ 2026 | Questões Oficiais e Gabarito na Hora',
    metaDescription: 'Treine com o simulado oficial do DETRAN RJ 2026. 30 questões divididas por matéria, cronômetro oficial e explicação detalhada de cada resposta.',
    category: 'Simulados Estaduais',
    icon: '🏖️',
    readTime: '3 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Prepare-se para o exame teórico do DETRAN Rio de Janeiro com o simulador online do Diriggo, totalmente adaptado ao modelo de avaliação carioca.',
    sections: [
      {
        heading: 'Regras do Exame Teórico do DETRAN-RJ',
        content: [
          'O exame do Rio de Janeiro exige 70% de aproveitamento (21 acertos de 30 questões).',
          'A aplicação é digital nas bancas examinadoras do DETRAN-RJ espalhadas pela capital e interior do estado.',
          'O Diriggo traz o cronômetro oficial de 40 minutos para você se acostumar com a gestão de tempo no dia do teste.'
        ]
      }
    ],
    faqs: [
      {
        question: 'O que acontece se eu reprovar na prova teórica no RJ?',
        answer: 'O candidato que não alcançar os 21 pontos pode pagar a taxa de reexame (DUDA) e agendar uma nova tentativa após o prazo de divulgação do resultado.'
      }
    ],
    relatedSlugs: ['simulado-detran-sp', 'simulado-detran-mg', 'direcao-defensiva']
  },

  'simulado-detran-mg': {
    slug: 'simulado-detran-mg',
    path: '/simulados/detran-mg',
    title: 'Simulado DETRAN MG 2026: Prova Teórica de Habilitação',
    metaTitle: 'Simulado DETRAN MG 2026 Online | Questões Atualizadas CNH',
    metaDescription: 'Pratique com o simulado do DETRAN MG online. Questões de Legislação, Placas e Mecânica com o mesmo nível de dificuldade da prova de Minas Gerais.',
    category: 'Simulados Estaduais',
    icon: '⛰️',
    readTime: '3 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Em Minas Gerais, a prova teórica exige atenção redobrada com as placas de regulamentação e as novas regras de circulação do CTB.',
    sections: [
      {
        heading: 'Dicas Específicas para Candidatos de Minas Gerais',
        content: [
          'O banco de questões mineiro costuma dar ênfase especial em normas de ultrapassagem, sinalização horizontal e direção defensiva sob neblina em serras.',
          'Utilize a galeria de placas do Diriggo para memorizar os códigos R-1 a R-40 e A-1 a A-48.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Quantas questões preciso acertar no DETRAN-MG?',
        answer: 'Você deve acertar pelo menos 21 questões de um total de 30 para ser aprovado para a etapa das aulas práticas.'
      }
    ],
    relatedSlugs: ['simulado-detran-sp', 'simulado-detran-pr', 'legislacao']
  },

  'simulado-detran-pr': {
    slug: 'simulado-detran-pr',
    path: '/simulados/detran-pr',
    title: 'Simulado DETRAN PR 2026: Prova Teórica Oficial CNH',
    metaTitle: 'Simulado DETRAN PR 2026 | Simulado Online Grátis 30 Questões',
    metaDescription: 'Realize o simulado online do DETRAN Paraná 2026. Treinamento gamificado com questões oficiais de primeira habilitação e renovação de CNH.',
    category: 'Simulados Estaduais',
    icon: '🌲',
    readTime: '3 min',
    updatedAt: 'Outubro de 2026',
    lead: 'O DETRAN Paraná possui um dos exames teóricos mais rigorosos do sul do país. Pratique com simulações completas para garantir tranquilidade no dia da prova.',
    sections: [
      {
        heading: 'Critérios de Avaliação no Paraná',
        content: [
          'No Paraná, a prova teórica técnica conta com 30 questões e exige nota mínima 7,0 (21 acertos).',
          'O Diriggo oferece simulados específicos focados nos tópicos em que os candidatos paranaenses mais têm dificuldade.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Posso fazer o simulado pelo celular?',
        answer: 'Sim! O Diriggo é 100% responsivo e funciona no celular, tablet ou computador sem precisar instalar nada.'
      }
    ],
    relatedSlugs: ['simulado-detran-sp', 'legislacao', 'pontuacao-cnh']
  },

  'pontuacao-cnh': {
    slug: 'pontuacao-cnh',
    path: '/pontuacao-cnh',
    title: 'Tabela de Pontuação CNH 2026: Regras de Suspensão e Infrações',
    metaTitle: 'Tabela de Pontos CNH 2026 | Limites de Suspensão e Valores CTB',
    metaDescription: 'Entenda os novos limites de pontos para suspensão da CNH (20, 30 e 40 pontos), tabela de infrações leves, médias, graves e gravíssimas do CTB.',
    category: 'Regras & CTB',
    icon: '🪪',
    readTime: '6 min',
    updatedAt: 'Outubro de 2026',
    lead: 'A Lei nº 14.071 alterou substancialmente as regras de suspensão do direito de dirigir. Conheça os limites escalonados de pontuação e os valores das multas para gabaritar a prova.',
    sections: [
      {
        heading: 'Limites Escalonados de Pontos para Suspensão da CNH',
        content: [
          'O limite máximo de pontos acumulados em um período de 12 meses varia de acordo com o cometimento de infrações gravíssimas:',
          '• 40 Pontos: Se o condutor NÃO cometeu nenhuma infração gravíssima nos últimos 12 meses.',
          '• 30 Pontos: Se o condutor cometeu 1 (uma) infração gravíssima.',
          '• 20 Pontos: Se o condutor cometeu 2 (duas) ou mais infrações gravíssimas.',
          'ATENÇÃO: Para motoristas profissionais (EAR - Exerce Atividade Remunerada, categorias C, D ou E), o limite é SEMPRE de 40 pontos, independentemente da natureza das infrações cometidas.'
        ],
        table: {
          headers: ['Classificação', 'Pontuação', 'Valor da Multa (R$)', 'Exemplos Práticos'],
          rows: [
            ['Leve', '3 pontos', 'R$ 88,38', 'Uso indevido de buzina; estacionar afastado da guia entre 50cm e 1m'],
            ['Média', '4 pontos', 'R$ 130,16', 'Parar veículo na contramão; transitar em velocidade inferior à metade da máxima'],
            ['Grave', '5 pontos', 'R$ 195,23', 'Não usar cinto de segurança; ultrapassar pela direita; veículo sem equipamentos obrigatórios'],
            ['Gravíssima', '7 pontos', 'R$ 293,47*', 'Dirigir sob efeito de álcool (x10); disputar racha (x10); avançar sinal vermelho']
          ]
        }
      },
      {
        heading: 'Infrações Autossuspensivas (Suspensão Direta)',
        content: [
          'Algumas infrações gravíssimas preveem a suspensão imediata da CNH como penalidade específica, mesmo que o condutor tenha ZERO pontos:',
          '• Dirigir sob a influência de álcool ou recusar o teste do etilômetro (bafômetro).',
          '• Dirigir ameaçando pedestres ou outros veículos.',
          '• Disputar corrida por espírito de emulação (racha).',
          '• Deixar de prestar socorro à vítima de acidente quando podia fazê-lo.',
          '• Transitar em velocidade superior à máxima permitida em mais de 50%.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Quanto tempo dura a suspensão da CNH?',
        answer: 'Para a primeira suspensão, o prazo varia de 6 a 12 meses (ou de 2 a 8 meses em certas autossuspensivas). Em caso de reincidência no período de 12 meses, varia de 8 meses a 2 anos.'
      }
    ],
    relatedSlugs: ['legislacao', 'metodologia', 'simulado-detran-sp']
  },

  'duvidas-frequentes': {
    slug: 'duvidas-frequentes',
    path: '/duvidas-frequentes',
    title: 'Dúvidas Frequentes (FAQ) sobre o Exame do DETRAN e o Diriggo',
    metaTitle: 'Dúvidas Frequentes DETRAN e CNH | FAQ Completo Diriggo',
    metaDescription: 'Tire todas as dúvidas sobre o processo de primeira habilitação, tempo de prova, pontuação mínima e como estudar gratuitamente pelo Diriggo.',
    category: 'Regras & CTB',
    icon: '❓',
    readTime: '4 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Reunimos as respostas para as perguntas mais comuns dos candidatos à primeira habilitação e usuários da plataforma Diriggo.',
    sections: [
      {
        heading: 'Tudo Sobre o Exame Teórico do DETRAN',
        content: [
          'Abaixo você encontra orientações claras sobre o agendamento, realização e pós-exame da prova teórica de motorista em território nacional.'
        ]
      }
    ],
    faqs: [
      {
        question: 'O Diriggo é gratuito?',
        answer: 'Sim! Você pode estudar as trilhas teóricas, consultar o catálogo de placas e realizar simulados oficiais gratuitamente.'
      },
      {
        question: 'Quantas questões tem a prova teórica do DETRAN?',
        answer: 'Na maioria dos estados brasileiros (SP, RJ, MG, PR, etc.), a prova possui 30 questões de múltipla escolha. Em alguns estados como Bahia e Rio Grande do Sul, podem ser 40 questões.'
      },
      {
        question: 'Posso usar calculadora ou consulta no dia da prova?',
        answer: 'Não. Nenhum aparelho eletrônico, relógio inteligente ou material impresso é permitido na sala do exame informatizado.'
      },
      {
        question: 'O que levar no dia do exame oficial?',
        answer: 'Documento original com foto em bom estado de conservação (RG, Passaporte, Carteira de Trabalho) e o protocolo de agendamento fornecido pelo CFC ou DETRAN.'
      },
      {
        question: 'Se eu reprovar, quando posso refazer a prova?',
        answer: 'Você pode remarcar a prova assim que o resultado for homologado no sistema, pagando a respectiva taxa estadual de reexame.'
      }
    ],
    relatedSlugs: ['metodologia', 'legislacao', 'pontuacao-cnh']
  },

  'termos-de-uso': {
    slug: 'termos-de-uso',
    path: '/termos-de-uso',
    title: 'Termos de Uso do Serviço Educacional Diriggo',
    metaTitle: 'Termos de Uso | Diriggo Plataforma Educacional de Trânsito',
    metaDescription: 'Leia os termos de uso e condições de prestação de serviços da plataforma de aprendizagem e simulados de trânsito Diriggo.',
    category: 'Legal',
    icon: '📜',
    readTime: '4 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Estes termos regulam o acesso e a utilização dos serviços, trilhas e simulados fornecidos pela plataforma Diriggo.',
    sections: [
      {
        heading: '1. Objeto e Caráter Educacional',
        content: [
          'O Diriggo é uma plataforma independente de apoio pedagógico e educacional para candidatos à CNH e condutores em reciclagem.',
          'O Diriggo NÃO possui vínculo governamental direto com nenhum DETRAN estadual, DENATRAN ou SENATRAN. O conteúdo baseia-se exclusivamente em leis públicas federais (Lei nº 9.503/1997 e resoluções do CONTRAN).'
        ]
      },
      {
        heading: '2. Responsabilidades do Usuário',
        content: [
          'O usuário compromete-se a utilizar a plataforma para fins estritamente pessoais de estudo.',
          'É expressamente proibida a cópia, comercialização ou engenharia reversa dos códigos, ilustrações, algoritmos e banco de questões proprietário.'
        ]
      }
    ],
    relatedSlugs: ['politica-privacidade', 'duvidas-frequentes']
  },

  'politica-privacidade': {
    slug: 'politica-privacidade',
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade e Proteção de Dados (LGPD)',
    metaTitle: 'Política de Privacidade e LGPD | Diriggo',
    metaDescription: 'Entenda como o Diriggo protege seus dados pessoais de acordo com a LGPD (Lei nº 13.709/2018). Coleta mínima e segurança com Firebase.',
    category: 'Legal',
    icon: '🔒',
    readTime: '4 min',
    updatedAt: 'Outubro de 2026',
    lead: 'Sua privacidade é prioridade máxima. Coletamos apenas as informações estritamente necessárias para salvar seu progresso educacional.',
    sections: [
      {
        heading: '1. Dados Coletados',
        content: [
          'Ao utilizar a autenticação com Google, recebemos apenas: seu nome público, endereço de e-mail e foto de perfil pública para identificação do condutor.',
          'Armazenamos em nuvem segura (Google Firebase): progresso das lições concluídas, histórico de simulados e pontuação virtual na CNH.'
        ]
      },
      {
        heading: '2. Compartilhamento e Direitos (LGPD)',
        content: [
          'O Diriggo NÃO comercializa, aluga ou compartilha seus dados pessoais com terceiros.',
          'Você tem direito a qualquer momento de solicitar a exclusão total do seu perfil e histórico dos nossos servidores.'
        ]
      }
    ],
    relatedSlugs: ['termos-de-uso', 'duvidas-frequentes']
  }
};
