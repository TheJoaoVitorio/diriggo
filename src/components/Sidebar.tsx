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
      label: 'APRENDER',
      icon: <Home className="w-6 h-6 shrink-0" />,
      desc: 'Trilha principal'
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
      desc: 'Catálogo oficial'
    },
    {
      id: 'material' as AppTab,
      label: 'MATERIAL',
      icon: <BookOpen className="w-6 h-6 shrink-0" />,
      desc: 'Resumos didáticos'
    },
    {
      id: 'perfil' as AppTab,
      label: 'PERFIL',
      icon: <CreditCard className="w-6 h-6 shrink-0" />,
      desc: 'Minha CNH'
    }
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (w-64 fixed on the left, Duolingo Style) */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r-2 border-[#e5e5e5] dark:border-[#202f36] bg-white dark:bg-[#131f24] px-4 py-6 justify-between select-none shrink-0 z-20">
        <div className="flex flex-col">
          {/* Brand Logo - Duolingo Green Style */}
          <div 
            onClick={() => {
              sounds.playClick();
              onSelectTab('trilhas');
            }}
            className="flex items-center gap-3 px-3 mb-8 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] flex items-center justify-center text-xl shadow-xs">
              🚦
            </div>
            <span className="text-2xl font-black tracking-tight text-[#58cc02] lowercase font-sans">
              diriggo
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
                      ? 'bg-[#e6f7ff] dark:bg-[#182631] border-[#1cb0f6] text-[#1cb0f6] font-black shadow-xs'
                      : 'border-transparent text-[#777777] dark:text-[#8b9ea7] font-black hover:bg-slate-100 dark:hover:bg-[#182228] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#1cb0f6]' : 'text-[#777777] dark:text-[#8b9ea7]'}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13px] tracking-widest uppercase font-black">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-[#52656d]">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Controls */}
        <div className="pt-4 border-t-2 border-[#e5e5e5] dark:border-[#202f36] space-y-3">
          {/* CNH Mini Status Indicator */}
          <div 
            onClick={() => {
              sounds.playClick();
              onSelectTab('perfil');
            }}
            className="p-3 bg-emerald-50 dark:bg-[#182631] border border-emerald-200 dark:border-[#202f36] rounded-2xl cursor-pointer hover:bg-emerald-100/60 dark:hover:bg-[#203240] transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-black text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1.5">
                <span>🪪 CNH</span>
                <span className="text-[10px] bg-emerald-200 dark:bg-emerald-950 px-1.5 py-0.5 rounded font-black">CAT B</span>
              </span>
              <span>{profile.cnhPoints}/20 pts</span>
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-950 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  profile.cnhPoints >= 16 ? 'bg-rose-500' : profile.cnhPoints >= 10 ? 'bg-amber-500' : 'bg-[#58cc02]'
                }`}
                style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
              />
            </div>
          </div>

          {/* Quick Controls: Dark Mode, Sound & Home */}
          <div className="flex items-center justify-between px-2 pt-1">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-600 dark:text-[#8b9ea7] cursor-pointer transition-colors"
              title={profile.darkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
              {profile.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={onToggleSound}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-600 dark:text-[#8b9ea7] cursor-pointer transition-colors"
              title={profile.soundEnabled ? "Desativar Sons" : "Ativar Sons"}
            >
              {profile.soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>

            <button
              onClick={onGoLanding}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-600 dark:text-[#8b9ea7] cursor-pointer transition-colors"
              title="Voltar para a Apresentação"
            >
              <Compass className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#131f24] border-t-2 border-[#e5e5e5] dark:border-[#202f36] flex items-center justify-around px-2 z-40 select-none">
        {navItems.map(item => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playClick();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer ${
                isActive 
                  ? 'text-[#1cb0f6]' 
                  : 'text-[#777777] dark:text-[#8b9ea7] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-black uppercase mt-0.5 tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
