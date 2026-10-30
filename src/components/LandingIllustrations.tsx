import React from 'react';

/**
 * Mascot "Farolito" - Cute rounded Duolingo-style character with driver cap and big expressive eyes
 */
export const MascotFarolito: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={`drop-shadow-lg ${className}`}>
      {/* Body shadow */}
      <ellipse cx="60" cy="112" rx="35" ry="6" fill="#000000" opacity="0.15" />

      {/* Main Round Body (Vibrant Traffic Yellow) */}
      <path
        d="M 25 65 C 25 35, 95 35, 95 65 C 95 98, 25 98, 25 65 Z"
        fill="#FFC800"
        stroke="#E0A800"
        strokeWidth="3.5"
      />

      {/* Belly Patch (Pale cream) */}
      <ellipse cx="60" cy="72" rx="22" ry="20" fill="#FEF9C3" />

      {/* Driver Cap / Boné de Autoescola */}
      <path d="M 28 42 Q 60 25 92 42 Q 60 35 28 42 Z" fill="#1E3A8A" />
      <path d="M 38 40 Q 60 18 82 40 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
      <circle cx="60" cy="24" r="3" fill="#FACC15" />
      {/* Cap Visor */}
      <path d="M 25 42 Q 60 36 95 42 Q 105 48 85 49 Q 60 45 25 42 Z" fill="#1E3A8A" />

      {/* Big Duolingo Eyes */}
      {/* Left Eye */}
      <circle cx="46" cy="56" r="13" fill="#FFFFFF" stroke="#E0A800" strokeWidth="2" />
      <circle cx="48" cy="56" r="7.5" fill="#18181B" />
      <circle cx="51" cy="53" r="2.5" fill="#FFFFFF" />

      {/* Right Eye */}
      <circle cx="74" cy="56" r="13" fill="#FFFFFF" stroke="#E0A800" strokeWidth="2" />
      <circle cx="72" cy="56" r="7.5" fill="#18181B" />
      <circle cx="75" cy="53" r="2.5" fill="#FFFFFF" />

      {/* Beak / Smiling Mouth */}
      <path d="M 52 64 Q 60 74 68 64 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />

      {/* Little Wings (Left waving) */}
      <path d="M 26 62 Q 10 50 16 70 Q 24 72 26 62 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
      <path d="M 94 62 Q 108 72 102 78 Q 94 74 94 62 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />

      {/* Little Orange Feet */}
      <ellipse cx="48" cy="100" rx="8" ry="4" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
      <ellipse cx="72" cy="100" rx="8" ry="4" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
    </svg>
  );
};

export const HeroTrafficWorldIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[440px] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 460 400" className="w-full drop-shadow-2xl">
        {/* Soft atmospheric halo */}
        <circle cx="230" cy="220" r="170" fill="#FEF08A" opacity="0.3" />
        <circle cx="230" cy="220" r="130" fill="#FDE047" opacity="0.25" />

        {/* The Round Road / Globe */}
        <circle cx="230" cy="260" r="125" fill="#334155" stroke="#1E293B" strokeWidth="10" />
        {/* Dashed Road Markings */}
        <circle
          cx="230"
          cy="260"
          r="125"
          fill="none"
          stroke="#FACC15"
          strokeWidth="7"
          strokeDasharray="18 18"
          className="animate-spin origin-[230px_260px] duration-[24000ms]"
        />

        {/* Traffic Light on Left */}
        <g transform="translate(85, 90)">
          <rect x="22" y="80" width="8" height="110" fill="#64748B" rx="2" />
          <rect x="10" y="0" width="32" height="84" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          <circle cx="26" cy="18" r="9" fill="#EF4444" opacity="0.3" />
          <circle cx="26" cy="42" r="9" fill="#F59E0B" opacity="0.3" />
          <circle cx="26" cy="66" r="10" fill="#22C55E" className="animate-pulse drop-shadow-md" />
          <circle cx="26" cy="66" r="4" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* Road Sign PARE on Right */}
        <g transform="translate(345, 90)">
          <rect x="23" y="65" width="6" height="100" fill="#64748B" rx="2" />
          <polygon points="18,10 34,10 46,22 46,38 34,50 18,50 6,38 6,22" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
          <text x="26" y="34" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            PARE
          </text>
        </g>

        {/* Cute Yellow Autoescola Car */}
        <g transform="translate(160, 95)" className="animate-bounce duration-[2500ms]">
          <ellipse cx="65" cy="72" rx="55" ry="7" fill="#000000" opacity="0.25" />

          {/* Roof Plaque */}
          <rect x="45" y="4" width="40" height="15" rx="3" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
          <text x="65" y="15" fill="#18181B" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            DIRIGGO
          </text>
          <rect x="63" y="19" width="4" height="4" fill="#64748B" />

          {/* Car Body */}
          <path
            d="M 18 54 L 32 28 L 60 22 L 95 22 L 115 36 L 130 48 L 130 62 L 12 62 Z"
            fill="#FFC800"
            stroke="#CA8A04"
            strokeWidth="3.5"
          />

          {/* Windows */}
          <path d="M 38 30 L 60 26 L 60 46 L 28 46 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <path d="M 68 26 L 94 26 L 110 38 L 110 46 L 68 46 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />

          {/* Headlights */}
          <rect x="126" y="50" width="5" height="10" rx="2" fill="#FEF08A" />
          <polygon points="130,52 175,38 175,70 130,58" fill="#FEF08A" opacity="0.4" />
          <rect x="10" y="51" width="4" height="8" rx="1" fill="#EF4444" />

          {/* Wheels */}
          <g transform="translate(36, 62)">
            <circle cx="0" cy="0" r="15" fill="#18181B" stroke="#52525B" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#E4E4E7" />
            <circle cx="0" cy="0" r="3" fill="#CA8A04" />
          </g>
          <g transform="translate(108, 62)">
            <circle cx="0" cy="0" r="15" fill="#18181B" stroke="#52525B" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#E4E4E7" />
            <circle cx="0" cy="0" r="3" fill="#CA8A04" />
          </g>
        </g>

        {/* Decorative Sparkles */}
        <path d="M 120 60 L 123 68 L 131 71 L 123 74 L 120 82 L 117 74 L 109 71 L 117 68 Z" fill="#F59E0B" />
        <path d="M 370 210 L 372 216 L 378 218 L 372 220 L 370 226 L 368 220 L 362 218 L 368 216 Z" fill="#22C55E" />
      </svg>
    </div>
  );
};

export const GamificationIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[390px] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 420 340" className="w-full drop-shadow-xl">
        <rect x="15" y="15" width="390" height="310" rx="36" fill="#FEF9C3" opacity="0.6" />

        {/* Giant Golden Cup */}
        <g transform="translate(150, 60)">
          <rect x="35" y="160" width="50" height="16" rx="4" fill="#78350F" />
          <rect x="45" y="140" width="30" height="20" fill="#92400E" />
          <path d="M 40 140 L 80 140 L 72 100 L 48 100 Z" fill="#D97706" />
          <path d="M 20 20 L 100 20 L 90 90 L 30 90 Z" fill="#FFC800" stroke="#CA8A04" strokeWidth="4" />
          <path d="M 20 30 Q -10 55 24 75" fill="none" stroke="#CA8A04" strokeWidth="5" strokeLinecap="round" />
          <path d="M 100 30 Q 130 55 96 75" fill="none" stroke="#CA8A04" strokeWidth="5" strokeLinecap="round" />
          <polygon points="60,35 64,48 78,48 67,56 71,70 60,61 49,70 53,56 42,48 56,48" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* Floating Streak Badge */}
        <g transform="translate(35, 75)">
          <rect x="0" y="0" width="95" height="58" rx="18" fill="#FFFFFF" stroke="#FDBA74" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="47" y="26" fill="#EA580C" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">🔥 14</text>
          <text x="47" y="46" fill="#9A3412" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">OFENSIVA</text>
        </g>

        {/* Floating XP Lightning Badge */}
        <g transform="translate(290, 85)">
          <rect x="0" y="0" width="85" height="52" rx="16" fill="#FFFFFF" stroke="#FDE047" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="42" y="26" fill="#CA8A04" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">⚡ +50</text>
          <text x="42" y="44" fill="#854D0E" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">XP GANHO</text>
        </g>

        {/* Floating CNH Carteira Badge */}
        <g transform="translate(270, 205)">
          <rect x="0" y="0" width="115" height="65" rx="18" fill="#047857" stroke="#065F46" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <rect x="10" y="10" width="26" height="32" rx="4" fill="#A7F3D0" />
          <text x="44" y="26" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">CNH A/B</text>
          <text x="44" y="44" fill="#ECFDF5" fontSize="12" fontWeight="900" fontFamily="sans-serif">0 PONTOS</text>
          <circle cx="100" cy="50" r="5" fill="#10B981" />
        </g>
      </svg>
    </div>
  );
};

export const RoadMapIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[390px] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 420 340" className="w-full drop-shadow-xl">
        <rect x="15" y="15" width="390" height="310" rx="36" fill="#F0FDF4" opacity="0.8" />

        {/* Winding Asphalt Path */}
        <path
          d="M 90 280 Q 210 260 210 180 Q 210 100 320 80"
          fill="none"
          stroke="#475569"
          strokeWidth="38"
          strokeLinecap="round"
        />
        {/* Dashed Center Strip */}
        <path
          d="M 90 280 Q 210 260 210 180 Q 210 100 320 80"
          fill="none"
          stroke="#FACC15"
          strokeWidth="6"
          strokeDasharray="12 12"
          strokeLinecap="round"
        />

        {/* Node 1 - Completed (Green with Check) */}
        <g transform="translate(90, 280)">
          <circle cx="0" cy="0" r="26" fill="#22C55E" stroke="#15803D" strokeWidth="4" />
          <path d="M -9 0 L -3 8 L 11 -7" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="0" y="42" fill="#166534" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Lição 1</text>
        </g>

        {/* Node 2 - Current Active (Yellow Pulsing with Crown) */}
        <g transform="translate(210, 180)">
          <circle cx="0" cy="0" r="32" fill="#FEF08A" opacity="0.6" className="animate-ping" />
          <circle cx="0" cy="0" r="28" fill="#FFC800" stroke="#CA8A04" strokeWidth="4" />
          <polygon points="-8,-14 -2,-6 0,-17 2,-6 8,-14 6,4 -6,4" fill="#78350F" />
          <text x="0" y="45" fill="#854D0E" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Você está aqui</text>
        </g>

        {/* Node 3 - Locked (Slate with Lock) */}
        <g transform="translate(320, 80)">
          <circle cx="0" cy="0" r="24" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
          <rect x="-7" y="-3" width="14" height="12" rx="2" fill="#64748B" />
          <path d="M -5 -3 L -5 -8 Q 0 -13 5 -8 L 5 -3" fill="none" stroke="#64748B" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

export const ExamCertificateIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[390px] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 420 340" className="w-full drop-shadow-xl">
        {/* Background Frame */}
        <rect x="40" y="20" width="340" height="300" rx="30" fill="#0F172A" stroke="#334155" strokeWidth="4" />
        <rect x="55" y="40" width="310" height="260" rx="20" fill="#FFFFFF" />

        {/* Header Bar */}
        <rect x="55" y="40" width="310" height="44" rx="20" fill="#F8FAFC" />
        <text x="75" y="66" fill="#0F172A" fontSize="13" fontWeight="900" fontFamily="sans-serif">SIMULADO OFICIAL DETRAN</text>
        <rect x="280" y="52" width="72" height="22" rx="8" fill="#FEF3C7" stroke="#FDE047" />
        <text x="316" y="67" fill="#92400E" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">⏱️ 38:12</text>

        {/* Question Mock */}
        <rect x="75" y="105" width="190" height="10" rx="3" fill="#E2E8F0" />
        <rect x="75" y="122" width="240" height="8" rx="2" fill="#F1F5F9" />
        <rect x="75" y="136" width="180" height="8" rx="2" fill="#F1F5F9" />

        {/* Options */}
        <rect x="75" y="156" width="270" height="26" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="75" y="188" width="270" height="26" rx="8" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
        <text x="92" y="205" fill="#15803D" fontSize="11" fontWeight="800" fontFamily="sans-serif">✓ Alternativa B (Correta - Art. 208)</text>

        {/* Green Stamp APROVADO */}
        <g transform="translate(195, 205) rotate(-10)">
          <rect x="0" y="0" width="155" height="60" rx="12" fill="#F0FDF4" stroke="#16A34A" strokeWidth="4" strokeDasharray="5 3" />
          <text x="77" y="28" fill="#16A34A" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">APROVADO!</text>
          <text x="77" y="48" fill="#15803D" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">28 / 30 ACERTOS (93%)</text>
        </g>
      </svg>
    </div>
  );
};
