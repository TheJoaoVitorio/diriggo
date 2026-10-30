import React from 'react';

interface TrafficSignProps {
  signId: string;
  size?: number;
  className?: string;
}

export const TrafficSignComponent: React.FC<TrafficSignProps> = ({ signId, size = 110, className = '' }) => {
  switch (signId) {
    case 'R-1':
      // Placa PARE - Octógono Vermelho
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3" />
          <polygon points="31,8 69,8 92,31 92,69 69,92 31,92 8,69 8,31" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="50" y="58" fill="#FFFFFF" fontSize="23" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            PARE
          </text>
        </svg>
      );

    case 'R-2':
      // Dê a Preferência - Triângulo invertido com vértice para baixo
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="10,12 90,12 50,88" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="25,22 75,22 50,72" fill="#FFFFFF" />
        </svg>
      );

    case 'R-3':
      // Sentido Proibido - Círculo vermelho com faixa branca
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <circle cx="50" cy="50" r="44" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="18" y="42" width="64" height="16" rx="2" fill="#FFFFFF" />
        </svg>
      );

    case 'R-4a':
      // Proibido Virar à Esquerda
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#DC2626" strokeWidth="10" />
          {/* Seta virando à esquerda */}
          <path d="M 62 65 L 62 48 Q 62 38 50 38 L 40 38 L 40 32 L 28 42 L 40 52 L 40 46 L 50 46 Q 54 46 54 50 L 54 65 Z" fill="#18181B" />
          {/* Tarja diagonal de proibição */}
          <line x1="24" y1="24" x2="76" y2="76" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    case 'R-19':
      // Velocidade Máxima 60 km/h
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#DC2626" strokeWidth="9" />
          <text x="50" y="52" fill="#18181B" fontSize="28" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            60
          </text>
          <text x="50" y="68" fill="#18181B" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            km/h
          </text>
        </svg>
      );

    case 'A-1a':
      // Curva Acentuada à Esquerda - Losango Amarelo
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="50,6 94,50 50,94 6,50" fill="#FFC800" stroke="#18181B" strokeWidth="3" />
          <polygon points="50,11 89,50 50,89 11,50" fill="#FFC800" stroke="#18181B" strokeWidth="1.5" />
          <path d="M 52 72 L 52 52 Q 52 42 42 42 L 34 42 L 34 35 L 22 46 L 34 57 L 34 50 L 42 50 Q 44 50 44 54 L 44 72 Z" fill="#18181B" />
        </svg>
      );

    case 'A-15':
      // Parada Obrigatória à Frente
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="50,6 94,50 50,94 6,50" fill="#FFC800" stroke="#18181B" strokeWidth="3" />
          <polygon points="50,11 89,50 50,89 11,50" fill="#FFC800" stroke="#18181B" strokeWidth="1.5" />
          {/* Mini placa PARE no centro */}
          <polygon points="40,32 60,32 72,44 72,56 60,68 40,68 28,56 28,44" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="50" y="54" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            PARE
          </text>
        </svg>
      );

    case 'A-32a':
      // Passagem de Pedestres
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="50,6 94,50 50,94 6,50" fill="#FFC800" stroke="#18181B" strokeWidth="3" />
          <polygon points="50,11 89,50 50,89 11,50" fill="#FFC800" stroke="#18181B" strokeWidth="1.5" />
          {/* Faixa zebra */}
          <rect x="30" y="66" width="40" height="4" fill="#18181B" />
          <rect x="30" y="73" width="40" height="4" fill="#18181B" />
          {/* Pedestre caminhando */}
          <circle cx="50" cy="35" r="4.5" fill="#18181B" />
          <path d="M 48 42 L 53 42 L 56 54 L 62 64 L 57 65 L 53 56 L 47 65 L 43 64 L 47 52 L 44 46 L 39 49 L 37 46 Z" fill="#18181B" />
        </svg>
      );

    case 'A-33a':
      // Área Escolar
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="50,6 94,50 50,94 6,50" fill="#FFC800" stroke="#18181B" strokeWidth="3" />
          <polygon points="50,11 89,50 50,89 11,50" fill="#FFC800" stroke="#18181B" strokeWidth="1.5" />
          {/* Adulto segurando criança */}
          <circle cx="43" cy="34" r="4.5" fill="#18181B" />
          <path d="M 39 41 L 47 41 L 49 53 L 45 68 L 41 68 L 43 54 L 38 68 L 34 68 L 38 49 L 34 52 L 32 49 Z" fill="#18181B" />
          {/* Criança com mochila */}
          <circle cx="59" cy="44" r="3.5" fill="#18181B" />
          <path d="M 56 49 L 62 49 L 64 58 L 61 68 L 58 68 L 60 59 L 56 68 L 53 68 L 56 55 L 53 57 L 52 54 Z" fill="#18181B" />
        </svg>
      );

    case 'A-28':
      // Pista Escorregadia
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-md ${className}`}>
          <polygon points="50,6 94,50 50,94 6,50" fill="#FFC800" stroke="#18181B" strokeWidth="3" />
          <polygon points="50,11 89,50 50,89 11,50" fill="#FFC800" stroke="#18181B" strokeWidth="1.5" />
          {/* Carro inclinado com marcas sinuosas */}
          <rect x="36" y="44" width="28" height="12" rx="3" fill="#18181B" transform="rotate(-15 50 50)" />
          <path d="M 32 68 Q 40 60 48 68 Q 56 76 64 68" stroke="#18181B" strokeWidth="3" fill="none" />
          <path d="M 36 74 Q 44 66 52 74 Q 60 82 68 74" stroke="#18181B" strokeWidth="3" fill="none" />
        </svg>
      );

    default:
      return (
        <div className="w-16 h-16 rounded-xl bg-amber-400 flex items-center justify-center font-bold text-slate-900 border-2 border-slate-900">
          {signId}
        </div>
      );
  }
};
