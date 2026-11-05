import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { 
  Globe, 
  Trophy, 
  ChevronDown,
  ArrowRight,
  LogOut,
  ShieldAlert,
  CloudRain,
  HeartPulse,
  TreePine,
  Wrench,
  OctagonAlert,
  User,
  CheckCircle2,
  Award,
  Flame
} from 'lucide-react';
import { ExamCertificateIllustration } from './LandingIllustrations';
import { TrilhaMockupPreview, QuizMockupPreview } from './ProductPreviews';
import { sounds } from '../utils/sound';
import { UserProfile } from '../types';
import { SEO_PAGES } from '../data/seoPages';

interface LandingPageProps {
  profile?: UserProfile;
  onStartLearning: () => void;
  onOpenSimulado: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onNavigateToSeoPage?: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  profile,
  onStartLearning,
  onOpenSimulado,
  onOpenAuth,
  onLogout,
  onNavigateToSeoPage
}) => {
  const isLoggedIn = Boolean(profile?.isLoggedIn && profile?.uid);

  // 1. Lenis Smooth Scrolling Engine
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. IntersectionObserver for Reveal Animations on Scroll
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  // Matérias CONTRAN — ícones vetoriais Lucide com badges táteis coloridos.
  // Substitui emojis soltos por um sistema de ícones de peso e traço consistentes.
  type SubjectItem = {
    Icon: typeof ShieldAlert;
    name: string;
    desc: string;
    tone: string;
  };

  const subjects: SubjectItem[] = [
    {
      Icon: ShieldAlert,
      name: 'Legislação de Trânsito',
      desc: '12 questões',
      tone: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30',
    },
    {
      Icon: CloudRain,
      name: 'Direção Defensiva',
      desc: '10 questões',
      tone: 'bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/30',
    },
    {
      Icon: HeartPulse,
      name: 'Primeiros Socorros',
      desc: '3 questões',
      tone: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-400/15 dark:text-rose-300 dark:border-rose-400/30',
    },
    {
      Icon: TreePine,
      name: 'Meio Ambiente & Cidadania',
      desc: '3 questões',
      tone: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30',
    },
    {
      Icon: Wrench,
      name: 'Mecânica Básica',
      desc: '2 questões',
      tone: 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-400/15 dark:text-stone-300 dark:border-stone-400/30',
    },
    {
      Icon: OctagonAlert,
      name: 'Placas & Sinalização',
      desc: 'CONTRAN',
      tone: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-400/15 dark:text-red-300 dark:border-red-400/30',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-[#4b4b4b] dark:text-slate-100 flex flex-col justify-between selection:bg-amber-300 selection:text-slate-900 transition-colors">
      
      {/* 1. DUOLINGO EXACT HEADER (1024px centered, clean border-b) */}
      <header className="border-b-2 border-[#e5e5e5] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-30 transition-all">
        <div className="max-w-[1024px] mx-auto px-4 h-[70px] flex items-center justify-between">
          {/* Logo with Traffic Mascot */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={() => {
              sounds.playClick();
              if (isLoggedIn) {
                onStartLearning();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-9 h-9 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform">
              <div
                aria-hidden="true"
                className="flex flex-col items-center gap-[3px] rounded-[4px] bg-[#18181B] px-[3px] py-[3px]"
              >
                <span className="h-1 w-1 rounded-full bg-rose-500/40" />
                <span className="h-1 w-1 rounded-full bg-amber-400/50" />
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
              </div>
            </div>
            <span className="text-[28px] font-black tracking-tight text-[#18181B] dark:text-white">
              dirig<span className="text-[#CA8A04] dark:text-[#FFC800]">go</span>
            </span>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-4">
            {/* Site Language dropdown look */}
            <div className="hidden sm:flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.8px] text-[#777777] dark:text-slate-400 cursor-pointer hover:text-[#4b4b4b] dark:hover:text-white transition-colors">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>DETRAN • BRASIL</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>

            {/* Authenticated User / Login Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onStartLearning();
                  }}
                  className="px-4 py-2.5 rounded-2xl duo-btn-yellow border-b-4 font-black text-[13px] uppercase tracking-[0.8px] cursor-pointer transition-all flex items-center gap-2 shadow-xs active:translate-y-0.5"
                >
                  {profile?.photoURL ? (
                    <img 
                      src={profile.photoURL} 
                      alt={profile.name} 
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover border border-amber-800" 
                    />
                  ) : (
                    <User className="w-4 h-4" strokeWidth={2.5} />
                  )}
                  <span>Minha Garagem</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onLogout?.();
                  }}
                  className="px-3 py-2.5 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-black text-[12px] uppercase cursor-pointer transition-all active:translate-y-0.5"
                  title="Sair da Conta"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAuth();
                }}
                className="px-4 py-2.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-slate-700 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 border-b-4 font-black text-[13px] uppercase tracking-[0.8px] text-[#4b4b4b] dark:text-slate-200 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2"
              >
                Entrar com Google
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO — cena de trânsito: semáforo verde */}
      <section className="relative max-w-[1024px] w-full mx-auto px-4 pt-4 sm:pt-6 pb-10 sm:pb-14 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Cena com semáforo */}
        <div className="relative mb-6 flex w-full max-w-[280px] items-end justify-center select-none pt-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-[#FFC800]/15 blur-2xl"
          />
          {/* Faixa tracejada de asfalto na base */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 bottom-1 h-1 rounded-full opacity-70 [background:repeating-linear-gradient(90deg,#FACC15_0_14px,transparent_14px_30px)]"
          />

          <div className="relative flex items-end justify-center pb-2">
            {/* Semáforo com sinal verde aberto */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-1.5 rounded-2xl border-2 border-slate-700 bg-slate-900 p-2 shadow-xl">
                <span className="h-4 w-4 rounded-full bg-rose-500/20 ring-1 ring-rose-500/30" />
                <span className="h-4 w-4 rounded-full bg-amber-400/25 ring-1 ring-amber-400/30" />
                <span className="h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-emerald-300/70 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
              </div>
              <div className="h-10 w-1.5 rounded-b bg-slate-400 dark:bg-slate-600" />
              <div className="h-1 w-8 rounded-full bg-slate-300/60 dark:bg-slate-700" />
            </div>
          </div>
        </div>
        {/* Headline Centralizada */}
        <h1 className="text-[34px] sm:text-[46px] md:text-[52px] font-black text-[#4b4b4b] dark:text-white leading-[1.18] tracking-tight max-w-[780px]">
          O jeito grátis, divertido e eficaz de passar na prova da <span className="text-[#CA8A04] dark:text-[#FFC800] underline decoration-[#FDE047] decoration-wavy decoration-2">CNH</span>!
        </h1>

        <p className="mt-4 text-[16px] sm:text-[18px] text-[#777777] dark:text-slate-300 font-semibold max-w-[580px] leading-relaxed">
          Simulados oficiais e trilhas gamificadas com base no Código de Trânsito Brasileiro.
        </p>

        {/* Botões de Ação Centralizados com Microinterações */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center w-full max-w-[420px] gap-3.5">
          {/* Botão Primário Duolingo (Amarelo Trânsito 3D) */}
          <button
            onClick={() => {
              sounds.playClick();
              onStartLearning();
            }}
            className="w-full sm:flex-1 h-[52px] rounded-2xl duo-btn-yellow font-black text-[15px] uppercase tracking-[0.8px] cursor-pointer shadow-md flex items-center justify-center gap-2 group transition-all"
          >
            <span>{isLoggedIn ? 'Continuar Estudos' : 'Começar Agora'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Botão Secundário (exibido apenas se não logado) */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="w-full sm:flex-1 h-[52px] rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#e5e5e5] dark:border-slate-700 border-b-4 font-black text-[15px] uppercase tracking-[0.8px] text-[#CA8A04] dark:text-[#FFC800] hover:bg-[#f7f7f7] dark:hover:bg-slate-700 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2"
            >
              Já Tenho uma Conta
            </button>
          )}
        </div>

        {/* Simulado Fast Action */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSimulado();
          }}
          className="text-xs font-bold text-[#777777] dark:text-slate-400 hover:text-[#CA8A04] dark:hover:text-[#FFC800] pt-4 flex items-center justify-center gap-1.5 cursor-pointer group transition-colors"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-500 group-hover:scale-125 transition-transform" />
          <span className="underline decoration-dotted">Fazer Simulado Oficial DETRAN (30 Questões)</span>
        </button>
      </section>

      {/* 3. DUOLINGO COURSE RIBBON (Matérias CONTRAN em loop contínuo) */}
      <section className="w-full border-y-2 border-[#e5e5e5] dark:border-slate-800 bg-white dark:bg-slate-900 py-3.5 relative shadow-xs overflow-hidden group">
        {/* Máscaras de gradiente para suavizar as bordas */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Horizontal subjects list em loop contínuo */}
        <div className="flex w-max">
          {/* Trilha 1 */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6 animate-marquee">
            {[...subjects, ...subjects].map((sub, idx) => (
              <div
                key={`track1-${idx}`}
                onClick={() => {
                  sounds.playClick();
                  onStartLearning();
                }}
                className="flex items-center gap-2.5 shrink-0 cursor-pointer hover:bg-amber-50/80 dark:hover:bg-slate-800 px-3 py-1.5 rounded-2xl hover:scale-105 transition-all select-none border border-transparent hover:border-amber-200 dark:hover:border-slate-700"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-b-2 ${sub.tone}`}
                >
                  <sub.Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-extrabold text-[#4b4b4b] dark:text-slate-200">
                    {sub.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#777777] dark:text-slate-400">
                    {sub.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Trilha 2 (cópia idêntica para o loop infinito sem pulo) */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6 animate-marquee" aria-hidden="true">
            {[...subjects, ...subjects].map((sub, idx) => (
              <div
                key={`track2-${idx}`}
                onClick={() => {
                  sounds.playClick();
                  onStartLearning();
                }}
                className="flex items-center gap-2.5 shrink-0 cursor-pointer hover:bg-amber-50/80 dark:hover:bg-slate-800 px-3 py-1.5 rounded-2xl hover:scale-105 transition-all select-none border border-transparent hover:border-amber-200 dark:hover:border-slate-700"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-b-2 ${sub.tone}`}
                >
                  <sub.Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-extrabold text-[#4b4b4b] dark:text-slate-200">
                    {sub.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#777777] dark:text-slate-400">
                    {sub.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DUOLINGO ALTERNATING FEATURE SECTIONS COM SCROLL REVEAL */}

      {/* Section 1: grátis. divertido. eficaz. */}
      <section className="reveal-on-scroll py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Quiz Capture Mockup */}
          <div className="flex-1 flex justify-center hover:scale-[1.02] transition-transform duration-500 w-full">
            <QuizMockupPreview />
          </div>

          {/* Right Copy */}
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 inline-block mb-3">
              Quiz Interativo & Placas
            </span>
            <h2 className="text-[36px] font-black text-[#EAB308] dark:text-[#FACC15] leading-[1.2] tracking-tight">
              grátis. divertido. eficaz.
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Aprender para a prova da CNH no Diriggo é como jogar um videogame. Identifique placas oficiais, decifre situações de trânsito e receba feedback imediato sem o tédio de apostilas antigas.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: apoiado pela ciência */}
      <section className="reveal-on-scroll py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800 bg-[#f7f7f7] dark:bg-slate-900/50">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Copy */}
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <span className="text-xs font-black uppercase tracking-widest text-[#1cb0f6] bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 inline-block mb-3">
              Trilha Gamificada Passo a Passo
            </span>
            <h2 className="text-[36px] font-black text-[#1cb0f6] leading-[1.2] tracking-tight">
              apoiado pela ciência
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Percorra a estrada do aprendizado com lições curtas de 5 minutos, desbloqueando fases e acumulando ofensivas. Combinamos material de estudo prévio em <strong>slides visuais com infográficos</strong> e repetição espaçada personalizada até o domínio total!
            </p>
          </div>

          {/* Right: Trilha Capture Mockup */}
          <div className="flex-1 flex justify-center hover:scale-[1.02] transition-transform duration-500 w-full">
            <TrilhaMockupPreview />
          </div>
        </div>
      </section>

      {/* Section 3: mantenha a sua CNH limpa */}
      <section className="reveal-on-scroll py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Custom CNH Illustration com Efeito Holográfico */}
          <div className="flex-1 flex justify-center">
            <div className="cnh-sheen-container w-full max-w-[340px] bg-[#047857] p-6 rounded-3xl text-white shadow-2xl border-4 border-[#10B981] relative select-none hover:rotate-1 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-emerald-400/50 pb-3 mb-4">
                <span className="text-[10px] font-black tracking-widest uppercase">REPÚBLICA FEDERATIVA DO BRASIL</span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded font-black border border-emerald-500">CAT B</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-emerald-900/60 rounded-xl border border-emerald-400 flex items-center justify-center shadow-inner">
                  <User className="w-8 h-8 text-emerald-200" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-sm font-black">FUTURO CONDUTOR</h4>
                  <span className="text-[11px] font-bold text-emerald-200 block mt-0.5">Pontos na CNH:</span>
                  <span className="text-2xl font-black text-emerald-100 flex items-center gap-1.5">
                    0 / 20 PTS
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-400/40 flex justify-between text-[11px] font-bold text-emerald-100">
                <span>Status: REGULAR</span>
                <span className="text-emerald-300">Tolerância CTB: 20 pts</span>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <h2 className="text-[36px] font-black text-[#ff4b4b] leading-[1.2] tracking-tight">
              mantenha a sua CNH limpa
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Esqueça corações genéricos: aqui você gerencia sua <strong>CNH real</strong>. Cada erro no trânsito gera pontos na sua carteira virtual (+4 pts). Se atingir 20 pontos, você deve fazer a reciclagem para limpar sua habilitação!
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: simulado oficial do detran */}
      <section className="reveal-on-scroll py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800 bg-[#f7f7f7] dark:bg-slate-900/50">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Copy */}
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <h2 className="text-[36px] font-black text-[#ff9600] leading-[1.2] tracking-tight">
              simulado oficial do detran
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Cronômetro de 40 minutos, 30 questões sorteadas proporcionalmente pelas resoluções do CONTRAN e nota de corte real de 70% (21 acertos). Saiba exatamente se você seria aprovado hoje.
            </p>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSimulado();
              }}
              className="mt-6 px-6 h-[48px] rounded-2xl duo-btn-yellow font-black text-[13px] uppercase tracking-[0.8px] cursor-pointer shadow-sm inline-flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Award className="w-4 h-4" strokeWidth={2.5} />
              <span>Fazer Simulado 30Q</span>
            </button>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center hover:scale-105 transition-transform duration-500">
            <ExamCertificateIllustration />
          </div>
        </div>
      </section>

      {/* Section 5: Mobile / Estude Onde e Quando Quiser */}
      <section className="reveal-on-scroll py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Smartphone Study Vector Frame com Animação Flutuante */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Notificação Flutuante no Topo do Celular */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-black text-[11px] shadow-lg flex items-center gap-1.5 animate-float-slow z-10 border-2 border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                <span>Meta diária atingida</span>
              </div>

              <div className="w-56 h-80 bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col select-none hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-[28px] p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-white">
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="flex flex-col items-center gap-[2px] rounded-[3px] bg-slate-900 px-[2px] py-[2px]"
                      >
                        <span className="h-[3px] w-[3px] rounded-full bg-rose-500/50" />
                        <span className="h-[3px] w-[3px] rounded-full bg-amber-400/60" />
                        <span className="h-[3px] w-[3px] rounded-full bg-emerald-400" />
                      </span>
                      Diriggo
                    </span>
                    <span className="text-amber-600 flex items-center gap-0.5">
                      <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      3
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-10 bg-[#FFC800] rounded-xl flex items-center justify-center font-black text-slate-900 text-xs shadow-sm">
                      Lição 1: Placas PARE
                    </div>
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center font-bold text-slate-500 dark:text-slate-300 text-xs">
                      Lição 2: Preferências
                    </div>
                  </div>
                  <div className="h-8 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white text-[11px]">
                    CNH: 0/20 Pontos
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <h2 className="text-[36px] font-black text-[#1cb0f6] leading-[1.2] tracking-tight">
              estude onde e quando quiser
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Aproveite os intervalos do dia a dia, no ônibus, na fila do banco ou antes de dormir. Pratique 15 minutinhos por dia com trilhas guiadas, simulados oficiais e material didático completo para garantir sua aprovação de primeira!
            </p>
          </div>
        </div>
      </section>

      {/* 5. DUOLINGO BOTTOM CTA BANNER */}
      <section className="reveal-on-scroll py-24 text-center">
        <div className="max-w-[600px] mx-auto px-4 flex flex-col items-center">
          <h2 className="text-[36px] sm:text-[42px] font-black text-[#4b4b4b] dark:text-white leading-[1.2] tracking-tight">
            Passe na prova teórica da sua CNH de primeira.
          </h2>
          <div className="mt-8 w-full max-w-[330px]">
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="w-full h-[52px] rounded-2xl duo-btn-yellow font-black text-[15px] uppercase tracking-[0.8px] cursor-pointer shadow-md flex items-center justify-center gap-2 group transition-all hover:scale-105"
            >
              <span>{isLoggedIn ? 'Continuar Aprendendo' : 'Fazer Login para Começar'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. DUOLINGO MULTI-COLUMN FOOTER */}
      <footer className="bg-[#f7f7f7] dark:bg-slate-900 text-[#777777] dark:text-slate-400 py-16 px-4 border-t-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Sobre nós</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <a 
                  href={SEO_PAGES['metodologia']?.path || '/sobre/metodologia'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('metodologia'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Metodologia
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['eficacia']?.path || '/sobre/eficacia'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('eficacia'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Eficácia do Método
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['duvidas-frequentes']?.path || '/duvidas-frequentes'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('duvidas-frequentes'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Perguntas & Respostas
                </a>
              </li>
              <li>
                <button 
                  onClick={() => { sounds.playClick(); onStartLearning(); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left cursor-pointer"
                >
                  Começar a Praticar
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Matérias CNH</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <a 
                  href={SEO_PAGES['legislacao']?.path || '/materias/legislacao-de-transito'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('legislacao'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Legislação de Trânsito
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['direcao-defensiva']?.path || '/materias/direcao-defensiva'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('direcao-defensiva'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Direção Defensiva
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['primeiros-socorros']?.path || '/materias/primeiros-socorros'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('primeiros-socorros'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Primeiros Socorros
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['mecanica-basica']?.path || '/materias/mecanica-basica'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('mecanica-basica'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Mecânica Básica
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Simulados DETRAN</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <a 
                  href={SEO_PAGES['simulado-detran-sp']?.path || '/simulados/detran-sp'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('simulado-detran-sp'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  DETRAN SP (São Paulo)
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['simulado-detran-rj']?.path || '/simulados/detran-rj'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('simulado-detran-rj'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  DETRAN RJ (Rio de Janeiro)
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['simulado-detran-mg']?.path || '/simulados/detran-mg'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('simulado-detran-mg'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  DETRAN MG (Minas Gerais)
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['simulado-detran-pr']?.path || '/simulados/detran-pr'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('simulado-detran-pr'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  DETRAN PR (Paraná)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Regras & Ajuda</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <a 
                  href={SEO_PAGES['duvidas-frequentes']?.path || '/duvidas-frequentes'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('duvidas-frequentes'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Dúvidas Frequentes
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['pontuacao-cnh']?.path || '/pontuacao-cnh'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('pontuacao-cnh'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Tabela de Pontuação CTB
                </a>
              </li>
              <li>
                <button 
                  onClick={() => { sounds.playClick(); onOpenSimulado(); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left cursor-pointer"
                >
                  Simulado Geral Oficial
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Privacidade & Legal</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <a 
                  href={SEO_PAGES['termos-de-uso']?.path || '/termos-de-uso'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('termos-de-uso'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a 
                  href={SEO_PAGES['politica-privacidade']?.path || '/politica-de-privacidade'} 
                  onClick={(e) => { e.preventDefault(); onNavigateToSeoPage?.('politica-privacidade'); }}
                  className="hover:text-[#4b4b4b] dark:hover:text-white transition-colors block text-left"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1024px] mx-auto pt-8 border-t border-[#e5e5e5] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold text-[#afafaf]">
          <span>© 2026 Diriggo. Todos os direitos reservados.</span>
          <span>Material educacional preparado com base no Código de Trânsito Brasileiro.</span>
        </div>
      </footer>
    </div>
  );
};
