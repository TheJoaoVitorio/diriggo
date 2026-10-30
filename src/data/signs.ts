import { TrafficSign } from "../types";

export const TRAFFIC_SIGNS: Record<string, TrafficSign> = {
  'A-10A': {
    id: 'A-10A',
    code: 'A-10A',
    name: "Entroncamento Oblíquo à Esquerda",
    category: 'advertencia',
    description: "Adverte sobre confluência oblíqua pela esquerda.",
    pointsToRemember: "Atenção a fluxo lateral oblíquo."
  },
  'A-10B': {
    id: 'A-10B',
    code: 'A-10B',
    name: "Entroncamento Oblíquo à Direita",
    category: 'advertencia',
    description: "Adverte sobre confluência oblíqua pela direita.",
    pointsToRemember: "Atenção a fluxo lateral oblíquo."
  },
  'A-11A': {
    id: 'A-11A',
    code: 'A-11A',
    name: "Junções Sucessivas Contrárias (1ª à Esquerda)",
    category: 'advertencia',
    description: "Entradas laterais alternadas próximas, primeira à esquerda.",
    pointsToRemember: "Atenção a manobras múltiplas de entrada e saída."
  },
  'A-11B': {
    id: 'A-11B',
    code: 'A-11B',
    name: "Junções Sucessivas Contrárias (1ª à Direita)",
    category: 'advertencia',
    description: "Entradas laterais alternadas próximas, primeira à direita.",
    pointsToRemember: "Atenção a manobras múltiplas."
  },
  'A-12': {
    id: 'A-12',
    code: 'A-12',
    name: "Interseção em Círculo (Rotatória)",
    category: 'advertencia',
    description: "Adverte sobre praça giratória à frente.",
    pointsToRemember: "Preferência é do condutor que já circula na rotatória."
  },
  'A-13A': {
    id: 'A-13A',
    code: 'A-13A',
    name: "Confluência à Esquerda",
    category: 'advertencia',
    description: "Via lateral une-se à principal pela esquerda.",
    pointsToRemember: "Atenção na sincronização de velocidades."
  },
  'A-13B': {
    id: 'A-13B',
    code: 'A-13B',
    name: "Confluência à Direita",
    category: 'advertencia',
    description: "Via lateral une-se à principal pela direita.",
    pointsToRemember: "Atenção na sincronização de velocidades."
  },
  'A-14': {
    id: 'A-14',
    code: 'A-14',
    name: "Semáforo à Frente",
    category: 'advertencia',
    description: "Alerta para a existência de sinal semafórico adiante.",
    pointsToRemember: "Preparar-se para eventual parada do tráfego."
  },
  'A-15': {
    id: 'A-15',
    code: 'A-15',
    name: "Parada Obrigatória à Frente",
    category: 'advertencia',
    description: "Alerta que logo adiante haverá uma placa R-1 (PARE).",
    pointsToRemember: "Permite frenagem gradual com segurança."
  },
  'A-16': {
    id: 'A-16',
    code: 'A-16',
    name: "Bonde",
    category: 'advertencia',
    description: "Alerta para cruzamento ou compartilhamento com trilhos de bonde/VLT.",
    pointsToRemember: "Trilhos no asfalto reduzem aderência de pneus e motos."
  },
  'A-17': {
    id: 'A-17',
    code: 'A-17',
    name: "Pista Irregular",
    category: 'advertencia',
    description: "Adverte sobre ondulações, buracos ou deformações na pista.",
    pointsToRemember: "Segurar o volante com ambas as mãos e reduzir a marcha."
  },
  'A-18': {
    id: 'A-18',
    code: 'A-18',
    name: "Saliência ou Lombada",
    category: 'advertencia',
    description: "Adverte sobre redutor de velocidade físico transversal.",
    pointsToRemember: "Reduzir a velocidade com suavidade sem frear bruscamente em cima da lombada."
  },
  'A-19': {
    id: 'A-19',
    code: 'A-19',
    name: "Depressão",
    category: 'advertencia',
    description: "Adverte sobre desnível ou valeta na pista.",
    pointsToRemember: "Risco de impacto na parte inferior do veículo."
  },
  'A-1A': {
    id: 'A-1A',
    code: 'A-1A',
    name: "Curva Acentuada à Esquerda",
    category: 'advertencia',
    description: "Adverte sobre curva perigosa e fechada para o lado esquerdo.",
    pointsToRemember: "Reduzir a velocidade antes da curva; nunca frear bruscamente dentro dela."
  },
  'A-1B': {
    id: 'A-1B',
    code: 'A-1B',
    name: "Curva Acentuada à Direita",
    category: 'advertencia',
    description: "Adverte sobre curva perigosa e fechada para o lado direito.",
    pointsToRemember: "Reduzir a velocidade antes da entrada da curva."
  },
  'A-20A': {
    id: 'A-20A',
    code: 'A-20A',
    name: "Declive Acentuado",
    category: 'advertencia',
    description: "Descida de serra íngreme e longa.",
    pointsToRemember: "Descer sempre com marcha engrenada; NUNCA em ponto morto (banguela)."
  },
  'A-20B': {
    id: 'A-20B',
    code: 'A-20B',
    name: "Aclive Acentuado",
    category: 'advertencia',
    description: "Subida íngreme.",
    pointsToRemember: "Usar marcha de força para evitar retorno involuntário."
  },
  'A-21A': {
    id: 'A-21A',
    code: 'A-21A',
    name: "Estreitamento de Pista ao Centro",
    category: 'advertencia',
    description: "Ambos os bordos da pista se estreitam em direção ao centro.",
    pointsToRemember: "Intercalar a passagem de veículos respeitando a vez."
  },
  'A-21B': {
    id: 'A-21B',
    code: 'A-21B',
    name: "Estreitamento de Pista à Esquerda",
    category: 'advertencia',
    description: "Pista estreita pelo lado esquerdo.",
    pointsToRemember: "Veículos da esquerda devem convergir para a direita com atenção."
  },
  'A-21C': {
    id: 'A-21C',
    code: 'A-21C',
    name: "Estreitamento de Pista à Direita",
    category: 'advertencia',
    description: "Pista estreita pelo lado direito.",
    pointsToRemember: "Veículos da direita devem convergir com atenção."
  },
  'A-21D': {
    id: 'A-21D',
    code: 'A-21D',
    name: "Alargamento de Pista à Esquerda",
    category: 'advertencia',
    description: "Pista ganha faixa adicional à esquerda.",
    pointsToRemember: "Facilita ultrapassagens."
  },
  'A-21E': {
    id: 'A-21E',
    code: 'A-21E',
    name: "Alargamento de Pista à Direita",
    category: 'advertencia',
    description: "Pista ganha faixa adicional à direita.",
    pointsToRemember: "Acomoda veículos lentos."
  },
  'A-22': {
    id: 'A-22',
    code: 'A-22',
    name: "Ponte Estreita",
    category: 'advertencia',
    description: "Ponte com largura reduzida.",
    pointsToRemember: "Não permite ultrapassagem sobre a ponte."
  },
  'A-23': {
    id: 'A-23',
    code: 'A-23',
    name: "Ponte Móvel",
    category: 'advertencia',
    description: "Ponte com vão móvel para passagem de embarcações.",
    pointsToRemember: "Parar antes do semáforo quando ativado."
  },
  'A-24': {
    id: 'A-24',
    code: 'A-24',
    name: "Obras",
    category: 'advertencia',
    description: "Presença de trabalhadores e maquinário na pista.",
    pointsToRemember: "Redução drástica de velocidade e atenção máxima."
  },
  'A-25': {
    id: 'A-25',
    code: 'A-25',
    name: "Mão Dupla Adiante",
    category: 'advertencia',
    description: "Pista de sentido único passará a operar em mão dupla.",
    pointsToRemember: "Cuidado ao ultrapassar; tráfego em sentido contrário."
  },
  'A-26A': {
    id: 'A-26A',
    code: 'A-26A',
    name: "Sentido Único",
    category: 'advertencia',
    description: "Informa o sentido de trânsito.",
    pointsToRemember: "Seguir sempre no fluxo da via."
  },
  'A-26B': {
    id: 'A-26B',
    code: 'A-26B',
    name: "Sentido Duplo",
    category: 'advertencia',
    description: "Informa que a via opera em mão dupla.",
    pointsToRemember: "Atenção aos veículos em sentido oposto."
  },
  'A-27': {
    id: 'A-27',
    code: 'A-27',
    name: "Área com Desmoronamento",
    category: 'advertencia',
    description: "Risco de queda de rochas ou terra das encostas.",
    pointsToRemember: "Não parar no acostamento durante chuvas fortes."
  },
  'A-28': {
    id: 'A-28',
    code: 'A-28',
    name: "Pista Escorregadia",
    category: 'advertencia',
    description: "Adverte sobre piso liso por óleo, chuva ou lama.",
    pointsToRemember: "Aumentar distância de seguimento. Se aquaplanar, não frear bruscamente."
  },
  'A-29': {
    id: 'A-29',
    code: 'A-29',
    name: "Projeção de Cascalho",
    category: 'advertencia',
    description: "Pista com pedras soltas lançadas pelos pneus.",
    pointsToRemember: "Aumentar distância para evitar quebra de para-brisas."
  },
  'A-2A': {
    id: 'A-2A',
    code: 'A-2A',
    name: "Curva à Esquerda",
    category: 'advertencia',
    description: "Adverte sobre curva suave para a esquerda adiante.",
    pointsToRemember: "Manter a trajetória e respeitar a faixa de rolamento."
  },
  'A-2B': {
    id: 'A-2B',
    code: 'A-2B',
    name: "Curva à Direita",
    category: 'advertencia',
    description: "Adverte sobre curva suave para a direita adiante.",
    pointsToRemember: "Manter a velocidade compatível com a via."
  },
  'A-30A': {
    id: 'A-30A',
    code: 'A-30A',
    name: "Trânsito de Ciclistas",
    category: 'advertencia',
    description: "Presença constante de bicicletas na via.",
    pointsToRemember: "Respeitar a distância lateral mínima de 1,5 metro."
  },
  'A-30B': {
    id: 'A-30B',
    code: 'A-30B',
    name: "Passagem Sinalizada de Ciclistas",
    category: 'advertencia',
    description: "Cruzamento rodocicloviário sinalizado.",
    pointsToRemember: "Prioridade ao ciclista na travessia regulamentada."
  },
  'A-30C': {
    id: 'A-30C',
    code: 'A-30C',
    name: "Trânsito Compartilhado Ciclistas e Pedestres",
    category: 'advertencia',
    description: "Espaço compartilhado entre pedestres e ciclistas.",
    pointsToRemember: "Cuidado mútuo e baixa velocidade."
  },
  'A-31': {
    id: 'A-31',
    code: 'A-31',
    name: "Trânsito de Tratores ou Máquinas Agrícolas",
    category: 'advertencia',
    description: "Presença frequente de veículos agrícolas lentos.",
    pointsToRemember: "Paciência ao ultrapassar em trecho rural permitido."
  },
  'A-32A': {
    id: 'A-32A',
    code: 'A-32A',
    name: "Trânsito de Pedestres",
    category: 'advertencia',
    description: "Presença de pedestres circulando.",
    pointsToRemember: "Atenção redobrada em áreas comerciais e vilas."
  },
  'A-32B': {
    id: 'A-32B',
    code: 'A-32B',
    name: "Passagem Sinalizada de Pedestres",
    category: 'advertencia',
    description: "Faixa de pedestres pintada na pista à frente.",
    pointsToRemember: "Parar para dar preferência ao pedestre na faixa."
  },
  'A-33A': {
    id: 'A-33A',
    code: 'A-33A',
    name: "Área Escolar",
    category: 'advertencia',
    description: "Proximidade de colégios, creches e travessia de crianças.",
    pointsToRemember: "Velocidade máxima reduzida; reações infantis são imprevisíveis."
  },
  'A-33B': {
    id: 'A-33B',
    code: 'A-33B',
    name: "Passagem Sinalizada de Escolares",
    category: 'advertencia',
    description: "Faixa sinalizada específica para travessia de alunos.",
    pointsToRemember: "Parada obrigatória durante o embarque e desembarque escolar."
  },
  'A-34': {
    id: 'A-34',
    code: 'A-34',
    name: "Crianças",
    category: 'advertencia',
    description: "Área de lazer, parques ou praças com crianças.",
    pointsToRemember: "Atenção a bolas e crianças correndo em direção à via."
  },
  'A-35': {
    id: 'A-35',
    code: 'A-35',
    name: "Animais",
    category: 'advertencia',
    description: "Risco de animais domésticos (bois, cavalos) na pista.",
    pointsToRemember: "Não buzinar nem usar farol alto para não assustar o animal."
  },
  'A-36': {
    id: 'A-36',
    code: 'A-36',
    name: "Animais Selvagens",
    category: 'advertencia',
    description: "Travessia de fauna silvestre (capivaras, tamanduás, antas).",
    pointsToRemember: "Reduzir à noite em áreas de reserva ecológica."
  },
  'A-37': {
    id: 'A-37',
    code: 'A-37',
    name: "Altura Limitada",
    category: 'advertencia',
    description: "Alerta com antecedência viaduto com limite vertical.",
    pointsToRemember: "Permite desvio para rotas alternativas."
  },
  'A-38': {
    id: 'A-38',
    code: 'A-38',
    name: "Largura Limitada",
    category: 'advertencia',
    description: "Alerta para restrição horizontal de passagem.",
    pointsToRemember: "Evita bloqueio de tráfego por veículos largos."
  },
  'A-39': {
    id: 'A-39',
    code: 'A-39',
    name: "Passagem de Nível Sem Barreira",
    category: 'advertencia',
    description: "Cruzamento com linha de trem sem cancela automática.",
    pointsToRemember: "Art. 212 CTB: Parar obrigatoriamente antes de cruzar linha férrea."
  },
  'A-3A': {
    id: 'A-3A',
    code: 'A-3A',
    name: "Pista Sinuosa à Esquerda",
    category: 'advertencia',
    description: "Adverte sobre sequência de 3 ou mais curvas, iniciando pela esquerda.",
    pointsToRemember: "Atenção constante e redução de velocidade durante o trecho."
  },
  'A-3B': {
    id: 'A-3B',
    code: 'A-3B',
    name: "Pista Sinuosa à Direita",
    category: 'advertencia',
    description: "Adverte sobre sequência de 3 ou mais curvas, iniciando pela direita.",
    pointsToRemember: "Atenção constante e redução de velocidade."
  },
  'A-40': {
    id: 'A-40',
    code: 'A-40',
    name: "Passagem de Nível Com Barreira",
    category: 'advertencia',
    description: "Cruzamento com cancela física de proteção.",
    pointsToRemember: "Respeitar o fechamento da cancela e sinal sonoro."
  },
  'A-41': {
    id: 'A-41',
    code: 'A-41',
    name: "Cruz de Santo André",
    category: 'advertencia',
    description: "Sinaliza o local exato do cruzamento ferroviário.",
    pointsToRemember: "Olhar para ambos os lados e escutar atentamente antes de transpor."
  },
  'A-42A': {
    id: 'A-42A',
    code: 'A-42A',
    name: "Início de Pista Dupla",
    category: 'advertencia',
    description: "Pista passa de mão simples para pista dupla com canteiro central.",
    pointsToRemember: "Fim do risco de colisão frontal no trecho duplicado."
  },
  'A-42B': {
    id: 'A-42B',
    code: 'A-42B',
    name: "Fim de Pista Dupla",
    category: 'advertencia',
    description: "Pista duplicada afunila de volta para pista simples de mão dupla.",
    pointsToRemember: "Atenção redobrada ao fluxo contrário que reaparece."
  },
  'A-42C': {
    id: 'A-42C',
    code: 'A-42C',
    name: "Pista Dividida",
    category: 'advertencia',
    description: "Obstáculo físico central dividindo o tráfego em dois sentidos.",
    pointsToRemember: "Seguir pelo lado correto do divisor."
  },
  'A-43': {
    id: 'A-43',
    code: 'A-43',
    name: "Aeroporto",
    category: 'advertencia',
    description: "Proximidade de aeroporto com aviões voando baixo.",
    pointsToRemember: "Não se distrair com ruídos ou aeronaves sobrevoando."
  },
  'A-44': {
    id: 'A-44',
    code: 'A-44',
    name: "Vento Lateral",
    category: 'advertencia',
    description: "Trecho sujeito a rajadas fortes de vento lateral.",
    pointsToRemember: "Segurar com firmeza o volante, especialmente em pontes e aterros."
  },
  'A-45': {
    id: 'A-45',
    code: 'A-45',
    name: "Rua Sem Saída",
    category: 'advertencia',
    description: "A via termina sem interconexão à frente.",
    pointsToRemember: "Evita entrar por engano sem ter como prosseguir."
  },
  'A-46': {
    id: 'A-46',
    code: 'A-46',
    name: "Peso Bruto Total Limitado",
    category: 'advertencia',
    description: "Alerta para restrição de peso em ponte ou pontilhão.",
    pointsToRemember: "Veículos pesados devem buscar rota alternativa."
  },
  'A-47': {
    id: 'A-47',
    code: 'A-47',
    name: "Peso Limitado por Eixo",
    category: 'advertencia',
    description: "Alerta para restrição de carga por eixo adiante.",
    pointsToRemember: "Cuidado com sobrecarga estrutural."
  },
  'A-48': {
    id: 'A-48',
    code: 'A-48',
    name: "Comprimento Limitado",
    category: 'advertencia',
    description: "Alerta para limite de extensão de veículos.",
    pointsToRemember: "Curvas ou declives não comportam composições longas."
  },
  'A-49A': {
    id: 'A-49A',
    code: 'A-49A',
    name: "Início de Pista com Faixa Adicional à Direita",
    category: 'advertencia',
    description: "Abertura de terceira faixa para veículos lentos na subida.",
    pointsToRemember: "Veículos lentos devem usá-la liberando as demais faixas."
  },
  'A-49B': {
    id: 'A-49B',
    code: 'A-49B',
    name: "Início de Pista com Faixa Adicional à Esquerda",
    category: 'advertencia',
    description: "Faixa rápida adicional.",
    pointsToRemember: "Fluidez e ultrapassagens seguras."
  },
  'A-4A': {
    id: 'A-4A',
    code: 'A-4A',
    name: "Curva em \"S\" à Esquerda",
    category: 'advertencia',
    description: "Adverte sobre duas curvas sucessivas em sentidos opostos, primeira à esquerda.",
    pointsToRemember: "Trecho sinuoso rápido."
  },
  'A-4B': {
    id: 'A-4B',
    code: 'A-4B',
    name: "Curva em \"S\" à Direita",
    category: 'advertencia',
    description: "Adverte sobre duas curvas sucessivas em sentidos opostos, primeira à direita.",
    pointsToRemember: "Trecho sinuoso rápido."
  },
  'A-50A': {
    id: 'A-50A',
    code: 'A-50A',
    name: "Faixa Reversível à Esquerda",
    category: 'advertencia',
    description: "Alerta sobre operação reversível de faixa.",
    pointsToRemember: "Atenção à sinalização luminosa de controle."
  },
  'A-50B': {
    id: 'A-50B',
    code: 'A-50B',
    name: "Faixa Reversível à Direita",
    category: 'advertencia',
    description: "Alerta sobre operação reversível de faixa.",
    pointsToRemember: "Atenção à sinalização luminosa."
  },
  'A-5A': {
    id: 'A-5A',
    code: 'A-5A',
    name: "Curva Acentuada em \"S\" à Esquerda",
    category: 'advertencia',
    description: "Duas curvas acentuadas sucessivas em sentidos contrários.",
    pointsToRemember: "Risco extremo de derrapagem em alta velocidade."
  },
  'A-5B': {
    id: 'A-5B',
    code: 'A-5B',
    name: "Curva Acentuada em \"S\" à Direita",
    category: 'advertencia',
    description: "Duas curvas acentuadas sucessivas em sentidos contrários.",
    pointsToRemember: "Risco extremo de derrapagem."
  },
  'A-6': {
    id: 'A-6',
    code: 'A-6',
    name: "Cruzamento de Vias",
    category: 'advertencia',
    description: "Adverte sobre cruzamento de duas vias em nível.",
    pointsToRemember: "Em cruzamento não sinalizado, preferência de quem vem pela direita."
  },
  'A-7A': {
    id: 'A-7A',
    code: 'A-7A',
    name: "Via Lateral à Esquerda",
    category: 'advertencia',
    description: "Adverte sobre entrada de via lateral pelo lado esquerdo.",
    pointsToRemember: "Atenção a veículos ingressando na via principal."
  },
  'A-7B': {
    id: 'A-7B',
    code: 'A-7B',
    name: "Via Lateral à Direita",
    category: 'advertencia',
    description: "Adverte sobre entrada de via lateral pelo lado direito.",
    pointsToRemember: "Atenção a veículos ingressando na via principal."
  },
  'A-8': {
    id: 'A-8',
    code: 'A-8',
    name: "Interseção em \"T\"",
    category: 'advertencia',
    description: "Adverte sobre cruzamento onde a via atual termina perpendicularmente.",
    pointsToRemember: "Obrigatório virar à esquerda ou à direita adiante."
  },
  'A-9': {
    id: 'A-9',
    code: 'A-9',
    name: "Bifurcação em \"Y\"",
    category: 'advertencia',
    description: "Adverte sobre divisão da via em dois ramos formando um \"Y\".",
    pointsToRemember: "Escolher com antecedência o ramo desejado sinalizando."
  },
  'DEF-01': {
    id: 'DEF-01',
    code: 'DEF-01',
    name: "Use Cinto de Segurança",
    category: 'educativa',
    description: "Placa educativa reforçando o uso obrigatório do cinto de segurança.",
    pointsToRemember: "Obrigatório para todos os ocupantes do veículo (Art. 65 CTB)."
  },
  'R-1': {
    id: 'R-1',
    code: 'R-1',
    name: "Parada Obrigatória (PARE)",
    category: 'regulamentacao',
    description: "Obriga o condutor a parar totalmente o seu veículo antes de entrar ou cruzar a via.",
    pointsToRemember: "Não basta reduzir a marcha; parada TOTAL. Infração gravíssima (7 pontos)."
  },
  'R-10': {
    id: 'R-10',
    code: 'R-10',
    name: "Proibido Trânsito de Veículos Automotores",
    category: 'regulamentacao',
    description: "Proíbe o tráfego de qualquer veículo motorizado na via.",
    pointsToRemember: "Permite apenas veículos de propulsão humana ou tração animal."
  },
  'R-11': {
    id: 'R-11',
    code: 'R-11',
    name: "Proibido Trânsito de Veículos de Tração Animal",
    category: 'regulamentacao',
    description: "Proíbe carroças, charretes e similares.",
    pointsToRemember: "Segurança e fluidez em vias de trânsito rápido e rodovias."
  },
  'R-12': {
    id: 'R-12',
    code: 'R-12',
    name: "Proibido Trânsito de Bicicletas",
    category: 'regulamentacao',
    description: "Proíbe o tráfego de bicicletas na pista.",
    pointsToRemember: "Ciclistas devem desmontar e empurrar pela calçada (equiparados a pedestres)."
  },
  'R-13': {
    id: 'R-13',
    code: 'R-13',
    name: "Proibido Trânsito de Tratores e Máquinas de Obras",
    category: 'regulamentacao',
    description: "Proíbe maquinário pesado na via.",
    pointsToRemember: "Evita retenção de tráfego e acidentes por lentidão extrema."
  },
  'R-14': {
    id: 'R-14',
    code: 'R-14',
    name: "Peso Bruto Total Máximo Permitido",
    category: 'regulamentacao',
    description: "Determina a carga máxima total suportada pela via ou ponte.",
    pointsToRemember: "Infração média com acréscimo proporcional por excesso de peso."
  },
  'R-15': {
    id: 'R-15',
    code: 'R-15',
    name: "Altura Máxima Permitida",
    category: 'regulamentacao',
    description: "Informa o limite máximo de altura para passagem sob viadutos ou túneis.",
    pointsToRemember: "Desrespeito gera dano patrimonial grave e retenção."
  },
  'R-16': {
    id: 'R-16',
    code: 'R-16',
    name: "Largura Máxima Permitida",
    category: 'regulamentacao',
    description: "Indica o limite de largura para tráfego.",
    pointsToRemember: "Comum em pontes estreitas e túneis antigos."
  },
  'R-17': {
    id: 'R-17',
    code: 'R-17',
    name: "Peso Máximo Permitido por Eixo",
    category: 'regulamentacao',
    description: "Regulamenta o peso máximo transmitido ao pavimento por cada eixo.",
    pointsToRemember: "Pesagem obrigatória em balanças rodoviárias do DNIT."
  },
  'R-18': {
    id: 'R-18',
    code: 'R-18',
    name: "Comprimento Máximo Permitido",
    category: 'regulamentacao',
    description: "Informa o comprimento máximo do veículo ou conjunto (rodotrem, cegonha).",
    pointsToRemember: "Evita travamento em curvas acentuadas e travessias urbanas."
  },
  'R-19': {
    id: 'R-19',
    code: 'R-19',
    name: "Velocidade Máxima Permitida",
    category: 'regulamentacao',
    description: "Regulamenta o limite máximo de velocidade para a via ou trecho.",
    pointsToRemember: "Exceder em mais de 50% é infração gravíssima com suspensão direta da CNH."
  },
  'R-2': {
    id: 'R-2',
    code: 'R-2',
    name: "Dê a Preferência",
    category: 'regulamentacao',
    description: "Indica ao condutor a obrigatoriedade de dar preferência aos veículos da via preferencial.",
    pointsToRemember: "Única placa triangular com vértice para baixo. Infração grave (5 pontos)."
  },
  'R-20': {
    id: 'R-20',
    code: 'R-20',
    name: "Proibido Acionar Buzina ou Sinal Sonoro",
    category: 'regulamentacao',
    description: "Proíbe o uso da buzina próximo a hospitais, escolas ou áreas residenciais.",
    pointsToRemember: "Buzinar apenas para evitar acidentes ou fora das áreas urbanas em ultrapassagem."
  },
  'R-21': {
    id: 'R-21',
    code: 'R-21',
    name: "Alfândega",
    category: 'regulamentacao',
    description: "Obriga a parada no posto de fiscalização aduaneira ou fronteiriça.",
    pointsToRemember: "Parada obrigatória para controle fiscal e policial."
  },
  'R-22': {
    id: 'R-22',
    code: 'R-22',
    name: "Uso Obrigatório de Corrente",
    category: 'regulamentacao',
    description: "Obriga o uso de correntes nos pneus motrizes em trechos com neve ou lamaçal.",
    pointsToRemember: "Garante tração e aderência em condições severas."
  },
  'R-23': {
    id: 'R-23',
    code: 'R-23',
    name: "Conserve-se à Direita",
    category: 'regulamentacao',
    description: "Obriga veículos lentos e pesados a transitarem na faixa da direita.",
    pointsToRemember: "Faixa da esquerda é prioritária para veículos em maior velocidade e ultrapassagem."
  },
  'R-24A': {
    id: 'R-24A',
    code: 'R-24A',
    name: "Sentido de Circulação da Via/Pista",
    category: 'regulamentacao',
    description: "Indica o sentido obrigatório de tráfego na pista.",
    pointsToRemember: "Seguir sempre no fluxo da seta."
  },
  'R-24B': {
    id: 'R-24B',
    code: 'R-24B',
    name: "Passagem Obrigatória",
    category: 'regulamentacao',
    description: "Obriga o condutor a passar pelo lado indicado de obstáculo, canteiro ou refúgio.",
    pointsToRemember: "Não passar pelo lado oposto."
  },
  'R-25A': {
    id: 'R-25A',
    code: 'R-25A',
    name: "Vire à Esquerda",
    category: 'regulamentacao',
    description: "Obriga a conversão exclusiva à esquerda na interseção.",
    pointsToRemember: "Proibido seguir em frente."
  },
  'R-25B': {
    id: 'R-25B',
    code: 'R-25B',
    name: "Vire à Direita",
    category: 'regulamentacao',
    description: "Obriga a conversão exclusiva à direita na interseção.",
    pointsToRemember: "Proibido seguir em frente."
  },
  'R-25C': {
    id: 'R-25C',
    code: 'R-25C',
    name: "Siga em Frente ou à Esquerda",
    category: 'regulamentacao',
    description: "Permite apenas seguir em frente ou virar à esquerda.",
    pointsToRemember: "Proibido virar à direita."
  },
  'R-25D': {
    id: 'R-25D',
    code: 'R-25D',
    name: "Siga em Frente ou à Direita",
    category: 'regulamentacao',
    description: "Permite apenas seguir em frente ou virar à direita.",
    pointsToRemember: "Proibido virar à esquerda."
  },
  'R-26': {
    id: 'R-26',
    code: 'R-26',
    name: "Siga em Frente",
    category: 'regulamentacao',
    description: "Obriga o condutor a manter o rumo reto.",
    pointsToRemember: "Proibida qualquer manobra de conversão lateral."
  },
  'R-27': {
    id: 'R-27',
    code: 'R-27',
    name: "Ônibus, Caminhões e Veículos Grandes à Direita",
    category: 'regulamentacao',
    description: "Determina que veículos pesados fiquem exclusivamente na faixa da direita.",
    pointsToRemember: "Infração média."
  },
  'R-28': {
    id: 'R-28',
    code: 'R-28',
    name: "Duplo Sentido de Circulação",
    category: 'regulamentacao',
    description: "Regulamenta que a pista passa a operar em mão dupla.",
    pointsToRemember: "Atenção ao fluxo contrário ao sair de vias de mão única."
  },
  'R-29': {
    id: 'R-29',
    code: 'R-29',
    name: "Proibido Trânsito de Pedestres",
    category: 'regulamentacao',
    description: "Proíbe a circulação de pedestres em vias expressas ou de trânsito rápido.",
    pointsToRemember: "Segurança do pedestre diante da alta velocidade."
  },
  'R-3': {
    id: 'R-3',
    code: 'R-3',
    name: "Sentido Proibido",
    category: 'regulamentacao',
    description: "Proíbe o trânsito de qualquer veículo no sentido indicado.",
    pointsToRemember: "Transitar na contramão de direção em via de sentido único é infração gravíssima."
  },
  'R-30': {
    id: 'R-30',
    code: 'R-30',
    name: "Pedestre, Ande pela Esquerda",
    category: 'regulamentacao',
    description: "Determina que pedestres transitem pelo bordo esquerdo da pista.",
    pointsToRemember: "Pedestre de frente para os carros em vias rurais sem acostamento."
  },
  'R-31': {
    id: 'R-31',
    code: 'R-31',
    name: "Pedestre, Ande pela Direita",
    category: 'regulamentacao',
    description: "Determina que pedestres transitem pelo bordo direito.",
    pointsToRemember: "Conforme regulamentação local específica."
  },
  'R-32': {
    id: 'R-32',
    code: 'R-32',
    name: "Circulação Exclusiva de Ônibus",
    category: 'regulamentacao',
    description: "Determina faixa ou corredor exclusivo para transporte coletivo de passageiros.",
    pointsToRemember: "Transitar em corredor exclusivo de ônibus é infração gravíssima."
  },
  'R-33': {
    id: 'R-33',
    code: 'R-33',
    name: "Sentido de Circulação na Rotatória",
    category: 'regulamentacao',
    description: "Obriga a circulação em sentido anti-horário na praça ou rotatória.",
    pointsToRemember: "Veículo que já está circulando tem prioridade de passagem."
  },
  'R-34': {
    id: 'R-34',
    code: 'R-34',
    name: "Circulação Exclusiva de Bicicletas",
    category: 'regulamentacao',
    description: "Regulamenta ciclovias e ciclofaixas exclusivas para bikes.",
    pointsToRemember: "Carros não podem transitar nem parar nessa faixa."
  },
  'R-35A': {
    id: 'R-35A',
    code: 'R-35A',
    name: "Ciclista, Transite à Esquerda",
    category: 'regulamentacao',
    description: "Obriga ciclistas a transitarem pelo lado esquerdo.",
    pointsToRemember: "Organização do tráfego cicloviário."
  },
  'R-35B': {
    id: 'R-35B',
    code: 'R-35B',
    name: "Ciclista, Transite à Direita",
    category: 'regulamentacao',
    description: "Obriga ciclistas a transitarem pelo lado direito.",
    pointsToRemember: "Organização do tráfego cicloviário."
  },
  'R-36A': {
    id: 'R-36A',
    code: 'R-36A',
    name: "Ciclistas à Esquerda, Pedestres à Direita",
    category: 'regulamentacao',
    description: "Divisão de circulação em calçadas compartilhadas ou passarelas.",
    pointsToRemember: "Respeito mútuo à sinalização vertical."
  },
  'R-36B': {
    id: 'R-36B',
    code: 'R-36B',
    name: "Pedestres à Esquerda, Ciclistas à Direita",
    category: 'regulamentacao',
    description: "Divisão de circulação em calçadas compartilhadas.",
    pointsToRemember: "Respeito mútuo à sinalização vertical."
  },
  'R-37': {
    id: 'R-37',
    code: 'R-37',
    name: "Proibido Trânsito de Motocicletas e Ciclomotores",
    category: 'regulamentacao',
    description: "Proíbe motos, motonetas e ciclomotores.",
    pointsToRemember: "Comum em viadutos e pistas expressas centrais."
  },
  'R-38': {
    id: 'R-38',
    code: 'R-38',
    name: "Proibido Trânsito de Ônibus",
    category: 'regulamentacao',
    description: "Proíbe circulação de ônibus na via.",
    pointsToRemember: "Preserva vias estreitas e residenciais."
  },
  'R-39': {
    id: 'R-39',
    code: 'R-39',
    name: "Circulação Exclusiva de Caminhão",
    category: 'regulamentacao',
    description: "Faixa ou via reservada exclusivamente a veículos de carga.",
    pointsToRemember: "Agiliza transporte logístico e portuário."
  },
  'R-40': {
    id: 'R-40',
    code: 'R-40',
    name: "Trânsito Proibido a Carros de Mão",
    category: 'regulamentacao',
    description: "Proíbe carrinhos de catadores ou de carga manual.",
    pointsToRemember: "Segurança em vias de média e alta velocidade."
  },
  'R-41': {
    id: 'R-41',
    code: 'R-41',
    name: "Cruzamento Rodoferroviário",
    category: 'regulamentacao',
    description: "Regulamenta travessia rodoferroviária.",
    pointsToRemember: "Parada obrigatória antes da linha férrea."
  },
  'R-42A': {
    id: 'R-42A',
    code: 'R-42A',
    name: "Pista Reversível",
    category: 'regulamentacao',
    description: "Indica faixa com fluxo invertido conforme horário de pico.",
    pointsToRemember: "Atenção aos sinais luminosos superiores."
  },
  'R-42B': {
    id: 'R-42B',
    code: 'R-42B',
    name: "Faixa Reversível",
    category: 'regulamentacao',
    description: "Indica faixa reversível na via.",
    pointsToRemember: "Atenção aos horários e balizadores."
  },
  'R-43A': {
    id: 'R-43A',
    code: 'R-43A',
    name: "Sentido Duplo com Ciclovia",
    category: 'regulamentacao',
    description: "Pista com sentido duplo e presença de ciclovia.",
    pointsToRemember: "Cuidado ao realizar manobras transversais."
  },
  'R-43B': {
    id: 'R-43B',
    code: 'R-43B',
    name: "Sentido Único com Ciclovia",
    category: 'regulamentacao',
    description: "Pista com sentido único e presença de ciclovia.",
    pointsToRemember: "Atenção redobrada aos ciclistas."
  },
  'R-44': {
    id: 'R-44',
    code: 'R-44',
    name: "Estacionamento Rotativo",
    category: 'regulamentacao',
    description: "Estacionamento pago por tempo limitado (Zona Azul).",
    pointsToRemember: "Obrigatório cartão ou ativação por aplicativo oficial."
  },
  'R-4A': {
    id: 'R-4A',
    code: 'R-4A',
    name: "Proibido Virar à Esquerda",
    category: 'regulamentacao',
    description: "Proíbe o condutor de realizar a conversão à esquerda.",
    pointsToRemember: "Infração grave (5 pontos)."
  },
  'R-4B': {
    id: 'R-4B',
    code: 'R-4B',
    name: "Proibido Virar à Direita",
    category: 'regulamentacao',
    description: "Proíbe o condutor de realizar a conversão à direita.",
    pointsToRemember: "Infração grave (5 pontos)."
  },
  'R-5A': {
    id: 'R-5A',
    code: 'R-5A',
    name: "Proibido Retornar à Esquerda",
    category: 'regulamentacao',
    description: "Proíbe a manobra de retorno para a pista contrária pela esquerda.",
    pointsToRemember: "Infração gravíssima (7 pontos)."
  },
  'R-5B': {
    id: 'R-5B',
    code: 'R-5B',
    name: "Proibido Retornar à Direita",
    category: 'regulamentacao',
    description: "Proíbe a manobra de retorno para a pista contrária pela direita.",
    pointsToRemember: "Infração gravíssima (7 pontos)."
  },
  'R-6A': {
    id: 'R-6A',
    code: 'R-6A',
    name: "Proibido Estacionar",
    category: 'regulamentacao',
    description: "Proíbe o estacionamento de veículos no trecho regulamentado (parada rápida permitida para embarque/desembarque).",
    pointsToRemember: "Permite parada rápida estritamente pelo tempo necessário para embarque de passageiros."
  },
  'R-6B': {
    id: 'R-6B',
    code: 'R-6B',
    name: "Estacionamento Regulamentado",
    category: 'regulamentacao',
    description: "Regulamenta as condições de estacionamento permitido.",
    pointsToRemember: "Atenção aos horários ou restrições de zona azul na placa adicional."
  },
  'R-6C': {
    id: 'R-6C',
    code: 'R-6C',
    name: "Proibido Parar e Estacionar",
    category: 'regulamentacao',
    description: "Proíbe tanto a parada momentânea quanto o estacionamento de qualquer veículo.",
    pointsToRemember: "Nem mesmo embarque ou desembarque é permitido. Infração grave com remoção do veículo."
  },
  'R-7': {
    id: 'R-7',
    code: 'R-7',
    name: "Proibido Ultrapassar",
    category: 'regulamentacao',
    description: "Proíbe a manobra de ultrapassagem no trecho sinalizado.",
    pointsToRemember: "Infração gravíssima multiplicada por 5. Proíbe ultrapassar pela esquerda e contramão."
  },
  'R-8A': {
    id: 'R-8A',
    code: 'R-8A',
    name: "Proibida Mudança de Faixa da Esquerda para Direita",
    category: 'regulamentacao',
    description: "Proíbe a mudança de faixa no sentido indicado.",
    pointsToRemember: "Infração média."
  },
  'R-8B': {
    id: 'R-8B',
    code: 'R-8B',
    name: "Proibida Mudança de Faixa da Direita para Esquerda",
    category: 'regulamentacao',
    description: "Proíbe a mudança de faixa no sentido indicado.",
    pointsToRemember: "Infração média."
  },
  'R-9': {
    id: 'R-9',
    code: 'R-9',
    name: "Proibido Trânsito de Caminhões",
    category: 'regulamentacao',
    description: "Proíbe o tráfego de veículos de carga do tipo caminhão.",
    pointsToRemember: "Infração média com penalidade de multa."
  },
  'SAU-06': {
    id: 'SAU-06',
    code: 'SAU-06',
    name: "Serviço Telefônico",
    category: 'servicos',
    description: "Indica cabine ou posto telefônico de emergência na rodovia.",
    pointsToRemember: "Disponível para chamadas mecânicas ou de socorro."
  },
  'SAU-08': {
    id: 'SAU-08',
    code: 'SAU-08',
    name: "Borracheiro",
    category: 'servicos',
    description: "Serviço de conserto de pneus e vulcanização nas proximidades.",
    pointsToRemember: "Apoio em caso de pneu furado."
  },
  'SAU-09': {
    id: 'SAU-09',
    code: 'SAU-09',
    name: "Posto de Abastecimento",
    category: 'servicos',
    description: "Posto de combustível (gasolina, etanol, diesel, GNV).",
    pointsToRemember: "Planeje paradas para evitar pane seca (infração média)."
  },
  'SAU-10': {
    id: 'SAU-10',
    code: 'SAU-10',
    name: "Pronto-Socorro / Hospital",
    category: 'servicos',
    description: "Unidade médica hospitalar com atendimento de emergência.",
    pointsToRemember: "Atendimento a vítimas de sinistros e mal súbito."
  },
  'SAU-12': {
    id: 'SAU-12',
    code: 'SAU-12',
    name: "Restaurante",
    category: 'servicos',
    description: "Ponto de alimentação para motoristas em viagem.",
    pointsToRemember: "Alimentação e hidratação para evitar fadiga ao volante."
  },
  'SAU-13': {
    id: 'SAU-13',
    code: 'SAU-13',
    name: "Hotel / Pousada",
    category: 'servicos',
    description: "Pousada ou hospedagem para descanso de longa viagem.",
    pointsToRemember: "Não dirija com sono; a cada 2h de viagem faça uma pausa."
  },
  'SAU-18': {
    id: 'SAU-18',
    code: 'SAU-18',
    name: "Ponto de Parada de Ônibus",
    category: 'servicos',
    description: "Ponto sinalizado para embarque e desembarque de transporte rodoviário.",
    pointsToRemember: "Atenção a passageiros atravessando."
  },
  'SAU-19': {
    id: 'SAU-19',
    code: 'SAU-19',
    name: "Estacionamento de Trailer",
    category: 'servicos',
    description: "Área própria para camping e estacionamento de motorhomes.",
    pointsToRemember: "Espaço seguro com ponto de energia e água."
  },
  'SAU-21': {
    id: 'SAU-21',
    code: 'SAU-21',
    name: "Transporte sobre Água (Balsa)",
    category: 'servicos',
    description: "Travessia aquaviária por balsa ou ferry-boat.",
    pointsToRemember: "Embarque com marcha engrenada e freio de mão acionado."
  },
  'SAU-26': {
    id: 'SAU-26',
    code: 'SAU-26',
    name: "Ponto de Táxi",
    category: 'servicos',
    description: "Local regulamentado para parada de táxis credenciados.",
    pointsToRemember: "Embarque rápido de passageiros."
  },
  'TAR-03': {
    id: 'TAR-03',
    code: 'TAR-03',
    name: "Patrimônio Natural",
    category: 'turismo',
    description: "Indica cachoeira, serra ou monumento geológico natural.",
    pointsToRemember: "Sinalização marrom oficial de turismo."
  },
  'THC-05': {
    id: 'THC-05',
    code: 'THC-05',
    name: "Patrimônio Histórico e Cultural",
    category: 'turismo',
    description: "Indica centro histórico, museu ou edificação tombada.",
    pointsToRemember: "Sinalização marrom oficial do CONTRAN."
  },
  'THC-11': {
    id: 'THC-11',
    code: 'THC-11',
    name: "Centro de Cultura",
    category: 'turismo',
    description: "Teatro ou memorial cultural na região.",
    pointsToRemember: "Sinalização turística e cultural."
  },
  'TNA-05': {
    id: 'TNA-05',
    code: 'TNA-05',
    name: "Parque Nacional / Reserva",
    category: 'turismo',
    description: "Entrada de área protegida de preservação ambiental.",
    pointsToRemember: "Velocidade controlada e proibição de descarte de lixo."
  },
  'TNA-06': {
    id: 'TNA-06',
    code: 'TNA-06',
    name: "Mirante",
    category: 'turismo',
    description: "Ponto panorâmico elevado para contemplação segura.",
    pointsToRemember: "Área com recuo para parada e fotos."
  },
};
