/**
 * Mobile Menu Component
 * Responsive navigation for mobile devices
 */

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HiX, HiMenu } from 'react-icons/hi';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { t } = useTranslation();

    const navItems = [
        { key: 'home', href: '#' },
        { key: 'work', href: '#work' },
        { key: 'about', href: '#about' },
        { key: 'contact', href: '#contact' },
    ];

    const handleNavClick = () => {
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.nav
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 end-0 h-full w-64 bg-white dark:bg-[#1E293B] shadow-xl z-50 md:hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 end-4 p-2 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0A2540] dark:hover:text-white"
                            aria-label="Close menu"
                        >
                            <HiX className="w-6 h-6" />
                        </button>

                        {/* Nav Links */}
                        <ul className="pt-16 px-6 space-y-4">
                            {navItems.map(({ key, href }, index) => (
                                <motion.li
                                    key={key}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <a
                                        href={href}
                                        onClick={handleNavClick}
                                        className="block py-3 text-lg font-medium text-[#1E293B] dark:text-white hover:text-[#38BDF8] transition-colors"
                                    >
                                        {t(`nav.${key}`)}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Theme Toggle & Language Switcher */}
                        <div className="absolute bottom-8 start-6 flex items-center gap-4">
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
};

/**
 * Hamburger Button Component
 */
export const HamburgerButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="md:hidden p-2 text-[#0A2540] dark:text-white hover:text-[#38BDF8] transition-colors"
            aria-label="Open menu"
        >
            <HiMenu className="w-6 h-6" />
        </button>
    );
};
