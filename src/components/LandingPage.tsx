import React from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { TrafficSignComponent } from './TrafficSign';
import { sounds } from '../utils/sound';

interface LandingPageProps {
  onStartLearning: () => void;
  onOpenSimulado: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onOpenSimulado,
  onOpenAuth
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center shadow-sm">
              <span className="text-xl">🚦</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Dirig<span className="text-[#CA8A04] dark:text-[#FFC800]">go</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="px-5 py-2.5 rounded-2xl duo-btn-yellow font-black text-xs uppercase tracking-wide cursor-pointer shadow-sm"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Left copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
            <span className="text-base">🚗</span>
            <span>A melhor preparação para a CNH do Brasil</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Passe na Prova do <span className="text-[#CA8A04] dark:text-[#FFC800] underline decoration-amber-300">DETRAN</span> de primeira.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
            A didática divertida e viciante do Duolingo, agora focada na prova teórica da sua CNH. Lições de 5 minutos, placas interativas, pontos na carteira e simulados oficiais.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl duo-btn-yellow font-black text-base uppercase tracking-wide cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>Começar a Estudar Grátis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSimulado();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl duo-btn-card font-black text-sm uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Simulado Oficial (30Q)</span>
            </button>
          </div>

          {/* Social Proof metrics */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-center lg:justify-start gap-6 text-slate-600 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Conforme Resoluções CONTRAN</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Gratuito</span>
            </div>
          </div>
        </div>

        {/* Right Preview Card (Duolingo-style mini simulator) */}
        <div className="flex-1 max-w-md w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 border-b-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider">
                  Desafio Rápido
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                <span className="w-3 h-2.5 bg-emerald-600 rounded-xs inline-block" />
                <span>CNH 0 pts</span>
              </div>
            </div>

            <div className="flex justify-center my-3">
              <TrafficSignComponent signId="R-1" size={100} />
            </div>

            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white text-center mb-4">
              Ao avistar a placa acima, o que você deve fazer?
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">A</span>
                <span>Apenas reduzir a marcha se não houver pedestres.</span>
              </div>
              <div className="p-3 rounded-xl border-2 border-emerald-400 dark:border-emerald-600 border-b-4 bg-emerald-50 dark:bg-emerald-950/50 text-xs font-black text-emerald-950 dark:text-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-300 dark:bg-emerald-700 flex items-center justify-center text-[10px]">B</span>
                  <span>Parar totalmente o veículo antes do cruzamento.</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 font-semibold">
              💡 <strong>CTB Art. 208:</strong> Parada obrigatória real! Desrespeito gera infração gravíssima com 7 pontos na carteira.
            </div>

            <button
              onClick={() => {
                sounds.playCorrect();
                onStartLearning();
              }}
              className="mt-4 w-full py-3 rounded-xl duo-btn-green font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              Testar mais questões na Trilha
            </button>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#CA8A04] dark:text-[#FFC800] bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Método Comprovado
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
              Por que estudar no Diriggo é mais eficaz?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm mt-1">
              Esqueça apostilas pesadas e simulados estáticos dos anos 2000.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 border-b-6 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-b-4 border-amber-300 dark:border-amber-700 flex items-center justify-center text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Micro-lições de 5 Minutos</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold mt-2 leading-relaxed">
                Estude no ônibus, na fila do banco ou antes de dormir. O cérebro retém 3x mais com sessões frequentes e curtas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 border-b-6 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border-b-4 border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-2xl mb-4">
                🚦
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Explicações com Base no CTB</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold mt-2 leading-relaxed">
                Não decore apenas a letra da resposta. Entenda a lógica da regra de trânsito para nunca ser pego de surpresa na pegadinha da prova.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 border-b-6 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 border-b-4 border-blue-300 dark:border-blue-700 flex items-center justify-center text-2xl mb-4">
                🏆
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Simulado Idêntico ao Real</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold mt-2 leading-relaxed">
                30 questões balanceadas por matéria (Legislação, Direção Defensiva, Primeiros Socorros, Mecânica e Meio Ambiente) com nota de corte de 70%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t-4 border-amber-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFC800] text-slate-900 flex items-center justify-center text-lg font-black">
              🚦
            </div>
            <div>
              <span className="text-xl font-black">Diriggo</span>
              <p className="text-xs text-slate-400 font-medium">
                Plataforma educacional para o exame teórico da CNH.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-semibold max-w-md">
            Conteúdo baseado na Lei nº 9.503/1997 (Código de Trânsito Brasileiro) e Resoluções CONTRAN nº 789/2020.
          </div>
        </div>
      </footer>
    </div>
  );
};
