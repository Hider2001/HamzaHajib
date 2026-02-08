/**
 * World-Class Button Component
 * Features: Multiple variants, sizes, loading states, icons, animations
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-[#0A2540] text-white hover:bg-[#0A2540]/90 shadow-lg hover:shadow-xl',
  secondary: 'bg-[#38BDF8] text-[#0A2540] hover:bg-[#38BDF8]/90 shadow-lg hover:shadow-xl',
  outline: 'border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white',
  ghost: 'text-[#0A2540] hover:bg-[#F8FAFC]',
  gradient: 'bg-gradient-to-r from-[#0A2540] via-[#38BDF8] to-[#0A2540] bg-[length:200%_100%] text-white hover:bg-right shadow-lg hover:shadow-xl',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:ring-[#38BDF8]/30';
    const variantClasses = variants[variant];
    const sizeClasses = sizes[size];
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children as React.ReactNode}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
