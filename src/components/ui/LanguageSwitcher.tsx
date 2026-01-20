import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const toggle = () => {
        const newLang = isArabic ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#CBD5E1]/50 hover:bg-[#CBD5E1] transition-colors text-[#0A2540] font-medium text-sm"
            aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
        >
            <span className="text-base">🌐</span>
            <span>{isArabic ? 'EN' : 'عربي'}</span>
        </motion.button>
    );
};
