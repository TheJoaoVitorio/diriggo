import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Play } from 'lucide-react';
import { Lesson } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { VisualIllustration } from './VisualIllustrations';
import { sounds } from '../utils/sound';

interface TheoryBottomSheetProps {
  lesson: Lesson;
  onClose: () => void;
  onStartQuiz: () => void;
}

export const TheoryBottomSheet: React.FC<TheoryBottomSheetProps> = ({
  lesson,
  onClose,
  onStartQuiz
}) => {
  const slides = lesson.theorySlides || [];
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  if (slides.length === 0) {
    onStartQuiz();
    return null;
  }

  const slide = slides[currentSlideIdx];
  const isLast = currentSlideIdx === slides.length - 1;
  const progressPercent = ((currentSlideIdx + 1) / slides.length) * 100;

  const handleNext = () => {
    sounds.playClick();
    if (!isLast) {
      setCurrentSlideIdx(prev => prev + 1);
    } else {
      onStartQuiz();
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col justify-between select-none overflow-hidden font-sans">
      
      {/* 1. TOP HEADER BAR */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center gap-4">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="text-slate-400 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
          title="Sair do material"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3.5 sm:h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="h-full bg-[#FFC800] transition-all duration-300 ease-out rounded-full shadow-[0_0_12px_rgba(255,200,0,0.4)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <span className="text-xs font-black uppercase text-amber-400 bg-amber-950/60 border border-amber-600/40 px-3 py-1 rounded-xl">
          {currentSlideIdx + 1} / {slides.length}
        </span>
      </header>

      {/* 2. MAIN IMMERSIVE SLIDE CONTENT */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-4 flex flex-col justify-start overflow-y-auto no-scrollbar">
        <div className="w-full flex flex-col items-center my-auto">
          
          {/* Badge & Subtitle */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
              {slide.badge || 'Material de Estudo'}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {lesson.title}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center leading-tight mb-2">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-sm sm:text-base font-semibold text-slate-400 text-center mb-6">
              {slide.subtitle}
            </p>
          )}

          {/* Visual Illustration / Sign / Stat Box */}
          <div className="my-3 flex flex-col sm:flex-row items-center gap-5 justify-center w-full">
            {slide.illustration && (
              <div className="p-3 bg-[#182631] rounded-2xl border-2 border-slate-700 shadow-md shrink-0 flex items-center justify-center">
                <VisualIllustration type={slide.illustration} size="md" />
              </div>
            )}

            {slide.signId && (
              <div className="p-4 bg-[#182631] rounded-2xl border-2 border-slate-700 shadow-md shrink-0 flex items-center justify-center">
                <TrafficSignComponent signId={slide.signId} size={110} />
              </div>
            )}

            {slide.stat && (
              <div className="p-5 bg-gradient-to-br from-amber-950/60 to-yellow-950/40 rounded-2xl border-2 border-amber-500/50 text-center shrink-0 min-w-[200px] shadow-md">
                <span className="text-3xl sm:text-4xl font-black text-amber-300 block tracking-tight">
                  {slide.stat.value}
                </span>
                <span className="text-xs font-extrabold text-amber-400 uppercase mt-1 block tracking-wider">
                  {slide.stat.label}
                </span>
              </div>
            )}
          </div>

          {/* Main Content Paragraph */}
          <p className="text-base sm:text-lg font-medium text-slate-200 text-center max-w-2xl leading-relaxed my-4">
            {slide.content}
          </p>

          {/* Bullets Key Takeaways */}
          {slide.bullets && slide.bullets.length > 0 && (
            <div className="w-full max-w-xl space-y-2 mt-2">
              {slide.bullets.map((bullet, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-200 bg-[#182631] p-3.5 rounded-2xl border border-slate-700/80 shadow-xs"
                >
                  <CheckCircle className="w-4 h-4 text-[#58cc02] shrink-0 mt-0.5" />
                  <span className="leading-snug">{bullet}</span>
                </div>
              ))}
            </div>
          )}

          {/* DETRAN Tip Box */}
          {slide.tip && (
            <div className="w-full max-w-xl mt-4 p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-3 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-base font-black shrink-0 shadow-sm">
                🚦
              </div>
              <div>
                <strong className="font-black text-amber-300 block text-xs uppercase tracking-wide">
                  Dica do Instrutor Diriggo:
                </strong>
                <span className="text-amber-100">{slide.tip}</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. PINNED BOTTOM ACTION BAR */}
      <footer className="w-full border-t-2 border-slate-800 bg-[#131f24] py-4 sm:py-6 px-4 sm:px-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            disabled={currentSlideIdx === 0}
            onClick={handlePrev}
            className="px-5 py-3 rounded-2xl border-2 border-slate-700 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onStartQuiz();
              }}
              className="text-xs font-bold text-slate-400 hover:text-white hover:underline cursor-pointer transition-colors"
            >
              Pular Teoria
            </button>

            <button
              onClick={handleNext}
              className="px-8 sm:px-10 py-3.5 rounded-2xl duo-btn-yellow text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-lg flex items-center gap-2 active:translate-y-0.5 transition-all"
            >
              <span>{isLast ? 'Pronto para Praticar!' : 'Continuar'}</span>
              {isLast ? <Play className="w-4 h-4 fill-slate-950 text-slate-950" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
