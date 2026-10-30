import React, { useState } from 'react';
import { X, Heart, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Question } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { sounds } from '../utils/sound';

interface LessonModalProps {
  lesson: Lesson;
  hearts: number;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  onDeductHeart: () => void;
  onRefillHearts: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  hearts,
  onClose,
  onComplete,
  onDeductHeart,
  onRefillHearts
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'finished'>('idle');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const question: Question = lesson.questions[currentIdx];
  const progressPercent = ((currentIdx) / lesson.questions.length) * 100;

  const handleSelectOption = (optId: string) => {
    if (status !== 'idle') return;
    sounds.playClick();
    setSelectedOptionId(optId);
  };

  const handleVerify = () => {
    if (!selectedOptionId || status !== 'idle') return;

    if (selectedOptionId === question.correctOptionId) {
      sounds.playCorrect();
      setStatus('correct');
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      sounds.playIncorrect();
      sounds.playHeartLost();
      setStatus('wrong');
      onDeductHeart();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIdx + 1 < lesson.questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setStatus('idle');
    } else {
      // Completed lesson
      setStatus('finished');
      sounds.playComplete();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if canvas is not ready
      }
    }
  };

  // If user ran out of hearts
  if (hearts <= 0 && status !== 'finished') {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center border-b-6 border-slate-300 shadow-2xl animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-rose-100 mx-auto flex items-center justify-center text-3xl mb-4 border-2 border-rose-200">
            💔
          </div>
          <h3 className="text-2xl font-black text-slate-900">Você ficou sem vidas!</h3>
          <p className="text-sm font-semibold text-slate-600 mt-2">
            No trânsito real e no Diriggo, a atenção aos detalhes evita acidentes e infrações graves. Recarregue suas vidas para continuar!
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onRefillHearts();
              }}
              className="w-full py-3.5 rounded-2xl duo-btn-green font-black text-sm uppercase tracking-wide cursor-pointer shadow-md"
            >
              Recarregar 5 Vidas Grátis
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 text-sm cursor-pointer"
            >
              Voltar para a Trilha
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished Screen
  if (status === 'finished') {
    const accuracy = Math.round((correctAnswersCount / lesson.questions.length) * 100);
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-6">
        <div />
        <div className="flex flex-col items-center text-center max-w-md w-full animate-in zoom-in-90 duration-300">
          <div className="w-28 h-28 rounded-full bg-[#FFC800] border-b-8 border-[#CA8A04] flex items-center justify-center text-5xl mb-6 shadow-xl">
            🏆
          </div>
          <h2 className="text-3xl font-black text-slate-900">Lição Concluída!</h2>
          <p className="text-slate-600 font-semibold mt-1">
            Você dominou o conteúdo de {lesson.title}!
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-amber-50 border-2 border-amber-200 border-b-4 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs font-black uppercase text-amber-700 tracking-wider">XP Ganho</span>
              <span className="text-2xl font-black text-amber-900 mt-1">+{lesson.xpReward} XP</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 border-b-4 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">Precisão</span>
              <span className="text-2xl font-black text-emerald-900 mt-1">{accuracy}%</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md pb-6">
          <button
            onClick={() => {
              sounds.playClick();
              onComplete(lesson.xpReward);
            }}
            className="w-full py-4 rounded-2xl duo-btn-yellow font-black text-base uppercase tracking-wide cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <span>Continuar na Trilha</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="max-w-3xl w-full mx-auto px-4 pt-6 pb-4 flex items-center gap-4">
        <button
          onClick={() => {
            sounds.playClick();
            if (confirm('Tem certeza de que deseja sair da lição? Seu progresso nesta sessão será perdido.')) {
              onClose();
            }
          }}
          className="text-slate-400 hover:text-slate-700 p-2 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#22C55E] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts HUD */}
        <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-sm">
          <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="max-w-2xl w-full mx-auto px-4 flex-1 flex flex-col justify-center py-4">
        {/* Sign Vector if present */}
        {question.signId && (
          <div className="flex justify-center mb-4">
            <TrafficSignComponent signId={question.signId} size={110} />
          </div>
        )}

        {/* Question Text */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 text-center mb-6 leading-relaxed">
          {question.text}
        </h3>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === question.correctOptionId;

            let cardStyle = 'duo-btn-card';
            if (status === 'idle') {
              if (isSelected) cardStyle = 'selected ring-2 ring-amber-400';
            } else if (status === 'correct') {
              if (isCorrect) cardStyle = 'bg-emerald-50 border-emerald-400 border-b-4 border-emerald-600 text-emerald-950';
            } else if (status === 'wrong') {
              if (isSelected) cardStyle = 'bg-rose-50 border-rose-400 border-b-4 border-rose-600 text-rose-950';
              if (isCorrect) cardStyle = 'bg-emerald-50 border-emerald-400 border-b-4 border-emerald-600 text-emerald-950';
            }

            return (
              <button
                key={opt.id}
                disabled={status !== 'idle'}
                onClick={() => handleSelectOption(opt.id)}
                className={`
                  w-full text-left p-4 rounded-2xl flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base
                  ${cardStyle}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-black uppercase text-slate-700">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {status !== 'idle' && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 ml-2" />
                )}
                {status === 'wrong' && isSelected && (
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action / Feedback Drawer */}
      <div className={`
        w-full border-t-2 py-5 px-4 transition-colors duration-200
        ${status === 'idle'
          ? 'bg-white border-slate-200'
          : status === 'correct'
            ? 'bg-[#DCFCE7] border-[#86EFAC]'
            : 'bg-[#FEE2E2] border-[#FCA5A5]'
        }
      `}>
        <div className="max-w-2xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Feedback message */}
          {status === 'idle' ? (
            <div className="text-xs text-slate-400 font-bold hidden sm:block">
              Selecione uma resposta e clique em Verificar
            </div>
          ) : status === 'correct' ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-[#15803D] shrink-0" />
              <div>
                <h4 className="text-lg font-black text-[#15803D]">Excelente! Na faixa!</h4>
                <p className="text-xs sm:text-sm font-semibold text-emerald-900 mt-0.5">
                  {question.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <AlertCircle className="w-8 h-8 text-[#B91C1C] shrink-0" />
              <div>
                <h4 className="text-lg font-black text-[#B91C1C]">Resposta Incorreta</h4>
                <p className="text-xs sm:text-sm font-semibold text-rose-900 mt-0.5">
                  {question.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action button */}
          {status === 'idle' ? (
            <button
              disabled={!selectedOptionId}
              onClick={handleVerify}
              className={`
                w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wide
                transition-all cursor-pointer
                ${selectedOptionId
                  ? 'duo-btn-green shadow-md'
                  : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                }
              `}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`
                w-full sm:w-auto px-9 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wide cursor-pointer shadow-md
                ${status === 'correct' ? 'duo-btn-green' : 'duo-btn-red'}
              `}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
