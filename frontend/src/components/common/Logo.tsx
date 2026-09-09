import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showTagline = false
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#09090B';
  const subtextColor = isDark ? '#A1A1AA' : '#52525B';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Original Geometric Speed Emblem SVG */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 shrink-0"
      >
        {/* Outer Shield Hexagon Frame */}
        <polygon
          points="50,6 92,26 92,74 50,94 8,74 8,26"
          stroke={isDark ? '#27272A' : '#E4E4E7'}
          strokeWidth="3"
          fill={isDark ? '#121214' : '#09090B'}
        />
        {/* Aerodynamic Speed Monoline Sweep in Brand Soft Lemon */}
        <path
          d="M26 64 L46 36 L62 54 L78 36"
          stroke="#E2F163"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Forward Motion Apex Indicator */}
        <circle cx="78" cy="36" r="4.5" fill="#E2F163" />
        <circle cx="50" cy="94" r="2.5" fill="#E2F163" />
      </svg>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className="font-display font-extrabold text-xl tracking-tight uppercase transition-colors"
            style={{ color: textColor }}
          >
            CAR 2 GO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lemon inline-block mb-0.5" />
        </div>
        {showTagline && (
          <span
            className="text-[9px] tracking-label-luxury uppercase font-semibold mt-1 transition-colors"
            style={{ color: subtextColor }}
          >
            PRESTIGE MOBILITY
          </span>
        )}
      </div>
    </div>
  );
};
