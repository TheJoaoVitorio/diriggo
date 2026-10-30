import React from 'react';
import { Flame, Heart, Zap, Volume2, VolumeX, User, ClipboardCheck } from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface NavbarProps {
  profile: UserProfile;
  onOpenSimulado: () => void;
  onOpenAuth: () => void;
  onToggleSound: () => void;
  onRefillHearts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenSimulado,
  onOpenAuth,
  onToggleSound,
  onRefillHearts
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b-2 border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center shadow-sm">
            <span className="text-xl">🚦</span>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Dirig<span className="text-[#CA8A04]">go</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
              CNH Brasil
            </span>
          </div>
        </div>

        {/* Center / Stats HUD */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div 
            title="Dias seguidos de ofensiva"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-orange-50 border-2 border-orange-200 border-b-4 text-orange-600 font-extrabold text-sm"
          >
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{profile.streak}</span>
          </div>

          {/* XP */}
          <div 
            title="Pontos de experiência (XP)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border-2 border-amber-200 border-b-4 text-amber-700 font-extrabold text-sm"
          >
            <Zap className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{profile.xp}</span>
          </div>

          {/* Hearts / Vidas */}
          <button
            onClick={() => {
              sounds.playClick();
              if (profile.hearts < profile.maxHearts) {
                onRefillHearts();
              }
            }}
            title={profile.hearts < profile.maxHearts ? "Clique para recarregar vidas!" : "Vidas cheias"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-rose-50 border-2 border-rose-200 border-b-4 text-rose-600 font-extrabold text-sm hover:bg-rose-100 cursor-pointer active:translate-y-0.5"
          >
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span>{profile.hearts}/{profile.maxHearts}</span>
            {profile.hearts < profile.maxHearts && (
              <span className="text-xs bg-rose-200 text-rose-800 px-1 rounded-md ml-0.5">+</span>
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
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

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            title={profile.soundEnabled ? "Desativar sons" : "Ativar sons"}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
          >
            {profile.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-500" />}
          </button>

          {/* User Profile / Login */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenAuth();
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 cursor-pointer text-slate-700 font-bold text-sm"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
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
