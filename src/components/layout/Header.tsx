/**
 * Header Layout Component - Next Level Edition
 * Features: Magnetic hover, morphing underline, glassmorphism, scroll effects
 */

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { MobileMenu, HamburgerButton } from '../ui/MobileMenu';
import { ThemeToggle } from '../ui/ThemeToggle';
import { HiHome, HiBriefcase, HiUser, HiMail } from 'react-icons/hi';

export const Header = () => {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const navRef = useRef<HTMLUListElement>(null);
    
    const { scrollY } = useScroll();
    const headerHeight = useTransform(scrollY, [0, 100], [80, 64]);
    const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
    const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
    
    const smoothHeight = useSpring(headerHeight, { stiffness: 300, damping: 30 });
    const smoothBlur = useSpring(headerBlur, { stiffness: 300, damping: 30 });
    const smoothOpacity = useSpring(headerOpacity, { stiffness: 300, damping: 30 });

    const navItems = [
        { key: 'home', href: '#', icon: HiHome },
        { key: 'work', href: '#work', icon: HiBriefcase },
        { key: 'about', href: '#about', icon: HiUser },
        { key: 'contact', href: '#contact', icon: HiMail },
    ];

    // Track active section based on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'work', 'about', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = section === 'home' 
                    ? document.querySelector('main')
                    : document.getElementById(section);
                
                if (element) {
                    const { offsetTop, offsetHeight } = element as HTMLElement;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Magnetic cursor effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.3);
        mouseY.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <>
            <motion.header
                style={{
                    height: smoothHeight,
                    backdropFilter: `blur(${smoothBlur}px)`,
                    backgroundColor: `rgba(255, 255, 255, ${smoothOpacity})`,
                }}
                className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 shadow-sm"
            >
                <nav className="container mx-auto px-4 h-full">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Portfolio
                        </motion.a>

                        {/* Desktop Navigation */}
                        <ul ref={navRef} className="hidden md:flex items-center gap-8">
                            {navItems.map(({ key, href, icon: Icon }) => (
                                <motion.li
                                    key={key}
                                    className="relative"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onHoverStart={() => setHoveredItem(key)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                    style={{ x: mouseX, y: mouseY }}
                                >
                                    <a
                                        href={href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                            activeSection === key
                                                ? 'text-blue-600 dark:text-[#38BDF8] font-semibold'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-[#38BDF8]'
                                        }`}
                                    >
                                        <Icon className="text-xl" />
                                        {t(`nav.${key}`)}
                                    </a>
                                    
                                    {/* Morphing underline */}
                                    {hoveredItem === key && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </motion.li>
                            ))}
                        </ul>

                        {/* Language Switcher & Theme Toggle (visible on desktop) */}
                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
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
