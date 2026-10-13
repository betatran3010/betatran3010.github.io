
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ink';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-heading font-bold text-base tracking-wide py-3 px-8 rounded-full transition-all duration-300 focus:outline-none flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:text-white shadow-cute hover:shadow-cute-hover hover:-translate-y-1",
    secondary: "bg-white border-2 border-slate-100 text-ink hover:border-primary hover:text-primary",
    outline: "bg-transparent border-2 border-ink text-ink hover:bg-ink hover:text-white",
    ghost: "bg-transparent text-ink-light hover:text-primary hover:bg-primary-light/50 font-bold",
    ink: "bg-ink text-white shadow-cute hover:shadow-cute-hover hover:-translate-y-1",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
