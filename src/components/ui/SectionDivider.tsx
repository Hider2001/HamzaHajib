/**
 * Section Divider Component - World-Class UI/UX
 * Features: Multiple styles, animated waves, gradients, patterns
 */

import { motion } from 'framer-motion';

type DividerStyle = 'wave' | 'curve' | 'tilt' | 'gradient' | 'dots' | 'minimal';

interface SectionDividerProps {
    style?: DividerStyle;
    fromColor?: string;
    toColor?: string;
    inverted?: boolean;
    className?: string;
}

// ============================================
// WAVE DIVIDER
// ============================================
const WaveDivider = ({ inverted, className }: { inverted?: boolean; className?: string }) => (
    <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${className || ''}`}
        style={{ transform: inverted ? 'rotate(180deg)' : 'none' }}
    >
        <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="currentColor"
            className="text-white dark:bg-[#0F172A]"
        />
    </svg>
);

// ============================================
// CURVE DIVIDER
// ============================================
const CurveDivider = ({ inverted, className }: { inverted?: boolean; className?: string }) => (
    <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${className || ''}`}
        style={{ transform: inverted ? 'rotate(180deg)' : 'none' }}
    >
        <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            d="M0 100C360 0 1080 0 1440 100V100H0V100Z"
            fill="currentColor"
            className="text-white dark:bg-[#0F172A]"
        />
    </svg>
);

// ============================================
// TILT DIVIDER
// ============================================
const TiltDivider = ({ inverted, className }: { inverted?: boolean; className?: string }) => (
    <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${className || ''}`}
        style={{ transform: inverted ? 'rotate(180deg)' : 'none' }}
    >
        <motion.path
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            d="M0 0L1440 80V80H0V0Z"
            fill="currentColor"
            className="text-white dark:bg-[#0F172A]"
            style={{ transformOrigin: inverted ? 'top' : 'bottom' }}
        />
    </svg>
);

// ============================================
// GRADIENT DIVIDER
// ============================================
const GradientDivider = ({ className }: { fromColor?: string; toColor?: string; className?: string }) => (
    <div className={`w-full h-1 ${className || ''}`}>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent"
            style={{ transformOrigin: 'left' }}
        />
    </div>
);

// ============================================
// DOTS DIVIDER
// ============================================
const DotsDivider = ({ className }: { className?: string }) => (
    <div className={`flex justify-center gap-2 py-8 ${className || ''}`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#6366f1]"
            />
        ))}
    </div>
);

// ============================================
// MINIMAL DIVIDER
// ============================================
const MinimalDivider = ({ className }: { className?: string }) => (
    <div className={`w-full flex items-center justify-center py-12 ${className || ''}`}>
        <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
        />
    </div>
);

// ============================================
// MAIN SECTION DIVIDER COMPONENT
// ============================================
export const SectionDivider = ({
    style = 'wave',
    inverted = false,
    className
}: SectionDividerProps) => {
    const dividers = {
        wave: <WaveDivider inverted={inverted} className={className} />,
        curve: <CurveDivider inverted={inverted} className={className} />,
        tilt: <TiltDivider inverted={inverted} className={className} />,
        gradient: <GradientDivider className={className} />,
        dots: <DotsDivider className={className} />,
        minimal: <MinimalDivider className={className} />
    };

    return dividers[style] || dividers.wave;
};

// ============================================
// SECTION WRAPPER WITH DIVIDER
// ============================================
interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    dividerStyle?: DividerStyle;
    dividerPosition?: 'top' | 'bottom' | 'both';
    id?: string;
}

export const SectionWrapper = ({
    children,
    className = '',
    dividerStyle = 'wave',
    dividerPosition = 'bottom',
    id
}: SectionWrapperProps) => {
    return (
        <section id={id} className={`relative ${className}`}>
            {dividerPosition === 'top' || dividerPosition === 'both' ? (
                <div className="absolute top-0 left-0 right-0 -translate-y-full">
                    <SectionDivider style={dividerStyle} inverted />
                </div>
            ) : null}

            {children}

            {dividerPosition === 'bottom' || dividerPosition === 'both' ? (
                <div className="absolute bottom-0 left-0 right-0 translate-y-full">
                    <SectionDivider style={dividerStyle} />
                </div>
            ) : null}
        </section>
    );
};

export default SectionDivider;
