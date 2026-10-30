import React from 'react';
import { 
  Flame, 
  Zap, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  LogOut 
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface PerfilViewProps {
  profile: UserProfile;
  onResetCnhPoints: () => void;
  onLogout: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  profile,
  onResetCnhPoints,
  onLogout
}) => {
  const isSuspended = profile.cnhPoints >= profile.maxCnhPoints;
  const history = profile.simuladosHistory || [];
  const totalSimulados = history.length;
  const passedCount = history.filter(h => h.passed).length;
  const approvalRate = totalSimulados > 0 ? Math.round((passedCount / totalSimulados) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-xs">
            🪪
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Minha Habilitação & Perfil
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Gerencie seus pontos na CNH, histórico de aprovações e progresso geral.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onLogout();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: CNH Document Card (CTB) */}
        <div className="md:col-span-1 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 border-4 border-emerald-600 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Watermark effect */}
          <div className="absolute -right-6 -bottom-6 text-emerald-700/30 text-9xl font-black select-none pointer-events-none">
            CNH
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-emerald-500/40 pb-3 mb-4">
              <span className="text-[10px] font-black tracking-widest uppercase">REPÚBLICA FEDERATIVA DO BRASIL</span>
              <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded font-black">CAT B</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-16 bg-emerald-950/60 rounded-xl border border-emerald-400/60 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-sm font-black text-white">
                  {profile.name || 'Futuro Condutor'}
                </h3>
                <span className="text-[11px] text-emerald-200 block truncate max-w-[150px]">
                  {profile.email || 'aluno@diriggo.com'}
                </span>
                <span className={`inline-block mt-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isSuspended ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                }`}>
                  {isSuspended ? 'CNH Suspensa' : 'Situação Regular'}
                </span>
              </div>
            </div>

            {/* Points Status */}
            <div className="bg-emerald-950/50 p-3 rounded-2xl border border-emerald-500/30">
              <div className="flex justify-between text-xs font-black mb-1">
                <span className="text-emerald-200">Pontos Acumulados:</span>
                <span className="text-white">{profile.cnhPoints} / 20 pts</span>
              </div>
              <div className="w-full bg-emerald-900 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    profile.cnhPoints >= 16 ? 'bg-rose-400' : profile.cnhPoints >= 10 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Reset button if suspended */}
          <div className="mt-6 pt-4 border-t border-emerald-500/40">
            {isSuspended ? (
              <button
                onClick={() => {
                  sounds.playCorrect();
                  onResetCnhPoints();
                }}
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Zerar Pontos (Reciclagem)</span>
              </button>
            ) : (
              <p className="text-[11px] text-emerald-200/90 leading-tight">
                Mantenha sua carteira limpa! Erros nas lições adicionam +4 pts. Simulados não penalizam sua CNH.
              </p>
            )}
          </div>
        </div>

        {/* Right Columns: Stats Grid */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1 fill-orange-500" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">
                {profile.streak}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                Dias de Ofensiva
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1 fill-amber-400" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">
                {profile.xp}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                XP Total Ganho
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">
                {profile.completedLessons.length}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                Lições Concluídas
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">
                {approvalRate}%
              </span>
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                Aprovação em Simulados
              </span>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="p-5 bg-white dark:bg-slate-800/60 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-xs">
            <h3 className="text-sm font-black uppercase text-slate-800 dark:text-white mb-2">
              Resumo do Código de Trânsito Brasileiro (CTB)
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>Nota mínima para aprovação no exame teórico do DETRAN: <strong>70%</strong> (21 de 30 questões).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>Tempo de prova oficial: <strong>40 a 50 minutos</strong> (dependendo do DETRAN estadual).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>Validade do processo da primeira habilitação: <strong>12 meses</strong> a partir da abertura do RENACH.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
