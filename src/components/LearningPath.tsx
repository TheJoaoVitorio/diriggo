import React from 'react';
import { 
  Check, 
  Lock, 
  Star, 
  Crown, 
  Play, 
  Trophy, 
  BookOpen,
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
import { TrafficSignComponent } from './TrafficSign';
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

  // Environment Scenery renderer per Unit
  const renderUnitScenery = (unitNumber: number) => {
    switch (unitNumber) {
      case 1:
        // Placas e Sinalização nas margens
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Placa PARE na margem esquerda */}
            <div className="absolute top-16 left-4 sm:left-12 flex flex-col items-center opacity-90 drop-shadow-md">
              <TrafficSignComponent signId="R-1" size={54} />
              <div className="w-1.5 h-16 bg-slate-400 -mt-1 rounded-b" />
            </div>

            {/* Placa 60 km/h na margem direita */}
            <div className="absolute top-44 right-4 sm:right-12 flex flex-col items-center opacity-90 drop-shadow-md">
              <TrafficSignComponent signId="R-19" size={54} />
              <div className="w-1.5 h-16 bg-slate-400 -mt-1 rounded-b" />
            </div>

            {/* Placa de Curva à Esquerda mais abaixo */}
            <div className="absolute bottom-16 left-6 sm:left-16 flex flex-col items-center opacity-90 drop-shadow-md">
              <TrafficSignComponent signId="A-1a" size={52} />
              <div className="w-1.5 h-14 bg-slate-400 -mt-1 rounded-b" />
            </div>
          </div>
        );

      case 2:
        // Direção Defensiva: Chuva e Pista Escorregadia
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Nuvem de chuva no topo esquerdo */}
            <div className="absolute top-10 left-6 sm:left-14 text-center opacity-85">
              <span className="text-4xl">🌧️</span>
              <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded-full block mt-1">
                Chuva Forte
              </span>
            </div>

            {/* Placa Pista Escorregadia na margem direita */}
            <div className="absolute top-40 right-5 sm:right-14 flex flex-col items-center opacity-90 drop-shadow-md">
              <TrafficSignComponent signId="A-28" size={54} />
              <div className="w-1.5 h-16 bg-slate-400 -mt-1 rounded-b" />
            </div>

            {/* Poça d'água no asfalto */}
            <div className="absolute bottom-20 left-8 sm:left-20 w-16 h-8 bg-sky-200/70 border border-sky-300 rounded-full blur-[0.5px]" />
          </div>
        );

      case 3:
        // Primeiros Socorros: Cones e Ambulância
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Cones de sinalização */}
            <div className="absolute top-16 left-8 sm:left-16 text-3xl">
              🚧
            </div>
            <div className="absolute top-48 right-8 sm:right-16 text-3xl">
              ⚠️
            </div>

            {/* Ambulância na margem */}
            <div className="absolute bottom-16 left-6 sm:left-12 flex flex-col items-center bg-white/80 border border-slate-200 rounded-2xl p-2 shadow-sm">
              <span className="text-3xl">🚑</span>
              <span className="text-[9px] font-black uppercase text-rose-700 mt-0.5">SAMU 192</span>
            </div>
          </div>
        );

      case 4:
        // Infrações e CTB: Semáforo e Radar
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Semáforo Vertical na margem esquerda */}
            <div className="absolute top-14 left-6 sm:left-14 bg-slate-900 p-2 rounded-2xl border-2 border-slate-700 shadow-lg flex flex-col items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-rose-500 shadow-rose-500/50 shadow" />
              <div className="w-4 h-4 rounded-full bg-amber-400 shadow-amber-400/50 shadow" />
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-emerald-500/50 shadow" />
              <div className="w-1.5 h-10 bg-slate-600 rounded-b mt-1" />
            </div>

            {/* Radar de Velocidade na margem direita */}
            <div className="absolute top-44 right-6 sm:right-14 flex flex-col items-center bg-slate-800 text-white p-2 rounded-xl border border-slate-600 shadow">
              <span className="text-xs font-black text-amber-400">RADAR</span>
              <span className="text-[10px] font-bold text-slate-300">60 km/h</span>
              <div className="w-1.5 h-10 bg-slate-500 rounded-b mt-1" />
            </div>
          </div>
        );

      case 5:
        // Mecânica e Meio Ambiente: Árvores e Posto
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-12 left-6 sm:left-14 text-3xl">
              🌳
            </div>
            <div className="absolute top-44 right-6 sm:right-16 text-3xl">
              ⛽
            </div>
            <div className="absolute bottom-16 left-8 sm:left-16 text-3xl">
              🌲
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  let foundActive = false;

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 flex flex-col items-center">
      {units.map((unit) => {
        return (
          <div key={unit.id} className="w-full mb-16 relative">
            {/* Duolingo Exact Green Unit Banner (matching user screenshot) */}
            <div className="w-full rounded-2xl p-4 sm:p-5 text-white mb-8 shadow-md relative overflow-hidden bg-[#58cc02] border-b-4 border-[#46a302] select-none">
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
                  <BookOpen className="w-4 h-4" />
                  <span>GUIA</span>
                </button>
              </div>
            </div>

            {/* Thematic Ambient Road Container */}
            <div className="relative py-6 rounded-3xl bg-slate-100/60 dark:bg-slate-900/60 border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
              {/* Scenery graphics */}
              {renderUnitScenery(unit.unitNumber)}

              {/* Road Asphalt Stripe in Center */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-28 bg-slate-200/50 dark:bg-slate-800/70 rounded-2xl border-x-2 border-slate-300 dark:border-slate-700 pointer-events-none">
                <div className="w-1 h-full mx-auto road-stripe opacity-40 dark:opacity-60" />
              </div>

              {/* Lessons Nodes (Zigue-Zague) */}
              <div className="flex flex-col items-center gap-8 relative z-10">
                {unit.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = !isCompleted && !foundActive;
                  const isLocked = !isCompleted && !isCurrent;

                  if (isCurrent) {
                    foundActive = true;
                  }

                  const offsets = [0, -50, -75, -40, 40, 75, 50];
                  const xOffset = offsets[lessonIdx % offsets.length];

                  return (
                    <div
                      key={lesson.id}
                      className="flex flex-col items-center relative transition-transform duration-200"
                      style={{ transform: `translateX(${xOffset}px)` }}
                    >
                      {/* Floating "COMEÇAR" badge for current node (Duolingo Style) */}
                      {isCurrent && (
                        <div className="absolute -top-10 z-20 animate-bounce bg-slate-900 text-emerald-400 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-lg border-2 border-emerald-500 flex items-center gap-1.5 whitespace-nowrap">
                          <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                          <span>COMEÇAR</span>
                          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-emerald-500" />
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

                      {/* Lesson Title and Theory Pill */}
                      <div className="flex flex-col items-center mt-2 max-w-[140px] text-center">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {lesson.title}
                        </span>
                        {!isLocked && (
                          <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full mt-0.5 flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                            <BookOpen className="w-3 h-3" />
                            <span>Teoria + Quiz</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Unit Trophy Challenge */}
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
          </div>
        );
      })}

      {/* Simulado Banner */}
      <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 border-4 border-amber-400 shadow-xl mt-4 text-center flex flex-col items-center">
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
