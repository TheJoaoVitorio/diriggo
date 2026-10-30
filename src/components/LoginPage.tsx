import React, { useState } from 'react';
import { ArrowLeft, User, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/sound';

interface LoginPageProps {
  onBack: () => void;
  onLogin: (name: string, email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (!name.trim()) return;
    onLogin(name.trim(), email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@aluno.diriggo.com`);
  };

  const handleGuest = () => {
    sounds.playClick();
    onLogin('Futuro Condutor', 'visitante@diriggo.com');
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

      {/* Main Content: Gamified Hero Scene & Login Card */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-center gap-10 flex-1">
        
        {/* Left Side: Cartoon Car & Traffic Sign Scene */}
        <div className="flex-1 flex flex-col items-center text-center lg:text-left lg:items-start max-w-md">
          {/* Mascot speech bubble */}
          <div className="bg-white text-slate-900 p-4 rounded-2xl border-b-4 border-amber-400 shadow-xl mb-4 relative max-w-xs animate-bounce duration-1000">
            <span className="text-xs font-black uppercase text-amber-600 block mb-0.5">
              Mascote Diriggo:
            </span>
            <p className="text-sm font-extrabold leading-snug">
              "Bora treinar para a prova teórica sem medo de ser reprovado!"
            </p>
            {/* Bubble arrow */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45 border-r-2 border-b-2 border-amber-400" />
          </div>

          {/* Scene: 3D Mascot + Cartoon Autoescola Car */}
          <div className="flex items-end justify-center gap-4 my-2">
            <div className="w-32 sm:w-40 drop-shadow-2xl hover:scale-105 transition-transform">
              <img
                src="/mascote-diriggo.png"
                alt="Mascote Capivara CNH"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Cartoon Car Vector Illustration */}
            <div className="relative w-44 h-28 hidden sm:flex items-center justify-center">
              <div className="absolute bottom-2 w-40 h-5 bg-black/40 rounded-full blur-sm" />
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
          </div>

          {/* Gamified Benefits list */}
          <div className="mt-4 space-y-2 hidden sm:block">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Metodologia Duolingo com Vidas e Ofensivas diárias</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Simulado com 30 questões idêntico ao DETRAN</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Gratuito e sem pegadinhas</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login / Register Form Card */}
        <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border-b-8 border-slate-300 shadow-2xl relative">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isRegister ? 'Criar sua Conta' : 'Acesse sua Garagem'}
            </h2>
            <p className="text-xs font-bold text-slate-500 mt-1">
              Guarde seus XP, vidas e o histórico da sua aprovação.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                Seu Nome ou Apelido
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Santos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none font-bold text-slate-900 text-sm bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                E-mail (Para salvar progresso)
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="amanda@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none font-bold text-slate-900 text-sm bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 rounded-2xl duo-btn-yellow font-black text-sm uppercase tracking-wide cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>{isRegister ? 'Cadastrar e Começar' : 'Entrar na Autoescola'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-xs font-black text-slate-400 uppercase">
              ou
            </span>
          </div>

          {/* 1-Click Guest Button */}
          <button
            onClick={handleGuest}
            className="w-full py-3.5 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 border-b-4 font-black text-slate-700 text-xs uppercase tracking-wide cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <span>Entrar como Visitante (1 Clique)</span>
          </button>

          <div className="mt-5 text-center">
            <button
              onClick={() => {
                sounds.playClick();
                setIsRegister(prev => !prev);
              }}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
            >
              {isRegister
                ? 'Já tem cadastro? Clique aqui para entrar'
                : 'Novo aluno? Cadastre-se em segundos'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs font-semibold text-slate-500">
        Diriggo © 2026 • Simulados e Didática Gamificada para CNH Brasil
      </footer>
    </div>
  );
};
