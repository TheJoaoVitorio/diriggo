import React from 'react';
import { 
  Flame, 
  Zap, 
  Trophy, 
  RotateCcw,
  CheckCircle2,
  Shield,
  Lock
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
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 border-l-2 border-[#e5e5e5] dark:border-[#202f36] bg-white dark:bg-[#131f24] px-4 py-6 space-y-5 select-none shrink-0 overflow-y-auto no-scrollbar">
      {/* Top HUD Stats Bar (Duolingo Style) */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#e5e5e5] dark:border-[#202f36] text-xs font-black">
        {/* Country / Exam Standard */}
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
          <span className="text-base">🇧🇷</span>
          <span className="tracking-wide">DETRAN</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 text-orange-500">
          <Flame className="w-4 h-4 fill-orange-500" />
          <span>{profile.streak}</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5 text-[#ffc800]">
          <Zap className="w-4 h-4 fill-[#ffc800]" />
          <span>{profile.xp}</span>
        </div>

        {/* CNH Points */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border-2 font-black ${
          isSuspended 
            ? 'bg-rose-100 text-rose-800 border-rose-400 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-[#182631] dark:text-[#58cc02] dark:border-[#202f36]'
        }`}>
          <span>🪪</span>
          <span>{profile.cnhPoints}/20 pts</span>
        </div>
      </div>

      {/* Widget 1: Desbloqueie os Simulados (Duolingo Shield Style) */}
      <div className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#202f36] bg-white dark:bg-[#131f24] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#202f36] flex items-center justify-center text-slate-400 dark:text-[#8b9ea7] shrink-0 border border-slate-200 dark:border-[#2b3d45]">
            <Shield className="w-6 h-6 text-[#1cb0f6]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Simulado Oficial DETRAN
            </h4>
            <p className="text-xs text-slate-500 dark:text-[#8b9ea7] mt-0.5 font-medium leading-relaxed">
              30 questões no tempo real da prova. Zero perda de pontos.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenSimulado();
          }}
          className="mt-4 w-full py-2.5 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          <span>Iniciar Simulado (40 min)</span>
        </button>
      </div>

      {/* Widget 2: Missões do Dia (Duolingo Daily Quests) */}
      <div className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#202f36] bg-white dark:bg-[#131f24] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-[#8b9ea7]">
            Missões do dia
          </h3>
          <span className="text-xs font-extrabold text-[#ffc800]">
            1/2
          </span>
        </div>

        <div className="space-y-3">
          {/* Mission 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-[#202f36] text-[#ffc800] flex items-center justify-center text-base font-black shrink-0">
              ⚡
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                Completar 1 Lição na Trilha
              </span>
              <div className="w-full bg-slate-100 dark:bg-[#202f36] h-2 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-[#ffc800] h-full w-full rounded-full" />
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-[#58cc02] shrink-0" />
          </div>

          {/* Mission 2 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-[#202f36] text-[#1cb0f6] flex items-center justify-center text-base font-black shrink-0">
              📝
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                Fazer 1 Simulado por Tópico
              </span>
              <div className="w-full bg-slate-100 dark:bg-[#202f36] h-2 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-[#1cb0f6] h-full w-0 rounded-full" />
              </div>
            </div>
            <span className="text-[11px] font-black text-slate-400 dark:text-[#52656d]">0/1</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Status da Habilitação CNH (CTB Art. 261) */}
      <div className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#202f36] bg-white dark:bg-[#131f24] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-[#8b9ea7]">
            Minha Habilitação
          </h3>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
            isSuspended ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#58cc02] text-white'
          }`}>
            {isSuspended ? 'Suspensa' : 'Regular'}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="w-11 h-11 rounded-2xl bg-[#58cc02] text-white flex items-center justify-center text-xl shadow-xs border-b-2 border-[#46a302] shrink-0">
            🪪
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {profile.name || 'Futuro Condutor'}
            </h4>
            <span className="text-xs font-bold text-slate-500 dark:text-[#8b9ea7]">
              {profile.cnhPoints} de {profile.maxCnhPoints} pontos
            </span>
          </div>
        </div>

        {/* CNH Meter Bar */}
        <div className="w-full bg-slate-100 dark:bg-[#202f36] h-2.5 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              profile.cnhPoints >= 16 ? 'bg-rose-500' : profile.cnhPoints >= 10 ? 'bg-[#ffc800]' : 'bg-[#58cc02]'
            }`}
            style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
          />
        </div>

        <p className="text-[11px] font-medium text-slate-500 dark:text-[#8b9ea7] mt-3 leading-relaxed">
          Os <strong className="text-slate-700 dark:text-slate-300">Simulados</strong> nunca descontam pontos. Apenas erros nas lições da trilha geram pontos.
        </p>

        {isSuspended ? (
          <button
            onClick={() => {
              sounds.playCorrect();
              onResetCnhPoints();
            }}
            className="mt-3 w-full py-2.5 bg-rose-500 hover:bg-rose-600 border-b-4 border-rose-700 active:translate-y-0.5 active:border-b-2 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Fazer Reciclagem (Zerar Pontos)</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSimulado();
            }}
            className="mt-4 w-full py-3.5 px-4 rounded-2xl duo-btn-green font-black uppercase text-xs tracking-wider shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Treinar sem Riscos</span>
          </button>
        )}
      </div>
    </aside>
  );
};
