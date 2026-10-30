import React from 'react';

interface MascotProps {
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  size = 200,
  className = '',
  animate = true
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: typeof size === 'number' ? `${size}px` : size }}
    >
      <img
        src="/mascote-diriggo.png"
        alt="Mascote Diriggo - Capivara CNH"
        className="w-full h-auto object-contain drop-shadow-xl"
        loading="eager"
      />
    </div>
  );
};
