import React, { useState } from 'react';
import { 
  Clock, 
  FileCheck2, 
  ArrowRight, 
  Info
} from 'lucide-react';
import { Question, UserProfile, QuestionTopic } from '../types';
import { ALL_QUESTIONS } from '../data/questions';
import { sounds } from '../utils/sound';

interface SimuladosHubProps {
  profile: UserProfile;
  onLaunchSimulado: (questions: Question[], title: string, timeMinutes: number) => void;
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
  color: string;
}

export const SimuladosHub: React.FC<SimuladosHubProps> = ({
  profile,
  onLaunchSimulado
}) => {
  const [activeTab, setActiveTab] = useState<'simulados' | 'historico'>('simulados');

  const configs: SimuladoCardConfig[] = [
    {
      id: 'geral',
      title: 'Simulado Geral Oficial DETRAN',
      desc: 'Prova completa com 30 questões sorteadas proporcionalmente pelo padrão oficial do CONTRAN.',
      topic: 'all',
      questionCount: 30,
      timeMinutes: 40,
      icon: '🏆',
      badge: 'PROVA OFICIAL',
      color: 'border-amber-400 bg-amber-50/60 dark:bg-amber-950/30'
    },
    {
      id: 'leg',
      title: 'Simulado: Legislação de Trânsito',
      desc: 'Normas de circulação, preferências em cruzamentos, infrações, penalidades e medidas administrativas.',
      topic: 'legislation',
      questionCount: 12,
      timeMinutes: 15,
      icon: '🚦',
      badge: '12 QUESTÕES',
      color: 'border-blue-400 bg-blue-50/60 dark:bg-blue-950/30'
    },
    {
      id: 'def',
      title: 'Simulado: Direção Defensiva',
      desc: 'Condições adversas, prevenção de sinistros, aquaplanagem e regras de segurança.',
      topic: 'defensive_driving',
      questionCount: 10,
      timeMinutes: 15,
      icon: '🌧️',
      badge: '10 QUESTÕES',
      color: 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30'
    },
    {
      id: 'pla',
      title: 'Simulado: Placas & Sinalização',
      desc: 'Foco exclusivo em placas de Regulamentação (R-*), Advertência (A-*) e sinalização viária.',
      topic: 'signs',
      questionCount: 10,
      timeMinutes: 12,
      icon: '🛑',
      badge: '10 QUESTÕES',
      color: 'border-red-400 bg-red-50/60 dark:bg-red-950/30'
    },
    {
      id: 'soc',
      title: 'Simulado: Primeiros Socorros',
      desc: 'Sinalização do local do acidente, telefones de emergência (192/193) e cuidados vitais.',
      topic: 'first_aid',
      questionCount: 5,
      timeMinutes: 8,
      icon: '🩹',
      badge: '5 QUESTÕES',
      color: 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/30'
    },
    {
      id: 'amb',
      title: 'Simulado: Meio Ambiente & Cidadania',
      desc: 'Poluição sonora, emissão de gases pelo escapamento, catalisador e convívio social no trânsito.',
      topic: 'citizenship_environment',
      questionCount: 5,
      timeMinutes: 8,
      icon: '🌳',
      badge: '5 QUESTÕES',
      color: 'border-teal-400 bg-teal-50/60 dark:bg-teal-950/30'
    },
    {
      id: 'mec',
      title: 'Simulado: Mecânica Básica',
      desc: 'Luzes do painel, freios, pneus (sulcos mínimos e TWI), bateria e arrefecimento.',
      topic: 'mechanics',
      questionCount: 5,
      timeMinutes: 8,
      icon: '🔧',
      badge: '5 QUESTÕES',
      color: 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30'
    }
  ];

  const handleStartConfig = (config: SimuladoCardConfig) => {
    sounds.playClick();
    let filteredQuestions: Question[] = [];

    if (config.topic === 'all') {
      filteredQuestions = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 30);
    } else if (config.topic === 'signs') {
      filteredQuestions = ALL_QUESTIONS.filter(q => q.topic === 'signs' || q.signId);
      if (filteredQuestions.length < config.questionCount) {
        filteredQuestions = ALL_QUESTIONS.slice(0, config.questionCount);
      }
    } else {
      filteredQuestions = ALL_QUESTIONS.filter(q => q.topic === config.topic);
      if (filteredQuestions.length === 0) {
        filteredQuestions = ALL_QUESTIONS.slice(0, config.questionCount);
      }
    }

    onLaunchSimulado(filteredQuestions, config.title, config.timeMinutes);
  };

  const history = profile.simuladosHistory || [];
  const totalAttempts = history.length;
  const passedAttempts = history.filter(h => h.passed).length;
  const approvalRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 select-none">
      {/* Header Compacto */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-lg font-black shadow-xs shrink-0">
            📝
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Simulados DETRAN & por Tópico
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Treine para o exame teórico oficial com tempo cronometrado e nota de corte real (70%).
            </p>
          </div>
        </div>

        {/* Vital Rule Callout */}
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/80 text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5 shadow-xs">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-black text-emerald-900 dark:text-emerald-300 block mb-0.5 uppercase tracking-wide">
              Área Segura de Diagnóstico:
            </strong>
            Os simulados <strong>NÃO afetam os pontos da sua carteira CNH</strong>! Eles servem para testar seu conhecimento sem risco de suspensão.
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-2.5 mb-5">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('simulados');
          }}
          className={`px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'simulados'
              ? 'bg-[#FFC800] text-slate-900 border-b-2 border-[#CA8A04] shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Simulados Disponíveis ({configs.length})
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('historico');
          }}
          className={`px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'historico'
              ? 'bg-[#FFC800] text-slate-900 border-b-2 border-[#CA8A04] shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Histórico</span>
          {totalAttempts > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px] font-black">
              {totalAttempts}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: LIST OF SIMULADOS - COMPACT & LIGHTWEIGHT */}
      {activeTab === 'simulados' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {configs.map(config => (
            <div
              key={config.id}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 ${config.color} border-b-4 hover:translate-y-[-2px] transition-all flex flex-col justify-between shadow-xs`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{config.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {config.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                  {config.title}
                </h3>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {config.desc}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    {config.questionCount}Q
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {config.timeMinutes} min
                  </span>
                </div>

                <button
                  onClick={() => handleStartConfig(config)}
                  className="px-3 py-1.5 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <span>Iniciar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ATTEMPT HISTORY */}
      {activeTab === 'historico' && (
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xl font-black text-slate-900 dark:text-white block">
                {totalAttempts}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                Simulados Realizados
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 block">
                {approvalRate}%
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                Taxa de Aprovação (≥ 70%)
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xl font-black text-amber-500 block">
                {passedAttempts} / {totalAttempts}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                Aprovações
              </span>
            </div>
          </div>

          {/* List of attempts */}
          {history.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 mx-auto flex items-center justify-center text-2xl mb-2">
                📝
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-white">
                Nenhum simulado realizado ainda
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Faça o seu primeiro simulado na aba ao lado! Seus resultados e nota de corte serão registrados aqui.
              </p>
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('simulados');
                }}
                className="mt-3 px-4 py-2 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Escolher um Simulado</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {[...history].reverse().map((attempt, idx) => {
                const percentage = Math.round((attempt.score / attempt.total) * 100);

                return (
                  <div
                    key={attempt.id || idx}
                    className="p-3 bg-white dark:bg-slate-800/80 rounded-2xl border-2 border-slate-200 dark:border-slate-700 border-b-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-black shrink-0 ${
                        attempt.passed 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {attempt.passed ? '✓' : '✗'}
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                          {attempt.topicTitle || 'Simulado Oficial DETRAN'}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>Data: {attempt.date}</span>
                          <span>•</span>
                          <span>Nota de corte: 70%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <span className={`text-xs sm:text-sm font-black ${
                          attempt.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {attempt.score}/{attempt.total} ({percentage}%)
                        </span>
                        <span className={`block text-[9px] font-black uppercase ${
                          attempt.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {attempt.passed ? 'Aprovado' : 'Reprovado'}
                        </span>
                      </div>
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
