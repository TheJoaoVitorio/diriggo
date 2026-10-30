import { TrafficSign } from '../types';

export const TRAFFIC_SIGNS: Record<string, TrafficSign> = {
  'R-1': {
    id: 'R-1',
    code: 'R-1',
    name: 'Parada Obrigatória (PARE)',
    category: 'regulamentacao',
    description: 'Obriga o condutor a parar totalmente o seu veículo antes de entrar ou cruzar a via.',
    pointsToRemember: 'Não basta reduzir a marcha; é parada TOTAL do veículo. Desrespeito é infração gravíssima (7 pontos).'
  },
  'R-2': {
    id: 'R-2',
    code: 'R-2',
    name: 'Dê a Preferência',
    category: 'regulamentacao',
    description: 'Indica ao condutor a obrigatoriedade de dar preferência de passagem aos veículos que circulam pela via preferencial.',
    pointsToRemember: 'Única placa triangular de regulamentação (com vértice voltado para baixo). Infração grave (5 pontos).'
  },
  'R-3': {
    id: 'R-3',
    code: 'R-3',
    name: 'Sentido Proibido',
    category: 'regulamentacao',
    description: 'Proíbe o trânsito de qualquer veículo no sentido indicado.',
    pointsToRemember: 'Entrar na contramão de direção em via de sentido único é infração gravíssima.'
  },
  'R-4a': {
    id: 'R-4a',
    code: 'R-4a',
    name: 'Proibido Virar à Esquerda',
    category: 'regulamentacao',
    description: 'Proíbe o condutor de realizar a conversão à esquerda no local indicado.',
    pointsToRemember: 'Infração grave (5 pontos).'
  },
  'R-19': {
    id: 'R-19',
    code: 'R-19',
    name: 'Velocidade Máxima Permitida',
    category: 'regulamentacao',
    description: 'Regulamenta o limite máximo de velocidade permitida para a via ou trecho.',
    pointsToRemember: 'Exceder em mais de 50% é infração gravíssima com suspensão direta do direito de dirigir.'
  },
  'A-1a': {
    id: 'A-1a',
    code: 'A-1a',
    name: 'Curva Acentuada à Esquerda',
    category: 'advertencia',
    description: 'Adverte o condutor sobre a existência de uma curva perigosa e fechada para o lado esquerdo.',
    pointsToRemember: 'Reduzir a velocidade ANTES de entrar na curva; nunca frear bruscamente no ápice da curva.'
  },
  'A-15': {
    id: 'A-15',
    code: 'A-15',
    name: 'Parada Obrigatória à Frente',
    category: 'advertencia',
    description: 'Adverte o condutor de que logo à frente haverá uma placa R-1 (Parada Obrigatória).',
    pointsToRemember: 'Permite reduzir com antecedência a velocidade, evitando frenagens bruscas.'
  },
  'A-32a': {
    id: 'A-32a',
    code: 'A-32a',
    name: 'Passagem Sinalizada de Pedestres',
    category: 'advertencia',
    description: 'Alerta sobre a existência de faixa de pedestres adiante na via.',
    pointsToRemember: 'O pedestre tem prioridade absoluta na faixa quando não houver semáforo.'
  },
  'A-33a': {
    id: 'A-33a',
    code: 'A-33a',
    name: 'Área Escolar',
    category: 'advertencia',
    description: 'Adverte sobre a proximidade de colégios, creches e travessia frequente de crianças.',
    pointsToRemember: 'Atenção redobrada e velocidade reduzida. Crianças possuem reações imprevisíveis.'
  },
  'A-28': {
    id: 'A-28',
    code: 'A-28',
    name: 'Pista Escorregadia',
    category: 'advertencia',
    description: 'Adverte que a pista pode se tornar perigosamente escorregadia por óleo, chuva ou materiais soltos.',
    pointsToRemember: 'Aumentar a distância de seguimento e evitar manobras bruscas.'
  }
};
