import React, { useState } from 'react';
import { 
  Compass, 
  FileCheck2, 
  ShieldAlert, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AppTab, UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface SidebarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  profile: UserProfile;
  onToggleSound: () => void;
  onGoLanding: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const GoogleIcon = () => (
  <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24">
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
);

const getInitials = (name?: string) => {
  if (!name || !name.trim()) return 'CD';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  onToggleSound,
  onGoLanding,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [avatarError, setAvatarError] = useState(false);

  const renderAvatar = (size = 'w-7 h-7') => {
    if (profile.photoURL && !avatarError) {
      return (
        <img
          src={profile.photoURL}
          alt={profile.name || 'Avatar'}
          referrerPolicy="no-referrer"
          onError={() => setAvatarError(true)}
          className={`${size} rounded-full object-cover border border-[#CA8A04] shrink-0`}
        />
      );
    }
    return (
      <div className={`${size} rounded-full bg-[#FFC800] text-slate-950 font-black text-[10px] flex items-center justify-center border border-[#CA8A04] shrink-0`}>
        {getInitials(profile.name)}
      </div>
    );
  };

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
      icon: (
        <div className="relative">
          {renderAvatar('w-6 h-6')}
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-xs">
            <GoogleIcon />
          </div>
        </div>
      ),
      desc: 'Minha CNH'
    }
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (w-64 expanded or w-20 collapsed, Diriggo Yellow Branding) */}
      <aside 
        className={`hidden md:flex flex-col h-screen sticky top-0 border-r-2 border-[#e5e5e5] dark:border-[#202f36] bg-white dark:bg-[#131f24] py-6 justify-between select-none shrink-0 z-20 transition-all duration-300 ${
          isCollapsed ? 'w-20 px-2 items-center' : 'w-64 px-4'
        }`}
      >
        <div className="flex flex-col w-full">
          {/* Brand Header */}
          {isCollapsed ? (
            <div className="flex flex-col items-center mb-6 gap-2">
              <div 
                onClick={() => {
                  sounds.playClick();
                  onSelectTab('trilhas');
                }}
                className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-xl shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
                title="Diriggo - Início"
              >
                🚦
              </div>
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
                  title="Expandir menu lateral"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between px-2 mb-8">
              <div 
                onClick={() => {
                  sounds.playClick();
                  onSelectTab('trilhas');
                }}
                className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-xl shadow-xs">
                  🚦
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white lowercase font-sans">
                  diriggo
                </span>
              </div>

              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
                  title="Recolher menu lateral"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2 w-full">
            {navItems.map(item => {
              const isActive = currentTab === item.id;

              if (isCollapsed) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectTab(item.id);
                    }}
                    title={`${item.label}: ${item.desc}`}
                    className={`w-12 h-12 mx-auto flex items-center justify-center rounded-2xl border-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#e6f7ff] dark:bg-[#182631] border-[#1cb0f6] text-[#1cb0f6] shadow-xs'
                        : 'border-transparent text-[#777777] dark:text-[#8b9ea7] hover:bg-slate-100 dark:hover:bg-[#182228] hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-[#1cb0f6]' : 'text-[#777777] dark:text-[#8b9ea7]'}>
                      {item.icon}
                    </span>
                  </button>
                );
              }

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
        <div className="pt-4 border-t-2 border-[#e5e5e5] dark:border-[#202f36] space-y-3 w-full">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              {/* Collapsed Profile Icon */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  onSelectTab('perfil');
                }}
                className={`p-1.5 rounded-2xl border transition-all cursor-pointer ${
                  currentTab === 'perfil'
                    ? 'border-[#FFC800] bg-amber-50 dark:bg-[#182631]'
                    : 'border-transparent hover:bg-slate-100 dark:hover:bg-[#182228]'
                }`}
                title={`Perfil: ${profile.name || 'Futuro Condutor'}`}
              >
                {renderAvatar('w-8 h-8')}
              </div>

              {/* Collapsed CNH Pill */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  onSelectTab('perfil');
                }}
                className="w-11 py-1 rounded-xl bg-amber-50 dark:bg-[#182631] border border-amber-300 dark:border-[#202f36] flex flex-col items-center justify-center cursor-pointer"
                title={`CNH: ${profile.cnhPoints}/20 pts`}
              >
                <span className="text-[10px]">🪪</span>
                <span className="text-[9px] font-black text-amber-900 dark:text-amber-400">{profile.cnhPoints}p</span>
              </div>

              {/* Collapsed Action Buttons */}

              <button
                onClick={onToggleSound}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-600 dark:text-[#8b9ea7] cursor-pointer"
                title={profile.soundEnabled ? "Desativar Sons" : "Ativar Sons"}
              >
                {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                onClick={onGoLanding}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182228] text-slate-600 dark:text-[#8b9ea7] cursor-pointer"
                title="Voltar para a Apresentação"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* User Profile Mini Card with Google Avatar */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  onSelectTab('perfil');
                }}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  currentTab === 'perfil'
                    ? 'bg-amber-50/70 dark:bg-[#182631] border-[#FFC800] dark:border-[#CA8A04] shadow-xs'
                    : 'border-slate-200 dark:border-[#202f36] hover:bg-slate-100 dark:hover:bg-[#182228]'
                }`}
              >
                <div className="relative shrink-0">
                  {renderAvatar('w-9 h-9')}
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-sm border border-slate-200 dark:border-slate-700">
                    <GoogleIcon />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                    {profile.name || 'Futuro Condutor'}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <span>Google</span>
                    <span>•</span>
                    <span className="text-emerald-500">Sincronizado</span>
                  </div>
                </div>
              </div>

              {/* CNH Mini Status Indicator */}
              <div 
                onClick={() => {
                  sounds.playClick();
                  onSelectTab('perfil');
                }}
                className="p-3 bg-amber-50/50 dark:bg-[#182631] border border-amber-200/80 dark:border-[#202f36] rounded-2xl cursor-pointer hover:bg-amber-100/50 dark:hover:bg-[#203240] transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-black text-amber-900 dark:text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <span>🪪 CNH</span>
                    <span className="text-[10px] bg-amber-200 dark:bg-amber-950 px-1.5 py-0.5 rounded font-black text-amber-950 dark:text-amber-300">CAT B</span>
                  </span>
                  <span>{profile.cnhPoints}/20 pts</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-[#141d23] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      profile.cnhPoints >= 16 ? 'bg-rose-500' : profile.cnhPoints >= 10 ? 'bg-amber-500' : 'bg-[#FFC800]'
                    }`}
                    style={{ width: `${Math.min(100, (profile.cnhPoints / 20) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Quick Controls: Dark Mode, Sound & Home */}
              <div className="flex items-center justify-between px-2 pt-1">


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
            </>
          )}
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
