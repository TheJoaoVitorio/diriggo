import React from 'react';
import { 
  Check, 
  Lock, 
  Star, 
  Crown, 
  Trophy, 
  BookOpen,
  Headphones,
  Package
} from 'lucide-react';
import { Unit, Lesson } from '../types';
import { sounds } from '../utils/sound';

interface LearningPathProps {
  units: Unit[];
  completedLessons: string[];
  onStartLesson: (lesson: Lesson) => void;
  onOpenSimulado: () => void;
  onOpenGuide?: (unit: Unit) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  units,
  completedLessons,
  onStartLesson,
  onOpenSimulado,
  onOpenGuide
}) => {
  let foundActive = false;

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 flex flex-col items-center select-none">
      {units.map((unit) => {
        // Serpentine winding path offsets matching Duolingo screenshot
        const offsets = [0, -45, -65, -30, 30, 65, 45];

        return (
          <div key={unit.id} className="w-full mb-16 relative flex flex-col items-center">
            {/* DUOLINGO EXACT GREEN UNIT BANNER (Matching user screenshot) */}
            <div className="w-full rounded-2xl p-4 sm:p-5 text-white mb-10 shadow-sm relative overflow-hidden bg-[#58cc02] border-b-4 border-[#46a302] select-none">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-wider">
                    <span>← SEÇÃO 1, UNIDADE {unit.unitNumber}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-1 leading-tight text-white drop-shadow-xs">
                    {unit.title}
                  </h2>
                </div>

                {/* Duolingo "GUIA" button */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    if (onOpenGuide) {
                      onOpenGuide(unit);
                    } else if (unit.lessons[0]) {
                      onStartLesson(unit.lessons[0]);
                    }
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xs shrink-0"
                  title="Ver material didático e resumo da unidade"
                >
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  <span>GUIA</span>
                </button>
              </div>
            </div>

            {/* FLOATING SERPENTINE NODE PATH (Duolingo Style - Clean & Distraction-free) */}
            <div className="w-full flex flex-col items-center gap-6 relative">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isCurrent = !isCompleted && !foundActive;
                const isLocked = !isCompleted && !isCurrent;

                if (isCurrent) {
                  foundActive = true;
                }

                const xOffset = offsets[lessonIdx % offsets.length];
                const isAudioLesson = lessonIdx % 2 === 1;

                return (
                  <div
                    key={lesson.id}
                    className="flex flex-col items-center relative transition-transform duration-200"
                    style={{ transform: `translateX(${xOffset}px)` }}
                  >
                    {/* Floating "COMEÇAR" badge with downward pointing caret for active node */}
                    {isCurrent && (
                      <div className="absolute -top-12 z-20 flex flex-col items-center animate-bounce pointer-events-none select-none">
                        <div className="bg-[#131f24] dark:bg-[#131f24] border-2 border-[#202f36] text-[#58cc02] font-black text-xs px-4 py-1.5 rounded-xl shadow-xl tracking-wider uppercase">
                          COMEÇAR
                        </div>
                        <div className="w-2.5 h-2.5 bg-[#131f24] border-r-2 border-b-2 border-[#202f36] rotate-45 -mt-1.5" />
                      </div>
                    )}

                    {/* Circular 3D Node Button */}
                    <button
                      disabled={isLocked}
                      onClick={() => {
                        sounds.playClick();
                        onStartLesson(lesson);
                      }}
                      className={`
                        w-[72px] h-[72px] rounded-full flex items-center justify-center relative cursor-pointer
                        transition-all duration-150 select-none
                        ${isCompleted
                          ? 'bg-[#58cc02] border-b-[6px] border-[#46a302] hover:bg-[#61e002] text-white shadow-md active:translate-y-1 active:border-b-2'
                          : isCurrent
                            ? 'bg-[#58cc02] border-b-[6px] border-[#46a302] hover:bg-[#61e002] text-white shadow-lg ring-4 ring-[#58cc02]/30 active:translate-y-1 active:border-b-2'
                            : 'bg-[#e5e5e5] dark:bg-[#202f36] border-b-[6px] border-[#cecece] dark:border-[#162026] text-[#afafaf] dark:text-[#52656d] cursor-not-allowed'
                        }
                      `}
                    >
                      {/* Crown for completed node */}
                      {isCompleted && (
                        <div className="absolute -top-2.5 -right-1 w-6 h-6 rounded-full bg-[#ffc800] border-2 border-[#ca8a04] flex items-center justify-center shadow">
                          <Crown className="w-3.5 h-3.5 text-[#78350f] fill-[#78350f]" />
                        </div>
                      )}

                      {/* Icon */}
                      {isCompleted ? (
                        <Check className="w-8 h-8 text-white stroke-[3.5]" />
                      ) : isCurrent ? (
                        <Star className="w-8 h-8 fill-white text-white drop-shadow-xs" />
                      ) : isAudioLesson ? (
                        <Headphones className="w-7 h-7 text-[#afafaf] dark:text-[#52656d]" />
                      ) : (
                        <Star className="w-7 h-7 fill-current text-[#afafaf] dark:text-[#52656d]" />
                      )}
                    </button>

                    {/* Optional Title Label below node */}
                    <div className="flex flex-col items-center mt-2 max-w-[150px] text-center">
                      <span className="text-[12px] font-black text-slate-800 dark:text-slate-200 line-clamp-1">
                        {lesson.title}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Duolingo Treasure Chest (Baú de Recompensas) */}
              <div 
                className="flex items-center justify-center relative my-2"
                style={{ transform: 'translateX(-20px)' }}
              >
                <div className="w-[68px] h-[64px] rounded-2xl bg-[#e5e5e5] dark:bg-[#202f36] border-b-[6px] border-[#cecece] dark:border-[#162026] flex items-center justify-center relative shadow-md">
                  <Package className="w-8 h-8 text-[#afafaf] dark:text-[#52656d]" />
                  <Lock className="w-3 h-3 text-slate-400 absolute" />
                </div>

                {/* Pedestal on the right matching Duolingo screenshot */}
                <div className="absolute left-24 flex flex-col items-center">
                  <div className="w-20 h-5 rounded-full bg-slate-200 dark:bg-[#1a252c] border-b-2 border-slate-300 dark:border-[#141d23] flex items-center justify-center shadow-xs">
                    <span className="text-[9px] font-black uppercase text-slate-400 dark:text-[#52656d] tracking-wider">
                      Recompensa
                    </span>
                  </div>
                </div>
              </div>

              {/* Unit Final Challenge / Trophy Node */}
              <div 
                className="flex flex-col items-center relative mt-3"
                style={{ transform: 'translateX(35px)' }}
              >
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenSimulado();
                  }}
                  className="w-18 h-18 rounded-2xl bg-[#ffc800] border-b-[6px] border-[#ca8a04] hover:bg-[#ffd933] flex items-center justify-center shadow-lg active:translate-y-1 active:border-b-2 cursor-pointer transition-all"
                  title="Fazer desafio da unidade"
                >
                  <Trophy className="w-8 h-8 text-[#78350f] fill-[#78350f]" />
                </button>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#ca8a04] dark:text-[#ffc800] mt-1.5">
                  Desafio da Unidade
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Official DETRAN Simulado Callout at bottom */}
      <div className="w-full bg-[#182631] text-white rounded-3xl p-6 border-2 border-[#1cb0f6] shadow-xl mt-6 text-center flex flex-col items-center">
        <span className="text-3xl mb-2">🏁</span>
        <h3 className="text-2xl font-black">Pronto para a Prova Real?</h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mt-1 font-medium leading-relaxed">
          Faça o Simulado Oficial de 30 questões cronometradas no formato idêntico ao do DETRAN.
        </p>
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSimulado();
          }}
          className="mt-5 px-6 py-3.5 duo-btn-yellow rounded-2xl font-black text-xs uppercase tracking-wide cursor-pointer flex items-center gap-2 shadow-lg"
        >
          <Trophy className="w-4 h-4" />
          <span>Fazer Simulado Completo (40 min)</span>
        </button>
      </div>
    </div>
  );
};
