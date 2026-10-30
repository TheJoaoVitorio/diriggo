import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { LearningPath } from './components/LearningPath';
import { SimuladosHub } from './components/SimuladosHub';
import { PlacasGallery } from './components/PlacasGallery';
import { MaterialApoio } from './components/MaterialApoio';
import { PerfilView } from './components/PerfilView';
import { LessonBottomSheet } from './components/LessonBottomSheet';
import { TheoryBottomSheet } from './components/TheoryBottomSheet';
import { SimuladoModal } from './components/SimuladoModal';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { UNITS, ALL_QUESTIONS } from './data/questions';
import { Lesson, Unit, UserProfile, AppTab, Question } from './types';
import { sounds } from './utils/sound';

const STORAGE_KEY = 'diriggo_user_profile_v3';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  isLoggedIn: false,
  streak: 3,
  cnhPoints: 0,
  maxCnhPoints: 20, // 20 points standard CTB limit for suspension
  xp: 45,
  completedLessons: ['les-1-1'],
  simuladosHistory: [
    {
      id: 'demo-1',
      topicTitle: 'Simulado Geral Oficial DETRAN',
      date: '28/10 19:30',
      score: 24,
      total: 30,
      passed: true,
      timeSpentSeconds: 1540,
      answers: []
    }
  ],
  soundEnabled: true,
  darkMode: false
};

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  });

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<AppTab>('trilhas');
  const [studyingTheoryLesson, setStudyingTheoryLesson] = useState<Lesson | null>(null);
  const [activeQuizLesson, setActiveQuizLesson] = useState<Lesson | null>(null);
  const [isSimuladoOpen, setIsSimuladoOpen] = useState(false);
  const [activeSimuladoData, setActiveSimuladoData] = useState<{
    questions: Question[];
    title: string;
    timeMinutes: number;
  } | null>(null);

  // Sync dark mode to html document
  useEffect(() => {
    if (profile.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.darkMode]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
    sounds.enabled = profile.soundEnabled;
  }, [profile]);

  // Handlers
  const handleToggleSound = () => {
    setProfile(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleToggleDarkMode = () => {
    sounds.playClick();
    setProfile(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleResetCnhPoints = () => {
    sounds.playCorrect();
    setProfile(prev => ({ ...prev, cnhPoints: 0 }));
  };

  const handleAddCnhPoints = (points: number) => {
    setProfile(prev => ({
      ...prev,
      cnhPoints: Math.min(prev.maxCnhPoints, prev.cnhPoints + points)
    }));
  };

  const handleCompleteLesson = (xpEarned: number) => {
    if (!activeQuizLesson) return;
    setProfile(prev => {
      const alreadyCompleted = prev.completedLessons.includes(activeQuizLesson.id);
      return {
        ...prev,
        xp: prev.xp + xpEarned,
        completedLessons: alreadyCompleted
          ? prev.completedLessons
          : [...prev.completedLessons, activeQuizLesson.id]
      };
    });
    setActiveQuizLesson(null);
  };

  // Vital rule: Simulados NEVER affect CNH points!
  const handleFinishSimulado = (score: number, total: number, passed: boolean, topicTitle?: string) => {
    setProfile(prev => ({
      ...prev,
      xp: prev.xp + (passed ? 50 : 15),
      simuladosHistory: [
        ...prev.simuladosHistory,
        {
          id: Date.now().toString(),
          topicTitle: topicTitle || 'Simulado Oficial DETRAN',
          date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
          score,
          total,
          passed,
          timeSpentSeconds: 0,
          answers: []
        }
      ]
    }));
  };

  const handleLogin = (name: string, email: string) => {
    setProfile(prev => ({
      ...prev,
      name,
      email,
      isLoggedIn: true
    }));
    setCurrentView('app');
  };

  const handleLaunchSimulado = (questions: Question[], title: string, timeMinutes: number) => {
    setActiveSimuladoData({ questions, title, timeMinutes });
    setIsSimuladoOpen(true);
  };

  // When student clicks a node on the path:
  // Open the study slides/infographics first!
  const handleNodeClick = (lesson: Lesson) => {
    if (lesson.theorySlides && lesson.theorySlides.length > 0) {
      setStudyingTheoryLesson(lesson);
    } else {
      setActiveQuizLesson(lesson);
    }
  };

  const handleOpenUnitGuide = (unit: Unit) => {
    if (unit.lessons[0] && unit.lessons[0].theorySlides) {
      setStudyingTheoryLesson(unit.lessons[0]);
    } else {
      setCurrentTab('material');
    }
  };

  return (
    <div className={`min-h-screen ${profile.darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* 1. LANDING PAGE */}
      {currentView === 'landing' && (
        <LandingPage
          onStartLearning={() => {
            sounds.playClick();
            setCurrentView('app');
            setCurrentTab('trilhas');
          }}
          onOpenSimulado={() => {
            sounds.playClick();
            handleLaunchSimulado(ALL_QUESTIONS, 'Simulado Geral Oficial DETRAN (30Q)', 40);
          }}
          onOpenAuth={() => {
            sounds.playClick();
            setCurrentView('login');
          }}
        />
      )}

      {/* 2. LOGIN PAGE */}
      {currentView === 'login' && (
        <LoginPage
          onBack={() => {
            sounds.playClick();
            setCurrentView('landing');
          }}
          onLogin={handleLogin}
        />
      )}

      {/* 3. MAIN APPLICATION (DUOLINGO 3-COLUMN DESKTOP LAYOUT) */}
      {currentView === 'app' && (
        <div className="min-h-screen flex w-full">
          {/* Left Sidebar (Desktop fixed / Mobile bottom bar) */}
          <Sidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            profile={profile}
            onToggleDarkMode={handleToggleDarkMode}
            onToggleSound={handleToggleSound}
            onGoLanding={() => setCurrentView('landing')}
          />

          {/* Center Main Work Area */}
          <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
            {/* Mobile Top Sub-Header */}
            <div className="md:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setCurrentTab('trilhas')}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-sm font-black text-slate-900">
                  🚦
                </div>
                <span className="font-black text-lg">Diriggo</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-black">
                <span className="text-orange-500">🔥 {profile.streak}</span>
                <span className="text-amber-500">⚡ {profile.xp}</span>
                <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-300">
                  🪪 {profile.cnhPoints}/20
                </span>
              </div>
            </div>

            {/* Content Display based on Current Tab */}
            <div className="flex-1 p-2 sm:p-6 overflow-y-auto">
              {/* TAB 1: TRILHAS (Road Learning Path) */}
              {currentTab === 'trilhas' && (
                <LearningPath
                  units={UNITS}
                  completedLessons={profile.completedLessons}
                  onStartLesson={handleNodeClick}
                  onOpenSimulado={() => handleLaunchSimulado(ALL_QUESTIONS, 'Simulado Geral Oficial DETRAN', 40)}
                  onOpenGuide={handleOpenUnitGuide}
                />
              )}

              {/* TAB 2: SIMULADOS (Topic-Specific & General with History) */}
              {currentTab === 'simulados' && (
                <SimuladosHub
                  profile={profile}
                  onLaunchSimulado={handleLaunchSimulado}
                />
              )}

              {/* TAB 3: PLACAS (Visual Traffic Signs Catalog) */}
              {currentTab === 'placas' && (
                <PlacasGallery />
              )}

              {/* TAB 4: MATERIAL DE APOIO (Didactic Study Center) */}
              {currentTab === 'material' && (
                <MaterialApoio
                  onGoToSimulado={() => setCurrentTab('simulados')}
                />
              )}

              {/* TAB 5: MINHA CNH / PERFIL */}
              {currentTab === 'perfil' && (
                <PerfilView
                  profile={profile}
                  onResetCnhPoints={handleResetCnhPoints}
                  onLogout={() => {
                    sounds.playClick();
                    setCurrentView('landing');
                  }}
                />
              )}
            </div>
          </main>

          {/* Right Sidebar (Desktop HUD & Widgets) */}
          <RightSidebar
            profile={profile}
            onOpenSimulado={() => handleLaunchSimulado(ALL_QUESTIONS, 'Simulado Geral Oficial DETRAN', 40)}
            onResetCnhPoints={handleResetCnhPoints}
          />
        </div>
      )}

      {/* Pre-Lesson Interactive Study Slides & Infographics BottomSheet */}
      {studyingTheoryLesson && (
        <TheoryBottomSheet
          lesson={studyingTheoryLesson}
          onClose={() => setStudyingTheoryLesson(null)}
          onStartQuiz={() => {
            const lessonToQuiz = studyingTheoryLesson;
            setStudyingTheoryLesson(null);
            setActiveQuizLesson(lessonToQuiz);
          }}
        />
      )}

      {/* Interactive Quiz / Question Player BottomSheet */}
      {activeQuizLesson && (
        <LessonBottomSheet
          lesson={activeQuizLesson}
          cnhPoints={profile.cnhPoints}
          maxCnhPoints={profile.maxCnhPoints}
          onClose={() => setActiveQuizLesson(null)}
          onComplete={handleCompleteLesson}
          onAddCnhPoints={handleAddCnhPoints}
          onResetCnhPoints={handleResetCnhPoints}
        />
      )}

      {/* Official & Topic-Specific Simulado Modal */}
      {isSimuladoOpen && (
        <SimuladoModal
          questions={activeSimuladoData ? activeSimuladoData.questions : ALL_QUESTIONS}
          title={activeSimuladoData ? activeSimuladoData.title : 'Simulado Oficial DETRAN'}
          timeMinutes={activeSimuladoData ? activeSimuladoData.timeMinutes : 40}
          onClose={() => {
            setIsSimuladoOpen(false);
            setActiveSimuladoData(null);
          }}
          onFinishSimulado={handleFinishSimulado}
        />
      )}
    </div>
  );
}

export default App;
