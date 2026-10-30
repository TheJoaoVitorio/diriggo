import React from 'react';
import { 
  Compass, 
  FileCheck2, 
  ShieldAlert, 
  BookOpen, 
  CreditCard,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Home
} from 'lucide-react';
import { AppTab, UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface SidebarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  profile: UserProfile;
  onToggleDarkMode: () => void;
  onToggleSound: () => void;
  onGoLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  onToggleDarkMode,
  onToggleSound,
  onGoLanding
}) => {
  const navItems = [
    {
      id: 'trilhas' as AppTab,
      label: 'TRILHAS',
      icon: <Compass className="w-6 h-6 shrink-0" />,
      desc: 'Aprender na estrada'
    },
    {
      id: 'simulados' as AppTab,
      label: 'SIMULADOS',
      icon: <FileCheck2 className="w-6 h-6 shrink-0" />,
      desc: 'Provas por tópico'
    },
    {
      id: 'placas' as AppTab,
      label: 'PLACAS',
      icon: <ShieldAlert className="w-6 h-6 shrink-0" />,
      desc: 'Catálogo de sinais'
    },
    {
      id: 'material' as AppTab,
      label: 'MATERIAL DE APOIO',
      icon: <BookOpen className="w-6 h-6 shrink-0" />,
      desc: 'Resumos didáticos'
    },
    {
      id: 'perfil' as AppTab,
      label: 'MINHA CNH',
      icon: <CreditCard className="w-6 h-6 shrink-0" />,
      desc: 'Pontos e histórico'
    }
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (w-64 fixed on the left) */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-6 justify-between select-none shrink-0 z-20">
        <div className="flex flex-col">
          {/* Brand Logo */}
          <div 
            onClick={() => {
              sounds.playClick();
              onSelectTab('trilhas');
            }}
            className="flex items-center gap-3 px-3 mb-6 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-xl shadow-xs">
              🚦
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              dirig<span className="text-amber-500">go</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map(item => {
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectTab(item.id);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-black shadow-xs'
                      : 'border-transparent text-slate-600 dark:text-slate-400 font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13px] tracking-wide uppercase font-black">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Controls */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-800 space-y-3">
          {/* CNH Mini Status Indicator */}
          <div 
            onClick={() => {
              sounds.playClick();
              onSelectTab('perfil');
            }}
            className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl cursor-pointer hover:bg-emerald-100/60 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-black text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1.5">
                <span>🪪 CNH</span>
                <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900 px-1.5 py-0.5 rounded font-black">CAT B</span>
              </span>
              <span>{profile.cnhPoints}/20 pts</span>
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  profile.cnhPoints >= 16 ? 'bg-rose-500' : profile.cnhPoints >= 10 ? 'bg-amber-500' : 'bg-emerald-600'
                }`}
                style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
              />
            </div>
          </div>

          {/* Quick controls: Dark Mode, Sound & Home */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Alternar Modo Escuro"
            >
              {profile.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={onToggleSound}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Alternar Efeitos Sonoros"
            >
              {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onGoLanding();
              }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Página Inicial"
            >
              <Home className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around select-none">
        {navItems.map(item => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playClick();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-black'
                  : 'text-slate-500 dark:text-slate-400 font-bold'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-amber-100 dark:bg-amber-950/60' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] uppercase tracking-wider mt-0.5">
                {item.label === 'MATERIAL DE APOIO' ? 'MATERIAL' : item.label === 'MINHA CNH' ? 'CNH' : item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
