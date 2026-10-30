import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, CheckCircle, Lightbulb, Play } from 'lucide-react';
import { Lesson } from '../types';
import { TrafficSignComponent } from './TrafficSign';
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
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex flex-col justify-end select-none">
      {/* Backdrop click to dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Container */}
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-t-3xl border-t-2 border-slate-200 dark:border-slate-800 shadow-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden animate-bottom-sheet">
        {/* Drag / BottomSheet Handle */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header */}
        <header className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-800 dark:text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Material de Estudo Pré-Lição
              </span>
              <h3 className="text-base font-extrabold leading-tight">
                {lesson.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              {currentSlideIdx + 1} de {slides.length}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-[#FFC800] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Slide Content Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Badge & Title */}
            <div className="flex items-center gap-2 mb-2">
              {slide.badge && (
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  {slide.badge}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
                {slide.subtitle}
              </p>
            )}

            {/* Illustration / Traffic Sign / Stat Box */}
            <div className="my-5 flex flex-col sm:flex-row items-center gap-5 justify-center">
              {slide.signId && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-center shrink-0">
                  <TrafficSignComponent signId={slide.signId} size={110} />
                </div>
              )}

              {slide.stat && (
                <div className="p-5 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950/60 dark:to-yellow-900/40 rounded-2xl border-2 border-amber-300 dark:border-amber-700 text-center shrink-0 min-w-[180px] shadow-sm">
                  <span className="text-3xl font-black text-amber-900 dark:text-amber-300 block tracking-tight">
                    {slide.stat.value}
                  </span>
                  <span className="text-xs font-extrabold text-amber-800 dark:text-amber-400 uppercase mt-1 block">
                    {slide.stat.label}
                  </span>
                </div>
              )}
            </div>

            {/* Main paragraph */}
            <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              {slide.content}
            </p>

            {/* Bullets */}
            {slide.bullets && slide.bullets.length > 0 && (
              <div className="mt-4 space-y-2">
                {slide.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tip / Key takeaway */}
            {slide.tip && (
              <div className="mt-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-black text-amber-900 dark:text-amber-300 block text-xs uppercase tracking-wide">
                    Dica de Prova do DETRAN:
                  </strong>
                  <span>{slide.tip}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            disabled={currentSlideIdx === 0}
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onStartQuiz();
              }}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:underline cursor-pointer"
            >
              Pular Teoria
            </button>

            <button
              onClick={handleNext}
              className={`
                px-6 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wide cursor-pointer shadow-md flex items-center gap-2
                ${isLast ? 'duo-btn-green' : 'duo-btn-yellow'}
              `}
            >
              <span>{isLast ? 'Pronto para Praticar!' : 'Próximo'}</span>
              {isLast ? <Play className="w-4 h-4 fill-white text-white" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
