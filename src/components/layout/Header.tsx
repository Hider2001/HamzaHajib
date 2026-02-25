/**
 * Header Layout Component - World-Class UI/UX Edition
 * Features: Advanced glassmorphism, magnetic hover, morphing underline, scroll effects
 */

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { MobileMenu, HamburgerButton } from '../ui/MobileMenu';
import { ThemeToggle } from '../ui/ThemeToggle';
import { HiHome, HiBriefcase, HiUser, HiMail, HiCode } from 'react-icons/hi';

// ============================================
// MAGNETIC NAV LINK COMPONENT
// ============================================
const MagneticNavLink = ({
    item,
    isActive,
    isHovered,
    onHover,
    onLeave,
    mouseX,
    mouseY
}: {
    item: { key: string; href: string; icon: React.ComponentType<{ className?: string }> };
    isActive: boolean;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    mouseX: import('framer-motion').MotionValue<unknown>;
    mouseY: import('framer-motion').MotionValue<unknown>;
}) => {
    const ref = useRef<HTMLLIElement>(null);
    const Icon = item.icon;

    const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.15);
        mouseY.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        onLeave();
    };

    return (
        <motion.li
            ref={ref}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onHoverStart={onHover}
            style={{ x: mouseX, y: mouseY }}
        >
                <a
                    href={item.href}
                    className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300 group
                    ${isActive
                        ? 'text-[#38BDF8] font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-[#38BDF8] dark:hover:text-[#38BDF8]'
                    }`}
                >
                {/* Background hover effect */}
                <motion.span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#38BDF8]/10 to-[#6366f1]/10 dark:from-[#38BDF8]/20 dark:to-[#6366f1]/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Icon with animation */}
                <motion.span
                    animate={{ scale: isActive || isHovered ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    <Icon className={`text-lg transition-colors duration-300 ${isActive ? 'text-[#38BDF8]' : ''}`} />
                </motion.span>

                {/* Text */}
                <span className="relative z-10">{item.key === 'home' ? item.key.charAt(0).toUpperCase() + item.key.slice(1) : item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.span
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
            </a>

            {/* Morphing underline */}
            <AnimatePresence>
                {isHovered && !isActive && (
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#6366f1] rounded-full origin-left"
                    />
                )}
            </AnimatePresence>
        </motion.li>
    );
};

// ============================================
// LOGO COMPONENT
// ============================================
const Logo = () => {
    return (
        <motion.a
            href="#"
            className="relative group flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Logo Icon */}
            <motion.div
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#38BDF8]/20"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
            >
                <HiCode className="text-white text-xl" />
                
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#6366f1] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                />
            </motion.div>

            {/* Logo Text */}
            <span className="text-xl font-bold bg-gradient-to-r from-[#0A2540] via-[#38BDF8] to-[#6366f1] dark:from-white dark:via-[#38BDF8] dark:to-[#6366f1] bg-clip-text text-transparent">
                Portfolio
            </span>
        </motion.a>
    );
};

// ============================================
// MAIN HEADER COMPONENT
// ============================================
export const Header = () => {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);

    const { scrollY } = useScroll();
    const headerHeight = useTransform(scrollY, [0, 100], [80, 64]);
    const headerBlur = useTransform(scrollY, [0, 100], [12, 24]);

    const smoothHeight = useSpring(headerHeight, { stiffness: 300, damping: 30 });
    const smoothBlur = useSpring(headerBlur, { stiffness: 300, damping: 30 });

    const navItems = [
        { key: 'home', href: '#', icon: HiHome },
        { key: 'work', href: '#work', icon: HiBriefcase },
        { key: 'about', href: '#about', icon: HiUser },
        { key: 'contact', href: '#contact', icon: HiMail },
    ];

    // Track scroll state
    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 20);
        });
        return () => unsubscribe();
    }, [scrollY]);

    // Track active section based on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'work', 'about', 'contact'];
            const scrollPosition = window.scrollY + 150;

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

    // Magnetic cursor effect values
    const mouseX = useMotionValue<unknown>(0);
    const mouseY = useMotionValue<unknown>(0);

    return (
        <>
            <motion.header
                style={{
                    height: smoothHeight,
                }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'shadow-lg shadow-black/5 dark:shadow-black/20' 
                        : ''
                }`}
            >
                {/* Glassmorphism Background */}
                <motion.div
                    style={{
                        backdropFilter: `blur(${smoothBlur}px)`,
                        WebkitBackdropFilter: `blur(${smoothBlur}px)`,
                    }}
                    className="absolute inset-0 bg-white/80 dark:bg-[#0F172A]/80 border-b border-gray-200/50 dark:border-gray-700/50"
                />

                {/* Gradient accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isScrolled ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#38BDF8] via-[#6366f1] to-[#ec4899] origin-left"
                />

                <nav className="container mx-auto px-4 h-full relative z-10">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo */}
                        <Logo />

                        {/* Desktop Navigation */}
                        <ul ref={navRef} className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <MagneticNavLink
                                    key={item.key}
                                    item={item}
                                    isActive={activeSection === item.key}
                                    isHovered={hoveredItem === item.key}
                                    onHover={() => setHoveredItem(item.key)}
                                    onLeave={() => setHoveredItem(null)}
                                    mouseX={mouseX}
                                    mouseY={mouseY}
                                />
                            ))}
                        </ul>

                        {/* Right Side Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Theme Toggle */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ThemeToggle />
                            </motion.div>

                            {/* Language Switcher */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LanguageSwitcher />
                            </motion.div>

                            {/* CTA Button */}
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#6366f1] text-white font-medium text-sm shadow-lg shadow-[#38BDF8]/20 hover:shadow-[#38BDF8]/40 transition-shadow"
                            >
                                {t('contact.title')}
                            </motion.a>
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
