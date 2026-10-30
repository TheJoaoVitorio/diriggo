import React from 'react';

export const HeroTrafficWorldIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 500 420" className={`w-full max-w-[460px] drop-shadow-2xl ${className}`}>
      {/* Background soft ambient halo */}
      <circle cx="250" cy="230" r="170" fill="#FEF08A" opacity="0.4" />
      <circle cx="250" cy="230" r="140" fill="#FDE047" opacity="0.3" />

      {/* Stylized Planet/Round Road Loop */}
      <circle cx="250" cy="270" r="120" fill="#334155" stroke="#1E293B" strokeWidth="8" />
      {/* Dashed Road Markings */}
      <circle
        cx="250"
        cy="270"
        r="120"
        fill="none"
        stroke="#FACC15"
        strokeWidth="6"
        strokeDasharray="16 16"
        className="animate-spin origin-[250px_270px] duration-[16000ms]"
      />

      {/* Traffic Light on Left */}
      <g transform="translate(110, 110)">
        {/* Post */}
        <rect x="22" y="80" width="8" height="90" fill="#64748B" rx="2" />
        {/* Box */}
        <rect x="10" y="0" width="32" height="84" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="3" />
        {/* Lights */}
        <circle cx="26" cy="18" r="9" fill="#EF4444" opacity="0.4" />
        <circle cx="26" cy="42" r="9" fill="#F59E0B" opacity="0.4" />
        <circle cx="26" cy="66" r="10" fill="#22C55E" className="animate-pulse drop-shadow-md" />
        <circle cx="26" cy="66" r="4" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Road Sign PARE on Right */}
      <g transform="translate(340, 100)">
        {/* Post */}
        <rect x="23" y="65" width="6" height="90" fill="#64748B" rx="2" />
        {/* Octagon PARE */}
        <polygon points="18,10 34,10 46,22 46,38 34,50 18,50 6,38 6,22" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
        <text x="26" y="34" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          PARE
        </text>
      </g>

      {/* Speed Sign 60 km/h floating */}
      <g transform="translate(320, 260)">
        <rect x="18" y="38" width="5" height="50" fill="#64748B" rx="2" />
        <circle cx="20" cy="20" r="18" fill="#FFFFFF" stroke="#DC2626" strokeWidth="4" />
        <text x="20" y="22" fill="#0F172A" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">60</text>
        <text x="20" y="30" fill="#0F172A" fontSize="5" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">km/h</text>
      </g>

      {/* Cartoon Car Riding on Top of the Road (Yellow Autoescola Car) */}
      <g transform="translate(195, 100)" className="animate-bounce duration-[2000ms]">
        {/* Ground Shadow */}
        <ellipse cx="60" cy="68" rx="50" ry="6" fill="#000000" opacity="0.25" />

        {/* Roof Autoescola Plaque */}
        <rect x="42" y="2" width="36" height="13" rx="3" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="60" y="11" fill="#18181B" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          DIRIGGO
        </text>
        <rect x="58" y="15" width="4" height="4" fill="#64748B" />

        {/* Car Body */}
        <path
          d="M 15 50 L 30 26 L 55 20 L 85 20 L 105 32 L 120 44 L 120 58 L 10 58 Z"
          fill="#FFC800"
          stroke="#CA8A04"
          strokeWidth="3"
        />

        {/* Windows */}
        <path d="M 35 28 L 55 24 L 55 42 L 25 42 Z" fill="#93C5FD" stroke="#1E40AF" strokeWidth="1.5" />
        <path d="M 62 24 L 84 24 L 100 34 L 100 42 L 62 42 Z" fill="#93C5FD" stroke="#1E40AF" strokeWidth="1.5" />

        {/* Headlight beam */}
        <polygon points="120,48 160,35 160,65 120,54" fill="#FEF08A" opacity="0.5" />
        <rect x="116" y="46" width="5" height="9" rx="2" fill="#FEF08A" />
        <rect x="8" y="47" width="4" height="7" rx="1" fill="#EF4444" />

        {/* Wheels */}
        <g transform="translate(32, 58)">
          <circle cx="0" cy="0" r="14" fill="#18181B" stroke="#52525B" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="7" fill="#E4E4E7" />
          <circle cx="0" cy="0" r="2.5" fill="#CA8A04" />
        </g>
        <g transform="translate(98, 58)">
          <circle cx="0" cy="0" r="14" fill="#18181B" stroke="#52525B" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="7" fill="#E4E4E7" />
          <circle cx="0" cy="0" r="2.5" fill="#CA8A04" />
        </g>
      </g>

      {/* Floating Sparkles and Stars */}
      <path d="M 120 70 L 123 78 L 131 81 L 123 84 L 120 92 L 117 84 L 109 81 L 117 78 Z" fill="#F59E0B" />
      <path d="M 370 200 L 372 206 L 378 208 L 372 210 L 370 216 L 368 210 L 362 208 L 368 206 Z" fill="#22C55E" />
      <path d="M 180 340 L 182 345 L 187 347 L 182 349 L 180 354 L 178 349 L 173 347 L 178 345 Z" fill="#3B82F6" />
    </svg>
  );
};

export const GamificationIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 420 340" className={`w-full max-w-[400px] drop-shadow-xl ${className}`}>
      {/* Background circle badge */}
      <rect x="20" y="20" width="380" height="300" rx="40" fill="#FEF3C7" opacity="0.7" />

      {/* Giant Golden Trophy in Center */}
      <g transform="translate(150, 60)">
        {/* Base */}
        <rect x="35" y="160" width="50" height="16" rx="4" fill="#78350F" />
        <rect x="45" y="140" width="30" height="20" fill="#92400E" />
        <path d="M 40 140 L 80 140 L 72 100 L 48 100 Z" fill="#D97706" />
        
        {/* Cup */}
        <path d="M 20 20 L 100 20 L 90 90 L 30 90 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
        {/* Handles */}
        <path d="M 20 30 Q -10 55 24 75" fill="none" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
        <path d="M 100 30 Q 130 55 96 75" fill="none" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
        
        {/* Star in cup */}
        <polygon points="60,35 64,48 78,48 67,56 71,70 60,61 49,70 53,56 42,48 56,48" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Floating Streak Flame Badge */}
      <g transform="translate(40, 70)">
        <rect x="0" y="0" width="90" height="56" rx="18" fill="#FFFFFF" stroke="#FDBA74" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
        <text x="45" y="24" fill="#EA580C" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">🔥 14</text>
        <text x="45" y="44" fill="#9A3412" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">DIAS SEGUIDOS</text>
      </g>

      {/* Floating CNH Carteira Badge */}
      <g transform="translate(280, 190)">
        <rect x="0" y="0" width="105" height="60" rx="16" fill="#047857" stroke="#065F46" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
        <rect x="10" y="10" width="24" height="28" rx="4" fill="#A7F3D0" />
        <text x="42" y="24" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">CNH A/B</text>
        <text x="42" y="40" fill="#ECFDF5" fontSize="11" fontWeight="900" fontFamily="sans-serif">0 PONTOS</text>
        <circle cx="90" cy="48" r="5" fill="#10B981" />
      </g>

      {/* Floating XP Lightning Badge */}
      <g transform="translate(50, 210)">
        <rect x="0" y="0" width="85" height="50" rx="16" fill="#FFFFFF" stroke="#FDE047" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
        <text x="42" y="26" fill="#CA8A04" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">⚡ +50</text>
        <text x="42" y="42" fill="#854D0E" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">XP GANHO</text>
      </g>
    </svg>
  );
};

export const RoadMapIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 420 340" className={`w-full max-w-[400px] drop-shadow-xl ${className}`}>
      {/* Background Card */}
      <rect x="20" y="20" width="380" height="300" rx="40" fill="#F0FDF4" opacity="0.8" />

      {/* Winding Asphalt Path */}
      <path
        d="M 90 280 Q 210 260 210 180 Q 210 100 320 80"
        fill="none"
        stroke="#475569"
        strokeWidth="36"
        strokeLinecap="round"
      />
      {/* Dashed Center Strip */}
      <path
        d="M 90 280 Q 210 260 210 180 Q 210 100 320 80"
        fill="none"
        stroke="#FACC15"
        strokeWidth="5"
        strokeDasharray="10 10"
        strokeLinecap="round"
      />

      {/* Node 1 - Completed (Green with Check) */}
      <g transform="translate(90, 280)">
        <circle cx="0" cy="0" r="24" fill="#22C55E" stroke="#15803D" strokeWidth="4" />
        <path d="M -8 0 L -2 7 L 10 -6" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="0" y="38" fill="#166534" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Lição 1</text>
      </g>

      {/* Node 2 - Current Active (Yellow Pulsing) */}
      <g transform="translate(210, 180)">
        <circle cx="0" cy="0" r="30" fill="#FEF08A" opacity="0.5" className="animate-ping" />
        <circle cx="0" cy="0" r="26" fill="#FFC800" stroke="#CA8A04" strokeWidth="4" />
        {/* Crown on top */}
        <polygon points="-8,-12 -2,-4 0,-15 2,-4 8,-12 6,4 -6,4" fill="#78350F" />
        <text x="0" y="42" fill="#854D0E" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Você está aqui</text>
      </g>

      {/* Node 3 - Locked (Slate with Lock) */}
      <g transform="translate(320, 80)">
        <circle cx="0" cy="0" r="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
        <rect x="-6" y="-3" width="12" height="10" rx="2" fill="#64748B" />
        <path d="M -4 -3 L -4 -7 Q 0 -11 4 -7 L 4 -3" fill="none" stroke="#64748B" strokeWidth="2.5" />
      </g>
    </svg>
  );
};

export const ExamCertificateIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 420 340" className={`w-full max-w-[400px] drop-shadow-xl ${className}`}>
      {/* Background Tablet Frame */}
      <rect x="50" y="25" width="320" height="290" rx="28" fill="#0F172A" stroke="#334155" strokeWidth="4" />
      
      {/* Tablet Screen */}
      <rect x="65" y="45" width="290" height="250" rx="18" fill="#FFFFFF" />

      {/* Header Bar */}
      <rect x="65" y="45" width="290" height="40" rx="18" fill="#F8FAFC" />
      <text x="85" y="68" fill="#0F172A" fontSize="12" fontWeight="900" fontFamily="sans-serif">SIMULADO OFICIAL DETRAN</text>
      <rect x="270" y="55" width="70" height="20" rx="8" fill="#FEF3C7" stroke="#FDE047" />
      <text x="305" y="69" fill="#92400E" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">⏱️ 38:12</text>

      {/* Question lines mock */}
      <rect x="85" y="105" width="180" height="10" rx="3" fill="#E2E8F0" />
      <rect x="85" y="122" width="220" height="8" rx="2" fill="#F1F5F9" />
      <rect x="85" y="136" width="160" height="8" rx="2" fill="#F1F5F9" />

      {/* Options mock */}
      <rect x="85" y="156" width="250" height="24" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <rect x="85" y="186" width="250" height="24" rx="8" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
      <text x="100" y="202" fill="#15803D" fontSize="10" fontWeight="800" fontFamily="sans-serif">✓ Alternativa B (Correta - Art. 208)</text>

      {/* Huge Official Green Approved Stamp */}
      <g transform="translate(190, 195) rotate(-12)">
        <rect x="0" y="0" width="145" height="55" rx="10" fill="none" stroke="#16A34A" strokeWidth="4" strokeDasharray="4 2" />
        <text x="72" y="26" fill="#16A34A" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">APROVADO!</text>
        <text x="72" y="44" fill="#15803D" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">28 / 30 ACERTOS (93%)</text>
      </g>
    </svg>
  );
};
