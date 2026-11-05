import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRAFFIC_SIGNS } from '../data/signs';
import { TrafficSign } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { sounds } from '../utils/sound';

export type PlacaQuizCategory = 'todas' | 'regulamentacao' | 'advertencia';

interface PlacasQuizViewProps {
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  initialCategory?: PlacaQuizCategory;
}

interface QuizOption {
  id: string;
  signId: string;
  name: string;
  code: string;
  badgeNumber: number;
}

interface QuizQuestion {
  id: string;
  mode: 'image_choice' | 'name_choice';
  targetSign: TrafficSign;
  prompt: string;
  badgeLabel: string;
  options: QuizOption[];
  correctOptionId: string;
  legalTip: string;
  description: string;
}

const TOTAL_ROUNDS = 10;
const INITIAL_HEARTS = 5;

// Helper to shuffle array
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generate a 10-question dynamic quiz from CONTRAN signs
function buildPlacasQuiz(category: PlacaQuizCategory): QuizQuestion[] {
  const allSigns = Object.values(TRAFFIC_SIGNS);
  const filtered = category === 'todas'
    ? allSigns
    : allSigns.filter(s => s.category === category);

  const signPool = filtered.length >= 10 ? filtered : allSigns;
  const shuffledPool = shuffleArray(signPool);
  const targets = shuffledPool.slice(0, TOTAL_ROUNDS);

  return targets.map((target, idx) => {
    // 65% image_choice (like Duolingo "Qual destas imagens é..."), 35% name_choice
    const mode: 'image_choice' | 'name_choice' = Math.random() < 0.65 ? 'image_choice' : 'name_choice';

    // Pick 2 distinct distractors (prefer same category for realism)
    const sameCategorySigns = signPool.filter(s => s.id !== target.id && s.category === target.category);
    const candidateDistractors = sameCategorySigns.length >= 2 ? sameCategorySigns : signPool.filter(s => s.id !== target.id);
    const shuffledDistractors = shuffleArray(candidateDistractors).slice(0, 2);

    const rawOptions: QuizOption[] = [
      {
        id: target.id,
        signId: target.code,
        name: target.name,
        code: target.code,
        badgeNumber: 1
      },
      ...shuffledDistractors.map(d => ({
        id: d.id,
        signId: d.code,
        name: d.name,
        code: d.code,
        badgeNumber: 1
      }))
    ];

    const shuffledOptions = shuffleArray(rawOptions).map((opt, optIdx) => ({
      ...opt,
      badgeNumber: optIdx + 1
    }));

    const categoryLabel = target.category === 'regulamentacao'
      ? 'REGULAMENTAÇÃO (R)'
      : target.category === 'advertencia'
      ? 'ADVERTÊNCIA (A)'
      : 'SINALIZAÇÃO OFICIAL';

    const prompt = mode === 'image_choice'
      ? `Qual destas placas é "${target.name}"?`
      : `Qual é o significado da placa abaixo?`;

    return {
      id: `q-quiz-${idx}-${target.id}`,
      mode,
      targetSign: target,
      prompt,
      badgeLabel: categoryLabel,
      options: shuffledOptions,
      correctOptionId: target.id,
      legalTip: target.pointsToRemember || target.description,
      description: target.description
    };
  });
}

export const PlacasQuizView: React.FC<PlacasQuizViewProps> = ({
  onClose,
  onComplete,
  initialCategory = 'todas'
}) => {
  const [category, setCategory] = useState<PlacaQuizCategory>(initialCategory);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildPlacasQuiz(initialCategory));
  const [questionQueue, setQuestionQueue] = useState<QuizQuestion[]>(() => questions);
  const [totalInitialCount] = useState(TOTAL_ROUNDS);
  const [masteredCount, setMasteredCount] = useState(0);
  const [hearts, setHearts] = useState(INITIAL_HEARTS);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'finished' | 'gameover'>('idle');
  const [mistakesCount, setMistakesCount] = useState(0);

  const currentQ = questionQueue[0];
  const progressPercent = Math.min(100, (masteredCount / totalInitialCount) * 100);

  // Restart quiz with fresh randomized questions
  const handleRestartQuiz = (cat: PlacaQuizCategory = category) => {
    sounds.playClick();
    const fresh = buildPlacasQuiz(cat);
    setCategory(cat);
    setQuestions(fresh);
    setQuestionQueue(fresh);
    setMasteredCount(0);
    setHearts(INITIAL_HEARTS);
    setSelectedOptionId(null);
    setStatus('idle');
    setMistakesCount(0);
  };

  // Keyboard navigation (1, 2, 3, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status === 'gameover' || status === 'finished') {
        if (e.key === 'Enter') {
          if (status === 'finished') {
            onComplete(30);
          } else {
            handleRestartQuiz();
          }
        }
        return;
      }

      if (status === 'idle') {
        if (currentQ && currentQ.options) {
          const pressedNum = parseInt(e.key, 10);
          if (!isNaN(pressedNum) && pressedNum >= 1 && pressedNum <= currentQ.options.length) {
            e.preventDefault();
            sounds.playClick();
            setSelectedOptionId(currentQ.options[pressedNum - 1].id);
            return;
          }
        }

        if (e.key === 'Enter' && selectedOptionId) {
          e.preventDefault();
          handleVerify();
          return;
        }
      }

      if ((status === 'correct' || status === 'wrong') && e.key === 'Enter') {
        e.preventDefault();
        handleContinue();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, selectedOptionId, status, masteredCount, questionQueue, hearts]);

  // Select card option
  const handleSelectOption = (optId: string) => {
    if (status !== 'idle') return;
    sounds.playClick();
    setSelectedOptionId(optId);
  };

  // Verify answer
  const handleVerify = () => {
    if (!selectedOptionId || status !== 'idle' || !currentQ) return;

    if (selectedOptionId === currentQ.correctOptionId) {
      sounds.playCorrect();
      setStatus('correct');
    } else {
      sounds.playIncorrect();
      setStatus('wrong');
      setMistakesCount(prev => prev + 1);
      const nextHearts = Math.max(0, hearts - 1);
      setHearts(nextHearts);
    }
  };

  // Advance after verify
  const handleContinue = () => {
    if (!currentQ) return;
    sounds.playClick();

    if (status === 'correct') {
      const nextMastered = masteredCount + 1;
      setMasteredCount(nextMastered);
      const remainingQueue = questionQueue.slice(1);

      if (remainingQueue.length === 0) {
        setStatus('finished');
        sounds.playComplete();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        return;
      }

      setQuestionQueue(remainingQueue);
      setSelectedOptionId(null);
      setStatus('idle');
    } else if (status === 'wrong') {
      if (hearts <= 0) {
        setStatus('gameover');
        return;
      }

      // Spaced Repetition Queue: Move missed question to back of queue
      const recycled = [...questionQueue.slice(1), currentQ];
      setQuestionQueue(recycled);
      setSelectedOptionId(null);
      setStatus('idle');
    }
  };

  // Skip question
  const handleSkip = () => {
    if (status !== 'idle' || !currentQ) return;
    sounds.playClick();
    // Skip counts as a miss, moving to the end
    const recycled = [...questionQueue.slice(1), currentQ];
    setQuestionQueue(recycled);
    setSelectedOptionId(null);
  };

  // Correct option object
  const correctOption = useMemo(() => {
    if (!currentQ) return null;
    return currentQ.options.find(o => o.id === currentQ.correctOptionId);
  }, [currentQ]);

  // RENDER: FINISHED CELEBRATION SCREEN
  if (status === 'finished') {
    const accuracy = Math.max(0, Math.round((totalInitialCount / (totalInitialCount + mistakesCount)) * 100));
    return (
      <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col items-center justify-between p-6 sm:p-10 select-none animate-fadeIn">
        {/* Top dummy space */}
        <div className="w-full max-w-xl flex justify-end">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Card */}
        <div className="w-full max-w-lg flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-3xl bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center text-6xl shadow-2xl animate-bounce">
              🏆
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#58CC02] text-white rounded-full p-2 border-2 border-[#131f24] shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight mb-2">
            Lição Concluída!
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-300 max-w-md mb-8">
            Você identificou e dominou todas as {totalInitialCount} placas selecionadas deste round com maestria.
          </p>

          {/* Stats Badges 2-Grid */}
          <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#182631] border-2 border-[#2b3e4e] rounded-2xl p-4 flex flex-col items-center shadow-md">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> Total XP
              </span>
              <span className="text-3xl font-black text-white">+30 XP</span>
            </div>

            <div className="bg-[#182631] border-2 border-[#2b3e4e] rounded-2xl p-4 flex flex-col items-center shadow-md">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                <Trophy className="w-4 h-4 text-emerald-400" /> Precisão
              </span>
              <span className="text-3xl font-black text-white">{accuracy}%</span>
            </div>
          </div>

          {/* Category Filter Pills to Train More */}
          <div className="w-full bg-[#182631]/60 border border-[#2b3e4e] rounded-2xl p-4 mb-2">
            <span className="text-xs font-bold text-slate-400 block mb-2">Treinar outra categoria agora:</span>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => handleRestartQuiz('todas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  category === 'todas'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-[#182631] text-slate-300 border border-slate-700 hover:border-slate-500'
                }`}
              >
                Todas (146)
              </button>
              <button
                onClick={() => handleRestartQuiz('regulamentacao')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  category === 'regulamentacao'
                    ? 'bg-rose-500 text-white font-black'
                    : 'bg-[#182631] text-slate-300 border border-slate-700 hover:border-slate-500'
                }`}
              >
                Regulamentação
              </button>
              <button
                onClick={() => handleRestartQuiz('advertencia')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  category === 'advertencia'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-[#182631] text-slate-300 border border-slate-700 hover:border-slate-500'
                }`}
              >
                Advertência
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Finish Button */}
        <div className="w-full max-w-md pt-4">
          <button
            onClick={() => {
              sounds.playClick();
              onComplete(30);
            }}
            className="w-full duo-btn-yellow text-slate-950 py-4 rounded-2xl text-base font-black uppercase tracking-wider cursor-pointer shadow-xl flex items-center justify-center gap-2"
          >
            <span>Continuar para o Início</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // RENDER: GAME OVER / HEARTS DEPLETED SCREEN
  if (status === 'gameover') {
    return (
      <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col items-center justify-between p-6 sm:p-10 select-none animate-fadeIn">
        <div className="w-full max-w-xl flex justify-end">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="w-full max-w-md flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center text-5xl mb-6 shadow-2xl">
            💔
          </div>
          <h1 className="text-3xl font-black text-rose-500 tracking-tight mb-2">
            Acabaram suas vidas!
          </h1>
          <p className="text-sm font-semibold text-slate-300 mb-6">
            Você cometeu 5 erros durante a identificação das placas. O DETRAN exige pelo menos 70% de acertos para aprovação.
          </p>

          <div className="w-full bg-[#182631] border-2 border-[#2b3e4e] rounded-2xl p-4 mb-6 text-left">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-1">
              Dica de Ouro do CONTRAN:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Placas vermelhas (R-*) impõem <strong>obrigações legais imediatas</strong>. Placas amarelas (A-*) advertem sobre <strong>condições perigosas ou mudanças no traçado</strong> à frente.
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-3 pt-4">
          <button
            onClick={() => handleRestartQuiz()}
            className="w-full duo-btn-yellow text-slate-950 py-4 rounded-2xl text-sm font-black uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar Novamente (Vidas Cheias)</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-sm font-black text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer transition-colors"
          >
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col justify-between overflow-x-hidden select-none">
      {/* 1. TOP BAR: Close, Duolingo Progress Bar, Hearts */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center gap-4 sm:gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer shrink-0"
          title="Sair do Quiz (Esc)"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Progress Bar Container */}
        <div className="flex-1 h-3.5 sm:h-4 bg-[#37464f] rounded-full overflow-hidden relative shadow-inner">
          <div 
            className="h-full bg-[#58CC02] transition-all duration-300 ease-out rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Glossy top edge reflection */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/25 rounded-full" />
          </div>
        </div>

        {/* Hearts Life Counter */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#182631] border border-[#2b3e4e] px-3 py-1.5 rounded-2xl">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="text-base sm:text-lg font-black text-rose-500">
            {hearts}
          </span>
        </div>
      </div>

      {/* 2. MAIN QUESTION PLAYGROUND */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col justify-center items-center overflow-y-auto">
        {/* Top category pill */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-purple-300 bg-purple-900/40 border border-purple-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            {currentQ.badgeLabel}
          </span>
        </div>

        {/* Question Title Header */}
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center tracking-tight mb-6 sm:mb-8 max-w-2xl">
          {currentQ.prompt}
        </h2>

        {/* MODE B SPECIAL: If Mode is 'name_choice', show the plate prominently on top */}
        {currentQ.mode === 'name_choice' && (
          <div className="mb-6 flex flex-col items-center">
            <div className="p-4 sm:p-5 rounded-3xl bg-[#182631] border-2 border-[#2b3e4e] shadow-xl flex items-center justify-center hover:scale-105 transition-transform">
              <TrafficSignComponent signId={currentQ.targetSign.code} size={130} />
            </div>
            <span className="mt-2 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
              Código Oficial: {currentQ.targetSign.code}
            </span>
          </div>
        )}

        {/* 3. OPTIONS GRID (SIDE-BY-SIDE CARDS AS IN DUOLINGO SCREENSHOT) */}
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {currentQ.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.id === currentQ.correctOptionId;

            // Determine card styling states
            let cardClasses = "bg-[#182631] border-2 border-[#2b3e4e] border-b-4 border-b-[#202f36] hover:bg-[#202f36] hover:border-[#384f5f]";
            let labelClasses = "text-slate-200";
            let badgeClasses = "text-slate-400 border-slate-600 bg-slate-800/80";

            if (status === 'idle') {
              if (isSelected) {
                cardClasses = "bg-[#1CB0F6]/10 border-2 border-[#1CB0F6] border-b-4 border-b-[#1899D6] shadow-[0_0_20px_rgba(28,176,246,0.18)]";
                labelClasses = "text-[#1CB0F6] font-black";
                badgeClasses = "text-[#1CB0F6] border-[#1CB0F6] bg-[#1CB0F6]/20 font-black";
              }
            } else if (status === 'correct') {
              if (isCorrectOption) {
                cardClasses = "bg-[#58CC02]/15 border-2 border-[#58CC02] border-b-4 border-b-[#46a302] shadow-[0_0_20px_rgba(88,204,2,0.2)]";
                labelClasses = "text-[#58CC02] font-black";
                badgeClasses = "text-[#58CC02] border-[#58CC02] bg-[#58CC02]/20 font-black";
              } else {
                cardClasses = "opacity-40 bg-[#182631] border-2 border-[#2b3e4e]";
              }
            } else if (status === 'wrong') {
              if (isSelected) {
                cardClasses = "bg-rose-500/15 border-2 border-rose-500 border-b-4 border-b-rose-700 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                labelClasses = "text-rose-400 font-black";
                badgeClasses = "text-rose-400 border-rose-500 bg-rose-500/20 font-black";
              } else if (isCorrectOption) {
                cardClasses = "bg-[#58CC02]/15 border-2 border-[#58CC02] border-b-4 border-b-[#46a302]";
                labelClasses = "text-[#58CC02] font-black";
                badgeClasses = "text-[#58CC02] border-[#58CC02] bg-[#58CC02]/20 font-black";
              } else {
                cardClasses = "opacity-40 bg-[#182631] border-2 border-[#2b3e4e]";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={status !== 'idle'}
                className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between transition-all duration-150 cursor-pointer select-none text-left active:translate-y-0.5 ${cardClasses}`}
                style={{ minHeight: currentQ.mode === 'image_choice' ? '220px' : '100px' }}
              >
                {/* Visual sign image in Mode A (image_choice) */}
                {currentQ.mode === 'image_choice' && (
                  <div className="flex-1 w-full flex items-center justify-center py-2 sm:py-4">
                    <div className="group-hover:scale-105 transition-transform duration-200">
                      <TrafficSignComponent signId={option.signId} size={110} />
                    </div>
                  </div>
                )}

                {/* Bottom Row inside card: Name/Code and keyboard number badge */}
                <div className="w-full flex items-center justify-between gap-2 pt-3 border-t border-slate-700/40 mt-auto">
                  <span className={`text-xs sm:text-sm font-black capitalize line-clamp-2 ${labelClasses}`}>
                    {currentQ.mode === 'image_choice' 
                      ? option.code 
                      : option.name}
                  </span>

                  {/* Keyboard shortcut badge [ 1 ], [ 2 ], [ 3 ] */}
                  <span className={`shrink-0 text-[11px] font-black px-2 py-0.5 rounded-lg border transition-all ${badgeClasses}`}>
                    {option.badgeNumber}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. PINNED BOTTOM ACTION & VERIFICATION BAR */}
      <div 
        className={`w-full py-4 sm:py-6 px-4 sm:px-12 transition-all duration-200 ${
          status === 'correct'
            ? 'bg-[#142918] border-t-2 border-[#58CC02]'
            : status === 'wrong'
            ? 'bg-[#2b1418] border-t-2 border-rose-500'
            : 'bg-[#131f24] border-t-2 border-[#202f36]'
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Feedback (Left side) */}
          {status === 'idle' ? (
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="p-1 rounded bg-[#182631] border border-slate-700 text-[10px] font-black text-slate-300">
                1 - 3
              </span>
              <span>Escolha com teclado</span>
              <span className="mx-1">•</span>
              <span className="p-1 rounded bg-[#182631] border border-slate-700 text-[10px] font-black text-slate-300">
                ENTER
              </span>
              <span>Verificar</span>
            </div>
          ) : status === 'correct' ? (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-[#58CC02] flex items-center justify-center shrink-0 text-white shadow-md">
                <CheckCircle2 className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#58CC02] tracking-tight">
                  Muito bem!
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-200/90 max-w-lg line-clamp-2">
                  <strong>{currentQ.targetSign.code}:</strong> {currentQ.legalTip}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shrink-0 text-white shadow-md">
                <AlertCircle className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-rose-500 tracking-tight">
                  Resposta correta:
                </span>
                <span className="text-xs sm:text-sm font-black text-white max-w-lg">
                  {correctOption ? `${correctOption.code} — ${correctOption.name}` : ''}
                </span>
                <span className="text-[11px] font-semibold text-rose-200/80 mt-0.5 line-clamp-1">
                  {currentQ.description}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons (Right side) */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {status === 'idle' && (
              <button
                onClick={handleSkip}
                className="px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Pular
              </button>
            )}

            {status === 'idle' ? (
              <button
                onClick={handleVerify}
                disabled={!selectedOptionId}
                className={`px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-150 select-none shadow-md ${
                  selectedOptionId
                    ? 'duo-btn-yellow text-slate-950 cursor-pointer'
                    : 'bg-[#37464f] text-slate-400 border-b-4 border-[#2b3e4e] cursor-not-allowed opacity-60'
                }`}
              >
                Verificar
              </button>
            ) : status === 'correct' ? (
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto duo-btn-yellow text-slate-950 px-10 py-3.5 rounded-2xl text-sm font-black uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto duo-btn-red px-10 py-3.5 rounded-2xl text-sm font-black uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
