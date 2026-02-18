import { useTranslation } from 'react-i18next';
import { motion, type Variants } from 'framer-motion';
import { GradientBlob } from '../ui/GradientBlob';
import { Button } from '../ui/Button';
import { HiArrowDown, HiMail } from 'react-icons/hi';

export const Hero = () => {
    const { t } = useTranslation();

    // Progressive reveal variants following project pattern
    const headlineVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }
        }
    };

    const subtextVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 }
        }
    };

    const ctaVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                type: 'spring' as const,
                stiffness: 300,
                damping: 30,
                delay: 0.4
            }
        }
    };

    const scrollIndicatorVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { delay: 0.8, duration: 0.5 }
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#0f3460] dark:from-[#000000] dark:via-[#0A2540] dark:to-[#1a1a2e] text-white relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0">
                <GradientBlob className="absolute top-20 start-10" color="#38BDF8" size="lg" />
                <GradientBlob className="absolute bottom-20 end-10" color="#6366f1" size="xl" />
                <GradientBlob className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2" color="#ec4899" size="md" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Hero Headline - Fade + Rise */}
                <motion.h1
                    variants={headlineVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                >
                    <span className="block bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent animate-gradient">
                        {t('hero.headline')}
                    </span>
                </motion.h1>

                {/* Hero Subtext - Fade + Rise with delay */}
                <motion.p
                    variants={subtextVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t('hero.subheadline')}
                </motion.p>

                {/* Hero CTA - Scale in with spring */}
                <motion.div
                    variants={ctaVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Button
                        variant="gradient"
                        size="lg"
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                        icon={<HiArrowDown className="w-5 h-5" />}
                        iconPosition="right"
                        className="shadow-2xl hover:shadow-[#38BDF8]/50"
                    >
                        {t('hero.cta')}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="border-2 border-white text-white hover:bg-white hover:text-[#0A2540] shadow-2xl"
                        icon={<HiMail className="w-5 h-5" />}
                    >
                        {t('contact.title')}
                    </Button>
                </motion.div>

                {/* Scroll indicator - Fade in last */}
                <motion.div
                    variants={scrollIndicatorVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-white/60 text-sm font-medium">
                            {t('hero.scroll') || 'Scroll'}
                        </span>
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <motion.div 
                                className="w-1.5 h-3 bg-white/50 rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Animated gradient background */}
            <style>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
};
