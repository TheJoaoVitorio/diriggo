import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  Trophy, 
  AlertTriangle, 
  Lightbulb, 
  Info, 
  Share2,
  BookOpen,
  LogOut
} from 'lucide-react';
import { SeoPageContent, SEO_PAGES } from '../data/seoPages';
import { sounds } from '../utils/sound';
import { UserProfile } from '../types';

interface SeoArticlePageProps {
  page: SeoPageContent;
  profile?: UserProfile;
  onGoHome: () => void;
  onNavigateToPage: (slug: string) => void;
  onStartLearning: () => void;
  onOpenSimulado: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
}

export const SeoArticlePage: React.FC<SeoArticlePageProps> = ({
  page,
  profile,
  onGoHome,
  onNavigateToPage,
  onStartLearning,
  onOpenSimulado,
  onOpenAuth,
  onLogout,
}) => {
  const isLoggedIn = Boolean(profile?.isLoggedIn && profile?.uid);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // 1. Dynamic SEO Meta Tags & Schema.org JSON-LD
  useEffect(() => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Title & Description
    document.title = page.metaTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', page.metaDescription);

    // Schema.org Structured Data (Article + FAQPage)
    const jsonLdData: any = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          'headline': page.title,
          'description': page.metaDescription,
          'dateModified': new Date().toISOString(),
          'author': {
            '@type': 'Organization',
            'name': 'Diriggo Educação para o Trânsito',
            'url': window.location.origin
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Diriggo',
            'logo': {
              '@type': 'ImageObject',
              'url': `${window.location.origin}/logo.png`
            }
          }
        }
      ]
    };

    if (page.faqs && page.faqs.length > 0) {
      jsonLdData['@graph'].push({
        '@type': 'FAQPage',
        'mainEntity': page.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });
    }

    const scriptId = 'diriggo-seo-jsonld';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdData);

    return () => {
      // Restore default title on unmount
      document.title = 'Diriggo - Passe na Prova do DETRAN de Primeira';
    };
  }, [page]);

  const handleShare = () => {
    sounds.playClick();
    if (navigator.share) {
      navigator.share({
        title: page.title,
        text: page.metaDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#131f24] text-slate-100 flex flex-col justify-between selection:bg-amber-300 selection:text-slate-900 select-none">
      
      {/* 1. STICKY TOPBAR */}
      <header className="border-b-2 border-slate-800 bg-[#131f24]/95 backdrop-blur sticky top-0 z-40 transition-all">
        <div className="max-w-[1024px] mx-auto px-4 h-[68px] flex items-center justify-between">
          {/* Logo & Back button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onGoHome();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Voltar ao início"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Início</span>
            </button>

            <div 
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={() => {
                sounds.playClick();
                onGoHome();
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFC800] border-b-2 border-[#CA8A04] flex items-center justify-center text-sm font-black text-slate-950 shadow-xs group-hover:scale-105 transition-transform">
                🚦
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                dirig<span className="text-[#FFC800]">go</span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSimulado();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-xs font-bold text-amber-400 cursor-pointer transition-all"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Simulado Grátis</span>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onStartLearning();
                  }}
                  className="px-4 py-2 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs active:translate-y-0.5"
                >
                  <span>Acessar Garagem</span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onLogout();
                    }}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer text-xs"
                    title="Sair da conta"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAuth();
                }}
                className="px-4 py-2 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs active:translate-y-0.5"
              >
                <span>Começar Grátis</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. BREADCRUMBS & ARTICLE HERO */}
      <main className="max-w-[860px] w-full mx-auto px-4 py-8 sm:py-12 flex-1">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-6 overflow-x-auto pb-1 no-scrollbar">
          <button 
            onClick={onGoHome} 
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Início
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-600" />
          <span className="text-slate-400 whitespace-nowrap">{page.category}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-600" />
          <span className="text-amber-400 font-bold truncate max-w-[240px] sm:max-w-none">
            {page.title}
          </span>
        </nav>

        {/* Category Badge & Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <span>{page.icon}</span>
            <span>{page.category}</span>
          </span>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{page.readTime} de leitura</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Atualizado em {page.updatedAt}</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="ml-auto p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="Compartilhar artigo"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? 'Link copiado!' : 'Compartilhar'}</span>
          </button>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-5">
          {page.title}
        </h1>

        {/* Lead / Executive Intro */}
        <p className="text-base sm:text-lg font-semibold text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 mb-8 border-l-4 border-l-[#FFC800]">
          {page.lead}
        </p>

        {/* 3. SECTIONS CONTENT */}
        <article className="space-y-8 text-slate-200">
          {page.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <span className="w-2 h-5 bg-[#FFC800] rounded-full inline-block" />
                <span>{section.heading}</span>
              </h2>

              <div className="space-y-3 text-sm sm:text-base font-normal leading-relaxed text-slate-300">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Callout Highlight Box */}
              {section.highlightBox && (
                <div className={`p-4 rounded-2xl border-2 shadow-xs my-4 ${
                  section.highlightBox.type === 'warning'
                    ? 'bg-rose-950/30 border-rose-800/80 text-rose-200'
                    : section.highlightBox.type === 'tip'
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                    : 'bg-amber-950/30 border-amber-800/80 text-amber-200'
                }`}>
                  <div className="flex items-center gap-2 font-black text-sm mb-1.5 uppercase tracking-wide">
                    {section.highlightBox.type === 'warning' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                    {section.highlightBox.type === 'tip' && <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {section.highlightBox.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
                    <span>{section.highlightBox.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
                    {section.highlightBox.text}
                  </p>
                </div>
              )}

              {/* Responsive CTB Table */}
              {section.table && (
                <div className="my-5 overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/60 shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-800 text-slate-200 uppercase text-[11px] font-black tracking-wider border-b border-slate-700">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 font-black">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-medium">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? 'font-bold text-white' : 'text-slate-300'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* 4. INTERACTIVE FAQ ACCORDION */}
        {page.faqs && page.faqs.length > 0 && (
          <section className="mt-12 pt-8 border-t-2 border-slate-800">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2">
              <span className="text-amber-400">❓</span>
              <span>Perguntas Frequentes sobre {page.title}</span>
            </h3>

            <div className="space-y-3">
              {page.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div 
                    key={fIdx}
                    className="border border-slate-700/80 rounded-2xl overflow-hidden bg-slate-900/50 transition-colors"
                  >
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setOpenFaqIndex(isOpen ? null : fIdx);
                      }}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-sm text-white hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. RELATED ARTICLES MESH */}
        {page.relatedSlugs && page.relatedSlugs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-800">
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Continue Estudando: Artigos e Guias Relacionados</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {page.relatedSlugs.map((relSlug) => {
                const relPage = SEO_PAGES[relSlug];
                if (!relPage) return null;
                return (
                  <div
                    key={relSlug}
                    onClick={() => {
                      sounds.playClick();
                      onNavigateToPage(relSlug);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/80 transition-all cursor-pointer group flex flex-col justify-between hover:translate-y-[-2px]"
                  >
                    <div>
                      <span className="text-xl mb-1.5 block">{relPage.icon}</span>
                      <h5 className="font-bold text-xs text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {relPage.title}
                      </h5>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold mt-2 flex items-center gap-1 group-hover:text-slate-300">
                      <span>Ler guia</span>
                      <span>→</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. CONVERSION CTA BANNER */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-400/40 shadow-xl text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFC800] text-slate-950 flex items-center justify-center text-2xl font-black mb-3 shadow-md">
            🚦
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Preparado para ser aprovado de primeira no DETRAN?
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-300 max-w-md mt-2 leading-relaxed">
            Estude com a metodologia gamificada do Diriggo, faça simulados oficiais ilimitados e garanta sua carteira de motorista sem estresse.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
            <button
              onClick={() => {
                sounds.playClick();
                onStartLearning();
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl duo-btn-yellow font-black text-xs uppercase tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>{isLoggedIn ? 'Continuar Aprendendo' : 'Começar Agora Grátis'}</span>
              <span>→</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenSimulado();
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-black text-xs uppercase tracking-wider text-amber-400 cursor-pointer transition-colors"
            >
              Fazer Simulado Oficial
            </button>
          </div>
        </div>
      </main>

      {/* 7. COMPLETE FOOTER (WITH INTERACTIVE SEO LINKS) */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 border-t-2 border-slate-800 mt-12">
        <div className="max-w-[1024px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h4 className="text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Sobre nós</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <button 
                  onClick={() => onNavigateToPage('metodologia')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Metodologia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('eficacia')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Eficácia
                </button>
              </li>
              <li>
                <button 
                  onClick={onGoHome} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Matérias CNH</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <button 
                  onClick={() => onNavigateToPage('legislacao')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Legislação
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('direcao-defensiva')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Direção Defensiva
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('primeiros-socorros')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Primeiros Socorros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('mecanica-basica')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Mecânica Básica
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Simulados</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <button 
                  onClick={() => onNavigateToPage('simulado-detran-sp')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  DETRAN SP
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('simulado-detran-rj')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  DETRAN RJ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('simulado-detran-mg')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  DETRAN MG
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('simulado-detran-pr')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  DETRAN PR
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Regras & Ajuda</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <button 
                  onClick={() => onNavigateToPage('duvidas-frequentes')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Dúvidas Frequentes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('pontuacao-cnh')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Pontuação CNH
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('legislacao')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Resoluções CONTRAN
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[13px] uppercase tracking-[0.8px] mb-4">Privacidade</h4>
            <ul className="space-y-2 text-[13px] font-bold">
              <li>
                <button 
                  onClick={() => onNavigateToPage('termos-de-uso')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToPage('politica-privacidade')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Privacidade (LGPD)
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1024px] mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold text-slate-500">
          <span>© 2026 Diriggo. Todos os direitos reservados.</span>
          <span>Material educacional preparado com base no Código de Trânsito Brasileiro (Lei nº 9.503/1997).</span>
        </div>
      </footer>
    </div>
  );
};
