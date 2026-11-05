import React from 'react';

export type IllustrationType = 
  | 'motor-4-tempos'
  | 'radiador'
  | 'oleo-motor'
  | 'freios'
  | 'bateria'
  | 'pneu-twi'
  | 'luz-oleo'
  | 'luz-bateria'
  | 'luz-temperatura'
  | 'luz-injecao'
  | 'luz-freio-mao'
  | 'via-transito-rapido'
  | 'via-arterial'
  | 'via-coletora'
  | 'via-local'
  | 'cruzamento-direita'
  | 'rotatoria'
  | 'faixa-continua'
  | 'faixa-seccionada'
  | 'aquaplanagem';

interface VisualIllustrationProps {
  type: IllustrationType | string;
  size?: number | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  showCaption?: boolean;
}

export const VisualIllustration: React.FC<VisualIllustrationProps> = ({
  type,
  className = '',
  showCaption = false,
}) => {
  switch (type) {
    // ----------------------------------------------------
    // MECÂNICA BÁSICA: MOTOR 4 TEMPOS
    // ----------------------------------------------------
    case 'motor-4-tempos':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 320 220" className="w-full max-w-[320px] h-auto drop-shadow-md select-none">
            {/* Background block */}
            <rect x="10" y="10" width="300" height="200" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* 4 Cylinders representing the 4 stages */}
            {/* 1. Admissão */}
            <g transform="translate(20, 25)">
              <rect x="0" y="20" width="60" height="110" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              {/* Cylinder head & valve open */}
              <path d="M15,20 L15,35" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="15" cy="35" r="4" fill="#38bdf8" />
              {/* Air/fuel mix flowing in */}
              <path d="M5,10 Q15,10 15,30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" fill="none" />
              {/* Piston moving DOWN */}
              <rect x="4" y="65" width="52" height="35" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M30,100 L30,125" stroke="#cbd5e1" strokeWidth="4" />
              <path d="M30,80 L30,95 M25,90 L30,95 L35,90" stroke="#38bdf8" strokeWidth="2" fill="none" />
              <text x="30" y="150" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">1. ADMISSÃO</text>
              <text x="30" y="162" fill="#38bdf8" fontSize="8" textAnchor="middle">Pistão desce</text>
            </g>

            {/* 2. Compressão */}
            <g transform="translate(90, 25)">
              <rect x="0" y="20" width="60" height="110" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              {/* Both valves closed */}
              <path d="M15,20 L15,24" stroke="#94a3b8" strokeWidth="3" />
              <path d="M45,20 L45,24" stroke="#94a3b8" strokeWidth="3" />
              {/* Piston moving UP */}
              <rect x="4" y="38" width="52" height="35" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M30,73 L30,120" stroke="#cbd5e1" strokeWidth="4" />
              <path d="M30,60 L30,48 M25,53 L30,48 L35,53" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <text x="30" y="150" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">2. COMPRESSÃO</text>
              <text x="30" y="162" fill="#f59e0b" fontSize="8" textAnchor="middle">Válvulas fecham</text>
            </g>

            {/* 3. Combustão / Explosão */}
            <g transform="translate(160, 25)">
              <rect x="0" y="20" width="60" height="110" rx="6" fill="#0f172a" stroke="#e11d48" strokeWidth="2" />
              {/* Spark plug */}
              <rect x="26" y="12" width="8" height="12" fill="#e2e8f0" rx="2" />
              <circle cx="30" cy="28" r="7" fill="#fbbf24" opacity="0.8" />
              <polygon points="30,22 34,28 26,28 32,34 28,30" fill="#ef4444" />
              {/* Piston pushed down hard */}
              <rect x="4" y="55" width="52" height="35" rx="4" fill="#e11d48" stroke="#fca5a5" strokeWidth="1.5" />
              <path d="M30,90 L30,125" stroke="#cbd5e1" strokeWidth="4" />
              <text x="30" y="150" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">3. EXPLOSÃO</text>
              <text x="30" y="162" fill="#fbbf24" fontSize="8" textAnchor="middle">Centelha da vela</text>
            </g>

            {/* 4. Escape */}
            <g transform="translate(230, 25)">
              <rect x="0" y="20" width="60" height="110" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              {/* Exhaust valve open */}
              <path d="M45,20 L45,35" stroke="#94a3b8" strokeWidth="3" />
              <circle cx="45" cy="35" r="4" fill="#94a3b8" />
              {/* Exhaust gases flowing out */}
              <path d="M45,30 Q45,10 55,10" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,2" fill="none" />
              {/* Piston moving UP pushing gas */}
              <rect x="4" y="42" width="52" height="35" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M30,77 L30,120" stroke="#cbd5e1" strokeWidth="4" />
              <text x="30" y="150" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">4. ESCAPE</text>
              <text x="30" y="162" fill="#94a3b8" fontSize="8" textAnchor="middle">Expele os gases</text>
            </g>

            {/* Title / Badge */}
            <rect x="75" y="185" width="170" height="20" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <text x="160" y="199" fill="#f1f5f9" fontSize="10" fontWeight="bold" textAnchor="middle">CICLO OTTO DO MOTOR</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Ciclo de 4 Tempos: Admissão, Compressão, Combustão (Gera Potência) e Escape.
            </p>
          )}
        </div>
      );

    // ----------------------------------------------------
    // MECÂNICA: RADIADOR & ARREFECIMENTO
    // ----------------------------------------------------
    case 'radiador':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 190" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="170" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Radiator Body */}
            <rect x="35" y="40" width="130" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Grill fins */}
            {[...Array(9)].map((_, i) => (
              <line key={i} x1={45 + i * 13} y1="48" x2={45 + i * 13} y2="142" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4,2" />
            ))}
            
            {/* Electric Cooling Fan (Ventoinha) */}
            <circle cx="100" cy="95" r="32" fill="#1e293b" stroke="#64748b" strokeWidth="2" strokeDasharray="6,3" />
            <circle cx="100" cy="95" r="8" fill="#f59e0b" />
            {/* Fan blades */}
            <path d="M100,70 L100,95 M100,120 L100,95 M75,95 L100,95 M125,95 L100,95" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

            {/* Coolant Tank / Reservatório de Expansão */}
            <rect x="190" y="45" width="55" height="70" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            {/* Liquid inside tank */}
            <rect x="192" y="70" width="51" height="43" rx="6" fill="#0284c7" fillOpacity="0.4" />
            {/* Level lines MAX / MIN */}
            <line x1="195" y1="65" x2="210" y2="65" stroke="#ef4444" strokeWidth="1.5" />
            <text x="215" y="68" fill="#ef4444" fontSize="8" fontWeight="bold">MÁX</text>
            <line x1="195" y1="95" x2="210" y2="95" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="215" y="98" fill="#f59e0b" fontSize="8" fontWeight="bold">MÍN</text>
            
            {/* Cap */}
            <rect x="205" y="37" width="25" height="10" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            <text x="217" y="44" fill="#0f172a" fontSize="6" fontWeight="bold" textAnchor="middle">TAMPA</text>

            {/* Upper Hose (Hot coolant from engine) */}
            <path d="M140,55 C160,55 170,50 190,55" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            {/* Lower Hose (Cooled liquid to engine) */}
            <path d="M190,105 C170,110 160,135 140,135" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />

            {/* Labels */}
            <text x="100" y="165" fill="#f1f5f9" fontSize="10" fontWeight="black" textAnchor="middle">RADIADOR & VENTOINHA</text>
            <text x="218" y="130" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">RESERVATÓRIO</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Sistema de Arrefecimento: Radiador dissipa calor com água + aditivo etilenoglicol.
            </p>
          )}
        </div>
      );

    // ----------------------------------------------------
    // MECÂNICA: FREIOS A DISCO & ABS
    // ----------------------------------------------------
    case 'freios':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 190" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="170" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Disc Rotor */}
            <circle cx="130" cy="95" r="65" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="130" cy="95" r="45" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            
            {/* Rotor ventilation holes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 130 + 55 * Math.cos(rad);
              const cy = 95 + 55 * Math.sin(rad);
              return <circle key={i} cx={cx} cy={cy} r="3" fill="#0f172a" />;
            })}
            
            {/* Wheel Hub Center with 4 lug bolts */}
            <circle cx="130" cy="95" r="22" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="122" cy="87" r="3" fill="#e2e8f0" />
            <circle cx="138" cy="87" r="3" fill="#e2e8f0" />
            <circle cx="122" cy="103" r="3" fill="#e2e8f0" />
            <circle cx="138" cy="103" r="3" fill="#e2e8f0" />

            {/* Brake Caliper (Pinça Vermelha) */}
            <path d="M165,50 C185,65 185,115 165,130 L195,120 C205,100 205,75 195,60 Z" fill="#e11d48" stroke="#be123c" strokeWidth="2" />
            {/* Brake Pad inside caliper */}
            <rect x="160" y="70" width="8" height="40" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />

            {/* ABS Sensor badge */}
            <g transform="translate(195, 25)">
              <rect x="0" y="0" width="60" height="26" rx="6" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
              <text x="30" y="17" fill="#22c55e" fontSize="11" fontWeight="black" textAnchor="middle">ABS</text>
            </g>

            {/* Labels */}
            <text x="95" y="170" fill="#f1f5f9" fontSize="11" fontWeight="black" textAnchor="middle">DISCO & PASTILHA</text>
            <text x="225" y="95" fill="#f43f5e" fontSize="9" fontWeight="bold">PINÇA</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Freio a Disco com ABS: Evita o travamento das rodas e mantém dirigibilidade.
            </p>
          )}
        </div>
      );

    // ----------------------------------------------------
    // MECÂNICA: BATERIA & SISTEMA ELÉTRICO
    // ----------------------------------------------------
    case 'bateria':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 260 180" className="w-full max-w-[260px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="240" height="160" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Battery Box */}
            <rect x="40" y="55" width="180" height="95" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
            
            {/* Negative Terminal (-) Left */}
            <rect x="65" y="40" width="25" height="15" rx="3" fill="#64748b" stroke="#475569" strokeWidth="1" />
            <circle cx="77" cy="75" r="14" fill="#334155" />
            <line x1="71" y1="75" x2="83" y2="75" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />

            {/* Positive Terminal (+) Right */}
            <rect x="170" y="40" width="25" height="15" rx="3" fill="#e11d48" stroke="#991b1b" strokeWidth="1" />
            <circle cx="182" cy="75" r="14" fill="#e11d48" />
            <line x1="176" y1="75" x2="188" y2="75" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
            <line x1="182" y1="69" x2="182" y2="81" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />

            {/* Central Voltage & Energy Indicator */}
            <rect x="105" y="70" width="50" height="40" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
            <text x="130" y="90" fill="#facc15" fontSize="13" fontWeight="black" textAnchor="middle">12V</text>
            <text x="130" y="103" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">60Ah</text>

            {/* Alternator badge reminder */}
            <text x="130" y="135" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
              Recarregada pelo ALTERNADOR
            </text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Bateria de 12V: Armazena energia. Quem gera e recarrega é o ALTERNADOR!
            </p>
          )}
        </div>
      );

    // ----------------------------------------------------
    // MECÂNICA: PNEU & INDICADOR TWI (1,6 mm)
    // ----------------------------------------------------
    case 'pneu-twi':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 180" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="160" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Tire Tread Cross Section Profile */}
            <path d="M30,130 C30,70 50,45 140,45 C230,45 250,70 250,130" fill="none" stroke="#475569" strokeWidth="18" strokeLinecap="round" />
            <path d="M30,130 C30,70 50,45 140,45 C230,45 250,70 250,130" fill="none" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />

            {/* Grooves / Sulcos do Pneu */}
            <rect x="85" y="39" width="14" height="24" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <rect x="133" y="39" width="14" height="24" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <rect x="181" y="39" width="14" height="24" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />

            {/* TWI Rubber Bar inside the middle groove */}
            <rect x="135" y="54" width="10" height="8" rx="1" fill="#eab308" />
            
            {/* Callout Arrow pointing to TWI */}
            <line x1="140" y1="95" x2="140" y2="66" stroke="#eab308" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="140,63 136,70 144,70" fill="#eab308" />

            {/* TWI Spec Label Badge */}
            <rect x="80" y="100" width="120" height="32" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
            <text x="140" y="115" fill="#facc15" fontSize="11" fontWeight="black" textAnchor="middle">TWI: 1,6 mm MÍNIMO</text>
            <text x="140" y="126" fill="#94a3b8" fontSize="8" textAnchor="middle">Limite legal do CTB</text>

            <text x="140" y="152" fill="#f1f5f9" fontSize="9" fontWeight="bold" textAnchor="middle">
              Abaixo de 1,6 mm = Pneu Careca (Grave)
            </text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              TWI (Tread Wear Indicator): Sulco mínimo de 1,6 mm obrigatório por lei.
            </p>
          )}
        </div>
      );

    // ----------------------------------------------------
    // MECÂNICA: LUZES ESPIA DO PAINEL
    // ----------------------------------------------------
    case 'luz-oleo':
      return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#2a1315] border-2 border-rose-600/80 ${className}`}>
          <svg viewBox="0 0 64 64" className="w-12 h-12 select-none">
            {/* Oil Can Icon */}
            <path d="M12,42 L42,42 C46,42 48,39 48,35 L48,32 C48,28 44,26 38,26 L22,26 C16,26 12,28 12,32 Z" fill="#ef4444" />
            {/* Spout */}
            <path d="M48,33 L58,22" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            {/* Oil drop */}
            <path d="M58,26 C58,29 55,31 55,29 C55,27 58,24 58,26 Z" fill="#ef4444" />
            {/* Handle */}
            <path d="M16,26 C16,18 24,18 28,18 L32,18" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-[11px] font-black text-rose-400 mt-1 uppercase text-center">Pressão do Óleo</span>
          <span className="text-[9px] text-rose-300 font-bold">PARE IMEDIATAMENTE</span>
        </div>
      );

    case 'luz-bateria':
      return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#2a1315] border-2 border-rose-600/80 ${className}`}>
          <svg viewBox="0 0 64 64" className="w-12 h-12 select-none">
            <rect x="12" y="22" width="40" height="26" rx="4" fill="#ef4444" />
            <rect x="18" y="16" width="8" height="6" rx="1" fill="#ef4444" />
            <rect x="38" y="16" width="8" height="6" rx="1" fill="#ef4444" />
            {/* minus */}
            <line x1="20" y1="35" x2="26" y2="35" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            {/* plus */}
            <line x1="39" y1="35" x2="47" y2="35" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="43" y1="31" x2="43" y2="39" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-[11px] font-black text-rose-400 mt-1 uppercase text-center">Bateria / Alternador</span>
          <span className="text-[9px] text-rose-300 font-bold">Falha no Carregamento</span>
        </div>
      );

    case 'luz-temperatura':
      return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#2a1315] border-2 border-rose-600/80 ${className}`}>
          <svg viewBox="0 0 64 64" className="w-12 h-12 select-none">
            {/* Thermometer */}
            <rect x="29" y="14" width="6" height="24" rx="3" fill="#ef4444" />
            <circle cx="32" cy="40" r="8" fill="#ef4444" />
            {/* Liquid lines */}
            <path d="M16,48 Q24,44 32,48 T48,48" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <path d="M16,53 Q24,49 32,53 T48,53" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[11px] font-black text-rose-400 mt-1 uppercase text-center">Temperatura do Motor</span>
          <span className="text-[9px] text-rose-300 font-bold">Superaquecimento</span>
        </div>
      );

    case 'luz-injecao':
      return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#2a2312] border-2 border-amber-500/80 ${className}`}>
          <svg viewBox="0 0 64 64" className="w-12 h-12 select-none">
            {/* Engine block outline */}
            <path d="M14,24 L22,24 L22,20 L30,20 L30,24 L42,24 L46,28 L46,36 L52,36 L52,44 L46,44 L46,48 L18,48 L14,44 Z" fill="#f59e0b" />
            {/* Fan at left */}
            <rect x="8" y="28" width="6" height="14" rx="2" fill="#f59e0b" />
          </svg>
          <span className="text-[11px] font-black text-amber-400 mt-1 uppercase text-center">Injeção Eletrônica</span>
          <span className="text-[9px] text-amber-300 font-bold">Alerta / Revisão</span>
        </div>
      );

    case 'luz-freio-mao':
      return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#2a1315] border-2 border-rose-600/80 ${className}`}>
          <svg viewBox="0 0 64 64" className="w-12 h-12 select-none">
            <circle cx="32" cy="32" r="16" fill="none" stroke="#ef4444" strokeWidth="3" />
            <path d="M12,24 C8,28 8,36 12,40" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <path d="M52,24 C56,28 56,36 52,40" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <text x="32" y="38" fill="#ef4444" fontSize="18" fontWeight="black" textAnchor="middle">!</text>
          </svg>
          <span className="text-[11px] font-black text-rose-400 mt-1 uppercase text-center">Freio de Estacionamento</span>
          <span className="text-[9px] text-rose-300 font-bold">Freio de Mão Acionado</span>
        </div>
      );

    // ----------------------------------------------------
    // VIAS DE TRÂNSITO (VELOCIDADES & CLASSIFICAÇÃO CTB)
    // ----------------------------------------------------
    case 'via-transito-rapido':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 180" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="160" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Asphalt Multi-lane */}
            <rect x="35" y="45" width="210" height="85" fill="#0f172a" />
            {/* Central Median Barrier (Canteiro Central sem cruzamentos) */}
            <rect x="35" y="84" width="210" height="7" fill="#22c55e" rx="2" />
            {/* White Dashed Lane Dividers */}
            <line x1="45" y1="65" x2="235" y2="65" stroke="#fff" strokeWidth="2" strokeDasharray="12,10" />
            <line x1="45" y1="110" x2="235" y2="110" stroke="#fff" strokeWidth="2" strokeDasharray="12,10" />

            {/* Overpass Bridge (Viaduto / Sem semáforo) */}
            <path d="M120,35 Q140,25 160,35 L160,50 L120,50 Z" fill="#64748b" />
            <line x1="110" y1="45" x2="170" y2="45" stroke="#94a3b8" strokeWidth="4" />

            {/* Speed Sign 80 km/h */}
            <g transform="translate(195, 20)">
              <circle cx="20" cy="20" r="18" fill="#fff" stroke="#ef4444" strokeWidth="4" />
              <text x="20" y="26" fill="#0f172a" fontSize="13" fontWeight="black" textAnchor="middle">80</text>
            </g>

            {/* Labels */}
            <text x="110" y="152" fill="#38bdf8" fontSize="11" fontWeight="black" textAnchor="middle">TRÂNSITO RÁPIDO</text>
            <text x="110" y="163" fill="#94a3b8" fontSize="8" textAnchor="middle">Sem semáforos nem cruzamentos de nível</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Via de Trânsito Rápido: 80 km/h. Acessos especiais, sem interseções em nível.
            </p>
          )}
        </div>
      );

    case 'via-arterial':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 180" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="160" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Asphalt Avenue */}
            <rect x="35" y="45" width="210" height="85" fill="#0f172a" />
            {/* Double Yellow Line */}
            <line x1="35" y1="85" x2="245" y2="85" stroke="#eab308" strokeWidth="2" />
            <line x1="35" y1="89" x2="245" y2="89" stroke="#eab308" strokeWidth="2" />
            
            {/* Traffic Light (Semáforo na via arterial) */}
            <rect x="65" y="25" width="16" height="32" rx="4" fill="#020617" stroke="#64748b" strokeWidth="1" />
            <circle cx="73" cy="31" r="3" fill="#ef4444" />
            <circle cx="73" cy="41" r="3" fill="#eab308" />
            <circle cx="73" cy="51" r="3" fill="#22c55e" />

            {/* Pedestrian Crossing Stripes (Faixa de Pedestres) */}
            {[...Array(6)].map((_, i) => (
              <rect key={i} x={115 + i * 12} y="55" width="7" height="65" fill="#fff" fillOpacity="0.85" />
            ))}

            {/* Speed Sign 60 km/h */}
            <g transform="translate(195, 20)">
              <circle cx="20" cy="20" r="18" fill="#fff" stroke="#ef4444" strokeWidth="4" />
              <text x="20" y="26" fill="#0f172a" fontSize="13" fontWeight="black" textAnchor="middle">60</text>
            </g>

            {/* Labels */}
            <text x="110" y="152" fill="#facc15" fontSize="11" fontWeight="black" textAnchor="middle">VIA ARTERIAL</text>
            <text x="110" y="163" fill="#94a3b8" fontSize="8" textAnchor="middle">Liga regiões da cidade, possui semáforos</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Via Arterial: 60 km/h. Conecta bairros, possui semáforos e faixas de pedestres.
            </p>
          )}
        </div>
      );

    case 'cruzamento-direita':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 200" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="180" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* 4-Way Intersection Asphalt */}
            {/* North-South Road */}
            <rect x="110" y="25" width="60" height="150" fill="#0f172a" />
            {/* East-West Road */}
            <rect x="25" y="70" width="230" height="60" fill="#0f172a" />
            
            {/* Center Box intersection */}
            <rect x="110" y="70" width="60" height="60" fill="#0f172a" />
            
            {/* Vehicle A (approaching from South, moving North) */}
            <g transform="translate(138, 140)">
              <rect x="-10" y="-18" width="20" height="34" rx="4" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
              <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="black" textAnchor="middle">A</text>
              {/* Wait / stop sign reminder */}
              <circle cx="16" cy="0" r="6" fill="#ef4444" />
              <text x="16" y="3" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">X</text>
            </g>

            {/* Vehicle B (approaching from East, moving West - on the RIGHT of A) */}
            <g transform="translate(205, 88)">
              <rect x="-18" y="-10" width="34" height="20" rx="4" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
              <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="black" textAnchor="middle">B</text>
              {/* Green Priority Arrow */}
              <path d="M-22,0 L-32,-6 L-32,-2 L-42,-2 L-42,2 L-32,2 L-32,6 Z" fill="#22c55e" />
            </g>

            {/* Badge Explanation */}
            <rect x="35" y="22" width="210" height="30" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
            <text x="140" y="36" fill="#86efac" fontSize="10" fontWeight="black" textAnchor="middle">PREFERÊNCIA É DE QUEM VEM PELA DIREITA</text>
            <text x="140" y="47" fill="#f1f5f9" fontSize="8" textAnchor="middle">Veículo B está à direita de A → B passa primeiro!</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Cruzamento sem sinalização: A preferência é SEMPRE de quem vem pela DIREITA.
            </p>
          )}
        </div>
      );

    case 'rotatoria':
      return (
        <div className={`flex flex-col items-center ${className}`}>
          <svg viewBox="0 0 280 200" className="w-full max-w-[280px] h-auto drop-shadow-md select-none">
            <rect x="10" y="10" width="260" height="180" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            
            {/* Roundabout Roads */}
            <rect x="115" y="25" width="50" height="150" fill="#0f172a" />
            <rect x="25" y="75" width="230" height="50" fill="#0f172a" />
            
            {/* Outer Roundabout ring */}
            <circle cx="140" cy="100" r="50" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            {/* Central Island (Canteiro central) */}
            <circle cx="140" cy="100" r="22" fill="#15803d" stroke="#22c55e" strokeWidth="2" />
            
            {/* Vehicle in Roundabout (Carro A - já circulando) */}
            <g transform="translate(140, 62)">
              <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
              <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="black" textAnchor="middle">A</text>
              <path d="M-18,0 L-26,-4 L-26,-1 L-32,-1 L-32,1 L-26,1 L-26,4 Z" fill="#22c55e" />
            </g>

            {/* Vehicle Approaching (Carro B - chegando) */}
            <g transform="translate(80, 100)">
              <rect x="-8" y="-14" width="16" height="28" rx="3" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
              <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="black" textAnchor="middle">B</text>
              <text x="-15" y="4" fill="#ef4444" fontSize="10" fontWeight="bold">DÊ A PREF.</text>
            </g>

            {/* Badge Explanation */}
            <rect x="35" y="15" width="210" height="26" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
            <text x="140" y="32" fill="#86efac" fontSize="9" fontWeight="black" textAnchor="middle">ROTATÓRIA: PREFERÊNCIA DE QUEM JÁ CIRCULA</text>
          </svg>
          {showCaption && (
            <p className="text-xs text-slate-400 mt-2 font-medium text-center">
              Em rotatórias sem semáforo, quem já está circulando nela tem SEMPRE preferência.
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
};
