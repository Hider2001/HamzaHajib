import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#0f3460] text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 start-10 w-72 h-72 bg-[#38BDF8] rounded-full blur-3xl" />
                <div className="absolute bottom-20 end-10 w-96 h-96 bg-[#38BDF8] rounded-full blur-3xl" />
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
                    <motion.a
                        href="#work"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-8 py-4 bg-[#38BDF8] text-[#0A2540] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                        {t('hero.cta')}
                    </motion.a>
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
