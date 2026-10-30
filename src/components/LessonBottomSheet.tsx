import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Question } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { sounds } from '../utils/sound';

interface LessonBottomSheetProps {
  lesson: Lesson;
  cnhPoints: number;
  maxCnhPoints: number;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  onAddCnhPoints: (points: number) => void;
  onResetCnhPoints: () => void;
}

export const LessonBottomSheet: React.FC<LessonBottomSheetProps> = ({
  lesson,
  cnhPoints,
  maxCnhPoints,
  onClose,
  onComplete,
  onAddCnhPoints,
  onResetCnhPoints
}) => {
  // Question Queue: includes initial questions and any question answered incorrectly
  const [questionQueue, setQuestionQueue] = useState<Question[]>([...lesson.questions]);
  const [totalInitialCount] = useState(lesson.questions.length);
  const [completedCount, setCompletedCount] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'finished'>('idle');

  const isSuspended = cnhPoints >= maxCnhPoints;
  const currentQ = questionQueue[0];
  const progressPercent = Math.min(100, (completedCount / totalInitialCount) * 100);

  const handleSelectOption = (optId: string) => {
    if (status !== 'idle') return;
    sounds.playClick();
    setSelectedOptionId(optId);
  };

  const handleVerify = () => {
    if (!selectedOptionId || status !== 'idle' || !currentQ) return;

    if (selectedOptionId === currentQ.correctOptionId) {
      sounds.playCorrect();
      setStatus('correct');
      setCompletedCount(prev => prev + 1);
    } else {
      sounds.playIncorrect();
      sounds.playPenalty();
      setStatus('wrong');
      // Add 4 points to CNH (standard medium/grave infraction)
      onAddCnhPoints(4);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (!currentQ) return;

    if (status === 'correct') {
      // Remove current question from queue
      const nextQueue = questionQueue.slice(1);
      if (nextQueue.length === 0) {
        // All mastered!
        setStatus('finished');
        sounds.playComplete();
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch {
          // fallback
        }
      } else {
        setQuestionQueue(nextQueue);
        setSelectedOptionId(null);
        setStatus('idle');
      }
    } else if (status === 'wrong') {
      // Re-enqueue the missed question to the end of the queue so student MUST answer correctly later!
      const current = questionQueue[0];
      const reorderedQueue = [...questionQueue.slice(1), current];
      setQuestionQueue(reorderedQueue);
      setSelectedOptionId(null);
      setStatus('idle');
    }
  };

  // If CNH is suspended
  if (isSuspended && status !== 'finished') {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end select-none">
        <div className="flex-1" onClick={onClose} />
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-t-3xl p-6 sm:p-8 text-center border-t-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-bottom-sheet">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />
          <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-950 mx-auto flex items-center justify-center text-4xl mb-4 border-2 border-rose-300 dark:border-rose-700">
            🚫
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            CNH Suspensa por Excesso de Pontos!
          </h3>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
            Você atingiu <strong>{cnhPoints} pontos</strong> na sua carteira. No trânsito brasileiro, erros repetidos causam suspensão. Faça o curso de reciclagem para zerar sua pontuação e continuar!
          </p>
          <div className="mt-6 flex flex-col gap-3 max-w-sm mx-auto">
            <button
              onClick={() => {
                sounds.playClick();
                onResetCnhPoints();
              }}
              className="w-full py-3.5 rounded-2xl duo-btn-green font-black text-sm uppercase tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Fazer Reciclagem (Zerar Pontos)</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 text-sm cursor-pointer"
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
    return (
      <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex flex-col justify-end select-none">
        <div className="flex-1" onClick={onClose} />
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-t-3xl p-6 sm:p-8 text-center border-t-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-bottom-sheet flex flex-col items-center">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mb-4" />
          <div className="w-24 h-24 rounded-full bg-[#FFC800] border-b-6 border-[#CA8A04] flex items-center justify-center text-4xl mb-4 shadow-xl">
            🏆
          </div>
          <h2 className="text-3xl font-black leading-tight">Lição Concluída e Dominada!</h2>
          <p className="text-slate-600 dark:text-slate-300 font-semibold mt-1 max-w-md">
            Você respondeu todas as questões corretamente e garantiu seu aprendizado em <strong>{lesson.title}</strong>!
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-6">
            <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 border-b-4 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider">XP Ganho</span>
              <span className="text-2xl font-black text-amber-900 dark:text-amber-300 mt-1">+{lesson.xpReward} XP</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800 border-b-4 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Domínio</span>
              <span className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1">100% Acertos</span>
            </div>
          </div>

          <div className="w-full max-w-md mt-6">
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
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex flex-col justify-end select-none">
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Modal */}
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-t-3xl border-t-2 border-slate-200 dark:border-slate-800 shadow-2xl max-h-[94vh] sm:max-h-[88vh] flex flex-col justify-between overflow-hidden animate-bottom-sheet">
        {/* Drag / BottomSheet Handle */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="w-full px-5 pb-3 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              sounds.playClick();
              if (confirm('Tem certeza de que deseja sair da lição? Seu progresso nesta sessão será perdido.')) {
                onClose();
              }
            }}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#22C55E] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* CNH Points status */}
          <div className="flex items-center gap-1.5 text-xs font-black bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700">
            <span className="w-4 h-3 bg-emerald-600 rounded-xs flex items-center justify-center text-[7px] text-white">CNH</span>
            <span className={cnhPoints > 10 ? 'text-rose-600 dark:text-rose-400 font-black' : 'text-slate-700 dark:text-slate-300'}>
              {cnhPoints}/{maxCnhPoints} pts
            </span>
          </div>
        </div>

        {/* Main Question Body */}
        <div className="w-full px-5 sm:px-8 py-5 flex-1 overflow-y-auto">
          {/* Sign Vector if present */}
          {currentQ.signId && (
            <div className="flex justify-center mb-4">
              <TrafficSignComponent signId={currentQ.signId} size={110} />
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-extrabold text-center mb-5 leading-relaxed">
            {currentQ.text}
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === currentQ.correctOptionId;

              let cardStyle = 'duo-btn-card';
              if (status === 'idle') {
                if (isSelected) cardStyle = 'selected ring-2 ring-amber-400';
              } else if (status === 'correct') {
                if (isCorrect) cardStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 dark:border-emerald-600 border-b-4 text-emerald-950 dark:text-emerald-100';
              } else if (status === 'wrong') {
                if (isSelected) cardStyle = 'bg-rose-50 dark:bg-rose-950/70 border-rose-400 dark:border-rose-600 border-b-4 text-rose-950 dark:text-rose-100';
                if (isCorrect) cardStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 dark:border-emerald-600 border-b-4 text-emerald-950 dark:text-emerald-100';
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
                    <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-black uppercase text-slate-700 dark:text-slate-300 shrink-0">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {status !== 'idle' && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                  )}
                  {status === 'wrong' && isSelected && (
                    <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Action / Feedback Sheet */}
        <div className={`
          w-full border-t-2 py-4 px-5 transition-colors duration-200
          ${status === 'idle'
            ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
            : status === 'correct'
              ? 'bg-[#DCFCE7] dark:bg-emerald-950/80 border-[#86EFAC] dark:border-emerald-700'
              : 'bg-[#FEE2E2] dark:bg-rose-950/80 border-[#FCA5A5] dark:border-rose-700'
          }
        `}>
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Feedback message */}
            {status === 'idle' ? (
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold hidden sm:block">
                Escolha uma resposta e clique em Verificar
              </div>
            ) : status === 'correct' ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-black text-[#15803D] dark:text-emerald-300">Excelente! Na faixa!</h4>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-900 dark:text-emerald-200 mt-0.5">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <AlertCircle className="w-7 h-7 text-[#B91C1C] dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-black text-[#B91C1C] dark:text-rose-300 flex items-center gap-2">
                    <span>Resposta Incorreta (+4 pts na CNH)</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-rose-900 dark:text-rose-200 mt-0.5">
                    {currentQ.explanation}
                  </p>
                  <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 block mt-1">
                    🔄 Para passar de fase, esta questão retornará até você dominá-la!
                  </span>
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
                  transition-all cursor-pointer shrink-0
                  ${selectedOptionId
                    ? 'duo-btn-green shadow-md'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-b-4 border-slate-300 dark:border-slate-800 cursor-not-allowed'
                  }
                `}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`
                  w-full sm:w-auto px-9 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wide cursor-pointer shadow-md shrink-0
                  ${status === 'correct' ? 'duo-btn-green' : 'duo-btn-red'}
                `}
              >
                {status === 'correct' ? 'Continuar' : 'Entendi, Refazer'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
