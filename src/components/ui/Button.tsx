/**
 * World-Class Button Component - Enhanced Edition
 * Features: Multiple variants, sizes, loading states, icons, animations, shine effects
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode, useState } from 'react';

// ============================================
// TYPE DEFINITIONS
// ============================================
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'glass' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    shine?: boolean;
    pulse?: boolean;
}

// ============================================
// VARIANT STYLES
// ============================================
const variants = {
    primary: `
        bg-[#0A2540] text-white 
        hover:bg-[#0A2540]/90 
        shadow-lg shadow-[#0A2540]/20 
        hover:shadow-xl hover:shadow-[#0A2540]/30
        dark:bg-[#38BDF8] dark:text-[#0A2540]
        dark:hover:bg-[#38BDF8]/90
        dark:shadow-[#38BDF8]/20
    `,
    secondary: `
        bg-[#38BDF8] text-[#0A2540] 
        hover:bg-[#38BDF8]/90 
        shadow-lg shadow-[#38BDF8]/20 
        hover:shadow-xl hover:shadow-[#38BDF8]/30
    `,
    outline: `
        border-2 border-[#0A2540] text-[#0A2540] 
        hover:bg-[#0A2540] hover:text-white
        dark:border-[#38BDF8] dark:text-[#38BDF8]
        dark:hover:bg-[#38BDF8] dark:hover:text-[#0A2540]
    `,
    ghost: `
        text-[#0A2540] hover:bg-[#0A2540]/5 
        dark:text-white dark:hover:bg-white/10
    `,
    gradient: `
        bg-gradient-to-r from-[#0A2540] via-[#38BDF8] to-[#6366f1] 
        bg-[length:200%_100%] text-white 
        hover:bg-right 
        shadow-lg shadow-[#38BDF8]/20 
        hover:shadow-xl hover:shadow-[#38BDF8]/40
    `,
    glass: `
        bg-white/10 backdrop-blur-md 
        border border-white/20 text-white 
        hover:bg-white/20 hover:border-white/30
        shadow-lg
    `,
    danger: `
        bg-red-500 text-white 
        hover:bg-red-600 
        shadow-lg shadow-red-500/20 
        hover:shadow-xl hover:shadow-red-500/30
    `
};

// ============================================
// SIZE STYLES
// ============================================
const sizes = {
    sm: 'px-5 py-2.5 text-sm rounded-lg gap-2',
    md: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
    lg: 'px-10 py-5 text-lg rounded-xl gap-3',
    xl: 'px-12 py-6 text-xl rounded-2xl gap-3.5'
};

// ============================================
// LOADING SPINNER COMPONENT
// ============================================
const LoadingSpinner = ({ size }: { size: ButtonSize }) => {
    const spinnerSizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-5 w-5',
        xl: 'h-6 w-6'
    };

    return (
        <svg className={`animate-spin ${spinnerSizes[size]}`} viewBox="0 0 24 24">
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
    );
};

// ============================================
// SHINE EFFECT COMPONENT
// ============================================
const ShineEffect = () => (
    <motion.span
        className="absolute inset-0 overflow-hidden rounded-inherit"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
        <span className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
    </motion.span>
);

// ============================================
// PULSE RING COMPONENT
// ============================================
const PulseRing = () => (
    <motion.span
        className="absolute inset-0 rounded-inherit border-2 border-current"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity }}
    />
);

// ============================================
// MAIN BUTTON COMPONENT
// ============================================
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            loading = false,
            icon,
            iconPosition = 'left',
            fullWidth = false,
            shine = false,
            pulse = false,
            children,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);

        const baseClasses = `
            relative inline-flex items-center justify-center 
            font-semibold 
            transition-all duration-300 
            disabled:opacity-50 disabled:cursor-not-allowed 
            focus-visible:ring-4 focus-visible:ring-[#38BDF8]/30 
            overflow-hidden
        `;
        const variantClasses = variants[variant];
        const sizeClasses = sizes[size];
        const widthClass = fullWidth ? 'w-full' : '';

        return (
            <motion.button
                ref={ref}
                whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
                whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
                disabled={disabled || loading}
                {...props}
            >
                {/* Pulse Ring Effect */}
                {pulse && !disabled && !loading && <PulseRing />}

                {/* Shine Effect */}
                {shine && isHovered && !disabled && !loading && <ShineEffect />}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-inherit">
                    {loading ? (
                        <>
                            <LoadingSpinner size={size} />
                            <span>{children as ReactNode}</span>
                        </>
                    ) : (
                        <>
                            {icon && iconPosition === 'left' && (
                                <motion.span
                                    animate={{ x: isHovered ? -2 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {icon}
                                </motion.span>
                            )}
                            {children}
                            {icon && iconPosition === 'right' && (
                                <motion.span
                                    animate={{ x: isHovered ? 2 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {icon}
                                </motion.span>
                            )}
                        </>
                    )}
                </span>

                {/* Ripple Effect Container */}
                <span className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none" />
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

// ============================================
// ICON BUTTON VARIANT
// ============================================
interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'iconPosition' | 'fullWidth'> {
    icon: ReactNode;
    'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, size = 'md', className = '', ...props }, ref) => {
        const sizes = {
            sm: 'w-8 h-8',
            md: 'w-10 h-10',
            lg: 'w-12 h-12',
            xl: 'w-14 h-14'
        };

        return (
            <Button
                ref={ref}
                size={size}
                className={`${sizes[size]} !p-0 !rounded-full ${className}`}
                {...props}
            >
                {icon}
            </Button>
        );
    }
);

IconButton.displayName = 'IconButton';

// ============================================
// BUTTON GROUP COMPONENT
// ============================================
interface ButtonGroupProps {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const ButtonGroup = ({
    children,
    orientation = 'horizontal',
    gap = 'md',
    className = ''
}: ButtonGroupProps) => {
    const gaps = {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4'
    };

    return (
        <div
            className={`
                flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
                ${gaps[gap]}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Button;
