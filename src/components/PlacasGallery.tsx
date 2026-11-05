import React, { useState } from 'react';
import { Search, X, Zap, Sparkles, Trophy } from 'lucide-react';
import { TRAFFIC_SIGNS } from '../data/signs';
import { TrafficSignComponent } from './TrafficSign';
import { TrafficSign } from '../types';
import { sounds } from '../utils/sound';

interface PlacasGalleryProps {
  bothSidebarsActive?: boolean;
  onStartQuiz?: (category?: 'todas' | 'regulamentacao' | 'advertencia') => void;
}

export const PlacasGallery: React.FC<PlacasGalleryProps> = ({ 
  bothSidebarsActive = false,
  onStartQuiz
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'todas' | 'regulamentacao' | 'advertencia' | 'servicos' | 'turismo'>('todas');
  const [activeSignModal, setActiveSignModal] = useState<TrafficSign | null>(null);

  const allSigns = Object.values(TRAFFIC_SIGNS);

  const filteredSigns = allSigns.filter(sign => {
    const matchesSearch = 
      sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'todas' || sign.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 select-none">
      {/* Super Quiz Hero Banner (Estilo Duolingo Praticar) */}
      {onStartQuiz && (
        <div className="mb-6 rounded-3xl bg-gradient-to-r from-[#182631] via-[#1c2d3a] to-[#241a38] border-2 border-[#2b3e4e] p-5 sm:p-7 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-36 h-36 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-start gap-4 z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg shrink-0 border-b-4 border-amber-600">
              🛑
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  NOVO: MODO DUOLINGO
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-emerald-400" />
                  +30 XP POR ROUND
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Quiz Interativo de Reconhecimento de Placas
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 max-w-xl mt-1 leading-relaxed">
                Pratique o reconhecimento visual de placas com atalhos de teclado <strong>[1] [2] [3]</strong>, vidas dinâmicas e repetição espaçada das placas que você errar.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto z-10 flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => {
                const cat = selectedCategory === 'regulamentacao' || selectedCategory === 'advertencia'
                  ? selectedCategory
                  : 'todas';
                onStartQuiz(cat);
              }}
              className="duo-btn-yellow px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Jogar Quiz de Placas</span>
            </button>
          </div>
        </div>
      )}

      {/* Header Compacto */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-lg font-black shadow-xs shrink-0">
            🚦
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Catálogo de Placas de Trânsito
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Aprenda os códigos, significados e implicações legais das placas oficiais do CONTRAN.
            </p>
          </div>
        </div>

        {/* Informative pill */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 text-amber-950 dark:text-amber-200 text-xs leading-relaxed mt-3 shadow-xs">
          <strong>Atenção para a prova:</strong> Placas de <strong>Regulamentação (vermelhas)</strong> têm caráter mandatório e geram multa e pontos. Placas de <strong>Advertência (amarelas)</strong> alertam para perigos potenciais na via.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-5">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por código ou nome (ex: PARE, R-1, Curva)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-amber-400 dark:focus:border-amber-500 outline-none text-xs font-bold text-slate-900 dark:text-white transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedCategory('todas');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'todas'
                ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            Todas ({allSigns.length})
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setSelectedCategory('regulamentacao');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'regulamentacao'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700 hover:border-rose-400'
            }`}
          >
            <span>Regulamentação (R-*)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setSelectedCategory('advertencia');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'advertencia'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
            }`}
          >
            <span>Advertência (A-*)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setSelectedCategory('servicos');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'servicos'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            <span>Serviços</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setSelectedCategory('turismo');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'turismo'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:border-amber-700'
            }`}
          >
            <span>Turismo</span>
          </button>
        </div>
      </div>

      {/* Grid Denso e Elegante de Placas */}
      <div className={
        bothSidebarsActive
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3.5"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
      }>
        {filteredSigns.map(sign => {
          const isReg = sign.category === 'regulamentacao';

          return (
            <div
              key={sign.id}
              onClick={() => {
                sounds.playClick();
                setActiveSignModal(sign);
              }}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 border-b-4 hover:border-amber-400 dark:hover:border-amber-500 hover:translate-y-[-2px] transition-all cursor-pointer flex flex-col justify-between shadow-xs group"
            >
              <div>
                {/* Header with Code and Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    isReg 
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {sign.code}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 truncate ml-1">
                    {isReg ? 'Regulamentação' : 'Advertência'}
                  </span>
                </div>

                {/* Vector Traffic Sign Graphic (Refinado 56px) */}
                <div className={`my-1.5 flex justify-center items-center ${bothSidebarsActive ? 'h-20' : 'h-16'} group-hover:scale-105 transition-transform`}>
                  <TrafficSignComponent signId={sign.id} size={bothSidebarsActive ? 64 : 56} />
                </div>

                {/* Sign Name */}
                <h3 
                  className={`${bothSidebarsActive ? 'text-xs sm:text-sm' : 'text-xs'} font-black text-slate-900 dark:text-white mt-1 leading-tight line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors`}
                  title={sign.name}
                >
                  {sign.name}
                </h3>

                {/* Description */}
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                  {sign.description}
                </p>
              </div>

              {/* CTB Test Tip */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-bold text-amber-700 dark:text-amber-400">
                <span>Regras CTB</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSigns.length === 0 && (
        <div className="p-8 text-center bg-white dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 mt-4">
          <p className="text-sm font-black text-slate-700 dark:text-slate-300">
            Nenhuma placa encontrada para "{searchTerm}"
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todas');
            }}
            className="mt-3 px-3.5 py-1.5 rounded-xl duo-btn-yellow font-black text-xs uppercase cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Modal Detailed Sign View (Mantém zoom completo ao clicar) */}
      {activeSignModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveSignModal(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-md w-full p-6 border-b-6 border-slate-300 dark:border-slate-700 shadow-2xl relative animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSignModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 ${
                activeSignModal.category === 'regulamentacao'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {activeSignModal.code} • {activeSignModal.category === 'regulamentacao' ? 'Regulamentação' : 'Advertência'}
              </span>

              <div className="my-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <TrafficSignComponent signId={activeSignModal.id} size={120} />
              </div>

              <h2 className="text-xl font-black mt-3">
                {activeSignModal.name}
              </h2>

              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {activeSignModal.description}
              </p>

              {/* Legal Tip Box */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-left w-full">
                <strong className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 block mb-1">
                  💡 Pegadinha do DETRAN:
                </strong>
                <p className="text-xs sm:text-sm font-medium text-amber-950 dark:text-amber-200 leading-snug">
                  {activeSignModal.pointsToRemember}
                </p>
              </div>

              <button
                onClick={() => setActiveSignModal(null)}
                className="mt-6 w-full py-3 rounded-2xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-sm"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
