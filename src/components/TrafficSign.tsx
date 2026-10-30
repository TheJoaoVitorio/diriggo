import React, { useState } from 'react';

interface TrafficSignProps {
  signId: string;
  size?: number;
  className?: string;
}

export const TrafficSignComponent: React.FC<TrafficSignProps> = ({ 
  signId, 
  size = 110, 
  className = '' 
}) => {
  const [hasError, setHasError] = useState(false);
  const normalizedCode = (signId || '').trim().toUpperCase();

  // Primary: Local extracted official CONTRAN vector PNG
  // Fallback: Public Traffic Sign API endpoint
  const localSrc = `/placas/${normalizedCode}.png`;
  const apiFallbackSrc = `https://traffic-sign-api.vercel.app/plate-code/${normalizedCode}`;

  if (hasError) {
    return (
      <div 
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-amber-400 border-2 border-slate-900 flex flex-col items-center justify-center font-black text-slate-900 shadow-md ${className}`}
      >
        <span className="text-xl">🛑</span>
        <span className="text-[11px] uppercase tracking-wider">{normalizedCode}</span>
      </div>
    );
  }

  return (
    <img
      src={localSrc}
      alt={`Placa de Trânsito Oficial ${normalizedCode}`}
      style={{ width: size, height: size }}
      className={`object-contain drop-shadow-md select-none transition-transform ${className}`}
      loading="lazy"
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.dataset.fallbackTried) {
          target.dataset.fallbackTried = 'true';
          target.src = apiFallbackSrc;
        } else {
          setHasError(true);
        }
      }}
    />
  );
};
