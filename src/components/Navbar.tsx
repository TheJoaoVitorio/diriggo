import React from 'react';
import { Flame, Zap, Volume2, VolumeX, User, ClipboardCheck, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface NavbarProps {
  profile: UserProfile;
  onOpenSimulado: () => void;
  onOpenAuth: () => void;
  onToggleSound: () => void;
  onToggleDarkMode: () => void;
  onResetCnhPoints: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenSimulado,
  onOpenAuth,
  onToggleSound,
  onToggleDarkMode,
  onResetCnhPoints
}) => {
  const isSuspended = profile.cnhPoints >= profile.maxCnhPoints;

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b-2 border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center shadow-sm">
            <span className="text-xl">🚦</span>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Dirig<span className="text-[#CA8A04] dark:text-[#FFC800]">go</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
              CNH Brasil
            </span>
          </div>
        </div>

        {/* Center / Stats HUD */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Streak */}
          <div 
            title="Dias seguidos de ofensiva"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-200 dark:border-orange-800 border-b-4 text-orange-600 dark:text-orange-400 font-extrabold text-sm"
          >
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{profile.streak}</span>
          </div>

          {/* XP */}
          <div 
            title="Pontos de experiência (XP)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 border-b-4 text-amber-700 dark:text-amber-400 font-extrabold text-sm"
          >
            <Zap className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{profile.xp}</span>
          </div>

          {/* CNH / Carteira de Habilitação HUD (Substitui os corações) */}
          <button
            onClick={() => {
              sounds.playClick();
              if (profile.cnhPoints > 0) {
                if (confirm(`Sua CNH está com ${profile.cnhPoints} pontos (Limite: ${profile.maxCnhPoints} pts). Deseja realizar a reciclagem para zerar a pontuação?`)) {
                  onResetCnhPoints();
                }
              }
            }}
            title={
              isSuspended
                ? "CNH Suspensa por pontos! Clique para reciclar"
                : `Pontos na Carteira: ${profile.cnhPoints} de ${profile.maxCnhPoints} pts. Clique para zerar.`
            }
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 border-b-4 font-black text-xs sm:text-sm cursor-pointer transition-all active:translate-y-0.5
              ${isSuspended
                ? 'bg-rose-100 dark:bg-rose-950 border-rose-400 dark:border-rose-700 text-rose-700 dark:text-rose-300 animate-bounce'
                : profile.cnhPoints > 10
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              }
            `}
          >
            <div className="w-5 h-4 bg-emerald-600 rounded-sm border border-emerald-800 flex items-center justify-center text-[9px] text-white font-black shadow-xs">
              CNH
            </div>
            <span>
              {isSuspended ? 'SUSPENSA!' : `${profile.cnhPoints}/${profile.maxCnhPoints} pts`}
            </span>
            {profile.cnhPoints > 0 && !isSuspended && (
              <span className="text-[10px] bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-1 rounded">
                +{profile.cnhPoints}
              </span>
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Simulado button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSimulado();
            }}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl duo-btn-yellow font-extrabold text-xs uppercase tracking-wide cursor-pointer shadow-sm"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Simulado 30Q</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleDarkMode();
            }}
            title={profile.darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
          >
            {profile.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            title={profile.soundEnabled ? "Desativar sons" : "Ativar sons"}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
          >
            {profile.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-500" />}
          </button>

          {/* User Profile / Login */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenAuth();
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 font-bold text-sm"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
              {profile.name ? profile.name[0].toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <span className="hidden sm:inline-block max-w-[90px] truncate">
              {profile.isLoggedIn ? profile.name : 'Entrar'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
