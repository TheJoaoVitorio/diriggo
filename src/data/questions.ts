import { Question, Unit } from '../types';

export const ALL_QUESTIONS: Question[] = [
  // --- UNIDADE 1: LEGISLAÇÃO & PLACAS ---
  {
    id: 'q-leg-01',
    topic: 'signs',
    text: 'Diante da placa de trânsito R-1 (ilustrada abaixo), qual deve ser a conduta do condutor?',
    signId: 'R-1',
    options: [
      { id: 'a', text: 'Reduzir a velocidade e cruzar se não houver veículos próximos.' },
      { id: 'b', text: 'Parar obrigatoriamente o veículo antes de entrar ou cruzar a via.' },
      { id: 'c', text: 'Acelerar para passar rapidamente antes dos outros veículos.' },
      { id: 'd', text: 'Buzinar para alertar pedestres e seguir viagem.' }
    ],
    correctOptionId: 'b',
    explanation: 'Art. 208 do CTB: A placa R-1 exige a imobilização TOTAL do veículo. Desrespeitá-la é infração gravíssima (7 pontos na CNH). Reduzir a marcha não é suficiente.',
    difficulty: 'easy'
  },
  {
    id: 'q-leg-02',
    topic: 'legislation',
    text: 'Em um cruzamento não sinalizado, de quem é a preferência de passagem entre dois veículos que se aproximam por vias perpendiculares?',
    options: [
      { id: 'a', text: 'Do veículo que estiver transitando em maior velocidade.' },
      { id: 'b', text: 'Do veículo que vier pela direita do condutor.' },
      { id: 'c', text: 'Do veículo de maior porte (ônibus ou caminhão).' },
      { id: 'd', text: 'Do veículo que piscar os faróis primeiro.' }
    ],
    correctOptionId: 'b',
    explanation: 'Art. 29, III, "c" do CTB: Quando veículos se cruzarem em locais não sinalizados, terá preferência de passagem aquele que vier pela direita do condutor.',
    difficulty: 'medium'
  },
  {
    id: 'q-leg-03',
    topic: 'signs',
    text: 'A placa R-2 "Dê a Preferência" tem formato triangular com vértice voltado para baixo. Ela determina que:',
    signId: 'R-2',
    options: [
      { id: 'a', text: 'O condutor deve ceder passagem a veículos da via transversal, parando se necessário.' },
      { id: 'b', text: 'A via à frente está totalmente bloqueada para tráfego.' },
      { id: 'c', text: 'O veículo prioritário deve acelerar para manter o fluxo.' },
      { id: 'd', text: 'É obrigatório parar mesmo que não haja nenhum veículo à vista.' }
    ],
    correctOptionId: 'a',
    explanation: 'A placa R-2 não exige parada obrigatória estrita se a via estiver desimpedida, mas impõe a obrigação de dar passagem aos que circulam pela preferencial.',
    difficulty: 'easy'
  },
  {
    id: 'q-leg-04',
    topic: 'legislation',
    text: 'Onde não existir sinalização regulamentadora de velocidade, qual é a velocidade máxima permitida nas vias urbanas arteriais?',
    options: [
      { id: 'a', text: '40 km/h' },
      { id: 'b', text: '60 km/h' },
      { id: 'c', text: '80 km/h' },
      { id: 'd', text: '110 km/h' }
    ],
    correctOptionId: 'b',
    explanation: 'Art. 61 do CTB: Nas vias urbanas sem sinalização: Trânsito Rápido = 80 km/h; Arterial = 60 km/h; Coletora = 40 km/h; Local = 30 km/h.',
    difficulty: 'medium'
  },
  {
    id: 'q-leg-05',
    topic: 'signs',
    text: 'Qual o significado da placa de advertência A-1a (losango amarelo)?',
    signId: 'A-1a',
    options: [
      { id: 'a', text: 'Pista sinuosa à direita adiante.' },
      { id: 'b', text: 'Curva acentuada à esquerda adiante.' },
      { id: 'c', text: 'Sentido obrigatório de circulação à esquerda.' },
      { id: 'd', text: 'Entrada proibida para veículos leves.' }
    ],
    correctOptionId: 'b',
    explanation: 'A placa A-1a adverte o condutor sobre uma curva acentuada para o lado esquerdo, exigindo redução preventiva da velocidade.',
    difficulty: 'easy'
  },

  // --- UNIDADE 2: DIREÇÃO DEFENSIVA ---
  {
    id: 'q-def-01',
    topic: 'defensive_driving',
    text: 'Sob chuva intensa, ocorre o fenômeno da aquaplanagem (hidroplanagem). O que o condutor DEVE fazer se sentir a perda de aderência dos pneus?',
    options: [
      { id: 'a', text: 'Pisar bruscamente no freio até o fundo para travar as rodas.' },
      { id: 'b', text: 'Puxar o freio de mão imediatamente e desengatar a marcha.' },
      { id: 'c', text: 'Tirar o pé do acelerador, segurar a direção firme sem virar bruscamente até recuperar o atrito.' },
      { id: 'd', text: 'Girar a direção de um lado para o outro rapidamente.' }
    ],
    correctOptionId: 'c',
    explanation: 'Na aquaplanagem, o veículo flutua sobre a lâmina de água. Frear bruscamente trava as rodas e causa capotamento ou derrapagem fatal quando o pneu toca o asfalto novamente.',
    difficulty: 'medium'
  },
  {
    id: 'q-def-02',
    topic: 'defensive_driving',
    text: 'A "regra dos dois segundos" é um método prático e seguro utilizado na direção defensiva para calcular:',
    options: [
      { id: 'a', text: 'O tempo que o semáforo leva da luz amarela para a vermelha.' },
      { id: 'b', text: 'A distância segura de seguimento entre o seu veículo e o que vai à frente.' },
      { id: 'c', text: 'O tempo de reação do motorista ao trocar de marcha.' },
      { id: 'd', text: 'A duração recomendada para uso da buzina.' }
    ],
    correctOptionId: 'b',
    explanation: 'A regra dos 2 segundos consiste em escolher um ponto fixo de referência e contar pausadamente "cinquenta e um, cinquenta e dois" após a passagem do carro da frente para garantir espaço suficiente de frenagem.',
    difficulty: 'easy'
  },
  {
    id: 'q-def-03',
    topic: 'defensive_driving',
    text: 'São consideradas condições adversas na direção defensiva:',
    options: [
      { id: 'a', text: 'Apenas a falta de combustível no tanque.' },
      { id: 'b', text: 'Luz, tempo, via, trânsito, veículo e condutor.' },
      { id: 'c', text: 'Apenas a chuva forte e a pista com buracos.' },
      { id: 'd', text: 'Somente o estado emocional alterado do motorista.' }
    ],
    correctOptionId: 'b',
    explanation: 'Direção defensiva classifica 6 condições adversas fundamentais: Iluminação (luz/ofuscamento), Tempo/Clima, Estado da Via, Trânsito, Condições do Veículo e Estado físico/psicológico do Condutor.',
    difficulty: 'easy'
  },
  {
    id: 'q-def-04',
    topic: 'signs',
    text: 'Ao avistar a placa A-28 "Pista Escorregadia", qual comportamento defensivo deve ser adotado?',
    signId: 'A-28',
    options: [
      { id: 'a', text: 'Aumentar a velocidade para cruzar o trecho perigoso o quanto antes.' },
      { id: 'b', text: 'Reduzir a velocidade, aumentar a distância de seguimento e não fazer movimentos bruscos.' },
      { id: 'c', text: 'Ligar o pisca-alerta enquanto estiver trafegando na via.' },
      { id: 'd', text: 'Desligar os faróis para diminuir reflexos na pista úmida.' }
    ],
    correctOptionId: 'b',
    explanation: 'Em pistas escorregadias o coeficiente de atrito é menor, aumentando a distância de frenagem. Movimentos bruscos provocam derrapagens.',
    difficulty: 'easy'
  },
  {
    id: 'q-def-05',
    topic: 'defensive_driving',
    text: 'A força centrífuga é um fator da física que atua sobre o veículo em movimento durante uma curva. Seu efeito é:',
    options: [
      { id: 'a', text: 'Puxar o veículo para dentro da curva.' },
      { id: 'b', text: 'Jogar o veículo para fora da curva.' },
      { id: 'c', text: 'Acelerar as rotações do motor automaticamente.' },
      { id: 'd', text: 'Fazer o veículo parar bruscamente.' }
    ],
    correctOptionId: 'b',
    explanation: 'A força centríFUGA ("fuga do centro") arremessa o veículo para fora da trajetória da curva. Por isso, a velocidade deve ser ajustada antes do início da curva.',
    difficulty: 'medium'
  },

  // --- UNIDADE 3: PRIMEIROS SOCORROS ---
  {
    id: 'q-soc-01',
    topic: 'first_aid',
    text: 'Ao presenciar um acidente de trânsito em rodovia, qual é a PRIMEIRA providência a ser tomada pelo condutor socorrista?',
    options: [
      { id: 'a', text: 'Retirar as vítimas das ferragens imediatamente puxando-as pelos braços.' },
      { id: 'b', text: 'Garantir a segurança do local sinalizando adequadamente a via com triângulo e galhos.' },
      { id: 'c', text: 'Dar água e medicamentos calmantes para as vítimas conscientes.' },
      { id: 'd', text: 'Ligar para a imprensa local para noticiar o acidente.' }
    ],
    correctOptionId: 'b',
    explanation: 'A primeira regra de ouro do socorrismo é SINALIZAR O LOCAL para evitar novos acidentes (engavetamentos ou atropelamento do socorrista).',
    difficulty: 'easy'
  },
  {
    id: 'q-soc-02',
    topic: 'first_aid',
    text: 'Em caso de acidente envolvendo motociclista caído no asfalto inconsciente, o que o socorrista leigo NUNCA deve fazer?',
    options: [
      { id: 'a', text: 'Retirar o capacete do motociclista acidentado.' },
      { id: 'b', text: 'Acionar imediatamente o serviço médico de resgate (SAMU 192 ou Bombeiros 193).' },
      { id: 'c', text: 'Verificar se a vítima está respirando sem movimentar o seu pescoço.' },
      { id: 'd', text: 'Proteger o local com sinalização preventiva.' }
    ],
    correctOptionId: 'a',
    explanation: 'NUNCA se deve retirar o capacete de motociclista acidentado! A remoção sem técnica imobilizadora de coluna cervical pode causar lesão medular permanente e tetraplegia.',
    difficulty: 'easy'
  },
  {
    id: 'q-soc-03',
    topic: 'first_aid',
    text: 'Quais são os números oficiais de emergência telefônica para acionar o SAMU e o Corpo de Bombeiros no Brasil?',
    options: [
      { id: 'a', text: 'SAMU: 190 / Bombeiros: 191' },
      { id: 'b', text: 'SAMU: 192 / Bombeiros: 193' },
      { id: 'c', text: 'SAMU: 193 / Bombeiros: 190' },
      { id: 'd', text: 'SAMU: 199 / Bombeiros: 197' }
    ],
    correctOptionId: 'b',
    explanation: 'SAMU é 192 (Serviço de Atendimento Móvel de Urgência); Bombeiros é 193 (Resgate e desencarceramento). Polícia Militar é 190 e Polícia Rodoviária Federal é 191.',
    difficulty: 'easy'
  },
  {
    id: 'q-soc-04',
    topic: 'first_aid',
    text: 'Para conter uma hemorragia externa abundante em um membro da vítima de trânsito, a conduta correta recomendada é:',
    options: [
      { id: 'a', text: 'Fazer compressão direta sobre o ferimento com pano limpo ou gaze.' },
      { id: 'b', text: 'Fazer torniquete de arame no pescoço da vítima.' },
      { id: 'c', text: 'Passar pó de café ou pomadas sobre a ferida aberta.' },
      { id: 'd', text: 'Lavar o corte com água gelada e esfregar vigorosamente.' }
    ],
    correctOptionId: 'a',
    explanation: 'A compressão direta com tecido limpo estanca a grande maioria das hemorragias sem os perigos de necrose provocados por torniquetes mal aplicados.',
    difficulty: 'medium'
  },

  // --- UNIDADE 4: INFRAÇÕES, PENALIDADES & CTB ---
  {
    id: 'q-ctb-01',
    topic: 'legislation',
    text: 'O candidato aprovado nos exames da Primeira Habilitação recebe a PPD (Permissão Para Dirigir). Ele obterá a CNH definitiva após 1 ano desde que:',
    options: [
      { id: 'a', text: 'Não tenha cometido nenhuma infração gravíssima, grave ou seja reincidente em média.' },
      { id: 'b', text: 'Não tenha tomado nenhuma multa de natureza leve.' },
      { id: 'c', text: 'Realize novamente todos os exames práticos e teóricos do DETRAN.' },
      { id: 'd', text: 'Tenha rodado pelo menos 10.000 km comprovados no velocímetro.' }
    ],
    correctOptionId: 'a',
    explanation: 'Art. 148, § 3º do CTB: A CNH definitiva é conferida ao término de 1 ano desde que o condutor não tenha cometido nenhuma infração de natureza GRAVE ou GRAVÍSSIMA, nem seja reincidente em infração MÉDIA.',
    difficulty: 'medium'
  },
  {
    id: 'q-ctb-02',
    topic: 'legislation',
    text: 'Conduzir veículo automotor sob a influência de álcool ou substâncias psicoativas é classificado pelo CTB como:',
    options: [
      { id: 'a', text: 'Infração grave, penalizada com 5 pontos na carteira.' },
      { id: 'b', text: 'Infração média, punida apenas com advertência por escrito.' },
      { id: 'c', text: 'Infração gravíssima (fator 10x), suspensão do direito de dirigir por 12 meses e retenção do veículo.' },
      { id: 'd', text: 'Apenas contravenção leve se não houver acidente.' }
    ],
    correctOptionId: 'c',
    explanation: 'Art. 165 do CTB (Lei Seca): Infração gravíssima multiplicada por 10 (quase R$ 3.000 de multa), recolhimento da CNH e suspensão por 12 meses.',
    difficulty: 'easy'
  },
  {
    id: 'q-ctb-03',
    topic: 'legislation',
    text: 'Qual é o valor em pontos computados na CNH para cada categoria de infração (Leve, Média, Grave e Gravíssima)?',
    options: [
      { id: 'a', text: 'Leve: 3 / Média: 4 / Grave: 5 / Gravíssima: 7 pontos.' },
      { id: 'b', text: 'Leve: 1 / Média: 2 / Grave: 3 / Gravíssima: 4 pontos.' },
      { id: 'c', text: 'Leve: 2 / Média: 4 / Grave: 6 / Gravíssima: 8 pontos.' },
      { id: 'd', text: 'Leve: 4 / Média: 5 / Grave: 6 / Gravíssima: 7 pontos.' }
    ],
    correctOptionId: 'a',
    explanation: 'Art. 259 do CTB: Gravíssima = 7 pontos; Grave = 5 pontos; Média = 4 pontos; Leve = 3 pontos.',
    difficulty: 'easy'
  },
  {
    id: 'q-ctb-04',
    topic: 'legislation',
    text: 'Ao ultrapassar um ciclista na via pública, qual é a distância lateral mínima que o condutor do veículo automotor deve manter obrigatoriamente?',
    options: [
      { id: 'a', text: '0,50 metro (meio metro).' },
      { id: 'b', text: '1,00 metro.' },
      { id: 'c', text: '1,50 metro (um metro e meio).' },
      { id: 'd', text: 'Não há distância regulamentada, basta buzinar.' }
    ],
    correctOptionId: 'c',
    explanation: 'Art. 201 do CTB: Deixar de guardar a distância lateral de 1,50 metro ao passar ou ultrapassar bicicleta é infração de trânsito média.',
    difficulty: 'medium'
  },

  // --- UNIDADE 5: MECÂNICA BÁSICA & MEIO AMBIENTE ---
  {
    id: 'q-mec-01',
    topic: 'mechanics',
    text: 'Qual é o indicador no pneu que indica o limite máximo de desgaste da borracha para que continue seguro e dentro da lei?',
    options: [
      { id: 'a', text: 'Indicador TWI (Tread Wear Indicator) com profundidade mínima de 1,6 mm.' },
      { id: 'b', text: 'Apenas a cor da calota lateral.' },
      { id: 'c', text: 'A pressão de ar do estepe.' },
      { id: 'd', text: 'O ruído emitido pelo escapamento ao frear.' }
    ],
    correctOptionId: 'a',
    explanation: 'A Resolução CONTRAN nº 913 estabelece que os pneus devem ter sulcos com profundidade mínima de 1,6 mm, indicada pelos ressaltos do TWI. Pneu "careca" é infração grave e retenção do veículo.',
    difficulty: 'medium'
  },
  {
    id: 'q-mec-02',
    topic: 'mechanics',
    text: 'Quando a luz vermelha da "bateria" acende no painel com o motor do carro em funcionamento, isso geralmente significa:',
    options: [
      { id: 'a', text: 'Que o nível da água do limpador de para-brisa acabou.' },
      { id: 'b', text: 'Uma falha no alternador ou no sistema elétrico de recarga da bateria.' },
      { id: 'c', text: 'Que o rádio consumiu toda a energia do carro.' },
      { id: 'd', text: 'Que o motor está superaquecido.' }
    ],
    correctOptionId: 'b',
    explanation: 'A luz de bateria acesa com motor ligado indica que o alternador parou de gerar carga para o circuito elétrico e a bateria está se descarregando rapidamente.',
    difficulty: 'easy'
  },
  {
    id: 'q-amb-01',
    topic: 'citizenship_environment',
    text: 'O PROCONVE (Programa de Controle da Poluição do Ar por Veículos Automotores) tem como principal objetivo:',
    options: [
      { id: 'a', text: 'Aumentar a venda de veículos utilitários pesados.' },
      { id: 'b', text: 'Reduzir os níveis de emissão de gases poluentes e ruídos emitidos pelos veículos.' },
      { id: 'c', text: 'Eliminar o uso de catalisadores nos escapamentos.' },
      { id: 'd', text: 'Fiscalizar o uso de ar-condicionado em automóveis populares.' }
    ],
    correctOptionId: 'b',
    explanation: 'O PROCONVE foi criado pelo CONAMA para fixar limites rigorosos de emissão de gases tóxicos (como CO, NOx e fuligem) pelos motores automotivos.',
    difficulty: 'easy'
  },
  {
    id: 'q-amb-02',
    topic: 'citizenship_environment',
    text: 'O catalisador instalado no sistema de escapamento dos veículos a combustão tem como função primordial:',
    options: [
      { id: 'a', text: 'Tornar o som do escapamento mais esportivo e ruidoso.' },
      { id: 'b', text: 'Converter gases tóxicos nocivos em substâncias menos prejudiciais ao meio ambiente.' },
      { id: 'c', text: 'Aumentar a potência máxima do motor em altas rotações.' },
      { id: 'd', text: 'Servir como filtro de ar para a cabine de passageiros.' }
    ],
    correctOptionId: 'b',
    explanation: 'O catalisador promove reações químicas para transformar monóxido de carbono e óxidos de nitrogênio em vapor de água, nitrogênio e dióxido de carbono.',
    difficulty: 'medium'
  }
];

export const UNITS: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Fundamentos do Trânsito & Placas',
    description: 'Aprenda as regras fundamentais de circulação, cruzamentos e identificação de placas de sinalização.',
    color: '#FFC800',
    lessons: [
      {
        id: 'les-1-1',
        unitId: 'unit-1',
        title: 'Placas de Regulamentação',
        description: 'Domine as placas vermelhas que impõem deveres e proibições no trânsito.',
        icon: 'OctagonAlert',
        questions: [ALL_QUESTIONS[0], ALL_QUESTIONS[2]],
        xpReward: 20
      },
      {
        id: 'les-1-2',
        unitId: 'unit-1',
        title: 'Regras de Preferência e Velocidade',
        description: 'Quem passa primeiro nos cruzamentos sem semáforo e os limites das vias.',
        icon: 'Compass',
        questions: [ALL_QUESTIONS[1], ALL_QUESTIONS[3]],
        xpReward: 25
      },
      {
        id: 'les-1-3',
        unitId: 'unit-1',
        title: 'Placas de Advertência (Amarelas)',
        description: 'Antecipe curvas perigosas, declives e perigos na rodovia.',
        icon: 'AlertTriangle',
        questions: [ALL_QUESTIONS[4]],
        xpReward: 20
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Direção Defensiva & Prevenção',
    description: 'Evite acidentes sob chuva, curvas fechadas, neblina e trânsito intenso.',
    color: '#F59E0B',
    lessons: [
      {
        id: 'les-2-1',
        unitId: 'unit-2',
        title: 'Pista Molhada & Aquaplanagem',
        description: 'O que fazer quando os pneus perdem contato com o asfalto molhado.',
        icon: 'CloudRain',
        questions: [ALL_QUESTIONS[5], ALL_QUESTIONS[8]],
        xpReward: 25
      },
      {
        id: 'les-2-2',
        unitId: 'unit-2',
        title: 'Distância de Seguimento & Tempo',
        description: 'Aplique a regra dos 2 segundos para nunca bater na traseira.',
        icon: 'Clock',
        questions: [ALL_QUESTIONS[6], ALL_QUESTIONS[7]],
        xpReward: 20
      },
      {
        id: 'les-2-3',
        unitId: 'unit-2',
        title: 'Física do Veículo & Curvas',
        description: 'Entenda forças centrífugas e frenagens seguras nas curvas.',
        icon: 'Zap',
        questions: [ALL_QUESTIONS[9]],
        xpReward: 20
      }
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Primeiros Socorros no Trânsito',
    description: 'Aprenda a agir com calma e segurança para salvar vidas sem agravar lesões.',
    color: '#EF4444',
    lessons: [
      {
        id: 'les-3-1',
        unitId: 'unit-3',
        title: 'Sinalização da Cena do Acidente',
        description: 'A primeira regra: proteger a si e aos outros de novos impactos.',
        icon: 'ShieldAlert',
        questions: [ALL_QUESTIONS[10], ALL_QUESTIONS[12]],
        xpReward: 25
      },
      {
        id: 'les-3-2',
        unitId: 'unit-3',
        title: 'Cuidados com Vítimas & Motociclistas',
        description: 'Por que JAMAIS retirar o capacete e como conter sangramentos.',
        icon: 'HeartHandshake',
        questions: [ALL_QUESTIONS[11], ALL_QUESTIONS[13]],
        xpReward: 25
      }
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Infrações, Multas e Legislação CTB',
    description: 'Pontos na carteira, regras da PPD (Permissão) e crimes graves de trânsito.',
    color: '#3B82F6',
    lessons: [
      {
        id: 'les-4-1',
        unitId: 'unit-4',
        title: 'Pontuação & Permissão Provisória',
        description: 'Tudo o que você precisa para não perder sua CNH no primeiro ano.',
        icon: 'FileBadge',
        questions: [ALL_QUESTIONS[14], ALL_QUESTIONS[16]],
        xpReward: 25
      },
      {
        id: 'les-4-2',
        unitId: 'unit-4',
        title: 'Lei Seca & Convivência com Ciclistas',
        description: 'Tolerância zero ao álcool e a distância sagrada de 1,5 metro.',
        icon: 'Scale',
        questions: [ALL_QUESTIONS[15], ALL_QUESTIONS[17]],
        xpReward: 30
      }
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Mecânica Básica & Meio Ambiente',
    description: 'Entenda os avisos do painel, pneus seguros e programas de controle ambiental.',
    color: '#10B981',
    lessons: [
      {
        id: 'les-5-1',
        unitId: 'unit-5',
        title: 'Segurança do Veículo & Pneus TWI',
        description: 'Evite multas e acidentes mantendo pneus e luzes em dia.',
        icon: 'Wrench',
        questions: [ALL_QUESTIONS[18], ALL_QUESTIONS[19]],
        xpReward: 20
      },
      {
        id: 'les-5-2',
        unitId: 'unit-5',
        title: 'Emissões & Meio Ambiente (PROCONVE)',
        description: 'O papel do catalisador e a redução de fumaça e ruído nas cidades.',
        icon: 'Leaf',
        questions: [ALL_QUESTIONS[20], ALL_QUESTIONS[21]],
        xpReward: 25
      }
    ]
  }
];
