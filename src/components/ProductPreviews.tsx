import React from 'react';
import { 
  Star, 
  Crown, 
  Check, 
  Lock, 
  Flame, 
  Zap, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Heart,
  ShieldAlert
} from 'lucide-react';
import { TrafficSignComponent } from './TrafficSign';
import { MascotFarolito } from './LandingIllustrations';

/**
 * 1. TRILHA CAPTURE MOCKUP
 * Shows the authentic Diriggo serpentine learning road with Unit header,
 * active bouncing lesson node, completed crowns, and stats.
 */
export const TrilhaMockupPreview: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-[460px] bg-[#131f24] text-white rounded-3xl border-2 border-slate-700/80 shadow-2xl overflow-hidden select-none ${className}`}>
      {/* Browser / App Window Chrome */}
      <div className="bg-[#0e161a] px-3.5 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>
        <div className="flex items-center gap-1.5 bg-[#182631] px-3 py-0.5 rounded-md border border-slate-700/60 text-[10px] font-mono text-slate-400">
          <Lock className="w-2.5 h-2.5 text-amber-400" />
          <span>diriggo.com.br/trilha</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>AO VIVO</span>
        </div>
      </div>

      {/* Top Floating Stats Bar */}
      <div className="bg-[#182631]/90 border-b border-slate-800 px-3.5 py-2 flex items-center justify-between text-xs font-black">
        <div className="flex items-center gap-1.5 text-orange-400">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
          <span>5 DIAS</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>120 XP</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-lg text-[10px]">
          <ShieldAlert className="w-3 h-3 text-emerald-400" />
          <span>CNH: 0/20 PTS</span>
        </div>
      </div>

      {/* Unit Header Card */}
      <div className="p-4 bg-[#131f24]">
        <div className="bg-[#FFC800] border-b-4 border-[#CA8A04] text-slate-950 rounded-2xl p-3.5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 block">
              UNIDADE 1
            </span>
            <h4 className="text-sm font-black leading-tight text-slate-950">
              Fundamentos do Trânsito & Placas
            </h4>
          </div>
          <div className="px-2.5 py-1.5 rounded-xl bg-slate-950/10 border border-slate-950/20 text-slate-950 font-black text-[10px] uppercase flex items-center gap-1">
            <BookOpen className="w-3 h-3 stroke-[2.5]" />
            <span>GUIA</span>
          </div>
        </div>

        {/* Winding Path Area */}
        <div className="relative py-6 flex flex-col items-center">
          {/* Subtle dashed background center line */}
          <div className="absolute inset-y-4 w-1 [background:repeating-linear-gradient(to_bottom,#CA8A04_0_8px,transparent_8px_16px)] opacity-30 pointer-events-none" />

          {/* Node 1: Completed */}
          <div className="flex flex-col items-center -translate-x-12 mb-5 relative group">
            <div className="w-14 h-14 rounded-full bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-slate-950 shadow-md relative">
              <div className="absolute -top-1.5 -right-1 w-5 h-5 rounded-full bg-slate-950 border border-[#CA8A04] flex items-center justify-center">
                <Crown className="w-3 h-3 text-[#FFC800] fill-[#FFC800]" />
              </div>
              <Check className="w-6 h-6 stroke-[3.5]" />
            </div>
            <span className="text-[10px] font-black text-slate-300 mt-1">Placas R-1 & R-2</span>
          </div>

          {/* Node 2: Current Active (Glowing Yellow + Farolito Mascot) */}
          <div className="flex flex-col items-center translate-x-8 mb-5 relative">
            {/* "COMEÇAR" Floating Tooltip */}
            <div className="absolute -top-10 z-20 flex flex-col items-center animate-bounce">
              <div className="bg-[#182631] border-2 border-[#CA8A04] text-[#FFC800] font-black text-[10px] px-2.5 py-0.5 rounded-lg shadow-lg tracking-wider uppercase">
                COMEÇAR
              </div>
              <div className="w-2 h-2 bg-[#182631] border-r-2 border-b-2 border-[#CA8A04] rotate-45 -mt-1" />
            </div>

            {/* Glowing Active Button */}
            <div className="w-16 h-16 rounded-full bg-[#FFC800] border-b-[5px] border-[#CA8A04] flex items-center justify-center text-slate-950 shadow-xl ring-4 ring-[#FFC800]/40 relative">
              <Star className="w-8 h-8 fill-slate-950 text-slate-950" />
            </div>
            <span className="text-[10px] font-black text-amber-400 mt-1">Preferência</span>

            {/* Farolito Mascot cheering on the side */}
            <div className="absolute -right-20 -top-2 scale-75 pointer-events-none">
              <MascotFarolito size={80} />
            </div>
          </div>

          {/* Node 3: Locked */}
          <div className="flex flex-col items-center -translate-x-8 relative opacity-60">
            <div className="w-13 h-13 rounded-full bg-[#202f36] border-b-4 border-[#162026] flex items-center justify-center text-[#52656d]">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1">Velocidades</span>
          </div>
        </div>

        {/* Bottom Banner inside mockup */}
        <div className="mt-2 p-2.5 rounded-xl bg-[#182631]/80 border border-slate-700/50 flex items-center justify-between text-[11px] font-bold text-slate-300">
          <span className="flex items-center gap-1 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" /> Trilha Interativa CONTRAN
          </span>
          <span className="text-slate-400 text-[10px]">3/12 Lições</span>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. QUIZ CAPTURE MOCKUP
 * Shows the authentic Diriggo Quiz screen with official CONTRAN traffic signs,
 * responsive cards, highlighted selection, and celebration feedback bar.
 */
export const QuizMockupPreview: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-[460px] bg-[#131f24] text-white rounded-3xl border-2 border-slate-700/80 shadow-2xl overflow-hidden select-none ${className}`}>
      {/* Browser / App Window Chrome */}
      <div className="bg-[#0e161a] px-3.5 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>
        <div className="flex items-center gap-1.5 bg-[#182631] px-3 py-0.5 rounded-md border border-slate-700/60 text-[10px] font-mono text-slate-400">
          <Lock className="w-2.5 h-2.5 text-amber-400" />
          <span>diriggo.com.br/quiz-placas</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-black text-rose-400">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>5</span>
        </div>
      </div>

      {/* Quiz Top Progress Bar */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-[#37464f] rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full w-2/5" />
        </div>
        <span className="text-[10px] font-bold text-slate-400">4/10</span>
      </div>

      {/* Question Playground */}
      <div className="px-4 py-3 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="text-[9px] font-black uppercase tracking-wider text-purple-300 bg-purple-900/40 border border-purple-500/40 px-2.5 py-0.5 rounded-full mb-2">
          IDENTIFIQUE A PLACA
        </span>

        {/* Question Text */}
        <h4 className="text-sm sm:text-base font-black text-white leading-snug mb-4 max-w-sm">
          Qual destas placas adverte sobre &ldquo;Curva Acentuada em S à Esquerda&rdquo;?
        </h4>

        {/* 3 Option Cards */}
        <div className="grid grid-cols-3 gap-2.5 w-full mb-3">
          {/* Card A (Placa R-1) */}
          <div className="rounded-2xl p-2.5 bg-[#182631] border-2 border-[#2b3e4e] flex flex-col items-center justify-between h-28 opacity-80">
            <div className="flex-1 flex items-center justify-center">
              <TrafficSignComponent signId="R-1" size={54} />
            </div>
            <div className="w-full flex items-center justify-between pt-1 border-t border-slate-700/40 text-[10px] font-black text-slate-400">
              <span>R-1</span>
              <span className="w-4 h-4 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px]">A</span>
            </div>
          </div>

          {/* Card B (Placa A-5A) - SELECTED & CORRECT */}
          <div className="rounded-2xl p-2.5 bg-amber-400/15 border-2 border-amber-400 border-b-4 border-b-amber-500 shadow-[0_0_16px_rgba(251,191,36,0.25)] flex flex-col items-center justify-between h-28 scale-105 z-10">
            <div className="flex-1 flex items-center justify-center">
              <TrafficSignComponent signId="A-5A" size={56} />
            </div>
            <div className="w-full flex items-center justify-between pt-1 border-t border-amber-400/30 text-[10px] font-black text-amber-400">
              <span>A-5A</span>
              <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-black">B</span>
            </div>
          </div>

          {/* Card C (Placa A-21A) */}
          <div className="rounded-2xl p-2.5 bg-[#182631] border-2 border-[#2b3e4e] flex flex-col items-center justify-between h-28 opacity-80">
            <div className="flex-1 flex items-center justify-center">
              <TrafficSignComponent signId="A-21A" size={54} />
            </div>
            <div className="w-full flex items-center justify-between pt-1 border-t border-slate-700/40 text-[10px] font-black text-slate-400">
              <span>A-21A</span>
              <span className="w-4 h-4 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px]">C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pinned Verification Bar with Yellow Feedback */}
      <div className="bg-[#292214] border-t-2 border-amber-400 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5 stroke-[3]" />
          </div>
          <div className="text-left">
            <span className="text-xs font-black text-amber-400 block leading-none mb-0.5">
              Muito bem!
            </span>
            <span className="text-[10px] text-amber-200/90 font-medium line-clamp-1">
              Placa A-5A: Curva em S à esquerda
            </span>
          </div>
        </div>

        {/* Yellow Continue Button */}
        <div className="duo-btn-yellow text-slate-950 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm shrink-0">
          <span>Continuar</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
