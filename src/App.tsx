import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { ChevronLeft } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { LearningPath } from './components/LearningPath';
import { SimuladosHub } from './components/SimuladosHub';
import { PlacasGallery } from './components/PlacasGallery';
import { PlacasQuizView, PlacaQuizCategory } from './components/PlacasQuizView';
import { MaterialApoio } from './components/MaterialApoio';
import { PerfilView } from './components/PerfilView';
import { LessonBottomSheet } from './components/LessonBottomSheet';
import { TheoryBottomSheet } from './components/TheoryBottomSheet';
import { SimuladoModal } from './components/SimuladoModal';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { SeoArticlePage } from './components/SeoArticlePage';
import { TrafficLoader } from './components/TrafficLoader';
import { UNITS, ALL_QUESTIONS } from './data/questions';
import { SEO_PAGES } from './data/seoPages';
import { Lesson, Unit, UserProfile, AppTab, Question } from './types';
import { sounds } from './utils/sound';
import { 
  subscribeToAuthChanges, 
  saveUserProgressToFirestore, 
  logoutFirebase,
  syncOrInitUserProfile,
  checkRedirectResult,
  INITIAL_USER_PROFILE
} from './services/firebase';

const STORAGE_KEY = 'diriggo_user_profile_v4';

const getSlugFromPath = (path: string): string | null => {
  const normalized = path.replace(/\/+$/, '') || '/';
  for (const [key, page] of Object.entries(SEO_PAGES)) {
    if (page.path === normalized || `/${page.slug}` === normalized) {
      return key;
    }
  }
  return null;
};

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...INITIAL_USER_PROFILE,
            ...parsed,
            completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
            simuladosHistory: Array.isArray(parsed.simuladosHistory) ? parsed.simuladosHistory : []
          };
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_USER_PROFILE;
  });

  const [pageLoader, setPageLoader] = useState<{
    isLoading: boolean;
    message: string;
    subMessage?: string;
    stage?: 'red' | 'yellow' | 'green' | 'auto';
    phase?: 'red' | 'yellow' | 'green' | 'auto';
  } | null>(null);

  const [activeSeoSlug, setActiveSeoSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return getSlugFromPath(window.location.pathname);
    }
    return null;
  });

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'app' | 'seo'>(() => {
    if (typeof window !== 'undefined') {
      const initialSlug = getSlugFromPath(window.location.pathname);
      if (initialSlug) return 'seo';
    }
    return 'landing';
  });
  const [currentTab, setCurrentTab] = useState<AppTab>('trilhas');
  const [studyingTheoryLesson, setStudyingTheoryLesson] = useState<Lesson | null>(null);
  const [activeQuizLesson, setActiveQuizLesson] = useState<Lesson | null>(null);
  const [isSimuladoOpen, setIsSimuladoOpen] = useState(false);
  const [activeSimuladoData, setActiveSimuladoData] = useState<{
    questions: Question[];
    title: string;
    timeMinutes: number;
  } | null>(null);
  const [isPlacasQuizOpen, setIsPlacasQuizOpen] = useState(false);
  const [placasQuizCategory, setPlacasQuizCategory] = useState<PlacaQuizCategory>('todas');

  // Sidebars collapsible states
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(() => {
    try {
      return localStorage.getItem('diriggo_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [isRightCollapsed, setIsRightCollapsed] = useState(() => {
    try {
      return localStorage.getItem('diriggo_right_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleLeftSidebar = () => {
    sounds.playClick();
    setIsLeftCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('diriggo_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleToggleRightSidebar = () => {
    sounds.playClick();
    setIsRightCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('diriggo_right_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // 1. Dark mode permanente (Modo Light removido da aplicação)
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // 2. Sync to localStorage for fast reload (only for active session)
  useEffect(() => {
    try {
      if (profile.isLoggedIn && profile.uid) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      }
    } catch {
      // ignore
    }
    sounds.enabled = profile.soundEnabled;
  }, [profile]);

  // 3. Listen to Firebase Auth state on mount & handle mobile redirect result
  useEffect(() => {
    checkRedirectResult().then(async (redirectUser) => {
      if (redirectUser) {
        const userProfile = await syncOrInitUserProfile(redirectUser);
        setProfile(userProfile);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
        } catch {
          // ignore
        }
        setCurrentView('app');
        setCurrentTab('trilhas');
      }
    });

    const unsubscribe = subscribeToAuthChanges(async (user: User | null) => {
      if (user) {
        // Se trocou de usuário, limpa o estado anterior imediatamente
        setProfile(prev => {
          if (prev.uid && prev.uid !== user.uid) {
            return {
              ...INITIAL_USER_PROFILE,
              uid: user.uid,
              name: user.displayName || 'Condutor',
              email: user.email || '',
              photoURL: user.photoURL || undefined,
              isLoggedIn: true,
            };
          }
          return prev;
        });

        // Carrega os dados persistidos no Firestore ou inicializa novo usuário
        const userProfile = await syncOrInitUserProfile(user);
        setProfile(userProfile);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
        } catch {
          // ignore
        }
      } else {
        // Usuário deslogado: zera o estado local para evitar vazamento de progresso
        setProfile(INITIAL_USER_PROFILE);
        try {
          localStorage.removeItem(STORAGE_KEY);
          sessionStorage.clear();
        } catch {
          // ignore
        }
        // Se estiver dentro da área restrita do app, expulsa para a tela de login
        setCurrentView(prev => (prev === 'app' ? 'login' : prev));
      }
    });

    return () => unsubscribe();
  }, []);

  // 4. Proteção de Rota Estrita: Só pode entrar na aplicação ('app') se estiver logado
  useEffect(() => {
    if (currentView === 'app') {
      const isAuthenticated = Boolean(profile.isLoggedIn && profile.uid);
      if (!isAuthenticated) {
        sounds.playClick();
        setCurrentView('login');
      }
    }
  }, [currentView, profile.isLoggedIn, profile.uid]);

  // Client-side URL history & popstate listener for SEO pages
  useEffect(() => {
    const handlePopState = () => {
      const slug = getSlugFromPath(window.location.pathname);
      if (slug) {
        setActiveSeoSlug(slug);
        setCurrentView('seo');
      } else {
        setActiveSeoSlug(null);
        if (currentView === 'seo') {
          setCurrentView('landing');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  // Helper central para sincronização imediata no LocalStorage e Firestore
  const persistProfileChange = (updated: UserProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (updated.isLoggedIn && updated.uid) {
      saveUserProgressToFirestore(updated);
    }
  };

  // Handlers
  const handleNavigateToSeoPage = (slug: string) => {
    sounds.playClick();
    const page = SEO_PAGES[slug];
    if (page) {
      window.history.pushState({}, '', page.path);
      setActiveSeoSlug(slug);
      setCurrentView('seo');
    }
  };

  const handleGoHomeFromSeo = () => {
    sounds.playClick();
    window.history.pushState({}, '', '/');
    setActiveSeoSlug(null);
    setCurrentView('landing');
  };

  const handleToggleSound = () => {
    setProfile(prev => {
      const updated = { ...prev, soundEnabled: !prev.soundEnabled };
      persistProfileChange(updated);
      return updated;
    });
  };

  const handleResetCnhPoints = () => {
    sounds.playCorrect();
    setProfile(prev => {
      const updated = { ...prev, cnhPoints: 0 };
      persistProfileChange(updated);
      return updated;
    });
  };

  const handleAddCnhPoints = (points: number) => {
    setProfile(prev => {
      const updated = {
        ...prev,
        cnhPoints: Math.min(prev.maxCnhPoints, prev.cnhPoints + points)
      };
      persistProfileChange(updated);
      return updated;
    });
  };

  const handleCompleteLesson = (xpEarned: number) => {
    if (!activeQuizLesson) return;

    sounds.playComplete();
    setProfile(prev => {
      const alreadyCompleted = prev.completedLessons.includes(activeQuizLesson.id);
      const newCompleted = alreadyCompleted
        ? prev.completedLessons
        : [...prev.completedLessons, activeQuizLesson.id];

      const updated: UserProfile = {
        ...prev,
        xp: prev.xp + xpEarned,
        completedLessons: newCompleted
      };

      persistProfileChange(updated);
      return updated;
    });
    setActiveQuizLesson(null);
  };

  const handleOpenPlacasQuiz = (cat: PlacaQuizCategory = 'todas') => {
    sounds.playClick();
    setPlacasQuizCategory(cat);
    setIsPlacasQuizOpen(true);
  };

  const handleCompletePlacasQuiz = (xpEarned: number) => {
    sounds.playComplete();
    setIsPlacasQuizOpen(false);
    setProfile(prev => {
      const updated: UserProfile = {
        ...prev,
        xp: prev.xp + xpEarned
      };
      persistProfileChange(updated);
      return updated;
    });
  };

  // Sincronização imediata no Firestore ao finalizar um simulado (DETRAN rule: simulados não afetam pontos CNH)
  const handleFinishSimulado = (score: number, total: number, passed: boolean, topicTitle?: string) => {
    setProfile(prev => {
      const updated: UserProfile = {
        ...prev,
        xp: prev.xp + (passed ? 50 : 15),
        simuladosHistory: [
          ...prev.simuladosHistory,
          {
            id: Date.now().toString(),
            topicTitle: topicTitle || 'Simulado Geral Oficial DETRAN',
            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
            score,
            total,
            passed,
            timeSpentSeconds: 0,
            answers: []
          }
        ]
      };
      persistProfileChange(updated);
      return updated;
    });
  };

  // Handler exclusivo de autenticação com conta Google com Loader de Semáforo Otimizado
  const handleGoogleLoginSuccess = async (user: User) => {
    // 1. Ativar o loader imediatamente (Fase 1: Semáforo Vermelho - Pare / Conectando)
    setPageLoader({
      isLoading: true,
      stage: 'red',
      phase: 'red',
      message: 'Conectando à sua conta Google...',
      subMessage: 'Verificando credenciais seguras'
    });

    try {
      // Transição visual rápida e elegante (200ms)
      await new Promise(r => setTimeout(r, 200));

      // 2. Carregar/sincronizar perfil no Firestore (Fase 2: Semáforo Amarelo - Atenção / Sincronizando)
      setPageLoader({
        isLoading: true,
        stage: 'yellow',
        phase: 'yellow',
        message: 'Sincronizando suas matérias do DETRAN...',
        subMessage: 'Carregando trilhas e pontuação na CNH'
      });

      // Busca dados com timeout rápido e deduplicado
      const userProfile = await syncOrInitUserProfile(user);
      setProfile(userProfile);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
      } catch {
        // ignore
      }

      // Pequena pausa (100ms) para transição perceptível
      await new Promise(r => setTimeout(r, 100));

      // 3. Transicionar para Verde imediatamente (Fase 3: Semáforo Verde - Siga / Pronto para pilotar!)
      sounds.playCorrect();
      setPageLoader({
        isLoading: true,
        stage: 'green',
        phase: 'green',
        message: 'Sinal verde para pilotar!',
        subMessage: 'Entrando na Garagem...'
      });

      // 380ms para celebrar o sinal verde e entrar suavemente no app
      await new Promise(r => setTimeout(r, 380));

      setCurrentView('app');
      setCurrentTab('trilhas');
    } catch (err) {
      console.error('[Diriggo] Erro na sincronização:', err);
      setCurrentView('app');
      setCurrentTab('trilhas');
    } finally {
      setPageLoader(null);
    }
  };

  // Logout completo com limpeza do estado e Firebase Auth
  const handleLogout = async () => {
    sounds.playClick();
    await logoutFirebase();
    setProfile(INITIAL_USER_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setCurrentView('landing');
    setCurrentTab('trilhas');
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
    <div className="min-h-screen dark bg-[#131f24] text-white">
      {/* Global Traffic Light Page Loader */}
      {pageLoader?.isLoading && (
        <TrafficLoader
          message={pageLoader.message}
          subMessage={pageLoader.subMessage}
          stage={pageLoader.stage || pageLoader.phase}
          phase={pageLoader.phase || pageLoader.stage}
        />
      )}
      {/* 1. LANDING PAGE */}
      {currentView === 'landing' && (
        <LandingPage
          profile={profile}
          onLogout={handleLogout}
          onNavigateToSeoPage={handleNavigateToSeoPage}
          onStartLearning={() => {
            sounds.playClick();
            if (profile.isLoggedIn && profile.uid) {
              setCurrentView('app');
              setCurrentTab('trilhas');
            } else {
              setCurrentView('login');
            }
          }}
          onOpenSimulado={() => {
            sounds.playClick();
            if (profile.isLoggedIn && profile.uid) {
              handleLaunchSimulado(ALL_QUESTIONS, 'Simulado Geral Oficial DETRAN (30Q)', 40);
            } else {
              setCurrentView('login');
            }
          }}
          onOpenAuth={() => {
            sounds.playClick();
            if (profile.isLoggedIn && profile.uid) {
              setCurrentView('app');
            } else {
              setCurrentView('login');
            }
          }}
        />
      )}

      {/* 1.1 SEO CONTENT PAGES (ROTAS DETRAN, MATÉRIAS & REGRAS CTB) */}
      {currentView === 'seo' && activeSeoSlug && SEO_PAGES[activeSeoSlug] && (
        <SeoArticlePage
          page={SEO_PAGES[activeSeoSlug]}
          profile={profile}
          onGoHome={handleGoHomeFromSeo}
          onNavigateToPage={handleNavigateToSeoPage}
          onStartLearning={() => {
            sounds.playClick();
            window.history.pushState({}, '', '/');
            setActiveSeoSlug(null);
            if (profile.isLoggedIn && profile.uid) {
              setCurrentView('app');
              setCurrentTab('trilhas');
            } else {
              setCurrentView('login');
            }
          }}
          onOpenSimulado={() => {
            sounds.playClick();
            window.history.pushState({}, '', '/');
            setActiveSeoSlug(null);
            if (profile.isLoggedIn && profile.uid) {
              setCurrentView('app');
              handleLaunchSimulado(ALL_QUESTIONS, 'Simulado Geral Oficial DETRAN (30Q)', 40);
            } else {
              setCurrentView('login');
            }
          }}
          onOpenAuth={() => {
            sounds.playClick();
            window.history.pushState({}, '', '/');
            setActiveSeoSlug(null);
            if (profile.isLoggedIn && profile.uid) {
              setCurrentView('app');
            } else {
              setCurrentView('login');
            }
          }}
          onLogout={handleLogout}
        />
      )}

      {/* 2. LOGIN PAGE (EXCLUSIVO GOOGLE) */}
      {currentView === 'login' && (
        <LoginPage
          onBack={() => {
            sounds.playClick();
            window.history.pushState({}, '', '/');
            setActiveSeoSlug(null);
            setCurrentView('landing');
          }}
          onLogin={handleGoogleLoginSuccess}
          isLoggingIn={Boolean(pageLoader?.isLoading)}
        />
      )}

      {/* 3. MAIN APPLICATION */}
      {currentView === 'app' && (
        <div className="min-h-screen flex w-full relative">
          {/* Left Sidebar (Desktop fixed / Mobile bottom bar) */}
          <Sidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            profile={profile}
            onToggleSound={handleToggleSound}
            onGoLanding={() => {
              window.history.pushState({}, '', '/');
              setActiveSeoSlug(null);
              setCurrentView('landing');
            }}
            isCollapsed={isLeftCollapsed}
            onToggleCollapse={handleToggleLeftSidebar}
          />

          {/* Center Main Work Area */}
          <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
            {/* Mobile Top Sub-Header */}
            <div className="md:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#131f24]/95 border-b border-slate-200 dark:border-[#202f36] px-4 py-3 flex items-center justify-between">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setCurrentTab('trilhas')}
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFC800] border-b-2 border-[#CA8A04] flex items-center justify-center text-sm font-black text-slate-950">
                  🚦
                </div>
                <span className="font-black text-lg text-slate-900 dark:text-white">diriggo</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-black">
                <span className="text-orange-500">🔥 {profile.streak}</span>
                <span className="text-[#ffc800]">⚡ {profile.xp}</span>
                <span className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-[#182631] px-2 py-0.5 rounded-lg border border-amber-300 dark:border-[#202f36]">
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
                  onOpenSimulado={() => handleLaunchSimulado(ALL_QUESTIONS, "Simulado Geral Oficial DETRAN", 40)}
                  onOpenGuide={handleOpenUnitGuide}
                />
              )}

              {/* TAB 2: SIMULADOS HUB (Topic Specific + Official Exam) */}
              {currentTab === 'simulados' && (
                <SimuladosHub
                  profile={profile}
                  onLaunchSimulado={handleLaunchSimulado}
                  onStartPlacasQuiz={() => handleOpenPlacasQuiz('todas')}
                />
              )}

              {/* TAB 3: GALERIA DE PLACAS CONTRAN */}
              {currentTab === 'placas' && (
                <PlacasGallery 
                  bothSidebarsActive={!isLeftCollapsed && !isRightCollapsed}
                  onStartQuiz={handleOpenPlacasQuiz}
                />
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
                  onLogout={handleLogout}
                />
              )}
            </div>
          </main>

          {/* Right Sidebar (Desktop HUD & Widgets) */}
          <RightSidebar
            profile={profile}
            onOpenSimulado={() => handleLaunchSimulado(ALL_QUESTIONS, 'Simulado Geral Oficial DETRAN', 40)}
            onResetCnhPoints={handleResetCnhPoints}
            isCollapsed={isRightCollapsed}
            onToggleCollapse={handleToggleRightSidebar}
          />

          {/* Floating Expand Button for Right Sidebar when collapsed */}
          {isRightCollapsed && (
            <button
              onClick={handleToggleRightSidebar}
              className="hidden xl:flex fixed right-4 top-4 z-30 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-[#182631] border-2 border-slate-200 dark:border-[#202f36] px-3 py-2 rounded-2xl shadow-lg items-center gap-2.5 text-xs font-black cursor-pointer transition-all hover:scale-105 select-none"
              title="Expandir painel de estatísticas e missões"
            >
              <ChevronLeft className="w-4 h-4 text-[#ffc800]" />
              <span className="text-orange-500 flex items-center gap-1">
                🔥 {profile.streak}
              </span>
              <span className="text-[#ffc800] flex items-center gap-1">
                ⚡ {profile.xp}
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-700 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                Painel
              </span>
            </button>
          )}
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

      {/* Duolingo-Style Interactive Placas Quiz View */}
      {isPlacasQuizOpen && (
        <PlacasQuizView
          initialCategory={placasQuizCategory}
          onClose={() => setIsPlacasQuizOpen(false)}
          onComplete={handleCompletePlacasQuiz}
        />
      )}
    </div>
  );
}

export default App;
