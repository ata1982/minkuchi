import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, loading, disabled, ...props }, ref) => {
    // globals.cssで定義されたクラスを使用
    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary", 
      outline: "btn-outline",
      ghost: "btn-ghost",
      danger: "btn-danger",
      success: "btn-success",
      warning: "btn-warning"
    };

    const sizes = {
      xs: "btn-xs",
      sm: "btn-sm", 
      md: "", // デフォルトサイズ
      lg: "px-6 py-3 text-lg"
    };

    return (
      <button
        className={cn(
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="loading-spinner h-4 w-4 mr-2" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };