import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Trophy,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { 
  HeroTrafficWorldIllustration, 
  GamificationIllustration, 
  RoadMapIllustration, 
  ExamCertificateIllustration 
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
  const subjects = [
    { icon: '🚦', name: 'Legislação de Trânsito', questions: '12 Questões' },
    { icon: '🌧️', name: 'Direção Defensiva', questions: '10 Questões' },
    { icon: '🩹', name: 'Primeiros Socorros', questions: '3 Questões' },
    { icon: '🌳', name: 'Meio Ambiente & Cidadania', questions: '3 Questões' },
    { icon: '🔧', name: 'Mecânica Básica', questions: '2 Questões' },
    { icon: '🛑', name: 'Sinalização e Placas', questions: 'Transversal' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-amber-300 selection:text-slate-900 transition-colors">
      
      {/* 1. DUOLINGO-STYLE HEADER */}
      <header className="border-b-2 border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onStartLearning}>
            <div className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-xl shadow-sm">
              🚦
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Dirig<span className="text-[#CA8A04] dark:text-[#FFC800]">go</span>
            </span>
          </div>

          {/* Right Header: Language Selector & Login CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>DETRAN • BRASIL</span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 border-b-4 font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2"
            >
              Já tenho uma conta
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Duolingo layout: Left World Illustration, Right Big Action) */}
      <section className="max-w-6xl w-full mx-auto px-4 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left: Custom Traffic Globe & Car Illustration */}
        <div className="flex-1 flex justify-center items-center w-full">
          <HeroTrafficWorldIllustration />
        </div>

        {/* Right: Duolingo-style Action Hub */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            O jeito grátis, divertido e eficaz de passar na prova da <span className="text-[#CA8A04] dark:text-[#FFC800]">CNH</span>!
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
            Aprenda as regras do Código de Trânsito Brasileiro com lições rápidas de 5 minutos, placas interativas, pontos na carteira e simulados oficiais.
          </p>

          <div className="mt-8 flex flex-col w-full max-w-sm gap-3.5">
            {/* Primary Action Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="w-full py-4 rounded-2xl duo-btn-yellow font-black text-sm uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>Começar Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAuth();
              }}
              className="w-full py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 border-b-4 font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 cursor-pointer transition-all active:translate-y-0.5 active:border-b-2"
            >
              Já tenho uma conta
            </button>

            {/* Simulado Fast Track */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSimulado();
              }}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline pt-1 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Ou faça direto o Simulado Oficial (30 Questões)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. CONTRAN DISCIPLINE RIBBON (Similar to Duolingo's Language Carousel) */}
      <section className="w-full border-y-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 py-4 transition-colors">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start lg:justify-center gap-4 min-w-max py-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2">
              Matérias:
            </span>
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-b-4 text-xs font-black shadow-xs select-none"
              >
                <span className="text-base">{sub.icon}</span>
                <span className="text-slate-800 dark:text-slate-200">{sub.name}</span>
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                  {sub.questions}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ALTERNATING FEATURE SECTIONS (Duolingo's signature 2-column alternating blocks) */}
      
      {/* Feature 1: Grátis. Divertido. Eficaz. */}
      <section className="py-20 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Illustration */}
          <div className="flex-1 flex justify-center">
            <GamificationIllustration />
          </div>

          {/* Right Copy */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#CA8A04] dark:text-[#FFC800] bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Gamificação Real
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 leading-tight">
              Grátis. Divertido. Comprovadamente eficaz.
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
              Aprender para a prova da CNH no Diriggo é como jogar um jogo. Ganhe pontos ao acertar questões, desbloqueie unidades no mapa, acumule ofensivas diárias e compita com você mesmo sem o estresse das apostilas pesadas.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Micro-lições de 5 minutos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Efeitos sonoros táteis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Apoiado pela Ciência do Aprendizado */}
      <section className="py-20 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Copy */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Método Pedagógico
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 leading-tight">
              Apoiado pela ciência da educação e retenção.
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
              Combinamos material de estudo prévio em <strong>slides visuais com infográficos</strong> e repetição espaçada personalizada. Se você errar uma questão, nossa fila inteligente traz ela de volta até você dominá-la 100%!
            </p>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-amber-500" />
                <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                  Slides de Teoria antes de cada Quiz prático
                </span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <RoadMapIllustration />
          </div>
        </div>
      </section>

      {/* Feature 3: Mantenha a sua CNH limpa (Pontos na Carteira) */}
      <section className="py-20 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Illustration / Custom CNH Graphic */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-3xl text-white shadow-2xl border-4 border-emerald-500 relative">
              <div className="flex items-center justify-between border-b border-emerald-400/50 pb-3 mb-4">
                <span className="text-xs font-black tracking-widest uppercase">CARTEIRA NACIONAL DE HABILITAÇÃO</span>
                <span className="text-xs bg-emerald-950 px-2 py-0.5 rounded font-black">CAT B</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-emerald-900/60 rounded-xl border border-emerald-400 flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <h4 className="text-base font-black">FUTURO CONDUTOR</h4>
                  <span className="text-xs font-bold text-emerald-200 block mt-0.5">Pontuação Atual no Diriggo:</span>
                  <span className="text-2xl font-black text-emerald-100">0 / 20 PONTOS</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-400/40 flex justify-between text-[11px] font-bold text-emerald-100">
                <span>Status: CNH REGULAR</span>
                <span className="text-emerald-300">Tolerância CTB: 20 pts</span>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800">
              Regras do Trânsito
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 leading-tight">
              Pontos na carteira ao invés de corações.
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
              Esqueça vidas de joguinho genérico: aqui você gerencia sua <strong>CNH real</strong>. Cada erro no trânsito gera pontos na sua carteira virtual (+4 pts). Se atingir 20 pontos, você deve fazer a reciclagem para limpar sua habilitação!
            </p>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Mantenha sua ofensiva diária</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Zere os pontos na reciclagem</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Simulado Oficial 30Q */}
      <section className="py-20 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Copy */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Simulação Fiel
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 leading-tight">
              Simulado Oficial com 30 Questões e Cronômetro.
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
              Exatamente igual à prova do DETRAN: 40 minutos de prova, questões balanceadas pelas 5 matérias do CONTRAN e cálculo automático de aprovação com nota de corte de 70% (21 acertos).
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenSimulado();
                }}
                className="px-6 py-3.5 rounded-2xl duo-btn-yellow font-black text-xs uppercase tracking-wide cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Fazer Simulado Teste Agora</span>
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <ExamCertificateIllustration />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (Duolingo Social Proof) */}
      <section className="py-20 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Comunidade de Alunos
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            Aprovados de primeira em todo o Brasil
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Card 1 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-b-6 text-left flex flex-col justify-between">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                "Eu não conseguia gravar as placas de advertência por nada nas apostilas. No Diriggo em 3 dias fiz a trilha e acertei 29 de 30 no DETRAN-SP!"
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-black text-slate-900">
                  M
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Matheus Ribeiro</h4>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Aprovado no DETRAN-SP</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-b-6 text-left flex flex-col justify-between">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                "A ideia de tomar pontos na carteira virtual a cada erro faz a gente prestar 10x mais atenção. É muito mais divertido que qualquer cursinho."
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-black text-slate-900">
                  L
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Larissa Fontes</h4>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Aprovada no DETRAN-RJ</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-b-6 text-left flex flex-col justify-between">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                "Os slides com infográficos antes das perguntas são perfeitos. Você estuda o conceito e logo em seguida responde para fixar."
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center font-black text-slate-900">
                  G
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Gabriel Souza</h4>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Aprovado no DETRAN-MG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DUOLINGO-STYLE BOTTOM CTA BANNER */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-3xl bg-[#FFC800] border-b-6 border-[#CA8A04] flex items-center justify-center text-3xl mb-6 shadow-md">
            🚦
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Passe na prova teórica da sua CNH hoje mesmo.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-semibold text-base sm:text-lg mt-3 max-w-lg">
            Junte-se a milhares de candidatos que estão estudando de forma inteligente e sem estresse.
          </p>
          <div className="mt-8 w-full max-w-xs">
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="w-full py-4 rounded-2xl duo-btn-yellow font-black text-sm uppercase tracking-wider cursor-pointer shadow-xl flex items-center justify-center gap-2"
            >
              <span>Começar a Estudar Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. DUOLINGO-STYLE MULTI-COLUMN FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 border-t-4 border-[#FFC800]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Sobre o Diriggo</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Metodologia Gamificada</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Banco de Questões</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eficácia Comprovada</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Matérias CNH</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Legislação de Trânsito</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Direção Defensiva</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Primeiros Socorros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mecânica Básica</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Simulados DETRAN</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Simulado DETRAN SP</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Simulado DETRAN RJ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Simulado DETRAN MG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Simulado DETRAN PR</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Legal & Termos</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Código de Trânsito Brasileiro</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resoluções CONTRAN</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FFC800] text-slate-900 flex items-center justify-center font-black text-xs">
              🚦
            </div>
            <span className="text-white font-black">Diriggo</span>
            <span>• © 2026 Diriggo Educação de Trânsito. Todos os direitos reservados.</span>
          </div>

          <div className="text-[11px] text-slate-500">
            Conteúdo educativo com base na Lei Federal nº 9.503/1997.
          </div>
        </div>
      </footer>
    </div>
  );
};
