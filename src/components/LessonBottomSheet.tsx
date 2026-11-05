import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Question } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { VisualIllustration } from './VisualIllustrations';
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
  const remainingHearts = Math.max(0, Math.ceil((maxCnhPoints - cnhPoints) / 4));

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
      const nextQueue = questionQueue.slice(1);
      if (nextQueue.length === 0) {
        setStatus('finished');
        sounds.playComplete();
        try {
          confetti({
            particleCount: 100,
            spread: 80,
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
      // Re-enqueue missed question to the end of the queue (Duolingo SRS pattern)
      const current = questionQueue[0];
      const reorderedQueue = [...questionQueue.slice(1), current];
      setQuestionQueue(reorderedQueue);
      setSelectedOptionId(null);
      setStatus('idle');
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4 to select, Enter to verify / continue)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status === 'finished' || isSuspended) return;

      if (status === 'idle' && currentQ) {
        if (e.key === '1' && currentQ.options[0]) {
          handleSelectOption(currentQ.options[0].id);
        } else if (e.key === '2' && currentQ.options[1]) {
          handleSelectOption(currentQ.options[1].id);
        } else if (e.key === '3' && currentQ.options[2]) {
          handleSelectOption(currentQ.options[2].id);
        } else if (e.key === '4' && currentQ.options[3]) {
          handleSelectOption(currentQ.options[3].id);
        }
      }

      if (e.key === 'Enter') {
        if (status === 'idle' && selectedOptionId) {
          handleVerify();
        } else if (status === 'correct' || status === 'wrong') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, selectedOptionId, currentQ, isSuspended]);

  // CNH Suspended Screen (Full Screen)
  if (isSuspended && status !== 'finished') {
    return (
      <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col justify-between select-none p-6 sm:p-12 overflow-y-auto">
        <div className="max-w-xl mx-auto my-auto text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-rose-500/20 border-4 border-rose-500 flex items-center justify-center text-5xl mb-6 shadow-2xl animate-bounce">
            🚫
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            CNH Suspensa por Excesso de Pontos!
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-300 mt-3 leading-relaxed">
            Você atingiu <strong className="text-rose-400">{cnhPoints} pontos</strong> na sua carteira. No Código de Trânsito Brasileiro, erros acumulados acarretam a suspensão da habilitação.
          </p>
          <p className="text-xs font-medium text-slate-400 mt-2">
            Faça a reciclagem pedagógica gratuita agora mesmo para zerar seus pontos e continuar sua jornada de aprovação!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => {
                sounds.playClick();
                onResetCnhPoints();
              }}
              className="flex-1 py-4 rounded-2xl duo-btn-yellow text-slate-950 font-black text-sm uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Fazer Reciclagem (Zerar Pontos)</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="py-4 px-6 rounded-2xl border-2 border-slate-700 hover:bg-slate-800 font-bold text-slate-300 text-sm cursor-pointer transition-colors"
            >
              Voltar à Garagem
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished Mastery Screen (Full Screen)
  if (status === 'finished') {
    return (
      <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col justify-between select-none p-6 sm:p-12 overflow-y-auto">
        <div className="max-w-lg mx-auto my-auto text-center flex flex-col items-center">
          <div className="w-28 h-28 rounded-3xl bg-[#FFC800] border-b-6 border-[#CA8A04] flex items-center justify-center text-5xl mb-6 shadow-2xl animate-pulse">
            🏆
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#FFC800] mb-1">
            Lição Concluída com Sucesso!
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Você dominou {lesson.title}!
          </h2>
          <p className="text-slate-300 font-semibold mt-2 text-sm sm:text-base leading-relaxed">
            Todas as questões foram fixadas no seu córtex de memória pelo sistema de repetição do Diriggo.
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-[#182631] border-2 border-amber-500/50 border-b-4 rounded-2xl p-4 flex flex-col items-center shadow-md">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">XP Ganho</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">+{lesson.xpReward} XP</span>
            </div>
            <div className="bg-[#182631] border-2 border-emerald-500/50 border-b-4 rounded-2xl p-4 flex flex-col items-center shadow-md">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">Acurácia</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1">100%</span>
            </div>
          </div>

          <div className="w-full mt-8">
            <button
              onClick={() => {
                sounds.playClick();
                onComplete(lesson.xpReward);
              }}
              className="w-full py-4 rounded-2xl duo-btn-yellow font-black text-base uppercase tracking-wider cursor-pointer shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <span>Continuar na Trilha</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if options have image/sign content (for Duolingo image grid view)
  const isImageChoice = currentQ && (
    currentQ.type === 'image_choice' ||
    currentQ.type === 'sign_choice' ||
    currentQ.options.some(opt => opt.signId || opt.illustration)
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col justify-between select-none overflow-hidden font-sans">
      
      {/* 1. DUOLINGO TOP BAR */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center gap-4">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            if (confirm('Tem certeza de que deseja sair da lição? Seu progresso nesta sessão será cancelado.')) {
              onClose();
            }
          }}
          className="text-slate-400 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
          title="Sair da lição"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Thick Rounded Progress Bar */}
        <div className="flex-1 h-3.5 sm:h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="h-full bg-[#58cc02] transition-all duration-300 ease-out rounded-full shadow-[0_0_12px_rgba(88,204,2,0.4)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Lives / Hearts Indicator (Duolingo Style) */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black text-sm">
          <span className="text-lg">❤️</span>
          <span>{remainingHearts}</span>
        </div>

        {/* CNH Points Badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-black bg-slate-800/90 px-2.5 py-1 rounded-xl border border-slate-700 text-slate-300">
          <span className="w-4 h-3 bg-emerald-600 rounded-xs flex items-center justify-center text-[7px] text-white font-black">CNH</span>
          <span className={cnhPoints > 10 ? 'text-rose-400 font-black' : 'text-slate-300'}>
            {cnhPoints}/{maxCnhPoints} pts
          </span>
        </div>
      </header>

      {/* 2. MAIN QUESTION CONTENT (FULL SCREEN CENTERED) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 flex flex-col justify-start overflow-y-auto no-scrollbar">
        {currentQ && (
          <div className="w-full flex flex-col items-center my-auto">
            
            {/* Subject / Word Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>{currentQ.badge || (isImageChoice ? 'ESCOLHA A IMAGEM' : 'CONCEITO CTB')}</span>
            </div>

            {/* Prompt Vector / Sign (if the question itself features a reference image) */}
            {currentQ.signId && (
              <div className="mb-4 drop-shadow-lg">
                <TrafficSignComponent signId={currentQ.signId} size={110} />
              </div>
            )}
            {currentQ.illustration && (
              <div className="mb-4 drop-shadow-lg">
                <VisualIllustration type={currentQ.illustration} size="md" />
              </div>
            )}

            {/* Question Headline (Bold, prominent, Duolingo typography) */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center leading-snug max-w-2xl mb-6 sm:mb-8">
              {currentQ.text}
            </h2>

            {/* ---------------------------------------------------- */}
            {/* OPTION FORMAT A: IMAGE CHOICE GRID (DUOLINGO 3-4 CARDS) */}
            {/* ---------------------------------------------------- */}
            {isImageChoice ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === currentQ.correctOptionId;

                  let cardStyle = 'bg-[#182631] border-2 border-[#2b3e4e] hover:border-[#3d5568] hover:bg-[#1e303d] text-slate-200';
                  if (status === 'idle') {
                    if (isSelected) {
                      cardStyle = 'bg-[#1a384b] border-2 border-[#1cb0f6] ring-2 ring-[#1cb0f6]/30 text-white shadow-xl translate-y-[-2px]';
                    }
                  } else if (status === 'correct') {
                    if (isCorrect) {
                      cardStyle = 'bg-[#18341e] border-2 border-[#58cc02] text-[#58cc02] shadow-xl';
                    }
                  } else if (status === 'wrong') {
                    if (isSelected) {
                      cardStyle = 'bg-[#3d181c] border-2 border-[#ea2b2b] text-[#ea2b2b] shadow-xl';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={status !== 'idle'}
                      className={`relative flex flex-col justify-between items-center p-4 rounded-2xl transition-all cursor-pointer text-left group ${cardStyle}`}
                    >
                      {/* Image / Plate in card center */}
                      <div className="w-full h-32 flex items-center justify-center p-2 mb-3">
                        {opt.signId && (
                          <TrafficSignComponent signId={opt.signId} size={100} />
                        )}
                        {opt.illustration && (
                          <VisualIllustration type={opt.illustration} size="sm" />
                        )}
                        {!opt.signId && !opt.illustration && (
                          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl">
                            🚗
                          </div>
                        )}
                      </div>

                      {/* Bottom row: Card label & keyboard badge (oculta o nome em sign_choice e image_choice para evitar spoiler) */}
                      <div className="w-full flex items-center justify-between pt-2 border-t border-slate-700/60">
                        {currentQ.type === 'sign_choice' ? (
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {opt.signId || `Opção ${idx + 1}`}
                          </span>
                        ) : currentQ.type === 'image_choice' ? (
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Opção {idx + 1}
                          </span>
                        ) : (
                          <span className="text-sm font-extrabold text-slate-100 group-hover:text-white leading-tight">
                            {opt.text}
                          </span>
                        )}
                        <span className="w-6 h-6 rounded-md border border-slate-700 bg-slate-900/80 text-[11px] font-black text-slate-400 flex items-center justify-center shrink-0 ml-2">
                          {idx + 1}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* ---------------------------------------------------- */
              /* OPTION FORMAT B: TEXT CARDS (DUOLINGO CARD STYLING)  */
              /* ---------------------------------------------------- */
              <div className="flex flex-col gap-3 w-full max-w-2xl">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === currentQ.correctOptionId;

                  let cardStyle = 'bg-[#182631] border-2 border-[#2b3e4e] hover:border-[#3d5568] hover:bg-[#1e303d] text-slate-200';
                  if (status === 'idle') {
                    if (isSelected) {
                      cardStyle = 'bg-[#1a384b] border-2 border-[#1cb0f6] ring-2 ring-[#1cb0f6]/30 text-white shadow-lg translate-y-[-1px]';
                    }
                  } else if (status === 'correct') {
                    if (isCorrect) {
                      cardStyle = 'bg-[#18341e] border-2 border-[#58cc02] text-[#58cc02]';
                    }
                  } else if (status === 'wrong') {
                    if (isSelected) {
                      cardStyle = 'bg-[#3d181c] border-2 border-[#ea2b2b] text-[#ea2b2b]';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={status !== 'idle'}
                      className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl transition-all cursor-pointer text-left group ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3.5 pr-2">
                        <span className="w-8 h-8 rounded-xl border border-slate-700 bg-slate-900/80 text-xs font-black text-slate-400 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base font-bold leading-snug">
                          {opt.text}
                        </span>
                      </div>

                      {status !== 'idle' && (
                        <div>
                          {isCorrect && <CheckCircle2 className="w-5 h-5 text-[#58cc02] shrink-0" />}
                          {!isCorrect && isSelected && <AlertCircle className="w-5 h-5 text-[#ea2b2b] shrink-0" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3. DUOLINGO PINNED BOTTOM BAR */}
      {status === 'idle' && (
        <footer className="w-full border-t-2 border-slate-800 bg-[#131f24] py-4 sm:py-6 px-4 sm:px-12">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                sounds.playClick();
                if (currentQ) {
                  // Re-enqueue question for later review
                  const reordered = [...questionQueue.slice(1), currentQ];
                  setQuestionQueue(reordered);
                  setSelectedOptionId(null);
                }
              }}
              className="text-slate-400 hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-3 rounded-2xl hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              Pular
            </button>

            <button
              onClick={handleVerify}
              disabled={!selectedOptionId}
              className={`px-8 sm:px-12 py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
                selectedOptionId
                  ? 'duo-btn-yellow text-slate-950 cursor-pointer active:translate-y-0.5'
                  : 'bg-[#202f36] text-[#52656d] border-b-4 border-[#18252b] cursor-not-allowed opacity-60'
              }`}
            >
              Verificar
            </button>
          </div>
        </footer>
      )}

      {status === 'correct' && (
        <footer className="w-full border-t-2 border-[#58cc02] bg-[#d7ffb8] dark:bg-[#18341e] py-5 px-4 sm:px-12 transition-all">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-[#58cc02] flex items-center justify-center text-white shrink-0 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-emerald-950 dark:text-emerald-100">
                  Excelente!
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 max-w-lg mt-0.5">
                  {currentQ?.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-10 py-3.5 rounded-2xl duo-btn-yellow text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-lg active:translate-y-0.5 self-end sm:self-center"
            >
              Continuar
            </button>
          </div>
        </footer>
      )}

      {status === 'wrong' && (
        <footer className="w-full border-t-2 border-[#ea2b2b] bg-[#ffdfe0] dark:bg-[#3d181c] py-5 px-4 sm:px-12 transition-all">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-[#ea2b2b] flex items-center justify-center text-white shrink-0 shadow-sm">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-rose-950 dark:text-rose-100">
                  Resposta incorreta
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-rose-800 dark:text-rose-300 max-w-lg mt-0.5">
                  {currentQ?.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-10 py-3.5 rounded-2xl duo-btn-red font-black text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-lg active:translate-y-0.5 self-end sm:self-center"
            >
              Continuar
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
