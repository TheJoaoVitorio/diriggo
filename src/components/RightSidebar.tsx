import React from 'react';
import { 
  Flame, 
  Zap, 
  Trophy, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface RightSidebarProps {
  profile: UserProfile;
  onOpenSimulado: () => void;
  onResetCnhPoints: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  profile,
  onOpenSimulado,
  onResetCnhPoints
}) => {
  const isSuspended = profile.cnhPoints >= profile.maxCnhPoints;

  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 border-l-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-6 space-y-6 select-none shrink-0 overflow-y-auto no-scrollbar">
      {/* Top HUD Stats Bar (Duolingo Style) */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100 dark:border-slate-800 text-xs font-black">
        {/* Country / Exam Standard */}
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
          <span className="text-base">🇧🇷</span>
          <span>DETRAN</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
          <Flame className="w-4 h-4 fill-orange-500" />
          <span>{profile.streak}</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1 text-amber-500">
          <Zap className="w-4 h-4 fill-amber-400" />
          <span>{profile.xp}</span>
        </div>

        {/* CNH Points */}
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border font-black ${
          isSuspended 
            ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
        }`}>
          <span>🪪</span>
          <span>{profile.cnhPoints}/20</span>
        </div>
      </div>

      {/* Widget 1: Status da Carteira CNH (CTB Art. 261) */}
      <div className="p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Minha Habilitação
          </h3>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
            isSuspended ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500 text-white'
          }`}>
            {isSuspended ? 'Suspensa' : 'Regular'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl shadow-sm border border-emerald-500">
            🪪
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {profile.name || 'Futuro Condutor'}
            </h4>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {profile.cnhPoints} de {profile.maxCnhPoints} pontos acumulados
            </span>
          </div>
        </div>

        {/* CNH Meter Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              profile.cnhPoints >= 16 ? 'bg-rose-500' : profile.cnhPoints >= 10 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
          />
        </div>

        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-300">Regra de Ouro:</strong> Os <em>Simulados</em> não afetam os pontos da carteira. Apenas erros nas lições da trilha geram pontos.
        </p>

        {isSuspended && (
          <button
            onClick={() => {
              sounds.playCorrect();
              onResetCnhPoints();
            }}
            className="mt-3 w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Fazer Reciclagem (Zerar Pontos)</span>
          </button>
        )}
      </div>

      {/* Widget 2: Missões Diárias (Duolingo Quest Style) */}
      <div className="p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
          <span>Missões de Hoje</span>
          <span className="text-amber-500 font-extrabold">1/2</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center text-sm font-black">
              ⚡
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                Completar 1 Lição na Trilha
              </span>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-amber-500 h-full w-full rounded-full" />
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center text-sm font-black">
              📝
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                Fazer 1 Simulado por Tópico
              </span>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-sky-500 h-full w-0 rounded-full" />
              </div>
            </div>
            <span className="text-[11px] font-black text-slate-400">0/1</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Atalho Rápido para Simulado */}
      <div className="p-4 rounded-3xl border-2 border-amber-300 dark:border-amber-700/60 bg-gradient-to-br from-amber-50 to-yellow-100/60 dark:from-amber-950/40 dark:to-yellow-900/20 text-slate-900 dark:text-white shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h4 className="text-xs font-black uppercase tracking-wide text-amber-900 dark:text-amber-300">
            Simulado Geral DETRAN
          </h4>
        </div>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-snug">
          30 questões cronometradas (40 min) proporcionais a todas as matérias.
        </p>
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSimulado();
          }}
          className="mt-3 w-full py-2.5 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wide shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Fazer Prova Completa</span>
        </button>
      </div>
    </aside>
  );
};
