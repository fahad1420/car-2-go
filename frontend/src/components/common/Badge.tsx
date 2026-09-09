import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lemon' | 'dark' | 'outline' | 'subtle';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lemon',
  className = ''
}) => {
  const styles = {
    lemon: 'bg-brand-lemon/15 text-brand-charcoal border border-brand-lemon/30 font-medium',
    dark: 'bg-brand-graphite text-white border border-white/10',
    outline: 'border border-brand-charcoal/20 text-brand-charcoal',
    subtle: 'bg-black/5 text-brand-charcoal/80',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

