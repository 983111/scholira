import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 border text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200';

  const variants = {
    primary: 'border-transparent text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:opacity-95 focus:ring-emerald-500',
    secondary: 'border-transparent text-emerald-700 bg-emerald-50 hover:bg-emerald-100 focus:ring-emerald-500',
    outline: 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-emerald-500',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? 'Processing...' : children}
    </button>
  );
};
