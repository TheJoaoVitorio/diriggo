import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question } from '../types';
import { TrafficSignComponent } from './TrafficSign';
import { sounds } from '../utils/sound';

interface SimuladoModalProps {
  questions: Question[];
  title?: string;
  timeMinutes?: number;
  onClose: () => void;
  onFinishSimulado: (score: number, total: number, passed: boolean, topicTitle?: string) => void;
}

export const SimuladoModal: React.FC<SimuladoModalProps> = ({
  questions,
  title = 'Simulado Oficial DETRAN',
  timeMinutes = 40,
  onClose,
  onFinishSimulado
}) => {
  // Use up to 30 questions (or all available if topic specific)
  const examQuestions = React.useMemo(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(30, shuffled.length));
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(timeMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isFinished) return;
    sounds.playClick();
    setAnswers(prev => ({ ...prev, [currentIndex]: optId }));
  };

  const handleFinishExam = () => {
    sounds.playClick();
    setIsFinished(true);

    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionId) {
        score++;
      }
    });

    const passed = score >= Math.ceil(examQuestions.length * 0.7);
    if (passed) {
      sounds.playComplete();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // Fallback
      }
    } else {
      sounds.playIncorrect();
    }

    onFinishSimulado(score, examQuestions.length, passed, title);
  };

  const answeredCount = Object.keys(answers).length;
  const score = examQuestions.reduce((acc, q, idx) => {
    return acc + (answers[idx] === q.correctOptionId ? 1 : 0);
  }, 0);
  const passed = score >= Math.ceil(examQuestions.length * 0.7);

  // Finished Results Screen
  if (isFinished && !reviewMode) {
    const percentage = Math.round((score / examQuestions.length) * 100);

    return (
      <div className="fixed inset-0 z-50 bg-slate-900/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none">
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center border-b-6 border-slate-300 dark:border-slate-700 shadow-2xl animate-in zoom-in-95">
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-4 border-4 shadow-lg bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700">
            {passed ? '🎉' : '⚠️'}
          </div>

          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${passed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}`}>
            {passed ? 'APROVADO NO SIMULADO' : 'NÃO FOI DESTA VEZ'}
          </span>

          <h2 className="text-3xl font-black mt-3">
            {score} de {examQuestions.length} acertos ({percentage}%)
          </h2>

          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2">
            {passed
              ? 'Parabéns! Você atingiu a nota mínima de 70% exigida pelo DETRAN para aprovação na Prova Teórica!'
              : 'O DETRAN exige no mínimo 70% de acertos (21 de 30 questões). Continue praticando as lições para reforçar os pontos fracos!'}
          </p>

          {/* Detailed breakdown */}
          <div className="mt-6 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-left">
            <h4 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-2">Resumo da Avaliação</h4>
            <div className="flex justify-between text-sm font-bold py-1 border-b border-slate-200 dark:border-slate-700">
              <span>Questões Respondidas:</span>
              <span>{answeredCount} de {examQuestions.length}</span>
            </div>
            <div className="flex justify-between text-sm font-bold py-1 border-b border-slate-200 dark:border-slate-700">
              <span>Tempo Restante:</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold py-1">
              <span>Critério CONTRAN:</span>
              <span className="text-amber-600 dark:text-amber-400">Mínimo 70% (21 acertos)</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                setReviewMode(true);
              }}
              className="w-full py-3.5 rounded-2xl duo-btn-yellow font-black text-sm uppercase tracking-wide cursor-pointer shadow-md"
            >
              Gabarito Comentado (Ver Questões)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 text-sm cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between select-none transition-colors">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                if (confirm('Deseja realmente sair do simulado? As respostas não salvas serão perdidas.')) {
                  onClose();
                }
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
                <span>{title}</span>
                {reviewMode && (
                  <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    Modo Gabarito
                  </span>
                )}
              </h2>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Questão {currentIndex + 1} de {examQuestions.length}
              </span>
            </div>
          </div>

          {/* Timer and Finish CTA */}
          <div className="flex items-center gap-3">
            {!reviewMode && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-extrabold text-sm">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            {!isFinished && (
              <button
                onClick={handleFinishExam}
                className="px-4 py-2 rounded-xl duo-btn-yellow text-slate-950 font-black text-xs uppercase tracking-wide cursor-pointer shadow-sm"
              >
                Entregar Prova ({answeredCount}/{examQuestions.length})
              </button>
            )}

            {reviewMode && (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wide cursor-pointer"
              >
                Sair do Gabarito
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Question Body */}
      <main className="max-w-3xl w-full mx-auto px-4 py-6 flex-1 overflow-y-auto">
        {/* Navigation Dots */}
        <div className="flex flex-wrap gap-1.5 mb-6 pb-2 justify-center border-b border-slate-200 dark:border-slate-800">
          {examQuestions.map((q, idx) => {
            const isAnswered = answers[idx] !== undefined;
            const isCurrent = idx === currentIndex;
            const isCorrect = isFinished && answers[idx] === q.correctOptionId;

            let dotColor = 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
            if (reviewMode) {
              dotColor = isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
            } else if (isAnswered) {
              dotColor = 'bg-amber-400 text-slate-900 font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  sounds.playClick();
                  setCurrentIndex(idx);
                }}
                className={`
                  w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center
                  ${dotColor}
                  ${isCurrent ? 'ring-2 ring-slate-900 dark:ring-amber-400 scale-110 shadow' : 'opacity-80 hover:opacity-100'}
                `}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Traffic Sign if any */}
        {currentQ.signId && (
          <div className="flex justify-center mb-4">
            <TrafficSignComponent signId={currentQ.signId} size={110} />
          </div>
        )}

        {/* Question Text */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm mb-4">
          <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800 inline-block mb-3">
            Matéria: {currentQ.topic.toUpperCase().replace('_', ' ')}
          </span>
          <h3 className="text-base sm:text-lg font-bold leading-relaxed">
            {currentQ.text}
          </h3>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQ.options.map((opt) => {
            const isSelected = answers[currentIndex] === opt.id;
            const isCorrect = opt.id === currentQ.correctOptionId;

            let cardStyle = 'duo-btn-card';
            if (reviewMode) {
              if (isCorrect) cardStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
              else if (isSelected && !isCorrect) cardStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-100 font-bold';
            } else if (isSelected) {
              cardStyle = 'selected ring-2 ring-amber-400 font-bold';
            }

            return (
              <button
                key={opt.id}
                disabled={reviewMode}
                onClick={() => handleSelectOption(opt.id)}
                className={`
                  w-full text-left p-4 rounded-2xl flex items-center justify-between cursor-pointer font-semibold text-sm sm:text-base
                  ${cardStyle}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-black uppercase text-slate-700 dark:text-slate-300">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {reviewMode && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                )}
                {reviewMode && isSelected && !isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legal Explanation in review mode */}
        {reviewMode && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-sm">
            <h4 className="font-black mb-1">Fundamento Legal (CTB):</h4>
            <p className="font-medium">{currentQ.explanation}</p>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            disabled={currentIndex === 0}
            onClick={() => {
              sounds.playClick();
              setCurrentIndex(prev => prev - 1);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {currentIndex + 1} / {examQuestions.length}
          </span>

          <button
            disabled={currentIndex === examQuestions.length - 1}
            onClick={() => {
              sounds.playClick();
              setCurrentIndex(prev => prev + 1);
            }}
            className="px-5 py-2.5 rounded-xl duo-btn-yellow font-bold text-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Próxima</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
