/**
 * Animated Background Component - World-Class UI/UX
 * Features: Particle effects, gradient orbs, grid patterns, noise textures
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// ============================================
// PARTICLE PROPS
// ============================================
interface ParticleProps {
    count?: number;
    color?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
}

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
export const FloatingParticles = ({
    count = 30,
    color = '#38BDF8',
    minSize = 2,
    maxSize = 6,
    speed = 1
}: ParticleProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Dimensions available for future enhancements
    const [_dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        }
    }, []);

    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        duration: (3 + Math.random() * 4) * speed,
        delay: Math.random() * 2
    }));

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        backgroundColor: color,
                        opacity: 0.3
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// ============================================
// GRADIENT ORB COMPONENT
// ============================================
interface GradientOrbProps {
    color?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity?: number;
    blur?: 'sm' | 'md' | 'lg' | 'xl';
    animated?: boolean;
}

export const GradientOrb = ({
    color = '#38BDF8',
    size = 'lg',
    position = 'top-left',
    opacity = 0.15,
    blur = 'xl',
    animated = true
}: GradientOrbProps) => {
    const sizes = {
        sm: 'w-48 h-48',
        md: 'w-72 h-72',
        lg: 'w-96 h-96',
        xl: 'w-[32rem] h-[32rem]'
    };

    const blurs = {
        sm: 'blur-2xl',
        md: 'blur-3xl',
        lg: 'blur-[100px]',
        xl: 'blur-[150px]'
    };

    const positions = {
        'top-left': '-top-24 -left-24',
        'top-right': '-top-24 -right-24',
        'bottom-left': '-bottom-24 -left-24',
        'bottom-right': '-bottom-24 -right-24',
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    };

    return (
        <motion.div
            className={`absolute ${sizes[size]} ${blurs[blur]} ${positions[position]} rounded-full pointer-events-none`}
            style={{ backgroundColor: color, opacity }}
            animate={animated ? {
                scale: [1, 1.1, 1],
                opacity: [opacity, opacity * 1.2, opacity]
            } : {}}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

// ============================================
// GRID PATTERN COMPONENT
// ============================================
interface GridPatternProps {
    size?: number;
    opacity?: number;
    color?: string;
}

export const GridPattern = ({
    size = 50,
    opacity = 0.03,
    color = 'white'
}: GridPatternProps) => {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                opacity,
                backgroundImage: `linear-gradient(${color} 1px, transparent 1px),
                                 linear-gradient(90deg, ${color} 1px, transparent 1px)`,
                backgroundSize: `${size}px ${size}px`
            }}
        />
    );
};

// ============================================
// NOISE TEXTURE COMPONENT
// ============================================
interface NoiseTextureProps {
    opacity?: number;
}

export const NoiseTexture = ({ opacity = 0.03 }: NoiseTextureProps) => {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                opacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
        />
    );
};

// ============================================
// PARALLAX BACKGROUND COMPONENT
// ============================================
interface ParallaxBackgroundProps {
    children?: React.ReactNode;
    speed?: number;
}

export const ParallaxBackground = ({
    children,
    speed = 0.5
}: ParallaxBackgroundProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0">
                {children}
            </motion.div>
        </div>
    );
};

// ============================================
// ANIMATED GRADIENT BACKGROUND
// ============================================
interface AnimatedGradientProps {
    colors?: string[];
    animate?: boolean;
    speed?: number;
}

export const AnimatedGradient = ({
    colors = ['#0A2540', '#38BDF8', '#6366f1'],
    animate = true,
    speed = 10
}: AnimatedGradientProps) => {
    const gradientStops = colors.map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`).join(', ');

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: `linear-gradient(135deg, ${gradientStops})`,
                backgroundSize: animate ? '400% 400%' : '100% 100%'
            }}
            animate={animate ? {
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            } : {}}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
};

// ============================================
// RADIAL GRADIENT OVERLAY
// ============================================
interface RadialGradientProps {
    color?: string;
    opacity?: number;
    center?: 'center' | 'top' | 'bottom';
}

export const RadialGradient = ({
    color = '#0A2540',
    opacity = 0.5,
    center = 'center'
}: RadialGradientProps) => {
    const centers = {
        'center': 'circle at 50% 50%',
        'top': 'circle at 50% 0%',
        'bottom': 'circle at 50% 100%'
    };

    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: `radial-gradient(${centers[center]}, transparent 0%, ${color} 70%)`,
                opacity
            }}
        />
    );
};

// ============================================
// COMBINED ANIMATED BACKGROUND
// ============================================
interface AnimatedBackgroundProps {
    variant?: 'particles' | 'orbs' | 'grid' | 'combined';
    showNoise?: boolean;
    showGrid?: boolean;
    className?: string;
}

export const AnimatedBackground = ({
    variant = 'combined',
    showNoise = true,
    showGrid = false,
    className = ''
}: AnimatedBackgroundProps) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Gradient Orbs */}
            {(variant === 'orbs' || variant === 'combined') && (
                <>
                    <GradientOrb color="#38BDF8" position="top-left" size="lg" />
                    <GradientOrb color="#6366f1" position="bottom-right" size="xl" />
                    <GradientOrb color="#ec4899" position="center" size="md" opacity={0.1} />
                </>
            )}

            {/* Floating Particles */}
            {(variant === 'particles' || variant === 'combined') && (
                <FloatingParticles count={20} color="#38BDF8" />
            )}

            {/* Grid Pattern */}
            {showGrid && <GridPattern />}

            {/* Noise Texture */}
            {showNoise && <NoiseTexture />}

            {/* Radial Gradient Overlay */}
            <RadialGradient />
        </div>
    );
};

export default AnimatedBackground;
