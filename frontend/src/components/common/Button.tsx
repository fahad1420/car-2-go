import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'lemon' | 'charcoal' | 'outline' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'lemon',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 rounded-full select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-3.5 text-sm sm:text-base gap-2.5 font-bold',
  };

  const variantStyles = {
    lemon: 'bg-brand-lemon text-brand-charcoal hover:bg-brand-lemon-light hover:lemon-glow font-bold shadow-sm',
    charcoal: 'bg-brand-charcoal text-white hover:bg-brand-graphite border border-white/10 hover:border-brand-lemon/40',
    outline: 'border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white',
    glass: 'glass-panel-dark text-white hover:border-brand-lemon hover:text-brand-lemon border border-white/10',
    ghost: 'text-brand-charcoal hover:text-brand-lemon hover:bg-black/5 dark:text-white dark:hover:bg-white/5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
