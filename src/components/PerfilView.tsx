import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  LogOut,
  ShieldCheck,
  Mail,
  Calendar,
  Share2,
  Users,
  ShieldAlert
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface PerfilViewProps {
  profile: UserProfile;
  onResetCnhPoints: () => void;
  onLogout: () => void;
}

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
  const [copiedLink, setCopiedLink] = useState(false);
  const isSuspended = profile.cnhPoints >= profile.maxCnhPoints;
  const history = profile.simuladosHistory || [];
  const totalSimulados = history.length;
  const passedCount = history.filter(h => h.passed).length;
  const approvalRate = totalSimulados > 0 ? Math.round((passedCount / totalSimulados) * 100) : 0;

  const handleShare = () => {
    sounds.playClick();
    if (navigator.share) {
      navigator.share({
        title: 'Diriggo - Estudando para CNH',
        text: `Estou me preparando para passar na prova do DETRAN com o Diriggo! Já tenho ${profile.xp} XP e ${profile.streak} dias de ofensiva.`,
        url: window.location.origin
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const username = profile.email 
    ? `@${profile.email.split('@')[0]}` 
    : `@condutor_${profile.streak}d`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 select-none font-sans">
      
      {/* 2-COLUMN DUOLINGO PROFILE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ======================================================== */}
        {/* LEFT / CENTER COLUMN (PROFILE HEADER + 2x2 STATS)        */}
        {/* ======================================================== */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. DUOLINGO PROFILE HEADER CARD */}
          <div className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-6 sm:p-8 relative shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* Large Avatar with dashed cyan circle (from Duolingo screenshot) */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-[#1cb0f6] bg-[#131f24] p-1.5 flex items-center justify-center relative">
                  {profile.photoURL && !photoError ? (
                    <img
                      src={profile.photoURL}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoError(true)}
                      className="w-full h-full rounded-full object-cover shadow-inner"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#1b3a4b] text-[#1cb0f6] font-black text-3xl flex items-center justify-center">
                      {getInitials(profile.name)}
                    </div>
                  )}

                  {/* Google Authenticated Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-md border border-slate-700">
                    <GoogleIcon />
                  </div>
                </div>

                {/* Edit Button */}
                <button 
                  onClick={handleShare}
                  className="absolute -top-1 -right-1 p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
                  title="Compartilhar Perfil"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* User Bio & Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight truncate">
                      {profile.name || 'Futuro Condutor'}
                    </h1>
                    <span className="text-sm font-bold text-slate-400 block mt-0.5">
                      {username}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider self-center sm:self-start">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Nuvem Ativa</span>
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-400 mt-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Por aqui desde outubro de 2026</span>
                </div>

                {/* Community / Social stats line (matching Duolingo screenshot) */}
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs font-bold text-slate-300">
                  <span className="text-[#1cb0f6] hover:underline cursor-pointer">
                    <strong>0</strong> Seguindo
                  </span>
                  <span>•</span>
                  <span className="text-[#1cb0f6] hover:underline cursor-pointer">
                    <strong>0</strong> Seguidores
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700">
                    <span>🇧🇷</span>
                    <span>Categoria B</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. "ESTATÍSTICAS" SECTION (2x2 CARDS MATCHING DUOLINGO SCREENSHOT) */}
          <div>
            <h2 className="text-xl font-black text-white tracking-tight mb-4 flex items-center gap-2">
              <span>Estatísticas</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat 1: Ofensiva / Dias Seguidos */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-5 flex items-center gap-4 shadow-sm hover:border-orange-500/60 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-3xl shrink-0">
                  <Flame className="w-8 h-8 text-orange-500 fill-orange-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    {profile.streak}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-1 block">
                    Dias Seguidos
                  </span>
                </div>
              </div>

              {/* Stat 2: Total de XP */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-5 flex items-center gap-4 shadow-sm hover:border-amber-500/60 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shrink-0">
                  <Zap className="w-8 h-8 text-[#FFC800] fill-[#FFC800]" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    {profile.xp}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-1 block">
                    Total de XP
                  </span>
                </div>
              </div>

              {/* Stat 3: Divisão / Liga Atual */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-5 flex items-center gap-4 shadow-sm hover:border-cyan-500/60 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl shrink-0">
                  <Trophy className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                    Prata
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-1 block">
                    Divisão de Pilotos
                  </span>
                </div>
              </div>

              {/* Stat 4: Pontuação CNH (20 pts limite) */}
              <div className={`rounded-2xl sm:rounded-3xl bg-[#182631] border-2 p-5 flex items-center gap-4 shadow-sm transition-all ${
                isSuspended 
                  ? 'border-rose-500 bg-[#3d181c]/30' 
                  : profile.cnhPoints >= 14 
                  ? 'border-amber-500/60' 
                  : 'border-[#2b3e4e]'
              }`}>
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl shrink-0 ${
                  isSuspended 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                }`}>
                  {isSuspended ? <ShieldAlert className="w-8 h-8 text-rose-500" /> : <span className="text-2xl">🪪</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl sm:text-3xl font-black block leading-none ${isSuspended ? 'text-rose-400' : 'text-white'}`}>
                      {profile.cnhPoints} / 20
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isSuspended ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {isSuspended ? 'Suspensa' : 'Regular'}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-1 block">
                    Pontos na CNH (CTB)
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* 3. HISTÓRICO DE SIMULADOS COMPACTO */}
          <div className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Últimos Simulados Realizados</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {totalSimulados} no total • {approvalRate}% aprovação
              </span>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs font-semibold">
                Nenhum simulado realizado ainda. Acesse a aba Simulados para testar sua nota de corte!
              </div>
            ) : (
              <div className="space-y-2.5">
                {history.slice(-4).reverse().map((sim, i) => (
                  <div
                    key={sim.id || i}
                    className="p-3.5 rounded-2xl bg-[#131f24] border border-slate-700/80 flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-black text-xs sm:text-sm text-white">
                        {sim.topicTitle || 'Simulado Geral Oficial DETRAN'}
                      </h5>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(sim.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-black text-white">
                          {sim.score} / {sim.total}
                        </span>
                        <span className="text-[10px] block font-bold text-slate-400">
                          {Math.round((sim.score / sim.total) * 100)}%
                        </span>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${
                        sim.passed 
                          ? 'bg-[#58cc02]/20 text-[#58cc02]' 
                          : 'bg-[#ea2b2b]/20 text-[#ea2b2b]'
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

        {/* ======================================================== */}
        {/* RIGHT COLUMN (COMMUNITY, RECYCLING & CNH CARD)           */}
        {/* ======================================================== */}
        <div className="space-y-6">
          
          {/* 1. DUOLINGO "ADICIONAR AMIGOS" WIDGET (from screenshot) */}
          <div className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-6 shadow-md">
            <h3 className="text-lg font-black text-white mb-2">
              Amigos & Comunidade
            </h3>
            
            <p className="text-xs font-semibold text-slate-300 leading-relaxed mb-4">
              Aprender as leis de trânsito é muito mais divertido e eficaz quando a gente compete junto!
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleShare}
                className="w-full p-3.5 rounded-2xl bg-[#131f24] hover:bg-slate-800 border border-slate-700 hover:border-[#1cb0f6] flex items-center justify-between text-xs font-black text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1cb0f6]/20 text-[#1cb0f6] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>{copiedLink ? 'Link Copiado!' : 'Convidar Amigos'}</span>
                </div>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* 2. CNH RECICLAGEM / PONTOS CARD */}
          <div className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-white">
                Gestão da Carteira CNH
              </h3>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                isSuspended ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {isSuspended ? 'Suspensa' : 'Regular'}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-400 leading-relaxed mb-4">
              Cada questão errada nas trilhas adiciona pontos por infração. Atingir 20 pontos suspende seu avanço até que a reciclagem seja realizada.
            </p>

            {/* Points bar */}
            <div className="bg-[#131f24] p-3 rounded-2xl border border-slate-700 mb-4">
              <div className="flex justify-between text-xs font-black mb-1.5">
                <span className="text-slate-300">Pontos Acumulados:</span>
                <span className="text-[#FFC800]">{profile.cnhPoints} / 20 pts</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSuspended ? 'bg-rose-500' : profile.cnhPoints >= 14 ? 'bg-amber-400' : 'bg-[#58cc02]'
                  }`}
                  style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1.5">
                <span>Limite: 20 pts (CTB)</span>
                <span>{Math.max(0, 20 - profile.cnhPoints)} pts restantes</span>
              </div>
            </div>

            {profile.cnhPoints > 0 ? (
              <button
                onClick={() => {
                  sounds.playCorrect();
                  onResetCnhPoints();
                }}
                className="w-full py-3 rounded-2xl duo-btn-yellow text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Fazer Reciclagem (Zerar Pontos)</span>
              </button>
            ) : (
              <div className="text-center py-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                ✨ Sua pontuação está zerada e regular!
              </div>
            )}
          </div>

          {/* 3. LOGOUT BUTTON */}
          <div className="rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] p-6 shadow-md text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 mb-4">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{profile.email || 'Conta Google vinculada'}</span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onLogout();
              }}
              className="w-full py-3 rounded-2xl border-2 border-rose-500/40 hover:bg-rose-950/40 text-rose-400 font-black text-xs uppercase tracking-wider cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta Google</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
