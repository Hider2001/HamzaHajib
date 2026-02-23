/**
 * Footer Layout Component - World-Class UI/UX Edition
 * Features: Animated background, social links, newsletter, modern layout
 */

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';
import { HiMail, HiLocationMarker, HiPhone, HiPaperAirplane } from 'react-icons/hi';

// ============================================
// ANIMATED BACKGROUND COMPONENT
// ============================================
const AnimatedBackground = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Orbs */}
            <motion.div
                style={{ y }}
                className="absolute -top-20 -left-20 w-80 h-80 bg-[#38BDF8]/20 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#6366f1]/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-3xl"
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};

// ============================================
// FOOTER LINK COMPONENT
// ============================================
const FooterLink = ({ href, label, delay }: { href: string; label: string; delay: number }) => {
    const ref = useRef<HTMLLIElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay }}
        >
            <motion.a
                href={href}
                whileHover={{ x: 5 }}
                className="text-white/60 hover:text-[#38BDF8] transition-colors text-sm inline-flex items-center gap-2 group"
            >
                <span className="w-0 group-hover:w-2 h-0.5 bg-[#38BDF8] transition-all duration-300" />
                {label}
            </motion.a>
        </motion.li>
    );
};

// ============================================
// SOCIAL LINK COMPONENT
// ============================================
const SocialLink = ({
    icon: Icon,
    label,
    href,
    color,
    delay
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    color: string;
    delay: number;
}) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, delay }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
            style={{ backgroundColor: `${color}20` }}
            aria-label={label}
        >
            <Icon className="text-lg" />
        </motion.a>
    );
};

// ============================================
// NEWSLETTER COMPONENT
// ============================================
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
            <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">Subscribe to get updates on new projects and articles.</p>

            {isSubscribed ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-green-400 text-sm"
                >
                    <span>✓</span>
                    <span>Thanks for subscribing!</span>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#38BDF8] transition-colors"
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#6366f1] text-white text-sm font-medium"
                    >
                        <HiPaperAirplane className="text-lg rotate-90" />
                    </motion.button>
                </form>
            )}
        </motion.div>
    );
};

// ============================================
// CONTACT INFO COMPONENT
// ============================================
const ContactInfo = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/20 flex items-center justify-center">
            <Icon className="text-[#38BDF8] text-sm" />
        </div>
        <div>
            <p className="text-white/40 text-xs">{label}</p>
            <p className="text-white/80 text-sm">{value}</p>
        </div>
    </div>
);

// ============================================
// BACK TO TOP BUTTON
// ============================================
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#6366f1] text-white shadow-lg shadow-[#38BDF8]/30 flex items-center justify-center z-50"
        >
            <FaArrowUp className="text-lg" />
        </motion.button>
    );
};

// Import useEffect for BackToTopButton
import { useEffect } from 'react';

// ============================================
// MAIN FOOTER COMPONENT
// ============================================
export const Footer = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true });

    const quickLinks = [
        { key: 'home', href: '#' },
        { key: 'work', href: '#work' },
        { key: 'about', href: '#about' },
        { key: 'contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: FaGithub, label: 'GitHub', href: 'https://github.com', color: '#333' },
        { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0077B5' },
        { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/967776645280', color: '#25D366' },
        { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com', color: '#1DA1F2' },
    ];

    return (
        <>
            <footer
                ref={ref}
                className="relative bg-gradient-to-br from-[#0A2540] via-[#0f3460] to-[#1a1a2e] dark:from-[#000000] dark:via-[#0A2540] dark:to-[#0F172A] text-white pt-20 pb-8 overflow-hidden"
            >
                <AnimatedBackground />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-1"
                        >
                            {/* Logo */}
                            <motion.a
                                href="#"
                                className="inline-flex items-center gap-2 mb-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#6366f1] flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">H</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-white to-[#38BDF8] bg-clip-text text-transparent">
                                    {t('brand')}
                                </span>
                            </motion.a>

                            <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                Full-stack developer crafting beautiful digital experiences with modern technologies.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <ContactInfo icon={HiLocationMarker} label="Location" value="Yemen, Sana'a" />
                                <ContactInfo icon={HiMail} label="Email" value="hamzafuad2001@gmail.com" />
                                <ContactInfo icon={HiPhone} label="Phone" value="+967 776 645 280" />
                            </div>
                        </motion.div>

                        {/* Quick Links Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-[#38BDF8]" />
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <FooterLink
                                        key={link.key}
                                        href={link.href}
                                        label={t(`nav.${link.key}`)}
                                        delay={0.2 + index * 0.05}
                                    />
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-[#38BDF8]" />
                                Services
                            </h4>
                            <ul className="space-y-3">
                                {['Web Development', 'Mobile Apps', 'UI/UX Design', 'API Integration', 'Consulting'].map((service, index) => (
                                    <FooterLink
                                        key={service}
                                        href="#"
                                        label={service}
                                        delay={0.3 + index * 0.05}
                                    />
                                ))}
                            </ul>
                        </motion.div>

                        {/* Newsletter Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-[#38BDF8]" />
                                Connect
                            </h4>

                            {/* Social Links */}
                            <div className="flex gap-3 mb-6">
                                {socialLinks.map((link, index) => (
                                    <SocialLink key={link.label} {...link} delay={0.4 + index * 0.05} />
                                ))}
                            </div>

                            {/* Newsletter */}
                            <Newsletter />
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
                    />

                    {/* Bottom Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-4"
                    >
                        {/* Copyright */}
                        <p className="text-white/40 text-sm flex items-center gap-2">
                            © {new Date().getFullYear()} {t('brand')}. All rights reserved.
                        </p>

                        {/* Made with love */}
                        <p className="text-white/40 text-sm flex items-center gap-2">
                            Made with{' '}
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <FaHeart className="text-red-500" />
                            </motion.span>
                            {' '}using React & Framer Motion
                        </p>

                        {/* Tech Stack */}
                        <div className="flex items-center gap-2 text-white/40 text-xs">
                            <span className="px-2 py-1 rounded bg-white/5">React</span>
                            <span className="px-2 py-1 rounded bg-white/5">TypeScript</span>
                            <span className="px-2 py-1 rounded bg-white/5">Tailwind</span>
                        </div>
                    </motion.div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <BackToTopButton />
        </>
    );
};
