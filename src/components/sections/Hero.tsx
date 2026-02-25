/**
 * Hero Section Component - World-Class UI/UX Edition
 * Features: Clean spacing, breathing room, elegant animations
 */

import { useTranslation } from 'react-i18next';
import { motion, type Variants } from 'framer-motion';
import { GradientBlob } from '../ui/GradientBlob';
import { Button } from '../ui/Button';
import { HiMail, HiCode, HiSparkles } from 'react-icons/hi';
import { useState, useEffect } from 'react';

// ============================================
// FLOATING PARTICLE COMPONENT
// ============================================
const FloatingParticle = ({ delay, duration, size, left, top }: {
    delay: number;
    duration: number;
    size: number;
    left: string;
    top: string;
}) => (
    <motion.div
        className="absolute rounded-full bg-white/10 backdrop-blur-sm"
        style={{ width: size, height: size, left, top }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0, 1, 1, 0],
            y: [0, -80, -150]
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: "easeOut"
        }}
    />
);

// ============================================
// TYPING EFFECT COMPONENT
// ============================================
const TypingEffect = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 60);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, started]);

    return (
        <span>
            {displayedText}
            {currentIndex < text.length && started && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-8 bg-[#38BDF8] ms-1"
                />
            )}
        </span>
    );
};

// ============================================
// SKILL TAG COMPONENT
// ============================================
const SkillTag = ({ skill, index }: { skill: string; index: number }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5 + index * 0.1, duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/80 font-medium cursor-default hover:bg-white/10 hover:border-[#38BDF8]/30 transition-all"
    >
        {skill}
    </motion.span>
);

// ============================================
// MAIN HERO COMPONENT
// ============================================
export const Hero = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 15,
                y: (e.clientY / window.innerHeight - 0.5) * 15
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animation variants
    const headlineVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }
        }
    };

    const subtextVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.4 }
        }
    };

    const ctaVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.8 }
        }
    };

    const skills = ['React', 'TypeScript', 'Node.js', 'Flutter', 'UI/UX'];

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#0f3460] to-[#1a1a2e] dark:from-[#000000] dark:via-[#0A2540] dark:to-[#1a1a2e] text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Blobs with Parallax */}
                <motion.div
                    style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                    className="absolute inset-0"
                >
                    <GradientBlob className="absolute top-32 start-20 opacity-40" color="#38BDF8" size="lg" />
                </motion.div>
                <motion.div
                    style={{ x: mousePosition.x * -1.5, y: mousePosition.y * -1.5 }}
                    className="absolute inset-0"
                >
                    <GradientBlob className="absolute bottom-32 end-20 opacity-30" color="#6366f1" size="xl" />
                </motion.div>

                {/* Floating Particles - Reduced count */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 0.5}
                        duration={5 + Math.random() * 3}
                        size={3 + Math.random() * 5}
                        left={`${Math.random() * 100}%`}
                        top={`${60 + Math.random() * 40}%`}
                    />
                ))}

                {/* Grid Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Radial Gradient Overlay */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10,37,64,0.4) 70%)'
                    }}
                />
            </div>

            {/* Main Content - Increased padding */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-16 sm:py-20">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-400"
                    />
                    <span className="text-sm text-white/70 font-medium">{t('hero.status') || 'Available for Projects'}</span>
                    <HiSparkles className="text-[#38BDF8] text-sm" />
                </motion.div>

                {/* Hero Headline */}
                <motion.h1
                    variants={headlineVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight"
                    style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                >
                    <span className="block bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
                        <TypingEffect text={t('hero.headline')} delay={0.5} />
                    </span>
                </motion.h1>

                {/* Hero Subtext */}
                <motion.p
                    variants={subtextVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed"
                >
                    {t('hero.subheadline')}
                </motion.p>

                {/* Skills Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-wrap gap-2.5 justify-center mb-8"
                >
                    {skills.map((skill, index) => (
                        <SkillTag key={skill} skill={skill} index={index} />
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={ctaVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-3 justify-center"
                >
                    <Button
                        variant="gradient"
                        size="md"
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                        icon={<HiCode className="w-5 h-5" />}
                        iconPosition="left"
                        className="shadow-xl shadow-[#38BDF8]/20 hover:shadow-[#38BDF8]/40"
                    >
                        {t('hero.cta')}
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#38BDF8]/50 shadow-xl backdrop-blur-sm"
                        icon={<HiMail className="w-5 h-5" />}
                    >
                        {t('contact.title')}
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-white/40 text-xs font-medium uppercase tracking-widest group-hover:text-[#38BDF8]/70 transition-colors">
                        {t('hero.scroll') || 'Scroll'}
                    </span>
                    <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center pt-2 group-hover:border-[#38BDF8]/30 transition-colors">
                        <motion.div
                            className="w-1 h-2.5 bg-[#38BDF8]/60 rounded-full"
                            animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
