import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Sparkles,
  Trophy,
  History,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Question, UserProfile, QuestionTopic } from '../types';
import { ALL_QUESTIONS } from '../data/questions';
import { sounds } from '../utils/sound';

interface SimuladosHubProps {
  profile: UserProfile;
  onLaunchSimulado: (questions: Question[], title: string, timeMinutes: number) => void;
  onStartPlacasQuiz?: () => void;
}

interface SimuladoCardConfig {
  id: string;
  title: string;
  desc: string;
  topic?: QuestionTopic | 'signs' | 'all';
  questionCount: number;
  timeMinutes: number;
  icon: string;
  badge: string;
  badgeColor: string;
  iconBg: string;
}

export const SimuladosHub: React.FC<SimuladosHubProps> = ({
  profile,
  onLaunchSimulado,
  onStartPlacasQuiz
}) => {
  const [activeTab, setActiveTab] = useState<'simulados' | 'historico'>('simulados');

  const configs: SimuladoCardConfig[] = [
    {
      id: 'leg',
      title: 'Legislação de Trânsito',
      desc: 'Normas de circulação, conduta, hierarquia das leis, penalidades, medidas administrativas e artigos mais cobrados do CTB.',
      topic: 'legislation',
      questionCount: 12,
      timeMinutes: 15,
      icon: '🚦',
      badge: '12 QUESTÕES',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    },
    {
      id: 'def',
      title: 'Direção Defensiva',
      desc: 'Condições adversas (iluminação, tempo, via, trânsito, veículo e condutor), prevenção de sinistros e aquaplanagem.',
      topic: 'defensive_driving',
      questionCount: 10,
      timeMinutes: 15,
      icon: '🛡️',
      badge: '10 QUESTÕES',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'pla',
      title: 'Placas & Sinalização Viária',
      desc: 'Foco intensivo em placas de Regulamentação (R-*), Advertência (A-*) e sinalização horizontal de pista.',
      topic: 'signs',
      questionCount: 10,
      timeMinutes: 12,
      icon: '🛑',
      badge: '10 QUESTÕES',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      id: 'soc',
      title: 'Primeiros Socorros no Trânsito',
      desc: 'Cadeia de socorro, sinalização da cena com triângulo, telefones de resgate (192 / 193) e condutas vitais.',
      topic: 'first_aid',
      questionCount: 5,
      timeMinutes: 8,
      icon: '🩹',
      badge: '5 QUESTÕES',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    },
    {
      id: 'mec',
      title: 'Mecânica Básica do Automóvel',
      desc: 'Luzes espia do painel, sistema de freios ABS, arrefecimento, motor a combustão, bateria e profundidade TWI de pneus.',
      topic: 'mechanics',
      questionCount: 5,
      timeMinutes: 8,
      icon: '🔧',
      badge: '5 QUESTÕES',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'amb',
      title: 'Meio Ambiente & Cidadania',
      desc: 'Controle de emissão de gases (PROCONVE), catalisador, poluição sonora e distância segura de ciclistas (1,5 m).',
      topic: 'citizenship_environment',
      questionCount: 5,
      timeMinutes: 8,
      icon: '🌳',
      badge: '5 QUESTÕES',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30'
    }
  ];

  const handleStartSimulado = (topic: QuestionTopic | 'signs' | 'all', title: string, timeMinutes: number, count: number) => {
    sounds.playClick();
    let filteredQuestions: Question[] = [];

    if (topic === 'all') {
      filteredQuestions = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 30);
    } else if (topic === 'signs') {
      filteredQuestions = ALL_QUESTIONS.filter(q => q.topic === 'signs' || q.signId);
      if (filteredQuestions.length < count) {
        filteredQuestions = ALL_QUESTIONS.slice(0, count);
      }
    } else {
      filteredQuestions = ALL_QUESTIONS.filter(q => q.topic === topic);
      if (filteredQuestions.length === 0) {
        filteredQuestions = ALL_QUESTIONS.slice(0, count);
      }
    }

    onLaunchSimulado(filteredQuestions, title, timeMinutes);
  };

  const history = profile.simuladosHistory || [];
  const totalAttempts = history.length;
  const passedAttempts = history.filter(h => h.passed).length;
  const approvalRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 select-none font-sans">
      
      {/* 1. DUOLINGO "SUPER" HERO BANNER (SIMULADO OFICIAL) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#2c1356] via-[#1a1c3d] to-[#182631] border-2 border-violet-500/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden mb-8 group">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          {/* Pill badge matching Duolingo SUPER */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#CE82FF] to-[#A855F7] text-white text-[11px] font-black uppercase tracking-wider mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>Simulado Oficial DETRAN</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            Gabarite a Prova Teórica
          </h2>

          <p className="text-sm sm:text-base font-semibold text-slate-300 mt-2 leading-relaxed">
            30 questões cronometradas (40 min) sorteadas no padrão oficial do CONTRAN com nota de corte de 70% (21 acertos).
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => handleStartSimulado('all', 'Simulado Geral Oficial DETRAN (30Q)', 40, 30)}
              className="px-6 py-3.5 rounded-2xl duo-btn-yellow font-black text-sm uppercase tracking-wider cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105 active:translate-y-0.5 transition-all"
            >
              <span>Iniciar Simulado Oficial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-violet-300 bg-violet-950/60 border border-violet-500/40 px-3 py-2 rounded-xl">
              🛡️ Não desconta pontos da CNH
            </span>
          </div>
        </div>

        {/* Mascot / 3D Graphic on right */}
        <div className="relative z-10 shrink-0 flex items-center justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-2xl flex items-center justify-center border-4 border-amber-300/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#182631] rounded-[22px] flex flex-col items-center justify-center text-5xl">
              <Trophy className="w-16 h-16 text-[#FFC800] drop-shadow-lg animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB CONTROLS (SIMULADOS VS HISTÓRICO) */}
      <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('simulados');
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'simulados'
                ? 'bg-[#182631] text-[#FFC800] border-2 border-[#FFC800] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Simulados por Matéria</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-bold">
              {configs.length}
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('historico');
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'historico'
                ? 'bg-[#182631] text-[#FFC800] border-2 border-[#FFC800] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Meu Histórico</span>
            {totalAttempts > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                {totalAttempts}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. TAB 1: DUOLINGO PRACTICE CARDS GRID */}
      {activeTab === 'simulados' && (
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-black text-white tracking-tight">
              Módulos de Prática Específicos
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Treine matérias individuais para reforçar seus pontos fracos antes do exame geral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configs.map((config) => (
              <div
                key={config.id}
                onClick={() => handleStartSimulado(config.topic || 'all', config.title, config.timeMinutes, config.questionCount)}
                className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] hover:border-[#1cb0f6] p-5 sm:p-6 flex items-center justify-between gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:translate-y-[-2px]"
              >
                {/* Left Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${config.badgeColor}`}>
                      {config.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {config.timeMinutes} min
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#1cb0f6] transition-colors leading-snug truncate">
                    {config.title}
                  </h4>

                  <p className="text-xs font-medium text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {config.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-black text-[#1cb0f6] group-hover:translate-x-0.5 transition-transform">
                      <span>Iniciar Prática</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    {config.id === 'pla' && onStartPlacasQuiz && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartPlacasQuiz();
                        }}
                        className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                      >
                        ⚡ Quiz Duolingo
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Visual Icon (Duolingo Style Circular Badge) */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform shadow-inner ${config.iconBg}`}>
                  {config.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 2: ATTEMPT HISTORY (DUOLINGO STATS STYLE) */}
      {activeTab === 'historico' && (
        <div className="space-y-6">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] text-center shadow-md">
              <span className="text-3xl font-black text-white block">
                {totalAttempts}
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1 block">
                Simulados Realizados
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] text-center shadow-md">
              <span className="text-3xl font-black text-[#58cc02] block">
                {approvalRate}%
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1 block">
                Taxa de Aprovação (≥ 70%)
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] text-center shadow-md">
              <span className="text-3xl font-black text-[#FFC800] block">
                {passedAttempts} de {totalAttempts}
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1 block">
                Aprovações Conquistadas
              </span>
            </div>
          </div>

          {/* History List */}
          {history.length === 0 ? (
            <div className="p-12 text-center bg-[#182631] rounded-3xl border-2 border-dashed border-[#2b3e4e]">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-3xl mb-3">
                📝
              </div>
              <h3 className="text-lg font-black text-white">
                Nenhum simulado registrado ainda
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Complete seu primeiro simulado na aba de Simulados! Seus acertos, nota de corte e tempo gasto aparecerão detalhados aqui.
              </p>
              <button
                onClick={() => setActiveTab('simulados')}
                className="mt-5 px-6 py-2.5 rounded-2xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                Fazer Meu Primeiro Simulado
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, idx) => {
                const percent = Math.round((item.score / item.total) * 100);
                const isPassed = item.passed;

                return (
                  <div
                    key={item.id || idx}
                    className="p-4 sm:p-5 rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-[#3d5568] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                        isPassed 
                          ? 'bg-[#18341e] text-[#58cc02] border-2 border-[#58cc02]' 
                          : 'bg-[#3d181c] text-[#ea2b2b] border-2 border-[#ea2b2b]'
                      }`}>
                        {isPassed ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-black text-white">
                            {item.topicTitle || 'Simulado Geral Oficial'}
                          </h4>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isPassed ? 'bg-[#58cc02]/20 text-[#58cc02]' : 'bg-[#ea2b2b]/20 text-[#ea2b2b]'
                          }`}>
                            {isPassed ? 'Aprovado' : 'Reprovado'}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">
                          {new Date(item.date).toLocaleDateString('pt-BR')} • Tempo: {Math.round(item.timeSpentSeconds / 60)} min
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-700/60 pt-3 sm:pt-0">
                      <div className="text-right">
                        <span className={`text-lg font-black block ${isPassed ? 'text-[#58cc02]' : 'text-[#ea2b2b]'}`}>
                          {item.score} / {item.total} acertos
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          Acurácia: {percent}%
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartSimulado('all', item.topicTitle || 'Simulado Geral', 40, 30)}
                        className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Refazer simulado"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
