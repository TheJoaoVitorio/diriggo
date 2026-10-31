import React, { useEffect, useState } from 'react';

export type TrafficLightStage = 'red' | 'yellow' | 'green' | 'auto';

export interface TrafficLoaderProps {
  message?: string;
  subMessage?: string;
  /** 'red' | 'yellow' | 'green' | 'auto'. Alias for phase */
  stage?: TrafficLightStage;
  /** 'red' | 'yellow' | 'green' | 'auto'. Alias for stage */
  phase?: TrafficLightStage;
  className?: string;
}

export const TrafficLoader: React.FC<TrafficLoaderProps> = ({
  message = 'Carregando...',
  subMessage = 'Preparando sua rota segura no Diriggo',
  stage,
  phase,
  className = '',
}) => {
  const currentMode = stage || phase || 'auto';
  const [cycleLight, setCycleLight] = useState<'red' | 'yellow' | 'green'>('red');

  // Ciclo automático quando o modo for 'auto'
  useEffect(() => {
    if (currentMode !== 'auto') return;

    // Detecta fase pelas palavras-chave da mensagem
    const text = (message + ' ' + (subMessage || '')).toLowerCase();
    if (
      text.includes('verde') ||
      text.includes('pronto') ||
      text.includes('pilotar') ||
      text.includes('garagem') ||
      text.includes('aprovado') ||
      text.includes('sucesso')
    ) {
      setCycleLight('green');
      return;
    }
    if (
      text.includes('sincroniz') ||
      text.includes('matéria') ||
      text.includes('trilha') ||
      text.includes('detran') ||
      text.includes('atenção') ||
      text.includes('carregando') ||
      text.includes('pontua')
    ) {
      setCycleLight('yellow');
      return;
    }
    if (
      text.includes('conect') ||
      text.includes('autentic') ||
      text.includes('google') ||
      text.includes('verific') ||
      text.includes('segura') ||
      text.includes('aguarde')
    ) {
      setCycleLight('red');
      return;
    }

    // Se neutro, faz ciclo suave sequencial Red -> Yellow -> Green
    const interval = setInterval(() => {
      setCycleLight((prev) => {
        if (prev === 'red') return 'yellow';
        if (prev === 'yellow') return 'green';
        return 'red';
      });
    }, 850);

    return () => clearInterval(interval);
  }, [currentMode, message, subMessage]);

  const activeLight: 'red' | 'yellow' | 'green' =
    currentMode !== 'auto' ? currentMode : cycleLight;

  const isRed = activeLight === 'red';
  const isYellow = activeLight === 'yellow';
  const isGreen = activeLight === 'green';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 bg-[#131f24] flex flex-col items-center justify-center select-none overflow-hidden px-4 ${className}`}
    >
      {/* 1. Iluminação de Fundo Ambiente Sutil (reflete a cor do semáforo) */}
      <div
        className={`absolute w-[440px] h-[440px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-700 ${
          isRed
            ? 'bg-rose-600'
            : isYellow
            ? 'bg-amber-400'
            : 'bg-emerald-500'
        }`}
      />

      {/* 2. Pista de Trânsito com Faixa Tracejada */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-center">
        <div className="w-full max-w-md bg-slate-900/60 h-full relative border-x border-slate-700/40">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2.5 road-stripe animate-pulse" />
        </div>
      </div>

      {/* 3. Logo / Badge Diriggo Compacto */}
      <div className="relative z-10 flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-[#FFC800] border-b-2 border-[#CA8A04] flex items-center justify-center text-sm font-black text-slate-950 shadow-md">
          🚦
        </div>
        <span className="text-xl font-black tracking-tight text-white">
          dirig<span className="text-[#FFC800]">go</span>
        </span>
      </div>

      {/* 4. Semáforo Central Estilizado */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Caixa do Semáforo */}
        <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col items-center gap-3 relative">
          
          {/* LÂMPADA 1: VERMELHO (PARE / CONECTANDO) */}
          <div className="flex flex-col items-center">
            {/* Viseira / Aba superior antirreflexo */}
            <div className="w-12 sm:w-14 h-2.5 bg-slate-800 rounded-t-full border-t border-slate-600/70 -mb-1 z-20 shadow-sm pointer-events-none" />
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                isRed
                  ? 'bg-gradient-to-br from-rose-500 to-red-600 shadow-[0_0_36px_rgba(244,63,94,0.95)] border-2 border-rose-200 scale-105'
                  : 'bg-rose-950/40 border border-rose-900/30 opacity-40'
              }`}
            >
              {isRed && (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/70 blur-[0.6px] absolute top-2 left-2.5 pointer-events-none" />
                  <div className="w-6 h-6 rounded-full border border-white/20 opacity-40 pointer-events-none" />
                </>
              )}
            </div>
          </div>

          {/* LÂMPADA 2: AMARELO (ATENÇÃO / CARREGANDO DADOS) */}
          <div className="flex flex-col items-center">
            {/* Viseira / Aba superior antirreflexo */}
            <div className="w-12 sm:w-14 h-2.5 bg-slate-800 rounded-t-full border-t border-slate-600/70 -mb-1 z-20 shadow-sm pointer-events-none" />
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                isYellow
                  ? 'bg-gradient-to-br from-amber-300 to-[#FFC800] shadow-[0_0_36px_rgba(255,200,0,0.95)] border-2 border-amber-100 scale-105'
                  : 'bg-amber-950/40 border border-amber-900/30 opacity-40'
              }`}
            >
              {isYellow && (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/70 blur-[0.6px] absolute top-2 left-2.5 pointer-events-none" />
                  <div className="w-6 h-6 rounded-full border border-white/20 opacity-40 pointer-events-none" />
                </>
              )}
            </div>
          </div>

          {/* LÂMPADA 3: VERDE (SIGA / PRONTO) */}
          <div className="flex flex-col items-center">
            {/* Viseira / Aba superior antirreflexo */}
            <div className="w-12 sm:w-14 h-2.5 bg-slate-800 rounded-t-full border-t border-slate-600/70 -mb-1 z-20 shadow-sm pointer-events-none" />
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                isGreen
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_0_40px_rgba(16,185,129,1)] border-2 border-emerald-200 scale-105 animate-pulse'
                  : 'bg-emerald-950/40 border border-emerald-900/30 opacity-40'
              }`}
            >
              {isGreen && (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-white/80 blur-[0.6px] absolute top-2 left-2.5 pointer-events-none" />
                  <div className="w-6 h-6 rounded-full border border-white/25 opacity-40 pointer-events-none" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Poste Vertical e Sombra no Asfalto */}
        <div className="w-3.5 sm:w-4 h-11 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b shadow-md" />
        <div className="w-20 sm:w-24 h-2.5 bg-black/60 rounded-full blur-[2px] mt-0.5" />
      </div>

      {/* 5. Mensagem de Status Dinâmica */}
      <div className="relative z-10 mt-7 text-center max-w-sm flex flex-col items-center px-2 min-h-[64px]">
        <h2 className="text-base sm:text-lg font-black text-white tracking-wide transition-all">
          {message}
        </h2>
        {subMessage && (
          <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1 leading-relaxed transition-all">
            {subMessage}
          </p>
        )}
      </div>

      {/* 6. Barra de Progresso / Indicador Animado (Amarelo Trânsito #FFC800) */}
      <div className="relative z-10 w-48 sm:w-56 h-1.5 bg-slate-800/90 rounded-full overflow-hidden mt-4 border border-slate-700/60 p-[1px]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isGreen
              ? 'w-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
              : isYellow
              ? 'w-2/3 bg-[#FFC800] shadow-[0_0_12px_rgba(255,200,0,0.8)]'
              : 'w-1/3 bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]'
          }`}
        />
      </div>

      {/* Indicadores de Etapa do DETRAN */}
      <div className="relative z-10 flex items-center justify-between w-48 sm:w-56 mt-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
        <span className={isRed ? 'text-rose-400 font-extrabold' : ''}>1. Conexão</span>
        <span className={isYellow ? 'text-[#FFC800] font-extrabold' : ''}>2. Matérias</span>
        <span className={isGreen ? 'text-emerald-400 font-extrabold' : ''}>3. Garagem</span>
      </div>
    </div>
  );
};

export default TrafficLoader;
