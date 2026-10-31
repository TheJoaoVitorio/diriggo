import React, { useState } from 'react';
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Cloud, 
  Sparkles,
  Loader2,
  Lock
} from 'lucide-react';
import { User } from 'firebase/auth';
import { sounds } from '../utils/sound';
import { signInWithGoogle, isFirebaseConfigured } from '../services/firebase';

interface LoginPageProps {
  onBack: () => void;
  onLogin: (user: User) => void;
  isLoggingIn?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLogin, isLoggingIn = false }) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sessionOnly, setSessionOnly] = useState(false);

  const handleGoogleSignIn = async () => {
    sounds.playClick();
    setAuthError(null);
    setIsLoadingGoogle(true);

    try {
      if (!isFirebaseConfigured()) {
        setAuthError(
          'Configuração pendente: Adicione as credenciais do Firebase no arquivo .env para ativar a autenticação com conta Google.'
        );
        setIsLoadingGoogle(false);
        return;
      }

      // Autenticação com opção de persistência de sessão (browserSessionPersistence)
      const user = await signInWithGoogle(sessionOnly);
      if (user) {
        sounds.playCorrect();
        onLogin(user);
      }
    } catch (err: any) {
      console.error('[LoginPage] Erro na autenticação com Google:', err);
      if (err.message === 'CONFIG_REQUIRED') {
        setAuthError(
          'Chaves do Firebase não encontradas no arquivo .env. Configure VITE_FIREBASE_API_KEY e VITE_FIREBASE_PROJECT_ID.'
        );
      } else if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Janela de login fechada antes da confirmação. Clique novamente para continuar.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setAuthError(null);
      } else if (err.code === 'auth/popup-blocked') {
        setAuthError('O navegador bloqueou a janela pop-up do Google. Por favor, permita pop-ups para este site.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setAuthError(
          'Domínio não autorizado: Adicione este domínio ou "localhost" nos domínios autorizados do Firebase Console (Authentication > Settings > Authorized domains).'
        );
      } else {
        setAuthError(err.message || 'Falha ao autenticar com Google. Tente novamente.');
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Animated Road / Highway */}
      <div className="absolute inset-0 opacity-25 pointer-events-none flex justify-center">
        {/* Road surface */}
        <div className="w-full max-w-3xl bg-slate-800 h-full relative border-x-4 border-slate-700">
          {/* Animated Road Dashed Centerline */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 road-stripe animate-pulse" />
        </div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-4 py-6 flex items-center justify-between">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-sm cursor-pointer transition-colors backdrop-blur"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#FFC800] border-b-2 border-amber-600 flex items-center justify-center text-lg shadow-md">
            🚦
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Dirig<span className="text-[#FFC800]">go</span>
          </span>
        </div>
      </header>

      {/* Main Content: Gamified Hero Scene & Exclusively Google Login Card */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-center gap-10 flex-1">
        
        {/* Left Side: Cartoon Car & Traffic Sign Scene */}
        <div className="flex-1 flex flex-col items-center text-center lg:text-left lg:items-start max-w-md">
          {/* Mascot speech bubble */}
          <div className="bg-white text-slate-900 p-4 rounded-2xl border-b-4 border-amber-400 shadow-xl mb-4 relative max-w-xs animate-bounce duration-1000">
            <span className="text-xs font-black uppercase text-amber-600 block mb-0.5">
              Instrutor Diriggo:
            </span>
            <p className="text-sm font-extrabold leading-snug">
              "Acesso protegido! Conecte com sua conta Google para salvar sua evolução na nuvem."
            </p>
            {/* Bubble arrow */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45 border-r-2 border-b-2 border-amber-400" />
          </div>

          {/* Cartoon Autoescola Car Scene */}
          <div className="relative my-4 w-64 h-36 flex items-center justify-center">
            <div className="absolute bottom-2 w-52 h-6 bg-black/40 rounded-full blur-sm" />
            <svg viewBox="0 0 240 120" className="w-full h-full drop-shadow-2xl">
              {/* Roof Sign (AUTOESCOLA) */}
              <rect x="95" y="10" width="50" height="18" rx="4" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="2" />
              <text x="120" y="22" fill="#18181B" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                DIRIGGO
              </text>
              <rect x="117" y="28" width="6" height="6" fill="#71717A" />

              {/* Car Body (Yellow) */}
              <path
                d="M 25 75 L 45 42 L 80 34 L 160 34 L 195 48 L 225 65 L 225 85 L 20 85 L 20 75 Z"
                fill="#FFC800"
                stroke="#CA8A04"
                strokeWidth="3"
              />

              {/* Windows */}
              <path d="M 52 44 L 80 38 L 115 38 L 115 62 L 40 62 Z" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2" />
              <path d="M 125 38 L 160 38 L 190 50 L 190 62 L 125 62 Z" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2" />

              {/* Headlights & Tail Lights */}
              <rect x="220" y="66" width="6" height="12" rx="3" fill="#FEF08A" className="animate-pulse" />
              <rect x="18" y="66" width="5" height="10" rx="2" fill="#EF4444" />

              {/* Wheels */}
              <g className="animate-spin origin-[65px_85px] duration-1000">
                <circle cx="65" cy="85" r="20" fill="#18181B" stroke="#52525B" strokeWidth="3" />
                <circle cx="65" cy="85" r="10" fill="#E4E4E7" />
                <circle cx="65" cy="85" r="4" fill="#CA8A04" />
              </g>
              <g className="animate-spin origin-[175px_85px] duration-1000">
                <circle cx="175" cy="85" r="20" fill="#18181B" stroke="#52525B" strokeWidth="3" />
                <circle cx="175" cy="85" r="10" fill="#E4E4E7" />
                <circle cx="175" cy="85" r="4" fill="#CA8A04" />
              </g>
            </svg>
          </div>

          {/* Gamified Benefits list */}
          <div className="mt-4 space-y-2.5 hidden sm:block">
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Salva seu progresso e CNH na nuvem com Firebase</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Login exclusivo e seguro em 1 clique com conta Google</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Histórico de simulados e infrações isolados por condutor</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sua foto oficial do Google na CNH virtual do aplicativo</span>
            </div>
          </div>
        </div>

        {/* Right Side: Exclusively Google Login Card */}
        <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border-b-8 border-slate-300 shadow-2xl relative">
          {/* Header of Card */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Acesso Rápido & Seguro</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Acesse sua Garagem
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed">
              Faça login com a sua conta Google para acessar a plataforma e carregar sua trilha individual.
            </p>
          </div>

          {/* Warning / Error banner */}
          {authError && (
            <div className="mb-5 p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block leading-relaxed">{authError}</span>
              </div>
            </div>
          )}

          {/* Configuration Notice if Firebase is not yet filled in .env */}
          {!isFirebaseConfigured() && !authError && (
            <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs flex items-start gap-2.5">
              <Cloud className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold leading-relaxed">
                As credenciais do Firebase no arquivo <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-[11px]">.env</code> ativam o login real com o Google.
              </div>
            </div>
          )}

          {/* Exclusively Google Login Button */}
          <div className="space-y-4">
            <button
              type="button"
              disabled={isLoadingGoogle || isLoggingIn}
              onClick={handleGoogleSignIn}
              className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 border-b-4 font-black text-slate-800 text-sm cursor-pointer transition-all flex items-center justify-center gap-3 active:translate-y-0.5 active:border-b-2 shadow-sm group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoadingGoogle || isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                  <span className="font-black text-slate-700">Conectando ao Google...</span>
                </>
              ) : (
                <>
                  {/* Official Multi-Color Google "G" Logo */}
                  <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="tracking-wide">Continuar com o Google</span>
                </>
              )}
            </button>

            {/* Opção de Persistência de Sessão (Firebase Session Authentication) */}
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={sessionOnly}
                onChange={(e) => setSessionOnly(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 cursor-pointer accent-amber-500"
              />
              <div className="text-left">
                <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-600 inline" />
                  <span>Autenticação de Sessão Temporária</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 block leading-tight mt-0.5">
                  Exige novo login ao fechar o navegador (Firebase <code className="text-slate-600 font-mono">browserSessionPersistence</code>).
                </span>
              </div>
            </label>

            {/* Security Guarantee Badge */}
            <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Autenticação direta e protegida pelo Google</span>
            </div>
          </div>

          {/* Gamified Footer Highlights inside card */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>🚦 CNH CTB 2026</span>
            <span className="flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-blue-500" />
              <span>Nuvem Firestore</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs font-semibold text-slate-500">
        Diriggo © 2026 • Login Exclusivo Google & Persistência na Nuvem Firebase
      </footer>
    </div>
  );
};
