import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, CheckCircle, Lightbulb, Play } from 'lucide-react';
import { Lesson } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { sounds } from '../utils/sound';

interface TheoryModalProps {
  lesson: Lesson;
  onClose: () => void;
  onStartQuiz: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({
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
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col max-h-[92vh] border-b-6 border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <header className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                Material de Estudo Pré-Lição
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {lesson.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
              {currentSlideIdx + 1} de {slides.length}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 overflow-hidden">
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
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {slide.badge}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-sm font-bold text-slate-500 mt-1">
                {slide.subtitle}
              </p>
            )}

            {/* Illustration / Traffic Sign / Stat Box */}
            <div className="my-5 flex flex-col sm:flex-row items-center gap-5 justify-center">
              {slide.signId && (
                <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner flex items-center justify-center shrink-0">
                  <TrafficSignComponent signId={slide.signId} size={120} />
                </div>
              )}

              {slide.stat && (
                <div className="p-5 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl border-2 border-amber-300 text-center shrink-0 min-w-[180px] shadow-sm">
                  <span className="text-3xl font-black text-amber-900 block tracking-tight">
                    {slide.stat.value}
                  </span>
                  <span className="text-xs font-extrabold text-amber-800 uppercase mt-1 block">
                    {slide.stat.label}
                  </span>
                </div>
              )}
            </div>

            {/* Main paragraph */}
            <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
              {slide.content}
            </p>

            {/* Bullets */}
            {slide.bullets && slide.bullets.length > 0 && (
              <div className="mt-4 space-y-2">
                {slide.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tip / Key takeaway */}
            {slide.tip && (
              <div className="mt-5 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-black text-amber-900 block text-xs uppercase tracking-wide">
                    Dica de Prova do DETRAN:
                  </strong>
                  <span>{slide.tip}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            disabled={currentSlideIdx === 0}
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
              className="text-xs font-bold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
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
