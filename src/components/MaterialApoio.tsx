import React, { useState } from 'react';
import { 
  Lightbulb, 
  ArrowRight,
  Maximize2,
  X,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { TrafficSignComponent } from './TrafficSign';
import { VisualIllustration, IllustrationType } from './VisualIllustrations';
import { sounds } from '../utils/sound';

interface MaterialApoioProps {
  onGoToSimulado?: () => void;
}

interface VisualGuideItem {
  id: string;
  title: string;
  category: 'mecanica' | 'vias' | 'placas' | 'defensiva';
  illustrationType?: IllustrationType;
  signId?: string;
  description: string;
  ctbRule: string;
  badge: string;
}

export const MaterialApoio: React.FC<MaterialApoioProps> = ({ onGoToSimulado }) => {
  const [activeCategory, setActiveCategory] = useState<'mecanica' | 'vias' | 'placas' | 'defensiva'>('mecanica');
  const [selectedZoomItem, setSelectedZoomItem] = useState<VisualGuideItem | null>(null);

  // 1. VISUAL GUIDES DATABASE WITH RICH IMAGES
  const visualGuides: Record<'mecanica' | 'vias' | 'placas' | 'defensiva', VisualGuideItem[]> = {
    mecanica: [
      {
        id: 'mec-motor',
        title: 'Motor de 4 Tempos (Ciclo Otto)',
        category: 'mecanica',
        illustrationType: 'motor-4-tempos',
        badge: 'Coração do Veículo',
        description: 'O motor a combustão funciona em 4 fases contínuas: 1. Admissão (pistão desce e puxa ar/combustível), 2. Compressão (pistão sobe e comprime a mistura), 3. Combustão/Explosão (vela solta centelha e gera força), 4. Escape (pistão sobe expulsando os gases queimados).',
        ctbRule: 'Apenas no 3º tempo (Combustão) é gerada energia motriz que movimenta as rodas do automóvel.'
      },
      {
        id: 'mec-radiador',
        title: 'Sistema de Arrefecimento & Radiador',
        category: 'mecanica',
        illustrationType: 'radiador',
        badge: 'Controle Térmico',
        description: 'Mantém o motor na temperatura ideal (entre 90°C e 100°C). Composto por Radiador, Ventoinha elétrica, Bomba d\'água, Válvula Termostática e Reservatório de expansão.',
        ctbRule: 'Utiliza líquido de arrefecimento: mistura de água desmineralizada com 50% de aditivo etilenoglicol. Nunca abra o reservatório com motor quente!'
      },
      {
        id: 'mec-freios',
        title: 'Freios a Disco, Pastilhas e Sistema ABS',
        category: 'mecanica',
        illustrationType: 'freios',
        badge: 'Segurança Ativa',
        description: 'Freio de serviço atua hidraulicamente nas 4 rodas. O sistema ABS (Antilock Braking System) evita o travamento das rodas durante frenagens bruscas de pânico, permitindo que o condutor continue desviando de obstáculos.',
        ctbRule: 'Em carros com ABS, pise no pedal com força total e mantenha pressionado sem bombear o pedal.'
      },
      {
        id: 'mec-bateria',
        title: 'Bateria 12V & Alternador',
        category: 'mecanica',
        illustrationType: 'bateria',
        badge: 'Sistema Elétrico',
        description: 'A bateria armazena energia química para dar a partida inicial no motor e alimentar os acessórios com o carro desligado. Quando o motor funciona, quem gera energia e recarrega a bateria é o ALTERNADOR.',
        ctbRule: 'Se a luz da bateria acender com o motor em movimento, o defeito é no ALTERNADOR (correia partida ou circuito defeituoso).'
      },
      {
        id: 'mec-pneu',
        title: 'Pneu & Indicador TWI (1,6 mm)',
        category: 'mecanica',
        illustrationType: 'pneu-twi',
        badge: 'Contato com o Solo',
        description: 'Os sulcos do pneu escoam a água para evitar a perda de aderência. No fundo dos sulcos existem pequenos ressaltos de borracha chamados TWI (Tread Wear Indicator).',
        ctbRule: 'O limite mínimo legal de profundidade dos sulcos é de 1,6 milímetros (Res. CONTRAN 913). Pneu abaixo disso é considerado "careca": infração grave e retenção do veículo.'
      },
      {
        id: 'mec-luzes-oleo',
        title: 'Luz da Pressão do Óleo (Almotolia Vermelha)',
        category: 'mecanica',
        illustrationType: 'luz-oleo',
        badge: 'Alerta Crítico',
        description: 'Indica queda perigosa na pressão de lubrificação do motor. Sem óleo sob pressão, as peças metálicas entram em atrito direto e o motor funde em poucos minutos.',
        ctbRule: 'Se acender em trânsito: pare o veículo no acostamento com segurança e desligue a chave de ignição imediatamente.'
      },
      {
        id: 'mec-luzes-bat',
        title: 'Luz da Bateria / Alternador (Vermelha)',
        category: 'mecanica',
        illustrationType: 'luz-bateria',
        badge: 'Alerta Elétrico',
        description: 'Indica falha no carregamento. O veículo está rodando consumindo apenas a reserva da bateria, que se esgotará rapidamente.',
        ctbRule: 'Desligue consumidores de energia dispensáveis (faróis de milha, ar-condicionado, multimídia) e dirija-se a uma oficina.'
      },
      {
        id: 'mec-luzes-temp',
        title: 'Luz de Temperatura do Motor (Vermelha)',
        category: 'mecanica',
        illustrationType: 'luz-temperatura',
        badge: 'Superaquecimento',
        description: 'Indica que a temperatura do líquido de arrefecimento ultrapassou o limite seguro. Risco imediato de queima da junta do cabeçote ou empenamento do bloco.',
        ctbRule: 'Pare o carro imediatamente. Aguarde esfriar completamente antes de verificar o nível do líquido.'
      },
      {
        id: 'mec-luzes-inj',
        title: 'Luz da Injeção Eletrônica (Amarela/Âmbar)',
        category: 'mecanica',
        illustrationType: 'luz-injecao',
        badge: 'Alerta de Revisão',
        description: 'Luz amarela/âmbar indica anomalia no sistema de injeção eletrônica de combustível ou emissão de poluentes. Permite que o veículo continue rodando em modo de segurança.',
        ctbRule: 'Procure uma oficina especializada para diagnóstico computadorizado com scanner automotivo.'
      }
    ],

    vias: [
      {
        id: 'via-rapida',
        title: 'Via de Trânsito Rápido (80 km/h)',
        category: 'vias',
        illustrationType: 'via-transito-rapido',
        badge: 'Art. 61 CTB',
        description: 'Via caracterizada por acessos especiais com trânsito livre, sem interseções em nível, sem semáforos nem travessia de pedestres em nível. Pistas separadas por canteiro central.',
        ctbRule: 'Velocidade máxima sem sinalização: 80 km/h. É proibido estacionar ou circular com bicicletas ou veículos de tração animal.'
      },
      {
        id: 'via-arterial',
        title: 'Via Arterial (60 km/h)',
        category: 'vias',
        illustrationType: 'via-arterial',
        badge: 'Art. 61 CTB',
        description: 'Avenidas e vias principais que conectam diferentes regiões de um município. Possui interseções em nível geralmente controladas por semáforos e faixas de pedestres.',
        ctbRule: 'Velocidade máxima sem sinalização: 60 km/h. Tem prioridade de fluxo sobre as vias coletoras e locais que nela desembocam.'
      },
      {
        id: 'via-cruzamento',
        title: 'Cruzamento não Sinalizado: Regra da Direita',
        category: 'vias',
        illustrationType: 'cruzamento-direita',
        badge: 'Regra de Ouro CTB',
        description: 'Em cruzamentos sem semáforo ou placas de parada/preferência, a prioridade de passagem pertence obrigatoriamente ao veículo que se aproxima pela DIREITA do condutor.',
        ctbRule: 'Art. 29, III, "c" do CTB: Não importa quem está mais rápido ou em via mais larga; se não há placas, quem vem pela direita passa primeiro!'
      },
      {
        id: 'via-rotatoria',
        title: 'Rotatórias: Prioridade de Circulação',
        category: 'vias',
        illustrationType: 'rotatoria',
        badge: 'Art. 29 CTB',
        description: 'Nos trevos e rotatórias onde não houver sinalização semafórica ou placas específicas, a preferência de passagem pertence àquele veículo que já estiver circulando por ela.',
        ctbRule: 'O condutor que for entrar na rotatória deve sempre desacelerar ou parar e dar preferência a quem já está no anel viário.'
      }
    ],

    placas: [
      {
        id: 'plc-r1',
        title: 'Placa R-1: Parada Obrigatória',
        category: 'placas',
        signId: 'R-1',
        badge: 'Regulamentação',
        description: 'Única placa de trânsito em formato octogonal (8 lados) com fundo vermelho e letras brancas. Exige imobilização TOTAL e completa das rodas do veículo antes da linha de retenção.',
        ctbRule: 'Art. 208 do CTB: Desobedecer a placa R-1 é INFRAÇÃO GRAVÍSSIMA (7 pontos na CNH). Reduzir a velocidade não é suficiente!'
      },
      {
        id: 'plc-r2',
        title: 'Placa R-2: Dê a Preferência',
        category: 'placas',
        signId: 'R-2',
        badge: 'Regulamentação',
        description: 'Única placa em formato triangular com vértice voltado para baixo. Obriga o condutor a ceder passagem aos veículos que transitam pela via transversal preferencial.',
        ctbRule: 'Não exige parada completa se a via transversal estiver totalmente desimpedida, mas exige redução cautelosa da marcha.'
      },
      {
        id: 'plc-a1a',
        title: 'Placa A-1A: Curva Acentuada à Esquerda',
        category: 'placas',
        signId: 'A-1A',
        badge: 'Advertência',
        description: 'Placa quadrada em losango amarelo. Adverte antecipadamente ao condutor sobre a existência de uma curva de raio muito fechado à esquerda.',
        ctbRule: 'Placas de advertência alertam sobre perigos potenciais. Diante da A-1A, reduza a marcha antes de entrar na curva para evitar saída de pista.'
      },
      {
        id: 'plc-a15',
        title: 'Placa A-15: Parada Obrigatória à Frente',
        category: 'placas',
        signId: 'A-15',
        badge: 'Advertência',
        description: 'Adverte a aproximação de um cruzamento ou interseção onde existe uma placa de parada regulamentada (R-1) à frente.',
        ctbRule: 'Permite ao condutor preparar a frenagem suave com antecedência, evitando freadas bruscas de pânico.'
      },
      {
        id: 'plc-a21a',
        title: 'Placa A-21A: Estreitamento de Pista ao Centro',
        category: 'placas',
        signId: 'A-21A',
        badge: 'Advertência',
        description: 'Adverte que a pista de rolamento vai sofrer estreitamento em ambos os lados (esquerdo e direito), afunilando o tráfego.',
        ctbRule: 'Reduza a velocidade e pratique direção defensiva facilitando o revezamento de passagem dos veículos.'
      },
      {
        id: 'plc-a32a',
        title: 'Placa A-32A: Passagem Sinalizada de Pedestres',
        category: 'placas',
        signId: 'A-32A',
        badge: 'Advertência',
        description: 'Adverte sobre a existência de faixa de pedestres sinalizada à frente na via.',
        ctbRule: 'O pedestre tem prioridade absoluta na faixa sem semáforo. Deixar de dar preferência é infração gravíssima (Art. 214).'
      }
    ],

    defensiva: [
      {
        id: 'def-aquaplanagem',
        title: 'Aquaplanagem ou Hidroplanagem',
        category: 'defensiva',
        illustrationType: 'pneu-twi',
        badge: 'Condição Adversa',
        description: 'Perda total de contato dos pneus com o asfalto provocada por uma fina lâmina d\'água sobre a pista. O veículo passa a "flutuar" sem controle de direção ou frenagem.',
        ctbRule: 'O que fazer: tire suavemente o pé do acelerador e segure firme a direção em linha reta. NUNCA pise no freio bruscamente nem puxe o volante!'
      },
      {
        id: 'def-regra-2s',
        title: 'Regra dos 2 Segundos (Distância de Seguimento)',
        category: 'defensiva',
        badge: 'Distância de Segurança',
        description: 'Método prático para garantir espaço suficiente de parada em relação ao veículo da frente. Escolha um ponto fixo (árvore ou placa) e conte "cinquenta e um, cinquenta e dois" após o carro da frente passar por ele.',
        ctbRule: 'Se você atingir o ponto de referência antes de terminar a contagem, aumente a distância. Em caso de chuva ou neblina, dobre para 4 segundos!'
      }
    ]
  };

  const currentItems = visualGuides[activeCategory];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 select-none font-sans">
      
      {/* 1. DUOLINGO STYLE HERO BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#143224] via-[#12282e] to-[#182631] border-2 border-emerald-500/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden mb-8 group">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider mb-3 border border-emerald-500/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Central Visual do CTB</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            Guias Visuais & Mecânica Básica
          </h2>

          <p className="text-sm sm:text-base font-semibold text-slate-300 mt-2 leading-relaxed">
            Consulte diagramas detalhados do motor, sistema de arrefecimento, freios ABS, velocidades das vias urbanas e placas oficiais do CONTRAN.
          </p>

          {onGoToSimulado && (
            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onGoToSimulado();
                }}
                className="px-6 py-3.5 rounded-2xl duo-btn-yellow font-black text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105 active:translate-y-0.5 transition-all"
              >
                <span>Treinar nos Simulados</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mascot / Book Icon Container */}
        <div className="relative z-10 shrink-0 flex items-center justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-2xl flex items-center justify-center border-4 border-emerald-400/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#182631] rounded-[22px] flex items-center justify-center text-5xl">
              <BookOpen className="w-16 h-16 text-emerald-400 drop-shadow-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR PILLS (DUOLINGO TABS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveCategory('mecanica');
          }}
          className={`p-4 rounded-3xl border-2 font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeCategory === 'mecanica'
              ? 'bg-[#1a384b] border-[#1cb0f6] text-white shadow-lg translate-y-[-2px]'
              : 'bg-[#182631] border-[#2b3e4e] text-slate-400 hover:text-white hover:border-slate-500'
          }`}
        >
          <span className="text-lg">🔧</span>
          <span>Mecânica Básica</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveCategory('vias');
          }}
          className={`p-4 rounded-3xl border-2 font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeCategory === 'vias'
              ? 'bg-[#1a384b] border-[#1cb0f6] text-white shadow-lg translate-y-[-2px]'
              : 'bg-[#182631] border-[#2b3e4e] text-slate-400 hover:text-white hover:border-slate-500'
          }`}
        >
          <span className="text-lg">🛣️</span>
          <span>Vias & Regras</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveCategory('placas');
          }}
          className={`p-4 rounded-3xl border-2 font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeCategory === 'placas'
              ? 'bg-[#1a384b] border-[#1cb0f6] text-white shadow-lg translate-y-[-2px]'
              : 'bg-[#182631] border-[#2b3e4e] text-slate-400 hover:text-white hover:border-slate-500'
          }`}
        >
          <span className="text-lg">🛑</span>
          <span>Placas Oficiais</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveCategory('defensiva');
          }}
          className={`p-4 rounded-3xl border-2 font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeCategory === 'defensiva'
              ? 'bg-[#1a384b] border-[#1cb0f6] text-white shadow-lg translate-y-[-2px]'
              : 'bg-[#182631] border-[#2b3e4e] text-slate-400 hover:text-white hover:border-slate-500'
          }`}
        >
          <span className="text-lg">🛡️</span>
          <span>Direção Defensiva</span>
        </button>
      </div>

      {/* 3. VISUAL CARDS GRID (DUOLINGO CARD FORMAT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] hover:border-[#1cb0f6] p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all group"
          >
            <div>
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {item.badge}
                </span>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedZoomItem(item);
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Ampliar ilustração"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Illustration / Plate Container */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  setSelectedZoomItem(item);
                }}
                className="w-full min-h-[170px] bg-[#131f24] rounded-2xl border border-slate-700/80 p-4 mb-4 flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform shadow-inner"
              >
                {item.illustrationType && (
                  <VisualIllustration type={item.illustrationType} size="md" />
                )}
                {item.signId && (
                  <TrafficSignComponent signId={item.signId} size={110} />
                )}
                {!item.illustrationType && !item.signId && (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <span className="text-5xl mb-2">⏱️</span>
                    <span className="text-sm font-black text-amber-400">Regra dos 2 Segundos</span>
                    <span className="text-xs text-slate-400 mt-1">"Cinquenta e um... Cinquenta e dois..."</span>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#1cb0f6] transition-colors leading-snug mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* CTB Rule / Exam Tip Box */}
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wide mb-0.5">
                  Regra do DETRAN (CTB):
                </span>
                <span>{item.ctbRule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. FULL-SCREEN ZOOM MODAL FOR DIAGRAMS */}
      {selectedZoomItem && (
        <div 
          onClick={() => setSelectedZoomItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#182631] border-2 border-slate-600 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedZoomItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block mb-3">
              {selectedZoomItem.badge}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              {selectedZoomItem.title}
            </h2>

            {/* Zoomed illustration */}
            <div className="w-full bg-[#131f24] rounded-2xl border border-slate-700 p-6 flex items-center justify-center mb-6">
              {selectedZoomItem.illustrationType && (
                <VisualIllustration type={selectedZoomItem.illustrationType} size="lg" showCaption />
              )}
              {selectedZoomItem.signId && (
                <div className="flex flex-col items-center gap-3">
                  <TrafficSignComponent signId={selectedZoomItem.signId} size={160} />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Placa Oficial CONTRAN: {selectedZoomItem.signId}
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-200 leading-relaxed mb-4">
              {selectedZoomItem.description}
            </p>

            <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/50 text-amber-100 text-xs sm:text-sm font-semibold flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-black text-amber-300 block text-xs uppercase tracking-wide mb-0.5">
                  Regra do Código de Trânsito Brasileiro (CTB):
                </strong>
                <span>{selectedZoomItem.ctbRule}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
