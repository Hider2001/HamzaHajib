import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { GradientBlob } from '../ui/GradientBlob';
import { Button } from '../ui/Button';
import { HiArrowDown, HiMail } from 'react-icons/hi';

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#0f3460] dark:from-[#000000] dark:via-[#0A2540] dark:to-[#1a1a2e] text-white relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0">
                <GradientBlob className="absolute top-20 start-10" color="#38BDF8" size="lg" />
                <GradientBlob className="absolute bottom-20 end-10" color="#6366f1" size="xl" />
                <GradientBlob className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2" color="#ec4899" size="md" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <RevealOnScroll>
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('hero.headline')}
                    </h1>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        {t('hero.subheadline')}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.4}>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button
                            variant="gradient"
                            size="lg"
                            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                            icon={<HiArrowDown className="w-5 h-5" />}
                            iconPosition="right"
                        >
                            {t('hero.cta')}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="border-white text-white hover:bg-white hover:text-[#0A2540]"
                            icon={<HiMail className="w-5 h-5" />}
                        >
                            {t('contact.title')}
                        </Button>
                    </div>
                </RevealOnScroll>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
