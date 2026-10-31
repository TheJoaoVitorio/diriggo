import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  LogOut,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface PerfilViewProps {
  profile: UserProfile;
  onResetCnhPoints: () => void;
  onLogout: () => void;
}

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const getInitials = (name?: string) => {
  if (!name || !name.trim()) return 'CD';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const PerfilView: React.FC<PerfilViewProps> = ({
  profile,
  onResetCnhPoints,
  onLogout
}) => {
  const [photoError, setPhotoError] = useState(false);
  const isSuspended = profile.cnhPoints >= profile.maxCnhPoints;
  const history = profile.simuladosHistory || [];
  const totalSimulados = history.length;
  const passedCount = history.filter(h => h.passed).length;
  const approvalRate = totalSimulados > 0 ? Math.round((passedCount / totalSimulados) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 select-none">
      {/* Google User Profile Card Top Banner */}
      <div className="mb-6 p-5 sm:p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Avatar with fallback */}
          <div className="relative shrink-0">
            {profile.photoURL && !photoError ? (
              <img
                src={profile.photoURL}
                alt={profile.name}
                referrerPolicy="no-referrer"
                onError={() => setPhotoError(true)}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-emerald-600 dark:bg-emerald-700 text-white font-black text-xl flex items-center justify-center border-2 border-emerald-500 shadow-sm">
                {getInitials(profile.name)}
              </div>
            )}
            {/* Google Badge Overlay */}
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-700">
              <GoogleIcon />
            </div>
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white truncate">
                {profile.name || 'Condutor Diriggo'}
              </h1>
              {/* Badge Conectado via Google */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <GoogleIcon />
                <span>Conectado via Google</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 truncate">
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{profile.email || 'Conta vinculada ao Google'}</span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-[11px] font-bold">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nuvem Firebase Ativa</span>
              </span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                {profile.completedLessons.length} aulas concluídas
              </span>
            </div>
          </div>
        </div>

        {/* Action: Logout Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onLogout();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 text-xs font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer transition-all shadow-xs active:translate-y-0.5"
          title="Encerrar sessão da conta Google"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sair da Conta Google</span>
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
              <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded font-black border border-emerald-500">CAT B</span>
            </div>

            {/* Condutor Identity Section in CNH */}
            <div className="flex items-center gap-3.5 mb-4">
              {/* Conductor Photo with Fallback */}
              <div className="relative shrink-0">
                {profile.photoURL && !photoError ? (
                  <img 
                    src={profile.photoURL} 
                    alt={profile.name} 
                    referrerPolicy="no-referrer"
                    onError={() => setPhotoError(true)}
                    className="w-14 h-16 rounded-xl object-cover border-2 border-emerald-400/80 shadow-md"
                  />
                ) : (
                  <div className="w-14 h-16 bg-emerald-950/80 rounded-xl border border-emerald-400/60 flex flex-col items-center justify-center text-emerald-200 font-black shadow-inner">
                    <span className="text-xl">🪪</span>
                    <span className="text-[10px] font-black mt-0.5">{getInitials(profile.name)}</span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <GoogleIcon />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black text-emerald-300 uppercase block tracking-wider">
                  NOME DO CONDUTOR
                </span>
                <h3 className="text-sm font-black text-white truncate leading-tight">
                  {profile.name || 'Futuro Condutor'}
                </h3>
                <span className="text-[10px] text-emerald-200 block truncate font-medium mt-0.5">
                  {profile.email || 'condutor@diriggo.com'}
                </span>
                <span className={`inline-block mt-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isSuspended ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                }`}>
                  {isSuspended ? 'CNH Suspensa' : 'Situação Regular'}
                </span>
              </div>
            </div>

            {/* Badge: Conectado via Google in CNH */}
            <div className="mb-3 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-between text-[10px] text-emerald-200 font-bold">
              <div className="flex items-center gap-1.5">
                <GoogleIcon />
                <span>Conectado via Google</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-emerald-300 font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>NUVEM OK</span>
              </div>
            </div>

            {/* Points Status */}
            <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-500/30">
              <div className="flex justify-between text-xs font-black mb-1">
                <span className="text-emerald-200">Pontos Acumulados:</span>
                <span className="text-white">{profile.cnhPoints} / 20 pts</span>
              </div>
              <div className="w-full bg-emerald-900 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSuspended ? 'bg-rose-500' : profile.cnhPoints >= 14 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-emerald-300 mt-1.5">
                <span>Limite: 20 pts (CTB)</span>
                <span>{Math.max(0, 20 - profile.cnhPoints)} pts restantes</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-500/40 flex items-center justify-between text-[10px] font-bold text-emerald-200">
            <span>Diriggo Digital Driver</span>
            <span className="bg-emerald-950 px-2 py-0.5 rounded font-black tracking-wider">HABILITADO 2026</span>
          </div>
        </div>

        {/* Right Columns: Stats & Actions */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-500 flex items-center justify-center mb-1">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {profile.streak}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Dias Ofensiva
              </span>
            </div>

            <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mb-1">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {profile.xp}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Total XP
              </span>
            </div>

            <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center mb-1">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {approvalRate}%
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Aprovação
              </span>
            </div>
          </div>

          {/* Action Box: Reciclagem / Limpeza de CNH */}
          {profile.cnhPoints > 0 && (
            <div className="p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-black text-sm text-amber-950 dark:text-amber-200">
                  {isSuspended ? '⚠️ Sua CNH foi suspensa (20 pontos)!' : 'Limpar Pontuação na CNH'}
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                  Faça a reciclagem virtual para zerar seus pontos acumulados e reabilitar sua carteira.
                </p>
              </div>

              <button
                onClick={onResetCnhPoints}
                className="px-4 py-2.5 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Zerar Pontos CNH</span>
              </button>
            </div>
          )}

          {/* Recent Simulados History */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h3 className="font-black text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Histórico de Simulados Realizados</span>
            </h3>

            {history.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                Nenhum simulado realizado ainda. Acesse a aba Simulados para testar seus conhecimentos!
              </div>
            ) : (
              <div className="space-y-2.5">
                {history.slice(-5).reverse().map((sim, i) => (
                  <div
                    key={sim.id || i}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-black text-xs text-slate-800 dark:text-slate-200">
                        {sim.topicTitle || 'Simulado Geral Oficial DETRAN'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-bold">
                        Data: {sim.date}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {sim.score} / {sim.total}
                        </span>
                        <span className="text-[10px] block text-slate-400 font-bold">
                          {Math.round((sim.score / sim.total) * 100)}%
                        </span>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${
                        sim.passed 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {sim.passed ? 'APROVADO' : 'REPROVADO'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
