/**
 * Header Layout Component
 * Includes navigation, mobile menu, and language switcher
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { MobileMenu, HamburgerButton } from '../ui/MobileMenu';

export const Header = () => {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { key: 'home', href: '#' },
        { key: 'work', href: '#work' },
        { key: 'about', href: '#about' },
        { key: 'contact', href: '#contact' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#CBD5E1]/50"
            >
                <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <a
                        href="#"
                        className="font-bold text-xl text-[#0A2540] hover:text-[#38BDF8] transition-colors"
                        style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
                    >
                        {t('brand')}
                    </a>

                    <div className="flex items-center gap-4">
                        {/* Desktop Nav */}
                        <ul className="hidden md:flex items-center gap-6">
                            {navItems.map(({ key, href }) => (
                                <li key={key}>
                                    <a
                                        href={href}
                                        className="text-sm text-[#1E293B] hover:text-[#38BDF8] transition-colors font-medium"
                                    >
                                        {t(`nav.${key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Language Switcher (visible on desktop) */}
                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>

                        {/* Mobile Menu Button */}
                        <HamburgerButton onClick={() => setMobileMenuOpen(true)} />
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </>
    );
};
