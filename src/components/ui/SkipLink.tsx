/**
 * Skip Link Component
 * Accessibility feature for keyboard navigation
 */

import { useTranslation } from 'react-i18next';

export const SkipLink = () => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0A2540] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
        >
            {isArabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>
    );
};
