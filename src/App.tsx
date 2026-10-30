import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LearningPath } from './components/LearningPath';
import { LessonBottomSheet } from './components/LessonBottomSheet';
import { TheoryBottomSheet } from './components/TheoryBottomSheet';
import { SimuladoModal } from './components/SimuladoModal';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { UNITS, ALL_QUESTIONS } from './data/questions';
import { Lesson, UserProfile } from './types';
import { sounds } from './utils/sound';

const STORAGE_KEY = 'diriggo_user_profile_v2';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  isLoggedIn: false,
  streak: 3,
  cnhPoints: 0,
  maxCnhPoints: 20, // 20 points standard CTB limit for suspension
  xp: 45,
  completedLessons: ['les-1-1'],
  simuladosHistory: [],
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
  const [studyingTheoryLesson, setStudyingTheoryLesson] = useState<Lesson | null>(null);
  const [activeQuizLesson, setActiveQuizLesson] = useState<Lesson | null>(null);
  const [isSimuladoOpen, setIsSimuladoOpen] = useState(false);

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

  const handleFinishSimulado = (score: number, total: number, passed: boolean) => {
    setProfile(prev => ({
      ...prev,
      xp: prev.xp + (passed ? 50 : 15),
      simuladosHistory: [
        ...prev.simuladosHistory,
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('pt-BR'),
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

  // When student clicks a node on the path:
  // Open the study slides/infographics first!
  const handleNodeClick = (lesson: Lesson) => {
    if (lesson.theorySlides && lesson.theorySlides.length > 0) {
      setStudyingTheoryLesson(lesson);
    } else {
      setActiveQuizLesson(lesson);
    }
  };

  return (
    <div className={`min-h-screen ${profile.darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {currentView === 'landing' && (
        <LandingPage
          onStartLearning={() => {
            sounds.playClick();
            setCurrentView('app');
          }}
          onOpenSimulado={() => {
            sounds.playClick();
            setIsSimuladoOpen(true);
          }}
          onOpenAuth={() => {
            sounds.playClick();
            setCurrentView('login');
          }}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          onBack={() => {
            sounds.playClick();
            setCurrentView('landing');
          }}
          onLogin={handleLogin}
        />
      )}

      {currentView === 'app' && (
        <div className="min-h-screen flex flex-col">
          {/* Main App Navbar */}
          <Navbar
            profile={profile}
            onOpenSimulado={() => setIsSimuladoOpen(true)}
            onOpenAuth={() => setCurrentView('login')}
            onToggleSound={handleToggleSound}
            onToggleDarkMode={handleToggleDarkMode}
            onResetCnhPoints={handleResetCnhPoints}
          />

          {/* Quick Sub-header */}
          <div className="bg-amber-100/60 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 py-1.5 px-4 text-center text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center justify-center gap-2">
            <span>🚗 Trilha de Aprendizado Ativa</span>
            <span>•</span>
            <button
              onClick={() => {
                sounds.playClick();
                setCurrentView('landing');
              }}
              className="text-amber-800 dark:text-amber-300 underline hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer"
            >
              Ver página inicial
            </button>
          </div>

          {/* Duolingo Winding Road Learning Path */}
          <main className="flex-1 max-w-4xl w-full mx-auto pb-16">
            <LearningPath
              units={UNITS}
              completedLessons={profile.completedLessons}
              onStartLesson={handleNodeClick}
              onOpenSimulado={() => setIsSimuladoOpen(true)}
            />
          </main>
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

      {/* Official DETRAN 30Q Simulado Modal */}
      {isSimuladoOpen && (
        <SimuladoModal
          questions={ALL_QUESTIONS}
          onClose={() => setIsSimuladoOpen(false)}
          onFinishSimulado={handleFinishSimulado}
        />
      )}
    </div>
  );
}

export default App;
