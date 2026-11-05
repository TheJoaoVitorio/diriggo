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
    signId: 'A-1A',
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
    explanation: 'A regra dos 2 segundos consiste em escolher um ponto fixo de referência à frente e contar "um segundo, dois segundos" após o veículo da frente passar por ele. Se você chegar ao ponto antes de terminar a contagem, sua distância de seguimento é insuficiente.',
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
      { id: 'd', text: 'Seguir viagem e comunicar a ocorrência somente ao chegar ao destino.' }
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
      { id: 'b', text: 'Aplicar torniquete imediatamente, antes mesmo de tentar a compressão direta.' },
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
      { id: 'a', text: 'Não tenha cometido nenhuma infração grave ou gravíssima, nem seja reincidente em infração média.' },
      { id: 'b', text: 'Não tenha tomado nenhuma multa de natureza leve.' },
      { id: 'c', text: 'Realize novamente todos os exames práticos e teóricos do DETRAN.' },
      { id: 'd', text: 'Tenha o veículo aprovado em vistoria anual obrigatória do DETRAN.' }
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
,
  // --- QUESTOES DUOLINGO (IMAGENS & PLACAS) ---
  {
    id: 'q-duo-01',
    topic: 'signs',
    text: 'Qual destas imagens é a placa de "Parada Obrigatória"?',
    type: 'sign_choice',
    badge: 'QUAL DESTAS É "PARE"?',
    options: [
      { id: 'a', text: 'Placa R-1', signId: 'R-1' },
      { id: 'b', text: 'Placa R-2', signId: 'R-2' },
      { id: 'c', text: 'Placa A-15', signId: 'A-15' }
    ],
    correctOptionId: 'a',
    explanation: 'A placa R-1 é a única octogonal do trânsito brasileiro. Ela exige a parada total e imediata antes da linha de retenção.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-02',
    topic: 'signs',
    text: 'Qual destas placas adverte sobre "Curva Acentuada em S à Esquerda"?',
    type: 'sign_choice',
    badge: 'IDENTIFIQUE A PLACA',
    options: [
      { id: 'a', text: 'Placa R-1', signId: 'R-1' },
      { id: 'b', text: 'Placa A-5a', signId: 'A-5A' },
      { id: 'c', text: 'Placa A-21a', signId: 'A-21A' }
    ],
    correctOptionId: 'b',
    explanation: 'A placa A-5A adverte sobre duas curvas acentuadas sucessivas em sentidos contrários, iniciando para a esquerda. Exige redução de velocidade antes de entrar no primeiro trecho.',
    difficulty: 'medium'
  },
  {
    id: 'q-duo-03',
    topic: 'legislation',
    text: 'Qual imagem ilustra a regra de "Preferência pela Direita" em cruzamentos?',
    type: 'image_choice',
    badge: 'PREFERÊNCIA NO CRUZAMENTO',
    options: [
      { id: 'a', text: 'Rotatória', illustration: 'rotatoria' },
      { id: 'b', text: 'Via de Trânsito Rápido', illustration: 'via-transito-rapido' },
      { id: 'c', text: 'Cruzamento não sinalizado', illustration: 'cruzamento-direita' }
    ],
    correctOptionId: 'c',
    explanation: 'Art. 29 do CTB: Em cruzamentos sem semáforo, quem se aproxima pela DIREITA do condutor tem a preferência absoluta de passagem.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-04',
    topic: 'legislation',
    text: 'Em qual destas vias urbanas a velocidade máxima sem sinalização é de 80 km/h?',
    type: 'image_choice',
    badge: 'CLASSIFICAÇÃO DAS VIAS',
    options: [
      { id: 'a', text: 'Via Arterial', illustration: 'via-arterial' },
      { id: 'b', text: 'Via de Trânsito Rápido', illustration: 'via-transito-rapido' },
      { id: 'c', text: 'Rotatória Urbana', illustration: 'rotatoria' }
    ],
    correctOptionId: 'b',
    explanation: 'Art. 61 do CTB: As vias de trânsito rápido não possuem interseções em nível nem semáforos, permitindo velocidade de até 80 km/h.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-05',
    topic: 'mechanics',
    text: 'Qual destas imagens representa o "Radiador" do sistema de arrefecimento?',
    type: 'image_choice',
    badge: 'SISTEMA DE ARREFECIMENTO',
    options: [
      { id: 'a', text: 'Componente 1', illustration: 'radiador' },
      { id: 'b', text: 'Componente 2', illustration: 'bateria' },
      { id: 'c', text: 'Componente 3', illustration: 'freios' }
    ],
    correctOptionId: 'a',
    explanation: 'O radiador dissipa o calor gerado pelo motor através de dutos por onde circula o líquido de arrefecimento resfriado pela ventoinha.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-06',
    topic: 'mechanics',
    text: 'Qual luz do painel exige parar o carro imediatamente por "Baixa Pressão do Óleo"?',
    type: 'image_choice',
    badge: 'LUZES DE EMERGÊNCIA',
    options: [
      { id: 'a', text: 'Luz de Alerta 1', illustration: 'luz-injecao' },
      { id: 'b', text: 'Luz de Alerta 2', illustration: 'luz-bateria' },
      { id: 'c', text: 'Luz de Alerta 3', illustration: 'luz-oleo' }
    ],
    correctOptionId: 'c',
    explanation: 'A almotolia de óleo vermelha indica perda de pressão de óleo. Continuar rodando causa o travamento e fundição imediata do motor.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-07',
    topic: 'mechanics',
    text: 'Qual destas imagens ilustra o "Freio a Disco com Sistema ABS"?',
    type: 'image_choice',
    badge: 'SISTEMA DE FREIOS',
    options: [
      { id: 'a', text: 'Componente 1', illustration: 'motor-4-tempos' },
      { id: 'b', text: 'Componente 2', illustration: 'freios' },
      { id: 'c', text: 'Componente 3', illustration: 'bateria' }
    ],
    correctOptionId: 'b',
    explanation: 'O freio a disco com ABS impede o travamento das rodas durante frenagens de emergência, mantendo o controle direcional do veículo.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-08',
    topic: 'mechanics',
    text: 'Qual destas imagens mostra a "Bateria Automotiva (12V)"?',
    type: 'image_choice',
    badge: 'SISTEMA ELÉTRICO',
    options: [
      { id: 'a', text: 'Componente 1', illustration: 'bateria' },
      { id: 'b', text: 'Componente 2', illustration: 'pneu-twi' },
      { id: 'c', text: 'Componente 3', illustration: 'radiador' }
    ],
    correctOptionId: 'a',
    explanation: 'A bateria armazena eletricidade para a partida e sistemas elétricos do carro, sendo recarregada pelo alternador com o motor ligado.',
    difficulty: 'easy'
  },
  {
    id: 'q-duo-09',
    topic: 'mechanics',
    text: 'Qual imagem mostra o "Indicador TWI (1,6 mm)" de desgaste do pneu?',
    type: 'image_choice',
    badge: 'SEGURANÇA DOS PNEUS',
    options: [
      { id: 'a', text: 'Item 1', illustration: 'freios' },
      { id: 'b', text: 'Item 2', illustration: 'radiador' },
      { id: 'c', text: 'Item 3', illustration: 'pneu-twi' }
    ],
    correctOptionId: 'c',
    explanation: 'O TWI é o ressalto de borracha nos sulcos do pneu. Se atingir 1,6 mm, o pneu está "careca" e deve ser substituído imediatamente.',
    difficulty: 'easy'
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
        theorySlides: [
          {
            id: 'ts-1-1-1',
            title: 'Placas de Regulamentação',
            subtitle: 'Obrigações, restrições e proibições com força de lei',
            badge: 'Fundamento CTB',
            content: 'As placas de regulamentação têm formato predominantemente circular com fundo branco e borda vermelha (com exceções especiais como a placa PARE e Dê a Preferência). Seu desrespeito constitui infração de trânsito com aplicação de multa e pontos na CNH.',
            bullets: [
              'Cor padrão: Vermelho, branco e preto.',
              'Finalidade: Impor condições, proibições, restrições ou obrigações no uso das vias.',
              'Desrespeito: Gera autuação imediata e penalidades do CTB.'
            ],
            tip: 'Lembre-se: Placa vermelha NÃO avisa nem dá conselho; ela MANDA e PROÍBE!'
          },
          {
            id: 'ts-1-1-2',
            title: 'R-1: Parada Obrigatória (PARE)',
            subtitle: 'A única placa octogonal do trânsito brasileiro',
            badge: 'Infração Gravíssima',
            signId: 'R-1',
            content: 'A placa R-1 obriga o condutor a imobilizar TOTALMENTE o seu veículo antes de entrar ou cruzar a via transversal, mesmo que não haja nenhum pedestre ou veículo à vista.',
            bullets: [
              'Reduzir a velocidade e seguir em marcha lenta NÃO cumpre a regra.',
              'Formato octogonal com 8 lados para ser reconhecida até vista de costas.',
              'Art. 208 do CTB: Desobedecer à placa R-1 é infração gravíssima (7 pontos).'
            ],
            stat: {
              value: '7 Pontos',
              label: 'Penalidade na CNH por não parar na placa PARE'
            }
          },
          {
            id: 'ts-1-1-3',
            title: 'R-2: Dê a Preferência',
            subtitle: 'Triângulo invertido com vértice para baixo',
            badge: 'Regra de Cruzamento',
            signId: 'R-2',
            content: 'Diferente da placa PARE (onde a parada é mandatória), a placa R-2 exige que você ceda passagem aos veículos que transitam na via preferencial, parando somente se houver fluxo.',
            bullets: [
              'Única placa de trânsito triangular com ponta voltada para baixo.',
              'Permite seguir se a via estiver completamente livre.',
              'Se houver qualquer veículo aproximando-se, você DEVE parar e aguardar.'
            ],
            tip: 'Dica de ouro para a prova: PARE = Parada obrigatória sempre | Dê a Preferência = Pare se vier veículo.'
          }
        ],
        questions: [ALL_QUESTIONS[0], ALL_QUESTIONS[2], ALL_QUESTIONS[22]],
        xpReward: 20
      },
      {
        id: 'les-1-2',
        unitId: 'unit-1',
        title: 'Regras de Preferência e Velocidade',
        description: 'Quem passa primeiro nos cruzamentos sem semáforo e os limites das vias.',
        icon: 'Compass',
        theorySlides: [
          {
            id: 'ts-1-2-1',
            title: 'Cruzamentos Não Sinalizados',
            subtitle: 'A clássica Regra da Direita (Art. 29 do CTB)',
            badge: 'Preferência de Passagem',
            illustration: 'cruzamento-direita',
            content: 'Quando dois veículos chegam a um cruzamento sem semáforo e sem placas indicativas de preferência, a prioridade de passagem pertence sempre ao veículo que vem pela DIREITA do condutor.',
            bullets: [
              'Regra 1: Na rotatória, a preferência é de quem JÁ está circulando por ela.',
              'Regra 2: Entre rodovia e via secundária, a preferência é do veículo na rodovia.',
              'Regra 3: Nos demais casos, quem vem pela DIREITA tem a preferência absoluta.'
            ],
            stat: {
              value: 'Direita',
              label: 'Lado que detém a preferência em cruzamentos não sinalizados'
            }
          },
          {
            id: 'ts-1-2-2',
            title: 'Velocidades Máximas nas Vias Urbanas',
            subtitle: 'Limites quando não houver placa R-19 regulamentando',
            badge: 'Art. 61 do CTB',
            illustration: 'via-transito-rapido',
            content: 'O Código de Trânsito Brasileiro estabelece velocidades máximas padrão para as vias urbanas onde não existir placa de sinalização de velocidade.',
            bullets: [
              'Via de Trânsito Rápido: 80 km/h (sem cruzamentos em nível nem semáforos).',
              'Via Arterial: 60 km/h (liga bairros e tem semáforos/cruzamentos).',
              'Via Coletora: 40 km/h (distribui o tráfego nos bairros).',
              'Via Local: 30 km/h (ruas residenciais internas e de acesso restrito).'
            ],
            tip: 'Mnemônico fácil para memorizar na prova: 80 - 60 - 40 - 30 (cai em quase todas as provas do DETRAN!).'
          }
        ],
        questions: [ALL_QUESTIONS[1], ALL_QUESTIONS[3], ALL_QUESTIONS[24], ALL_QUESTIONS[25]],
        xpReward: 25
      },
      {
        id: 'les-1-3',
        unitId: 'unit-1',
        title: 'Placas de Advertência (Amarelas)',
        description: 'Antecipe curvas perigosas, declives e perigos na rodovia.',
        icon: 'AlertTriangle',
        theorySlides: [
          {
            id: 'ts-1-3-1',
            title: 'Placas de Advertência',
            subtitle: 'Alerta prévio para perigos potenciais à frente',
            badge: 'Prevenção',
            signId: 'A-1A',
            content: 'As placas de advertência possuem formato quadrado disposto em losango com fundo amarelo e símbolos pretos. Elas não possuem caráter punitivo, mas alertam o motorista sobre situações de perigo na via com antecedência para permitir uma reação segura.',
            bullets: [
              'Cor: Fundo amarelo com orla e símbolo pretos.',
              'A-1a: Curva acentuada à esquerda adiante.',
              'A-32a: Passagem sinalizada de pedestres adiante.',
              'A-33a: Área escolar adiante (crianças por perto).'
            ],
            tip: 'Ao avistar qualquer placa amarela: solte o acelerador e prepare-se para frear preventivamente.'
          }
        ],
        questions: [ALL_QUESTIONS[4], ALL_QUESTIONS[23]],
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
        theorySlides: [
          {
            id: 'ts-2-1-1',
            title: 'O Fenômeno da Aquaplanagem',
            subtitle: 'Quando a água separa o pneu do asfalto',
            badge: 'Alto Risco',
            signId: 'A-28',
            content: 'A aquaplanagem ou hidroplanagem ocorre quando uma lâmina de água na pista impede o escoamento pelos sulcos do pneu, fazendo o veículo flutuar descontrolado sem atrito.',
            bullets: [
              'Causas principais: Velocidade excessiva, água na pista e pneus com sulcos gastos (< 1,6mm).',
              'Sintomas: O volante fica repentinamente leve e o motor pode acelerar em falso.',
              'Placa A-28 alerta para trechos de pista escorregadia.'
            ]
          },
          {
            id: 'ts-2-1-2',
            title: 'Como Reagir na Aquaplanagem',
            subtitle: 'O erro fatal que nunca deve ser cometido',
            badge: 'Ação Defensiva',
            content: 'Em caso de aquaplanagem, qualquer freada brusca travará as rodas e provocará capotamento ou derrapagem fatal no momento em que os pneus tocarem novamente no asfalto seco.',
            bullets: [
              '1. NÃO pise no freio bruscamente!',
              '2. Tire o pé do acelerador suavemente.',
              '3. Mantenha o volante firme e alinhado na direção da pista.',
              '4. Espere o atrito com o piso voltar naturalmente.'
            ],
            tip: 'Regra de ouro: Deixe o carro perder velocidade sozinho até o pneu furar a lâmina de água.'
          }
        ],
        questions: [ALL_QUESTIONS[5], ALL_QUESTIONS[8]],
        xpReward: 25
      },
      {
        id: 'les-2-2',
        unitId: 'unit-2',
        title: 'Distância de Seguimento & Tempo',
        description: 'Aplique a regra dos 2 segundos para nunca bater na traseira.',
        icon: 'Clock',
        theorySlides: [
          {
            id: 'ts-2-2-1',
            title: 'A Regra dos Dois Segundos',
            subtitle: 'Distância segura do veículo da frente',
            badge: 'Técnica Prática',
            content: 'Para saber se você está guardando distância segura do veículo que vai adiante, utilize a técnica dos 2 segundos em pista seca (ou 4 segundos sob chuva).',
            bullets: [
              '1. Escolha um ponto fixo na beira da via (árvore, placa, poste).',
              '2. Quando o carro da frente passar pelo ponto, comece a contar pausadamente: "Cinquenta e um, cinquenta e dois".',
              '3. Seu carro só pode atingir o mesmo ponto após você terminar a contagem.',
              '4. Se atingir antes, reduza a velocidade e aumente a distância.'
            ],
            stat: {
              value: '2 Segundos',
              label: 'Distância mínima de reação e frenagem em pista seca'
            }
          }
        ],
        questions: [ALL_QUESTIONS[6], ALL_QUESTIONS[7]],
        xpReward: 20
      },
      {
        id: 'les-2-3',
        unitId: 'unit-2',
        title: 'Física do Veículo & Curvas',
        description: 'Entenda forças centrífugas e frenagens seguras nas curvas.',
        icon: 'Zap',
        theorySlides: [
          {
            id: 'ts-2-3-1',
            title: 'Força Centrífuga nas Curvas',
            subtitle: 'A força da física que empurra o carro para fora',
            badge: 'Física do Trânsito',
            content: 'Ao fazer uma curva, a inércia faz o veículo tender a continuar em linha reta. A força centrífuga puxa o veículo para fora da trajetória da curva.',
            bullets: [
              'CentríFUGA: Força que joga o veículo para FORA da curva.',
              'CentríPETA: Força que puxa o veículo para DENTRO da curva.',
              'Regra defensiva: Sempre reduza a marcha e a velocidade ANTES da curva, acelerando levemente e com suavidade no contorno para manter a tração.'
            ]
          }
        ],
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
        theorySlides: [
          {
            id: 'ts-3-1-1',
            title: '1ª Providência: Sinalizar o Local',
            subtitle: 'Evite que um acidente vire um engavetamento em massa',
            badge: 'Prioridade Absoluta',
            content: 'Ao chegar a um acidente, o instinto humano é correr em direção às vítimas. Porém, no socorrismo de trânsito, a PRIMEIRA coisa a fazer é proteger o local e sinalizar a via com triângulo, galhos e pisca-alerta ligado.',
            bullets: [
              'Se o local não for sinalizado, outros veículos colidirão com o carro acidentado e atropelarão os próprios socorristas.',
              'Use o triângulo de segurança a uma distância compatível com a velocidade da via.',
              'Sob chuva ou à noite, dobre a distância de sinalização.'
            ]
          },
          {
            id: 'ts-3-1-2',
            title: 'Acionando o Socorro Especializado',
            subtitle: 'Números de emergência obrigatórios para a CNH',
            badge: 'Emergência',
            content: 'Ligue com calma e informe com precisão: onde é o acidente (km ou ponto de referência), quantos veículos se envolveram e quantas vítimas aparentam estar graves.',
            bullets: [
              '192 - SAMU (Serviço de Atendimento Móvel de Urgência): Atendimento médico geral.',
              '193 - Corpo de Bombeiros: Vítimas presas em ferragens, vazamento de combustível, incêndios e afogamentos.',
              '190 - Polícia Militar | 191 - Polícia Rodoviária Federal.'
            ]
          }
        ],
        questions: [ALL_QUESTIONS[10], ALL_QUESTIONS[12]],
        xpReward: 25
      },
      {
        id: 'les-3-2',
        unitId: 'unit-3',
        title: 'Cuidados com Vítimas & Motociclistas',
        description: 'Por que JAMAIS retirar o capacete e como conter sangramentos.',
        icon: 'HeartHandshake',
        theorySlides: [
          {
            id: 'ts-3-2-1',
            title: 'O que NUNCA Fazer com a Vítima',
            subtitle: 'Erros graves que podem causar lesões irreparáveis',
            badge: 'Regra de Ouro',
            content: 'A principal causa de morte e invalidez pós-acidente em motociclistas decorre do manuseio inadequado da coluna cervical por curiosos ou socorristas sem treinamento.',
            bullets: [
              'JAMAIS retire o capacete de um motociclista acidentado!',
              'NÃO movimente ou transporte a vítima antes da chegada dos socorristas.',
              'NÃO dê água, alimentos ou remédios para as vítimas.',
              'NÃO retire objetos encravados no corpo da vítima (vidros, ferros).'
            ],
            tip: 'Para conter hemorragias externas abundantes: faça apenas compressão direta sobre o ferimento com pano limpo ou gaze.'
          }
        ],
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
        theorySlides: [
          {
            id: 'ts-4-1-1',
            title: 'Tabela de Pontos por Infração',
            subtitle: 'Art. 259 do Código de Trânsito Brasileiro',
            badge: 'Legislação CTB',
            content: 'As infrações de trânsito são divididas em 4 naturezas, cada uma associada a uma pontuação que é lançada no prontuário do condutor.',
            bullets: [
              'Gravíssima: 7 pontos (ex: avançar sinal vermelho, dirigir alcoolizado).',
              'Grave: 5 pontos (ex: não usar cinto de segurança, pneu careca).',
              'Média: 4 pontos (ex: parar sobre a faixa de pedestre, usar celular segurando).',
              'Leve: 3 pontos (ex: não portar documentos, estacionar afastado da guia).'
            ],
            stat: {
              value: '7 - 5 - 4 - 3',
              label: 'Pontos na CNH: Gravíssima, Grave, Média e Leve'
            }
          },
          {
            id: 'ts-4-1-2',
            title: 'A Regra da PPD (Permissão Para Dirigir)',
            subtitle: 'O período probatório do condutor novato',
            badge: 'Atenção Recém-Habilitado',
            content: 'Ao passar na prova do DETRAN, o candidato recebe a PPD válida por 1 ano. Para receber a CNH definitiva após 12 meses:',
            bullets: [
              'NÃO pode ter cometido NENHUMA infração GRAVÍSSIMA.',
              'NÃO pode ter cometido NENHUMA infração GRAVE.',
              'NÃO pode ser REINCIDENTE em infração MÉDIA (duas ou mais).',
              'Se violar essa regra, a PPD é cassada e o candidato deve reiniciar todo o processo do zero!'
            ]
          }
        ],
        questions: [ALL_QUESTIONS[14], ALL_QUESTIONS[16]],
        xpReward: 25
      },
      {
        id: 'les-4-2',
        unitId: 'unit-4',
        title: 'Lei Seca & Convivência com Ciclistas',
        description: 'Tolerância zero ao álcool e a distância sagrada de 1,5 metro.',
        icon: 'Scale',
        theorySlides: [
          {
            id: 'ts-4-2-1',
            title: 'Lei Seca: Álcool e Direção',
            subtitle: 'Artigos 165 e 165-A do CTB',
            badge: 'Tolerância Zero',
            content: 'Dirigir sob efeito de álcool ou substâncias psicoativas é infração gravíssima multiplicada por 10 (multa próxima de R$ 3.000,00), com recolhimento da CNH e suspensão do direito de dirigir por 12 meses.',
            bullets: [
              'Recusar o teste do bafômetro gera exatamente a mesma penalidade e valor de multa!',
              'Se o bafômetro constatar concentração igual ou superior a 0,34 mg/L de ar, torna-se CRIME DE TRÂNSITO (pena de detenção de 6 meses a 3 anos).'
            ]
          },
          {
            id: 'ts-4-2-2',
            title: 'Respeito aos Ciclistas na Via',
            subtitle: 'Distância lateral obrigatória de 1,50 metro',
            badge: 'Cidadania',
            content: 'O ciclista e o pedestre são os agentes mais frágeis do trânsito. A lei determina que veículos maiores sempre devem zelar pela segurança dos menores.',
            bullets: [
              'Ao ultrapassar uma bicicleta, o motorista DEVE manter distância lateral mínima de 1,50 METRO (um metro e meio).',
              'Não guardar essa distância é infração de trânsito média (Art. 201).',
              'Reduza a velocidade ao cruzar com ciclistas para evitar desequilíbrios provocados pelo deslocamento de ar.'
            ]
          }
        ],
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
        theorySlides: [
          {
            id: 'ts-5-1-1',
            title: 'Pneus e o Indicador TWI',
            subtitle: 'A profundidade mínima de 1,6 milímetros',
            badge: 'Segurança Veicular',
            illustration: 'pneu-twi',
            content: 'Os pneus possuem pequenos filetes de borracha no fundo dos sulcos chamados TWI (Tread Wear Indicator). Quando a borracha da banda de rodagem se desgasta e fica no mesmo nível do TWI, o pneu está "careca".',
            bullets: [
              'Profundidade mínima legal: 1,6 mm.',
              'Pneu careca não escoa água (aquaplanagem) e aumenta muito o espaço de frenagem.',
              'Conduzir com pneu careca é infração GRAVE (5 pontos) e acarreta retenção do veículo para regularização.'
            ]
          },
          {
            id: 'ts-5-1-2',
            title: 'Luzes do Painel de Instrumentos',
            subtitle: 'Código de cores dos alertas',
            badge: 'Painel do Carro',
            illustration: 'luz-oleo',
            content: 'O painel do veículo comunica o estado dos sistemas por cores semelhantes às do semáforo:',
            bullets: [
              'Luzes VERMELHAS: Problemas críticos. Pare o veículo imediatamente! (Pressão de óleo, temperatura do motor, bateria/alternador, freio de mão).',
              'Luzes AMARELAS/ÂMBAR: Alerta ou falha não-crítica. Procure assistência técnica em breve (injeção eletrônica, combustível na reserva, ABS).',
              'Luzes VERDES/AZUIS: Indicadores de funcionamento normal (farol baixo, seta, pisca-alerta, farol alto).'
            ]
          }
        ],
        questions: [ALL_QUESTIONS[18], ALL_QUESTIONS[19], ALL_QUESTIONS[27], ALL_QUESTIONS[30]],
        xpReward: 20
      },
      {
        id: 'les-5-2',
        unitId: 'unit-5',
        title: 'Emissões & Meio Ambiente (PROCONVE)',
        description: 'O papel do catalisador e a redução de fumaça e ruído nas cidades.',
        icon: 'Leaf',
        theorySlides: [
          {
            id: 'ts-5-2-1',
            title: 'PROCONVE e o Catalisador',
            subtitle: 'Controle de poluição automotiva no Brasil',
            badge: 'Meio Ambiente',
            content: 'O PROCONVE (Programa de Controle da Poluição do Ar por Veículos Automotores) foi criado pelo CONAMA para fixar metas rigorosas de emissão de fumaça e ruídos pelos motores.',
            bullets: [
              'Catalisador: Peça instalada no sistema de escapamento que transforma gases tóxicos (monóxido de carbono, óxidos de nitrogênio) em vapor de água e nitrogênio.',
              'Baterias usadas: Devem ser devolvidas aos revendedores ou fabricantes para reciclagem de chumbo e ácido.',
              'Poluição Sonora: Sons automotivos em volume excessivo perturbam a ordem e configuram infração grave com apreensão do som.'
            ]
          }
        ],
        questions: [ALL_QUESTIONS[20], ALL_QUESTIONS[21]],
        xpReward: 25
      },
      {
        id: 'les-5-3',
        unitId: 'unit-5',
        title: 'Sistemas do Veículo: Radiador, Freios ABS & Bateria',
        description: 'Reconheça visualmente os componentes vitais da mecânica básica.',
        icon: 'Cpu',
        theorySlides: [
          {
            id: 'ts-5-3-1',
            title: 'Sistema de Arrefecimento & Radiador',
            subtitle: 'Controle de temperatura do motor',
            badge: 'Arrefecimento',
            illustration: 'radiador',
            content: 'O radiador dissipa o calor gerado pela combustão interna do motor, refrigerado pela ventoinha e líquido composto de água desmineralizada e aditivo etilenoglicol.',
            bullets: [
              'Nunca abra o reservatório de expansão com o motor quente (risco de queimaduras graves).',
              'A ventoinha elétrica é acionada automaticamente quando a temperatura atinge o ponto programado.',
              'Válvula termostática: regula a passagem do líquido entre o motor e o radiador.'
            ]
          },
          {
            id: 'ts-5-3-2',
            title: 'Freios a Disco, Pastilhas & ABS',
            subtitle: 'Segurança e controle nas frenagens',
            badge: 'Freios & ABS',
            illustration: 'freios',
            content: 'O sistema de freios atua por atrito hidráulico. O sistema ABS (Antilock Braking System) impede o travamento das rodas em paradas bruscas, permitindo desviar de obstáculos.',
            bullets: [
              'Freio de serviço: atua hidraulicamente nas 4 rodas pelo pedal.',
              'Freio de estacionamento (freio de mão): atua mecanicamente por cabo nas rodas traseiras.',
              'O fluido de freio (DOT4) deve ser trocado preventivamente a cada 1 ou 2 anos.'
            ]
          }
        ],
        questions: [ALL_QUESTIONS[26], ALL_QUESTIONS[28], ALL_QUESTIONS[29]],
        xpReward: 30
      }
    ]
  }
];
