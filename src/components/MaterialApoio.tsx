import React, { useState } from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface MaterialApoioProps {
  onGoToSimulado?: () => void;
}

interface TopicStudy {
  id: string;
  name: string;
  icon: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  detranTrap: string;
  stats?: { value: string; label: string }[];
}

export const MaterialApoio: React.FC<MaterialApoioProps> = ({ onGoToSimulado }) => {
  const [selectedTopicId, setSelectedTopicId] = useState('legislacao');

  const topics: TopicStudy[] = [
    {
      id: 'legislacao',
      name: 'Legislação de Trânsito',
      icon: '⚖️',
      badge: '12 QUESTÕES NA PROVA',
      summary: 'Baseado na Lei Federal nº 9.503/1997 (CTB). Disciplina a circulação, prioridades, classificação das vias e o sistema de pontuação e infrações.',
      keyPoints: [
        'Vias Urbanas sem sinalização: Trânsito Rápido (80 km/h), Arterial (60 km/h), Coletora (40 km/h), Local (30 km/h).',
        'Vias Rurais sem sinalização: Rodovias de pista dupla (110 km/h para carros), pista simples (100 km/h) e Estradas de terra (60 km/h).',
        'Preferência em cruzamentos não sinalizados: sempre do veículo que se aproxima pela DIREITA do condutor.',
        'Preferência em rotatórias: sempre do veículo que já está circulando por ela.',
        'Pontuação das Infrações: Leve (3 pts), Média (4 pts), Grave (5 pts), Gravíssima (7 pts).',
        'Limite de Pontos para Suspensão da CNH: 20 pts (com 2+ gravíssimas), 30 pts (com 1 gravíssima) ou 40 pts (sem nenhuma gravíssima).'
      ],
      detranTrap: 'Em cruzamento não sinalizado com rodovia, a preferência é do veículo na rodovia. Mas entre ruas comuns perpendiculares, a regra é SEMPRE a preferência de quem vem pela direita!',
      stats: [
        { value: '80 km/h', label: 'Trânsito Rápido' },
        { value: '60 km/h', label: 'Arterial' },
        { value: '40 km/h', label: 'Coletora' },
        { value: '30 km/h', label: 'Local' }
      ]
    },
    {
      id: 'defensiva',
      name: 'Direção Defensiva',
      icon: '🛡️',
      badge: '10 QUESTÕES NA PROVA',
      summary: 'Conjunto de procedimentos que permite ao condutor evitar sinistros, apesar das ações incorretas dos outros e das condições adversas das vias.',
      keyPoints: [
        'Os 5 Elementos da Direção Defensiva: Conhecimento, Atenção, Previsão, Decisão e Habilidade.',
        'Condições Adversas (6 tipos): Iluminação, Tempo/Clima, Via, Trânsito, Veículo e Condutor.',
        'Distância de Segurança (Regra dos 2 Segundos): escolha um ponto fixo de referência e conte "cinquenta e um, cinquenta e dois".',
        'Aquaplanagem (ou Hidroplanagem): perda total de contato dos pneus com o asfalto devido a uma lâmina d’água.',
        'O que fazer na aquaplanagem: tirar suavemente o pé do acelerador e manter o volante reto. NUNCA pisar bruscamente no freio nem girar o volante.'
      ],
      detranTrap: 'Se o veículo começar a aquaplanar, a resposta correta da prova é JAMAIS frear bruscamente. Deve-se apenas desacelerar e segurar firme a direção.',
      stats: [
        { value: '2 seg', label: 'Distância Mínima' },
        { value: '1,6 mm', label: 'Sulco do Pneu' }
      ]
    },
    {
      id: 'socorros',
      name: 'Primeiros Socorros',
      icon: '🩹',
      badge: '3 A 4 QUESTÕES',
      summary: 'Ações de emergência tomadas no local do sinistro antes da chegada do atendimento médico profissional (SAMU 192 ou Bombeiros 193).',
      keyPoints: [
        'Ordem Obrigatória: 1º Garantir a segurança do local (sinalizar com triângulo e galhos) -> 2º Acionar o resgate especializado (192 / 193) -> 3º Prestar apoio sem agravar lesões.',
        'Distância do Triângulo: Em pista seca a 80 km/h, sinalizar a no mínimo 80 passos longos. Se houver chuva ou neblina, DOBRAR a distância!',
        'O que NUNCA fazer: Nunca retirar o capacete de motociclista acidentado.',
        'Nunca dar líquidos, alimentos ou remédios para vítimas de sinistros de trânsito.',
        'Nunca movimentar vítimas com suspeita de fratura ou trauma na coluna cervical.'
      ],
      detranTrap: 'Na prova, qualquer alternativa que sugira "dar água para a vítima", "fazer torniquete" ou "remover o capacete" é INCORRETA!',
      stats: [
        { value: '192', label: 'SAMU' },
        { value: '193', label: 'Bombeiros' },
        { value: '190', label: 'Polícia' }
      ]
    },
    {
      id: 'ambiente',
      name: 'Meio Ambiente & Cidadania',
      icon: '🌳',
      badge: '3 A 4 QUESTÕES',
      summary: 'Impacto dos veículos automotores na atmosfera, controle de ruídos e convivência respeitosa e harmoniosa entre condutores, pedestres e ciclistas.',
      keyPoints: [
        'Gases Poluentes: Monóxido de Carbono (CO) é incolor, inodoro e altamente tóxico (asfixiante).',
        'Catalisador: Equipamento do escapamento obrigatório para transformar gases tóxicos em substâncias menos nocivas.',
        'PROCONVE: Programa de Controle da Poluição do Ar por Veículos Automotores.',
        'Poluição Sonora: Medida em decibéis (dB). Sons acima de 80 dB causam estresse e perda auditiva progressiva.',
        'Distância Lateral do Ciclista: Ao ultrapassar ciclistas, o condutor deve manter a distância mínima lateral de 1,5 metro (Art. 201 CTB).'
      ],
      detranTrap: 'A distância lateral obrigatória para ultrapassar ciclistas é exatamente 1,5 metro (um metro e meio). Cai com frequência nas provas!',
      stats: [
        { value: '1,5 m', label: 'Distância do Ciclista' },
        { value: 'CO', label: 'Gás Inodoro e Tóxico' }
      ]
    },
    {
      id: 'mecanica',
      name: 'Mecânica Básica',
      icon: '🔧',
      badge: '2 A 3 QUESTÕES',
      summary: 'Noções fundamentais sobre os sistemas do veículo para garantir a manutenção preventiva e a segurança operacional.',
      keyPoints: [
        'Painel de Instrumentos: Luzes vermelhas indicam emergência e exigem parada imediata (pressão do óleo, bateria, temperatura).',
        'Sistema de Lubrificação: A luz da lâmpada de óleo indica baixa pressão no sistema (risco de fundir o motor).',
        'Sistema de Arrefecimento: Mantém o motor na temperatura ideal com líquido de arrefecimento (água desmineralizada + aditivo etilenoglicol).',
        'Pneus e TWI: O limite mínimo legal de profundidade dos sulcos é de 1,6 mm. Pneus "carecas" são infração grave.',
        'Freios: Freio de serviço atua nas 4 rodas (hidráulico). Freio de estacionamento (freio de mão) atua nas rodas traseiras (mecânico/a cabo).'
      ],
      detranTrap: 'Se a luz vermelha da bateria acender com o carro em movimento, o problema NÃO é que a bateria descarregou, mas sim que o ALTERNADOR parou de gerar energia!',
      stats: [
        { value: '1,6 mm', label: 'Profundidade Mínima' },
        { value: 'ABS', label: 'Antitravamento' }
      ]
    }
  ];

  const currentTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 select-none">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center text-lg font-black shadow-xs shrink-0">
            📚
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Material de Apoio Didático
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Guias resumidos, regras essenciais do CTB e pegadinhas frequentes de cada disciplina.
            </p>
          </div>
        </div>
      </div>

      {/* Topics Horizontal Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-5 no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {topics.map(t => {
          const isSelected = t.id === selectedTopicId;

          return (
            <button
              key={t.id}
              onClick={() => {
                sounds.playClick();
                setSelectedTopicId(t.id);
              }}
              className={`px-3 py-2 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 dark:border-amber-500 text-amber-900 dark:text-amber-300 shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Topic Detail Sheet */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
        {/* Topic Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">{currentTopic.icon}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                {currentTopic.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {currentTopic.name}
              </h2>
            </div>
          </div>

          {onGoToSimulado && (
            <button
              onClick={onGoToSimulado}
              className="px-3 py-2 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs self-start sm:self-auto flex items-center gap-1.5"
            >
              <span>Praticar este Tópico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Overview Summary */}
        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          {currentTopic.summary}
        </p>

        {/* Stat badges if available */}
        {currentTopic.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
            {currentTopic.stats.map((s, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
              >
                <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 block">
                  {s.value}
                </span>
                <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Key Points (Checklist) */}
        <div className="space-y-2 mb-5">
          <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 block">
            Pontos Cruciais para Memorizar:
          </h3>
          {currentTopic.keyPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* DETRAN Trap Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Pegadinha Frequente na Prova do DETRAN:
            </h4>
          </div>
          <p className="text-xs font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
            {currentTopic.detranTrap}
          </p>
        </div>
      </div>
    </div>
  );
};
