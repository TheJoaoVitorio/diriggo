import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Trophy, 
  ChevronDown
} from 'lucide-react';
import { 
  HeroTrafficWorldIllustration, 
  GamificationIllustration, 
  RoadMapIllustration, 
  ExamCertificateIllustration,
  MascotFarolito
} from './LandingIllustrations';
import { sounds } from '../utils/sound';

interface LandingPageProps {
  onStartLearning: () => void;
  onOpenSimulado: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onOpenSimulado,
  onOpenAuth
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { icon: '🚦', name: 'LEGISLAÇÃO DE TRÂNSITO', desc: '12 QUESTÕES' },
    { icon: '🌧️', name: 'DIREÇÃO DEFENSIVA', desc: '10 QUESTÕES' },
    { icon: '🩹', name: 'PRIMEIROS SOCORROS', desc: '3 QUESTÕES' },
    { icon: '🌳', name: 'MEIO AMBIENTE & CIDADANIA', desc: '3 QUESTÕES' },
    { icon: '🔧', name: 'MECÂNICA BÁSICA', desc: '2 QUESTÕES' },
    { icon: '🛑', name: 'PLACAS & SINALIZAÇÃO', desc: 'CONTRAN' }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    sounds.playClick();
    if (scrollRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-[#4b4b4b] dark:text-slate-100 flex flex-col justify-between selection:bg-amber-300 selection:text-slate-900 transition-colors">
      
      {/* 1. DUOLINGO EXACT HEADER (1024px centered, clean border-b) */}
      <header className="border-b-2 border-[#e5e5e5] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1024px] mx-auto px-4 h-[70px] flex items-center justify-between">
          {/* Logo with Traffic Mascot */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => {
              sounds.playClick();
              onStartLearning();
            }}
          >
            <div className="w-9 h-9 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-lg shadow-xs">
              🚦
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

            {/* Login Ghost Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="px-4 py-2.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-slate-700 hover:bg-[#f7f7f7] dark:hover:bg-slate-800 border-b-4 font-black text-[13px] uppercase tracking-[0.8px] text-[#4b4b4b] dark:text-slate-200 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2"
            >
              Já tenho uma conta
            </button>
          </div>
        </div>
      </header>

      {/* 2. DUOLINGO HERO SECTION */}
      <section className="max-w-[1024px] w-full mx-auto px-4 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[520px]">
        
        {/* Left: Traffic Globe & Autoescola Car Illustration */}
        <div className="flex-1 flex justify-center items-center w-full">
          <HeroTrafficWorldIllustration />
        </div>

        {/* Right: Duolingo Action Hub */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-[420px]">
          <h1 className="text-[32px] sm:text-[36px] font-black text-[#4b4b4b] dark:text-white leading-[1.25] tracking-tight">
            O jeito grátis, divertido e eficaz de passar na prova da <span className="text-[#CA8A04] dark:text-[#FFC800]">CNH</span>!
          </h1>

          <div className="mt-8 flex flex-col w-full max-w-[330px] gap-3.5">
            {/* Primary Duolingo Button (Traffic Yellow 3D) */}
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="w-full h-[50px] rounded-2xl duo-btn-yellow font-black text-[15px] uppercase tracking-[0.8px] cursor-pointer shadow-sm flex items-center justify-center transition-all"
            >
              Começar Agora
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="w-full h-[50px] rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#e5e5e5] dark:border-slate-700 border-b-4 font-black text-[15px] uppercase tracking-[0.8px] text-[#CA8A04] dark:text-[#FFC800] hover:bg-[#f7f7f7] dark:hover:bg-slate-700 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2"
            >
              Já tenho uma conta
            </button>

            {/* Simulado Fast Action */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSimulado();
              }}
              className="text-xs font-bold text-[#777777] dark:text-slate-400 hover:text-[#CA8A04] dark:hover:text-[#FFC800] pt-1 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulado Oficial DETRAN (30 Questões)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. DUOLINGO COURSE RIBBON (Matérias CONTRAN com setas) */}
      <section className="w-full border-y-2 border-[#e5e5e5] dark:border-slate-800 bg-white dark:bg-slate-900 py-3.5 relative">
        <div className="max-w-[1024px] mx-auto px-4 flex items-center justify-between gap-3">
          {/* Scroll left button */}
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontal subjects list */}
          <div
            ref={scrollRef}
            className="flex-1 flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                onClick={() => {
                  sounds.playClick();
                  onStartLearning();
                }}
                className="flex items-center gap-2.5 shrink-0 cursor-pointer hover:opacity-80 transition-opacity select-none"
              >
                <span className="text-2xl">{sub.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black uppercase tracking-[0.8px] text-[#4b4b4b] dark:text-slate-200">
                    {sub.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#777777] dark:text-slate-400">
                    {sub.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll right button */}
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. DUOLINGO ALTERNATING FEATURE SECTIONS */}

      {/* Section 1: grátis. divertido. eficaz. */}
      <section className="py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Illustration */}
          <div className="flex-1 flex justify-center">
            <GamificationIllustration />
          </div>

          {/* Right Copy */}
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <h2 className="text-[36px] font-black text-[#EAB308] dark:text-[#FACC15] leading-[1.2] tracking-tight">
              grátis. divertido. eficaz.
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Aprender para a prova da CNH no Diriggo é como jogar um videogame. Ganhe pontos ao acertar questões, acumule ofensivas diárias e compita com você mesmo sem o estresse das apostilas antigas.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: apoiado pela ciência */}
      <section className="py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800 bg-[#f7f7f7] dark:bg-slate-900/50">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Copy */}
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <h2 className="text-[36px] font-black text-[#1cb0f6] leading-[1.2] tracking-tight">
              apoiado pela ciência
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Combinamos material de estudo prévio em <strong>slides visuais com infográficos</strong> e repetição espaçada personalizada. Se você errar uma questão, nossa fila inteligente traz ela de volta até você dominá-la 100%!
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <RoadMapIllustration />
          </div>
        </div>
      </section>

      {/* Section 3: mantenha a sua CNH limpa */}
      <section className="py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Custom CNH Illustration */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[340px] bg-[#047857] p-6 rounded-3xl text-white shadow-2xl border-4 border-[#10B981] relative select-none">
              <div className="flex items-center justify-between border-b border-emerald-400/50 pb-3 mb-4">
                <span className="text-[10px] font-black tracking-widest uppercase">REPÚBLICA FEDERATIVA DO BRASIL</span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded font-black">CAT B</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-emerald-900/60 rounded-xl border border-emerald-400 flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <h4 className="text-sm font-black">FUTURO CONDUTOR</h4>
                  <span className="text-[11px] font-bold text-emerald-200 block mt-0.5">Pontos na CNH:</span>
                  <span className="text-2xl font-black text-emerald-100">0 / 20 PTS</span>
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
      <section className="py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800 bg-[#f7f7f7] dark:bg-slate-900/50">
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
              className="mt-6 px-6 h-[46px] rounded-2xl duo-btn-yellow font-black text-[13px] uppercase tracking-[0.8px] cursor-pointer shadow-sm inline-flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Fazer Simulado 30Q</span>
            </button>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <ExamCertificateIllustration />
          </div>
        </div>
      </section>

      {/* Section 5: Mobile / Conheça o Instrutor Farolito */}
      <section className="py-20 border-b-2 border-[#e5e5e5] dark:border-slate-800">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex justify-center">
            <MascotFarolito size={160} />
          </div>
          <div className="flex-1 text-center md:text-left max-w-[460px]">
            <h2 className="text-[36px] font-black text-[#1cb0f6] leading-[1.2] tracking-tight">
              estude onde e quando quiser
            </h2>
            <p className="mt-4 text-[17px] text-[#777777] dark:text-slate-300 font-semibold leading-relaxed">
              Aproveite os intervalos do dia a dia, no ônibus, na fila do banco ou antes de dormir. O instrutor Farolito avisa a hora de praticar para não perder a sua ofensiva diária.
            </p>
          </div>
        </div>
      </section>

      {/* 5. DUOLINGO BOTTOM CTA BANNER */}
      <section className="py-24 text-center">
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
              className="w-full h-[52px] rounded-2xl duo-btn-yellow font-black text-[15px] uppercase tracking-[0.8px] cursor-pointer shadow-md flex items-center justify-center transition-all"
            >
              Comece Já
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
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Cursos</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Metodologia</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Eficácia</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Carreiras</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Matérias CNH</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Legislação</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Direção Defensiva</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Primeiros Socorros</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Mecânica</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Simulados</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">DETRAN SP</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">DETRAN RJ</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">DETRAN MG</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">DETRAN PR</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Ajuda</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Dúvidas Frequentes</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Resoluções CONTRAN</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Pontuação CTB</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#4b4b4b] dark:text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Privacidade</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Privacidade</a></li>
              <li><a href="#" className="hover:text-[#4b4b4b] dark:hover:text-white">Segurança</a></li>
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
