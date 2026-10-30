import React from 'react';
import { 
  Check, 
  Lock, 
  Star, 
  Crown, 
  Play, 
  Trophy, 
  ShieldCheck, 
  AlertTriangle, 
  OctagonAlert, 
  CloudRain, 
  Clock, 
  FileBadge, 
  Wrench, 
  Leaf,
  HeartHandshake
} from 'lucide-react';
import { Unit, Lesson } from '../types';
import { sounds } from '../utils/sound';

interface LearningPathProps {
  units: Unit[];
  completedLessons: string[];
  onStartLesson: (lesson: Lesson) => void;
  onOpenSimulado: () => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  units,
  completedLessons,
  onStartLesson,
  onOpenSimulado
}) => {
  // Map icons
  const getIcon = (iconName: string, isCompleted: boolean) => {
    if (isCompleted) return <Check className="w-8 h-8 text-white stroke-[3]" />;
    
    switch (iconName) {
      case 'OctagonAlert': return <OctagonAlert className="w-7 h-7" />;
      case 'AlertTriangle': return <AlertTriangle className="w-7 h-7" />;
      case 'CloudRain': return <CloudRain className="w-7 h-7" />;
      case 'Clock': return <Clock className="w-7 h-7" />;
      case 'ShieldAlert': return <ShieldCheck className="w-7 h-7" />;
      case 'HeartHandshake': return <HeartHandshake className="w-7 h-7" />;
      case 'FileBadge': return <FileBadge className="w-7 h-7" />;
      case 'Wrench': return <Wrench className="w-7 h-7" />;
      case 'Leaf': return <Leaf className="w-7 h-7" />;
      default: return <Star className="w-7 h-7" />;
    }
  };

  // Determine current active lesson
  let foundActive = false;

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 flex flex-col items-center">
      {units.map((unit) => {
        return (
          <div key={unit.id} className="w-full mb-14">
            {/* Unit Header Card */}
            <div className="w-full rounded-3xl p-5 text-slate-900 mb-8 border-b-6 shadow-md relative overflow-hidden bg-gradient-to-r from-amber-400 via-[#FFC800] to-yellow-400 border-amber-600">
              <div className="flex items-start justify-between relative z-10">
                <div className="max-w-[75%]">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-900 bg-white/40 px-2.5 py-1 rounded-full">
                    Unidade {unit.unitNumber}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black mt-2 leading-tight">
                    {unit.title}
                  </h2>
                  <p className="text-sm font-semibold text-amber-950 mt-1 opacity-90">
                    {unit.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/80 border-b-4 border-amber-600 flex items-center justify-center text-2xl shadow-inner">
                  {unit.unitNumber === 1 ? '🚦' : unit.unitNumber === 2 ? '🌧️' : unit.unitNumber === 3 ? '🩹' : unit.unitNumber === 4 ? '📋' : '🔧'}
                </div>
              </div>
            </div>

            {/* Lessons Road (Zigue-Zague) */}
            <div className="flex flex-col items-center gap-7 relative">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isCurrent = !isCompleted && !foundActive;
                const isLocked = !isCompleted && !isCurrent;

                if (isCurrent) {
                  foundActive = true;
                }

                // Horizontal zigzag offset
                const offsets = [0, -45, -70, -35, 35, 70, 45];
                const xOffset = offsets[lessonIdx % offsets.length];

                return (
                  <div
                    key={lesson.id}
                    className="flex flex-col items-center relative transition-transform duration-200"
                    style={{ transform: `translateX(${xOffset}px)` }}
                  >
                    {/* Floating "INICIAR" badge for current node */}
                    {isCurrent && (
                      <div className="absolute -top-10 z-20 animate-bounce bg-slate-900 text-white font-extrabold text-xs px-3 py-1 rounded-xl shadow-lg border-2 border-amber-400 flex items-center gap-1">
                        <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>COMEÇAR</span>
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                      </div>
                    )}

                    {/* Node Button */}
                    <button
                      disabled={isLocked}
                      onClick={() => {
                        sounds.playClick();
                        onStartLesson(lesson);
                      }}
                      className={`
                        w-20 h-20 rounded-full flex items-center justify-center relative cursor-pointer
                        transition-all duration-150 select-none
                        ${isCompleted
                          ? 'bg-[#22C55E] border-b-6 border-[#15803D] hover:bg-[#16A34A] text-white shadow-md active:translate-y-1 active:border-b-2'
                          : isCurrent
                            ? 'bg-[#FFC800] border-b-6 border-[#CA8A04] hover:bg-[#FACC15] text-[#18181B] ring-4 ring-amber-300 ring-offset-4 ring-offset-slate-50 shadow-lg active:translate-y-1 active:border-b-2'
                            : 'bg-slate-200 border-b-6 border-slate-300 text-slate-400 cursor-not-allowed opacity-80'
                        }
                      `}
                    >
                      {/* Crown for completed node */}
                      {isCompleted && (
                        <div className="absolute -top-3 -right-1 w-6 h-6 rounded-full bg-amber-400 border border-amber-600 flex items-center justify-center text-xs shadow">
                          <Crown className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
                        </div>
                      )}

                      {/* Icon */}
                      {isLocked ? (
                        <Lock className="w-7 h-7 text-slate-400" />
                      ) : (
                        getIcon(lesson.icon, isCompleted)
                      )}
                    </button>

                    {/* Lesson Label */}
                    <span className="text-xs font-bold text-slate-700 mt-2 text-center max-w-[130px] line-clamp-1">
                      {lesson.title}
                    </span>
                  </div>
                );
              })}

              {/* Unit Trophy Chest */}
              <div className="mt-4 flex flex-col items-center">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenSimulado();
                  }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 border-b-4 border-amber-700 flex items-center justify-center text-2xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Trophy className="w-8 h-8 text-amber-950" />
                </button>
                <span className="text-xs font-black uppercase text-amber-700 mt-1.5 tracking-wider">
                  Desafio da Unidade
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Road End Simulado Banner */}
      <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 border-4 border-amber-400 shadow-xl mt-6 text-center flex flex-col items-center">
        <span className="text-3xl mb-2">🏁</span>
        <h3 className="text-2xl font-black">Pronto para a Prova Real?</h3>
        <p className="text-slate-300 text-sm max-w-md mt-1 font-medium">
          Teste seus conhecimentos com o Simulado Oficial de 30 questões cronometradas no modelo exato do DETRAN.
        </p>
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSimulado();
          }}
          className="mt-5 px-6 py-3.5 duo-btn-yellow rounded-2xl font-black text-sm uppercase tracking-wide cursor-pointer flex items-center gap-2 shadow-lg"
        >
          <Trophy className="w-5 h-5" />
          <span>Fazer Simulado Completo (40 min)</span>
        </button>
      </div>
    </div>
  );
};
